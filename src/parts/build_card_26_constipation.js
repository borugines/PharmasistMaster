const fs = require('fs');
const path = require('path');

console.log("=== Building Card 26: 慢性便秘症・便秘治療マスター ===");

// ============================================================================
// 1. Update src/03_guide.html (Add Core 26 Card and Sidebar link)
// ============================================================================
const guidePath = path.join(__dirname, '..', '03_guide.html');
let guideHtml = fs.readFileSync(guidePath, 'utf8');

// Update sidebar in 03_guide.html
guideHtml = guideHtml.replace('🌟 全25大疾患を表示', '🌟 全26大疾患を表示');

const sidebarC25 = `<li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c25', this)"><span>25. 気管支喘息・咳喘息</span><span class="guide-nav-badge">Asthma</span></a></li>`;
const sidebarC26 = `<li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c25', this)"><span>25. 気管支喘息・咳喘息</span><span class="guide-nav-badge">Asthma</span></a></li>
        <li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c26', this)"><span>26. 慢性便秘症・便秘治療</span><span class="guide-nav-badge">Constipation</span></a></li>`;

if (guideHtml.includes(sidebarC25) && !guideHtml.includes("'c26'")) {
  guideHtml = guideHtml.replace(sidebarC25, sidebarC26);
  console.log("Updated guide-sidebar with c26 navigation item!");
}

