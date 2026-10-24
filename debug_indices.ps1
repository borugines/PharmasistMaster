[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$lines = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\extracted_profiling_chart.html' -Encoding UTF8

$startIdx = -1
$endIdx = -1
for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match 'class="main-container"') {
        $startIdx = $i
    }
    if ($lines[$i] -match '</script>') {
        $endIdx = $i - 1
    }
}
Write-Output "startIdx: $startIdx, endIdx: $endIdx, total lines: $($lines.Count)"
