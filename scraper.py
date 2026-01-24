#!/usr/bin/env python3
"""
SimpleTire.com Web Scraper
Scrapes tire data by product URL or SKU
Outputs to CSV/Excel format
"""

import asyncio
import csv
import random
import re
import sys
from datetime import datetime
from pathlib import Path

try:
    from playwright.async_api import async_playwright, TimeoutError as PlaywrightTimeout
except ImportError:
    print("Please install playwright: pip install playwright && playwright install chromium")
    sys.exit(1)

try:
    import pandas as pd
except ImportError:
    pd = None


class SimpleTireScraper:
    BASE_URL = "https://www.simpletire.com"

    def __init__(self, headless: bool = True):
        self.headless = headless
        self.browser = None
        self.context = None
        self.page = None
        self.results = []

    async def setup(self):
        """Initialize browser with stealth settings."""
        self.playwright = await async_playwright().start()

        self.browser = await self.playwright.chromium.launch(
            headless=self.headless,
            slow_mo=50,
            args=[
                '--disable-blink-features=AutomationControlled',
                '--disable-dev-shm-usage',
                '--no-sandbox',
            ]
        )

        self.context = await self.browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            locale='en-US',
            timezone_id='America/New_York',
        )

        await self.context.add_init_script("""
            Object.defineProperty(navigator, 'webdriver', {get: () => undefined});
            Object.defineProperty(navigator, 'plugins', {get: () => [1, 2, 3, 4, 5]});
            Object.defineProperty(navigator, 'languages', {get: () => ['en-US', 'en']});
            window.chrome = { runtime: {} };
        """)

        self.page = await self.context.new_page()
        await self.warmup()

    async def close(self):
        if self.browser:
            await self.browser.close()
        if self.playwright:
            await self.playwright.stop()

    async def random_delay(self, min_sec: float = 1, max_sec: float = 3):
        await asyncio.sleep(random.uniform(min_sec, max_sec))

    async def warmup(self):
        """Visit homepage first to get cookies."""
        print("Warming up browser...")
        try:
            await self.page.goto(self.BASE_URL, wait_until='domcontentloaded', timeout=90000)
            await asyncio.sleep(5)

            # Check for Cloudflare
            content = await self.page.content()
            if 'challenge' in content.lower() or 'checking your browser' in content.lower():
                print("Waiting for Cloudflare challenge...")
                await asyncio.sleep(15)

            await self.page.mouse.move(random.randint(100, 800), random.randint(100, 600))
            print("Warmup complete!")
        except Exception as e:
            print(f"Warmup warning: {e}")

    async def scrape_product_url(self, url: str) -> dict:
        """Scrape a single product page by URL."""
        print(f"\nScraping: {url}")

        try:
            await self.page.goto(url, wait_until='domcontentloaded', timeout=60000)
            await asyncio.sleep(3)
            await self.random_delay(1, 2)

            # Extract product data from the page
            data = await self.page.evaluate("""
                () => {
                    const result = {
                        sku: '',
                        brand: '',
                        model: '',
                        size: '',
                        price: '',
                        original_price: '',
                        load_index: '',
                        speed_rating: '',
                        tire_type: '',
                        warranty: '',
                        url: window.location.href
                    };

                    // Try JSON-LD first (most reliable)
                    const jsonLd = document.querySelector('script[type="application/ld+json"]');
                    if (jsonLd) {
                        try {
                            const data = JSON.parse(jsonLd.textContent);
                            if (data['@type'] === 'Product') {
                                result.sku = data.sku || data.productID || '';
                                result.brand = data.brand?.name || '';
                                result.model = data.name || '';
                                result.price = data.offers?.price || '';
                            }
                        } catch (e) {}
                    }

                    // Extract from page elements
                    // Brand
                    const brandEl = document.querySelector('[data-testid="brand"], .brand-name, [class*="Brand"], h1 span, .manufacturer');
                    if (brandEl && !result.brand) result.brand = brandEl.textContent.trim();

                    // Model
                    const modelEl = document.querySelector('[data-testid="model"], .product-name, [class*="ProductName"], h1');
                    if (modelEl && !result.model) {
                        let modelText = modelEl.textContent.trim();
                        // Clean up model name (remove brand if present at start)
                        if (result.brand && modelText.startsWith(result.brand)) {
                            modelText = modelText.substring(result.brand.length).trim();
                        }
                        result.model = modelText;
                    }

                    // Price - look for the main price
                    const priceSelectors = [
                        '[data-testid="price"]',
                        '.price-value',
                        '[class*="price"]:not([class*="original"])',
                        '[class*="Price"]:not([class*="Original"])',
                        '.current-price',
                        'span[class*="amount"]'
                    ];
                    for (const sel of priceSelectors) {
                        const el = document.querySelector(sel);
                        if (el && !result.price) {
                            const match = el.textContent.match(/\\$?([\\d,]+\\.?\\d*)/);
                            if (match) {
                                result.price = match[1].replace(',', '');
                                break;
                            }
                        }
                    }

                    // Size - from URL or page
                    const sizeMatch = window.location.href.match(/(\\d{3})[-/](\\d{2,3})[rR](\\d{2})/);
                    if (sizeMatch) {
                        result.size = `${sizeMatch[1]}/${sizeMatch[2]}R${sizeMatch[3]}`;
                    }

                    // Try to get size from page elements
                    const sizeEl = document.querySelector('[class*="size"], [class*="Size"], .tire-size');
                    if (sizeEl && !result.size) {
                        const sizeText = sizeEl.textContent;
                        const match = sizeText.match(/(\\d{3})\\/(\\d{2,3})[rR](\\d{2})/);
                        if (match) result.size = match[0];
                    }

                    // SKU from URL or page
                    const skuMatch = window.location.href.match(/[\\-_]([A-Z0-9]{5,})/i);
                    if (skuMatch && !result.sku) result.sku = skuMatch[1];

                    // Specs table
                    const specRows = document.querySelectorAll('tr, [class*="spec-row"], [class*="SpecRow"]');
                    specRows.forEach(row => {
                        const text = row.textContent.toLowerCase();
                        const value = row.querySelector('td:last-child, [class*="value"]')?.textContent.trim() || '';

                        if (text.includes('load index') || text.includes('load range')) {
                            result.load_index = value;
                        }
                        if (text.includes('speed rating')) {
                            result.speed_rating = value;
                        }
                        if (text.includes('tire type') || text.includes('category')) {
                            result.tire_type = value;
                        }
                        if (text.includes('warranty') || text.includes('mileage')) {
                            result.warranty = value;
                        }
                    });

                    return result;
                }
            """)

            data['scraped_at'] = datetime.now().isoformat()
            print(f"  -> {data['brand']} {data['model']} - ${data['price']}")
            return data

        except PlaywrightTimeout:
            print(f"  -> Timeout loading {url}")
            return {'url': url, 'error': 'timeout', 'scraped_at': datetime.now().isoformat()}
        except Exception as e:
            print(f"  -> Error: {e}")
            return {'url': url, 'error': str(e), 'scraped_at': datetime.now().isoformat()}

    async def scrape_urls(self, urls: list):
        """Scrape multiple product URLs."""
        print(f"\nScraping {len(urls)} products...")

        for i, url in enumerate(urls, 1):
            print(f"\n[{i}/{len(urls)}]", end="")

            # Make sure URL is complete
            if not url.startswith('http'):
                url = f"{self.BASE_URL}{url}" if url.startswith('/') else f"{self.BASE_URL}/{url}"

            data = await self.scrape_product_url(url)
            self.results.append(data)

            # Random delay between requests
            if i < len(urls):
                await self.random_delay(2, 5)

    async def scrape_search(self, query: str, max_results: int = 50):
        """Search for tires and scrape results."""
        print(f"\nSearching for: {query}")

        search_url = f"{self.BASE_URL}/search?q={query.replace(' ', '+')}"

        try:
            await self.page.goto(search_url, wait_until='domcontentloaded', timeout=60000)
            await asyncio.sleep(5)

            # Get product URLs from search results
            urls = await self.page.evaluate("""
                () => {
                    const links = document.querySelectorAll('a[href*="/tire/"], a[href*="/product/"]');
                    return [...new Set([...links].map(a => a.href))];
                }
            """)

            print(f"Found {len(urls)} products")
            urls = urls[:max_results]

            # Now scrape each product page
            await self.scrape_urls(urls)

        except Exception as e:
            print(f"Search error: {e}")

    async def scrape_by_size(self, size: str, brands: list = None, max_results: int = 100):
        """Scrape all tires for a given size, optionally filtered by brands."""
        # Parse size: 275/45R20 -> 275-45r20
        match = re.match(r'(\d+)[/\-](\d+)[Rr\-]?(\d+)', size)
        if not match:
            print(f"Invalid size format: {size}")
            return

        width, aspect, rim = match.groups()
        size_str = f"{width}/{aspect}R{rim}"
        url_size = f"{width}-{aspect}r{rim}"

        print(f"\n{'='*60}")
        print(f"Scraping tires for size: {size_str}")
        if brands:
            print(f"Filtering by brands: {', '.join(brands)}")
        print(f"{'='*60}")

        search_url = f"{self.BASE_URL}/tire-sizes/{url_size}-tires"

        try:
            await self.page.goto(search_url, wait_until='domcontentloaded', timeout=90000)
            await asyncio.sleep(5)

            # Save debug screenshot
            await self.page.screenshot(path='debug_screenshot.png')
            print("Debug screenshot saved")

            # Get all product URLs from the page
            all_urls = []
            page_num = 1

            while len(all_urls) < max_results:
                print(f"\nPage {page_num}...")

                urls = await self.page.evaluate("""
                    () => {
                        const links = document.querySelectorAll('a[href*="/tire/"], a[href*="/tires/"]');
                        return [...new Set([...links].map(a => a.href).filter(h => h.includes('-p-') || h.includes('/tire/')))];
                    }
                """)

                if not urls:
                    print("No product links found on page")
                    break

                print(f"Found {len(urls)} product links")
                all_urls.extend(urls)

                # Try to go to next page
                try:
                    next_btn = await self.page.query_selector('a[aria-label="Next"], button:has-text("Next"), [class*="next"]')
                    if next_btn:
                        await next_btn.click()
                        await self.page.wait_for_load_state('domcontentloaded')
                        await asyncio.sleep(3)
                        page_num += 1
                    else:
                        break
                except:
                    break

            # Remove duplicates
            all_urls = list(dict.fromkeys(all_urls))[:max_results]
            print(f"\nTotal unique products: {len(all_urls)}")

            # Scrape each product
            for i, url in enumerate(all_urls, 1):
                print(f"\n[{i}/{len(all_urls)}]", end="")

                data = await self.scrape_product_url(url)
                data['selected_size'] = size_str

                # Filter by brand if specified
                if brands:
                    product_brand = data.get('brand', '').lower()
                    if not any(b.lower() in product_brand for b in brands):
                        print(f"  -> Skipping (brand filter)")
                        continue

                self.results.append(data)

                if i < len(all_urls):
                    await self.random_delay(2, 4)

        except Exception as e:
            print(f"Error: {e}")

    def save_results(self, filename: str = None):
        """Save results to CSV and Excel."""
        if not self.results:
            print("\nNo results to save!")
            return None

        if not filename:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"simpletire_{timestamp}"

        columns = ['selected_size', 'sku', 'brand', 'model', 'size', 'price',
                   'load_index', 'speed_rating', 'tire_type', 'warranty', 'url', 'scraped_at']

        # CSV
        csv_path = f"{filename}.csv"
        with open(csv_path, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=columns, extrasaction='ignore')
            writer.writeheader()
            writer.writerows(self.results)
        print(f"\nSaved {len(self.results)} products to {csv_path}")

        # Excel
        if pd is not None:
            try:
                df = pd.DataFrame(self.results)
                for col in columns:
                    if col not in df.columns:
                        df[col] = ''
                df = df[columns]
                excel_path = f"{filename}.xlsx"
                df.to_excel(excel_path, index=False, sheet_name='Tires')
                print(f"Saved to Excel: {excel_path}")
            except Exception as e:
                print(f"Excel save error: {e}")

        return csv_path


