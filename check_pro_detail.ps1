[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$c = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\src\04_profiling.html' -Encoding UTF8 -Raw

Write-Output "Has Chameleon: $($c.Contains('カメレオン薬剤'))"
Write-Output "Has D11: $($c.Contains('pro-d11'))"
Write-Output "Has D15: $($c.Contains('pro-d15'))"
Write-Output "Line count: $((Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\src\04_profiling.html').Count)"
