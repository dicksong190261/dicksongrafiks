# DicksonGrafiks — Portfolio Site

A responsive single-page portfolio for DicksonGrafiks, built with React + Vite. Includes a 3D hero scene and interactive globe (Three.js, loaded via CDN at runtime) and Tailwind CSS (loaded via CDN at runtime).

## Project structure

```
.
├── index.html            # HTML entry point
├── netlify.toml           # Netlify build/deploy config
├── package.json
├── vite.config.ts
├── tsconfig.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx           # React root/mount
    ├── App.tsx            # Full portfolio page (all sections/components)
    └── vite-env.d.ts
```

## Run locally

Requires Node.js 18+ (Node 20 recommended).

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm install
npm run build
```

This outputs a static site to the `dist/` folder.

To preview the production build locally:

```bash
npm run preview
```

## Deploy to Netlify

### Option A — Drag and drop
1. Run `npm install && npm run build` locally.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag the generated `dist/` folder onto the page.

### Option B — Connect a Git repository (recommended)
1. Push this project to a GitHub/GitLab/Bitbucket repo.
2. In Netlify, click **Add new site → Import an existing project**.
3. Select your repo. Netlify will read `netlify.toml` automatically and use:
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

- **Tailwind CSS** and **Three.js** are loaded from CDNs at runtime by the app itself (see the top of `src/App.tsx` and the `useThreeLoader` hook) — no local Tailwind/Three.js build setup is required.
- **Images** (project thumbnails, photo-edit samples, founder photo) are hosted externally on ibb.co and loaded directly by URL — no local image assets needed.
- **Icons** come from the `lucide-react` npm package, listed as a dependency in `package.json`.
- The WhatsApp contact button and social links point to real external URLs already embedded in the component — update them in `src/App.tsx` if they need to change.
