const fs = require('fs');
const path = require('path');

const guidePath = path.join(__dirname, '..', '03_guide.html');
let guideHtml = fs.readFileSync(guidePath, 'utf8');

// 1. サイドバーリンクの更新（全16大疾患 ➔ 全23大疾患）
guideHtml = guideHtml.replace(
  '<span>🌟 全16大疾患を表示</span>',
  '<span>🌟 全23大疾患を表示</span>'
);

// サイドバーに17〜23の項目を追加
const c16NavAnchor = '<li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard(\'c16\', this)"><span>16. 皮膚科・アレルギー</span><span class="guide-nav-badge">Skin</span></a></li>';

const extraNavLinks = `
        <li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c17', this)"><span>17. 高尿酸血症・痛風</span><span class="guide-nav-badge">Gout</span></a></li>
        <li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c18', this)"><span>18. 小児科頻出疾患</span><span class="guide-nav-badge">Peds</span></a></li>
        <li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c19', this)"><span>19. 貧血（鉄欠乏/腎性）</span><span class="guide-nav-badge">Anemia</span></a></li>
        <li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c20', this)"><span>20. 睡眠障害・不眠症</span><span class="guide-nav-badge">Sleep</span></a></li>
        <li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c21', this)"><span>21. ピロリ除菌・胃腸炎</span><span class="guide-nav-badge">GI-Inf</span></a></li>
        <li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c22', this)"><span>22. 不妊治療（生殖補助）</span><span class="guide-nav-badge">ART</span></a></li>
        <li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c23', this)"><span>23. 褥瘡・創傷外用療法</span><span class="guide-nav-badge">Wound</span></a></li>`;

if (!guideHtml.includes("filterGuideCard('c17'")) {
  guideHtml = guideHtml.replace(c16NavAnchor, c16NavAnchor + extraNavLinks);
}

