# WitzCraft — Nate Horowitz portfolio

Mechanical engineering portfolio site. React + Vite, deployed to Azure Static
Web Apps, served at **witzcraftworks.com**.

```bash
npm install     # once
npm run dev     # http://localhost:5173
```

> Always view the site at **http://localhost:5173**. Opening `index.html`
> directly from the file system shows a blank page — a React app has to be
> served by the dev server.

## The workflow — change it, check it, ship it

Four steps. Full detail in [docs/02-daily-workflow.md](docs/02-daily-workflow.md).

**1. Start the dev server** and leave it running. Every save reloads the browser.

```bash
npm run dev
```

**2. Make your change.** Content lives in `src/data/projects.js`; page text is in
`src/pages/`. Watch http://localhost:5173 as you save.

**3. Verify the real build.** Hot reload is not the same thing as the production
build — this is the step that catches what would otherwise fail in the cloud.

```bash
npm run build
```

If that errors, fix it before pushing. A broken build never reaches the live
site, but you'll waste a round trip finding out.

**4. Ship it.** Pushing to `main` is what deploys.

```bash
git add -A && git commit -m "describe your change" && git push
```

Live in about 90 seconds. Watch it land:

```bash
gh run watch
```

Then confirm everything is healthy end to end:

```bash
npm run status
```

If something goes wrong after it's live, this reverses the last change and
redeploys — it's safe, it adds a new commit rather than erasing history:

```bash
git revert HEAD && git push
```

## Guides

| Guide | What it covers |
|---|---|
| [docs/01-deploy.md](docs/01-deploy.md) | One-time setup: CLIs, GitHub repo, GitHub Actions, Azure Static Web App |
| [docs/02-daily-workflow.md](docs/02-daily-workflow.md) | The edit → test → push loop, and how to check status |
| [docs/03-custom-domain.md](docs/03-custom-domain.md) | Buying witzcraftworks.com on Namecheap and pointing it at Azure |
| [docs/04-managing-your-site.md](docs/04-managing-your-site.md) | **Start here for content.** Adding text, images, case studies, pages; changing layout and design |

## Editing content

Almost everything lives in **one file**: [`src/data/projects.js`](src/data/projects.js).

```js
{
  slug: 'carbon-fiber-crank-arms',   // becomes /portfolio/carbon-fiber-crank-arms
  title: 'Carbon Fiber Crank Arms',  // tile label + project page banner
  cover: '/images/crank-arms.png',   // tile image
  span: 7,                           // tile width, out of 12 columns
  blurb: 'One-line summary.',
  body: ['Paragraph one.', 'Paragraph two.'],
  gallery: [{ src: '/images/foo.png', caption: 'What this shows' }],
}
```

- **Add a project** — copy a block, change the fields. It appears on the home
  page and the portfolio page automatically.
- **Reorder** — move blocks around in the array.
- **Resize tiles** — change `span`. The numbers in a row should add to 12.
- **Add images** — drop files in `public/images/`, reference as `/images/<name>`.

### Where the other text lives

| Text | File |
|---|---|
| Header / footer wordmark, nav labels | [`src/Layout.jsx`](src/Layout.jsx) |
| Home hero sentence | [`src/pages/Home.jsx`](src/pages/Home.jsx) |
| About page copy | [`src/pages/About.jsx`](src/pages/About.jsx) |
| "My Portfolio" banner | [`src/pages/Portfolio.jsx`](src/pages/Portfolio.jsx) |
| Email, LinkedIn text, school line | [`src/pages/Contact.jsx`](src/pages/Contact.jsx) |
| Colors, fonts, spacing | CSS variables at the top of [`src/styles.css`](src/styles.css) |

### Two syntax gotchas

**Apostrophes.** In `projects.js` strings are wrapped in single quotes, so an
apostrophe ends the string early. Use double quotes for that string:

```js
blurb: "I'm using an apostrophe, so the outer quotes are double.",
```

**Curly braces and angle brackets.** `{ } < >` are code characters in JSX.
Don't type them raw into page text — write `&lt;` if you need a `<`.

## Project structure

```
witzcraft/
├─ public/
│  ├─ images/              all site images
│  ├─ pattern.svg          favicon
│  └─ staticwebapp.config.json  Azure routing (SPA fallback)
├─ src/
│  ├─ data/projects.js     ← all project content
│  ├─ pages/               one file per page
│  ├─ components/Tiles.jsx the clickable image grid
│  ├─ Layout.jsx           header, footer, nav
│  └─ styles.css           all styling
├─ .github/workflows/      GitHub Actions deploy pipeline
├─ scripts/status.ps1      pipeline status check
└─ docs/                   the guides above
```

## Commands

```bash
npm run dev        # dev server with hot reload
npm run build      # production build into dist/
npm run preview    # serve the production build locally
npm run status     # git + GitHub Actions + Azure + live site status
```

## Current status

**The site is live at https://witzcraftworks.com** — deployed, on HTTPS, with a
free auto-renewing certificate. Last updated 2026-09-05.

### Live resources

| Thing | Value |
|---|---|
| Public URL | https://witzcraftworks.com |
| Azure default URL | https://brave-sky-01ff4d80f.5.azurestaticapps.net |
| GitHub repo | [horowitzna/witzcraft](https://github.com/horowitzna/witzcraft) (public) |
| Azure Static Web App | `witzcraft` in `witzcraft-rg`, East US 2, Free plan |
| Azure account | `horowitz.na@northeastern.edu`, "Azure subscription 1" |
| Deploy trigger | Every push to `main` |

Custom domain status: apex **Ready**, `www` validating at time of writing.
Check with `npm run status`.

### Northeastern tenant policy

The NU Azure tenant enforces a tagging policy (`nuroot-tagging-initiative`).
Every resource group must carry `Owner`, `Cost Center`, and `IaC managed` tags
or creation is denied. Current values:

| Tag | Value |
|---|---|
| `Owner` | `horowitz.na@northeastern.edu` |
| `Cost Center` | `Student-Personal` — **placeholder**, correct it if NU issues you a real one |
| `IaC managed` | `horowitzna/witzcraft` |

Change with:

```bash
az group update -n witzcraft-rg --tags "Owner=..." "Cost Center=..." "IaC managed=..."
```

### Content to do

- `public/images/rocker.png` — FSAE rocker FEA render. Tile shows a placeholder
  until this exists.
- `public/images/school-group-work.jpg` — insulin dispenser photo. Same.
- ~~The LinkedIn URL is a placeholder guess.~~ Fixed 2026-09-05 to
  `linkedin.com/in/nate-horowitz-99ba1436a`.
- The About page copy is a first draft written from context, not from Nate.
  Rewrite it.
- Several photos in `public/images/` are 2–5 MB straight off a phone. Resize to
  ~1600 px wide before the site gets much traffic.

## Notes

- This folder lives under OneDrive. `node_modules` is gitignored, but OneDrive
  will still try to sync it. Right-click the folder → *Free up space*, or move
  the project outside OneDrive if syncing gets slow.
- `public/staticwebapp.config.json` makes client-side routes like `/about`
  survive a browser refresh. It lives in `public/` so Vite copies it into
  `dist/`, which is what Azure actually deploys. Without it Azure returns 404 on
  refresh — don't delete it or move it back to the project root.
