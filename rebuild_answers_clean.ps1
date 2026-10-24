[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$utf8 = [System.Text.Encoding]::UTF8
$head = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\answer_toggle.html', $utf8)
$foot = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\answers_footer.html', $utf8)
$blank = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\student_blank.html', $utf8)

$a10 = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\extracted_answer_book_10.html', $utf8)
$a15 = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\extracted_extra_answers_11_15.html', $utf8)

# Extract cards from a10
$m1 = [regex]::Matches($a10, '(?s)<div class="qa-card">.*?</div>\s*</div>')
# Actually each qa-card has inner divs. Let's match from <!-- Q... --> or <div class="qa-card"> to the closing </div> of that card.
# In a10, each card starts with <div class="qa-card"> and has <div class="q-box">, <div class="ans-section">, <div class="metaphor">, <div class="doya">.
# So the card ends at the next <div class="qa-card"> or </body>.

function Process-QACards($text) {
    # Match each card: <div class="qa-card"> ... </div>
    # Note: within a card there are 3 or 4 child divs.
    $pattern = '(?s)<div class="qa-card">\s*(<div class="q-box">.*?</div>)\s*(<div class="ans-section">.*?</div>\s*<div class="metaphor">.*?</div>\s*<div class="doya">.*?</div>)\s*</div>'
    
    $result = [regex]::Replace($text, $pattern, {
        param($m)
        $qbox = $m.Groups[1].Value
        $ansBody = $m.Groups[2].Value
        return "<div class=`"qa-card`">`r`n  $qbox`r`n  <div class=`"ans-content-wrapper`">`r`n    $ansBody`r`n  </div>`r`n$blank`r`n</div>"
    })
    return $result
}

# Extract card sections
$mCards10 = [regex]::Match($a10, '(?s)<!-- Q1 -->.*?(?=</div>\s*<script|</body>|$)').Value
$cards10Processed = Process-QACards($mCards10)

$cards15Processed = Process-QACards($a15)

$fullAnswers = $head + "`r`n" + $cards10Processed + "`r`n" + $cards15Processed + "`r`n" + $foot

[System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\06_answers.html', $fullAnswers, $utf8)
Write-Output "Done rebuilding 06_answers.html. Length: $($fullAnswers.Length)"
