[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$html = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\index.html' -Encoding UTF8 -Raw
$matches = [regex]::Matches($html, 'name\s*:\s*"[^"]+"')
Write-Output "Drug DB count: $($matches.Count)"
