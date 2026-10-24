[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$utf8 = [System.Text.Encoding]::UTF8

# --- 1. Fix 03_guide.html (Diff: -1 -> Remove extra </div> at junction of c10 and c11) ---
$guide = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\03_guide.html', $utf8)

# Check cards10 end in rebuild_guide.ps1
# Let's inspect where the extra </div> is
$side = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\guide_sidebar.html', $utf8)
$rubric = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\rubric.html', $utf8)
$stamp = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\memo_stamp.html', $utf8)
$foot = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\guide_footer.html', $utf8)

$g10 = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\extracted_witty_guide_10.html', $utf8)
$g15 = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\extracted_extra_cards_11_15.html', $utf8)

# c1-c10 cards only: starts at <div class="card" id="c1"> and ends at the </div> closing c10
# In extracted_witty_guide_10.html, lines 669 is </div> closing c10, line 671 is </div> closing main.
# So match up to line 669.
$m1 = [regex]::Match($g10, '(?s)<div class="card" id="c1">.*?<div class="question-box">.*?</div>\s*</div>')
$cards10 = $m1.Value

# c11-c15 cards
$m2 = [regex]::Match($g15, '(?s)<div class="card" id="c11">.*?<div class="question-box">.*?</div>\s*</div>')
$cards15 = $m2.Value

# Combine
$allCards = $cards10 + "`r`n`r`n" + $cards15

# Inject stamp into each card before its closing </div>
$pattern = '(?s)(<div class="question-box">.*?</div>\s*)</div>'
$replacement = "`$1`r`n" + $stamp + "`r`n</div>"
$enhancedCards = [regex]::Replace($allCards, $pattern, $replacement)

$fullGuide = $side + "`r`n" + $rubric + "`r`n" + $enhancedCards + "`r`n" + $foot
[System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\03_guide.html', $fullGuide, $utf8)

# --- 2. Fix 04_profiling.html (Diff: 1 -> Missing one closing </div>) ---
$headProf = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\profiling_header.html', $utf8)
$footProf = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\profiling_footer.html', $utf8)
$p10 = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\extracted_profiling_chart.html', $utf8)
$p15 = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\extra_profiling.html', $utf8)

# In extracted_profiling_chart.html, let's match Part 1 and Part 2
# From <div class="section-block chameleon-sec to the closing </div> of disease-sec table block
$mProf1 = [regex]::Match($p10, '(?s)<div class="section-block chameleon-sec.*?(?=</div>\s*<script|</body>|$)').Value

# In extra_profiling.html, check the divs
$mProf2 = [regex]::Match($p15, '(?s)<div class="content-block">.*?</div>\s*$').Value

$fullProf = $headProf + "`r`n" + $mProf1 + "`r`n" + $mProf2 + "`r`n" + $footProf

# Check div count of fullProf
$o = ([regex]::Matches($fullProf, '<div\b')).Count
$c = ([regex]::Matches($fullProf, '</div>')).Count
if ($o -gt $c) {
    # add missing closing divs before footProf
    $diff = $o - $c
    $addDivs = ("</div>" * $diff)
    $fullProf = $headProf + "`r`n" + $mProf1 + "`r`n" + $mProf2 + "`r`n" + $addDivs + "`r`n" + $footProf
}
[System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\04_profiling.html', $fullProf, $utf8)

Write-Output "Fixed guide and profiling div structures."
