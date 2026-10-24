[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$files = Get-ChildItem -File src
$bakeChar1 = [char]0x7E3A
$bakeChar2 = [char]0x7E5D
$bakeChar3 = [char]0xFFFD

foreach ($file in $files) {
    $text = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $hasBake = ($text.Contains($bakeChar1) -or $text.Contains($bakeChar2) -or $text.Contains($bakeChar3))
    if ($hasBake) {
        Write-Output ($file.Name + " : [MOJIBAKE DETECTED!]")
    } else {
        Write-Output ($file.Name + " : [CLEAN OK]")
    }
}
$idxText = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\index.html', [System.Text.Encoding]::UTF8)
$hasBakeIdx = ($idxText.Contains($bakeChar1) -or $idxText.Contains($bakeChar2) -or $idxText.Contains($bakeChar3))
if ($hasBakeIdx) {
    Write-Output "index.html : [MOJIBAKE DETECTED!]"
} else {
    Write-Output "index.html : [CLEAN OK]"
}
