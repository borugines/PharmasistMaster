[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$lines = Get-Content 'c:\Users\borug\Downloads\Google-Gemini.md' -Encoding UTF8

# コードブロックの開始と終了を探す
$inBlock = $false
$blockStart = 0
$blockLang = ""
$blocks = @()

for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '^```([a-zA-Z0-9_-]*)') {
        if (-not $inBlock) {
            $inBlock = $true
            $blockStart = $i
            $blockLang = $matches[1]
        } else {
            $inBlock = $false
            $blocks += [PSCustomObject]@{
                Start = $blockStart + 1
                End = $i + 1
                Lines = ($i - $blockStart + 1)
                Lang = $blockLang
                FirstLine = $lines[$blockStart + 1]
            }
        }
    }
}

foreach ($b in $blocks) {
    Write-Output "Lines $($b.Start)-$($b.End) ($($b.Lines) lines) [$($b.Lang)] FirstLine: $($b.FirstLine)"
}
