[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$utf8 = [System.Text.Encoding]::UTF8

$side = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\guide_sidebar.html', $utf8)
$rubric = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\rubric.html', $utf8)
$stamp = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\memo_stamp.html', $utf8)
$foot = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\guide_footer.html', $utf8)

$g10Lines = [System.IO.File]::ReadAllLines('c:\Users\borug\Antigravity\PharmasistMaster\extracted_witty_guide_10.html', $utf8)
$g15Lines = [System.IO.File]::ReadAllLines('c:\Users\borug\Antigravity\PharmasistMaster\extracted_extra_cards_11_15.html', $utf8)

# Extract c1 - c10 lines
# In extracted_witty_guide_10.html, c1 starts at line with '<div class="card" id="c1">' (around line 218)
# c10 ends at line 669 '</div>' (before line 671 '</div>')
$c10CardsList = New-Object System.Collections.Generic.List[string]
$inC10 = $false
foreach ($line in $g10Lines) {
    if ($line -match '<div class="card" id="c1">') {
        $inC10 = $true
    }
    if ($line -match '<script>') {
        break
    }
    if ($inC10) {
        $c10CardsList.Add($line)
    }
}
# The last line before <script> might be an extra </div> or empty line. Let's trim trailing empty / extra </div>
while ($c10CardsList.Count -gt 0 -and ($c10CardsList[$c10CardsList.Count - 1].Trim() -eq '' -or $c10CardsList[$c10CardsList.Count - 1].Trim() -eq '</div>')) {
    # remove the closing of <div class="main">
    # Note: the card itself has a closing </div>, so we want exactly 1 closing </div> for the card.
    break
}

$c10Text = [string]::Join("`r`n", $c10CardsList)
# Remove the outer </div> corresponding to <div class="main">
$c10Text = [regex]::Replace($c10Text, '\s*</div>\s*$', '')

# Extract c11 - c15 lines
$c15CardsList = New-Object System.Collections.Generic.List[string]
$inC15 = $false
foreach ($line in $g15Lines) {
    if ($line -match '<div class="card" id="c11">') {
        $inC15 = $true
    }
    if ($line -match '```') {
        continue
    }
    if ($inC15) {
        $c15CardsList.Add($line)
    }
}
$c15Text = [string]::Join("`r`n", $c15CardsList)

# Now combine
$allCards = $c10Text + "`r`n`r`n" + $c15Text

# Inject stamp into each card before its closing </div>
# Each card ends with: <div class="question-box">...</div>\s*</div>
$pattern = '(?s)(<div class="question-box">.*?</div>\s*)</div>'
$replacement = "`$1`r`n" + $stamp + "`r`n</div>"
$enhancedCards = [regex]::Replace($allCards, $pattern, $replacement)

$fullGuide = $side + "`r`n" + $rubric + "`r`n" + $enhancedCards + "`r`n" + $foot
[System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\03_guide.html', $fullGuide, $utf8)

Write-Output "Successfully rebuilt 03_guide.html"
