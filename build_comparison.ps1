[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$lines = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\extracted_comparison_matrix.html' -Encoding UTF8

$startIdx = -1
$endIdx = -1
for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '<div class="main-container">') {
        $startIdx = $i
    }
    if ($lines[$i] -match '</script>') {
        $endIdx = $i - 1
    }
}

$coreHtml = $lines[($startIdx + 1)..($endIdx - 1)] -join "`r`n"

# extra_profiling_11_15 (実際はcomparisonの追加パート3) を読み込む
$extraComp = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\extracted_extra_profiling_11_15.html' -Encoding UTF8
$extraCompHtml = ($extraComp | Where-Object { $_ -notmatch '^```' }) -join "`r`n"

$header = @'
<!-- 同効薬・分類別ガチンコ比較＆使い分けマトリクス タブペイン -->
<div id="tab-comparison" class="tab-pane">
  <div style="margin-bottom:20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
    <div>
      <h2 style="font-size:1.4rem; color:var(--primary); font-weight:800;">⚔️ 同効薬・分類別ガチンコ比較＆使い分け図鑑</h2>
      <p style="font-size:0.9rem; color:var(--text-muted);">「なぜ数ある同効薬の中からそれを選んだのか？」医師の脳内にある選択基準を丸裸にする</p>
    </div>
    <div style="display:flex; gap:8px;">
      <button class="header-print-btn" onclick="printTab('tab-comparison')">🖨️ 比較マトリクス印刷</button>
    </div>
  </div>
'@

$footer = @'
</div>
'@

$finalContent = $header + "`r`n" + $coreHtml + "`r`n" + $extraCompHtml + "`r`n" + $footer
[System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\05_comparison.html', $finalContent, (New-Object System.Text.UTF8Encoding($true)))
Write-Output "Successfully generated src\05_comparison.html with BOM"
