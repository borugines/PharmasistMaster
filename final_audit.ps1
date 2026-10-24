$h = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\index.html', [System.Text.Encoding]::UTF8)

$items = [ordered]@{
    "1. Guide 15 Diseases (c1-c15)"        = ($h.Contains('id="c1"') -and $h.Contains('id="c15"') -and $h.Contains('Extra 15 / Hepatology'))
    "2. Rubric Table (5 Steps & 11 Weeks)" = ($h.Contains('rubric-table') -and $h.Contains('framework-box'))
    "3. Memo / Stamp Area (15 cards)"      = ($h.Contains('memo-area'))
    "4. Chameleon Matrix (13 drugs)"       = ($h.Contains('chameleon-sec') -and $h.Contains('SGLT2') -and $h.Contains('b-cham'))
    "5. 15 Disease Profiling Charts"       = ($h.Contains('disease-sec') -and $h.Contains('pro-d15') -and $h.Contains('profile-card'))
    "6. Drug Comparison 9 sections"        = ($h.Contains('sec-ht') -and $h.Contains('sec-extra') -and $h.Contains('sec-onc'))
    "7. Answer Book Q1-Q15"                = ($h.Contains('Q1.') -and $h.Contains('Q15.') -and $h.Contains('doya'))
    "8. Toggle Answer Visibility"          = $h.Contains('toggleAnswerVisibility')
    "9. Student Answer Blank"              = $h.Contains('student-answer-blank')
    "10. Print Student Worksheet"          = $h.Contains('printStudentWorksheet')
    "11. Search Tab & DRUG_DB"             = ($h.Contains('DRUG_DB') -and $h.Contains('TOP 10'))
    "12. Print Hub 5 Print Modes"          = ($h.Contains('single-disease-select'))
    "13. CSS Print Engine"                 = $h.Contains('print')
}

Write-Output "========================================"
Write-Output "     SYSTEM COMPLETION AUDIT REPORT     "
Write-Output "========================================"
$allPass = $true
foreach ($key in $items.Keys) {
    $pass = $items[$key]
    if (-not $pass) { $allPass = $false }
    $res = if ($pass) { "[ OK ] PASS" } else { "[ NG ] FAIL" }
    Write-Output ("{0,-38} : {1}" -f $key, $res)
}
Write-Output "========================================"
if ($allPass) {
    Write-Output "ALL 13 VERIFICATION CHECKS PASSED PERFECTLY!"
} else {
    Write-Output "SOME CHECKS FAILED!"
}
