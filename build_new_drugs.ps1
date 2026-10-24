[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$utf8 = [System.Text.Encoding]::UTF8
$head = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\new_drugs_header.html', $utf8)
$foot = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\new_drugs_footer.html', $utf8)
$raw = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\extracted_new_drugs.html', $utf8)

# Extract trend sections from <div class="trend-section t-meta to the closing of the 4th trend-section
$m = [regex]::Match($raw, '(?s)<div class="trend-section t-meta.*?(?=</div>\s*<script|</body>|$)')
$body = $m.Value

$full = $head + "`r`n" + $body + "`r`n" + $foot
[System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\10_new_drugs.html', $full, $utf8)
Write-Output "Done creating src/10_new_drugs.html. Length: $($full.Length)"
