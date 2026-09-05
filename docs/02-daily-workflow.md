# 02 — Daily workflow

The loop: **edit → see it locally → push → it's live.**

## Start working

```bash
npm run dev
```

Open http://localhost:5173. Leave it running. Every save reloads the browser
instantly — no rebuild, no refresh.

> Never open `index.html` from the file system. Blank page every time.

## Make a change

Most edits are in [`src/data/projects.js`](../src/data/projects.js). See the
[README](../README.md#editing-content) for the field-by-field map.

Watch the browser as you save. If the page goes white, you have a syntax error —
check the terminal running `npm run dev`, it names the file and line.

## Test it properly before pushing

Hot reload is not the same as the real build. Before you push:

```bash
npm run build
```

If that fails, the deploy would have failed too. Fix it first.

To view exactly what Azure will serve:

```bash
npm run preview
```

That serves the built site (usually on port 4173). Click through every page and
refresh on a deep link like `/portfolio/carbon-fiber-crank-arms` — this is where
routing problems show up that `npm run dev` hides.

## Push

```bash
git add -A
```

```bash
git commit -m "Update About page copy"
```

```bash
git push
```

Deploy starts within seconds. Takes roughly 1–2 minutes.

## Watch the deploy

Blocks until it finishes, then reports pass or fail:

```bash
gh run watch
```

Recent history:

```bash
gh run list --limit 5
```

Why a run failed:

```bash
gh run view --log-failed
```

## Check everything at once

```bash
npm run status
```

Reports: uncommitted changes, whether you're ahead of origin, the last workflow
run, the Azure app state, custom domain status, and whether the live site
responds.

## Preview a change without touching the live site

Open a pull request and Azure builds it to a temporary URL. The live site stays
untouched until you merge. Free plan allows 3 of these at a time.

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

Azure posts the preview URL as a comment on the PR within a couple of minutes.

```bash
gh pr view --web
```

Happy with it? Merge, and it goes live:

```bash
gh pr merge --squash --delete-branch
```

## Roll back a bad deploy

Find the last good commit:

```bash
git log --oneline -10
```

Undo the most recent commit, keeping history honest:

```bash
git revert HEAD
```

```bash
git push
```

That triggers a fresh deploy of the previous state. Takes about the same 1–2
minutes.

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

**Site looks stale after a successful deploy** — browser cache. Ctrl+Shift+R.

**An image doesn't show up** — it has to be in `public/images/` and referenced
as `/images/name.png` with a leading slash. Filenames are case-sensitive on
Azure but not on Windows, so `Photo.PNG` works locally and 404s live. Keep
filenames lowercase.

**Large images make the site slow** — anything over ~1 MB should be resized.
Several of the current photos are 2–5 MB straight off a phone.