// 2. Core 17〜23 のカード本体を作成
const newCardsHtml = `
  <!-- 17. 高尿酸血症・痛風 -->
  <div class="card" id="c17">
    <div class="card-header">
      <span class="tag">Core 17 / Hyperuricemia & Gout</span>
      <h2 class="card-title">17. 高尿酸血症・痛風</h2>
    </div>
    <div class="catchphrase">
      🎯 一言でいうと：「足親指の激痛は『尿酸結晶の火事』！発作の最中に尿酸を下げる薬を始めるのは『火に油を注ぐ』絶対禁忌だ！」
    </div>

    <!-- アルゴリズムフロー -->
    <div class="algo-flow-container">
      <div class="algo-header">
        <div class="algo-title-group">
          <span class="algo-tag">Clinical Flowchart</span>
          <h3 class="algo-title">📊 17. 高尿酸血症・痛風 第一選択・条件分岐アルゴリズム</h3>
        </div>
        <span class="algo-goal-badge">🎯 目標：痛風関節炎再発阻止 ＆ 痛風結節・結石予防（血清尿酸値 &le; 6.0 mg/dL 維持）</span>
      </div>
      <div class="decision-tree-grid">
        <!-- 枝1: 発作期 -->
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［痛風急性関節炎発作期（激痛期）］</span>
            <span class="branch-target">前駆期（ムズムズ） vs 発作極期（激痛・腫脹）</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">前駆期（発作直前）</div>
              <div class="step-drug">コルヒチン 1錠（0.5mg） 頓用</div>
              <div class="step-rationale">白血球遊走を阻止し発作成立を予防。※発作が本格化してからは無効！</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('コルヒチン')">コルヒチン</span></div>
            </div>
            <div class="step-arrow">➔</div>
            <div class="step-card second-choice">
              <div class="step-pill second">発作極期（消火療法）</div>
              <div class="step-drug">NSAIDsパルス療法（ナイキサン/ロキソニン高用量短期）</div>
              <div class="step-rationale">短期間で一気に炎症を沈静化。※新規の尿酸降下薬開始・増量は発作悪化のため絶対厳禁！</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ナイキサン')">ナイキサン</span><span class="flow-chip" onclick="quickSearch('ロキソニン')">ロキソニン</span></div>
            </div>
          </div>
        </div>

        <!-- 枝2: 慢性期 -->
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［慢性期尿酸降下療法（発作寛解2週後〜）］</span>
            <span class="branch-target">尿酸生成過剰型 / 腎機能低下 vs 尿酸排泄低下型（結石なし）</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">生成抑制薬（腎機能低下でも使用可）</div>
              <div class="step-drug">フェブキソスタット（10mg〜徐々に増量）</div>
              <div class="step-rationale">非プリン型XOR阻害薬。アロプリノールのようなHLA遺伝子重症薬疹が少なく腎機能低下でも使いやすい。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('フェブリック')">フェブリック</span><span class="flow-chip" onclick="quickSearch('ウリアデック')">ウリアデック</span></div>
            </div>
            <div class="step-arrow">➔</div>
            <div class="step-card second-choice">
              <div class="step-pill second">排泄促進薬（URAT1選択的阻害）</div>
              <div class="step-drug">ドチヌラド（ユリス） / ベンズブロマロン</div>
              <div class="step-rationale">排泄低下型に有効。※尿路結石合併例には尿酸結石が増えるため禁忌！ウラリット併用で尿アルカリ化。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ユリス')">ユリス</span><span class="flow-chip" onclick="quickSearch('ウラリット')">ウラリット</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="algo-footer-pitfall">
        <strong>⚠️ 処方監査・超重要チェック：</strong>
        <span>
          ① 痛風発作中の尿酸降下薬（フェブリック等）の新規開始・急な増量は厳禁（尿酸値急変で結晶が崩落し激化）！<br>
          ② フェブキソスタットとメルカプトプリン/アザニン（アザチオプリン）は絶対併用禁忌（代謝阻害による致死的大量骨髄抑制）！<br>
          ③ 尿酸排泄促進薬（ユリス/ユリノーム）は尿路結石患者に禁忌！
        </span>
      </div>
    </div>

    <div class="grid-2">
      <div class="box">
        <h3>🧭 ガイドラインの「型」をざっくり</h3>
        <ul>
          <li><strong>尿酸値「6.0 mg/dL以下」が治療ゴール：</strong>尿酸の体内飽和溶解度（約6.8〜7.0 mg/dL）を確実に下回り、すでに沈着した尿酸結晶を溶かして消滅させるための絶対ライン。</li>
          <li><strong>少量からゆっくり下げる（スロースタート）：</strong>フェブキソスタットなら10mg（またはアロプリノール100mg）から開始し、数ヶ月かけて段階的に目標値へ誘導する。急激に下げると発作を誘発する。</li>
        </ul>
      </div>
      <div class="box">
        <h3>🔍 尿アルカリ化薬（ウラリット）の重要性</h3>
        <ul>
          <li><strong>酸性尿（pH &lt; 5.5）は尿路結石の温床：</strong>痛風患者は酸性尿になりやすく尿酸結石ができやすい。クエン酸配合剤（ウラリット）で**「尿pH 6.2〜6.9」**を目標にアルカリ化する。</li>
          <li><strong>アルカリにしすぎ（pH &gt; 7.0）の罠：</strong>pHが7を超えると今度は「リン酸カルシウム結石」が析出するため、試験紙による定期pH測定が指導される。</li>
        </ul>
      </div>
    </div>

    <div class="offlabel">
      <h3>🕵️‍♂️ 処方箋のウラ読み（適応外・意外な処方意図）</h3>
      <ul>
        <li><strong>高血圧にロサルタン（ニューロタン）が選ばれる理由：</strong>ARBの中で唯一「URAT1阻害作用（尿酸排泄促進）」を持つため、痛風・高尿酸血症合併高血圧や、サイアザイド利尿薬による尿酸上昇を相殺する目的で好んで選択される！</li>
        <li><strong>SGLT2阻害薬（フォシーガ/ジャディアンス）の隠れた尿酸低下作用：</strong>近位尿細管でブドウ糖排泄に伴いURAT1を介して尿酸排泄を促進するため、糖尿病や心不全患者で尿酸値が1〜1.5 mg/dL程度自然に下がる。</li>
      </ul>
    </div>

    <div class="pearl">
      <h3>💡 先輩からの現場の勘所（Clinical Pearls）</h3>
      <ul>
        <li><strong>ビールだけをハイボールに変えても無駄？！：</strong>「プリン体ゼロビールだから大丈夫」と油断する患者が多いが、アルコール（エタノール）そのものが肝臓で代謝される際にATPを消費して尿酸を産生し、さらに乳酸が腎臓での尿酸排泄を邪魔する。酒の種類ではなく「エタノール総量」を減らすよう指導する。</li>
      </ul>
    </div>

    <div class="question-box">
      <strong>🙋‍♂️ 実習生への問いかけ：</strong>「足の親指が赤く腫れ上がって激痛を訴える患者さんに、医師が『痛風だから尿酸を下げるフェブリックを今すぐ飲もう』と処方したら、あなたはどう疑義照会しますか？その理由を病態生理から説明できる？」
    </div>

    <div class="memo-area">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <strong style="color:#0f172a; font-size:0.92rem;">📝 実習生 症例ディスカッション＆メモ欄（印刷後手書き用）：</strong>
        <span style="font-size:0.75rem; color:#64748b; border:1px solid #cbd5e1; padding:2px 10px; border-radius:4px; background:white;">指導薬剤師 印：　　　　</span>
      </div>
      <div style="font-size:0.85rem; color:#64748b; line-height:1.5;">
        ・血清尿酸値・発作歴・痛風結節・尿路結石合併の有無：<br>
        ・尿酸降下薬の開始時期（スロースタート）・尿pH管理状況：
      </div>
    </div>
  </div>

  <!-- 18. 小児科頻出疾患・調剤監査 -->
  <div class="card" id="c18">
    <div class="card-header">
      <span class="tag">Core 18 / Pediatrics & Infant Care</span>
      <h2 class="card-title">18. 小児科頻出疾患・調剤監査</h2>
    </div>
    <div class="catchphrase">
      🎯 一言でいうと：「子どもは『小さな大人』ではない！体重換算（mg/kg）の厳格監査と『飲ませ方の知恵』が薬局の命綱！」
    </div>

    <div class="algo-flow-container">
      <div class="algo-header">
        <div class="algo-title-group">
          <span class="algo-tag">Clinical Flowchart</span>
          <h3 class="algo-title">📊 18. 小児科頻出病態・緊急対応アルゴリズム</h3>
        </div>
        <span class="algo-goal-badge">🎯 目標：適正体重換算用量監査 ＆ ライ症候群・痙攣重積の完全回避 ＆ 服薬成功</span>
      </div>
      <div class="decision-tree-grid">
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［小児発熱・疼痛管理］</span>
            <span class="branch-target">38.5℃以上の有熱・不機嫌・経口摂取不良時</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">第一選択（唯一の安全薬）</div>
              <div class="step-drug">アセトアミノフェン（10〜15 mg/kg/回）細粒/坐薬</div>
              <div class="step-rationale">小児解熱鎮痛の絶対的ゴールドスタンダード。※アスピリン・NSAIDsはライ症候群リスクで禁忌！</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('アンヒバ')">アンヒバ坐薬</span><span class="flow-chip" onclick="quickSearch('カロナール細粒')">カロナール細粒</span></div>
            </div>
          </div>
        </div>

        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［熱性けいれん予防管理］</span>
            <span class="branch-target">けいれん既往児の発熱初期（37.5℃以上）</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">1回目投与（発熱初期）</div>
              <div class="step-drug">ダイアップ坐薬（ジアゼパム 0.4〜0.5 mg/kg）</div>
              <div class="step-rationale">発熱初期に速やかに挿入。8時間後に発熱が続いていれば同量を2回目投与（計2回で終了）。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ダイアップ')">ダイアップ坐薬</span></div>
            </div>
            <div class="step-arrow">➔</div>
            <div class="step-card second-choice">
              <div class="step-pill second">解熱坐薬（アンヒバ）との併用順序</div>
              <div class="step-drug">必ず「ダイアップ先」で最低30分以上あけてアンヒバ！</div>
              <div class="step-rationale">油性基剤（ダイアップ）と水溶性基剤（アンヒバ）の混ざりによる吸収遅延を防止。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('アンヒバ')">時間差投与</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="algo-footer-pitfall">
        <strong>⚠️ 処方監査・超重要チェック：</strong>
        <span>
          ① 小児のインフルエンザ・水痘・ウイルス感染時のNSAIDs（ロキソニン・アスピリン・ボルタレン等）は「ライ症候群（急性脳症）」を起こすため絶対禁忌！アセトアミノフェン一択。<br>
          ② クラリス等マクロライド系細粒を酸性飲料（ジュース・ヨーグルト）に混ぜるとコーティングが溶けて猛烈な苦味になり服薬不能になる！アイスやプリンに混ぜる。
        </span>
      </div>
    </div>

    <div class="grid-2">
      <div class="box">
        <h3>🧭 体重換算監査の鉄則（mg/kg/日）</h3>
        <ul>
          <li><strong>大人用量を超えていないか？：</strong>体重換算で計算した結果が成人常用量（上限）を超えてしまうことがある（特に体格のいい学童期）。必ず成人量を上限キャップとする。</li>
          <li><strong>力価と製剤量の混同厳禁：</strong>「アモキシシリン細粒（10%製剤）」で成分量30mg/kgなのか、製剤量なのかを徹底確認。10倍過量投与事故の最頻出ポイント！</li>
        </ul>
      </div>
      <div class="box">
        <h3>💊 ドライシロップ（DS）の飲ませ方テクニック</h3>
        <ul>
          <li><strong>混ぜて良いもの vs ダメなもの：</strong>
            <br>・<strong>推奨：</strong>チョコアイス、ココア、バニラアイス、プリン、練乳。
            <br>・<strong>厳禁（苦味爆発）：</strong>オレンジジュース、リンゴジュース、スポーツドリンク、ヨーグルト（酸性度でコーティングが壊れる）。
          </li>
          <li><strong>作り置きは禁止：</strong>飲む直前に混ぜる。時間が経つとコーティングが溶け出す。</li>
        </ul>
      </div>
    </div>

    <div class="offlabel">
      <h3>🕵️‍♂️ 処方箋のウラ読み（適応外・意外な処方意図）</h3>
      <ul>
        <li><strong>生後6ヶ月〜乳幼児にデカドロンエリキシル（デキサメタゾン）：</strong>「オットセイの鳴き声のような咳（犬吠様咳嗽）」を伴う<strong>クループ症候群（急性喉頭気管気管支炎）</strong>のレスキュー！喉の急激な狭窄・窒息を防ぐため単回内服される救急処方。</li>
      </ul>
    </div>

    <div class="pearl">
      <h3>💡 先輩からの現場の勘所（Clinical Pearls）</h3>
      <ul>
        <li><strong>坐薬が出た時の生活指導：</strong>「坐薬を入れた後、15分以内につるんとそのまま出てきたら新しいものを入れ直す。30分以上経ってから溶けて出てきたものはすでに吸収されているので追加しない！」と母親に伝えておくと深夜の救急電話を防げる。</li>
      </ul>
    </div>

    <div class="question-box">
      <strong>🙋‍♂️ 実習生への問いかけ：</strong>「『熱性けいれん予防のダイアップ坐薬と、熱冷ましのアンヒバ坐薬が両方出ました。どちらからどうやって使えばいいですか？』とお母さんに聞かれたら、基剤の性質を含めてどう説明する？」
    </div>

    <div class="memo-area">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <strong style="color:#0f172a; font-size:0.92rem;">📝 実習生 症例ディスカッション＆メモ欄（印刷後手書き用）：</strong>
        <span style="font-size:0.75rem; color:#64748b; border:1px solid #cbd5e1; padding:2px 10px; border-radius:4px; background:white;">指導薬剤師 印：　　　　</span>
      </div>
      <div style="font-size:0.85rem; color:#64748b; line-height:1.5;">
        ・患者の月齢・体重・換算用量監査（成人量キャップの確認）：<br>
        ・散剤・シロップの服薬アドヒアランス指導・味マスキング提案：
      </div>
    </div>
  </div>

  <!-- 19. 貧血（鉄欠乏性・大球性・腎性） -->
  <div class="card" id="c19">
    <div class="card-header">
      <span class="tag">Core 19 / Hematology & Anemia</span>
      <h2 class="card-title">19. 貧血（鉄欠乏性・大球性・腎性）</h2>
    </div>
    <div class="catchphrase">
      🎯 一言でいうと：「ヘモグロビンだけ見るな！MCVで『原因（赤血球のサイズ）』を突き止め、鉄剤のキレート地雷を回避せよ！」
    </div>

    <div class="algo-flow-container">
      <div class="algo-header">
        <div class="algo-title-group">
          <span class="algo-tag">Clinical Flowchart</span>
          <h3 class="algo-title">📊 19. 貧血 MCV別鑑別 ＆ 第一選択アルゴリズム</h3>
        </div>
        <span class="algo-goal-badge">🎯 目標：Hb正常化（男&ge;13 / 女&ge;12） ＆ フェリチン貯蔵鉄充足 ＆ 薬剤性見逃しゼロ</span>
      </div>
      <div class="decision-tree-grid">
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［小球性低色素性（MCV &lt; 80 fl）］</span>
            <span class="branch-target">鉄欠乏性貧血（月経・消化管出血・フェリチン低下）</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">第一選択（経口鉄剤）</div>
              <div class="step-drug">クエン酸第一鉄Na（フェロミア） / 溶性ピロリン酸（フェルム）</div>
              <div class="step-rationale">Hb改善後も貯蔵鉄（フェリチン）が満ちるまで2〜3ヶ月継続。胃腸障害時は食後やフェルム徐放へ。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('フェロミア')">フェロミア</span><span class="flow-chip" onclick="quickSearch('フェルム')">フェルム</span></div>
            </div>
          </div>
        </div>

        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［大球性正色素性（MCV &gt; 100 fl）］</span>
            <span class="branch-target">巨赤芽球性貧血（Vit B12 / 葉酸欠乏 / メトホルミン起因）</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">第一選択（補充療法）</div>
              <div class="step-drug">メコバラミン（メチコバール） / 葉酸（フォリアミン）</div>
              <div class="step-rationale">胃切除後やメトホルミン長期投与の吸収不全をウラ読み。末梢神経障害・しびれを伴う。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('メチコバール')">メチコバール</span><span class="flow-chip" onclick="quickSearch('フォリアミン')">フォリアミン</span></div>
            </div>
          </div>
        </div>

        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［正球性（MCV 80〜100 fl）］</span>
            <span class="branch-target">腎性貧血（CKDによるエリスロポエチン産生低下）</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">新世代経口治療（HIF-PH阻害薬）</div>
              <div class="step-drug">エナロデュスタット（エナロイ） / ダプロデュスタット等</div>
              <div class="step-rationale">内因性エリスロポエチン産生と鉄利用を同時促進。注射（ESA）から経口への切り替えが進む。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('エナロイ')">エナロイ</span><span class="flow-chip" onclick="quickSearch('ネスプ')">ネスプ注</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="algo-footer-pitfall">
        <strong>⚠️ 処方監査・超重要チェック：</strong>
        <span>
          ① 鉄剤（フェロミア等）とチラーヂン（レボチロキシン）、ニューキノロン、テトラサイクリンはキレートを形成し吸収不能になる！最低2時間以上間隔をあける。<br>
          ② 便が真っ黒になるのは鉄の酸化による無害な反応（事前に伝えないと消化管出血と勘違いしてパニックになる）！
        </span>
      </div>
    </div>

    <div class="grid-2">
      <div class="box">
        <h3>🧭 鉄剤の服薬指導テクニック</h3>
        <ul>
          <li><strong>悪心・胃部不快感への対策：</strong>「空腹時の方が吸収は良いが、胃がもたれるなら迷わず食後すぐに飲んでOK」。1日1回就寝前のカプセル（フェルム）への変更提案も有効。</li>
          <li><strong>緑茶・お茶の制限は不要：</strong>昔は「お茶のタンニンが鉄を阻害するから水で飲め」と指導されたが、現在の製剤は十分な鉄量が含まれており、一般的なお茶での影響は軽微。水分制限よりアドヒアランス優先。</li>
        </ul>
      </div>
      <div class="box">
        <h3>🕵️‍♂️ 薬剤性貧血の見逃しを防ぐウラ読み</h3>
        <ul>
          <li><strong>メトホルミンと大球性貧血：</strong>メトホルミンを数年以上飲んでいる糖尿病患者の「足のしびれ・ふらつき」は糖尿病性神経障害だけでなく<strong>Vit B12欠乏性貧血</strong>の可能性を疑え！</li>
          <li><strong>PPI長期連用と鉄吸収低下：</strong>胃酸分泌抑制により非ヘム鉄の還元が阻害され、鉄吸収が低下する。</li>
        </ul>
      </div>
    </div>

    <div class="question-box">
      <strong>🙋‍♂️ 実習生への問いかけ：</strong>「鉄欠乏性貧血の患者さんが『採血でヘモグロビンが正常に戻ったから鉄剤をもうやめていいですか？』と聞いてきました。なぜあと2〜3ヶ月飲み続けなければならないのか、『財布のお金と銀行の預金』に例えて説明できる？」
    </div>

    <div class="memo-area">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <strong style="color:#0f172a; font-size:0.92rem;">📝 実習生 症例ディスカッション＆メモ欄（印刷後手書き用）：</strong>
        <span style="font-size:0.75rem; color:#64748b; border:1px solid #cbd5e1; padding:2px 10px; border-radius:4px; background:white;">指導薬剤師 印：　　　　</span>
      </div>
      <div style="font-size:0.85rem; color:#64748b; line-height:1.5;">
        ・Hb、MCV、血清フェリチン値・原因疾患の鑑別：<br>
        ・キレート相互作用薬の併用チェック・胃腸障害対策：
      </div>
    </div>
  </div>

  <!-- 20. 睡眠障害・不眠症 -->
  <div class="card" id="c20">
    <div class="card-header">
      <span class="tag">Core 20 / Sleep Medicine & Insomnia</span>
      <h2 class="card-title">20. 睡眠障害・不眠症マスター</h2>
    </div>
    <div class="catchphrase">
      🎯 一言でいうと：「無理やり脳を気絶させる時代は終わった！『覚醒のスイッチをOFFにする』新薬を病型に合わせて使いこなせ！」
    </div>

    <div class="algo-flow-container">
      <div class="algo-header">
        <div class="algo-title-group">
          <span class="algo-tag">Clinical Flowchart</span>
          <h3 class="algo-title">📊 20. 不眠症 病型別第一選択アルゴリズム</h3>
        </div>
        <span class="algo-goal-badge">🎯 目標：依存・転倒のない自然な睡眠 ＆ ベンゾジアゼピン減量・離脱</span>
      </div>
      <div class="decision-tree-grid">
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［入眠困難（寝つきが悪い）］</span>
            <span class="branch-target">ベッドに入っても30分以上眠れない</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">第一選択（依存なし・安全）</div>
              <div class="step-drug">デエビゴ（レンボレキサント 2.5〜5mg）</div>
              <div class="step-rationale">オレキシン受容体拮抗薬。入眠潜時を速やかに短縮。筋弛緩・転倒リスクが極めて低い。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('デエビゴ')">デエビゴ</span><span class="flow-chip" onclick="quickSearch('ルネスタ')">ルネスタ</span></div>
            </div>
          </div>
        </div>

        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［中途覚醒・早朝覚醒］</span>
            <span class="branch-target">夜中・早朝に目が覚めて再入眠できない（高齢者に好発）</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">第一選択（睡眠維持改善）</div>
              <div class="step-drug">ベルソムラ / クービビック / デエビゴ（高用量）</div>
              <div class="step-rationale">覚醒維持物質オレキシンをブロックして朝まで睡眠を保つ。※ベルソムラはCYP3A4阻害薬併用禁忌！</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ベルソムラ')">ベルソムラ</span><span class="flow-chip" onclick="quickSearch('クービビック')">クービビック</span></div>
            </div>
          </div>
        </div>

        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［体内時計の乱れ・高齢者］</span>
            <span class="branch-target">昼夜逆転・概日リズム不眠・軽度不眠</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">メラトニン受容体作動薬</div>
              <div class="step-drug">ロゼレム（ラメルテオン 8mg）</div>
              <div class="step-rationale">自然な眠気を促す。※ルボックス/デプロメール（フルボキサミン）とは代謝阻害で絶対併用禁忌！</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ロゼレム')">ロゼレム</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="algo-footer-pitfall">
        <strong>⚠️ 処方監査・超重要チェック：</strong>
        <span>
          ① ロゼレムとフルボキサミン（抗うつ薬）は血中濃度が数十倍に跳ね上がるため「絶対併用禁忌」！<br>
          ② ベルソムラとクラリスロマイシン・イトラコナゾールなど強力なCYP3A阻害薬は「併用禁忌」！<br>
          ③ デエビゴ飲み始めの「鮮明な悪夢」「金縛り（睡眠麻痺）」は事前に説明しておかないと患者が恐怖で自己中断する！
        </span>
      </div>
    </div>

    <div class="grid-2">
      <div class="box">
        <h3>🧭 脱ベンゾジアゼピンの処方提案</h3>
        <ul>
          <li><strong>高齢者のふらつき・夜間せん妄を防ぐ：</strong>ハルシオン、マイスリー、サイレース等のGABA作動薬は筋弛緩作用により夜間トイレ時の転倒骨折・骨折寝たきりの最大原因。オレキシン拮抗薬（デエビゴ）への置換を提案せよ。</li>
          <li><strong>急な断薬による「反跳性不眠」の防止：</strong>ベンゾを急に止めると激しい不眠・不安が出るため、数週間かけて漸減しながら新薬を被せる（クロスオーバー）。</li>
        </ul>
      </div>
      <div class="box">
        <h3>💡 睡眠衛生指導（生活改善が最強の処方箋）</h3>
        <ul>
          <li><strong>「眠くなってからベッドに入る」：</strong>眠れないのに何時間もベッドにいると「布団＝眠れない苦しい場所」と脳が学習してしまう（条件づけ不眠）。一旦ベッドを出て薄暗い部屋で過ごす。</li>
          <li><strong>朝起きたら太陽の光を浴びる：</strong>メラトニン分泌タイマーは朝の光を浴びてから約14〜16時間後に作動する。</li>
        </ul>
      </div>
    </div>

    <div class="question-box">
      <strong>🙋‍♂️ 実習生への問いかけ：</strong>「『デエビゴを飲んだらものすごくリアルな怖い夢を見て飛び起きた』と訴える患者さんに、作用機序（レム睡眠への影響）を踏まえてどう説明し、安心させますか？」
    </div>

    <div class="memo-area">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <strong style="color:#0f172a; font-size:0.92rem;">📝 実習生 症例ディスカッション＆メモ欄（印刷後手書き用）：</strong>
        <span style="font-size:0.75rem; color:#64748b; border:1px solid #cbd5e1; padding:2px 10px; border-radius:4px; background:white;">指導薬剤師 印：　　　　</span>
      </div>
      <div style="font-size:0.85rem; color:#64748b; line-height:1.5;">
        ・不眠のタイプ（入眠/中途/早朝/熟眠障害）・併用薬禁忌チェック：<br>
        ・ベンゾ系からの減量離脱計画・悪夢/持ち越し眠気モニタリング：
      </div>
    </div>
  </div>

  <!-- 21. ピロリ菌除菌 ＆ 急性胃腸炎 -->
  <div class="card" id="c21">
    <div class="card-header">
      <span class="tag">Core 21 / Gastroenterology & Infection</span>
      <h2 class="card-title">21. ピロリ菌除菌 ＆ 急性胃腸炎</h2>
    </div>
    <div class="catchphrase">
      🎯 一言でいうと：「一次除菌は胃内pH保持が成否のすべて！二次除菌フラジールの『絶対禁酒』を守らせるのが薬剤師の使命だ！」
    </div>

    <div class="algo-flow-container">
      <div class="algo-header">
        <div class="algo-title-group">
          <span class="algo-tag">Clinical Flowchart</span>
          <h3 class="algo-title">📊 21. ピロリ除菌 ＆ 急性胃腸炎 治療アルゴリズム</h3>
        </div>
        <span class="algo-goal-badge">🎯 目標：一次除菌成功率>90% ＆ 二次除菌ジスルフィラム反応防止 ＆ 脱水回避</span>
      </div>
      <div class="decision-tree-grid">
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［ヘリコバクター・ピロリ 一次除菌（7日間）］</span>
            <span class="branch-target">内視鏡胃炎・胃潰瘍・十二指腸潰瘍・MALTリンパ腫</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">第一選択（P-CABパック製剤）</div>
              <div class="step-drug">ボノサップパック（タケキャブ ＋ アモキシシリン ＋ クラリス）</div>
              <div class="step-rationale">P-CAB（ボノプラザン）により胃酸を強力に止めpH&gt;6を維持してアモキシシリンの失活を防ぐ。朝夕食後7日間。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ボノサップ')">ボノサップパック</span><span class="flow-chip" onclick="quickSearch('タケキャブ')">タケキャブ</span></div>
            </div>
          </div>
        </div>

        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［一次除菌失敗例 ➔ 二次除菌（7日間）］</span>
            <span class="branch-target">呼気試験陽性持続（クラリス耐性菌等）</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">第二選択（メトロニダゾール変更）</div>
              <div class="step-drug">ボノピオンパック（タケキャブ ＋ アモキシシリン ＋ フラジール）</div>
              <div class="step-rationale">クラリス耐性を克服。※メトロニダゾール服用中・終了後3日間はアルコール絶対禁忌！</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ボノピオン')">ボノピオンパック</span><span class="flow-chip" onclick="quickSearch('フラジール')">フラジール</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="algo-footer-pitfall">
        <strong>⚠️ 処方監査・超重要チェック：</strong>
        <span>
          ① 二次除菌（ボノピオン/メトロニダゾール）中の飲酒はジスルフィラム様反応（アセトアルデヒド蓄積）で激烈な悪心・嘔吐・動悸・ショックを起こすため「絶対禁酒」！<br>
          ② ペニシリンアレルギー患者にサワシリン配合パックは禁忌（アナフィラキシー危険）！<br>
          ③ 急性感染性胃腸炎にロペミン（強力止瀉薬）を出すと毒素排泄が止まり悪化するため原則禁忌！経口補水（OS-1）を指導。
        </span>
      </div>
    </div>

    <div class="grid-2">
      <div class="box">
        <h3>🧭 除菌成功率を跳ね上げる服薬指導</h3>
        <ul>
          <li><strong>7日間絶対に飲み切る：</strong>「下痢や味覚異常（苦味）が多少出ても、自己中断すると耐性菌を作って二度と効かなくなる」と念押しする。</li>
          <li><strong>判定検査は「除菌終了後4週以上」あける：</strong>早く検査しすぎると偽陰性になる。除菌判定まではPPIや抗生剤の内服を避ける。</li>
        </ul>
      </div>
      <div class="box">
        <h3>🚑 急性胃腸炎の脱水マネジメント</h3>
        <ul>
          <li><strong>下痢止めではなく整腸剤と水：</strong>ビオスリーやミヤBMを使い、脱水予防にはスポーツドリンク（糖分過多で浸透圧下痢を招く）ではなく「経口補水液（OS-1）」を一口ずつ頻回摂取させる。</li>
        </ul>
      </div>
    </div>

    <div class="question-box">
      <strong>🙋‍♂️ 実習生への問いかけ：</strong>「ピロリ二次除菌（ボノピオン）を処方された患者さんが『会社の接待で乾杯のビール1杯くらいなら飲んでもいいですよね？』と聞いてきました。あなたはどう答えますか？身体の中で何が起きるか説明できる？」
    </div>

    <div class="memo-area">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <strong style="color:#0f172a; font-size:0.92rem;">📝 実習生 症例ディスカッション＆メモ欄（印刷後手書き用）：</strong>
        <span style="font-size:0.75rem; color:#64748b; border:1px solid #cbd5e1; padding:2px 10px; border-radius:4px; background:white;">指導薬剤師 印：　　　　</span>
      </div>
      <div style="font-size:0.85rem; color:#64748b; line-height:1.5;">
        ・ペニシリンアレルギー有無・一次/二次レジメン確認：<br>
        ・禁酒指導・軟便下痢味覚異常の事前予告・除菌判定日程：
      </div>
    </div>
  </div>

  <!-- 22. 不妊治療・生殖補助医療（ART） -->
  <div class="card" id="c22">
    <div class="card-header">
      <span class="tag">Core 22 / Fertility & Reproductive Medicine</span>
      <h2 class="card-title">22. 不妊治療・生殖補助医療（ART）</h2>
    </div>
    <div class="catchphrase">
      🎯 一言でいうと：「2022年保険適用で薬局に急増！正確な投与時間指定と自己注射・血栓症リスク管理が命を育む！」
    </div>

    <div class="algo-flow-container">
      <div class="algo-header">
        <div class="algo-title-group">
          <span class="algo-tag">Clinical Flowchart</span>
          <h3 class="algo-title">📊 22. 一般不妊〜生殖補助医療（ART）治療アルゴリズム</h3>
        </div>
        <span class="algo-goal-badge">🎯 目標：安全な排卵誘発 ＆ 着床環境維持 ＆ OHSS（卵巣過剰刺激症候群）・血栓症の完全予防</span>
      </div>
      <div class="decision-tree-grid">
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［排卵誘発・卵胞発育］</span>
            <span class="branch-target">タイミング指導・人工授精（AIH）〜調節卵巣刺激（IVF）</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">経口排卵誘発薬</div>
              <div class="step-drug">レトロゾール（フェマーラ） / クロミフェン（クロミッド）</div>
              <div class="step-rationale">レトロゾールは内膜が薄くなりにくく多胎率も低い。月経3〜5日目から5日間内服。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('レトロゾール')">レトロゾール</span><span class="flow-chip" onclick="quickSearch('クロミッド')">クロミッド</span></div>
            </div>
            <div class="step-arrow">➔</div>
            <div class="step-card second-choice">
              <div class="step-pill second">rFSH自己注射ペン</div>
              <div class="step-drug">ゴナールエフ皮下注ペン / レコベル</div>
              <div class="step-rationale">卵胞を複数発育させる。冷所保存・針廃棄・投与量ダイヤル設定の指導が必須。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ゴナールエフ')">ゴナールエフ</span></div>
            </div>
          </div>
        </div>

        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［黄体補充療法（LPS）］</span>
            <span class="branch-target">新鮮胚/凍結融解胚移植後〜妊娠初期維持</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">プロゲステロン腟用製剤</div>
              <div class="step-drug">ウトロゲスタン（1回1Cap 1日3回） / ルティナス腟錠</div>
              <div class="step-rationale">子宮局所に直接プロゲステロンを高濃度送達。時間間隔（約8時間毎）厳守。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ウトロゲスタン')">ウトロゲスタン</span><span class="flow-chip" onclick="quickSearch('ルティナス')">ルティナス</span><span class="flow-chip" onclick="quickSearch('デュファストン')">デュファストン</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="algo-footer-pitfall">
        <strong>⚠️ 処方監査・超重要チェック：</strong>
        <span>
          ① 黄体ホルモン腟用製剤（ウトロゲスタン等）は「指定された時間・回数を絶対に忘れない」こと（血中濃度低下で内膜が剥離し流産リスク）！<br>
          ② 卵巣過剰刺激症候群（OHSS）：急激な下腹部痛・腹部膨満・尿量減少・息切れは命に関わるため即受診指示！<br>
          ③ エストロゲン製剤併用時の深部静脈血栓症（ふくらはぎの痛み・むくみ）モニタリング。
        </span>
      </div>
    </div>

    <div class="grid-2">
      <div class="box">
        <h3>🧭 腟用カプセルの服薬指導ポイント</h3>
        <ul>
          <li><strong>「決して口から飲まない」：</strong>カプセル剤の見た目をしているため、経口薬と誤認して飲み込む事故が多発！「腟に入れるお薬です」と明確に指導する。</li>
          <li><strong>オリモノシートの併用：</strong>体温でカプセル基剤が溶けて白いカスや液体が出てくるが、成分は吸収されているので問題ない。パンティライナー等の使用を勧める。</li>
        </ul>
      </div>
      <div class="box">
        <h3>💉 自己注射ペンの安全管理</h3>
        <ul>
          <li><strong>保管温度の確認：</strong>使用前は冷蔵庫（2〜8℃）、凍結厳禁。使用開始後は室温保存可能な製剤が多いが使用期限に注意。</li>
          <li><strong>使用済み注射針の回収：</strong>一般ゴミに捨てると針刺し事故になる。薬局専用の廃棄ボトル等で回収する。</li>
        </ul>
      </div>
    </div>

    <div class="question-box">
      <strong>🙋‍♂️ 実習生への問いかけ：</strong>「不妊治療でウトロゲスタン腟用カプセルを受け取りに来た患者さんに、飲み薬と間違えないよう、また時間指定の重要性をどう配慮深く指導しますか？」
    </div>

    <div class="memo-area">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <strong style="color:#0f172a; font-size:0.92rem;">📝 実習生 症例ディスカッション＆メモ欄（印刷後手書き用）：</strong>
        <span style="font-size:0.75rem; color:#64748b; border:1px solid #cbd5e1; padding:2px 10px; border-radius:4px; background:white;">指導薬剤師 印：　　　　</span>
      </div>
      <div style="font-size:0.85rem; color:#64748b; line-height:1.5;">
        ・治療周期（タイミング/採卵/胚移植）・投与タイミング監査：<br>
        ・自己注射手技確認・OHSS/血栓症初期症状モニタリング：
      </div>
    </div>
  </div>

  <!-- 23. 褥瘡・創傷外用療法 -->
  <div class="card" id="c23">
    <div class="card-header">
      <span class="tag">Core 23 / Pressure Ulcers & Wound Care</span>
      <h2 class="card-title">23. 褥瘡・難治性創傷外用療法</h2>
    </div>
    <div class="catchphrase">
      🎯 一言でいうと：「褥瘡の薬は『色』と『湿り気』で選ぶ！乾燥した傷に吸水剤、ジュクジュク創にワセリンは最悪の誤用だ！」
    </div>

    <div class="algo-flow-container">
      <div class="algo-header">
        <div class="algo-title-group">
          <span class="algo-tag">Clinical Flowchart</span>
          <h3 class="algo-title">📊 23. DESIGN-R分類・創状態別 外用薬選択アルゴリズム</h3>
        </div>
        <span class="algo-goal-badge">🎯 目標：壊死組織除去 ＆ 滲出液コントロール ＆ 良性肉芽形成 ＆ 上皮化完了</span>
      </div>
      <div class="decision-tree-grid">
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［黒色期（Black）〜黄色期（Yellow）］</span>
            <span class="branch-target">壊死組織固着 ＆ 感染・多量浸出液</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">黒色期（壊死組織軟化・感染対策）</div>
              <div class="step-drug">ゲーベン軟膏（スルファジアジン銀） / ブロメライン</div>
              <div class="step-rationale">銀イオンで殺菌しつつ硬い壊死組織をふやかして切除しやすくする。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ゲーベン')">ゲーベン軟膏</span><span class="flow-chip" onclick="quickSearch('ブロメライン')">ブロメライン</span></div>
            </div>
            <div class="step-arrow">➔</div>
            <div class="step-card second-choice">
              <div class="step-pill second">黄色期（吸水・殺菌・デブリードマン）</div>
              <div class="step-drug">カデックス（ヨウ素吸水） / ユーパスタ（白糖・ヨード）</div>
              <div class="step-rationale">多量の浸出液を強力に吸い取り、感染を抑えて不良肉芽を一掃する。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('カデックス')">カデックス軟膏</span><span class="flow-chip" onclick="quickSearch('ユーパスタ')">ユーパスタコーワ</span></div>
            </div>
          </div>
        </div>

        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［赤色期（Red）〜白色期（White）］</span>
            <span class="branch-target">良性肉芽形成期 ＆ 上皮化完了期（創縮小）</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">赤色期（肉芽形成・血流促進）</div>
              <div class="step-drug">プロスタンディン軟膏（PGE1） / オルセノン / フィブラスト</div>
              <div class="step-rationale">局所血流を促進し毛細血管と肉芽を増殖。適度な湿潤環境を維持。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('プロスタンディン')">プロスタンディン</span><span class="flow-chip" onclick="quickSearch('オルセノン')">オルセノン</span><span class="flow-chip" onclick="quickSearch('フィブラスト')">フィブラスト</span></div>
            </div>
            <div class="step-arrow">➔</div>
            <div class="step-card second-choice">
              <div class="step-pill second">白色期（上皮化・創閉鎖）</div>
              <div class="step-drug">アクトシン軟膏（ブクラデシンNa） / アズノール</div>
              <div class="step-rationale">表皮細胞の遊走を促し皮膚を完成させる。刺激の少ない基剤で保護。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('アクトシン')">アクトシン軟膏</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="algo-footer-pitfall">
        <strong>⚠️ 処方監査・超重要チェック：</strong>
        <span>
          ① 浸出液が多い傷に油性ワセリン基剤を塗るとふやけて感染爆発する！吸水性基剤（カデックス等）を選ぶ。<br>
          ② 乾いた傷に精製白糖（ユーパスタ）を塗ると浸透圧で肉芽が干からびて激痛を起こす！<br>
          ③ ゲーベン軟膏の白血球減少症（銀・サルファ剤吸収）に注意。
        </span>
      </div>
    </div>

    <div class="grid-2">
      <div class="box">
        <h3>🧭 創傷被覆材（ドレッシング）との組み合わせ</h3>
        <ul>
          <li><strong>モイストヒーリング（湿潤療法）：</strong>傷口を消毒液で痛めつけたりガーゼで乾燥させるのではなく、適度な湿り気を保つことで自己再生因子を活性化させる。</li>
          <li><strong>外用薬の厚塗り（スダチ塗り）：</strong>褥瘡には薄く塗り広げるのではなく、「厚さ2〜3mm（バターをトーストに乗せるように）」しっかり盛り付ける。</li>
        </ul>
      </div>
      <div class="box">
        <h3>💡 在宅での処方提案（トレーシングレポート）</h3>
        <ul>
          <li><strong>創の色が変わったら即・外用薬スイッチ：</strong>「黒色期から赤い肉芽が見えてきたのに、いつまでもゲーベンを塗り続けていると肉芽の形成が邪魔される」。赤くなったらプロスタンディン等へステップアップを医師に提案せよ！</li>
        </ul>
      </div>
    </div>

    <div class="question-box">
      <strong>🙋‍♂️ 実習生への問いかけ：</strong>「在宅患者さんの褥瘡で、浸出液がダラダラ出ているジュクジュク創にプロスタンディン軟膏（油脂性基剤）が処方されていました。基剤の性質と創の湿潤環境の観点から、どのような疑義照会・処方提案を考えますか？」
    </div>

    <div class="memo-area">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <strong style="color:#0f172a; font-size:0.92rem;">📝 実習生 症例ディスカッション＆メモ欄（印刷後手書き用）：</strong>
        <span style="font-size:0.75rem; color:#64748b; border:1px solid #cbd5e1; padding:2px 10px; border-radius:4px; background:white;">指導薬剤師 印：　　　　</span>
      </div>
      <div style="font-size:0.85rem; color:#64748b; line-height:1.5;">
        ・DESIGN-R分類（深さ・滲出液・サイズ・感染・肉芽・壊死）：<br>
        ・基剤選択（吸水vs保湿）・塗布厚・ドレッシング材提案：
      </div>
    </div>
  </div>
`;

// Core 16の直後、</div><!-- /#tab-guide --> の直前に挿入
const targetGuideClose = '</div><!-- /#tab-guide -->';
if (!guideHtml.includes('id="c17"')) {
  guideHtml = guideHtml.replace(targetGuideClose, newCardsHtml + '\n\n' + targetGuideClose);
  fs.writeFileSync(guidePath, guideHtml, 'utf8');
  console.log("Successfully built Core 17 to Core 23 in src/03_guide.html");
} else {
  console.log("Cards Core 17 to Core 23 already exist in src/03_guide.html");
}
