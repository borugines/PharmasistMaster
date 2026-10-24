[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$h = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\index.html', [System.Text.Encoding]::UTF8)

Write-Host --- DETAILED VERIFICATION ---
Write-Host 1. Guide 15 Diseases:  ($h.Contains('dis-card') -and $h.Contains('15. 緩和ケア'))
Write-Host 2. Rubric Table:  ($h.Contains('11週間ステップアップ指導ルーブリック'))
Write-Host 3. Memo / Stamp Area:  ($h.Contains('指導薬剤師 確認印') -and $h.Contains('memo-area'))
Write-Host 4. Chameleon Matrix (13 drugs):  ($h.Contains('カメレオン薬剤鑑別マトリクス') -and $h.Contains('chameleon-card'))
Write-Host 5. 15 Disease Profiling Charts:  ($h.Contains('15疾患の処方病態推理チャート') -and $h.Contains('flow-card'))
Write-Host 6. Drug Comparison 9 sections:  ($h.Contains('新世代便秘薬') -and $h.Contains('タリージェ') -and $h.Contains('トリプタン'))
Write-Host 7. Answer Book Q1-Q15:  ($h.Contains('ans-card') -and $h.Contains('Q15.'))
Write-Host 8. Toggle Answer Visibility:  ($h.Contains('toggleAnswerVisibility'))
Write-Host 9. Student Answer Blank:  ($h.Contains('student-answer-blank'))
Write-Host 10. Print Student Worksheet:  ($h.Contains('printStudentWorksheet'))
Write-Host 11. Search Tab & Pitfalls:  ($h.Contains('pitfall-card') -and $h.Contains('DRUG_DB'))
Write-Host 12. Print Hub:  ($h.Contains('print-hub-grid'))