[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$html = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\index.html' -Encoding UTF8 -Raw

Write-Output "=== HTML VERIFICATION REPORT ==="

# 1. タブIDチェック
$tabs = @('tab-search', 'tab-guide', 'tab-profiling', 'tab-comparison', 'tab-answers', 'tab-print')
foreach ($t in $tabs) {
    if ($html.Contains("id=`"$t`"")) {
        Write-Output "[OK] Tab found: $t"
    } else {
        Write-Output "[ERROR] Missing Tab: $t"
    }
}

# 2. 疾患カードIDチェック (c1〜c15)
1..15 | ForEach-Object {
    $cid = "c$_"
    if ($html.Contains("id=`"$cid`"")) {
        Write-Output "[OK] Disease Card found: $cid"
    } else {
        Write-Output "[ERROR] Missing Disease Card: $cid"
    }
}

# 3. 比較セクションチェック
$secList = @('sec-ht', 'sec-dm', 'sec-cv', 'sec-psy', 'sec-resp', 'sec-inf', 'sec-meta', 'sec-pal', 'sec-extra')
foreach ($s in $secList) {
    if ($html.Contains($s)) {
        Write-Output "[OK] Comparison Section found: $s"
    } else {
        Write-Output "[WARNING] Comparison Section pattern: $s"
    }
}

# 4. Answer Book Q1〜Q15チェック
1..15 | ForEach-Object {
    $qid = "Q$_."
    if ($html.Contains($qid)) {
        Write-Output "[OK] Answer Book Question found: $qid"
    } else {
        Write-Output "[ERROR] Missing Question: $qid"
    }
}

if ($html.Contains("const DRUG_DB = [")) {
    Write-Output "[OK] DRUG_DB declaration found"
}
