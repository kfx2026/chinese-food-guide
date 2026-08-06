# 中国美食 - 一键部署脚本 v2.0
# 用法: 右键 -> "使用 PowerShell 运行"
# 功能: 修复图片路径 + 验证文件完整性 + 准备部署

$base = $PSScriptRoot
Write-Host "========================================" -ForegroundColor Red
Write-Host "  中国美食站 - 部署检查脚本 v2.0" -ForegroundColor Red
Write-Host "  站点: $base" -ForegroundColor Red
Write-Host "========================================" -ForegroundColor Red

# 1. 检查关键文件
$checks = @(
    "index.html", "index-zh.html", "css/style.css", "js/main.js",
    "data/index-en.json", "data/index-zh.json", "data/updates-en.json", "data/updates-zh.json"
)
$ok = 0; $bad = 0
foreach ($c in $checks) {
    $p = Join-Path $base $c
    if (Test-Path $p) { Write-Host "  [OK] $c" -ForegroundColor Green; $ok++ }
    else { Write-Host "  [MISSING] $c" -ForegroundColor Red; $bad++ }
}

# 2. 检查 JSON 图片引用
Write-Host "`nChecking image references..." -ForegroundColor Yellow
$jsons = @("data/index-en.json","data/index-zh.json","data/updates-en.json","data/updates-zh.json")
$imgMissing = 0
foreach ($jf in $jsons) {
    $jp = Join-Path $base $jf
    if (-not (Test-Path $jp)) { continue }
    $content = Get-Content $jp -Raw -Encoding UTF8
    $imgs = [regex]::Matches($content, '"image":\s*"([^"]+)"') | ForEach-Object { $_.Groups[1].Value }
    foreach ($img in $imgs) {
        $ip = Join-Path $base $img
        if (-not (Test-Path $ip)) {
            Write-Host "  [MISSING] $img" -ForegroundColor Red
            $imgMissing++
        }
    }
}
if ($imgMissing -eq 0) { Write-Host "  All image references OK" -ForegroundColor Green }
else { Write-Host "  $imgMissing missing images found" -ForegroundColor Red }

# 3. 统计
$htmlCount = (Get-ChildItem $base -Recurse -Filter "*.html" | Measure-Object).Count
$imgCount = (Get-ChildItem $base -Recurse -Include "*.jpg","*.png" | Measure-Object).Count
$jsonCount = (Get-ChildItem $base -Recurse -Filter "*.json" | Measure-Object).Count
Write-Host "`nSummary:" -ForegroundColor Cyan
Write-Host "  HTML: $htmlCount  Images: $imgCount  JSON: $jsonCount" -ForegroundColor White
Write-Host "  Core files: $ok OK, $bad missing" -ForegroundColor White
Write-Host "  Image refs: $imgMissing missing" -ForegroundColor White
Write-Host "`nReady to deploy to Cloudflare Pages!" -ForegroundColor Green
