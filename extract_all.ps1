[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$lines = Get-Content 'c:\Users\borug\Downloads\Google-Gemini.md' -Encoding UTF8

function Save-Block($start, $end, $filename) {
    # 0-indexed: start-1 to end-1
    $content = $lines[($start - 1)..($end - 1)] -join "`r`n"
    # code fenceを取り除く
    $content = $content -replace '^```[a-zA-Z0-9_-]*\r?\n', ''
    $content = $content -replace '\r?\n```$', ''
    $target = "c:\Users\borug\Antigravity\PharmasistMaster\extracted_$filename"
    [System.IO.File]::WriteAllText($target, $content, [System.Text.Encoding]::UTF8)
    Write-Output "Saved $target ($($end - $start + 1) lines)"
}

Save-Block 693 1384 "witty_guide_10.html"
Save-Block 1569 1878 "answer_book_10.html"
Save-Block 1917 2446 "profiling_chart.html"
Save-Block 2501 3418 "comparison_matrix.html"
Save-Block 3484 4135 "index_portal.html"
Save-Block 4181 4421 "extra_cards_11_15.html"
Save-Block 4429 4525 "extra_answers_11_15.html"
Save-Block 4533 4613 "extra_profiling_11_15.html"
Save-Block 4621 4643 "extra_suggest_11_15.js"
Save-Block 4669 5454 "witty_guide_15.html"
