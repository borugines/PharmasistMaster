[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$utf8 = [System.Text.Encoding]::UTF8
$ans = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\06_answers.html', $utf8)
$newQ2 = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\ans_q2_updated.html', $utf8)

# Replace Q2 block up to <!-- Q3 -->
$pattern = '(?s)<!-- Q2 -->\s*<div class="qa-card">.*?(?=\s*<!-- Q3 -->)'
$updatedAns = [regex]::Replace($ans, $pattern, $newQ2 + "`r`n`r`n")

[System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\06_answers.html', $updatedAns, $utf8)
Write-Output "Successfully updated Q2 in 06_answers.html"
