[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$utf8 = [System.Text.Encoding]::UTF8
$side = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\guide_sidebar.html', $utf8)
$rubric = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\rubric.html', $utf8)
$stamp = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\memo_stamp.html', $utf8)
$foot = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\guide_footer.html', $utf8)

$g10 = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\extracted_witty_guide_10.html', $utf8)
$g15 = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\extracted_extra_cards_11_15.html', $utf8)

# Extract c1-c10
$m1 = [regex]::Match($g10, '(?s)<div class="card" id="c1">.*?</div>\s*</div>\s*(?=<script|</body>|$)')
$cards10 = $m1.Value

# Extract c11-c15
$m2 = [regex]::Match($g15, '(?s)<div class="card" id="c11">.*?</div>\s*(?=<script|</body>|$)')
$cards15 = $m2.Value

# Combine all cards
$allCards = $cards10 + "`r`n`r`n" + $cards15

# Inject memo_stamp before the closing </div> of each card
# Each card ends with: <div class="question-box">...</div>\s*</div>
$pattern = '(?s)(<div class="question-box">.*?</div>\s*)</div>'
$replacement = "`$1`r`n" + $stamp + "`r`n</div>"
$enhancedCards = [regex]::Replace($allCards, $pattern, $replacement)

# Assemble full 03_guide.html
$fullGuide = $side + "`r`n" + $rubric + "`r`n" + $enhancedCards + "`r`n" + $foot

[System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\03_guide.html', $fullGuide, $utf8)
Write-Output "Done rebuilding 03_guide.html. Length: $($fullGuide.Length)"
