#!/usr/bin/env python3
"""
SimpleTire.com Web Scraper
Tries multiple approaches: API, embedded JSON, and page scraping
"""

import csv
import time
import random
import re
import sys
import json
from datetime import datetime

try:
    from selenium import webdriver
    from selenium.webdriver.edge.options import Options
    from selenium.webdriver.common.by import By
    from selenium.webdriver.common.keys import Keys
    from selenium.webdriver.common.action_chains import ActionChains
except ImportError:
    print("Installing selenium...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "selenium"])
    from selenium import webdriver
    from selenium.webdriver.edge.options import Options
    from selenium.webdriver.common.by import By
    from selenium.webdriver.common.keys import Keys
    from selenium.webdriver.common.action_chains import ActionChains

try:
    import requests
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "requests"])
    import requests

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
        self.session = requests.Session()

    def setup(self):
        """Initialize browser."""
        print("Starting Edge browser...")
        options = Options()
        if self.headless:
            options.add_argument('--headless=new')
        options.add_argument('--start-maximized')

        # Enable performance logging to capture network requests
        options.set_capability('ms:loggingPrefs', {'performance': 'ALL'})

        self.driver = webdriver.Edge(options=options)
        self.driver.set_page_load_timeout(120)
        print("Browser started!")

    def close(self):
        if self.driver:
            self.driver.quit()

    def random_delay(self, min_sec=2, max_sec=5):
        time.sleep(random.uniform(min_sec, max_sec))

    def extract_cookies_to_session(self):
        """Copy cookies from Selenium to requests session."""
        cookies = self.driver.get_cookies()
        for cookie in cookies:
            self.session.cookies.set(cookie['name'], cookie['value'])

    def try_api_approach(self, width, aspect, rim):
        """Try to find and use SimpleTire's API."""
        size_str = f"{width}/{aspect}R{rim}"
        print(f"\nTrying API approach for {size_str}...")

        # Common API patterns for tire sites
        api_endpoints = [
            f"{self.BASE_URL}/api/tires?size={width}-{aspect}r{rim}",
            f"{self.BASE_URL}/api/v1/tires?width={width}&aspect={aspect}&rim={rim}",
            f"{self.BASE_URL}/api/products?tire_size={width}/{aspect}R{rim}",
            f"{self.BASE_URL}/api/search?q={width}/{aspect}R{rim}",
            f"{self.BASE_URL}/graphql",  # Many sites use GraphQL
        ]

        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'application/json',
            'Referer': self.BASE_URL,
        }

        for endpoint in api_endpoints:
            try:
                print(f"  Trying: {endpoint}")
                resp = self.session.get(endpoint, headers=headers, timeout=10)
                if resp.status_code == 200:
                    try:
                        data = resp.json()
                        print(f"  Got JSON response!")
                        return data
                    except:
                        pass
            except Exception as e:
                pass

        return None

    def extract_json_from_page(self):
        """Look for embedded JSON data in the page (Next.js, React, etc.)."""
        print("\nLooking for embedded JSON data...")

        try:
            # Look for __NEXT_DATA__ (Next.js sites)
            scripts = self.driver.find_elements(By.CSS_SELECTOR, 'script#__NEXT_DATA__')
            for script in scripts:
                try:
                    data = json.loads(script.get_attribute('innerHTML'))
                    print("  Found __NEXT_DATA__!")
                    return data
                except:
                    pass

            # Look for any script tags with JSON data
            scripts = self.driver.find_elements(By.CSS_SELECTOR, 'script[type="application/json"]')
            for script in scripts:
                try:
                    data = json.loads(script.get_attribute('innerHTML'))
                    if isinstance(data, dict) and ('products' in str(data).lower() or 'tires' in str(data).lower()):
                        print("  Found JSON data in script tag!")
                        return data
                except:
                    pass

            # Look for window.__PRELOADED_STATE__ or similar
            preloaded_vars = [
                'window.__PRELOADED_STATE__',
                'window.__INITIAL_STATE__',
                'window.__DATA__',
                'window.pageData',
                'window.initialData',
            ]

            for var in preloaded_vars:
                try:
                    data = self.driver.execute_script(f"return {var};")
                    if data:
                        print(f"  Found {var}!")
                        return data
                except:
                    pass

            # Try to find product data in any global variable
            try:
                all_data = self.driver.execute_script("""
                    // Look for any variable that might contain product data
                    const results = [];

                    // Check common variable names
                    const vars = ['products', 'tires', 'items', 'searchResults', 'pageData'];
                    for (const v of vars) {
                        if (window[v]) results.push({name: v, data: window[v]});
                    }

                    return results;
                """)
                if all_data:
                    print(f"  Found global variables: {[d['name'] for d in all_data]}")
                    return all_data
            except:
                pass

        except Exception as e:
            print(f"  Error: {e}")

        return None

    def parse_products_from_json(self, data, size_str):
        """Try to parse product data from JSON structure."""
        products = []

        if not data:
            return products

        # Convert to string and search for product patterns
        data_str = json.dumps(data) if isinstance(data, (dict, list)) else str(data)

        # Look for URLs that match product pattern
        url_pattern = r'https?://[^"]*simpletire\.com/[^"]*-p-[^"]*'
        urls = re.findall(url_pattern, data_str)

        for url in set(urls):
            product = self.parse_product_from_url(url, size_str)
            if product:
                products.append(product)

        # Also try to find price patterns near URLs
        price_pattern = r'"price":\s*["\']?(\d+\.?\d*)["\']?'
        prices = re.findall(price_pattern, data_str)

        return products

    def parse_product_from_url(self, url, size_str):
        """Parse product info from a SimpleTire URL."""
        # URL format: /brand-model-p-275-45r20-110w-xl
        url_path = url.split('/')[-1] if url else ''

        if '-p-' not in url_path:
            return None

        parts = url_path.split('-p-')
        brand_model = parts[0] if parts else ''
        specs = parts[1] if len(parts) > 1 else ''

        # Parse brand and model
        bm_parts = brand_model.replace('-', ' ').split()
        brand = bm_parts[0].title() if bm_parts else ''
        model = ' '.join(bm_parts[1:]).title() if len(bm_parts) > 1 else ''

        # Parse size from specs
        size_match = re.search(r'(\d{3})[/-]?(\d{2,3})r(\d{2})', specs, re.I)
        size = f"{size_match.group(1)}/{size_match.group(2)}R{size_match.group(3)}" if size_match else ''

        # Parse load/speed
        load_speed_match = re.search(r'(\d{2,3})([a-z])(?:-|$)', specs, re.I)
        load_index = load_speed_match.group(1) if load_speed_match else ''
        speed_rating = load_speed_match.group(2).upper() if load_speed_match else ''

        return {
            'selected_size': size_str,
            'brand': brand,
            'model': model,
            'size': size,
            'price': '',
            'load_index': load_index,
            'speed_rating': speed_rating,
            'sku': '',
            'url': url,
            'scraped_at': datetime.now().isoformat()
        }

    def scrape_with_network_capture(self, width, aspect, rim):
        """Try to capture API calls made by the page."""
        size_str = f"{width}/{aspect}R{rim}"
        url = f"{self.BASE_URL}/tire-sizes/{width}-{aspect}r{rim}-tires"

        print(f"\nLoading page and capturing network requests...")
        print(f"URL: {url}")

        self.driver.get(url)
        self.random_delay(8, 12)  # Wait longer for API calls

        # Scroll to trigger lazy loading
        for i in range(5):
            self.driver.execute_script(f"window.scrollTo(0, {i * 500});")
            time.sleep(1)

        self.driver.save_screenshot('debug_screenshot.png')
        print(f"Screenshot saved. Title: {self.driver.title}")

        # Extract cookies for API calls
        self.extract_cookies_to_session()

        # Try to find JSON data
        json_data = self.extract_json_from_page()
        if json_data:
            products = self.parse_products_from_json(json_data, size_str)
            if products:
                print(f"Found {len(products)} products from JSON data!")
                return products

        # Try API endpoints
        api_data = self.try_api_approach(width, aspect, rim)
        if api_data:
            products = self.parse_products_from_json(api_data, size_str)
            if products:
                print(f"Found {len(products)} products from API!")
                return products

        # Fall back to page scraping
        print("\nFalling back to page scraping...")
        return self.extract_products_from_page(size_str)

    def extract_products_from_page(self, size_str):
        """Extract product data from the current page."""
        products = []

        try:
            # Get all links and look for product URLs
            product_data = self.driver.execute_script("""
                const products = [];
                const seen = new Set();

                // Get ALL anchor tags
                document.querySelectorAll('a').forEach(link => {
                    const href = link.href || '';
                    if (!href || seen.has(href)) return;

                    // Check if it looks like a product URL
                    if (href.includes('simpletire.com') && href.includes('-p-')) {
                        seen.add(href);

                        let card = link.closest('[class*="product"]') ||
                                   link.closest('[class*="card"]') ||
                                   link.closest('article') ||
                                   link.closest('li') ||
                                   link.parentElement;

                        const text = card ? card.innerText : '';

                        let price = '';
                        const priceMatch = text.match(/\\$([\\d,]+\\.?\\d*)/);
                        if (priceMatch) price = priceMatch[1].replace(',', '');

                        products.push({url: href, price: price, text: text.substring(0, 200)});
                    }
                });

                return products;
            """)

            print(f"Found {len(product_data)} product links on page")

            for item in product_data:
                product = self.parse_product_from_url(item['url'], size_str)
                if product:
                    product['price'] = item.get('price', '')
                    products.append(product)

        except Exception as e:
            print(f"Error extracting products: {e}")

        return products

    def scrape_size(self, width, aspect, rim, max_pages=10):
        """Scrape all tires for a given size."""
        size_str = f"{width}/{aspect}R{rim}"

        print(f"\n{'='*60}")
        print(f"Scraping: {size_str}")
        print(f"{'='*60}")

        # First, visit homepage to get cookies
        print("\nVisiting homepage first...")
        self.driver.get(self.BASE_URL)
        self.random_delay(3, 5)

        # Now try to scrape
        products = self.scrape_with_network_capture(width, aspect, rim)

        if products:
            self.results.extend(products)
        else:
            print("\nNo products found. Check debug_screenshot.png")

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
                        help='Max pages per size')
    parser.add_argument('--output', '-o', help='Output filename')
    parser.add_argument('--headless', action='store_true',
                        help='Run headless')

    args = parser.parse_args()

    scraper = SimpleTireScraper(headless=args.headless)

    try:
        scraper.setup()

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
