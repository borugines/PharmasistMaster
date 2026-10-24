[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$utf8 = [System.Text.Encoding]::UTF8
$head = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\followup_tr_header.html', $utf8)
$foot = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\followup_tr_footer.html', $utf8)
$raw = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\extracted_followup_tr.html', $utf8)

# Extract followup sections from <div class="fu-section f-matrix to the closing of f-student
$m = [regex]::Match($raw, '(?s)<div class="fu-section f-matrix.*?(?=</div>\s*<script|</body>|$)')
$body = $m.Value

$full = $head + "`r`n" + $body + "`r`n" + $foot
[System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\13_followup_tr.html', $full, $utf8)
Write-Output "Done creating src/13_followup_tr.html. Length: $($full.Length)"
