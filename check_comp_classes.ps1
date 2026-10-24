[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$lines = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\extracted_comparison_matrix.html' -Encoding UTF8
$classes = $lines | Where-Object { $_ -match 'class="[^"]*sec-[^"]*"' }
foreach ($c in $classes) {
    Write-Output $c.Trim()
}
