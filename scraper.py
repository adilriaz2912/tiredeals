#!/usr/bin/env python3
"""
SimpleTire.com Web Scraper
Uses Selenium with warmup to bypass bot detection
"""

import csv
import time
import random
import re
import sys
from datetime import datetime

try:
    from selenium import webdriver
    from selenium.webdriver.edge.options import Options
    from selenium.webdriver.common.by import By
    from selenium.webdriver.common.keys import Keys
    from selenium.webdriver.common.action_chains import ActionChains
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
except ImportError:
    print("Installing selenium...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "selenium"])
    from selenium import webdriver
    from selenium.webdriver.edge.options import Options
    from selenium.webdriver.common.by import By
    from selenium.webdriver.common.keys import Keys
    from selenium.webdriver.common.action_chains import ActionChains
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC

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
        """Initialize browser."""
        print("Starting Edge browser...")
        options = Options()
        if self.headless:
            options.add_argument('--headless=new')
        options.add_argument('--start-maximized')

        self.driver = webdriver.Edge(options=options)
        self.driver.set_page_load_timeout(120)
        print("Browser started!")

    def close(self):
        if self.driver:
            self.driver.quit()

    def random_delay(self, min_sec=2, max_sec=5):
        time.sleep(random.uniform(min_sec, max_sec))

    def human_like_mouse_move(self):
        """Move mouse around randomly to seem human."""
        try:
            actions = ActionChains(self.driver)
            for _ in range(3):
                x = random.randint(100, 800)
                y = random.randint(100, 600)
                actions.move_by_offset(x, y).perform()
                actions.reset_actions()
                time.sleep(0.5)
        except:
            pass

    def scroll_slowly(self):
        """Scroll down slowly like a human."""
        total_height = self.driver.execute_script("return document.body.scrollHeight")
        current = 0
        step = 300

        while current < total_height:
            self.driver.execute_script(f"window.scrollTo(0, {current});")
            current += step
            time.sleep(random.uniform(0.3, 0.7))

        # Scroll back up a bit
        self.driver.execute_script("window.scrollTo(0, 500);")
        time.sleep(1)

    def warmup(self):
        """Visit homepage first to get cookies and seem human."""
        print("\nWarming up - visiting homepage first...")

        self.driver.get(self.BASE_URL)
        self.random_delay(3, 5)

        # Move mouse around
        self.human_like_mouse_move()

        # Scroll a bit
        self.driver.execute_script("window.scrollTo(0, 500);")
        self.random_delay(2, 3)

        self.driver.execute_script("window.scrollTo(0, 0);")
        self.random_delay(1, 2)

        print("Warmup complete!")

    def search_for_size(self, width, aspect, rim):
        """Use the search box to search for a tire size."""
        size_str = f"{width}/{aspect}R{rim}"
        print(f"\nSearching for: {size_str}")

        try:
            # Look for search input
            search_selectors = [
                "input[type='search']",
                "input[placeholder*='search']",
                "input[placeholder*='Search']",
                "input[name='search']",
                "input[name='q']",
                "#search",
                ".search-input"
            ]

            search_box = None
            for sel in search_selectors:
                try:
                    elements = self.driver.find_elements(By.CSS_SELECTOR, sel)
                    for el in elements:
                        if el.is_displayed():
                            search_box = el
                            break
                    if search_box:
                        break
                except:
                    continue

            if search_box:
                search_box.clear()
                # Type slowly like a human
                for char in f"{width}/{aspect}R{rim}":
                    search_box.send_keys(char)
                    time.sleep(random.uniform(0.05, 0.15))

                self.random_delay(1, 2)
                search_box.send_keys(Keys.RETURN)
                self.random_delay(5, 8)
                return True
            else:
                print("Search box not found, using direct URL")
                return False

        except Exception as e:
            print(f"Search error: {e}")
            return False

    def scrape_size(self, width, aspect, rim, max_pages=10):
        """Scrape all tires for a given size."""
        size_str = f"{width}/{aspect}R{rim}"

        print(f"\n{'='*60}")
        print(f"Scraping: {size_str}")
        print(f"{'='*60}")

        # Try search first
        if not self.search_for_size(width, aspect, rim):
            # Fall back to direct URL
            url = f"{self.BASE_URL}/tire-sizes/{width}-{aspect}r{rim}-tires"
            print(f"Using direct URL: {url}")
            self.driver.get(url)
            self.random_delay(5, 8)

        # Scroll to load content
        self.scroll_slowly()
        self.random_delay(2, 3)

        # Take screenshot
        self.driver.save_screenshot('debug_screenshot.png')
        print(f"Screenshot saved. Page title: {self.driver.title}")

        # Check page source for products
        page_source = self.driver.page_source

        # Debug: print some page info
        if 'no results' in page_source.lower() or 'no tires found' in page_source.lower():
            print("Page says no results found")
        elif 'product' in page_source.lower():
            print("Page contains 'product' text - good sign!")

        page_num = 1
        while page_num <= max_pages:
            print(f"\nPage {page_num}...")

            products = self.extract_products_from_page(size_str)

            if products:
                print(f"Found {len(products)} products")
                self.results.extend(products)
            else:
                print("No products found on this page")

                # Try waiting more and scrolling again
                if page_num == 1:
                    print("Waiting longer and trying again...")
                    self.random_delay(5, 8)
                    self.scroll_slowly()
                    products = self.extract_products_from_page(size_str)
                    if products:
                        print(f"Found {len(products)} products after waiting")
                        self.results.extend(products)
                    else:
                        break
                else:
                    break

            if not self.go_to_next_page():
                break

            page_num += 1
            self.random_delay(3, 5)

    def extract_products_from_page(self, size_str):
        """Extract product data from the current page."""
        products = []

        try:
            # Wait a bit for dynamic content
            time.sleep(3)

            # Try to find product data using JavaScript
            product_data = self.driver.execute_script("""
                const products = [];

                // Look for any links that might be product links
                const allLinks = document.querySelectorAll('a');

                const seen = new Set();

                allLinks.forEach(link => {
                    const href = link.href || '';
                    if (!href) return;
                    if (seen.has(href)) return;

                    // Look for tire product URLs
                    // SimpleTire URLs look like: /brand-model-p-275-45r20-specs
                    if (href.includes('-p-') && href.includes('simpletire.com')) {
                        seen.add(href);

                        // Get parent container for price/text
                        let card = link.closest('[class*="product"]') ||
                                   link.closest('[class*="Product"]') ||
                                   link.closest('[class*="card"]') ||
                                   link.closest('[class*="Card"]') ||
                                   link.closest('[class*="tile"]') ||
                                   link.closest('[class*="Tile"]') ||
                                   link.closest('[class*="item"]') ||
                                   link.closest('article') ||
                                   link.closest('li') ||
                                   link.parentElement;

                        const text = card ? (card.innerText || '') : '';

                        let price = '';
                        const priceMatch = text.match(/\\$([\\d,]+\\.?\\d*)/);
                        if (priceMatch) {
                            price = priceMatch[1].replace(',', '');
                        }

                        products.push({
                            url: href,
                            raw_text: text.substring(0, 500),
                            price: price
                        });
                    }
                });

                return products;
            """)

            print(f"Found {len(product_data)} product links")

            for item in product_data:
                url = item['url']

                # Parse info from URL
                # Example: /goodyear-eagle-sport-p-275-45r20-110w-xl
                url_path = url.split('/')[-1] if url else ''
                parts = url_path.replace('-p-', ' ').replace('-', ' ').split()

                brand = parts[0].title() if parts else ''

                # Find model (everything between brand and size)
                model_parts = []
                for i, p in enumerate(parts[1:], 1):
                    if re.match(r'^\d{3}$', p):  # Hit the width (e.g., 275)
                        break
                    model_parts.append(p)
                model = ' '.join(model_parts).title()

                # Parse size from URL
                size_match = re.search(r'(\d{3})[/-]?(\d{2,3})r(\d{2})', url, re.I)
                size = f"{size_match.group(1)}/{size_match.group(2)}R{size_match.group(3)}" if size_match else ''

                # Parse load/speed from URL (e.g., 110w)
                load_speed_match = re.search(r'(\d{2,3})([a-z])(?:-|$)', url, re.I)
                load_index = load_speed_match.group(1) if load_speed_match else ''
                speed_rating = load_speed_match.group(2).upper() if load_speed_match else ''

                product = {
                    'selected_size': size_str,
                    'brand': brand,
                    'model': model,
                    'size': size,
                    'price': item['price'],
                    'load_index': load_index,
                    'speed_rating': speed_rating,
                    'sku': '',
                    'url': url,
                    'scraped_at': datetime.now().isoformat()
                }

                products.append(product)

        except Exception as e:
            print(f"Error extracting products: {e}")

        return products

    def go_to_next_page(self):
        """Try to navigate to the next page."""
        try:
            next_selectors = [
                "a[aria-label='Next']",
                "button[aria-label='Next']",
                "[class*='next']:not([class*='disabled'])",
                "a[rel='next']"
            ]

            for selector in next_selectors:
                try:
                    buttons = self.driver.find_elements(By.CSS_SELECTOR, selector)
                    for btn in buttons:
                        if btn.is_displayed() and btn.is_enabled():
                            btn.click()
                            self.random_delay(3, 5)
                            self.scroll_slowly()
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

        # Remove duplicates
        seen_urls = set()
        unique_results = []
        for r in self.results:
            url = r.get('url', '')
            if url and url not in seen_urls:
                seen_urls.add(url)
                unique_results.append(r)

        self.results = unique_results

        csv_path = f"{filename}.csv"
        with open(csv_path, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=columns, extrasaction='ignore')
            writer.writeheader()
            writer.writerows(self.results)
        print(f"\nSaved {len(self.results)} products to {csv_path}")

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
                        help='Run browser in headless mode')

    args = parser.parse_args()

    scraper = SimpleTireScraper(headless=args.headless)

    try:
        scraper.setup()

        # Warmup first
        scraper.warmup()

        for size in args.sizes:
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
