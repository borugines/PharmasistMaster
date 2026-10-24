[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$c = Get-Content 'c:\Users\borug\Downloads\Google-Gemini.md' -Encoding UTF8

$headers = 0..($c.Count - 1) | Where-Object { $c[$_] -match '^# (you asked|gemini response)' }
for ($i = 0; $i -lt $headers.Count; $i++) {
    $idx = $headers[$i]
    $nextIdx = if ($i -lt $headers.Count - 1) { $headers[$i+1] } else { $c.Count }
    $sectionLines = $c[$idx..($nextIdx - 1)]
    $codeBlocks = $sectionLines | Where-Object { $_ -match '^```(html|javascript|css)?' }
    $title = $c[$idx]
    $snippet = ($sectionLines | Select-Object -First 5) -join "`n"
    Write-Output "Line $($idx): $title | Codeblocks: $($codeBlocks.Count)"
    Write-Output "Snippet:`n$snippet"
    Write-Output "--------------------------------------------------------"
}
