# 01 — One-time deployment setup

Goal: get from a local folder to a live site at
`https://<something>.azurestaticapps.net`, with every `git push` redeploying
automatically.

Do this once. After it's done, see [02-daily-workflow.md](02-daily-workflow.md).

## The settings we use

Referenced throughout. Change them if you want, but change them everywhere.

| Setting | Value |
|---|---|
| GitHub repo | `witzcraft` |
| Repo visibility | **Public** (decided 2026-09-05) |
| Azure resource group | `witzcraft-rg` |
| Azure Static Web App | `witzcraft` |
| Azure region | `eastus2` |
| Branch | `main` |
| Build output | `dist` |
| Plan | Free |

Free plan gives you: global CDN distribution, free auto-renewing SSL,
2 custom domains, 3 PR preview environments, 250 MB app size. No cost.

## Who does what

| Step | Who | Why |
|---|---|---|
| Install CLIs | Claude (with your approval) | Ordinary installs |
| `gh auth login` | **You** | Opens a browser, needs your GitHub password |
| `az login` | **You** | Opens a browser, needs your Microsoft password |
| Create repo, push, create Azure app, wire the token | Claude | Scriptable once authenticated |
| Approve resource creation | **You** | Creates things in your cloud account |

Claude can't type your passwords, and won't create the public repo or the Azure
resource without you saying go.

---

## Step 1 — Install the CLIs — DONE (2026-09-05)

Both are installed and verified:

| Tool | Version | Path |
|---|---|---|
| GitHub CLI | 2.100.0 | `C:\Program Files\GitHub CLI\gh.exe` |
| Azure CLI | 2.90.0 | `C:\Program Files\Microsoft SDKs\Azure\CLI2\wbin\az.cmd` |

<details>
<summary>How they were installed, if you ever need to redo it</summary>

```powershell
winget install --id GitHub.cli -e --accept-source-agreements --accept-package-agreements
```

```powershell
winget install --id Microsoft.AzureCLI -e --accept-source-agreements --accept-package-agreements
```

**Close and reopen your terminal afterward** so `PATH` picks them up. Verify:

```powershell
gh --version; az version
```

</details>

## Step 2 — Log in (you do this) — NEXT ACTION

**Open a new terminal window.** One that was already open before the installs
won't have `gh` or `az` on its `PATH`.

Run each in your own terminal. Both open a browser.

```bash
gh auth login
```

Choose: **GitHub.com** → **HTTPS** → **Yes** (authenticate Git) → **Login with a
web browser**. Copy the one-time code, paste it in the browser.

```bash
az login
```

Pick your account in the browser. If you have more than one subscription, set
the one you want (use your Azure for Students subscription):

```bash
az account list --output table
```

```bash
az account set --subscription "YOUR-SUBSCRIPTION-NAME"
```

Confirm you're on the right one:

```bash
az account show --query "{name:name, id:id, user:user.name}" -o table
```

## Step 3 — Create the GitHub repo and push

From the project folder.

```bash
gh repo create witzcraft --public --source=. --remote=origin --push
```

> **Public was chosen deliberately.** Everything in `public/images/` becomes
> browsable by anyone, including screenshots the site doesn't currently display.
> Reversible with `gh repo edit --visibility private --accept-visibility-change-consequences`
> if any of that turns out to be lab-confidential.

That creates the repo, sets `origin`, and pushes `main` in one shot. Verify:

```bash
gh repo view --web
```

## Step 4 — Create the Azure Static Web App

Resource group first:

```bash
az group create --name witzcraft-rg --location eastus2 --output table
```

Then the app. We deliberately **don't** pass `--source`, because we want the
workflow file in this repo under our control rather than one Azure generates:

```bash
az staticwebapp create --name witzcraft --resource-group witzcraft-rg --location eastus2 --sku Free --output table
```

Grab the URL it will live at:

```bash
az staticwebapp show --name witzcraft --resource-group witzcraft-rg --query "defaultHostname" -o tsv
```

## Step 5 — Wire the deployment token into GitHub

Azure issues a deployment token. GitHub Actions needs it as a secret. This
pipes one to the other without the token ever being printed to your screen:

```bash
az staticwebapp secrets list --name witzcraft --resource-group witzcraft-rg --query "properties.apiKey" -o tsv | gh secret set AZURE_STATIC_WEB_APPS_API_TOKEN
```

Confirm it landed (shows the name and timestamp, never the value):

```bash
gh secret list
```

> **Treat this token like a password.** Anyone holding it can deploy to your
> site. It lives only in GitHub's encrypted secrets. Never paste it into a file,
> a commit, or a chat. If it leaks, rotate it with
> `az staticwebapp secrets reset-api-key --name witzcraft --resource-group witzcraft-rg`
> and then re-run the command above.

## Step 6 — Push the workflow

The workflow file is already in this repo at
`.github/workflows/azure-static-web-apps.yml`. Push it:

```bash
git push
```

That push triggers the first deploy. Watch it:

```bash
gh run watch
```

## Step 7 — Verify

```bash
npm run status
```

Or check by hand:

```bash
gh run list --limit 5
```

```bash
curl -sI https://$(az staticwebapp show --name witzcraft --resource-group witzcraft-rg --query defaultHostname -o tsv) | head -1
```

`HTTP/2 200` means you're live. Open it:

```bash
az staticwebapp show --name witzcraft --resource-group witzcraft-rg --query defaultHostname -o tsv
```

Also confirm a deep link survives a refresh — visit `/about` directly and press
F5. If it 404s, `staticwebapp.config.json` didn't deploy.

---

## Troubleshooting

**`gh: command not found` after installing** — you didn't restart the terminal.

**Workflow fails: `deployment_token was not provided`** — the secret name is
wrong or missing. It must be exactly `AZURE_STATIC_WEB_APPS_API_TOKEN`. Re-run
step 5, then `gh run rerun --failed`.

**Workflow fails during build** — reproduce locally with `npm run build`. It's
almost always a syntax error in a file you edited. The Actions log names the
file and line.

**Deploy succeeds but the site is blank** — `output_location` in the workflow
must be `dist` (Vite's output), not `build`.

**404 when refreshing on `/about`** — `staticwebapp.config.json` must be in the
repo root and get copied into the deploy. Confirm it's committed.

**Wrong Azure subscription** — `az account set --subscription "..."`, then
delete the misplaced resource group with
`az group delete --name witzcraft-rg --no-wait`.

## Undo

Deletes the Azure side entirely. The GitHub repo is untouched.

```bash
az group delete --name witzcraft-rg --yes --no-wait
```
