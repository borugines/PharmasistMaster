[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$lines = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\extracted_profiling_chart.html' -Encoding UTF8
for ($i = 0; $i -lt 150; $i++) {
    if ($lines[$i] -match '<div class=') {
        Write-Output "$($i) : $($lines[$i].Trim())"
    }
}