const card26Html = `
  <!-- 26. 慢性便秘症・便秘治療マスター -->
  <div class="card" id="c26">
    <div class="card-header">
      <span class="tag">Core 26 / Gastroenterology & Bowel Motility</span>
      <h2 class="card-title">26. 慢性便秘症・便秘治療マスター（浸透圧性・大腸刺激性・上皮機能変容薬・胆汁酸阻害薬）</h2>
    </div>
    <div class="catchphrase">
      🎯 一言でいうと：「刺激性下剤（センナ・プルゼニド）の連用は大腸黒皮症＆不可逆な弛緩性便秘を招く！まずは浸透圧性薬（モビコール・酸化Mg）と新世代薬（グーフィス・リンゼス・アミティーザ）で“自然なバナナ便（ブリストル4）”をつくる！」
    </div>

    <!-- 📊 ガイドライン第一選択・条件分岐アルゴリズムフローチャート -->
    <div class="algo-flow-container">
      <div class="algo-header">
        <div class="algo-title-group">
          <span class="algo-tag">Clinical Flowchart</span>
          <h3 class="algo-title">📊 26. 慢性便秘症 病態・原因別 第一選択・条件分岐アルゴリズム</h3>
        </div>
        <span class="algo-goal-badge">🎯 目標：刺激性下剤依存からの脱却 ＆ ブリストル4（有形軟便）の自力排便維持</span>
      </div>
      <div class="decision-tree-grid">
        
        <!-- 分岐1：原発性慢性便秘症 -->
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［原発性・機能性慢性便秘症］</span>
            <span class="branch-target">大腸通過遅延型 / 大腸通過正常型（硬便・排便困難）</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">第一選択（浸透圧性下剤）</div>
              <div class="step-drug">モビコール配合内服剤 または 酸化マグネシウム</div>
              <div class="step-rationale">腸管内に水分を引き込み便を軟化。小児・腎機能低下者にはモビコールが第一選択。酸化Mgは血清Mg定期監査。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('モビコール')">モビコール</span><span class="flow-chip" onclick="quickSearch('酸化マグネシウム')">マグミット</span></div>
            </div>
            <div class="step-arrow">➔</div>
            <div class="step-card second-choice">
              <div class="step-pill second">第二選択（新世代上皮機能変容・胆汁酸薬）</div>
              <div class="step-drug">エロビキシバット（グーフィス） / リナクロチド（リンゼス） / ルビプロストン（アミティーザ）</div>
              <div class="step-rationale">浸透圧性薬で不十分な場合に併用または変更。生理的排便を促す。服薬タイミング（食前・食後）の遵守が命！</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('グーフィス')">グーフィス</span><span class="flow-chip" onclick="quickSearch('リンゼス')">リンゼス</span><span class="flow-chip" onclick="quickSearch('アミティーザ')">アミティーザ</span></div>
            </div>
            <div class="step-arrow">➔</div>
            <div class="step-card third-choice">
              <div class="step-pill third">頓用・レスキュー（大腸刺激性下剤）</div>
              <div class="step-drug">ピコスルファートNa（ラキソベロン） / センノシド（プルゼニド）</div>
              <div class="step-rationale">2〜3日排便がない時の「レスキュー頓用」に限定。連用は大腸運動麻痺（耐性）を招くため絶対禁止！</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ピコスルファート')">ラキソベロン</span><span class="flow-chip" onclick="quickSearch('センノシド')">プルゼニド</span></div>
            </div>
          </div>
        </div>

        <!-- 分岐2：オピオイド誘発性便秘症（OIC） -->
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［オピオイド誘発性便秘症（OIC）］</span>
            <span class="branch-target">がん疼痛・慢性疼痛での麻薬性鎮痛薬導入時</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">特異的治療薬（末梢性μ受容体拮抗薬）</div>
              <div class="step-drug">ナルデメジン（スインプロイク錠 0.2mg 1日1回）</div>
              <div class="step-rationale">血液脳関門（BBB）を通過せず、中枢の鎮痛効果を邪魔せずに腸管の便秘のみをピンポイント解除。オピオイド開始と同時に予防的併用。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('スインプロイク')">スインプロイク</span><span class="flow-chip" onclick="quickSearch('酸化マグネシウム')">マグミット併用</span></div>
            </div>
          </div>
        </div>

        <!-- 分岐3：便排出障害型・直腸性便秘 ＆ IBS便秘型 -->
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［直腸性便秘・便排出障害 ＆ IBS便秘型］</span>
            <span class="branch-target">出口で詰まる・いきんでも出ない / 腹痛を伴うコロコロ便</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">直腸性：炭酸ガス坐剤 / IBS便秘型：リンゼス</div>
              <div class="step-drug">新レシカルボン坐剤（直腸刺激） / リナクロチド（内臓痛覚過敏抑制）</div>
              <div class="step-rationale">直腸の伸展刺激で排便反射を再興。IBS便秘型にはGC-C受容体を介して腹痛・腹部膨満感を改善するリンゼスが第一選択。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('新レシカルボン')">新レシカルボン</span><span class="flow-chip" onclick="quickSearch('リンゼス')">リンゼス</span></div>
            </div>
          </div>
        </div>

      </div>
      <div class="algo-footer-pitfall">
        ⚠️ <strong>鑑査の落とし穴：</strong>大黄・センナ系刺激性下剤を「毎食後や毎就寝前に漫然連用」している処方は重大な処方意図チェック対象！大腸メラノーシスによる難治性便秘へ悪循環します。浸透圧性薬や新薬への切り替え提案が薬剤師の腕の見せ所！
      </div>
    </div>

    <!-- ガイドラインの型 ＆ 鑑査のポイント -->
    <div class="grid-2">
      <div class="box guideline">
        <h3>🧭 ガイドラインの「型」をざっくり（最新・慢性便秘症診療GL）</h3>
        <ul>
          <li><strong>目標は「ブリストル便性状スケール 4（バナナ状便）」：</strong>
            <br>・タイプ1（ウサギの糞状）〜タイプ2（硬いソーセージ状）は便秘。
            <br>・<strong>タイプ4（表面が滑らかなソーセージ・バナナ状の軟便）</strong>をいきまずスルッと出せる状態が治療ゴール！「毎日出なくてもタイプ4でスッキリ出れば正常」と患者に安心感を与える。
          </li>
          <li><strong>非薬物療法（生活習慣）がすべての土台：</strong>
            <br>・<strong>朝の胃結腸反射：</strong>起床時に「冷たい水・牛乳」をコップ1杯飲み、朝食を摂ることで大腸の大蠕動を誘発。
            <br>・<strong>排便姿勢（ロダンの「考える人」の姿勢）：</strong>前傾姿勢を取り、足元に15cm程度の踏み台を置くと、恥骨直腸筋が弛緩して直腸肛門角が広がり、いきまず自然に排便できる。
          </li>
          <li><strong>刺激性下剤の「脱依存・減量ステップダウン戦略」：</strong>
            <br>・連用中の患者から急に刺激性下剤を奪うと排便が止まる。
            <br>・<strong>「まずモビコールやグーフィスを基礎薬として開始 ➔ 便が軟らかくなったら刺激性下剤を隔日・週2回・頓用へと段階的に減らす」</strong>のが成功の秘訣。
          </li>
        </ul>
      </div>

      <div class="box audit">
        <h3>🔍 ここを見落とすな！処方鑑査のポイント</h3>
        <ul>
          <li><strong>酸化マグネシウムの「高マグネシウム血症」リスク（厚労省警告）：</strong>
            <br>・特に<strong>高齢者、腎機能低下（eGFR 60未満）、脱水、PPI長期併用</strong>で血中Mgが蓄積しやすい！
            <br>・初期症状（嘔気・嘔吐、血圧低下、徐脈、筋力低下、傾眠・意識障害）の確認と、<strong>年1回以上の血清Mg値測定</strong>を疑義照会・トレーシングレポートで提案。
          </li>
          <li><strong>薬剤性便秘の発見（超頻出！）：</strong>
            <br>・<strong>抗コリン作用薬：</strong>三環系抗うつ薬、第1世代抗ヒスタミン薬、過活動膀胱治療薬（ベシケア等）。
            <br>・<strong>その他：</strong>Ca拮抗薬（腸管平滑筋弛緩）、鉄剤（フェロミア）、制酸薬（アルミニウム塩）。
          </li>
          <li><strong>新薬の「服薬タイミング」鑑査（薬理学的理由を叩き込め！）：</strong>
            <br>・<strong>グーフィス（朝食前）：</strong>食事で分泌される胆汁酸を利用するため食後では効果激減！
            <br>・<strong>リンゼス（食前）：</strong>食後だとCFTR過剰活性化で激しい下痢を起こすため食前厳守！
            <br>・<strong>アミティーザ（食後）：</strong>空腹時だと高頻度で嘔気・悪心が出るため食後厳守！<strong>妊婦禁忌</strong>（流早産リスク）。
          </li>
        </ul>
      </div>
    </div>

    <!-- ⚔️ 便秘薬クラス別・新旧ガチンコ比較マトリクス表 -->
    <div style="margin-top:1.5rem; background:white; border:2px solid #0284c7; border-radius:12px; padding:1.25rem; box-shadow:0 4px 10px rgba(0,0,0,0.06); break-inside:avoid;">
      <div style="display:flex; align-items:center; justify-content:space-between; border-bottom:2px solid #0284c7; padding-bottom:0.75rem; margin-bottom:1.25rem; flex-wrap:wrap; gap:8px;">
        <h3 style="margin:0; font-size:1.2rem; color:#0f172a; display:flex; align-items:center; gap:8px;">
          <span>⚔️</span> <strong>慢性便秘症 治療薬クラス別 ガチンコ使い分けマトリクス</strong>
        </h3>
        <span style="font-size:0.75rem; background:#0284c7; color:white; padding:4px 12px; border-radius:12px; font-weight:700;">服薬タイミング ＆ 作用機序 完全攻略</span>
      </div>

      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; font-size:0.85rem; background:white; border-radius:8px; overflow:hidden; border:1px solid #cbd5e1;">
          <thead>
            <tr style="background:#0f172a; color:white; text-align:left;">
              <th style="padding:9px 10px; width:14%;">クラス・代表薬</th>
              <th style="padding:9px 10px; width:15%;">作用機序</th>
              <th style="padding:9px 10px; width:14%;">服薬タイミング</th>
              <th style="padding:9px 10px; width:22%;">主な副作用・鑑査急所</th>
              <th style="padding:9px 10px; width:35%;">なぜ医師はこの便秘薬を選んだのか？（決定打・臨床ポジショニング）</th>
            </tr>
          </thead>
          <tbody>
            <!-- モビコール -->
            <tr style="border-bottom:1px solid #e2e8f0; background:#f0f9ff;">
              <td style="padding:10px;">
                <strong style="color:#0369a1;">モビコール配合内服剤</strong><br>
                <span style="font-size:0.78rem; color:#64748b;">ポリエチレングリコール（PEG）</span>
              </td>
              <td style="padding:10px;">
                <strong>高分子浸透圧性下剤</strong><br>
                <span style="font-size:0.78rem; color:#64748b;">水分を保持して大腸まで運び便を膨大・軟化</span>
              </td>
              <td style="padding:10px;">
                <strong>食前・食後不問</strong><br>
                <span style="font-size:0.78rem; color:#0369a1; font-weight:700;">1包約60mLの水に溶解</span>
              </td>
              <td style="padding:10px;">
                下痢、腹痛、悪心。<br>
                <span style="color:#15803d; font-weight:700;">体内に吸収されないため電解質異常・高Mg血症リスクなし！</span>
              </td>
              <td style="padding:10px;">
                <span class="char" style="background:#e0f2fe; color:#0369a1; font-weight:700; padding:2px 6px; border-radius:4px; font-size:0.78rem;">国際標準 ＆ 2歳以上の小児・腎機能低下者の第一選択</span><br>
                欧米では便秘のファーストライン。酸化Mgが使えないCKD患者や高齢者、小児（2歳以上）に最も安全に長期維持できる最高峰の浸透圧薬。
              </td>
            </tr>

            <!-- 酸化マグネシウム -->
            <tr style="border-bottom:1px solid #e2e8f0;">
              <td style="padding:10px;">
                <strong style="color:#0f172a;">酸化マグネシウム</strong><br>
                <span style="font-size:0.78rem; color:#64748b;">（マグミット、カマ）</span>
              </td>
              <td style="padding:10px;">
                <strong>塩類浸透圧性下剤</strong><br>
                <span style="font-size:0.78rem; color:#64748b;">腸管内に水分を引き込み便を軟化</span>
              </td>
              <td style="padding:10px;">
                <strong>食後 または 就寝前</strong><br>
                <span style="font-size:0.78rem; color:#64748b;">多めの水で服用</span>
              </td>
              <td style="padding:10px;">
                <strong style="color:#b91c1c;">高マグネシウム血症！</strong><br>
                <span style="font-size:0.78rem; color:#64748b;">高齢者・腎機能低下者・PPI併用で蓄積。徐脈、低血圧、傾眠。</span>
              </td>
              <td style="padding:10px;">
                <span class="char" style="background:#f1f5f9; color:#475569; font-weight:700; padding:2px 6px; border-radius:4px; font-size:0.78rem;">圧倒的安価 ＆ 便を軟らかくする王道</span><br>
                硬いコロコロ便を軟化させる基本薬。ただし漫然投与せず、定期的な血清Mg値測定を必ずチェックする。
              </td>
            </tr>

            <!-- グーフィス -->
            <tr style="border-bottom:1px solid #e2e8f0; background:#f0fdf4;">
              <td style="padding:10px;">
                <strong style="color:#15803d;">グーフィス錠</strong><br>
                <span style="font-size:0.78rem; color:#64748b;">（エロビキシバット）</span>
              </td>
              <td style="padding:10px;">
                <strong>回腸IBAT阻害薬</strong><br>
                <span style="font-size:0.78rem; color:#64748b;">胆汁酸再吸収をブロックし大腸へ流入 ➔ 水分分泌＋蠕動促進</span>
              </td>
              <td style="padding:10px;">
                <strong style="color:#b91c1c;">朝食前（食前厳守！）</strong><br>
                <span style="font-size:0.78rem; color:#64748b;">食事による胆汁酸分泌を利用</span>
              </td>
              <td style="padding:10px;">
                腹痛、下痢。<br>
                ※食後服用すると効果が著しく減弱する。
              </td>
              <td style="padding:10px;">
                <span class="char" style="background:#dcfce7; color:#15803d; font-weight:700; padding:2px 6px; border-radius:4px; font-size:0.78rem;">水分分泌 ＆ 蠕動促進のデュアルアクション新薬</span><br>
                自身の胆汁酸を利用して自然な排便を促す。作用発現が早く（服用後約5時間）、刺激性下剤から離脱させたい弛緩性便秘に著効。
              </td>
            </tr>

            <!-- リンゼス -->
            <tr style="border-bottom:1px solid #e2e8f0; background:#fffbeb;">
              <td style="padding:10px;">
                <strong style="color:#d97706;">リンゼス錠</strong><br>
                <span style="font-size:0.78rem; color:#64748b;">（リナクロチド）</span>
              </td>
              <td style="padding:10px;">
                <strong>GC-C受容体作動薬</strong><br>
                <span style="font-size:0.78rem; color:#64748b;">腸液分泌促進 ＋ 大腸痛覚神経遮断による鎮痛</span>
              </td>
              <td style="padding:10px;">
                <strong style="color:#b91c1c;">食前（食前厳守！）</strong><br>
                <span style="font-size:0.78rem; color:#64748b;">食後だと激しい下痢を起こす</span>
              </td>
              <td style="padding:10px;">
                下痢（発現率高め）。<br>
                ※脱水に注意。下痢が強い場合は0.25mgへ減量。
              </td>
              <td style="padding:10px;">
                <span class="char" style="background:#fef3c7; color:#b45309; font-weight:700; padding:2px 6px; border-radius:4px; font-size:0.78rem;">IBS便秘型（腹痛を伴う便秘）の絶対的切り札</span><br>
                便を出すだけでなく、求心性神経を鎮静化して「お腹の痛み・張り」を劇的に改善する。腹痛を訴える便秘患者の第一選択。
              </td>
            </tr>

            <!-- アミティーザ -->
            <tr style="border-bottom:1px solid #e2e8f0; background:#f5f3ff;">
              <td style="padding:10px;">
                <strong style="color:#7c3aed;">アミティーザカプセル</strong><br>
                <span style="font-size:0.78rem; color:#64748b;">（ルビプロストン）</span>
              </td>
              <td style="padding:10px;">
                <strong>ClC-2クロライド開口薬</strong><br>
                <span style="font-size:0.78rem; color:#64748b;">小腸上皮から塩素イオン・水分を分泌</span>
              </td>
              <td style="padding:10px;">
                <strong style="color:#b91c1c;">食後（食直後厳守！）</strong><br>
                <span style="font-size:0.78rem; color:#64748b;">空腹時は悪心・嘔吐必発</span>
              </td>
              <td style="padding:10px;">
                悪心・嘔気、下痢。<br>
                <strong style="color:#b91c1c;">妊婦禁忌！</strong>（流早産リスク）
              </td>
              <td style="padding:10px;">
                <span class="char" style="background:#ede9fe; color:#6d28d9; font-weight:700; padding:2px 6px; border-radius:4px; font-size:0.78rem;">小腸からの水分分泌でスムーズな便通過を促す</span><br>
                腸管バリア機能を保護する作用も併せ持つ。悪心を防ぐため「必ず食事の直後に飲む」よう服薬指導することが服薬継続の分水嶺。
              </td>
            </tr>

            <!-- スインプロイク -->
            <tr style="border-bottom:1px solid #e2e8f0; background:#fef2f2;">
              <td style="padding:10px;">
                <strong style="color:#b91c1c;">スインプロイク錠</strong><br>
                <span style="font-size:0.78rem; color:#64748b;">（ナルデメジン）</span>
              </td>
              <td style="padding:10px;">
                <strong>末梢性μ受容体拮抗薬</strong><br>
                <span style="font-size:0.78rem; color:#64748b;">腸管のオピオイド受容体のみを遮断（BBB通過せず）</span>
              </td>
              <td style="padding:10px;">
                <strong>食前・食後不問</strong><br>
                <span style="font-size:0.78rem; color:#64748b;">1日1回 0.2mg</span>
              </td>
              <td style="padding:10px;">
                下痢、腹痛。<br>
                ※中枢性オピオイド退薬症候は起こさない。
              </td>
              <td style="padding:10px;">
                <span class="char" style="background:#fee2e2; color:#b91c1c; font-weight:700; padding:2px 6px; border-radius:4px; font-size:0.78rem;">オピオイド誘発性便秘症（OIC）のピンポイント特効薬</span><br>
                麻薬の鎮痛効果を1ミリも落とさず、オピオイドによる消化管蠕動停止・便秘のみを解除。麻薬導入時に先手を打って処方される。
              </td>
            </tr>

            <!-- 大腸刺激性下剤 -->
            <tr style="background:#fff7ed;">
              <td style="padding:10px;">
                <strong style="color:#c2410c;">センノシド / ラキソベロン</strong><br>
                <span style="font-size:0.78rem; color:#64748b;">プルゼニド / ピコスルファート</span>
              </td>
              <td style="padding:10px;">
                <strong>大腸刺激性下剤</strong><br>
                <span style="font-size:0.78rem; color:#64748b;">腸内細菌で分解され大腸神経叢を直接刺激し蠕動亢進</span>
              </td>
              <td style="padding:10px;">
                <strong>就寝前</strong><br>
                <span style="font-size:0.78rem; color:#64748b;">8〜10時間後に効果発現（翌朝排便）</span>
              </td>
              <td style="padding:10px;">
                <strong style="color:#b91c1c;">連用で大腸メラノーシス！</strong><br>
                <span style="font-size:0.78rem; color:#64748b;">不可逆な神経変性・耐性・弛緩性便秘の重症化。腹痛、習慣性。</span>
              </td>
              <td style="padding:10px;">
                <span class="char" style="background:#ffedd5; color:#c2410c; font-weight:700; padding:2px 6px; border-radius:4px; font-size:0.78rem;">【頓用限定！】2〜3日出ないときのレスキュー</span><br>
                強制的に排便させる力は最強だが、常用すると自力排便不能になる。「毎日飲む薬ではなく、どうしても出ない時の非常ボタン」と指導。
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 処方箋のウラ読み -->
    <div class="offlabel" style="margin-top:1.5rem;">
      <h3>🕵️‍♂️ 処方箋のウラ読み（適応外・意外な処方意図・処方の地雷）</h3>
      <ul>
        <li><strong>「ラグノスNF経口ゼリー（ラクツロース）」が1日3回毎食後で大量処方されている時：</strong>
          単なる便秘治療ではなく、<strong>「非代償性肝硬変における肝性脳症・高アンモニア血症の再発予防」</strong>を狙っている！ラクツロースが大腸で分解されて腸内pHを酸性化し、アンモニア（NH3）を排泄されやすいアンモニウムイオン（NH4+）に変えて血中への吸収をブロックしている。
        </li>
        <li><strong>「リンゼス錠」が若い女性やストレスの多い会社員に処方された時：</strong>
          「毎日便が出ない」というより、<strong>「排便前にお腹が痛くて冷や汗が出る」「コロコロ便で残便感が強くて仕事に集中できない」過敏性腸症候群便秘型（IBS-C）</strong>の痛覚神経過敏を抑えるために処方されている。
        </li>
        <li><strong>高齢者施設で「ラキソベロン液」が1本そのまま出ている時：</strong>
          錠剤が飲めない嚥下障害患者に対し、<strong>「水やお茶に10〜15滴垂らして飲ませる」「排便状況を見ながら滴数で微調整する」</strong>ための処方意図。
        </li>
      </ul>
    </div>

    <!-- 現場の勘所 -->
    <div class="pearl">
      <h3>💡 先輩からの現場の勘所（Clinical Pearls）</h3>
      <ul>
        <li><strong>「毎日出ないと不安で下剤を飲む」患者への安心トーク：</strong>
          <span class="highlight">「排便のゴールは『毎日出すこと』ではなく、『スルッと楽にバナナ1本分出ること』ですよ。2〜3日に1回でも、お腹が張らず痛まずスッキリ出れば全く問題ありません！」</span>と伝えることで、下剤の過剰乱用を食い止められます。
        </li>
        <li><strong>足台（フットスツール）の魔法：</strong>
          洋式トイレで足元に15〜20cmの踏み台を置き、上半身を35度前傾させると（ロダンの「考える人」のポーズ）、直腸を締め付けていた恥骨直腸筋が完全に緩み、<strong>いきまなくてもスルッと便が滑り出ます</strong>。高齢者の脳出血・迷走神経反射予防にも極めて効果的！
        </li>
        <li><strong>グーフィス（朝食前）とアミティーザ（食後）の飲み間違い防止：</strong>
          グーフィスは食前でないと効き目が落ち、アミティーザは空腹時だと吐き気が出ます。新薬を出す際は「ご飯を食べる前に飲むのか、食べた後に飲むのか」を薬袋に大きく赤字で明記するレベルで強調するのがプロの指導です。
        </li>
      </ul>
    </div>

    <!-- 実習生への問いかけ -->
    <div class="question-box">
      <strong>🙋‍♂️ 実習生への問いかけ：</strong>「『酸化マグネシウムを毎日6錠飲んでいるのに便が硬くて出ない』という75歳女性患者。腎機能はeGFR 45。あなたならこの処方のリスクをどう鑑査し、どんな新世代便秘薬への切り替え・併用を医師に提案する？」
    </div>

    <!-- メモ欄 -->
    <div class="memo-area">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <strong style="color:#0f172a; font-size:0.92rem;">📝 実習生 症例ディスカッション＆メモ欄（印刷後手書き用）：</strong>
        <span style="font-size:0.75rem; color:#64748b; border:1px solid #cbd5e1; padding:2px 10px; border-radius:4px; background:white;">指導薬剤師 印：　　　　</span>
      </div>
      <div style="font-size:0.85rem; color:#64748b; line-height:1.5;">
        ・担当患者の便秘型（弛緩性/直腸性/IBS/薬剤性/OIC）・ブリストル便性状：<br>
        ・下剤クラス（浸透圧/刺激性/新薬）・服薬タイミング（食前/食後）・血清Mg値：
      </div>
    </div>
  </div>
`;

