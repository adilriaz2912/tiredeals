#!/usr/bin/env python3
"""
SimpleTire.com Web Scraper
Uses Selenium with webdriver-manager for automatic driver handling
"""

import csv
import time
import random
import re
import sys
from datetime import datetime

# Install dependencies if needed
try:
    from selenium import webdriver
    from selenium.webdriver.chrome.service import Service
    from selenium.webdriver.chrome.options import Options
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
    from webdriver_manager.chrome import ChromeDriverManager
except ImportError:
    print("Installing required packages...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "selenium", "webdriver-manager"])
    from selenium import webdriver
    from selenium.webdriver.chrome.service import Service
    from selenium.webdriver.chrome.options import Options
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
    from webdriver_manager.chrome import ChromeDriverManager

try:
    import pandas as pd
except ImportError:
    pd = None


class SimpleTireScraper:
    BASE_URL = "https://www.simpletire.com"

    def __init__(self, headless=False):
        self.headless = headless
        self.driver = None
        self.results = []

    def setup(self):
        """Initialize Chrome browser."""
        print("Starting browser...")

        options = Options()

        if self.headless:
            options.add_argument('--headless=new')

        # Anti-detection options
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--disable-blink-features=AutomationControlled')
        options.add_argument('--window-size=1920,1080')
        options.add_argument('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36')

        # Disable automation flags
        options.add_experimental_option("excludeSwitches", ["enable-automation"])
        options.add_experimental_option('useAutomationExtension', False)

        # Auto-download and setup ChromeDriver
        service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=service, options=options)

        # Remove webdriver flag
        self.driver.execute_cdp_cmd('Page.addScriptToEvaluateOnNewDocument', {
            'source': '''
                Object.defineProperty(navigator, 'webdriver', {get: () => undefined});
                window.chrome = { runtime: {} };
            '''
        })

        self.driver.set_page_load_timeout(120)
        print("Browser started!")

    def close(self):
        if self.driver:
            self.driver.quit()

    def random_delay(self, min_sec=2, max_sec=5):
        time.sleep(random.uniform(min_sec, max_sec))

    def scroll_page(self):
        """Scroll down the page to load more content."""
        self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight/3);")
        time.sleep(1)
        self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight/2);")
        time.sleep(1)
        self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)

    def scrape_size(self, width, aspect, rim, max_pages=10):
        """Scrape all tires for a given size."""
        size_str = f"{width}/{aspect}R{rim}"
        url = f"{self.BASE_URL}/tire-sizes/{width}-{aspect}r{rim}-tires"

        print(f"\n{'='*60}")
        print(f"Scraping: {size_str}")
        print(f"URL: {url}")
        print(f"{'='*60}")

        try:
            self.driver.get(url)
            self.random_delay(5, 8)

            # Check if we're blocked
            page_source = self.driver.page_source.lower()
            if 'access denied' in page_source or 'blocked' in page_source:
                print("ACCESS BLOCKED - waiting and retrying...")
                time.sleep(15)
                self.driver.refresh()
                self.random_delay(5, 8)

            # Check for Cloudflare challenge
            if 'checking your browser' in page_source or 'challenge' in page_source:
                print("Cloudflare challenge detected - waiting...")
                time.sleep(15)

            # Scroll to load content
            self.scroll_page()

            # Take screenshot for debugging
            self.driver.save_screenshot('debug_screenshot.png')
            print("Screenshot saved to debug_screenshot.png")
            print(f"Page title: {self.driver.title}")

            page_num = 1
            while page_num <= max_pages:
                print(f"\nPage {page_num}...")

                # Find all product cards
                products = self.extract_products_from_page(size_str)

                if products:
                    print(f"Found {len(products)} products")
                    self.results.extend(products)
                else:
                    print("No products found on this page")
                    break

                # Try to go to next page
                if not self.go_to_next_page():
                    break

                page_num += 1
                self.random_delay(3, 5)

        except Exception as e:
            print(f"Error scraping {size_str}: {e}")
            try:
                self.driver.save_screenshot('error_screenshot.png')
                print("Error screenshot saved")
            except:
                pass

    def extract_products_from_page(self, size_str):
        """Extract product data from the current page."""
        products = []

        try:
            # Wait for page to have some content
            WebDriverWait(self.driver, 20).until(
                EC.presence_of_element_located((By.TAG_NAME, "body"))
            )
            time.sleep(3)
        except:
            pass

        # Try to get product data from the page
        try:
            # Execute JavaScript to extract product info
            product_data = self.driver.execute_script("""
                const products = [];

                // Find all product links/cards - multiple strategies
                const selectors = [
                    'a[href*="/tires/"]',
                    'a[href*="/tire/"]',
                    '[class*="product"] a',
                    '[class*="Product"] a',
                    '[class*="card"] a[href*="tire"]'
                ];

                const allLinks = new Set();
                selectors.forEach(sel => {
                    document.querySelectorAll(sel).forEach(el => allLinks.add(el));
                });

                const seen = new Set();

                allLinks.forEach(link => {
                    const href = link.href || '';
                    if (!href || seen.has(href)) return;
                    if (!href.includes('simpletire.com')) return;
                    if (href.includes('/tire-sizes/')) return;  // Skip category links

                    seen.add(href);

                    // Try to find the product card container
                    let card = link.closest('[class*="product"]') ||
                               link.closest('[class*="Product"]') ||
                               link.closest('[class*="card"]') ||
                               link.closest('[class*="Card"]') ||
                               link.closest('article') ||
                               link.closest('li') ||
                               link.parentElement?.parentElement;

                    if (!card) card = link;

                    // Extract text content
                    const text = card.innerText || card.textContent || '';

                    // Try to find price
                    let price = '';
                    const priceMatches = text.match(/\\$([\\d,]+\\.?\\d*)/g);
                    if (priceMatches && priceMatches.length > 0) {
                        // Get the first/lowest price
                        price = priceMatches[0].replace('$', '').replace(',', '');
                    }

                    // Get URL slug for parsing
                    const urlParts = href.split('/').pop() || '';
                    const slug = urlParts.split('-p-')[0] || urlParts;

                    products.push({
                        url: href,
                        raw_text: text.substring(0, 800),
                        price: price,
                        url_slug: slug
                    });
                });

                return products;
            """)

            print(f"Raw data found: {len(product_data)} links")

            for item in product_data:
                product = {
                    'selected_size': size_str,
                    'url': item['url'],
                    'price': item['price'],
                    'brand': '',
                    'model': '',
                    'sku': '',
                    'size': '',
                    'load_index': '',
                    'speed_rating': '',
                    'scraped_at': datetime.now().isoformat()
                }

                # Parse brand/model from URL slug
                slug = item.get('url_slug', '')
                if slug:
                    # URL format is usually: brand-model-name-size-specs
                    parts = slug.replace('-', ' ').split()
                    if parts:
                        product['brand'] = parts[0].title()
                        if len(parts) > 1:
                            # Model is everything else before size numbers
                            model_parts = []
                            for p in parts[1:]:
                                if re.match(r'^\d{3}$', p):  # Hit the size (e.g., 275)
                                    break
                                model_parts.append(p)
                            product['model'] = ' '.join(model_parts).title()

                # Parse size from URL
                size_match = re.search(r'(\d{3})[/-](\d{2,3})r(\d{2})', item['url'], re.I)
                if size_match:
                    product['size'] = f"{size_match.group(1)}/{size_match.group(2)}R{size_match.group(3)}"

                # Try to extract more from raw text
                text = item.get('raw_text', '')

                # Look for load/speed rating (e.g., "110H", "106V")
                load_speed = re.search(r'\b(\d{2,3})([A-Z])\b', text)
                if load_speed:
                    product['load_index'] = load_speed.group(1)
                    product['speed_rating'] = load_speed.group(2)

                # Try to get a cleaner price from text if not found
                if not product['price']:
                    price_match = re.search(r'\$(\d+\.?\d*)', text)
                    if price_match:
                        product['price'] = price_match.group(1)

                products.append(product)

        except Exception as e:
            print(f"Error extracting products: {e}")

        return products

    def go_to_next_page(self):
        """Try to navigate to the next page."""
        try:
            # Look for next page button
            next_selectors = [
                "a[aria-label='Next']",
                "button[aria-label='Next']",
                "[class*='next']",
                "[class*='Next']",
                "a[rel='next']"
            ]

            for selector in next_selectors:
                try:
                    buttons = self.driver.find_elements(By.CSS_SELECTOR, selector)
                    for btn in buttons:
                        if btn.is_displayed() and btn.is_enabled():
                            btn.click()
                            self.random_delay(3, 5)
                            self.scroll_page()
                            return True
                except:
                    continue

            return False
        except:
            return False

    def save_results(self, filename=None):
        """Save results to CSV and Excel."""
        if not self.results:
            print("\nNo results to save!")
            return

        if not filename:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"simpletire_{timestamp}"

        columns = ['selected_size', 'brand', 'model', 'size', 'price',
                   'load_index', 'speed_rating', 'sku', 'url', 'scraped_at']

        # Remove duplicates based on URL
        seen_urls = set()
        unique_results = []
        for r in self.results:
            url = r.get('url', '')
            if url and url not in seen_urls:
                seen_urls.add(url)
                unique_results.append(r)

        self.results = unique_results

        # Save CSV
        csv_path = f"{filename}.csv"
        with open(csv_path, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=columns, extrasaction='ignore')
            writer.writeheader()
            writer.writerows(self.results)
        print(f"\nSaved {len(self.results)} products to {csv_path}")

        # Save Excel
        if pd is not None:
            try:
                df = pd.DataFrame(self.results)
                for col in columns:
                    if col not in df.columns:
                        df[col] = ''
                df = df[columns]
                excel_path = f"{filename}.xlsx"
                df.to_excel(excel_path, index=False)
                print(f"Saved to Excel: {excel_path}")
            except Exception as e:
                print(f"Excel error: {e}")


def main():
    import argparse

    parser = argparse.ArgumentParser(description='Scrape SimpleTire.com')
    parser.add_argument('--sizes', nargs='+', required=True,
                        help='Tire sizes to scrape (e.g., 275/45R20 265/70R17)')
    parser.add_argument('--max-pages', type=int, default=10,
                        help='Max pages per size (default: 10)')
    parser.add_argument('--output', '-o', help='Output filename')
    parser.add_argument('--headless', action='store_true',
                        help='Run browser in headless mode (not recommended for this site)')

    args = parser.parse_args()

    scraper = SimpleTireScraper(headless=args.headless)

    try:
        scraper.setup()

        for size in args.sizes:
            # Parse size: 275/45R20 or 275-45-20
            match = re.match(r'(\d+)[/\-](\d+)[Rr\-]?(\d+)', size)
            if match:
                width, aspect, rim = match.groups()
                scraper.scrape_size(width, aspect, rim, max_pages=args.max_pages)
            else:
                print(f"Invalid size format: {size}")

        scraper.save_results(args.output)

    finally:
        scraper.close()


if __name__ == '__main__':
    main()
