[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$files = Get-ChildItem 'c:\Users\borug\Antigravity\PharmasistMaster\src' -Filter '*.html'
foreach ($f in $files) {
    $c = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    $open = ([regex]::Matches($c, '<div\b')).Count
    $close = ([regex]::Matches($c, '</div>')).Count
    Write-Output "$($f.Name) -> Open: $open, Close: $close (Diff: $($open - $close))"
}

$cIndex = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\index.html', [System.Text.Encoding]::UTF8)
$openIndex = ([regex]::Matches($cIndex, '<div\b')).Count
$closeIndex = ([regex]::Matches($cIndex, '</div>')).Count
Write-Output "index.html -> Open: $openIndex, Close: $closeIndex (Diff: $($openIndex - $closeIndex))"
