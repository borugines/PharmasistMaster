[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$files = Get-ChildItem extracted_*
$bakeChar1 = [char]0x7E3A
$bakeChar2 = [char]0x7E5D
$bakeChar3 = [char]0xFFFD

foreach ($file in $files) {
    $text = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $hasBake = ($text.Contains($bakeChar1) -or $text.Contains($bakeChar2) -or $text.Contains($bakeChar3))
    if ($hasBake) {
        Write-Output ($file.Name + " : [MOJIBAKE]")
    } else {
        Write-Output ($file.Name + " : [CLEAN OK]")
    }
}
$srcText = [System.IO.File]::ReadAllText('c:\Users\borug\Downloads\Google-Gemini.md', [System.Text.Encoding]::UTF8)
$hasBakeSrc = ($srcText.Contains($bakeChar1) -or $srcText.Contains($bakeChar2) -or $srcText.Contains($bakeChar3))
if ($hasBakeSrc) {
    Write-Output "Google-Gemini.md : [MOJIBAKE]"
} else {
    Write-Output "Google-Gemini.md : [CLEAN OK]"
}
