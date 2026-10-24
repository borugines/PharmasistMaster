[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$lines10 = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\extracted_answer_book_10.html' -Encoding UTF8

# <!-- Q1 --> から </body> 直前までを抽出
$startIdx = -1
$endIdx = -1
for ($i = 0; $i -lt $lines10.Count; $i++) {
    if ($lines10[$i] -match '<!-- Q1 -->') {
        $startIdx = $i
    }
    if ($lines10[$i] -match '</body>') {
        $endIdx = $i - 1
        break
    }
}

if ($startIdx -ge 0 -and $endIdx -gt $startIdx) {
    $coreHtml = $lines10[$startIdx..$endIdx] -join "`r`n"
    Write-Output "Successfully found Q1-Q10 lines: $startIdx to $endIdx"
} else {
    Write-Output "Failed to find Q1-Q10 lines"
}

# Q11〜Q15を読み込む
$linesExtra = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\extracted_extra_answers_11_15.html' -Encoding UTF8
$extraHtml = ($linesExtra | Where-Object { $_ -notmatch '^```' }) -join "`r`n"

$header = @'
<!-- 指導薬剤師用 Answer Book タブペイン -->
<div id="tab-answers" class="tab-pane">
  <div style="margin-bottom:20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
    <div>
      <h2 style="font-size:1.4rem; color:var(--primary); font-weight:800;">🎓 指導薬剤師用 Answer Book（全15問・模範解答＆解説）</h2>
      <p style="font-size:0.9rem; color:var(--text-muted);">学生に「30秒で伝える結論」「先輩の比喩」「ドヤ顔深掘り」の3段構成カンペ集</p>
    </div>
    <div style="display:flex; gap:8px;">
      <button class="header-print-btn" onclick="printTab('tab-answers')">🖨️ Answer Book印刷</button>
    </div>
  </div>
  <div class="answers-container">
'@

$footer = @'
  </div>
</div>
'@

$finalContent = $header + "`r`n" + $coreHtml + "`r`n" + $extraHtml + "`r`n" + $footer
[System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\06_answers.html', $finalContent, (New-Object System.Text.UTF8Encoding($true)))
Write-Output "Successfully regenerated src\06_answers.html with BOM"
