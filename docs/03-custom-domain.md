# 03 — witzcraftworks.com via Namecheap

Goal: `https://witzcraftworks.com` and `https://www.witzcraftworks.com` both
serve the site, over HTTPS, with a certificate Azure renews for free.

Do [01-deploy.md](01-deploy.md) first. You need a working
`*.azurestaticapps.net` site before a custom domain can point at anything.

## What this costs

| Item | Cost |
|---|---|
| `.com` registration at Namecheap | roughly **$10–16** for year one |
| ICANN fee | $0.18/yr |
| Domain privacy (WHOIS protection) | free, included, **keep it on** |
| Azure custom domain (2 of them) | free on the Free plan |
| SSL certificate | free, auto-renewing |

Renewal in later years is typically higher than the first-year promo price —
check the renewal price before you buy, not the headline price.

## Who does what

| Step | Who |
|---|---|
| Buy the domain | **You.** Claude can't enter payment details. |
| Register the hostnames with Azure, fetch the validation token | Claude |
| Add the DNS records at Namecheap | **You**, in the Namecheap dashboard |
| Poll validation and confirm it's live | Claude |

> **Why you add the DNS records by hand:** Namecheap's API is gated behind
> having 20+ domains, $50+ account balance, or $50+ spent in the last two years.
> A first-time single-domain account won't qualify, so there's no API to drive.
> It's four records typed once — not worth clearing that bar for.

---

## Step 1 — Buy the domain (you)

1. Go to [namecheap.com](https://www.namecheap.com) and search `witzcraftworks.com`.
2. Add to cart. **Check the renewal price**, not just year one.
3. At checkout, **decline every upsell** — hosting, email, PremiumDNS, SSL.
   Azure gives you SSL free, and you don't need their DNS or hosting.
4. Leave **Domain Privacy on** (free, and keeps your home address out of public
   WHOIS records).
5. Complete the purchase.

Then confirm the DNS is Namecheap's own:

**Domain List → Manage → Nameservers** should read **Namecheap BasicDNS**. If it
says Custom DNS or anything else, switch it to Namecheap BasicDNS. ALIAS records
only work on Namecheap's own DNS.

## Step 2 — Clear the parking records (you)

Namecheap pre-fills records pointing at their parking page. They will conflict
with what we're about to add.

**Domain List → Manage → Advanced DNS → Host Records.** Delete:

- the `A` record with host `@` pointing at a Namecheap parking IP
- the `CNAME` record with host `www` pointing at `parkingpage.namecheap.com`
- any `URL Redirect` record on `@` or `www`

Leave any `TXT` records Namecheap added for their own verification. Leave MX
records alone if you ever set up email on this domain.

## Step 3 — Register both hostnames with Azure (Claude)

Get the target hostname first — every DNS record below points at this value:

```bash
az staticwebapp show --name witzcraft --resource-group witzcraft-rg --query defaultHostname -o tsv
```

Call it `<TARGET>`. It looks like `witzcraft-a1b2c3d4.azurestaticapps.net`.
**No `https://`, no trailing slash** — DNS values are bare hostnames.

Register the `www` subdomain. CNAME validation is the default and is automatic:

```bash
az staticwebapp hostname set -n witzcraft -g witzcraft-rg --hostname www.witzcraftworks.com --no-wait
```

Register the apex. This one needs TXT validation because you can't CNAME a root
domain:

```bash
az staticwebapp hostname set -n witzcraft -g witzcraft-rg --hostname witzcraftworks.com --validation-method dns-txt-token --no-wait
```

Now fetch the validation token Azure generated. It can take a minute to appear —
if this returns empty, wait and re-run:

```bash
az staticwebapp hostname show -n witzcraft -g witzcraft-rg --hostname witzcraftworks.com --query "validationToken" -o tsv
```

Call that value `<TOKEN>`.

> That's exactly 2 custom domains, which is the Free plan limit. Fine for this
> site — you'd only hit the ceiling wanting a third hostname.

## Step 4 — Add the DNS records (you)

**Namecheap → Domain List → Manage → Advanced DNS → Host Records → Add New Record.**

Three records:

| # | Type | Host | Value | TTL |
|---|---|---|---|---|
| 1 | `CNAME` | `www` | `<TARGET>` | Automatic |
| 2 | `TXT` | `@` | `<TOKEN>` | Automatic |
| 3 | `ALIAS` | `@` | `<TARGET>` | 5 min |

Click **Save All Changes**. Namecheap won't apply them until you do.

Notes that trip people up:

- Namecheap appends the domain to Host values automatically. Type `www`, not
  `www.witzcraftworks.com` — otherwise you get `www.witzcraftworks.com.witzcraftworks.com`.
- `@` means the bare domain. Type the literal `@` character.
- The `ALIAS` type is what makes the root domain work. If you don't see ALIAS in
  the Type dropdown, you're not on Namecheap BasicDNS — go back to step 1.
- `<TARGET>` must have no `https://` prefix and no trailing slash.

## Step 5 — Wait, then verify (Claude)

DNS needs to propagate. Namecheap says ~30 minutes; Microsoft says apex changes
can take up to 72 hours. In practice it's usually 10–60 minutes.

Check status:

```bash
az staticwebapp hostname list -n witzcraft -g witzcraft-rg -o table
```

You want `Ready` for both. `Validating` means it's still working — wait longer.
`Failed` means a record is wrong.

Confirm the DNS records resolve:

```bash
nslookup -type=TXT witzcraftworks.com
```

```bash
nslookup www.witzcraftworks.com
```

Then hit the real thing:

```bash
curl -sI https://witzcraftworks.com | head -1
```

```bash
curl -sI https://www.witzcraftworks.com | head -1
```

`HTTP/2 200` on both means you're done. Open it in a browser and confirm the
padlock shows a valid certificate — Azure issues that automatically once
validation succeeds, which can lag the DNS by a few extra minutes.

---

## Troubleshooting

**`validationToken` returns empty** — Azure hasn't generated it yet. Wait a
minute and re-run. If it's still empty after five, delete the hostname and
re-add it:
`az staticwebapp hostname delete -n witzcraft -g witzcraft-rg --hostname witzcraftworks.com --yes`

**Status stuck on `Validating` for hours** — the TXT record almost certainly
isn't visible yet, or the value has a typo. Verify with `nslookup -type=TXT
witzcraftworks.com` that the value exactly matches `<TOKEN>`.

**No ALIAS option in the Type dropdown** — the domain isn't on Namecheap
BasicDNS. Domain List → Manage → Nameservers → Namecheap BasicDNS.

**`www` works, apex doesn't** — the ALIAS record is missing, or a leftover `A`
record on `@` is fighting it. Only one record may exist on `@` for address
resolution. Delete the `A` record.

**Certificate warning in the browser** — validation passed but the cert is still
being issued. Give it 15 more minutes. If it persists past an hour, delete and
re-add that hostname.

**Site loads at the azurestaticapps.net URL but not the custom domain** — DNS
hasn't propagated to you yet. Try from your phone on cellular data, which uses a
different resolver.

## Undo

Remove a custom domain from Azure (does not affect the registration):

```bash
az staticwebapp hostname delete -n witzcraft -g witzcraft-rg --hostname witzcraftworks.com --yes
```

The domain stays yours until it expires. Turn **off** auto-renew in Namecheap if
you decide not to keep it — otherwise it silently charges you next year.
