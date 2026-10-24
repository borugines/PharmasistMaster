[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$c = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\src\03_guide.html' -Encoding UTF8 -Raw
$c = $c -replace '(?s)<script>.*$', ''
$c = $c.TrimEnd() + "`r`n    </div>`r`n  </div>`r`n</div>"

[System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\03_guide.html', $c, (New-Object System.Text.UTF8Encoding($true)))
Write-Output "Successfully stripped script from 03_guide.html"
