[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$utf8 = [System.Text.Encoding]::UTF8
$head = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\special_topics_header.html', $utf8)
$foot = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\special_topics_footer.html', $utf8)
$raw = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\extracted_special_topics.html', $utf8)

# Extract topic sections from <div class="topic-sec sec-kampo to the closing of sec-ng
$m = [regex]::Match($raw, '(?s)<div class="topic-sec sec-kampo.*?(?=</div>\s*<script|</body>|$)')
$body = $m.Value

$full = $head + "`r`n" + $body + "`r`n" + $foot
[System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\11_special_topics.html', $full, $utf8)
Write-Output "Done creating src/11_special_topics.html. Length: $($full.Length)"
