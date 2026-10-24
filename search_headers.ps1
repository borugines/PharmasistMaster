[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$lines = Get-Content 'c:\Users\borug\Downloads\Google-Gemini.md' -Encoding UTF8
# 4400行〜4670行のテキスト見出しを探索
for ($i = 4400; $i -lt [Math]::Min(4670, $lines.Count); $i++) {
    if ($lines[$i] -match '^#{1,4} ' -or $lines[$i] -match '```') {
        Write-Output "$($i+1): $($lines[$i])"
    }
}
