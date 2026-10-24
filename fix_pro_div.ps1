[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$c = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\src\04_profiling.html' -Encoding UTF8 -Raw
$c = $c -replace '(\s*</div>\s*</div>\s*</div>\s*)$', "`r`n  </div>`r`n</div>"
[System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\04_profiling.html', $c, (New-Object System.Text.UTF8Encoding($true)))
Write-Output "Fixed div in 04_profiling.html"
