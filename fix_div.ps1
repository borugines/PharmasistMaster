[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$c = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\src\03_guide.html' -Encoding UTF8 -Raw
# 最後の余分な </div> を削除
$c = $c -replace '(\s*</div>\s*</div>\s*</div>\s*</div>\s*)$', "`r`n    </div>`r`n  </div>`r`n</div>"
[System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\03_guide.html', $c, (New-Object System.Text.UTF8Encoding($true)))
Write-Output "Fixed div in 03_guide.html"
