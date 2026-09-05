# 04 — Managing your portfolio

A guide for Nate. How to add content, swap images, write new case studies, add
pages, and change how the site looks — either by prompting Claude Code or by
editing files yourself.

## Two ways to work

**Prompt Claude Code.** Open this project in Claude Code and describe what you
want. Fastest for anything structural — new projects, new pages, layout changes.

**Edit the files directly.** Fastest for fixing a typo or swapping a sentence.
Everything is plain text.

Either way the loop is the same:

```bash
npm run dev
```

Watch http://localhost:5173 as you go. When it looks right:

```bash
npm run build
```

```bash
git add -A && git commit -m "what you changed" && git push
```

Live in about two minutes.

---

## Changing text that already exists

| Text on the site | File |
|---|---|
| Header / footer wordmark, nav labels | [`src/Layout.jsx`](../src/Layout.jsx) |
| Home page hero sentence | [`src/pages/Home.jsx`](../src/pages/Home.jsx) |
| About page paragraphs | [`src/pages/About.jsx`](../src/pages/About.jsx) |
| "My Portfolio" banner | [`src/pages/Portfolio.jsx`](../src/pages/Portfolio.jsx) |
| Email, LinkedIn, school line | [`src/pages/Contact.jsx`](../src/pages/Contact.jsx) |
| Project titles, blurbs, write-ups, captions | [`src/data/projects.js`](../src/data/projects.js) |

Find the sentence, change it, save. That's the whole process.

**Or paste it to Claude:**

> Replace the About page text with this:
>
> *(paste your paragraphs)*

Blank line between paragraphs and Claude will split them correctly.

### Two things that break the page

**Apostrophes in `projects.js`.** Strings there are wrapped in single quotes, so
an apostrophe ends the string early and the page goes white. Use double quotes
for that string:

```js
blurb: "I'm using an apostrophe, so the outer quotes are double.",
```

**Curly braces and angle brackets.** `{ } < >` are code characters. Don't type
them raw into page text. Write `&lt;` if you need a `<`.

If the page does go white, look at the terminal running `npm run dev` — it names
the file and line. Undo that one edit and it comes straight back.

---

## Adding images

### Where they go

Drop files into `public/images/`. Reference them as `/images/filename.jpg` —
leading slash, no `public` in the path.

### Prepare them first

**Convert HEIC.** iPhone `.HEIC` files do not display in browsers. Several of
your NAC photos are HEIC. Convert to JPG first — open in Windows Photos →
*Save as* → JPG. Or ask Claude to convert a folder of them.

**Resize.** Photos straight off a phone are 2–5 MB. That's slow, especially on
mobile. Aim for **1600 px wide and under 500 KB**. Windows Photos → *Resize*, or
ask Claude.

**Name them lowercase with hyphens.** `crank-arm-layup.jpg`, not
`IMG_4267 copy.JPEG`. Azure treats filenames as case-sensitive; Windows doesn't.
A file named `Photo.PNG` referenced as `photo.png` works on your machine and
404s on the live site. This catches people constantly.

**Video.** `.MOV` files are huge and don't play reliably in browsers. Convert to
`.mp4` before using. Anything over ~10 MB should go on YouTube and be linked
instead.

### Add an image to an existing project's gallery

In [`src/data/projects.js`](../src/data/projects.js), find the project's
`gallery` list and add a line:

```js
gallery: [
  { src: '/images/crank-core.png', caption: 'Printed internal core' },
  { src: '/images/new-photo.jpg', caption: 'What this shows' },   // <- added
],
```

**Or prompt:**

> I put `layup-step-3.jpg` in public/images. Add it to the crank arms gallery
> with the caption "Third ply going down".

### Replace a tile image

Change the `cover` line for that project:

```js
cover: '/images/crank-arms.png',
```

---

## Adding a new project / case study

### The fast way — prompt Claude

> Add a new project called "Heat Exchanger Redesign".
> Cover image: `/images/hx-cover.jpg`
> Blurb: Redesigned a shell-and-tube heat exchanger for a thermal fluids course.
> Body:
> *(paste your paragraphs)*
> Gallery: hx-cad.png "CAD assembly", hx-test.jpg "On the test bench"

Claude adds the block, picks a URL slug, and rebalances the tile widths so the
grid still fits.

### The manual way

Copy an existing block in [`src/data/projects.js`](../src/data/projects.js) and
change every field:

```js
{
  slug: 'heat-exchanger-redesign',      // the URL: /portfolio/heat-exchanger-redesign
  title: 'Heat Exchanger Redesign',     // tile label + page banner
  cover: '/images/hx-cover.jpg',        // tile image
  span: 6,                              // tile width out of 12
  blurb: 'One sentence that sells it.',
  body: [
    'First paragraph.',
    'Second paragraph.',
  ],
  gallery: [
    { src: '/images/hx-cad.png', caption: 'CAD assembly' },
  ],
},
```

Rules:

- `slug` — lowercase, hyphens, no spaces. Must be unique.
- `span` — the numbers in each visual row should add to **12**. Current layout is
  `7 + 5` on row one, `4 + 4 + 4` on row two (the third is the LinkedIn tile).
  Adding a project means rebalancing.
- `gallery` can be an empty list: `gallery: []`.

It appears on both the home page and the portfolio page automatically, and gets
its own detail page. No other file to touch.

### Writing a good case study

The `body` paragraphs are where a recruiter decides whether you can think. A
pattern that works:

