[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$lines = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\extracted_witty_guide_15.html' -Encoding UTF8
$cards = $lines | Where-Object { $_ -match 'id="c[0-9]+"' }
foreach ($c in $cards) {
    Write-Output $c.Trim()
}
