[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Output "Starting Master HTML Build..."

$css = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\src\01_styles.css' -Encoding UTF8 -Raw
$heroNav = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\src\02_hero_nav.html' -Encoding UTF8 -Raw
$searchTab = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\src\07_search_tab.html' -Encoding UTF8 -Raw
$guideTab = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\src\03_guide.html' -Encoding UTF8 -Raw
$profilingTab = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\src\04_profiling.html' -Encoding UTF8 -Raw
$comparisonTab = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\src\05_comparison.html' -Encoding UTF8 -Raw
$answersTab = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\src\06_answers.html' -Encoding UTF8 -Raw
$printTab = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\src\08_print_hub.html' -Encoding UTF8 -Raw
$appJs = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\src\09_app.js' -Encoding UTF8 -Raw

$html = @"
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>臨床薬学マスターポータル | 全15疾患・処方プロファイリング・同効薬比較・指導ハンドアウト完全版</title>
<style>
$css
</style>
</head>
<body>

$heroNav

<main class="main-wrapper">
$searchTab

$guideTab

$profilingTab

$comparisonTab

$answersTab

$printTab
</main>

<script>
$appJs
</script>
</body>
</html>
"@

$targetPath = 'c:\Users\borug\Antigravity\PharmasistMaster\index.html'
[System.IO.File]::WriteAllText($targetPath, $html, (New-Object System.Text.UTF8Encoding($true)))
$fileInfo = Get-Item $targetPath
Write-Output "Successfully built Master HTML: $targetPath"
Write-Output "File Size: $($fileInfo.Length) bytes ($([Math]::Round($fileInfo.Length / 1024, 1)) KB)"
