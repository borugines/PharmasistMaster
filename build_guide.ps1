[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$lines = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\extracted_witty_guide_15.html' -Encoding UTF8

$startIdx = -1
$endIdx = -1
for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '<div class="main">') {
        $startIdx = $i
    }
    if ($lines[$i] -match '</script>') {
        $endIdx = $i - 1
    }
}

if ($startIdx -ge 0 -and $endIdx -gt $startIdx) {
    $content = $lines[($startIdx + 1)..($endIdx - 1)] -join "`r`n"
    
    # cardクラスをdisease-cardに統一置換してCSSと完全に同期させる
    $content = $content -replace 'class="card"', 'class="disease-card"'
    $content = $content -replace 'class="grid-2"', 'class="grid-2col"'
    $content = $content -replace 'class="box"', 'class="section-box"'
    $content = $content -replace 'class="offlabel"', 'class="offlabel-box"'
    $content = $content -replace 'class="pearl"', 'class="pearl-box"'
    $content = $content -replace '<ul>', '<ul class="bullet-list">'

    $header = @'
<!-- 15疾患 現場の脳内翻訳ガイド タブペイン -->
<div id="tab-guide" class="tab-pane">
  <div class="guide-layout">
    <div class="guide-sidebar">
      <div class="sidebar-heading">📚 疾患クイックナビ</div>
      <ul class="guide-nav-list">
        <li class="guide-nav-item"><a class="guide-nav-link active" onclick="filterGuideCard('all', this)"><span>🌟 全15疾患を表示</span></a></li>
        <li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c1', this)"><span>1. 悪性腫瘍（がん）</span><span class="guide-nav-badge">Oncology</span></a></li>
        <li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c2', this)"><span>2. 高血圧症</span><span class="guide-nav-badge">JSH</span></a></li>
        <li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c3', this)"><span>3. 糖尿病</span><span class="guide-nav-badge">JDS</span></a></li>
        <li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c4', this)"><span>4. 心疾患（心不全・虚血）</span><span class="guide-nav-badge">JCS</span></a></li>
        <li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c5', this)"><span>5. 脳血管障害（脳梗塞）</span><span class="guide-nav-badge">Stroke</span></a></li>
        <li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c6', this)"><span>6. 精神神経疾患</span><span class="guide-nav-badge">Psychiatry</span></a></li>
        <li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c7', this)"><span>7. 免疫・アレルギー</span><span class="guide-nav-badge">Allergy</span></a></li>
        <li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c8', this)"><span>8. 感染症</span><span class="guide-nav-badge">PK/PD</span></a></li>
        <li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c9', this)"><span>9. 腎・泌尿器疾患</span><span class="guide-nav-badge">CKD</span></a></li>
        <li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c10', this)"><span>10. 脂質異常・骨粗鬆症</span><span class="guide-nav-badge">Aging</span></a></li>
        <li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c11', this)"><span>11. 消化器疾患</span><span class="guide-nav-badge">GI</span></a></li>
        <li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c12', this)"><span>12. 整形外科・疼痛</span><span class="guide-nav-badge">Pain</span></a></li>
        <li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c13', this)"><span>13. 甲状腺・婦人科</span><span class="guide-nav-badge">Endocrine</span></a></li>
        <li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c14', this)"><span>14. 眼科・耳鼻・皮膚科</span><span class="guide-nav-badge">Sensory</span></a></li>
        <li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c15', this)"><span>15. 肝胆膵疾患</span><span class="guide-nav-badge">Liver</span></a></li>
      </ul>
      <div style="margin-top:20px;">
        <button class="header-print-btn" style="width:100%; justify-content:center;" onclick="printActiveGuideCard()">🖨️ 選択中カードを印刷</button>
      </div>
    </div>
    <div class="guide-content-area" id="guide-cards-container">
'@
    $footer = @'
    </div>
  </div>
</div>
'@
    $finalContent = $header + "`r`n" + $content + "`r`n" + $footer
    [System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\03_guide.html', $finalContent, (New-Object System.Text.UTF8Encoding($true)))
    Write-Output "Successfully generated src\03_guide.html with BOM"
} else {
    Write-Output "Indices error: $startIdx to $endIdx"
}
