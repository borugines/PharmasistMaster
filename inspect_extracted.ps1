[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Output "=== INDEX PORTAL HEAD & SCRIPT ==="
$idx = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\extracted_index_portal.html' -Encoding UTF8
$idx[0..50] | Out-String | Write-Output

Write-Output "=== COMPARISON MATRIX TITLE & SECTIONS ==="
$cmp = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\extracted_comparison_matrix.html' -Encoding UTF8
$cmp | Where-Object { $_ -match '<h[1-3]' -or $_ -match 'class="sec-title"' } | Select-Object -First 30 | Out-String | Write-Output

Write-Output "=== PROFILING CHART TITLE & SECTIONS ==="
$pro = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\extracted_profiling_chart.html' -Encoding UTF8
$pro | Where-Object { $_ -match '<h[1-3]' -or $_ -match 'class="disease-title"' } | Select-Object -First 30 | Out-String | Write-Output
