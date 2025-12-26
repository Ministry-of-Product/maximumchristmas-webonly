# Maximum Christmas - Static GitHub Pages Site

This is a static snapshot of the Maximum Christmas leaderboards, hosted on GitHub Pages.

## Overview

This repository contains a static website that displays the leaderboards for Maximum Christmas, featuring:
- Real products leaderboard - Products that players correctly identified as real
- Fake products leaderboard - Fake products that fooled the most players

## Project Structure

```
maximumchristmas-webonly/
├── index.html                 # Main homepage
├── real-leaderboard.html      # Real products leaderboard page
├── leaderboard.html           # Fake products leaderboard page
├── _config.yml                # GitHub Pages configuration
├── assets/
│   ├── css/
│   │   └── style.css         # Site styles
│   ├── js/
│   │   └── main.js           # JavaScript for leaderboard display
│   └── images/
│       └── products/         # Product images
├── data/
│   ├── real-leaderboard.json # Real products data snapshot
│   └── fake-leaderboard.json # Fake products data snapshot
└── scripts/
    └── fetch-data.js         # Data collection script
```

## Setup

1. Clone this repository
2. Run the data collection script to fetch the latest leaderboard data and images:

```bash
npm run fetch-data
```

This will:
- Fetch leaderboard data from the API
- Download all product images
- Save data as JSON files
- Update image paths to local references

## GitHub Pages Deployment

This site is configured for GitHub Pages. To deploy:

1. Push this repository to GitHub
2. Go to Settings > Pages
3. Select the branch (usually `main` or `gh-pages`)
4. The site will be available at `https://[username].github.io/maximumchristmas-webonly/`

Or if using a custom domain, configure it in the Pages settings.

## Features

- Static snapshot of leaderboard data
- All images hosted locally
- Google Analytics tracking (ID: G-PHXN9MC494)
- Responsive design
- No external API dependencies

## Data Collection

The `scripts/fetch-data.js` script fetches data from:
- `https://maximumchristmas.com/api/real-leaderboard`
- `https://maximumchristmas.com/api/fake-leaderboard`

It downloads all product images and saves them locally, updating the JSON data to reference local image paths.

## License

© 2025 MaximumChristmas. Taking it too far since today.

Created by [the Ministry Of Product](https://ministryofproduct.com)

