[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$lines = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\extracted_index_portal.html' -Encoding UTF8

$startIdx = -1
$endIdx = -1
for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match 'const DRUG_DB\s*=') {
        $startIdx = $i
    }
    if ($startIdx -ge 0 -and $lines[$i] -match '^\s*\];') {
        $endIdx = $i
        break
    }
}

Write-Output "Found DRUG_DB at lines: $startIdx to $endIdx"
if ($startIdx -ge 0 -and $endIdx -gt $startIdx) {
    $dbLines = $lines[$startIdx..$endIdx]
    Write-Output "Extracted $($dbLines.Count) lines of DRUG_DB"
    $dbLines[0..15] | ForEach-Object { Write-Output $_ }
}
