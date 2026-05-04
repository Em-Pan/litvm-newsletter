# LitVM X Post Screenshot Process

## Status

Programmatic capture works on the April newsletter source posts.

The process uses:

- Twitter/X official embed page: `https://platform.twitter.com/embed/Tweet.html?dnt=true&id=<tweet_id>`
- Local Google Chrome headless rendering
- ImageMagick `magick -trim` to remove extra whitespace
- No Playwright, Puppeteer, X API key, or logged-in X session required

## Files

- Script: `scripts/capture-x-embeds.mjs`
- April URL list: `scripts/litvm-april-x-urls.txt`
- April output: `images/x-posts-april/`

## Run

```bash
cd /Users/meow/scout-sandbox/litvm-newsletter
XSHOT_HEIGHT=1800 node scripts/capture-x-embeds.mjs scripts/litvm-april-x-urls.txt images/x-posts-april
```

## URL List Format

Each line is:

```text
slug https://x.com/account/status/1234567890
```

Example:

```text
lead-liteforge-live https://x.com/LitecoinVM/status/2044460314645979226
```

The script extracts the tweet ID from the URL and saves numbered PNGs:

```text
01-lead-liteforge-live.png
02-hard-money-manifesto.png
...
```

## April Output Verified

Generated 11 PNGs:

```text
01-lead-liteforge-live.png 550x721
02-hard-money-manifesto.png 550x719
03-goldsky-partner.png 550x720
04-cmc-labs.png 550x1205
05-vanguard-collective.png 550x1206
06-aztec-research.png 550x1430
07-litecoin-summit.png 550x649
08-dia-oracle.png 550x1157
09-testnet-stats.png 550x528
10-ai-banger.png 550x600
11-crypto-times.png 550x840
```

## Caveats

- This depends on Twitter/X's public embed renderer staying available.
- It captures the embed-card presentation, not a logged-in X timeline screenshot.
- Long quote-tweets need a tall viewport. `XSHOT_HEIGHT=1800` worked for April.
- If a future post is deleted, age-gated, private, or blocked by X, the script will fail for that URL and manual capture may be needed.
