$html = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\index.html' -Encoding UTF8 -Raw
$checks = [ordered]@{
    'Diseases 1-15' = ($html -match 'id="dis-1"' -and $html -match 'id="dis-15"')
    'Rubric Accordion' = ($html -match '11週間指導ルーブリック')
    'Stamp Memo Area' = ($html -match '指導薬剤師 確認印')
    'Chameleon Matrix' = ($html -match 'カメレオン薬剤' -and $html -match 'cham-diamox')
    '15 Disease Charts' = ($html -match 'prof-dis-1' -and $html -match 'prof-dis-15')
    'Drug Comparison 9 Secs' = ($html -match '新世代便秘薬' -and $html -match 'リリカ' -and $html -match 'トリプタン')
    'Answer Book Q1-Q15' = ($html -match 'id="ans-q1"' -and $html -match 'id="ans-q15"')
    'Student Worksheet Toggle' = ($html -match 'toggleAnswerDisplay')
    'Student Answer Blank' = ($html -match 'student-answer-blank')
    'Print Student Worksheet' = ($html -match 'printStudentWorksheet')
    'Search Tab DRUG_DB' = ($html -match 'DRUG_DB' -and $html -match 'pitfall-list')
}
foreach ($k in $checks.Keys) {
    Write-Output ("{0,-25} : {1}" -f $k, $checks[$k])
}
