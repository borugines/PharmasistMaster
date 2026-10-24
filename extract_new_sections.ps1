$path = 'c:\Users\borug\Downloads\Google-Gemini (1).md'
$lines = [System.IO.File]::ReadAllLines($path, [System.Text.Encoding]::UTF8)

function Extract-Lines($startLine, $endLine, $outFile) {
    $sub = @()
    for ($i = $startLine - 1; $i -lt $endLine; $i++) {
        $sub += $lines[$i]
    }
    $text = [string]::Join("`r`n", $sub)
    # Remove ```html and ``` fences
    $text = [regex]::Replace($text, '^```html\s*`r?`n', '')
    $text = [regex]::Replace($text, '`r?`n```\s*$', '')
    [System.IO.File]::WriteAllText($outFile, $text, [System.Text.Encoding]::UTF8)
    Write-Output ("Saved: {0} ({1} bytes, {2} lines)" -f $outFile, $text.Length, ($endLine - $startLine + 1))
}

# 1. New drugs trend (Lines 1334 - 1850)
Extract-Lines 1334 1850 'c:\Users\borug\Antigravity\PharmasistMaster\extracted_new_drugs.html'

# 2. Special topics (Lines 1993 - 2582)
Extract-Lines 1993 2582 'c:\Users\borug\Antigravity\PharmasistMaster\extracted_special_topics.html'

# 3. OTC guide (Lines 2670 - 3035)
Extract-Lines 2670 3035 'c:\Users\borug\Antigravity\PharmasistMaster\extracted_otc_guide.html'

# 4. Follow-up & TR (Lines 3108 - 3477)
Extract-Lines 3108 3477 'c:\Users\borug\Antigravity\PharmasistMaster\extracted_followup_tr.html'
