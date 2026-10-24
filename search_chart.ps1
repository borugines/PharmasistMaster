[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$lines = Get-Content 'c:\Users\borug\Downloads\Google-Gemini.md' -Encoding UTF8
$matches = 0..($lines.Count - 1) | Where-Object { $lines[$_] -match 'チャート|鑑別' }
foreach ($idx in $matches) {
    Write-Output "$($idx+1): $($lines[$idx])"
}
