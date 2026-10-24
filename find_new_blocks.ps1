$path = 'c:\Users\borug\Downloads\Google-Gemini (1).md'
$lines = [System.IO.File]::ReadAllLines($path, [System.Text.Encoding]::UTF8)

# Check line ranges of html code blocks
$codeBlocks = @()
$inBlock = $false
$start = 0
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match '^```html') {
        $inBlock = $true
        $start = $i + 1
    } elseif ($inBlock -and $lines[$i] -match '^```$') {
        $inBlock = $false
        $codeBlocks += [PSCustomObject]@{
            StartLine = $start
            EndLine = $i + 1
            Length = ($i + 1 - $start)
        }
    }
}

foreach ($b in $codeBlocks) {
    # Print the line before start
    $prev = if ($b.StartLine -gt 1) { $lines[$b.StartLine - 2] } else { "" }
    Write-Output ("Block Lines {0,4} - {1,4} (Len: {2,4}): {3}" -f $b.StartLine, $b.EndLine, $b.Length, $prev)
}
