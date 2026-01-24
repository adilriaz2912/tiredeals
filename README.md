# SimpleTire Scraper

Web scraper for extracting tire data from SimpleTire.com.

## Setup

```bash
pip install -r requirements.txt
playwright install chromium
```

## Usage

### Scrape specific tire sizes:
```bash
python scraper.py --sizes 225/45R17 265/70R17 275/55R20
```

### Scrape with visible browser (helps with bot detection):
```bash
python scraper.py --sizes 225/45R17 --visible
```

### Scrape a category page:
```bash
python scraper.py --category "https://www.simpletire.com/all-terrain-tires"
```

### Custom output filename:
```bash
python scraper.py --sizes 225/45R17 --output my_tire_data
```

### Limit pages per size:
```bash
python scraper.py --sizes 225/45R17 --max-pages 3
```

## Output

The scraper outputs data in both CSV and Excel (.xlsx) formats with columns:
- `size` - Tire size (e.g., 225/45R17)
- `brand` - Manufacturer (e.g., Michelin, Goodyear)
- `model` - Tire model name
- `price` - Price per tire
- `url` - Product page URL
- `specs` - Additional specifications
- `scraped_at` - Timestamp

## Tips

- Use `--visible` mode if you're getting blocked
- Add delays between requests to avoid detection
- Start with a small `--max-pages` value for testing
