[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$lines = Get-Content 'c:\Users\borug\Downloads\Google-Gemini.md' -Encoding UTF8

# 各回答の開始行と内容の一部を表示
$ansIndices = @(1896, 2486, 3458, 4161, 4663)
foreach ($idx in $ansIndices) {
    Write-Output "=========================================================="
    Write-Output "RESPONSE AT LINE $idx"
    Write-Output "=========================================================="
    $maxL = [Math]::Min($idx + 60, $lines.Count - 1)
    for ($i = $idx; $i -le $maxL; $i++) {
        Write-Output "$($i+1): $($lines[$i])"
    }
}
