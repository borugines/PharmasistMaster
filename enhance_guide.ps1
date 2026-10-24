[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$c = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\src\03_guide.html' -Encoding UTF8 -Raw

# 1. ルーブリック＆フレームワークHTML
$rubricHtml = @'
    <div class="guide-content-area" id="guide-cards-container">

      <!-- 指導フレームワーク ＆ 11週間ルーブリック -->
      <div class="framework-box" style="margin-bottom:25px;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #e2e8f0; padding-bottom:10px; margin-bottom:12px;">
          <div>
            <span class="hero-tag" style="background:#e0f2fe; color:#0369a1; border-color:#7dd3fc;">Education Core Model</span>
            <h3 style="font-size:1.25rem; color:var(--primary); font-weight:800; margin-top:4px;">🎓 全疾患に共通する「薬学的管理の5ステップ」＆ 11週間指導ルーブリック</h3>
          </div>
          <button onclick="toggleFrameworkDetails(this)" style="background:#f1f5f9; border:1px solid #cbd5e1; padding:6px 12px; border-radius:6px; cursor:pointer; font-size:0.85rem; font-weight:700;">▼ 開く / 閉じる</button>
        </div>

        <div id="framework-details">
          <div class="grid-2col" style="margin-bottom:15px;">
            <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px 14px;">
              <h4 style="font-size:0.95rem; color:#1e3a8a; margin-bottom:6px;">📋 薬学的管理の5ステップ（全症例共通）</h4>
              <ol style="padding-left:18px; font-size:0.85rem; line-height:1.6; color:#334155;">
                <li><strong>患者情報の把握（S/O収集）：</strong>処方箋、カルテ、お薬手帳、面談から病態・検査値・生活背景・併用薬を抽出。</li>
                <li><strong>処方解析と妥当性評価（Assessment）：</strong>ガイドライン治療と照合し、腎・肝機能・年齢に適しているか評価。</li>
                <li><strong>服薬指導とアドヒアランス（Education）：</strong>専門用語を噛み砕き、患者の理解度や不安に寄り添った指導・手技確認。</li>
                <li><strong>有効性と安全性のモニタリング（Monitoring）：</strong>治療ゴールと、初期症状として注意すべき副作用の予測。</li>
                <li><strong>多職種連携・処方提案（Intervention）：</strong>疑義照会、トレーシングレポートでの医師・看護師への情報共有。</li>
              </ol>
            </div>

            <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px 14px;">
              <h4 style="font-size:0.95rem; color:#1e3a8a; margin-bottom:6px;">📈 11週間のステップアップ指導アプローチ</h4>
              <table class="rubric-table">
                <tr>
                  <th style="width:25%;">フェーズ</th>
                  <th style="width:35%;">重点到達目標</th>
                  <th style="width:40%;">指導薬剤師の関わり方</th>
                </tr>
                <tr>
                  <td><strong>序盤<br>(1〜3週)</strong></td>
                  <td>処方箋から疾患と病態を推察する</td>
                  <td>「この処方からどんな重症度だと思う？」と問いかけ、薬理・病態と臨床を結びつける。</td>
                </tr>
                <tr>
                  <td><strong>中盤<br>(4〜7週)</strong></td>
                  <td>患者背景に合わせた服薬指導の実践</td>
                  <td>模擬面談・ロールプレイ後に実投薬へ同行。「良かった点」「深掘りできた点」を即フィードバック。</td>
                </tr>
                <tr>
                  <td><strong>終盤<br>(8〜11週)</strong></td>
                  <td>継続的フォローと処方提案</td>
                  <td>1人の患者を複数回担当（SOAP作成）。副作用モニタリングや残薬調整、トレーシングレポート作成を体験。</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
'@

$c = $c -replace '<div class="guide-content-area" id="guide-cards-container">', $rubricHtml

# 2. 各カードに手書きメモ欄を追加
$memoHtml = @'
    <div class="memo-area">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <strong style="color:#0f172a; font-size:0.92rem;">📝 実習生 症例ディスカッション＆メモ欄（印刷後手書き用）：</strong>
        <span style="font-size:0.75rem; color:#64748b; border:1px solid #cbd5e1; padding:2px 10px; border-radius:4px; background:white;">指導薬剤師 印：　　　　</span>
      </div>
      <div style="font-size:0.85rem; color:#64748b; line-height:1.5;">
        ・担当患者の病態・降圧/血糖コントロール目標：<br>
        ・現在の処方意図・疑義照会・服薬指導での気づき：
      </div>
    </div>
  </div>
'@

# 各カードの閉じタグ `</div>` の手前に memo-area を挿入
$c = [regex]::Replace($c, '(\s*<div class="question-box">[\s\S]*?</div>\s*)</div>', "`$1`r`n$memoHtml")

[System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\03_guide.html', $c, (New-Object System.Text.UTF8Encoding($true)))
Write-Output "Successfully enhanced src/03_guide.html with rubric and memo areas"
