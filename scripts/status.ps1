# Reports the state of the whole pipeline: local -> GitHub -> Actions -> Azure -> live.
# Run with:  npm run status
#
# Keep this file pure ASCII. Windows PowerShell 5.1 reads .ps1 as ANSI, so a
# UTF-8 em-dash decodes into a smart-quote byte that terminates strings early
# and produces baffling brace-mismatch errors.

$ErrorActionPreference = 'Continue'

# Windows PowerShell 5.1 negotiates TLS 1.0 by default, which Azure refuses.
# Without this every https probe below fails with a misleading "unreachable".
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$APP    = 'witzcraft'
$GROUP  = 'witzcraft-rg'
$DOMAIN = 'witzcraftworks.com'

function Head($text) {
    Write-Host ''
    Write-Host "== $text" -ForegroundColor Cyan
}

function Ok($text)   { Write-Host "   [ok]   $text" -ForegroundColor Green }
function Warn($text) { Write-Host "   [warn] $text" -ForegroundColor Yellow }
function Bad($text)  { Write-Host "   [FAIL] $text" -ForegroundColor Red }
function Info($text) { Write-Host "          $text" -ForegroundColor DarkGray }

# Resolve a CLI by name, falling back to its default install location. A shell
# opened before the CLIs were installed won't have them on PATH yet.
$Fallbacks = @{
    'gh' = 'C:\Program Files\GitHub CLI\gh.exe'
    'az' = 'C:\Program Files\Microsoft SDKs\Azure\CLI2\wbin\az.cmd'
}

function Resolve-Cli($name) {
    $cmd = Get-Command $name -ErrorAction SilentlyContinue
    if ($cmd) { return $cmd.Source }
    $fb = $Fallbacks[$name]
    if ($fb -and (Test-Path $fb)) { return $fb }
    return $null
}

$GH = Resolve-Cli 'gh'
$AZ = Resolve-Cli 'az'

# --------------------------------------------------------------------- local --
Head 'Local working tree'

$dirty = git status --porcelain
if ($dirty) {
    Warn "$(($dirty | Measure-Object).Count) uncommitted change(s)"
    $dirty | Select-Object -First 10 | ForEach-Object { Info $_ }
} else {
    Ok 'Clean - everything committed'
}

$branch = git branch --show-current
if ($branch -eq 'main') {
    Ok "On branch 'main'"
} else {
    Warn "On branch '$branch' - pushes from here will NOT deploy"
}

git remote get-url origin *> $null
if ($?) {
    git fetch --quiet origin 2>$null
    $counts = git rev-list --left-right --count origin/main...HEAD 2>$null
    if ($counts) {
        $behind, $ahead = $counts -split '\s+'
        if ($ahead -gt 0) { Warn "$ahead commit(s) not yet pushed" }
        if ($behind -gt 0) { Warn "$behind commit(s) on origin you don't have - run 'git pull'" }
        if ($ahead -eq 0 -and $behind -eq 0) { Ok 'In sync with origin/main' }
    }
} else {
    Warn "No 'origin' remote yet - see docs/01-deploy.md step 3"
}

# ------------------------------------------------------------------- actions --
Head 'GitHub Actions'

if (-not $GH) {
    Warn 'gh not installed - see docs/01-deploy.md step 1'
} else {
    & $GH auth status *> $null
    if (-not $?) {
        Warn "Not logged in - run 'gh auth login'"
    } else {
        $runs = & $GH run list --limit 3 --json displayTitle,status,conclusion,createdAt 2>$null | ConvertFrom-Json
        if (-not $runs -or $runs.Count -eq 0) {
            Warn 'No workflow runs yet'
        } else {
            foreach ($r in $runs) {
                $when = $r.createdAt.ToString()
                if ($when.Length -ge 16) { $when = $when.Substring(0, 16) }
                $line = "$when  $($r.displayTitle)"
                if ($r.status -ne 'completed') {
                    Warn "running: $line"
                } elseif ($r.conclusion -eq 'success') {
                    Ok $line
                } elseif ($r.conclusion -eq 'cancelled') {
                    # Superseded by a newer push. The workflow sets
                    # cancel-in-progress, so this is expected, not a failure.
                    Info "superseded: $line"
                } else {
                    Bad "$($r.conclusion): $line"
                }
            }
            Info 'Logs for a failure:  gh run view --log-failed'
        }
    }
}

# --------------------------------------------------------------------- azure --
Head 'Azure Static Web App'

$target = $null

if (-not $AZ) {
    Warn 'az not installed - see docs/01-deploy.md step 1'
} else {
    $acct = & $AZ account show --query "name" -o tsv 2>$null
    if (-not $acct) {
        Warn "Not logged in - run 'az login'"
    } else {
        Info "Subscription: $acct"
        $target = & $AZ staticwebapp show -n $APP -g $GROUP --query "defaultHostname" -o tsv 2>$null
        if (-not $target) {
            Warn "App '$APP' not found in '$GROUP' - see docs/01-deploy.md step 4"
        } else {
            Ok "Default hostname: $target"

            $hosts = & $AZ staticwebapp hostname list -n $APP -g $GROUP --query "[].{name:name,status:status}" -o json 2>$null | ConvertFrom-Json
            if (-not $hosts -or $hosts.Count -eq 0) {
                Info 'No custom domains configured - see docs/03-custom-domain.md'
            } else {
                foreach ($h in $hosts) {
                    if ($h.status -eq 'Ready') {
                        Ok "$($h.name) - $($h.status)"
                    } else {
                        Warn "$($h.name) - $($h.status)"
                    }
                }
            }
        }
    }
}

# ---------------------------------------------------------------------- live --
Head 'Live site'

function Probe($url) {
    try {
        $r = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 25 -ErrorAction Stop
        Ok "$url -> $($r.StatusCode)"
    } catch {
        $code = $_.Exception.Response.StatusCode.value__
        if ($code) {
            Bad "$url -> $code"
        } else {
            Bad "$url -> unreachable ($($_.Exception.Message))"
        }
    }
}

if ($target) { Probe "https://$target" }
Probe "https://$DOMAIN"
Probe "https://www.$DOMAIN"

Write-Host ''
