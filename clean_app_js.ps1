[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$c = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\src\09_app.js' -Encoding UTF8 -Raw
$c = $c -replace '// 閾ｨ蠎願脈蟄ｦ繝槭せ繧ｿ繝ｼ繝昴・繧ｿ繝ｫ 繧｢繝励Μ繧ｱ繝ｼ繧ｷ繝ｧ繝ｳ繝ｭ繧ｸ繝・け & 蜈ｨ阮ｬ蜑､DB', '// 臨床薬学マスターポータル アプリケーションロジック & 全薬剤DB'
[System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\09_app.js', $c, (New-Object System.Text.UTF8Encoding($true)))
Write-Output "Cleaned up src/09_app.js comments"
