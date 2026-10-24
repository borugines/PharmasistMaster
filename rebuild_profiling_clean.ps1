[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$utf8 = [System.Text.Encoding]::UTF8
$head = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\profiling_header.html', $utf8)
$foot = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\profiling_footer.html', $utf8)

$p10 = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\extracted_profiling_chart.html', $utf8)
$p15 = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\extra_profiling.html', $utf8)

# Extract Part 1 (Chameleon) & Part 2 (10 Diseases) from p10
$m1 = [regex]::Match($p10, '(?s)<div class="section-block chameleon-sec.*?(?=</div>\s*</div>\s*<script|</body>|$)')
$main10 = $m1.Value

# Extract 11-15 from p15
$m2 = [regex]::Match($p15, '(?s)<div class="content-block">.*?</div>\s*$')
$extra15 = $m2.Value

$fullProfiling = $head + "`r`n" + $main10 + "`r`n" + $extra15 + "`r`n" + $foot

[System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\04_profiling.html', $fullProfiling, $utf8)
Write-Output "Done rebuilding 04_profiling.html. Length: $($fullProfiling.Length)"
