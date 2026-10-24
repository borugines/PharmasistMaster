[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$indexHtml = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\index.html' -Encoding UTF8 -Raw

Write-Output "=== AUDITING FEATURES IN index.html ==="
Write-Output "1. 薬学的管理の5ステップ: $($indexHtml.Contains('薬学的管理の5ステップ'))"
Write-Output "2. 11週間指導ルーブリック: $($indexHtml.Contains('11週間のステップアップ指導アプローチ'))"
Write-Output "3. 手書きメモ欄 (memo-area): $($indexHtml.Contains('memo-area'))"
Write-Output "4. 解答トグル (toggleAnswerVisibility): $($indexHtml.Contains('toggleAnswerVisibility'))"
Write-Output "5. 学生用ワークシート印刷: $($indexHtml.Contains('printStudentWorksheet'))"
Write-Output "6. カメレオン薬剤マトリクス: $($indexHtml.Contains('カメレオン薬剤'))"
Write-Output "7. 同効薬比較 11-15: $($indexHtml.Contains('新世代便秘薬'))"
