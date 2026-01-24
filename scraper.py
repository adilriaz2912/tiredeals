#!/usr/bin/env python3
"""
SimpleTire.com Web Scraper
Extracts tire data: size, brand, model, price, and product URLs
Outputs to CSV/Excel format
"""

import asyncio
import csv
import random
import re
import sys
from datetime import datetime
from pathlib import Path
from urllib.parse import urljoin

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

        # Launch browser with stealth settings
        self.browser = await self.playwright.chromium.launch(
            headless=self.headless,
            slow_mo=50,  # Slow down actions to appear more human
            args=[
                '--disable-blink-features=AutomationControlled',
                '--disable-dev-shm-usage',
                '--no-sandbox',
                '--disable-web-security',
                '--disable-features=IsolateOrigins,site-per-process',
            ]
        )

        # Create context with realistic browser fingerprint
        self.context = await self.browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            locale='en-US',
            timezone_id='America/New_York',
            java_script_enabled=True,
        )

        # Add stealth scripts to avoid detection
        await self.context.add_init_script("""
            // Remove webdriver property
            Object.defineProperty(navigator, 'webdriver', {get: () => undefined});

            // Mock plugins
            Object.defineProperty(navigator, 'plugins', {
                get: () => [1, 2, 3, 4, 5]
            });

            // Mock languages
            Object.defineProperty(navigator, 'languages', {
                get: () => ['en-US', 'en']
            });

            // Mock chrome
            window.chrome = { runtime: {} };

            // Mock permissions
            const originalQuery = window.navigator.permissions.query;
            window.navigator.permissions.query = (parameters) => (
                parameters.name === 'notifications' ?
                    Promise.resolve({ state: Notification.permission }) :
                    originalQuery(parameters)
            );
        """)

        self.page = await self.context.new_page()

        # Set extra headers
        await self.page.set_extra_http_headers({
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
        })

        # Warm up - visit homepage first to get cookies
        await self.warmup()

    async def close(self):
        """Clean up browser resources."""
        if self.browser:
            await self.browser.close()
        if self.playwright:
            await self.playwright.stop()

    async def random_delay(self, min_sec: float = 1, max_sec: float = 3):
        """Add random delay to mimic human behavior."""
        await asyncio.sleep(random.uniform(min_sec, max_sec))

    async def warmup(self):
        """Visit homepage first to get cookies and pass bot checks."""
        print("Warming up browser (visiting homepage)...")
        try:
            await self.page.goto(self.BASE_URL, wait_until='domcontentloaded', timeout=90000)

            # Wait for potential Cloudflare challenge
            await asyncio.sleep(5)

            # Check if we hit a challenge page
            content = await self.page.content()
            if 'challenge' in content.lower() or 'checking your browser' in content.lower():
                print("Cloudflare challenge detected, waiting for it to complete...")
                # Wait longer for challenge to complete
                await asyncio.sleep(10)

                # Try to wait for the page to change
                try:
                    await self.page.wait_for_url(f"{self.BASE_URL}/**", timeout=30000)
                except:
                    pass

            # Simulate some human-like behavior
            await self.random_delay(2, 4)

            # Scroll down a bit
            await self.page.evaluate("window.scrollTo(0, 300)")
            await self.random_delay(1, 2)

            # Move mouse randomly
            await self.page.mouse.move(random.randint(100, 800), random.randint(100, 600))

            print("Warmup complete!")

        except Exception as e:
            print(f"Warmup warning: {e}")

    async def scrape_by_size(self, width: str, aspect_ratio: str, rim: str, max_pages: int = 5):
        """
        Scrape tires by size specification.

        Args:
            width: Tire width (e.g., "225")
            aspect_ratio: Aspect ratio (e.g., "45")
            rim: Rim diameter (e.g., "17")
            max_pages: Maximum number of pages to scrape
        """
        size_str = f"{width}/{aspect_ratio}R{rim}"
        print(f"\n{'='*60}")
        print(f"Scraping tires for size: {size_str}")
        print(f"{'='*60}")

        # Build search URL
        search_url = f"{self.BASE_URL}/tire-sizes/{width}-{aspect_ratio}r{rim}-tires"

        try:
            print(f"Navigating to: {search_url}")
            await self.page.goto(search_url, wait_until='domcontentloaded', timeout=90000)

            # Wait for page to fully render
            await asyncio.sleep(5)
            await self.random_delay(2, 4)

            # Check if we got blocked or hit challenge
            content = await self.page.content()
            if 'Access Denied' in content or 'blocked' in content.lower():
                print("WARNING: Access may be blocked. Try running with headless=False")
                return

            if 'challenge' in content.lower() or 'checking your browser' in content.lower():
                print("Cloudflare challenge detected, waiting...")
                await asyncio.sleep(10)

            # Take a screenshot for debugging
            await self.page.screenshot(path='debug_screenshot.png')
            print("Debug screenshot saved to debug_screenshot.png")

            page_num = 1
            while page_num <= max_pages:
                print(f"\nProcessing page {page_num}...")

                # Wait for product grid to load - try multiple selectors
                try:
                    await self.page.wait_for_selector(
                        '[data-testid="product-card"], .product-card, .tire-card, article, '
                        '[class*="ProductCard"], [class*="TireCard"], [class*="product-list"], '
                        '.search-results, [class*="SearchResults"]',
                        timeout=20000
                    )
                except PlaywrightTimeout:
                    print("No products found with standard selectors, checking page content...")
                    # Print page title for debugging
                    title = await self.page.title()
                    print(f"Page title: {title}")
                    break

                # Extract product data from current page
                products = await self.extract_products(size_str)

                if not products:
                    print("No products extracted from this page")
                    break

                print(f"Found {len(products)} products on page {page_num}")
                self.results.extend(products)

                # Try to go to next page
                has_next = await self.go_to_next_page()
                if not has_next:
                    print("No more pages available")
                    break

                page_num += 1
                await self.random_delay(2, 4)

        except PlaywrightTimeout:
            print(f"Timeout while loading {search_url}")
        except Exception as e:
            print(f"Error scraping size {size_str}: {e}")

    async def extract_products(self, size_str: str) -> list:
        """Extract product information from the current page."""
        products = []

        # Try multiple selector strategies
        product_data = await self.page.evaluate("""
            () => {
                const products = [];

                // Strategy 1: Look for product cards/tiles
                const cards = document.querySelectorAll(
                    '[data-testid="product-card"], .product-card, .tire-card, ' +
                    '[class*="ProductCard"], [class*="product-tile"], article[class*="product"]'
                );

                cards.forEach(card => {
                    try {
                        // Extract brand
                        const brandEl = card.querySelector(
                            '[data-testid="brand"], .brand, [class*="brand"], ' +
                            '[class*="Brand"], h3, .manufacturer'
                        );
                        const brand = brandEl ? brandEl.textContent.trim() : '';

                        // Extract model/name
                        const modelEl = card.querySelector(
                            '[data-testid="model"], [data-testid="product-name"], ' +
                            '.model, .product-name, [class*="model"], [class*="Model"], ' +
                            'h2, h4, [class*="title"], [class*="Title"]'
                        );
                        const model = modelEl ? modelEl.textContent.trim() : '';

                        // Extract price
                        const priceEl = card.querySelector(
                            '[data-testid="price"], .price, [class*="price"], ' +
                            '[class*="Price"], span[class*="amount"]'
                        );
                        let price = priceEl ? priceEl.textContent.trim() : '';

                        // Clean up price
                        const priceMatch = price.match(/\\$?([\\d,]+\\.?\\d*)/);
                        if (priceMatch) {
                            price = priceMatch[1].replace(',', '');
                        }

                        // Extract URL
                        const linkEl = card.querySelector('a[href*="/tire/"], a[href*="/product/"], a');
                        const url = linkEl ? linkEl.href : '';

                        // Extract additional specs if available
                        const specsEl = card.querySelector('[class*="specs"], [class*="Specs"], .details');
                        const specs = specsEl ? specsEl.textContent.trim() : '';

                        if (brand || model) {
                            products.push({
                                brand: brand,
                                model: model,
                                price: price,
                                url: url,
                                specs: specs
                            });
                        }
                    } catch (e) {
                        console.error('Error extracting product:', e);
                    }
                });

                // Strategy 2: Look for JSON-LD structured data
                const scripts = document.querySelectorAll('script[type="application/ld+json"]');
                scripts.forEach(script => {
                    try {
                        const data = JSON.parse(script.textContent);
                        if (data['@type'] === 'Product' || data['@type'] === 'ItemList') {
                            // Process structured data
                            const items = data.itemListElement || [data];
                            items.forEach(item => {
                                const product = item.item || item;
                                if (product.name) {
                                    products.push({
                                        brand: product.brand?.name || '',
                                        model: product.name || '',
                                        price: product.offers?.price || '',
                                        url: product.url || '',
                                        specs: ''
                                    });
                                }
                            });
                        }
                    } catch (e) {}
                });

                return products;
            }
        """)

        # Add size and clean up data
        for item in product_data:
            item['size'] = size_str
            item['scraped_at'] = datetime.now().isoformat()

            # Clean up brand/model if they're combined
            if not item['brand'] and item['model']:
                # Try to split "Brand Model" format
                parts = item['model'].split(' ', 1)
                if len(parts) == 2:
                    item['brand'] = parts[0]
                    item['model'] = parts[1]

            products.append(item)

        return products

    async def go_to_next_page(self) -> bool:
        """Navigate to the next page of results. Returns False if no next page."""
        try:
            # Look for next page button/link
            next_selectors = [
                'a[aria-label="Next"]',
                'button[aria-label="Next"]',
                '[data-testid="next-page"]',
                '.pagination a:has-text("Next")',
                '.pagination button:has-text("Next")',
                'a:has-text("Next")',
                '[class*="next"]',
                '.pagination li:last-child a',
            ]

            for selector in next_selectors:
                try:
                    next_btn = await self.page.query_selector(selector)
                    if next_btn:
                        is_disabled = await next_btn.get_attribute('disabled')
                        aria_disabled = await next_btn.get_attribute('aria-disabled')

                        if is_disabled or aria_disabled == 'true':
                            continue

                        await next_btn.click()
                        await self.page.wait_for_load_state('networkidle', timeout=15000)
                        return True
                except:
                    continue

            return False

        except Exception as e:
            print(f"Error navigating to next page: {e}")
            return False

    async def scrape_category(self, category_url: str, max_pages: int = 10):
        """
        Scrape all tires from a category page.

        Args:
            category_url: Full URL to the category page
            max_pages: Maximum pages to scrape
        """
        print(f"\nScraping category: {category_url}")

        try:
            await self.page.goto(category_url, wait_until='networkidle', timeout=60000)
            await self.random_delay(2, 4)

            page_num = 1
            while page_num <= max_pages:
                print(f"Processing page {page_num}...")

                products = await self.extract_products("Various")
                if not products:
                    break

                print(f"Found {len(products)} products")
                self.results.extend(products)

                has_next = await self.go_to_next_page()
                if not has_next:
                    break

                page_num += 1
                await self.random_delay(2, 4)

        except Exception as e:
            print(f"Error scraping category: {e}")

    def save_results(self, filename: str = None):
        """Save scraped results to CSV and optionally Excel."""
        if not self.results:
            print("No results to save!")
            return

        if not filename:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"simpletire_data_{timestamp}"

        # Define column order
        columns = ['size', 'brand', 'model', 'price', 'url', 'specs', 'scraped_at']

        # Save to CSV
        csv_path = f"{filename}.csv"
        with open(csv_path, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=columns, extrasaction='ignore')
            writer.writeheader()
            writer.writerows(self.results)
        print(f"\nSaved {len(self.results)} products to {csv_path}")

        # Save to Excel if pandas is available
        if pd is not None:
            try:
                df = pd.DataFrame(self.results)
                df = df.reindex(columns=columns)
                excel_path = f"{filename}.xlsx"
                df.to_excel(excel_path, index=False, sheet_name='Tires')
                print(f"Saved to Excel: {excel_path}")
            except Exception as e:
                print(f"Could not save Excel file: {e}")

        return csv_path


