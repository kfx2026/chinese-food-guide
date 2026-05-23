# ============================================================
#  Oriental Food Site - Auto Deploy Workflow v1.2
#  Usage: powershell -ExecutionPolicy Bypass -File deploy.ps1 [-Mode Deploy|BackupOnly|Check|Status]
#  Cron: every Monday 09:00 Asia/Shanghai
# ============================================================

param(
    [ValidateSet("Deploy", "BackupOnly", "Check", "Status")]
    [string]$Mode = "Deploy"
)

$SITE_ROOT   = "D:\oriental-food"
$BACKUP_DIR  = "$SITE_ROOT\backup"
$LOG_FILE    = "$SITE_ROOT\deploy.log"
$MAX_BACKUPS = 2

function Log($msg) {
    $ts = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $line = "[$ts] $msg"
    Add-Content -Path $LOG_FILE -Value $line -Encoding UTF8
    Write-Host $line -ForegroundColor Cyan
}

function Get-Backups() {
    if (Test-Path $BACKUP_DIR) {
        Get-ChildItem -Path $BACKUP_DIR -Filter "backup_*.zip" |
            Sort-Object LastWriteTime -Descending
    } else { @() }
}

function PreDeployCheck() {
    Log "===== Pre-deploy Check ====="
    $errs = @()

    if (-not (Test-Path $SITE_ROOT)) { $errs += "SITE_ROOT not found" }

    $required = @("index.html","index-zh.html","updates.html","updates-zh.html","css\style.css","js\main.js")
    foreach ($f in $required) {
        $p = Join-Path $SITE_ROOT $f
        if (-not (Test-Path $p)) { $errs += "MISSING: $f" }
        elseif ((Get-Item $p).Length -eq 0) { $errs += "EMPTY: $f" }
    }

    $nodeCmd = Get-Command node -ErrorAction SilentlyContinue
    if ($nodeCmd) {
        $r = & node --check "$SITE_ROOT\js\main.js" 2>&1
        if ($LASTEXITCODE -ne 0) { $errs += "JS SYNTAX ERROR: $r" }
        else { Log "  [OK] main.js syntax OK" }
    } else { Log "  [WARN] no node, skip JS check" }

    foreach ($html in @("index.html","index-zh.html","updates.html","updates-zh.html")) {
        $p = Join-Path $SITE_ROOT $html
        if (Test-Path $p) {
            $c = [System.IO.File]::ReadAllText($p)
            if ($c.IndexOf("<!DOCTYPE") -lt 0 -or $c.IndexOf("</html") -lt 0) { $errs += "BAD HTML: $html" }
            elseif ($c.IndexOf('src="js/main.js"') -lt 0) { $errs += "NO main.js ref: $html" }
        }
    }

    $cssFile = Join-Path $SITE_ROOT "css\style.css"
    if (Test-Path $cssFile) {
        $c = [System.IO.File]::ReadAllText($cssFile)
        $o = ([regex]::Matches($c, "\{")).Count
        $x = ([regex]::Matches($c, "\}")).Count
        if ($o -ne $x) { $errs += "CSS brace mismatch: {$o / }$x" }
        else { Log "  [OK] style.css braces OK ($o pairs)" }
    }

    if ($errs.Count -gt 0) {
        Log "  [FAIL] $($errs.Count) issue(s):"
        foreach ($e in $errs) { Log "    X $e" }
        return $false
    }
    Log "  [PASS] All checks passed"
    return $true
}

function Invoke-Backup() {
    Log "===== Backup Start ====="
    New-Item -ItemType Directory -Path $BACKUP_DIR -Force | Out-Null

    $ts = Get-Date -Format "yyyyMMdd_HHmmss"
    $zipName = "backup_${ts}.zip"
    $zipPath = Join-Path $BACKUP_DIR $zipName

    try {
        # Use Compress-Archive with temp copy to avoid file locks
        $tmpDir = Join-Path $env:TEMP "oriental_deploy_$([guid]::NewGuid().ToString('N'))"
        Copy-Item -Path $SITE_ROOT -Destination $tmpDir -Recurse -Force
        # Remove backup dir and logs from the copy
        $rmBackup = Join-Path $tmpDir "backup"
        $rmLog = Join-Path $tmpDir "deploy.log"
        $rmScript = Join-Path $tmpDir "deploy.ps1"
        $rmRec = Join-Path $tmpDir "last-deploy.json"
        if (Test-Path $rmBackup) { Remove-Item $rmBackup -Recurse -Force }
        if (Test-Path $rmLog) { Remove-Item $rmLog -Force -ErrorAction SilentlyContinue }
        if (Test-Path $rmScript) { Remove-Item $rmScript -Force -ErrorAction SilentlyContinue }
        if (Test-Path $rmRec) { Remove-Item $rmRec -Force -ErrorAction SilentlyContinue }

        Compress-Archive -Path "$tmpDir\*" -DestinationPath $zipPath -Force
        Remove-Item $tmpDir -Recurse -Force -ErrorAction SilentlyContinue

        if (-not (Test-Path $zipPath)) { throw "zip was not created" }

        $szKB = [math]::Round((Get-Item $zipPath).Length / 1KB, 1)
        Log "  [OK] Backup created: $zipName (${szKB}KB)"
    } catch {
        Log "  [FAIL] Backup error: $_"
        # Cleanup temp dir if exists
        $td = Join-Path $env:TEMP "oriental_deploy_*"
        Get-Item $td -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force
        return $null
    }

    # Clean old backups, keep only MAX_BACKUPS
    $all = Get-Backups
    if ($all.Count -gt $MAX_BACKUPS) {
        $toDel = $all | Select-Object -Skip $MAX_BACKUPS
        foreach ($old in $toDel) {
            Remove-Item $old.FullName -Force
            Log "  [DEL] Old backup removed: $($old.Name)"
        }
    }

    $remaining = Get-Backups
    Log "  Current backups:"
    foreach ($b in $remaining) {
        $age = ((Get-Date) - $b.LastWriteTime).Days
        Log "    - $($b.Name) (${age}d ago)"
    }

    return $zipPath
}

