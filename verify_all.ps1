[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$h = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\index.html', [System.Text.Encoding]::UTF8)

$items = [ordered]@{
    "1. Guide 15 Diseases"             = ($h.Contains('dis-card') -and $h.Contains('15. 緩和ケア'))
    "2. Rubric Table"                   = ($h.Contains('11週間ステップアップ指導ルーブリック'))
    "3. Memo / Stamp Area"              = ($h.Contains('指導薬剤師 確認印') -and $h.Contains('memo-area'))
    "4. Chameleon Matrix (13 drugs)"    = ($h.Contains('カメレオン薬剤鑑別マトリクス') -and $h.Contains('chameleon-card'))
    "5. 15 Disease Profiling Charts"    = ($h.Contains('15疾患の処方病態推理チャート') -and $h.Contains('flow-card'))
    "6. Drug Comparison 9 sections"     = ($h.Contains('新世代便秘薬') -and $h.Contains('タリージェ') -and $h.Contains('トリプタン'))
    "7. Answer Book Q1-Q15"             = ($h.Contains('ans-card') -and $h.Contains('Q15.'))
    "8. Toggle Answer Visibility"       = ($h.Contains('toggleAnswerVisibility'))
    "9. Student Answer Blank"           = ($h.Contains('student-answer-blank'))
    "10. Print Student Worksheet"       = ($h.Contains('printStudentWorksheet'))
    "11. Search Tab & Pitfalls"         = ($h.Contains('pitfall-card') -and $h.Contains('DRUG_DB'))
    "12. Print Hub"                     = ($h.Contains('print-hub-grid'))
}

Write-Output "========================================"
Write-Output "     SYSTEM COMPLETION AUDIT REPORT     "
Write-Output "========================================"
foreach ($key in $items.Keys) {
    $res = if ($items[$key]) { "[ OK ] PASS" } else { "[ NG ] FAIL" }
    Write-Output ("{0,-35} : {1}" -f $key, $res)
}
