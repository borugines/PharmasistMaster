const fs = require('fs');

const labHtml = `<!-- 🧪 臨床検査値＆薬学的評価マスター タブペイン -->
<div id="tab-lab" class="tab-pane">
  <div style="background:white; border:1px solid var(--border); border-radius:12px; padding:24px 28px; box-shadow:0 4px 12px rgba(15,23,42,0.05); margin-bottom:25px;">
    
    <div style="border-bottom:2px solid #1e3a8a; padding-bottom:12px; margin-bottom:20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
      <div>
        <span class="algo-tag" style="background:#2563eb;">Clinical Laboratory Intelligence</span>
        <h2 style="font-size:1.55rem; color:#0f172a; font-weight:800; margin-top:4px;">🧪 処方監査 臨床検査値＆薬学的評価マスター</h2>
        <p style="font-size:0.9rem; color:#64748b; margin:2px 0 0 0;">
          「この値がいくつなら減量・禁忌・疑義照会か？」——腎機能、肝機能、電解質、炎症、心不全、血液凝固マーカーのウラ読みと臨床判断基準。
        </p>
      </div>
      <div style="display:flex; gap:8px;">
        <input type="text" id="labSearchInput" placeholder="🔍 検査値・薬名で検索 (例: K, eGFR, 5.5)" onkeyup="filterLabTables()" style="padding:7px 12px; border:1px solid #cbd5e1; border-radius:6px; font-size:0.85rem; width:220px;">
        <button class="header-print-btn" onclick="window.print()" style="padding:7px 14px; font-size:0.85rem;">🖨️ A4印刷</button>
      </div>
    </div>

    <!-- カテゴリ切り替えクイックピル -->
    <div class="dict-category-pills" style="margin-bottom:18px;">
      <button class="dict-btn active" onclick="filterLabSection('all', this)">すべて表示</button>
      <button class="dict-btn" onclick="filterLabSection('lab-sec-renal', this)">🩺 ① 腎機能（eGFR/Ccr/ACR）</button>
      <button class="dict-btn" onclick="filterLabSection('lab-sec-hepatic', this)">🥩 ② 肝機能・胆道（AST/ALT/Alb）</button>
      <button class="dict-btn" onclick="filterLabSection('lab-sec-electrolyte', this)">⚡ ③ 電解質（K/Na/Ca/Mg）</button>
      <button class="dict-btn" onclick="filterLabSection('lab-sec-cardiac', this)">❤️ ④ 心不全・心筋（BNP/NT-proBNP）</button>
      <button class="dict-btn" onclick="filterLabSection('lab-sec-inflam', this)">🔥 ⑤ 炎症・感染・自己免疫</button>
      <button class="dict-btn" onclick="filterLabSection('lab-sec-metabolic', this)">🍬 ⑥ 血糖・代謝・脂質</button>
      <button class="dict-btn" onclick="filterLabSection('lab-sec-heme', this)">🩸 ⑦ 血液・凝固（貧血/PT-INR）</button>
    </div>

    <!-- 1. 腎機能検査値セクション -->
    <div class="lab-section lab-sec-renal" style="margin-bottom:25px;">
      <div style="background:#eff6ff; border-left:5px solid #2563eb; padding:8px 14px; border-radius:0 8px 8px 0; margin-bottom:10px;">
        <h3 style="font-size:1.1rem; color:#1e40af; font-weight:800;">🩺 ① 腎機能検査値（処方監査の最頻出・最重要指標）</h3>
      </div>
      <table class="switch-table">
        <thead>
          <tr>
            <th style="width:16%;">検査項目</th>
            <th style="width:16%;">基準値（正常範囲）</th>
            <th style="width:28%;">⚠️ パニック値・疑義照会ライン</th>
            <th style="width:40%;">💊 関連医薬品 ＆ 薬剤師のウラ読み勘所</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>eGFR</strong><br>（推算糸球体濾過量）<br><span style="font-size:0.75rem; color:#64748b;">mL/min/1.73m²</span></td>
            <td><strong>≥60</strong><br>（G1〜G2：正常〜軽度）</td>
            <td>
              ・<strong>&lt;45：G3b</strong>（多くの薬剤で減量開始）<br>
              ・<strong>&lt;30：G4</strong>（メトホルミン禁忌、SGLT2降糖無効）<br>
              ・<strong>&lt;15：G5</strong>（末期腎不全・透析導入）
            </td>
            <td>
              ・<strong>メトホルミン：</strong>eGFR&lt;30禁忌（乳酸アシドーシス）。30〜44は上限750mg。<br>
              ・<strong>SGLT2阻害薬：</strong>eGFR&lt;30で血糖降下作用はほぼ消失するが、<strong>心腎保護目的（フォシーガ/ジャディアンス）ならeGFR&lt;20まで継続推奨！</strong><br>
              ・<strong>DOAC：</strong>各薬剤ごとの腎機能基準（イグザレルトは15〜49で10mgに減量等）を厳格遵守。
            </td>
          </tr>
          <tr>
            <td><strong>推算Ccr</strong><br>（Cockcroft-Gault式）<br><span style="font-size:0.75rem; color:#64748b;">mL/min</span></td>
            <td><strong>男性: 90〜130<br>女性: 80〜120</strong></td>
            <td>
              ・<strong>&lt;50：</strong>抗菌薬・抗ウイルス薬の減量<br>
              ・<strong>&lt;30：</strong>プラザキサ禁忌、コルヒチン禁忌
            </td>
            <td>
              💡 <strong>高齢者・寝たきり患者の「Cr補正（0.6問題）」：</strong><br>
              筋肉量が極端に落ちた高齢者では血清Crが見かけ上「0.3〜0.4」と超低値になり、計算上のCcrが過大評価される！<br>
              ➔ <strong>実務では血清Crを「0.6」に切り上げて再計算する</strong>か、シスタチンCで真の腎機能を評価するのが鉄則！
            </td>
          </tr>
          <tr>
            <td><strong>シスタチンC</strong><br><span style="font-size:0.75rem; color:#64748b;">mg/L</span></td>
            <td><strong>0.53〜0.95</strong></td>
            <td><strong>&gt;1.2：</strong>潜在性腎障害<br><strong>&gt;2.0：</strong>高度腎機能低下</td>
            <td>
              ・筋肉量や食事（肉食）の影響を一切受けないため、<strong>高齢・サルコペニア・切断患者・極度の痩身</strong>での真の糸球体濾過量評価に最適！
            </td>
          </tr>
          <tr>
            <td><strong>尿中アルブミン比（ACR）</strong><br><span style="font-size:0.75rem; color:#64748b;">mg/gCr</span></td>
            <td><strong>&lt;30（正常）</strong></td>
            <td>
              ・<strong>30〜299：</strong>微量アルブミン尿（第2期）<br>
              ・<strong>≥300：</strong>顕性アルブミン尿（第3期）
            </td>
            <td>
              ・糖尿病患者で <strong>30〜299（微量アルブミン尿）</strong> が出たら、まだeGFRが正常でも<strong>「ARB/ACE-I」＋「SGLT2阻害薬」＋「ケレンディア（非ステロイドMRA）」</strong>の早期導入チャンス！
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 2. 肝機能・胆道系検査値セクション -->
    <div class="lab-section lab-sec-hepatic" style="margin-bottom:25px;">
      <div style="background:#fdf2f8; border-left:5px solid #db2777; padding:8px 14px; border-radius:0 8px 8px 0; margin-bottom:10px;">
        <h3 style="font-size:1.1rem; color:#9d174d; font-weight:800;">🥩 ② 肝機能・胆道系検査値（薬物性肝障害＆タンパク結合）</h3>
      </div>
      <table class="switch-table">
        <thead>
          <tr>
            <th style="width:16%;">検査項目</th>
            <th style="width:16%;">基準値（正常範囲）</th>
            <th style="width:28%;">⚠️ パニック値・疑義照会ライン</th>
            <th style="width:40%;">💊 関連医薬品 ＆ 薬剤師のウラ読み勘所</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>AST（GOT） / ALT（GPT）</strong><br><span style="font-size:0.75rem; color:#64748b;">U/L</span></td>
            <td><strong>AST: 10〜40<br>ALT: 5〜40</strong></td>
            <td>
              ・<strong>基準値の3倍超（&gt;100）：</strong>薬物性肝障害（DILI）疑い<br>
              ・<strong>基準値の5倍超（&gt;200）：</strong>直ちに原因薬中止・精査
            </td>
            <td>
              💡 <strong>AST/ALT比のウラ読み法則：</strong><br>
              ・<strong>ALT &gt; AST：</strong>脂肪肝（NAFLD）、急性ウイルス性肝炎。<br>
              ・<strong>AST &gt; ALT（逆転）：</strong>アルコール性肝障害、肝硬変進行、心筋梗塞、骨格筋融解。<br>
              ・<strong>DILI頻出薬：</strong>NSAIDs、抗菌薬、抗不整脈薬、抗てんかん薬、漢方薬（柴胡・黄芩含有）。
            </td>
          </tr>
          <tr>
            <td><strong>γ-GTP / ALP</strong><br><span style="font-size:0.75rem; color:#64748b;">U/L</span></td>
            <td><strong>γ-GTP: 男&lt;70, 女&lt;35<br>ALP: 38〜113</strong></td>
            <td>・<strong>基準値の3倍超：</strong>胆汁うっ滞型肝障害、胆管炎・結石</td>
            <td>
              ・ALP単独上昇なら骨代謝亢進（骨折治癒期、骨転移、骨粗鬆症）も考慮。<br>
              ・胆汁うっ滞型肝障害はアモキシシリン/クラブラン酸（オーグメンチン）、マクロライド系で好発。
            </td>
          </tr>
          <tr>
            <td><strong>血清アルブミン（Alb）</strong><br><span style="font-size:0.75rem; color:#64748b;">g/dL</span></td>
            <td><strong>4.0〜5.0</strong></td>
            <td>
              ・<strong>&lt;3.5：</strong>低栄養・浮腫・肝硬変<br>
              ・<strong>&lt;2.5：</strong>重篤な低アルブミン血症
            </td>
            <td>
              💡 <strong>薬学的超重要ポイント（タンパク結合率の罠）：</strong><br>
              Alb結合率が高い薬（<strong>ワルファリン 99%、フェニトイン 90%、NSAIDs 99%</strong>）は、Albが下がると血液中の<strong>「遊離型（Free型）薬物」が2〜3倍に激増し中毒・出血</strong>を起こす！<br>
              ・血中総濃度が正常値でも過量投与になっているリスクに注意。
            </td>
          </tr>
          <tr>
            <td><strong>総ビリルビン（T-Bil）</strong><br><span style="font-size:0.75rem; color:#64748b;">mg/dL</span></td>
            <td><strong>0.2〜1.2</strong></td>
            <td>・<strong>&gt;2.0〜3.0：</strong>肉眼黄疸出現（眼球結膜黄色）</td>
            <td>
              ・<strong>直接ビリルビン優位：</strong>胆汁うっ滞、閉塞性黄疸、肝細胞障害。<br>
              ・<strong>間接ビリルビン優位：</strong>溶血性貧血、体質性黄疸（ジルベール症候群）。
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 3. 電解質異常セクション -->
    <div class="lab-section lab-sec-electrolyte" style="margin-bottom:25px;">
      <div style="background:#fefce8; border-left:5px solid #ca8a04; padding:8px 14px; border-radius:0 8px 8px 0; margin-bottom:10px;">
        <h3 style="font-size:1.1rem; color:#854d0e; font-weight:800;">⚡ ③ 電解質異常（致死的不整脈・神経症状・医原性リスク）</h3>
      </div>
      <table class="switch-table">
        <thead>
          <tr>
            <th style="width:16%;">電解質項目</th>
            <th style="width:16%;">基準値（正常範囲）</th>
            <th style="width:28%;">⚠️ パニック値・危険ライン</th>
            <th style="width:40%;">💊 関連医薬品 ＆ 薬剤師のウラ読み勘所</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>カリウム（K）</strong><br><span style="font-size:0.75rem; color:#64748b;">mEq/L</span></td>
            <td><strong>3.5〜5.0</strong></td>
            <td>
              ・<strong>高K血症：&ge;5.5</strong>（心電図T波尖鋭化）<br>
              ・<strong>超危険：&ge;6.0</strong>（致死的不整脈・心停止）<br>
              ・<strong>低K血症：&lt;3.0</strong>（四肢脱力・麻痺・不整脈）
            </td>
            <td>
              🚨 <strong>高K血症の犯人薬：</strong><br>
              ・ACE阻害薬/ARB、MRA（スピロノラクトン/ミネブロ/ケレンディア）、ARNI、ST合剤（トリメトプリム）、カリウム保持性利尿薬。<br>
              ➔ K&ge;5.5なら減量またはロケルマ/カリメート追加提案！<br>
              🚨 <strong>低K血症の犯人薬：</strong><br>
              ・ループ利尿薬、サイアザイド系、<strong>生薬「甘草（カンゾウ）」含有漢方薬（偽アルドステロン症）</strong>！
            </td>
          </tr>
          <tr>
            <td><strong>ナトリウム（Na）</strong><br><span style="font-size:0.75rem; color:#64748b;">mEq/L</span></td>
            <td><strong>135〜145</strong></td>
            <td>
              ・<strong>低Na血症：&lt;130</strong>（倦怠感・嘔気）<br>
              ・<strong>危険：&lt;120</strong>（痙攣・意識障害・昏睡）
            </td>
            <td>
              ・<strong>低Na血症の犯人薬：</strong>サイアザイド系利尿薬、<strong>SSRI/SNRI・カルバマゼピン（SIADH誘発）</strong>。<br>
              ・<strong>サムスカ（トルバプタン）投与時：</strong>急激にNaを上げすぎると「橋中心髄鞘崩壊症（ODS）」を起こすため24時間で10mEq/L以上の急上昇を避ける！
            </td>
          </tr>
          <tr>
            <td><strong>カルシウム（Ca）</strong><br><span style="font-size:0.75rem; color:#64748b;">mg/dL</span></td>
            <td><strong>8.5〜10.2</strong></td>
            <td>
              ・<strong>高Ca血症：&gt;11.0</strong>（口渇・便秘・意識障害）<br>
              ・<strong>低Ca血症：&lt;8.0</strong>（テタニー・QT延長）
            </td>
            <td>
              💡 <strong>補正Ca計算式（Alb&lt;4.0のとき必須）：</strong><br>
              <span style="background:#e0f2fe; padding:2px 6px; border-radius:4px; font-weight:700;">補正Ca ＝ 測定Ca ＋ (4.0 - Alb)</span><br>
              ・<strong>高Ca血症：</strong>活性型Vit D3製剤（エディロール/ワンアルファ）。<br>
              ・<strong>低Ca血症：</strong><strong>プラリア（デノスマブ）投与初期に好発！</strong>開始前のデノタスチュアブル（Ca+Vit D）補充が必須。
            </td>
          </tr>
          <tr>
            <td><strong>マグネシウム（Mg）</strong><br><span style="font-size:0.75rem; color:#64748b;">mg/dL</span></td>
            <td><strong>1.8〜2.4</strong></td>
            <td>・<strong>高Mg血症：&gt;3.5〜4.0</strong>（徐脈・低血圧・呼吸抑制）</td>
            <td>
              ⚠️ <strong>酸化マグネシウム長期服用の罠：</strong>高齢者・CKD患者が便秘薬として漫然と飲み続けると高Mg血症で救急搬送される事故多発！定期的な血清Mg測定を推奨。
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 4. 心不全・心筋バイオマーカーセクション -->
    <div class="lab-section lab-sec-cardiac" style="margin-bottom:25px;">
      <div style="background:#fef2f2; border-left:5px solid #ef4444; padding:8px 14px; border-radius:0 8px 8px 0; margin-bottom:10px;">
        <h3 style="font-size:1.1rem; color:#991b1b; font-weight:800;">❤️ ④ 心不全・心筋バイオマーカー（心不全重症度 ＆ ARNIの罠）</h3>
      </div>
      <table class="switch-table">
        <thead>
          <tr>
            <th style="width:16%;">検査項目</th>
            <th style="width:16%;">基準値（正常範囲）</th>
            <th style="width:28%;">⚠️ パニック値・判定ライン</th>
            <th style="width:40%;">💊 関連医薬品 ＆ 薬剤師のウラ読み勘所</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>BNP</strong><br>（脳性ナトリウム利尿ペプチド）<br><span style="font-size:0.75rem; color:#64748b;">pg/mL</span></td>
            <td><strong>&le;18.4（正常）</strong></td>
            <td>
              ・<strong>&gt;40：</strong>軽度心不全疑い<br>
              ・<strong>&gt;100：</strong>治療対象の心不全<br>
              ・<strong>&gt;400：</strong>重症心不全・入院考慮
            </td>
            <td>
              🚨 <strong>超重要！エンレスト（ARNI）服用中のトラップ：</strong><br>
              エンレストのネプリライシン阻害作用により、<strong>BNPの分解が止まって見かけ上BNP値が跳ね上がる！</strong><br>
              ➔ <strong>エンレスト服用患者の心不全モニタリングには「NT-proBNP」を使わなければならない！</strong>（NT-proBNPはネプリライシンで分解されないため真の負荷を反映）
            </td>
          </tr>
          <tr>
            <td><strong>NT-proBNP</strong><br><span style="font-size:0.75rem; color:#64748b;">pg/mL</span></td>
            <td><strong>&le;55（正常）</strong></td>
            <td>
              ・<strong>&gt;125：</strong>心機能障害疑い<br>
              ・<strong>&gt;400：</strong>心不全治療対象<br>
              ・<strong>&gt;900：</strong>重症心不全
            </td>
            <td>
              ・腎排泄の割合がBNPより高いため、腎機能低下（CKD）ではやや高めに出る点に留意。<br>
              ・息切れが「肺性（喘息/COPD）」か「心不全」かの鑑別に威力を発揮。
            </td>
          </tr>
          <tr>
            <td><strong>CK（CPK）</strong><br>（クレアチンキナーゼ）<br><span style="font-size:0.75rem; color:#64748b;">U/L</span></td>
            <td><strong>男: 59〜248<br>女: 41〜153</strong></td>
            <td>
              ・<strong>&gt;1000：</strong>横紋筋融解症の疑い<br>
              ・<strong>数万：</strong>重症横紋筋融解症・急性腎障害
            </td>
            <td>
              ・<strong>スタチン（コレステロール低下薬）</strong>や<strong>フィブラート系</strong>による筋肉痛＋褐色尿＋CK上昇は即中止！<br>
              ・抗精神病薬や抗パーキンソン薬急中止による<strong>悪性症候群</strong>でも数千〜数万に跳ね上がる。
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 5. 炎症・感染・自己免疫マーカーセクション -->
    <div class="lab-section lab-sec-inflam" style="margin-bottom:25px;">
      <div style="background:#f0fdf4; border-left:5px solid #16a34a; padding:8px 14px; border-radius:0 8px 8px 0; margin-bottom:10px;">
        <h3 style="font-size:1.1rem; color:#166534; font-weight:800;">🔥 ⑤ 炎症・感染・自己免疫マーカー（細菌 vs ウイルス、リウマチ活動性）</h3>
      </div>
      <table class="switch-table">
        <thead>
          <tr>
            <th style="width:16%;">検査項目</th>
            <th style="width:16%;">基準値（正常範囲）</th>
            <th style="width:28%;">⚠️ パニック値・判定ライン</th>
            <th style="width:40%;">💊 関連医薬品 ＆ 薬剤師のウラ読み勘所</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>CRP</strong><br>（C反応性蛋白）<br><span style="font-size:0.75rem; color:#64748b;">mg/dL</span></td>
            <td><strong>&le;0.14（正常）</strong></td>
            <td>
              ・<strong>&gt;0.3〜1.0：</strong>軽度炎症<br>
              ・<strong>&gt;5.0〜10.0：</strong>重症細菌感染症・肺炎
            </td>
            <td>
              🚨 <strong>トシリズマブ（アクテムラ）の「CRPゼロ・トラップ」：</strong><br>
              IL-6を遮断するため、<strong>重症肺炎で倒れていてもCRPは「0.0」に完全マスクされる！</strong>微熱・SpO2低下を見逃すな！
            </td>
          </tr>
          <tr>
            <td><strong>プロカルシトニン（PCT）</strong><br><span style="font-size:0.75rem; color:#64748b;">ng/mL</span></td>
            <td><strong>&lt;0.05（健常）</strong></td>
            <td>
              ・<strong>&gt;0.25：</strong>細菌感染症疑い（抗菌薬検討）<br>
              ・<strong>&gt;0.5〜2.0：</strong>重症敗血症
            </td>
            <td>
              ・<strong>細菌性 vs ウイルス性の切り分けマーカー！</strong><br>
              ・ウイルス感染ではPCTが上昇しないため、「風邪に不要な抗菌薬を出さない（AMR対策）」の科学的指標。
            </td>
          </tr>
          <tr>
            <td><strong>MMP-3</strong><br><span style="font-size:0.75rem; color:#64748b;">ng/mL</span></td>
            <td><strong>男: 36.9〜121.0<br>女: 17.3〜59.7</strong></td>
            <td>・<strong>基準値超：</strong>滑膜増殖・骨破壊進行中</td>
            <td>
              ・<strong>関節リウマチ（RA）の骨破壊活動性リアルタイムマーカー！</strong><br>
              ・CRPが正常でもMMP-3が高い場合は骨破壊が水面下で進んでいるため、MTX増量や生物学的製剤追加の指標。
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 6. 血糖・代謝・脂質セクション -->
    <div class="lab-section lab-sec-metabolic" style="margin-bottom:25px;">
      <div style="background:#faf5ff; border-left:5px solid #9333ea; padding:8px 14px; border-radius:0 8px 8px 0; margin-bottom:10px;">
        <h3 style="font-size:1.1rem; color:#6b21a8; font-weight:800;">🍬 ⑥ 血糖・代謝・脂質（コントロール目標と評価のズレ）</h3>
      </div>
      <table class="switch-table">
        <thead>
          <tr>
            <th style="width:16%;">検査項目</th>
            <th style="width:16%;">基準値・管理目標</th>
            <th style="width:28%;">⚠️ パニック値・判定ライン</th>
            <th style="width:40%;">💊 関連医薬品 ＆ 薬剤師のウラ読み勘所</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>HbA1c（NGSP）</strong><br><span style="font-size:0.75rem; color:#64748b;">%</span></td>
            <td>
              ・<strong>&lt;6.0：</strong>正常化<br>
              ・<strong>&lt;7.0：</strong>合併症予防目標<br>
              ・<strong>&lt;8.0：</strong>高齢者・低血糖懸念
            </td>
            <td>・<strong>&ge;10.0%：</strong>糖毒性解除（インスリン即時検討）</td>
            <td>
              💡 <strong>HbA1cがアテにならない病態：</strong><br>
              溶血性貧血、大出血後、透析患者、鉄欠乏性貧血治療中などは赤血球寿命が変わり、HbA1cが見かけ上低く出る！<br>
              ➔ <strong>直近2週間の指標「グリコアルブミン（GA：目標&lt;20%）」で評価する！</strong>
            </td>
          </tr>
          <tr>
            <td><strong>LDL-C / TG</strong><br><span style="font-size:0.75rem; color:#64748b;">mg/dL</span></td>
            <td>
              ・<strong>LDL: &lt;120（一次予防高）<br>&lt;70（二次予防・冠動脈既往）</strong><br>
              ・<strong>TG: &lt;150</strong>
            </td>
            <td>
              ・<strong>LDL &ge;180：</strong>家族性高コレステロール血症（FH）疑い<br>
              ・<strong>TG &ge;500：</strong>急性膵炎超ハイリスク！
            </td>
            <td>
              ・TG&ge;500ならLDLより優先して<strong>ペマフィブラート（パルモディア）</strong>等で急性膵炎を予防。<br>
              ・冠動脈疾患既往（ACS・ステント後）ならLDL&lt;70（極高リスクは&lt;55）をストロングスタチン＋エゼチミブで徹底追求。
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 7. 血液・凝固系セクション -->
    <div class="lab-section lab-sec-heme" style="margin-bottom:25px;">
      <div style="background:#fff1f2; border-left:5px solid #f43f5e; padding:8px 14px; border-radius:0 8px 8px 0; margin-bottom:10px;">
        <h3 style="font-size:1.1rem; color:#9f1239; font-weight:800;">🩸 ⑦ 血液・貧血・凝固系（MCVによる鑑別 ＆ 抗凝固モニタリング）</h3>
      </div>
      <table class="switch-table">
        <thead>
          <tr>
            <th style="width:16%;">検査項目</th>
            <th style="width:16%;">基準値（正常範囲）</th>
            <th style="width:28%;">⚠️ パニック値・判定ライン</th>
            <th style="width:40%;">💊 関連医薬品 ＆ 薬剤師のウラ読み勘所</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>MCV（平均赤血球容積）</strong><br><span style="font-size:0.75rem; color:#64748b;">fL</span></td>
            <td><strong>80〜100（正球性）</strong></td>
            <td>
              ・<strong>&lt;80：小球性貧血</strong><br>
              ・<strong>&gt;100：大球性貧血</strong>
            </td>
            <td>
              💡 <strong>貧血のタイプ別ウラ読み：</strong><br>
              ・<strong>MCV&lt;80（小球性）：</strong>鉄欠乏性貧血（フェロミア、フェインジェクト）➔ 消化管出血がないか精査！<br>
              ・<strong>MCV 80〜100（正球性）：</strong>腎性貧血（エポエチン、ネスプ、HIF-PH阻害薬エベレンゾ等）。<br>
              ・<strong>MCV&gt;100（大球性）：</strong>ビタミンB12・葉酸欠乏（巨赤芽球性貧血）、アルコール多飲。
            </td>
          </tr>
          <tr>
            <td><strong>PT-INR</strong><br>（プロトロンビン時間国際比）</td>
            <td><strong>0.9〜1.1（未内服時）</strong></td>
            <td>
              ・<strong>治療域：2.0〜3.0</strong>（70歳以上 1.6〜2.6）<br>
              ・<strong>&gt;4.0：</strong>出血超ハイリスク（休薬・Vit K検討）
            </td>
            <td>
              ・<strong>ワルファリン（ワーファリン）のモニタリング専用指標！</strong><br>
              ・納豆・クロレラ・青汁で効果激減。抗不整脈薬（アミオダロン）、抗菌薬、NSAIDs、イグラチモド（併用禁忌）でPT-INR跳ね上がり。
            </td>
          </tr>
          <tr>
            <td><strong>血小板数（PLT）</strong><br><span style="font-size:0.75rem; color:#64748b;">10⁴/μL</span></td>
            <td><strong>15〜35</strong></td>
            <td>
              ・<strong>&lt;10：</strong>出血傾向（抜歯・手術延期）<br>
              ・<strong>&lt;5：</strong>自然出血・頭蓋内出血リスク
            </td>
            <td>
              ・ヘパリン投与開始後5〜10日での50%以上の急減は<strong>「HIT（ヘパリン起因性血小板減少症）」</strong>を疑い直ちにアルガトロバンへ切替！
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</div>
`;

// src/15_lab_values.html を書き出し
fs.writeFileSync('src/15_lab_values.html', labHtml, 'utf8');
console.log('Successfully created src/15_lab_values.html');