// Insert Card 26 right before `</div><!-- /#tab-guide -->`
const endGuideMarker = '</div><!-- /#tab-guide -->';
const pEndGuide = guideHtml.lastIndexOf(endGuideMarker);

if (pEndGuide !== -1) {
  guideHtml = guideHtml.substring(0, pEndGuide) + card26Html + '\n\n' + guideHtml.substring(pEndGuide);
  fs.writeFileSync(guidePath, guideHtml, 'utf8');
  console.log("Successfully appended Card 26 to 03_guide.html!");
} else {
  console.error("Could not find end of tab-guide in 03_guide.html");
  process.exit(1);
}


// ============================================================================
// 2. Update src/02_hero_nav.html (Update disease counts to 26)
// ============================================================================
const heroPath = path.join(__dirname, '..', '02_hero_nav.html');
let heroHtml = fs.readFileSync(heroPath, 'utf8');

heroHtml = heroHtml.replace(/25大疾患/g, '26大疾患');
heroHtml = heroHtml.replace(/📖 25疾患ガイド/g, '📖 26疾患ガイド');

fs.writeFileSync(heroPath, heroHtml, 'utf8');
console.log("Successfully updated 02_hero_nav.html to 26 diseases!");


// ============================================================================
// 3. Update src/08_print_hub.html (Add c26 to print select dropdown)
// ============================================================================
const hubPath = path.join(__dirname, '..', '08_print_hub.html');
let hubHtml = fs.readFileSync(hubPath, 'utf8');

