# 05 — How it all works, in plain English

No jargon. What each piece does, and where to look when you need to change
something.

## The four pieces

You now have four separate services doing four different jobs. They were set up
once and mostly run themselves.

**Your computer** is where you write. Nothing you do here is public until you
push. `npm run dev` runs a private copy at `localhost:5173` that only you can
see — "localhost" literally means "this machine".

**GitHub** is the filing cabinet. It stores every version of your site,
permanently. Every time you commit, GitHub keeps a snapshot you can go back to.
It's also your backup: if your laptop died tomorrow, the whole site is safe.

**GitHub Actions** is the robot. It watches your GitHub repo, and the moment you
push, it wakes up, installs everything, runs `npm run build`, and hands the
result to Azure. It's the thing that makes deploying automatic instead of
manual. You never talk to it directly — it just reacts to your pushes.

**Azure Static Web Apps** is the actual web server. It holds the built site and
serves it to anyone who asks, from data centres around the world so it's fast
everywhere. It also handles the HTTPS padlock automatically.

**Namecheap** is the phone book. It doesn't host anything. It only answers one
question: "someone typed witzcraftworks.com — where should I send them?" The
records you added tell it to answer "Azure."

## The two paths

**When you push a change:** your computer → GitHub → GitHub Actions → Azure.
About 90 seconds.

**When a visitor arrives:** their browser asks Namecheap where
`witzcraftworks.com` lives, Namecheap says "over at Azure", and the browser
fetches the site from Azure. Milliseconds.

These are independent. A visitor loading your site doesn't touch GitHub at all.

## Why there are two web addresses

- `https://brave-sky-01ff4d80f.5.azurestaticapps.net` — the address Azure
  generated. Ugly but permanent. Still works.
- `https://witzcraftworks.com` — your real address, which points at the one
  above.

Both serve the identical site. Give people the second one.

## Where to check things

### GitHub — "did my change go out?"

**https://github.com/horowitzna/witzcraft**

| I want to... | Where |
|---|---|
| See if the last push deployed | **Actions** tab. Green check = live. Red X = failed. |
| Read why a deploy failed | Actions tab → click the red run → click the failed step |
| See every change ever made | **Code** tab → **commits** |
| Look at a file | **Code** tab, browse the folders |

From the terminal instead: `gh run list` or `npm run status`.

A **green check on the Actions tab is the single best "is my site updated?"
signal.** If it's green, what you see on the live site is what you pushed.

### Azure — "is the site up? is my domain working?"

**https://portal.azure.com** → search "witzcraft" → click the Static Web App.

| I want to... | Where |
|---|---|
| Confirm the site is running | **Overview** — shows the URL and status |
| Check domain status | **Custom domains** — both should say **Ready** |
| See recent deployments | **Deployment history** |
| Check I'm not being charged | **Overview** → the plan should read **Free** |

From the terminal: `npm run status` reports all of this at once, which is
usually faster than clicking through the portal.

You will rarely need the Azure portal. Once a Static Web App is running it
mostly looks after itself.

### Namecheap — "where do I change my domain?"

**https://namecheap.com** → sign in → **Domain List** → **Manage** next to
witzcraftworks.com.

| I want to... | Where |
|---|---|
| Change where the domain points | **Advanced DNS** tab → Host Records |
| Check it doesn't expire | **Domain** tab → confirm auto-renew is on |
| Keep my address private | **Domain** tab → Domain Privacy should be on |

The three records that make your site work live under **Advanced DNS**:

| Type | Host | Points at |
|---|---|---|
| `TXT` | `@` | proves to Azure you own the domain |
| `ALIAS` | `@` | your Azure site |
| `CNAME` | `www` | your Azure site |

**Don't delete these** unless you're deliberately moving the site somewhere
else. Deleting any of them takes witzcraftworks.com offline within minutes.

You'll basically never need to touch Namecheap again — except once a year to
confirm the renewal went through.

## What you'd actually change, and where

| I want to... | Where |
|---|---|
| Change any text or image on the site | Your computer, then push. Nothing else. |
| Add a project or page | Your computer, then push. |
| Change colors or fonts | Your computer, then push. |
| Move the site to a different host | Namecheap DNS records |
| Rename the site's address | Buy a new domain, add records, register it with Azure |
| Stop paying for the domain | Namecheap → turn off auto-renew |

**Almost everything is the first row.** The whole point of this setup is that
day-to-day changes only ever touch your computer and a `git push`. Azure,
GitHub Actions, and Namecheap were configured once and then get out of your way.

## Words people will use at you

**Repository (repo)** — the project folder, stored on GitHub with its full
history.

**Commit** — a saved snapshot with a note about what changed. Like "save as" with
a message.

**Push** — upload your commits to GitHub. This is what triggers a deploy.

**Branch** — a parallel version. You work on `main`. Pushing to `main` deploys.

**Build** — turning your source files into the optimised bundle browsers
actually download. `npm run build` does it locally; GitHub Actions does it in
the cloud.

**Deploy** — copying the built site onto the web server.

**CI/CD** — the general name for "a robot builds and ships my code
automatically." That's GitHub Actions here.

**DNS** — the internet's phone book. Turns names into addresses.

**SSL / TLS / HTTPS** — the padlock. Azure handles it, renews it, free.

**Static site** — a site made of files, with no database or server-side code.
Yours is static, which is why hosting is free and it's very fast.

## If something looks broken

1. Run `npm run status`. It checks all four layers and tells you which one is
   unhappy.
2. If GitHub Actions is red — the build failed. Run `npm run build` locally; it
   will show the same error somewhere you can actually fix it.
3. If the live site is old — hard refresh with Ctrl+Shift+R. Browsers cache
   aggressively.
4. If the domain is down but the `azurestaticapps.net` URL works — it's DNS.
   Check the Namecheap records above.
5. If you're stuck, ask Claude Code. Paste in the error.

## Reverting a mistake

Anything you push can be undone. This reverses your last change and redeploys
the previous version:

```bash
git revert HEAD && git push
```

It doesn't erase history — it adds a new commit that undoes the previous one.
Nothing is ever truly lost, which is the main reason all of this runs through
GitHub in the first place.
