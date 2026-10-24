[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$utf8 = [System.Text.Encoding]::UTF8
$comp = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\05_comparison.html', $utf8)
$newHt = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\sec_ht_updated.html', $utf8)

# Replace <div class="comp-section sec-ht">...</div> up to <div class="comp-section sec-dm">
$pattern = '(?s)<div class="comp-section sec-ht">.*?(?=\s*<!-- =+.*?2\. 糖尿病|\s*<div class="comp-section sec-dm">)'
$updatedComp = [regex]::Replace($comp, $pattern, $newHt + "`r`n`r`n")

[System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\05_comparison.html', $updatedComp, $utf8)
Write-Output "Successfully updated sec-ht in 05_comparison.html"
