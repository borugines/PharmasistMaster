[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$files = @(
    'extracted_new_drugs.html',
    'extracted_special_topics.html',
    'extracted_otc_guide.html',
    'extracted_followup_tr.html'
)
$bakeChar1 = [char]0x7E3A
$bakeChar2 = [char]0x7E5D
$bakeChar3 = [char]0xFFFD

foreach ($file in $files) {
    $text = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\' + $file, [System.Text.Encoding]::UTF8)
    $hasBake = ($text.Contains($bakeChar1) -or $text.Contains($bakeChar2) -or $text.Contains($bakeChar3))
    if ($hasBake) {
        Write-Output ($file + " : [MOJIBAKE]")
    } else {
        Write-Output ($file + " : [CLEAN OK]")
    }
}
