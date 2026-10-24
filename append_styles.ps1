[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$utf8 = [System.Text.Encoding]::UTF8
$styles = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\01_styles.css', $utf8)
$extra = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\extra_styles.css', $utf8)

$combined = $styles + "`r`n`r`n" + $extra
[System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\01_styles.css', $combined, $utf8)
Write-Output "Appended extra styles to 01_styles.css"