1. **The problem** — what needed to exist, and the constraint that made it hard.
2. **What you did** — your actual decisions, not a tool list.
3. **How you validated it** — FEA, testing, measurement, whatever proved it.
4. **What you'd change** — this reads as maturity, not weakness.

Numbers beat adjectives. "Cut mass 38% while holding peak stress under 190 MPa"
lands; "significantly optimized" doesn't.

---

## Adding a whole new page

Say you want a Resume page.

**Prompt:**

> Add a Resume page at /resume, in the same theme as About, with a link to
> download `public/nate-horowitz-resume.pdf`. Add it to the nav.

**Manually**, it's three steps:

1. Copy `src/pages/About.jsx` to `src/pages/Resume.jsx`, rename the function to
   `Resume`, change the content.
2. In `src/App.jsx`, add the import and a route:
   ```jsx
   <Route path="/resume" element={<Resume />} />
   ```
3. In `src/Layout.jsx`, add to the `links` list so it shows in the nav:
   ```js
   { to: '/resume', label: 'Resume' },
   ```

Any page using `<section className="patterned">` and `<div className="card
card--prose">` inherits the theme for free.

---

## Changing the layout

### Tile sizes on the home / portfolio grid

Change `span` in `projects.js`. The grid is 12 columns wide.

| Look | Spans |
|---|---|
| Two equal tiles | `6, 6` |
| Wide + narrow | `8, 4` or `7, 5` |
| Three equal | `4, 4, 4` |
| Four equal | `3, 3, 3, 3` |

A row's spans should add to 12. Tiles wrap to the next row automatically.

### Tile shape

In [`src/styles.css`](../src/styles.css), find `.tile`:

```css
aspect-ratio: 16 / 10;
```

`16 / 10` is the current wide rectangle. `4 / 3` is boxier, `1 / 1` square,
`3 / 2` classic photo.

### Hero height

```css
.hero { height: 320px; }
.hero--short { height: 240px; }
```

---

## Changing the design

Everything visual is a CSS variable at the top of
[`src/styles.css`](../src/styles.css):

```css
:root {
  --green: #40604a;        /* header background */
  --green-deep: #35513e;   /* footer background */
  --cream: #f0ede6;        /* page background */
  --ink: #2c3138;          /* headings */
  --body: #3a4048;         /* body text */
  --label: rgba(84, 84, 84, 0.78);  /* the grey bar over tile images */

  --bar-height: 78px;      /* header/footer height */
  --page-max: 1180px;      /* content width */
  --radius: 14px;          /* corner rounding */
}
```

Change one value and it updates everywhere it's used. Colors are hex codes —
grab new ones from any color picker.

**Fonts** are loaded in [`index.html`](../index.html) from Google Fonts, then set
here:

```css
--font-head: 'Montserrat', system-ui, sans-serif;   /* nav, tile labels, headings */
--font-body: 'Lato', system-ui, sans-serif;         /* paragraphs, hero */
```

To swap: pick fonts at [fonts.google.com](https://fonts.google.com), replace the
`<link>` in `index.html`, update these two variables.

**The background pattern** is `public/images/pattern.jpg`. Replace the file to
change it — it must be a seamlessly tiling image. Its scale:

```css
.patterned { background-size: 480px auto; }
```

**Or just prompt:**

> Make the header green darker and the tile label bars fully opaque black.

---

## Prompt templates

Copy, fill in, send.

**New project:**
> Add a project: title "___", slug "___", cover `/images/___`, blurb "___".
> Body paragraphs: ___
> Gallery: `___.jpg` "caption", `___.png` "caption"
> Rebalance the tile spans so the grid still fits.

**Replace page text:**
> Replace the ___ page text with: ___

**New images:**
> I added ___ and ___ to public/images. Put them in the ___ project gallery with
> captions ___ and ___.

**Design change:**
> Change ___ to ___. Show me a screenshot before I push.

**Reorder:**
> Move the FSAE rocker project to be first on the home page.

**When something breaks:**
> The page went white after I edited ___. Here's the terminal error: ___

---

## Before you push — 60 second check

1. `npm run build` succeeds. If it fails locally, it fails on Azure.
2. Click every page at http://localhost:5173.
3. Refresh directly on a project page — catches routing problems.
4. Narrow the browser window to phone width and check the grid stacks.
5. No image is a broken icon or a placeholder box.

Then:

```bash
git add -A && git commit -m "describe the change" && git push
```

```bash
gh run watch
```

---

## Don't touch these

Unless you know what you're doing, or you're asking Claude to:

| File | Why |
|---|---|
| `staticwebapp.config.json` | Makes `/about` survive a refresh. Delete it and deep links 404 on the live site. |
| `.github/workflows/` | The deploy pipeline. |
| `package.json` / `package-lock.json` | Dependency versions. Use `npm install <thing>` instead of editing by hand. |
| `node_modules/` | Generated. Never edit, never commit. |
| `dist/` | Generated by `npm run build`. Overwritten every time. |

## When something goes wrong

**Page is white** — syntax error. Terminal running `npm run dev` names the file
and line. Usually an apostrophe or a missing comma.

**Undo your last commit** (before pushing):

```bash
git reset --soft HEAD~1
```

**Undo a deploy** (after pushing) — this is safe, it adds a new commit that
reverses the last one:

```bash
git revert HEAD && git push
```

**Throw away uncommitted edits to one file:**

```bash
git checkout -- src/pages/About.jsx
```

**See what you changed but haven't committed:**

```bash
git diff
```

**Check the whole pipeline:**

```bash
npm run status
```
