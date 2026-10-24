const fs = require('fs');
const path = require('path');

const guidePath = path.join(__dirname, '..', '03_guide.html');
let guideHtml = fs.readFileSync(guidePath, 'utf8');

// 1. サイドバー更新（全24大疾患 ➔ 全25大疾患）
guideHtml = guideHtml.replace(
  '<span>🌟 全24大疾患を表示</span>',
  '<span>🌟 全25大疾患を表示</span>'
);

const c24NavAnchor = '<li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard(\'c24\', this)"><span>24. 肺炎・呼吸器感染症</span><span class="guide-nav-badge">Pneumonia</span></a></li>';

const c25NavLink = `
        <li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c25', this)"><span>25. 気管支喘息・咳喘息</span><span class="guide-nav-badge">Asthma</span></a></li>`;

if (!guideHtml.includes("filterGuideCard('c25'")) {
  guideHtml = guideHtml.replace(c24NavAnchor, c24NavAnchor + c25NavLink);
}

// 2. Core 25 カード本体
const card25Html = `
  <!-- 25. 気管支喘息・咳喘息・小児喘息・COPD -->
  <div class="card" id="c25">
    <div class="card-header">
      <span class="tag">Core 25 / Asthma, Cough & Inhaler Master</span>
      <h2 class="card-title">25. 気管支喘息・咳喘息・小児喘息・COPD（吸入デバイス完全攻略）</h2>
    </div>
    <div class="catchphrase">
      🎯 一言でいうと：「吸入薬は飲んですぐ効く風邪薬ではない！『火の粉（気道炎症）を毎日消し続けるICS』と吸入デバイス手技の指導こそ薬剤師の真骨頂！」
    </div>

    <!-- 📊 ガイドライン第一選択・条件分岐アルゴリズムフローチャート -->
    <div class="algo-flow-container">
      <div class="algo-header">
        <div class="algo-title-group">
          <span class="algo-tag">Clinical Flowchart</span>
          <h3 class="algo-title">📊 25. 気管支喘息・咳喘息・小児喘息 治療アルゴリズム</h3>
        </div>
        <span class="algo-goal-badge">🎯 目標：無症状・健常人と変わらない生活 ＆ リモデリング阻止 ＆ SABA依存ゼロ</span>
      </div>
      <div class="decision-tree-grid">

        <!-- 枝1: 成人気管支喘息 -->
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［成人喘息（ステップ治療 ＆ SMART療法）］</span>
            <span class="branch-target">軽症（ステップ1〜2） vs 中等症〜重症（ステップ3〜4）</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">基本骨格（抗炎症の主役）</div>
              <div class="step-drug">ICS/LABA配合剤（レルベア / シムビコート / フルティフォーム）</div>
              <div class="step-rationale">吸入ステロイドで気道炎症を鎮火し、長時間作用性β2刺激薬で気管支を広げて呼吸を維持。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('レルベア')">レルベア</span><span class="flow-chip" onclick="quickSearch('シムビコート')">シムビコート</span><span class="flow-chip" onclick="quickSearch('アテキュラ')">アテキュラ</span></div>
            </div>
            <div class="step-arrow">➔</div>
            <div class="step-card second-choice">
              <div class="step-pill second">SMART療法（シムビコート特有）</div>
              <div class="step-drug">定時朝夕吸入 ＋ 発作時にも頓用追加（最大1日8吸入）</div>
              <div class="step-rationale">ホルモテロールの速効性を生かし、発作時にステロイドを同時に吸入して増悪の火種を瞬時に消火！</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('シムビコート')">SMART療法</span></div>
            </div>
            <div class="step-arrow">➔</div>
            <div class="step-card third-choice">
              <div class="step-pill third">難治性（3剤配合 / 抗体薬）</div>
              <div class="step-drug">ICS/LABA/LAMA（エナジア/テリルジー） ➔ 生物学的製剤</div>
              <div class="step-rationale">抗コリン薬を追加。好酸球・IgE高値ならデュピクセント、ヌーカラ、ファセンラ、テゼスパイア。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('エナジア')">エナジア</span><span class="flow-chip" onclick="quickSearch('テリルジー')">テリルジー</span><span class="flow-chip" onclick="quickSearch('デュピクセント')">デュピクセント</span></div>
            </div>
          </div>
        </div>

        <!-- 枝2: 小児気管支喘息 -->
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［小児気管支喘息（乳幼児〜学童期）］</span>
            <span class="branch-target">吸気力・年齢に応じたデバイス選択 ＆ LTRA</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">乳幼児・軽症第一選択</div>
              <div class="step-drug">LTRA（シングレア/キプレス細粒・チュアブル、オノン）</div>
              <div class="step-rationale">ロイコトリエンを阻害し気道浮腫・粘液分泌を抑制。吸入ができない乳幼児でも確実に内服可能。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('シングレア細粒')">キプレス細粒</span><span class="flow-chip" onclick="quickSearch('オノン細粒')">オノン細粒</span></div>
            </div>
            <div class="step-arrow">➔</div>
            <div class="step-card second-choice">
              <div class="step-pill second">吸入導入（pMDI＋スペーサー）</div>
              <div class="step-drug">フルタイド/オルベスコ ＋ パルミコート吸入液ネブライザー</div>
              <div class="step-rationale">小児は粉末DPIを吸い込めない！エアゾール（pMDI）にスペーサー（吸入補助具）を装着して深呼吸。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('パルミコート吸入液')">パルミコート液</span></div>
            </div>
          </div>
        </div>

        <!-- 枝3: 咳喘息 ＆ アスピリン喘息 -->
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［咳喘息（CVA） ＆ アスピリン喘息（AERD）］</span>
            <span class="branch-target">ゼーゼーしない慢性咳 vs NSAIDsによる致死的気道痙攣</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">咳喘息（CVA：乾性咳嗽持続）</div>
              <div class="step-drug">ICS/LABA（咳止め・抗生剤は無効！吸入ステロイド奏効）</div>
              <div class="step-rationale">喘鳴のない慢性咳。ICSが著効することが診断根拠。放置すると3割が喘息に移行するため継続必須。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('フルティフォーム')">フルティフォーム</span></div>
            </div>
            <div class="step-arrow">➔</div>
            <div class="step-card second-choice">
              <div class="step-pill second">アスピリン喘息（NSAIDs絶対禁忌！）</div>
              <div class="step-drug">鎮痛時はカロナール少量（&le;300mg）一択！湿布も禁忌！</div>
              <div class="step-rationale">COX-1阻害でロイコトリエンが激増し窒息発作。内服だけでなく坐薬・ロキソニンパップ等も絶対禁止！</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('カロナール')">アセトアミノフェン</span></div>
            </div>
          </div>
        </div>

      </div>
      <div class="algo-footer-pitfall">
        <strong>⚠️ 処方監査・超特級チェック：</strong>
        <span>
          ① 吸入後の「うがい2箇条（ブクブクうがい＋ガラガラうがい）」を徹底！怠ると「嗄声（声枯れ）」と「口腔カンジダ症」を起こす（うがい不可の児は水分摂取や食直前吸入）！<br>
          ② 発作止めSABA（メプチン、サルタノール）を月1本以上使い切る患者はコントロール不良の黄色信号！頻脈・不整脈および喘息死のハイリスク。<br>
          ③ 喘息患者に非選択的β遮断薬（インデラル、アーチスト等）は気管支攣縮を誘発するため禁忌！
        </span>
      </div>
    </div>

    <!-- 臨床詳細ボックス（Grid-2） -->
    <div class="grid-2">
      <div class="box">
        <h3>🧭 吸入デバイス 3大特性と選び分け</h3>
        <ul>
          <li><strong>DPI（ドライパウダー：エリプタ、ディスカス、タービュヘイラー）：</strong>
            自分の吸気力で粉を吸い込む。吸気力のある若年〜成人に最適。息を吹き込むと粉が固まるため「吸う前に息を吐き出し、吸い終わったら5秒息止め」。
          </li>
          <li><strong>pMDI（加圧定量噴霧式：フルタイド、シムビコート、メプチン）：</strong>
            ボンベを押すとガスと一緒に霧が出る。ゆっくり吸い込みながら押す。タイミングが合わない高齢者や小児には<strong>「スペーサー（エアロチャンバー等）」</strong>を必ずセットにする。
          </li>
          <li><strong>SMI（ソフトミスト：レスピマット）：</strong>
            バネの力で極めて細かい霧がゆっくり長く噴霧される。吸気力が低下した高齢者でも肺深部までしっかり届く。
          </li>
        </ul>
      </div>
      <div class="box">
        <h3>💡 COPD（慢性閉塞性肺疾患）との違いとACO</h3>
        <ul>
          <li><strong>喘息 vs COPD：</strong>
            <br>・<strong>喘息：</strong>アレルギー性（好酸球・IgE）、可逆性（気道が元に戻る）、夜間悪化 ➔ **主役は「ICS（吸入ステロイド）」**。
            <br>・<strong>COPD：</strong>喫煙による肺破壊、非可逆性、労作時息切れ ➔ **主役は「LAMA（抗コリン薬：スピリーバ等）＋LABA」**。
          </li>
          <li><strong>ACO（喘息・COPDオーバーラップ）：</strong>
            両方の特徴を併せ持つ。ICS/LABA/LAMAの3剤配合（テリルジー等）が著効する。
          </li>
        </ul>
      </div>
    </div>

    <!-- 処方箋のウラ読み -->
    <div class="offlabel">
      <h3>🕵️‍♂️ 処方箋のウラ読み（適応外・意外な処方意図・服薬指導）</h3>
      <ul>
        <li><strong>なぜモンテルカスト（シングレア/キプレス）は「寝る前」に飲むのか？：</strong>
          気管支喘息の症状や気道抵抗は、夜間から早朝（午前4〜6時頃：モーニングサージ）にかけて最も悪化する。就寝前に飲むことで、早朝の発作時間帯に血中濃度をピークに合わせるため！
        </li>
        <li><strong>咳が止まったのにICS/LABAが処方され続ける理由：</strong>
          「症状が消えても気道の奥底では火の粉（慢性アレルギー炎症）がくすぶり続けている」。ここで吸入をやめると気道の壁が分厚く硬くなり（リモデリング）、二度と元の太さに戻らなくなることを患者に納得させる。
        </li>
      </ul>
    </div>

    <!-- 先輩からの現場の勘所 -->
    <div class="pearl">
      <h3>💡 先輩からの現場の勘所（Clinical Pearls）</h3>
      <ul>
        <li><strong>「吸えているつもり」の落とし穴を暴く手技確認：</strong>
          何ヶ月も通院している患者でも「カチッと回していない」「吸入口を舌で塞いでいる」「吸った直後にハーッと息を吐いている」ケースが半数以上。薬局のデモ器を使って「目の前で1回実演してもらう」ことが最大の治療介入になる。
        </li>
      </ul>
    </div>

    <div class="question-box">
      <strong>🙋‍♂️ 実習生への問いかけ：</strong>「『咳も発作も全く出なくなったので、吸入薬（レルベア）をやめました』という喘息患者さんに、なぜ毎日続けなければならないのか、『火事のあとの火の粉とリモデリング』に例えてどう説明しますか？」
    </div>

    <div class="memo-area">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <strong style="color:#0f172a; font-size:0.92rem;">📝 実習生 症例ディスカッション＆メモ欄（印刷後手書き用）：</strong>
        <span style="font-size:0.75rem; color:#64748b; border:1px solid #cbd5e1; padding:2px 10px; border-radius:4px; background:white;">指導薬剤師 印：　　　　</span>
      </div>
      <div style="font-size:0.85rem; color:#64748b; line-height:1.5;">
        ・喘息ステップ（1〜4）・デバイス種別（DPI/pMDI/SMI）・手技評価：<br>
        ・うがい励行状況・SABA使用頻度・アスピリン喘息合併チェック：
      </div>
    </div>
  </div>
`;

// 3. 挿入位置（</div><!-- /#tab-guide --> の直前）
const targetGuideClose = '</div><!-- /#tab-guide -->';
if (!guideHtml.includes('id="c25"')) {
  guideHtml = guideHtml.replace(targetGuideClose, card25Html + '\n\n' + targetGuideClose);
  fs.writeFileSync(guidePath, guideHtml, 'utf8');
  console.log("Successfully built Core 25 (Asthma Master) in src/03_guide.html");
} else {
  console.log("Core 25 already exists in src/03_guide.html");
}