const optC25 = '<option value="c25">25. 気管支喘息・咳喘息</option>';
const optC26 = '<option value="c25">25. 気管支喘息・咳喘息</option>\n            <option value="c26">26. 慢性便秘症・便秘治療</option>';

if (hubHtml.includes(optC25) && !hubHtml.includes('value="c26"')) {
  hubHtml = hubHtml.replace(optC25, optC26);
  fs.writeFileSync(hubPath, hubHtml, 'utf8');
  console.log("Successfully added c26 to 08_print_hub.html dropdown!");
}


// ============================================================================
// 4. Update src/14_dictionary.html (Add constipation dictionary cards)
// ============================================================================
const dictPath = path.join(__dirname, '..', '14_dictionary.html');
let dictHtml = fs.readFileSync(dictPath, 'utf8');

const constipDictCards = `
      <!-- グーフィス錠 -->
      <div class="dict-card" data-category="gi">
        <div class="dict-card-header">
          <span class="dict-tag">便秘・IBAT阻害</span>
          <span class="dict-badge">朝食前厳守</span>
        </div>
        <h3 class="dict-card-title">グーフィス錠（エロビキシバット / 胆汁酸トランスポーター阻害薬）</h3>
        <p class="dict-card-desc">
          <strong>【作用機序】</strong>回腸末端の胆汁酸トランスポーター（IBAT）を阻害し、胆汁酸の大腸流入を促進。大腸での水分分泌促進と消化管運動促進のデュアルアクションを発揮。<br>
          <strong>【用法・服薬指導】</strong><strong>1日1回 朝食前</strong>。食事によって胆嚢から分泌される胆汁酸を利用するため、食後に飲むと効果が著しく低下する。効果発現が早く（約5時間）、刺激性下剤からの離脱に有効。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">注意：腹痛、下痢。重篤な胆道閉塞には禁忌</span>
        </div>
      </div>

      <!-- リンゼス錠 -->
      <div class="dict-card" data-category="gi">
        <div class="dict-card-header">
          <span class="dict-tag">便秘・GC-C作動</span>
          <span class="dict-badge">食前厳守</span>
        </div>
        <h3 class="dict-card-title">リンゼス錠（リナクロチド / グアニル酸シクラーゼC受容体作動薬）</h3>
        <p class="dict-card-desc">
          <strong>【作用機序】</strong>腸管上皮のGC-C受容体を刺激し細胞内cGMPを増加。CFTRを介して腸液分泌を促進するとともに、求心性痛覚神経を抑制して内臓痛を緩和。<br>
          <strong>【適応】</strong>慢性便秘症、便秘型過敏性腸症候群（IBS-C）。<br>
          <strong>【服薬指導】</strong><strong>食前服用厳守！</strong>食後服用すると激しい下痢を起こすリスクが高まる。腹痛を伴う便秘患者の第一選択。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">注意：主な副作用は下痢。下痢が強い場合は減量考慮</span>
        </div>
      </div>

      <!-- アミティーザカプセル -->
      <div class="dict-card" data-category="gi">
        <div class="dict-card-header">
          <span class="dict-tag">便秘・ClC-2開口</span>
          <span class="dict-badge">食後厳守・妊婦禁忌</span>
        </div>
        <h3 class="dict-card-title">アミティーザカプセル（ルビプロストン / クロライドチャネル開口薬）</h3>
        <p class="dict-card-desc">
          <strong>【作用機序】</strong>小腸粘膜上皮のClC-2クロライドチャネルを開口し、小腸内腔への塩素イオンおよび水分分泌を促進して便を軟化・移動をスムーズにする。<br>
          <strong>【服薬指導】</strong><strong>食後（食直後）厳守！</strong>空腹時に飲むと高頻度で悪心・嘔吐が出現する。<br>
          <strong>【重要鑑査】</strong><strong>妊婦または妊娠している可能性のある女性は禁忌！</strong>（流早産リスク）。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">注意：悪心、下痢。必ず食事直後に服用するよう指導</span>
        </div>
      </div>

      <!-- モビコール配合内服剤 -->
      <div class="dict-card" data-category="gi">
        <div class="dict-card-header">
          <span class="dict-tag">便秘・PEG浸透圧</span>
          <span class="dict-badge">小児・CKD第一選択</span>
        </div>
        <h3 class="dict-card-title">モビコール配合内服剤（ポリエチレングリコール 4000 / 電解質配合）</h3>
        <p class="dict-card-desc">
          <strong>【分類】</strong>高分子浸透圧性下剤。欧米ガイドラインのファーストライン。<br>
          <strong>【特徴】</strong>体内に吸収されず腸管内で水を抱え込んで大腸まで届ける。電解質バランスが維持されるため、<strong>高マグネシウム血症のリスクがなく、CKD・腎不全患者や高齢者、2歳以上の小児</strong>に安全に長期投与可能。<br>
          <strong>【服薬指導】</strong>1包あたり水約60mLに溶かして服用。味が苦手な場合はお茶やジュースに溶かしても可。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">適応：2歳以上の小児および成人の慢性便秘症</span>
        </div>
      </div>

      <!-- スインプロイク錠 -->
      <div class="dict-card" data-category="gi">
        <div class="dict-card-header">
          <span class="dict-tag">便秘・オピオイド拮抗</span>
          <span class="dict-badge">OIC特異的</span>
        </div>
        <h3 class="dict-card-title">スインプロイク錠（ナルデメジン / 末梢性μオピオイド受容体拮抗薬）</h3>
        <p class="dict-card-desc">
          <strong>【適応】</strong>オピオイド誘発性便秘症（OIC）。<br>
          <strong>【作用機序】</strong>消化管に存在するμオピオイド受容体に特異的拮抗。中枢（BBB）を通過しないため、オピオイドによる鎮痛効果を減弱させることなく、麻薬による腸管運動麻痺・便秘のみを解除。<br>
          <strong>【鑑査】</strong>オピオイド鎮痛薬（モルヒネ、オキシコドン、フェンタニル等）の開始・増量時に先手を打って処方される。1日1回0.2mg。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">注意：重度肝機能障害時は禁忌。下痢・腹痛に注意</span>
        </div>
      </div>

      <!-- 酸化マグネシウム（高Mg血症） -->
      <div class="dict-card" data-category="gi">
        <div class="dict-card-header">
          <span class="dict-tag">便秘・安全性警告</span>
          <span class="dict-badge">高Mg血症注意</span>
        </div>
        <h3 class="dict-card-title">酸化マグネシウムの適正使用 ＆ 高マグネシウム血症の早期発見</h3>
        <p class="dict-card-desc">
          <strong>【厚労省安全性情報】</strong>便秘症の第一選択として頻用されるが、長期・多量投与や腎機能低下患者（高齢者・CKD）で血清マグネシウムが異常上昇し、心停止や呼吸不全に至る死亡例が報告されている。<br>
          <strong>【初期症状】</strong>嘔気・嘔吐、立ちくらみ、徐脈、皮膚潮紅、筋力低下、傾眠。<br>
          <strong>【鑑査・指導】</strong>特にPPI併用患者や高齢者では定期的な血清Mg値測定を医師に促し、高リスク患者にはモビコールや新世代薬への変更を提案する。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">基準：血清Mg 正常値 1.8〜2.4 mg/dL（5.0超で緊急対応）</span>
        </div>
      </div>

      <!-- 大腸黒皮症（大腸メラノーシス） -->
      <div class="dict-card" data-category="gi">
        <div class="dict-card-header">
          <span class="dict-tag">便秘・下剤乱用</span>
          <span class="dict-badge">連用厳禁</span>
        </div>
        <h3 class="dict-card-title">大腸黒皮症（大腸メラノーシス） ＆ 大腸刺激性下剤の減量法</h3>
        <p class="dict-card-desc">
          <strong>【病態】</strong>センナ、センノシド（プルゼニド）、大黄（大黄甘草湯等）などのアントラキノン系下剤を長期連用することで、大腸粘膜上皮細胞のアポトーシスとマクロファージによる貪食により粘膜が黒褐色に変色する病態。<br>
          <strong>【不可逆性】</strong>進行すると大腸の腸管神経叢（アウエルバッハ神経叢）が変性・脱落し、腸が自力で動かなくなる「難治性弛緩性便秘（下剤無力症）」に陥る。<br>
          <strong>【対策】</strong>刺激性下剤は頓用にとどめ、浸透圧性下剤や新薬を導入しながら数ヶ月かけて漸減・中止する。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">原則：刺激性下剤は「2〜3日出ない時の非常ボタン（頓用）」</span>
        </div>
      </div>
`;

