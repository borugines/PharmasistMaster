[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$lines = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\extracted_profiling_chart.html' -Encoding UTF8
$h = $lines | Where-Object { $_ -match '<h[234]' }
foreach ($item in $h) {
    Write-Output $item.Trim()
}
