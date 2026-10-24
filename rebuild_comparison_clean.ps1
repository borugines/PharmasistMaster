[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$utf8 = [System.Text.Encoding]::UTF8
$head = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\comp_header.html', $utf8)
$foot = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\comp_footer.html', $utf8)

$c8 = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\extracted_comparison_matrix.html', $utf8)
$c9 = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\extracted_extra_profiling_11_15.html', $utf8)

# Extract Sections 1-8
$m1 = [regex]::Match($c8, '(?s)<div class="comp-section sec-ht">.*?(?=</div>\s*<script|</body>|$)')
$sec1_8 = $m1.Value

# Extract Section 9
$m2 = [regex]::Match($c9, '(?s)<div class="comp-section sec-extra">.*?</div>\s*$')
$sec9 = $m2.Value

$fullComp = $head + "`r`n" + $sec1_8 + "`r`n" + $sec9 + "`r`n" + $foot

[System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\05_comparison.html', $fullComp, $utf8)
Write-Output "Done rebuilding 05_comparison.html. Length: $($fullComp.Length)"
