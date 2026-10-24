$path = 'c:\Users\borug\Downloads\Google-Gemini (1).md'
$item = Get-Item $path
Write-Output "Size: $($item.Length) bytes"
$lines = [System.IO.File]::ReadAllLines($path, [System.Text.Encoding]::UTF8)
Write-Output "Lines count: $($lines.Length)"
