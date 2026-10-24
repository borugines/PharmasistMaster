[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$utf8 = [System.Text.Encoding]::UTF8
$head = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\otc_guide_header.html', $utf8)
$foot = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\otc_guide_footer.html', $utf8)
$raw = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\extracted_otc_guide.html', $utf8)

# Extract otc sections from <div class="otc-section o-simple to the closing of o-cold
$m = [regex]::Match($raw, '(?s)<div class="otc-section o-simple.*?(?=</div>\s*<script|</body>|$)')
$body = $m.Value

$full = $head + "`r`n" + $body + "`r`n" + $foot
[System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\12_otc_guide.html', $full, $utf8)
Write-Output "Done creating src/12_otc_guide.html. Length: $($full.Length)"
