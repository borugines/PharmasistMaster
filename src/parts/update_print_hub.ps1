$utf8 = New-Object System.Text.UTF8Encoding($false)
$lines = [System.IO.File]::ReadAllLines('c:\Users\borug\Antigravity\PharmasistMaster\src\08_print_hub.html', [System.Text.Encoding]::UTF8)
$extra = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\extra_print_cards.html', [System.Text.Encoding]::UTF8)

$sb = New-Object System.Text.StringBuilder
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match "printTab\('tab-profiling'\)") {
        [void]$sb.AppendLine($lines[$i])
        [void]$sb.AppendLine($lines[$i+1]) # </div>
        [void]$sb.AppendLine("")
        [void]$sb.AppendLine($extra)
        $i++ # skip </div> since appended
        continue
    }
    [void]$sb.AppendLine($lines[$i])
}

[System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\08_print_hub.html', $sb.ToString(), $utf8)
Write-Output "Successfully updated 08_print_hub.html"
