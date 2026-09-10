# DicksonGrafiks Portfolio

A single-page portfolio site built with React, TypeScript, Vite, and Tailwind CSS.

## Project structure

```
├── index.html              # HTML entry point
├── netlify.toml             # Netlify build & redirect config
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── public/
│   └── favicon.svg
└── src/
    ├── App.tsx              # Main portfolio component (all sections)
    ├── index.css            # Tailwind directives
    └── main.tsx             # React root render
```

## Run locally

```bash
npm install
npm run dev
```

This starts a dev server (default: http://localhost:5173).

## Build for production

```bash
npm run build
```

Output goes to the `dist/` folder.

## Deploy to Netlify

### Option A — Drag & drop (fastest)
1. Run `npm install && npm run build` locally.
2. Go to https://app.netlify.com/drop
3. Drag the generated `dist/` folder onto the page.

### Option B — Connect a Git repo (recommended for updates)
1. Push this project to a GitHub/GitLab/Bitbucket repo.
2. In Netlify: **Add new site → Import an existing project**, select the repo.
3. Netlify will auto-detect the settings from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Click **Deploy site**.

### Option C — Netlify CLI
```bash
npm install -g netlify-cli
npm install
npm run build
netlify deploy --prod --dir=dist
```

## Notes

- All images and video thumbnails are loaded from external URLs (ibb.co, Netlify-hosted assets, YouTube), so no local image assets are required.
- Three.js is lazy-loaded from a CDN (`cdnjs.cloudflare.com`) at runtime for the hero background and globe visualizations — no npm dependency needed for it.
- Icons come from `lucide-react`.
- Tailwind CSS is compiled at build time via PostCSS (no CDN script needed in production).
