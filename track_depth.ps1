[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$lines = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\src\04_profiling.html' -Encoding UTF8
$depth = 0
for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    $open = ([regex]::Matches($line, '<div\b')).Count
    $close = ([regex]::Matches($line, '</div>')).Count
    $depth += ($open - $close)
    if ($depth -lt 0) {
        Write-Output "Negative depth at line $($i+1): $line"
        break
    }
}
Write-Output "Final depth: $depth"
