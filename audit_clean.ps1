$h = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\index.html')

$items = [ordered]@{
    "Guide 15 Diseases (cards)"       = ($h.Contains('dis-card') -and $h.Contains('15. '))
    "Rubric Table (rubric-table)"     = $h.Contains('rubric-table')
    "Memo / Stamp Area (memo-area)"   = ($h.Contains('memo-area') -and $h.Contains('stamp-box'))
    "Chameleon Matrix (13 drugs)"     = ($h.Contains('chameleon-matrix') -and $h.Contains('cham-diamox') -and $h.Contains('cham-tacrolimus'))
    "15 Disease Profiling Charts"     = ($h.Contains('prof-dis-1') -and $h.Contains('prof-dis-15') -and $h.Contains('flow-card'))
    "Drug Comparison 9 sections"      = ($h.Contains('sec-extra') -and $h.Contains('sec-ht') -and $h.Contains('sec-dm'))
    "Answer Book Q1-Q15"              = ($h.Contains('ans-card') -and $h.Contains('Q15.'))
    "Toggle Answer Visibility"        = $h.Contains('toggleAnswerVisibility')
    "Student Answer Blank"            = $h.Contains('student-answer-blank')
    "Print Student Worksheet"         = $h.Contains('printStudentWorksheet')
    "Search Tab & Pitfalls"           = ($h.Contains('pitfall-card') -and $h.Contains('DRUG_DB'))
    "Print Hub 5 Print Modes"         = ($h.Contains('print-hub-grid') -and $h.Contains('printSelectedDisease'))
    "CSS Print Rules (@media print)"  = $h.Contains('@media print')
}

Write-Output "========================================"
Write-Output "     SYSTEM COMPLETION AUDIT REPORT     "
Write-Output "========================================"
foreach ($key in $items.Keys) {
    $res = if ($items[$key]) { "[ OK ] PASS" } else { "[ NG ] FAIL" }
    Write-Output ("{0,-35} : {1}" -f $key, $res)
}