function Do-Deploy($bkPath) {
    Log "===== Deploy Start ====="
    Log "  [INFO] Backup: $(Split-Path $bkPath -Leaf)"

    # === DEPLOY HOOK - Configure your method here ===
    # Option A: FTP upload
    # Option B: git push
    # Option C: Copy to IIS: Copy-Item $SITE_ROOT\* "C:\inetpub\wwwroot\" -Recurse -Force
    # Option D: rclone sync
    # Option E: OSS SDK
    #
    Log "  [INFO] Deploy method: PENDING CONFIGURATION"
    Log "  >>> Edit Do-Deploy section in deploy.ps1 <<<"

    # Record deployment
    $recPath = "$SITE_ROOT\last-deploy.json"
    $recTs = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $recBk = Split-Path $bkPath -Leaf
    Set-Content -Path $recPath -Value "{`n  `"timestamp`": `"$recTs`",`n  `"backup`": `"$recBk`",`n  `"status`": `"deployed_pending_remote`"`n}" -Encoding UTF8
    Log "  [OK] Deployment record written"
}

function PostDeployCheck() {
    Log "===== Post-deploy Verify ====="
    Log "  [SKIP] Remote verification pending (needs real URL)"
}

function Show-Status() {
    Write-Host "`n=== Oriental Food Site Status ===" -ForegroundColor Green
    $files = Get-ChildItem -Path $SITE_ROOT -File -Recurse -ErrorAction SilentlyContinue |
        Where-Object { $_.FullName -notlike "$BACKUP_DIR\*" }
    $totalSz = ($files | Measure-Object -Property Length -Sum).Sum
    Write-Host "Files: $($files.Count), Size: $([math]::Round($totalSz/1KB,1)) KB" -ForegroundColor White

    $bks = Get-Backups
    Write-Host "Backups: $($bks.Count)/$MAX_BACKUPS" -ForegroundColor White
    foreach ($b in $bks) {
        $sz = [math]::Round($b.Length/1KB, 1)
        Write-Host "  - $($b.Name) ${sz}KB" -ForegroundColor Gray
    }

    $rp = "$SITE_ROOT\last-deploy.json"
    if (Test-Path $rp) {
        Write-Host "Last deploy:" (Get-Content $rp -Raw) -ForegroundColor White
    } else { Write-Host "No deployment record yet" -ForegroundColor DarkGray }

    if (Test-Path $LOG_FILE) {
        Write-Host "`nRecent log:" -ForegroundColor White
        Get-Content $LOG_FILE -Tail 5 -Encoding UTF8 | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }
    }
}

# ===================== MAIN =====================
Write-Host ""
Write-Host "========================================" -ForegroundColor DarkCyan
Write-Host " Oriental Food Auto-Deploy v1.2" -ForegroundColor DarkCyan
Write-Host "========================================" -ForegroundColor DarkCyan
Write-Host ""

switch ($Mode) {
    "Status"      { Show-Status }
    "Check"       { $ok = PreDeployCheck; exit (if($ok){0}else{1}) }
    "BackupOnly"  { Invoke-Backup }
    "Deploy" {
        Log "========== Deploy Flow Start =========="
        if (-not (PreDeployCheck)) { Log "[ABORT] Check failed"; exit 1 }
        $bp = Invoke-Backup
        if (-not $bp) { Log "[ABORT] Backup failed"; exit 1 }
        Do-Deploy $bp
        PostDeployCheck
        Log "========== Deploy Flow Complete =========="
        Show-Status
    }
}