async def main():
    import argparse

    parser = argparse.ArgumentParser(description='Scrape tire data from SimpleTire.com')
    parser.add_argument('--urls', nargs='+', help='Product URLs to scrape')
    parser.add_argument('--urls-file', help='File containing product URLs (one per line)')
    parser.add_argument('--size', help='Tire size to search (e.g., 275/45R20)')
    parser.add_argument('--sizes', nargs='+', help='Multiple tire sizes')
    parser.add_argument('--brands', nargs='+', help='Filter by brands (e.g., Goodyear Cooper)')
    parser.add_argument('--search', help='Search query')
    parser.add_argument('--max', type=int, default=50, help='Max results per size (default: 50)')
    parser.add_argument('--output', '-o', help='Output filename (without extension)')
    parser.add_argument('--visible', action='store_true', help='Show browser window')

    args = parser.parse_args()

    scraper = SimpleTireScraper(headless=not args.visible)

    try:
        await scraper.setup()

        # Mode 1: Scrape specific URLs
        if args.urls:
            await scraper.scrape_urls(args.urls)

        # Mode 2: Scrape URLs from file
        elif args.urls_file:
            with open(args.urls_file, 'r') as f:
                urls = [line.strip() for line in f if line.strip()]
            await scraper.scrape_urls(urls)

        # Mode 3: Scrape by size(s)
        elif args.size or args.sizes:
            sizes = args.sizes or [args.size]
            for size in sizes:
                await scraper.scrape_by_size(size, brands=args.brands, max_results=args.max)

        # Mode 4: Search
        elif args.search:
            await scraper.scrape_search(args.search, max_results=args.max)

        else:
            print("Usage examples:")
            print("  python scraper.py --size 275/45R20")
            print("  python scraper.py --size 275/45R20 --brands Goodyear Cooper")
            print("  python scraper.py --urls https://simpletire.com/tire/...")
            print("  python scraper.py --urls-file my_urls.txt")
            print("  python scraper.py --search 'all terrain'")
            return

        scraper.save_results(args.output)

    finally:
        await scraper.close()


if __name__ == '__main__':
    asyncio.run(main())
