[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$utf8 = [System.Text.Encoding]::UTF8
$guide = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\03_guide.html', $utf8)
$newC2 = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\card_c2_updated.html', $utf8)

# Replace <div class="card" id="c2">...</div> (up to <div class="card" id="c3">)
$pattern = '(?s)<div class="card" id="c2">.*?(?=\s*<!-- 3\. 糖尿病 -->|\s*<div class="card" id="c3">)'
$updatedGuide = [regex]::Replace($guide, $pattern, $newC2 + "`r`n`r`n")

[System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\03_guide.html', $updatedGuide, $utf8)
Write-Output "Successfully updated c2 in 03_guide.html"
