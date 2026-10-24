$path = 'c:\Users\borug\Downloads\Google-Gemini (1).md'
$lines = [System.IO.File]::ReadAllLines($path, [System.Text.Encoding]::UTF8)
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match '^#{1,4}\s+') {
        Write-Output ("Line {0,4}: {1}" -f ($i + 1), $lines[$i])
    }
}
