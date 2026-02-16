# Pipe Offset Calc

A field-ready Progressive Web App for calculating pipe rolling offsets, travel lengths, and cut lengths — right from your phone, even with no signal.

Built for pipefitters and refrigeration techs who need fast, accurate answers on the job site.

## Features

- **Rolling Offset Math** — calculates true offset, travel, and fitting angle from rise, roll, and run
- **Accurate Cut Lengths** — subtracts fitting take-outs *and* adds make-in (engagement depth) so your cuts are right
- **Shop Fractions** — results in 1/16" fractions, not decimals (e.g. `10 5/8"`)
- **ACR + Standard Pipe** — supports refrigeration sizes (1/2" to 1-1/8") and standard pipe (1" to 8")
- **90° LR & 45° Fittings** — toggle between fitting types
- **Works Offline** — PWA with service worker, works with zero cell signal after first load
- **Install to Home Screen** — add it like a native app on iPhone or Android
- **Big Touch Targets** — designed for gloved hands and bright sun

## How It Works

```
True Offset = √(Rise² + Roll²)
Travel      = √(True Offset² + Run²)
Angle       = arcsin(True Offset / Travel)
Cut Length   = Travel - (Take-Out × 2) + (Make-In × 2)
```

## Quick Start

### Use the Web App

Deploy to Cloudflare Pages (or any static host) and open the URL on your phone.

### Run Locally

```bash
git clone https://github.com/kwamAG/offset_calc.git
cd offset_calc
npm install
npm run dev
```

Open `http://localhost:5173` on your phone (same Wi-Fi) or browser.

### Build for Production

```bash
npm run build
```

Output goes to `dist/` — deploy that folder to any static host.

## Deploy to Cloudflare Pages

1. Push to GitHub
2. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → Workers & Pages → Create → Pages
3. Connect the `offset_calc` repo
4. Build command: `npm run build` | Output directory: `dist`
5. Deploy — get a free `.pages.dev` URL

## Install on Your Phone

1. Open the deployed URL in Safari (iPhone) or Chrome (Android)
2. **iPhone:** Tap Share → Add to Home Screen
3. **Android:** Tap the browser menu → Install App
4. Use it like a native app — works offline

## Python CLI (Original)

The original Python calculator is still included:

```bash
python3 main.py
```

## Tech Stack

- React 18 + Vite 6
- PWA with service worker (offline-first)
- All math runs client-side — no backend needed

## License

[MIT](LICENSE)
