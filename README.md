# WitzCraft — Nate Horowitz portfolio

React + Vite portfolio site, styled to match the original Webflow design.

## Running it locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173

```bash
npm run build     # production build into dist/
npm run preview   # serve the built site locally
```

## Editing content

Almost everything lives in **one file**: `src/data/projects.js`.

Each project looks like this:

```js
{
  slug: 'carbon-fiber-crank-arms',   // becomes /portfolio/carbon-fiber-crank-arms
  title: 'Carbon Fiber Crank Arms',  // shown on the tile and detail page
  cover: '/images/crank-arms.png',   // tile image
  span: 7,                           // tile width, out of 12 columns
  blurb: 'One-line summary.',
  body: ['Paragraph one.', 'Paragraph two.'],
  gallery: [{ src: '/images/foo.png', caption: 'What this shows' }],
}
```

- **Add a project** — copy a block, change the fields, done. It appears on the
  home page and the portfolio page automatically.
- **Reorder projects** — move the blocks around in the array.
- **Resize tiles** — change `span`. The numbers in each row should add to 12.
- **Add images** — drop files into `public/images/` and reference them as
  `/images/<filename>`.

Page text lives in `src/pages/` (`About.jsx`, `Contact.jsx`).

Colors, fonts and spacing are the CSS variables at the top of `src/styles.css`.

## Still to do

- `public/images/rocker.png` — the FSAE rocker FEA render. Not yet added; the
  tile shows a placeholder until it is.
- `public/images/school-group-work.jpg` — the insulin dispenser photo. Same.
- The LinkedIn URL in `src/data/projects.js` is a **guess**. Replace it with
  your real profile URL.

## Deploying to Azure Static Web Apps

1. Push this folder to a GitHub repository.
2. Azure Portal → **Create a resource** → **Static Web App**.
3. Plan type: **Free**.
4. Under Deployment, choose **GitHub** and pick your repo and branch.
5. Build presets: **React**, with
   - App location: `/`
   - Api location: *(leave blank)*
   - Output location: `dist`
6. Create. Azure commits a GitHub Actions workflow to your repo and deploys on
   every push to that branch.

`staticwebapp.config.json` is already set up so that client-side routes like
`/about` and `/portfolio/carbon-fiber-crank-arms` resolve correctly on refresh.
