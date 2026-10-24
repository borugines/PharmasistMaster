$h = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\index.html', [System.Text.Encoding]::UTF8)

$checks = [ordered]@{
    "Diastolic HT (DBP) keyword TPR" = $h.Contains('TPR')
    "Entresto HT 2021 keyword"       = $h.Contains('2021')
    "STEP Trial mention"             = $h.Contains('STEP')
    "Q2 Metaphor and ARNI"           = ($h.Contains('Q2.') -and $h.Contains('ARNI'))
    "Atelec silnidipine check"       = $h.Contains('c2')
}

foreach ($k in $checks.Keys) {
    Write-Output ("{0,-32} : {1}" -f $k, $checks[$k])
}
