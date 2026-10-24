$c = Get-Content -Raw -Encoding UTF8 'c:\Users\borug\Downloads\Google-Gemini.md'
$matches = [regex]::Matches($c, '(?s)(# you asked\r?\n\r?\nmessage time:[^\r\n]*\r?\n\r?\n.*?)(?=\r?\n\r?\n# gemini response)')
foreach ($m in $matches) {
    Write-Output "========================================"
    Write-Output $m.Value.Trim()
}
