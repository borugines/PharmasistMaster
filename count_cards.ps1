$h = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\03_guide.html', [System.Text.Encoding]::UTF8)
$matches = [regex]::Matches($h, 'class="card"\s+id="c(\d+)"')
Write-Output "Found cards count: $($matches.Count)"
foreach ($m in $matches) {
    Write-Output "Card: $($m.Value)"
}
