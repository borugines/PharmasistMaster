[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$lines = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\extracted_profiling_chart.html' -Encoding UTF8

$startIdx = -1
$endIdx = -1
for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '<div class="container">') {
        $startIdx = $i + 1
    }
    if ($startIdx -ge 0 -and $lines[$i] -match '<script>') {
        $endIdx = $i - 2
        break
    }
}

$coreHtml = ($lines[$startIdx..$endIdx] -join "`r`n").Trim()

# extra_profiling.html を読み込む
$extraProfiling = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\src\extra_profiling.html' -Encoding UTF8 -Raw

$header = @'
<!-- 処方箋プロファイリング＆病態鑑別チャート タブペイン -->
<div id="tab-profiling" class="tab-pane">
  
  <div style="margin-bottom:15px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
    <div>
      <h2 style="font-size:1.5rem; color:var(--primary); font-weight:800;">🕵️‍♂️ 処方箋プロファイリング＆病態鑑別チャート</h2>
      <p style="font-size:0.92rem; color:var(--text-muted); line-height:1.5;">処方箋という「結果」から、医師の診断・病態・重症度・ガイドライン段階を逆算推理する実戦チャート</p>
    </div>
    <div style="display:flex; gap:8px;">
      <button class="header-print-btn" onclick="printTab('tab-profiling')">🖨️ 鑑別チャート全編印刷</button>
    </div>
  </div>

  <!-- 鑑別チャート専用コントロールバー（サブ切り替え ＆ チャート内検索） -->
  <div class="profiling-control-bar">
    <div class="profiling-sub-nav">
      <button class="sub-filter-btn active" onclick="switchProfilingView('all', this)">🌟 すべて表示</button>
      <button class="sub-filter-btn" onclick="switchProfilingView('chameleon-sec', this)">🦎 カメレオン薬 鑑別マトリクス</button>
      <button class="sub-filter-btn" onclick="switchProfilingView('disease-sec', this)">📊 15疾患別 処方病態チャート</button>
    </div>
    <div>
      <input type="text" id="profiling-search-input" class="pro-search-input" placeholder="🔍 チャート内絞り込み (例: フォシーガ, 寝る前, 女性)" onkeyup="filterProfiling(this.value)" />
    </div>
  </div>

  <div class="profiling-container" id="profiling-container-area">
'@

$footer = @'
  </div>
</div>
'@

$finalContent = $header + "`r`n" + $coreHtml + "`r`n" + $extraProfiling + "`r`n" + $footer
[System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\04_profiling.html', $finalContent, (New-Object System.Text.UTF8Encoding($true)))
Write-Output "Successfully updated src/04_profiling.html with control bar"