async def main():
    """Main entry point."""
    import argparse

    parser = argparse.ArgumentParser(description='Scrape tire data from SimpleTire.com')
    parser.add_argument('--sizes', nargs='+', help='Tire sizes to scrape (format: 225/45R17)')
    parser.add_argument('--category', help='Category URL to scrape')
    parser.add_argument('--output', '-o', help='Output filename (without extension)')
    parser.add_argument('--max-pages', type=int, default=5, help='Max pages per size (default: 5)')
    parser.add_argument('--visible', action='store_true', help='Run browser in visible mode (not headless)')

    args = parser.parse_args()

    # Default sizes if none specified
    if not args.sizes and not args.category:
        args.sizes = [
            '225/45R17',
            '265/70R17',
            '275/55R20',
        ]
        print("No sizes specified, using defaults:", args.sizes)

    scraper = SimpleTireScraper(headless=not args.visible)

    try:
        await scraper.setup()

        if args.category:
            await scraper.scrape_category(args.category, max_pages=args.max_pages)
        else:
            # Parse and scrape each size
            for size in args.sizes:
                # Parse size format: 225/45R17 or 225-45-17
                match = re.match(r'(\d+)[/\-](\d+)[Rr\-](\d+)', size)
                if match:
                    width, aspect, rim = match.groups()
                    await scraper.scrape_by_size(width, aspect, rim, max_pages=args.max_pages)
                else:
                    print(f"Invalid size format: {size} (expected format: 225/45R17)")

        # Save results
        scraper.save_results(args.output)

    finally:
        await scraper.close()


if __name__ == '__main__':
    asyncio.run(main())