if (dictHtml.includes('id="dict-grid"')) {
  const lastGridIdx = dictHtml.lastIndexOf('</div>');
  const secondLastGridIdx = dictHtml.lastIndexOf('</div>', lastGridIdx - 1);
  dictHtml = dictHtml.substring(0, secondLastGridIdx) + constipDictCards + '\n    ' + dictHtml.substring(secondLastGridIdx);
  fs.writeFileSync(dictPath, dictHtml, 'utf8');
  console.log("Successfully added constipation cards to 14_dictionary.html!");
}


// ============================================================================
// 5. Update src/09_app.js (Add constipation drugs to DRUG_DB)
// ============================================================================
const appPath = path.join(__dirname, '..', '09_app.js');
let appJs = fs.readFileSync(appPath, 'utf8');

const newConstipDrugs = `  // 26. 慢性便秘症・消化管運動改善薬（Core 26）
  { name: "グーフィス", gen: "エロビキシバット水和物", cat: "26. 慢性便秘症（IBAT阻害薬）", char: "胆汁酸の再吸収を阻害して大腸運動と水分分泌を促す新世代薬！朝食前服用", desc: "回腸のIBATを阻害し大腸へ胆汁酸を届ける。食事刺激による胆汁酸分泌を利用するため【必ず朝食前】に服用。食後だと効果激減。刺激性下剤からの離脱に有効。", gId: "c26", cSec: "sec-gi" },
  { name: "リンゼス", gen: "リナクロチド", cat: "26. 慢性便秘症・IBS（GC-C作動薬）", char: "腸液分泌促進＋大腸痛覚神経を抑制して腹痛も改善！食前服用厳守", desc: "GC-C受容体を活性化し腸液を分泌。腹痛・腹部膨満感を抑える作用があり過敏性腸症候群（IBS）便秘型に第一選択。【必ず食前】に服用。食後だと激しい下痢を起こす。", gId: "c26", cSec: "sec-gi" },
  { name: "アミティーザ", gen: "ルビプロストン", cat: "26. 慢性便秘症（ClC-2開口薬）", char: "小腸から水分を分泌させて便を押し出す上皮機能変容薬！食後厳守・妊婦禁忌", desc: "小腸上皮のClC-2を開口し水分分泌。空腹時だと高頻度で悪心が出るため【必ず食後（食直後）】に服用。妊婦・妊娠の可能性がある女性は流早産リスクのため禁忌。", gId: "c26", cSec: "sec-gi" },
  { name: "モビコール配合内服剤", gen: "マクロゴール4000 / 塩化ナトリウム / 炭酸水素ナトリウム等", cat: "26. 慢性便秘症（浸透圧性下剤）", char: "欧米ガイドラインの第一選択！小児（2歳以上）や腎機能低下者にも安全なPEG製剤", desc: "体内に吸収されず水分を抱えて大腸へ運ぶ。電解質配合で高Mg血症リスクゼロ。CKD患者や高齢者、2歳以上の小児の第一選択。1包あたり水約60mLに溶かして服用。", gId: "c26", cSec: "sec-gi" },
  { name: "スインプロイク", gen: "ナルデメジントシル酸塩", cat: "26. 慢性便秘症（末梢性μ拮抗薬）", char: "オピオイド誘発性便秘症（OIC）のピンポイント特効薬！鎮痛作用を邪魔しない", desc: "BBBを通過せず末梢の腸管μオピオイド受容体のみを阻害。麻薬性鎮痛薬による便秘を特異的に解除。オピオイド開始・増量時に先手を打って処方される。", gId: "c26", cSec: "sec-gi" },
  { name: "新レシカルボン坐剤", gen: "炭酸水素ナトリウム / 無水リン酸二水素ナトリウム", cat: "26. 慢性便秘症（直腸刺激坐剤）", char: "直腸内で炭酸ガスを発生させて排便反射を直接呼び起こす！直腸性便秘の切り札", desc: "直腸内で炭酸ガス（CO2）を発生し、直腸壁を伸展刺激して排便反射を誘発。出口で詰まる便排出障害や習慣性便秘、術後排便に有効。挿入後15〜30分で排便。", gId: "c26", cSec: "sec-gi" },
`;

const endDbPos = appJs.indexOf('];\n\n// --- Search & UI Logic ---');
if (endDbPos !== -1) {
  appJs = appJs.substring(0, endDbPos) + newConstipDrugs + appJs.substring(endDbPos);
  fs.writeFileSync(appPath, appJs, 'utf8');
  console.log("Successfully added constipation drugs to DRUG_DB in 09_app.js!");
} else {
  console.error("Could not find end of DRUG_DB in 09_app.js");
}

console.log("=== Build Card 26 complete! ===");
