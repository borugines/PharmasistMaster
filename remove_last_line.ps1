[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$lines = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\src\04_profiling.html' -Encoding UTF8
# 最後の1行を削除
$cleanLines = $lines[0..($lines.Count - 2)]
[System.IO.File]::WriteAllLines('c:\Users\borug\Antigravity\PharmasistMaster\src\04_profiling.html', $cleanLines, (New-Object System.Text.UTF8Encoding($true)))
Write-Output "Removed last line of 04_profiling.html"
