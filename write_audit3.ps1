$utf8BOM = New-Object System.Text.UTF8Encoding($true)
$script = @'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$indexHtml = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\index.html' -Encoding UTF8 -Raw

Write-Output "=== AUDITING FEATURES IN index.html ==="
Write-Output "1. 5-Steps Framework: $($indexHtml.Contains('5ステップ'))"
Write-Output "2. 11-Weeks Rubric: $($indexHtml.Contains('11週間'))"
Write-Output "3. Memo Area (memo-area): $($indexHtml.Contains('memo-area'))"
Write-Output "4. Toggle Answer: $($indexHtml.Contains('toggleAnswerVisibility'))"
Write-Output "5. Print Student Worksheet: $($indexHtml.Contains('printStudentWorksheet'))"
Write-Output "6. Chameleon Matrix: $($indexHtml.Contains('chameleon-sec'))"
Write-Output "7. Extra Drug Comparison: $($indexHtml.Contains('sec-extra'))"
'@

[System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\audit_features3.ps1', $script, $utf8BOM)
Write-Output "Wrote audit_features3.ps1 with BOM"
