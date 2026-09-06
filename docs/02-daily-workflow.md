# 02 — Daily workflow

The loop: **edit → check locally → push → it's live at witzcraftworks.com.**

Setup is done. This is the guide you'll actually use week to week.

## The four steps

### 1. Start the dev server

```bash
npm run dev
```

Open **http://localhost:5173**. Leave it running. Every save reloads the browser
instantly.

> Never open `index.html` from the file system. It shows a blank page every
> time — a React app has to be served, and `index.html` on its own is just an
> empty shell that loads the app.

### 2. Make your change

| What you want to change | File |
|---|---|
| Project titles, blurbs, write-ups, captions, tile images | [`src/data/projects.js`](../src/data/projects.js) |
| About page text | [`src/pages/About.jsx`](../src/pages/About.jsx) |
| Home hero sentence | [`src/pages/Home.jsx`](../src/pages/Home.jsx) |
| Contact details | [`src/pages/Contact.jsx`](../src/pages/Contact.jsx) |
| Nav labels, wordmark | [`src/Layout.jsx`](../src/Layout.jsx) |
| Colors, fonts, spacing | [`src/styles.css`](../src/styles.css) |
| New images | drop into `public/images/` |

See [04-managing-your-site.md](04-managing-your-site.md) for adding whole
projects, pages, or design changes.

Watch the browser as you save. **If the page goes white, you have a syntax
error** — look at the terminal running `npm run dev`, it names the file and line.
Usually an apostrophe inside single quotes, or a missing comma.

### 3. Check it properly

Hot reload is not the production build. Run this before every push:

```bash
npm run build
```

**If this fails, the deploy would have failed too.** Fix it first — you save
yourself a round trip.

To see exactly what Azure will serve:

```bash
npm run preview
```

That serves the built site on port 4173. Click every page, and **refresh while
on a deep link** like `/portfolio/carbon-fiber-crank-arms`. Routing problems only
show up here, never in `npm run dev`.

Quick manual pass:

1. Every page loads.
2. Refresh on a project page — no 404.
3. Narrow the window to phone width — the grid stacks.
4. No broken-image icons or "Image missing" boxes you didn't expect.

### 4. Push

```bash
git add -A
```

```bash
git commit -m "describe what you changed"
```

```bash
git push
```

Pushing to `main` is what triggers the deploy. Roughly 90 seconds start to
finish.

## Watching and checking

Block until the deploy finishes:

```bash
gh run watch
```

Recent runs:

```bash
gh run list --limit 5
```

Why one failed:

```bash
gh run view --log-failed
```

Everything at once — local tree, GitHub Actions, Azure app, custom domains, and
whether all three live URLs respond:

```bash
npm run status
```

Healthy output looks like this:

```
== Local working tree
   [ok]   Clean - everything committed
   [ok]   On branch 'main'
   [ok]   In sync with origin/main

== GitHub Actions
   [ok]   2026-09-06T02:17  Record live deployment values in docs

== Azure Static Web App
   [ok]   Default hostname: brave-sky-01ff4d80f.5.azurestaticapps.net
   [ok]   witzcraftworks.com - Ready
   [ok]   www.witzcraftworks.com - Ready

== Live site
   [ok]   https://witzcraftworks.com -> 200
```

## Preview a change without touching the live site

Open a pull request and Azure builds it to a temporary URL. The live site stays
untouched until you merge. Free plan allows 3 at a time.

```bash
git checkout -b new-project
```

```bash
git add -A && git commit -m "Add heat exchanger project"
```

```bash
git push -u origin new-project
```

```bash
gh pr create --fill
```

Azure comments the preview URL on the PR within a couple of minutes.

```bash
gh pr view --web
```

Merge to go live:

```bash
gh pr merge --squash --delete-branch
```

Then get back onto main locally:

```bash
git checkout main && git pull
```

## Undo

**Uncommitted edits to one file:**

```bash
git checkout -- src/pages/About.jsx
```

**Last commit, not yet pushed** (keeps your edits, undoes the commit):

```bash
git reset --soft HEAD~1
```

**Something already live** — safe, adds a new commit that reverses the last one:

```bash
git revert HEAD && git push
```

Redeploys the previous state in about 90 seconds.

## Quick reference

| Task | Command |
|---|---|
| Start editing | `npm run dev` |
| Verify the real build | `npm run build` |
| Preview the real build | `npm run preview` |
| Ship it | `git add -A && git commit -m "..." && git push` |
| Watch the deploy | `gh run watch` |
| Check everything | `npm run status` |
| See failure logs | `gh run view --log-failed` |
| Roll back | `git revert HEAD && git push` |

## Things that bite

**Pushed but nothing deployed** — you're on a branch other than `main`. Check
with `git branch --show-current`.

**`gh: command not found`** — that terminal predates the CLI install. Open a new
one.

**Site looks stale after a successful deploy** — browser cache. Ctrl+Shift+R.

**An image doesn't show up live but works locally** — filenames are
case-sensitive on Azure and not on Windows. `Photo.PNG` referenced as
`photo.png` works on your machine and 404s in production. Keep filenames
lowercase with hyphens.

**HEIC images don't display** — browsers can't render iPhone `.HEIC`. Convert to
JPG first.

**Large images make the site slow** — several photos in `public/images/` are
2–5 MB straight off a phone. Resize to ~1600 px wide, under 500 KB.

**The build passes but the live site is blank** — check that the workflow's
`app_location` is `dist`. With `skip_app_build: true` the action ignores
`output_location` and uploads `app_location` directly, so pointing it at `/`
deploys your source tree instead of the build.
