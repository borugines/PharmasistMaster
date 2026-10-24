[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$indexHtml = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\index.html' -Encoding UTF8 -Raw

Write-Output "=== AUDITING FEATURES (ASCII CHECK) ==="
Write-Output "1. Framework: $($indexHtml.Contains('framework-box'))"
Write-Output "2. Rubric Table: $($indexHtml.Contains('rubric-table'))"
Write-Output "3. Memo Area: $($indexHtml.Contains('memo-area'))"
Write-Output "4. Toggle Answer: $($indexHtml.Contains('toggleAnswerVisibility'))"
Write-Output "5. Print Student Worksheet: $($indexHtml.Contains('printStudentWorksheet'))"
Write-Output "6. Chameleon Matrix: $($indexHtml.Contains('chameleon-sec'))"
Write-Output "7. Extra Drug Comparison: $($indexHtml.Contains('sec-extra'))"
