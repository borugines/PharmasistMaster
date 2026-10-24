const fs = require('fs');
const path = require('path');

console.log("=== Building Comprehensive Psychiatry Master (Core 6 & Comparisons) ===");

// ============================================================================
// 1. Update src/03_guide.html (Expand Core 6: 精神神経疾患・精神科薬学マスター)
// ============================================================================
const guidePath = path.join(__dirname, '..', '03_guide.html');
let guideHtml = fs.readFileSync(guidePath, 'utf8');

const p6 = guideHtml.indexOf('id="c6"');
const p7 = guideHtml.indexOf('id="c7"');

if (p6 === -1 || p7 === -1) {
  console.error("Could not find c6 or c7 in 03_guide.html");
  process.exit(1);
}

// Build the fully comprehensive Core 6 card
const newCard6Html = `  <!-- 6. 精神神経疾患・精神科薬学マスター -->
  <div class="card" id="c6">
    <div class="card-header">
      <span class="tag">Core 06 / Psychiatry & Neurology</span>
      <h2 class="card-title">6. 精神神経疾患・精神科薬学マスター（うつ病・双極性障害・統合失調症・ADHD・不安症・認知症）</h2>
    </div>
    <div class="catchphrase">
      🎯 一言でいうと：「抗うつ薬は“初期2週間のツンデレ（副作用先行）”、抗精神病薬は“受容体個性（EPS/代謝/鎮静）”、双極性は“躁転防止（抗うつ薬単独厳禁）”、ADHDは“作用時間と流通管理”で患者の人生を支える！」
    </div>

    <!-- 📊 ガイドライン第一選択・条件分岐アルゴリズムフローチャート -->
    <div class="algo-flow-container">
      <div class="algo-header">
        <div class="algo-title-group">
          <span class="algo-tag">Clinical Flowchart</span>
          <h3 class="algo-title">📊 6. 精神科・神経疾患 5大区分別 第一選択・条件分岐アルゴリズム</h3>
        </div>
        <span class="algo-goal-badge">🎯 目標：精神症状の寛解 ＆ 薬剤性せん妄・EPS・代謝異常・躁転・依存の完全回避</span>
      </div>
      <div class="decision-tree-grid">
        
        <!-- 分岐1：大うつ病性障害 -->
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［大うつ病性障害（MDD）］</span>
            <span class="branch-target">抑うつ気分・興味喪失・不眠・希死念慮</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">第一選択（新規抗うつ薬）</div>
              <div class="step-drug">SSRI（レクサプロ等） / SNRI（サインバルタ） / NaSSA（リフレックス） / トリンテリックス</div>
              <div class="step-rationale">患者の主症状（不安ならSSRI、意欲低下・疼痛ならSNRI、不眠・食欲不振ならNaSSA）で選択。初期悪心にはドンペリドン併用。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('レクサプロ')">レクサプロ</span><span class="flow-chip" onclick="quickSearch('サインバルタ')">サインバルタ</span><span class="flow-chip" onclick="quickSearch('リフレックス')">リフレックス</span><span class="flow-chip" onclick="quickSearch('トリンテリックス')">トリンテリックス</span></div>
            </div>
            <div class="step-arrow">➔</div>
            <div class="step-card second-choice">
              <div class="step-pill second">効果不十分（増強療法：Augmentation）</div>
              <div class="step-drug">＋ 抗精神病薬少量（アリピプラゾール 1〜3mg）または リチウム付加</div>
              <div class="step-rationale">抗うつ薬増量でも寛解しない難治例に少量エビリファイを付加し急速に寛解へ導く。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('エビリファイ')">エビリファイ 1〜3mg</span><span class="flow-chip" onclick="quickSearch('リーマス')">リーマス</span></div>
            </div>
          </div>
        </div>

        <!-- 分岐2：双極性障害（躁うつ病） -->
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［双極性障害（躁うつ病：Bipolar）］</span>
            <span class="branch-target">躁状態（気分高揚・多弁・浪費） / うつ状態（希死念慮・重度抑うつ）</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">急性躁病 ＆ 維持療法の柱</div>
              <div class="step-drug">炭酸リチウム（リーマス：TDM必須） / バルプロ酸（デパケン） ＋ 非定型抗精神病薬</div>
              <div class="step-rationale">リチウムは躁病・維持療法・自殺予防のゴールドスタンダード。NSAIDs併用禁忌に注意。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('リーマス')">リーマス</span><span class="flow-chip" onclick="quickSearch('デパケン')">デパケン</span><span class="flow-chip" onclick="quickSearch('ジプレキサ')">ジプレキサ</span></div>
            </div>
            <div class="step-arrow">➔</div>
            <div class="step-card second-choice">
              <div class="step-pill second">双極性うつ病（超重要！）</div>
              <div class="step-drug">ラモトリギン（ラミクタール） / ルラシドン（ラツーダ） / クエチアピン / オランザピン</div>
              <div class="step-rationale">【超重要警告】抗うつ薬（SSRI/SNRI）の単剤投与は躁転・急速交代化を招くため原則禁止！ラミクタールは隔週倍増遵守。ラツーダは食後服用。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ラミクタール')">ラミクタール</span><span class="flow-chip" onclick="quickSearch('ラツーダ')">ラツーダ</span><span class="flow-chip" onclick="quickSearch('セロクエル')">セロクエル</span></div>
            </div>
          </div>
        </div>

        <!-- 分岐3：統合失調症 -->
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［統合失調症（Schizophrenia）］</span>
            <span class="branch-target">陽性症状（幻聴・妄想・不穏） / 陰性症状（意欲低下・感情平板化）</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">急性期・陽性症状（鎮静・幻妄遮断）</div>
              <div class="step-drug">SDA（リスペリドン / パリペリドン） または MARTA（オランザピン / クエチアピン）</div>
              <div class="step-rationale">強力なD2遮断＋5-HT2A遮断で幻覚・妄想を速やかに鎮火。オランザピン・クエチアピンは【糖尿病禁忌】！</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('リスパダール')">リスパダール</span><span class="flow-chip" onclick="quickSearch('インヴェガ')">インヴェガ</span><span class="flow-chip" onclick="quickSearch('ジプレキサ')">ジプレキサ</span></div>
            </div>
            <div class="step-arrow">➔</div>
            <div class="step-card second-choice">
              <div class="step-pill second">維持期・陰性症状・再発予防</div>
              <div class="step-drug">DSS（アリピプラゾール / レキサルティ） / 新世代（ラツーダ） / 持効性注射剤（LAI）</div>
              <div class="step-rationale">ドパミンを正常レベルに調律。過鎮静や体重増加を起こさず社会復帰を支援。不服薬には月1回等のLAI（ゼプリオン等）が著効。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('エビリファイ')">エビリファイ</span><span class="flow-chip" onclick="quickSearch('レキサルティ')">レキサルティ</span><span class="flow-chip" onclick="quickSearch('ゼプリオン')">ゼプリオンLAI</span></div>
            </div>
          </div>
        </div>

        <!-- 分岐4：神経発達症・ADHD -->
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［神経発達症・ADHD（注意欠如・多動症）］</span>
            <span class="branch-target">不注意（忘れ物・集中困難） / 多動・衝動性（待てない・不用意な発言）</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">中枢刺激薬（即効性・強力）</div>
              <div class="step-drug">メチルフェニデート徐放錠（コンサータ：朝1回）</div>
              <div class="step-rationale">DAT/NETを阻害しシナプス間ドパミン急増。【ADHD適正流通管理システム】登録医・登録薬局・患者カード確認が法定義務！食欲減退・不眠注意。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('コンサータ')">コンサータ（登録制）</span></div>
            </div>
            <div class="step-arrow">➔</div>
            <div class="step-card second-choice">
              <div class="step-pill second">非中枢刺激薬（24時間安定・衝動性改善）</div>
              <div class="step-drug">アトモキセチン（ストラテラ） または グアンファシン徐放（インチュニブ）</div>
              <div class="step-rationale">依存性ゼロ。ストラテラは2〜4週間で効果安定。インチュニブはα2A作動で衝動性・多動性に著効（急な中止で反跳性高血圧注意）。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ストラテラ')">ストラテラ</span><span class="flow-chip" onclick="quickSearch('インチュニブ')">インチュニブ</span></div>
            </div>
          </div>
        </div>

        <!-- 分岐5：認知症 ＆ パーキンソン病 -->
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［認知症（4大病型） ＆ パーキンソン病（PD）］</span>
            <span class="branch-target">中核症状（記憶・見当識）＋BPSD（焦燥・妄想） / 振戦・筋固縮・無動</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">認知症中核薬 ＆ BPSD非薬物・抑肝散</div>
              <div class="step-drug">ChE阻害薬（ドネペジル等） / NMDA拮抗薬（メマンチン） ＋ 抑肝散</div>
              <div class="step-rationale">進行抑制。BPSDの興奮には抑肝散。抗精神病薬の安易な処方は転倒・脳血管障害・死亡リスク増のため最小限。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ドネペジル')">アリセプト</span><span class="flow-chip" onclick="quickSearch('メマンチン')">メマリー</span><span class="flow-chip" onclick="quickSearch('抑肝散')">抑肝散</span></div>
            </div>
            <div class="step-arrow">➔</div>
            <div class="step-card second-choice">
              <div class="step-pill second">パーキンソン病（ドパミン補充）</div>
              <div class="step-drug">L-ドパ/DCI（メネシット等） ＋ ドパミンアゴニスト（プラミペキソール等）</div>
              <div class="step-rationale">高齢者はL-ドパ中心、若年発症はアゴニスト先行（ウェアリングオフ遅延）。突発性睡眠・衝動制御障害（ギャンブル等）注意。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('メネシット')">メネシット</span><span class="flow-chip" onclick="quickSearch('ビ・シフロール')">ビ・シフロール</span></div>
            </div>
          </div>
        </div>

      </div>
      <div class="algo-footer-pitfall">
        ⚠️ <strong>精神科調剤鑑査の超重要トラップ：</strong>
        ①オランザピン・クエチアピンの【糖尿病禁忌（血糖モニタリング必須）】、②双極性障害への抗うつ薬単独投与による【躁転・自殺企図】、③リチウムとNSAIDs/降圧薬併用による【リチウム中毒（急性腎不全・意識障害）】、④コンサータ処方箋の【流通管理登録番号・処方日数30日制限】の4つは薬剤師が絶対に防ぐべき重大鑑査ポイントです！
      </div>
    </div>

    <!-- 🧭 ガイドラインの型 ＆ 鑑査のポイント -->
    <div class="grid-2">
      <div class="box guideline">
        <h3>🧭 ガイドラインの「型」をざっくり（精神科薬物療法）</h3>
        <ul>
          <li><strong>抗うつ薬の「2週間タイムラグ（ツンデレ特性）」：</strong>
            <br>・投与開始後<strong>1〜2週間は「吐き気・眠気・下痢・不安亢進（アクチベーション）」などの副作用が先行</strong>し、肝心の抗うつ効果は2〜4週間後から遅れてやってくる！
            <br>・このタイムラグを初日に患者に予告しておかないと、90%が自己中断して再燃・難治化する。「最初の副作用は薬が効き始めているサイン」と安心させることが服薬指導の極意。
          </li>
          <li><strong>双極性障害の「うつ状態」を見抜く（誤診トラップ）：</strong>
            <br>・過去の軽躁状態（「急に元気になって買い物をしまくった」「一睡もせずに動き回れた」等）を見落として単極性うつ病と誤認し、SSRI等を投与すると<strong>激しい躁転や急速交代化（ラピッドサイクラー）、衝動的自殺</strong>を引き起こす。
            <br>・双極性うつには<strong>ラモトリギン（ラミクタール）やルラシドン（ラツーダ）</strong>が第一選択！
          </li>
          <li><strong>抗精神病薬の単剤化原則（ポリファーマシー脱却）：</strong>
            <br>・日本精神神経学会GLでは「抗精神病薬は原則1剤」。多剤併用は効果が上がらないばかりか、EPS、高プロラクチン、過鎮静、突然死リスクを跳ね上げる。
          </li>
        </ul>
      </div>

      <div class="box audit">
        <h3>🔍 ここを見落とすな！精神科処方鑑査の鉄則</h3>
        <ul>
          <li><strong>オランザピン（ジプレキサ）・クエチアピン（セロクエル）の「糖尿病禁忌」：</strong>
            <br>・著明な食欲亢進・体重増加を伴い、急激な高血糖・糖尿病性ケトアシドーシス・昏睡死亡例あり！
            <br>・処方箋受付時に<strong>「糖尿病の既往・治療歴」「口渇・多飲・多尿の有無」「直近のHbA1c測定」</strong>を徹底チェック。
          </li>
          <li><strong>炭酸リチウム（リーマス）の中毒と薬物相互作用：</strong>
            <br>・有効血中濃度（0.4〜1.2 mEq/L）と中毒域（1.5 mEq/L以上）が極めて近い。
            <br>・<strong>NSAIDs（ロキソニン等）、ACE阻害薬/ARB、サイアザイド系利尿薬</strong>の併用でリチウムの腎排泄が低下し血中濃度が急上昇！激しい振戦、運動失調、意識混濁を招くため疑義照会必須。
          </li>
          <li><strong>ラモトリギン（ラミクタール）の皮膚障害（SJS/TEN）防止：</strong>
            <br>・初期投与量の厳守（単剤時：1〜2週目は25mg隔日または1日1回25mg、3〜4週目は50mg…）。
            <br>・<strong>バルプロ酸併用時はラモトリギンの代謝が強く阻害されるため「半量以下」で開始！</strong>発疹・発熱出現時は直ちに中止・救急受診を指導。
          </li>
          <li><strong>コンサータ錠の「適正流通管理システム（ADHD）」法定義務：</strong>
            <br>・処方医（登録医師）・調剤薬局（登録薬局）・調剤薬剤師（登録薬剤師）・患者（患者カード）のすべてが登録完了していること。処方箋に記載された登録医師記号を確認。<strong>処方日数は1回30日分が上限！</strong>
          </li>
        </ul>
      </div>
    </div>

    <!-- ⚔️ 第2世代抗精神病薬（SGA）4大クラス完全使い分けマトリクス -->
    <div style="margin-top:1.5rem; background:white; border:2px solid #0284c7; border-radius:12px; padding:1.25rem; box-shadow:0 4px 10px rgba(0,0,0,0.06); break-inside:avoid;">
      <div style="display:flex; align-items:center; justify-content:space-between; border-bottom:2px solid #0284c7; padding-bottom:0.75rem; margin-bottom:1.25rem; flex-wrap:wrap; gap:8px;">
        <h3 style="margin:0; font-size:1.2rem; color:#0f172a; display:flex; align-items:center; gap:8px;">
          <span>⚔️</span> <strong>第2世代抗精神病薬（SGA）4大クラス ガチンコ使い分けマトリクス</strong>
        </h3>
        <span style="font-size:0.75rem; background:#0284c7; color:white; padding:4px 12px; border-radius:12px; font-weight:700;">受容体プロファイル ＆ 副作用完全攻略</span>
      </div>

      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; font-size:0.85rem; background:white; border-radius:8px; overflow:hidden; border:1px solid #cbd5e1;">
          <thead>
            <tr style="background:#0f172a; color:white; text-align:left;">
              <th style="padding:9px 10px; width:13%;">クラス・代表薬</th>
              <th style="padding:9px 10px; width:16%;">作用機序・受容体特性</th>
              <th style="padding:9px 10px; width:17%;">得意な症状・適応</th>
              <th style="padding:9px 10px; width:22%;">主な副作用・禁忌</th>
              <th style="padding:9px 10px; width:32%;">なぜ医師はこの抗精神病薬を選んだのか？（決定打・処方意図）</th>
            </tr>
          </thead>
          <tbody>
            <!-- SDA -->
            <tr style="border-bottom:1px solid #e2e8f0; background:#f8fafc;">
              <td style="padding:10px;">
                <strong style="color:#0369a1;">SDA</strong><br>
                <strong>リスパダール</strong><br>（リスペリドン）<br>
                <strong>インヴェガ</strong>（パリペリドン）
              </td>
              <td style="padding:10px;">
                <strong>D2 ＋ 5-HT2A 高親和性拮抗</strong><br>
                <span style="font-size:0.78rem; color:#64748b;">中脳辺縁系のD2を強力遮断し陽性症状を抑制。黒質線条体では5-HT2A遮断でドパミン遊離を促しEPS軽減。</span>
              </td>
              <td style="padding:10px;">
                <strong>陽性症状（幻覚・妄想）</strong><br>
                急性期の激しい不穏・興奮・幻聴の鎮火。<br>
                <span style="font-size:0.75rem; color:#0369a1;">※小児自閉症の易刺激性にも適応</span>
              </td>
              <td style="padding:10px;">
                <strong style="color:#b91c1c;">錐体外路症状（EPS）</strong><br>
                （用量依存的に増加）<br>
                <strong style="color:#b91c1c;">高プロラクチン血症！</strong><br>
                （乳汁分泌、無月経、女性化乳房）
              </td>
              <td style="padding:10px;">
                <span class="char" style="background:#e0f2fe; color:#0369a1; font-weight:700; padding:2px 6px; border-radius:4px; font-size:0.78rem;">幻覚・妄想を最速で鎮静化させる標準薬</span><br>
                抗幻覚・妄想作用はSGA中最強クラス。液剤・OD錠・内用液・持効性注射剤（ゼプリオン）と剤形が豊富で急性期から維持期まで対応。高PRL血症に注意。
              </td>
            </tr>

            <!-- MARTA -->
            <tr style="border-bottom:1px solid #e2e8f0; background:#fff7ed;">
              <td style="padding:10px;">
                <strong style="color:#c2410c;">MARTA</strong><br>
                <strong>ジプレキサ</strong><br>（オランザピン）<br>
                <strong>セロクエル</strong><br>（クエチアピン）
              </td>
              <td style="padding:10px;">
                <strong>多元受容体作用</strong><br>
                <span style="font-size:0.78rem; color:#64748b;">D2, 5-HT2A/2C, H1, α1, M1など多彩な受容体に結合。H1/5-HT2C遮断で食欲亢進。</span>
              </td>
              <td style="padding:10px;">
                <strong>不穏・焦燥・不眠・双極性障害</strong><br>
                陽性・陰性症状両方。<br>
                双極性障害の躁状態・うつ状態。<br>
                抗がん薬の制吐（オランザピン）。
              </td>
              <td style="padding:10px;">
                <strong style="color:#b91c1c; font-size:0.95rem;">🚨 糖尿病に原則禁忌！</strong><br>
                <strong style="color:#b91c1c;">著しい体重増加・過食</strong><br>
                （1ヶ月で数kg増）、過鎮静・眠気。EPSは極めて少ない。
              </td>
              <td style="padding:10px;">
                <span class="char" style="background:#ffedd5; color:#c2410c; font-weight:700; padding:2px 6px; border-radius:4px; font-size:0.78rem;">気分安定・鎮静・制吐までこなす万能薬（血糖注意）</span><br>
                不穏で眠れない患者を深く鎮静させ、双極性障害にも強い。やせ細った患者の食欲改善にも働くが、糖尿病患者には禁忌！定期的な血糖・HbA1c測定が法定義務。
              </td>
            </tr>

            <!-- DSS -->
            <tr style="border-bottom:1px solid #e2e8f0; background:#f0fdf4;">
              <td style="padding:10px;">
                <strong style="color:#15803d;">DSS</strong><br>
                <strong>エビリファイ</strong><br>（アリピプラゾール）<br>
                <strong>レキサルティ</strong><br>（ブレクスピプラゾール）
              </td>
              <td style="padding:10px;">
                <strong>ドパミン部分作動薬（D2 PA）</strong><br>
                <span style="font-size:0.78rem; color:#64748b;">ドパミン過剰時は遮断、不足時は刺激して受容体活性を適正化（ドパミン・スタビライザー）。</span>
              </td>
              <td style="padding:10px;">
                <strong>陰性症状・意欲低下・社会復帰</strong><br>
                うつ病増強療法（エビリファイ少量）。<br>
                双極性躁病。<br>
                小児ASDの易刺激性。
              </td>
              <td style="padding:10px;">
                <strong style="color:#d97706;">アカシジア（静坐不能症）！</strong><br>
                （足がムズムズして落ち着かない）<br>
                不眠、悪心。<br>
                <span style="color:#15803d;">※体重増加・眠気・高PRLが最も出にくい！</span>
              </td>
              <td style="padding:10px;">
                <span class="char" style="background:#dcfce7; color:#15803d; font-weight:700; padding:2px 6px; border-radius:4px; font-size:0.78rem;">眠気・体重増加がなく社会復帰を支える昼の薬</span><br>
                頭がボーッとせずシャキッと生活できるため、就労・学業を目指す患者のファーストライン。うつ病増強（1〜3mg）でも大活躍。初期のアカシジアを見逃さないこと。
              </td>
            </tr>

            <!-- 新世代 D2/5-HT拮抗 -->
            <tr style="background:#eff6ff;">
              <td style="padding:10px;">
                <strong style="color:#1d4ed8;">新世代・SDA系</strong><br>
                <strong>ラツーダ</strong><br>（ルラシドン）
              </td>
              <td style="padding:10px;">
                <strong>D2 ＋ 5-HT2A/7 拮抗 ＋ 5-HT1A 部分作動</strong><br>
                <span style="font-size:0.78rem; color:#64748b;">5-HT7/1A作用により優れた抗うつ・認知機能改善効果を発揮。H1/M1親和性が低く眠気・口渇・体重増加が極少。</span>
              </td>
              <td style="padding:10px;">
                <strong>双極性障害のうつ状態（第一選択）</strong><br>
                統合失調症。<br>
                体重増加を極度に嫌う若年女性や代謝リスク保有者。
              </td>
              <td style="padding:10px;">
                アカシジア、傾眠、悪心。<br>
                <strong style="color:#b91c1c;">【必ず食後に服用！】</strong><br>
                ※空腹時だと吸収（AUC）が約半分に激減する！
              </td>
              <td style="padding:10px;">
                <span class="char" style="background:#dbeafe; color:#1d4ed8; font-weight:700; padding:2px 6px; border-radius:4px; font-size:0.78rem;">双極性うつを救う！体重が増えない新世代スマート薬</span><br>
                双極性うつ病に適応を持つ数少ない切り札。オランザピンのような過食・糖尿病リスクがなく安全。効果を出すために「食後服用」の指導が絶対に不可欠。
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ⚔️ 双極性障害（気分安定薬） ＆ ADHD治療薬 ガチンコ比較 -->
    <div style="margin-top:1.5rem; display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:15px;">
      
      <!-- 双極性障害：気分安定薬 -->
      <div style="background:white; border:1.5px solid #d97706; border-radius:10px; padding:1.1rem; box-shadow:0 2px 6px rgba(0,0,0,0.05);">
        <h4 style="font-size:1.02rem; color:#b45309; margin:0 0 0.6rem 0; display:flex; align-items:center; gap:6px;">
          <span>⚖️</span> <strong>双極性障害：気分安定薬（Mood Stabilizer）3銃士</strong>
        </h4>
        <div style="font-size:0.84rem; line-height:1.5; color:#334155;">
          <div style="margin-bottom:8px; border-bottom:1px dashed #e2e8f0; padding-bottom:6px;">
            <strong style="color:#0f172a;">1. 炭酸リチウム（リーマス）：</strong><br>
            躁病エピソード・維持療法の絶対王者。自殺予防効果が証明されている唯一の薬。<strong>【TDM必須：至適0.4〜1.2 mEq/L】</strong>。NSAIDs・降圧薬（ACE/ARB）併用で排泄遅延・中毒死リスク！
          </div>
          <div style="margin-bottom:8px; border-bottom:1px dashed #e2e8f0; padding-bottom:6px;">
            <strong style="color:#0f172a;">2. バルプロ酸（デパケン）：</strong><br>
            急性躁病、急速交代型（ラピッドサイクラー）、混合状態に強い。催奇形性（神経管閉鎖障害）があるため妊娠可能女性には注意。高アンモニア血症・肝機能・血小板を定期採血。
          </div>
          <div>
            <strong style="color:#0f172a;">3. ラモトリギン（ラミクタール）：</strong><br>
            <strong>双極性うつ病の再発予防に最強！</strong>躁状態の予防には弱いが、沈み込むうつ病相を強力に食い止める。重篤な皮膚障害（SJS/TEN）防止のため<strong>初期用量（隔週倍増）の遵守が法的に厳命</strong>されている。
          </div>
        </div>
      </div>

      <!-- ADHD治療薬 3大製剤比較 -->
      <div style="background:white; border:1.5px solid #6366f1; border-radius:10px; padding:1.1rem; box-shadow:0 2px 6px rgba(0,0,0,0.05);">
        <h4 style="font-size:1.02rem; color:#4338ca; margin:0 0 0.6rem 0; display:flex; align-items:center; gap:6px;">
          <span>🎯</span> <strong>ADHD治療薬 3大製剤ガチンコ比較（コンサータ vs ストラテラ vs インチュニブ）</strong>
        </h4>
        <div style="font-size:0.84rem; line-height:1.5; color:#334155;">
          <div style="margin-bottom:8px; border-bottom:1px dashed #e2e8f0; padding-bottom:6px;">
            <strong style="color:#4338ca;">1. コンサータ（メチルフェニデート徐放）：</strong><br>
            中枢刺激薬（DAT/NET阻害）。即効性（服用当日から著効・約12時間持続）。効果最強だが、<strong>【適正流通管理システム】</strong>登録医・登録薬局・患者カード確認義務。食欲減退・不眠・依存性に注意。処方上限30日。
          </div>
          <div style="margin-bottom:8px; border-bottom:1px dashed #e2e8f0; padding-bottom:6px;">
            <strong style="color:#0369a1;">2. ストラテラ（アトモキセチン）：</strong><br>
            非中枢刺激薬（選択的NET阻害）。依存性ゼロ。効果発現まで2〜4週間かかるが、24時間効果が持続し夕方以降の家庭生活も安定。悪心・頭痛・肝機能障害に注意。
          </div>
          <div>
            <strong style="color:#15803d;">3. インチュニブ（グアンファシン徐放）：</strong><br>
            非中枢刺激薬（シナプス後α2A作動薬）。前頭前皮質の神経伝達を強化し、特に「多動・衝動性・イライラ」に劇的効果。眠気・低血圧に注意。<strong>【急な中止で反跳性高血圧を起こすため必ず徐々に減量】</strong>。
          </div>
        </div>
      </div>

    </div>

    <!-- 処方箋のウラ読み -->
    <div class="offlabel" style="margin-top:1.5rem;">
      <h3>🕵️‍♂️ 処方箋のウラ読み（適応外・意外な処方意図・重大な処方地雷）</h3>
      <ul>
        <li><strong>「うつ病」診断なのにエビリファイ錠 1〜3mg が抗うつ薬に追加された時：</strong>
          統合失調症の誤診ではなく、<strong>「抗うつ薬増強療法（Augmentation療法）」</strong>！抗うつ薬単剤で効果不十分な難治性うつ病に対し、ドパミン部分作動薬の少量付加でシナプス間ドパミンを微調整し、数日から1週間で劇的な寛解導入を狙っている。
        </li>
        <li><strong>スルピリド（ドグマチール）50mg 1日3回で「生理が止まった・胸が張って痛い」：</strong>
          胃炎・軽度うつ病で汎用されるが、強力なD2遮断により下垂体からのプロラクチン分泌抑制が解除され、<strong>高プロラクチン血症（無月経・乳汁分泌・女性化乳房）</strong>が必発する。患者が言い出しにくいため薬剤師から優しくヒアリングし、エビリファイや他剤への変更を提案する。
        </li>
        <li><strong>「アカシジア（足のムズムズ・じっとしていられない）」を精神症状の悪化と誤診する地雷：</strong>
          抗精神病薬のD2遮断による錐体外路症状（アカシジア）でソワソワ歩き回る患者を、「病気による不安・焦燥が悪化した」と医師が誤認して抗精神病薬を増量してしまうと、地獄の悪循環に陥る！「足がムズムズして動き回りたくないですか？」と問いかけ、アキネトンやビ・シフロール、抗精神病薬減量を提案するのがプロの鑑査。
        </li>
      </ul>
    </div>

    <!-- 現場の勘所 -->
    <div class="pearl">
      <h3>💡 先輩からの現場の勘所（Clinical Pearls）</h3>
      <ul>
        <li><strong>悪性症候群（NMS）の超初期シグナルを見逃すな！：</strong>
          <span class="highlight">「38℃以上の急激な高熱」「歯車様筋固縮（手足がガチガチ）」「大量の発汗・頻脈」「意識もうろう」</span>が出現したら、直ちに内服を中止させ救急搬送！採血でCK（CPK）が数千〜数万に跳ね上がっている。死亡率の高い最緊急副作用。特効薬はダントロレンナトリウム水和物。
        </li>
        <li><strong>抗うつ薬の中断症候群（シャンシャン・ビリビリ感）：</strong>
          パロキセチン（パキシル）等半減期の短いSSRIを急に自己中断すると、頭の中で「シャンシャン」「ビリビリ」と音がするような電撃痛、めまい、激しい不安が襲う。「良くなったからと自分の判断で急にやめないで、少しずつ減らしていきましょう」と最初の段階から刷り込んでおく。
        </li>
        <li><strong>コンサータは「朝食後すぐ」に飲ませよ：</strong>
          中枢刺激作用により「強い食欲不振」と「不眠」が起こりやすい。昼前や午後に飲むと夜眠れなくなるため、必ず【朝食後すぐ】に服用させ、昼食が食べられなくても夕食以降にしっかり栄養を摂れるよう保護者に助言する。
        </li>
      </ul>
    </div>

    <!-- 実習生への問いかけ -->
    <div class="question-box">
      <strong>🙋‍♂️ 実習生への問いかけ：</strong>「『オランザピンを飲み始めてから食欲が止まらず、3ヶ月で8kg太って最近喉が渇いてペットボトル症候群のようにジュースを何本も飲んでしまう』という統合失調症患者さん。あなたが直ちに疑うべき危険な病態と、処方医へどのような代替薬提案を行う？」
    </div>

    <!-- メモ欄 -->
    <div class="memo-area">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <strong style="color:#0f172a; font-size:0.92rem;">📝 実習生 症例ディスカッション＆メモ欄（印刷後手書き用）：</strong>
        <span style="font-size:0.75rem; color:#64748b; border:1px solid #cbd5e1; padding:2px 10px; border-radius:4px; background:white;">指導薬剤師 印：　　　　</span>
      </div>
      <div style="font-size:0.85rem; color:#64748b; line-height:1.5;">
        ・担当患者の精神病態（うつ/双極/統失/ADHD）・処方薬の受容体特性・EPS評価：<br>
        ・血糖・HbA1c測定状況・TDM値（リチウム等）・ADHD流通管理確認：
      </div>
    </div>
  </div>
`;

guideHtml = guideHtml.substring(0, p6) + newCard6Html + '\n\n  ' + guideHtml.substring(p7);
fs.writeFileSync(guidePath, guideHtml, 'utf8');
console.log("Successfully replaced and expanded Core 6 in 03_guide.html!");


// ============================================================================
// 2. Update src/05_comparison.html (Add SGA, Mood Stabilizers & ADHD to Sec 4)
// ============================================================================
const compPath = path.join(__dirname, '..', '05_comparison.html');
let compHtml = fs.readFileSync(compPath, 'utf8');

const psychComparisonTables = `
    <!-- SGA 抗精神病薬 4大クラス ガチンコ比較 -->
    <div class="sub-banner banner-within" style="margin-top:2rem;">
      <span>🧠 【第2世代抗精神病薬（SGA 4大クラス）ガチンコ比較】受容体プロファイルと処方意図を見抜く！</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:14%;">クラス・代表薬</th>
          <th style="width:18%;">作用メカニズム</th>
          <th style="width:16%;">得意な病態・症状</th>
          <th style="width:18%;">鑑査上の重大リスク</th>
          <th style="width:34%;">なぜ医師はこの抗精神病薬を選んだのか？（決定打・臨床ポジショニング）</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>SDA</strong><br><strong>リスパダール</strong><br>（リスペリドン）<br><strong>インヴェガ</strong></td>
          <td>D2 ＋ 5-HT2A遮断<br>（高力価・シャープ）</td>
          <td>幻覚・妄想・急性不穏<br>小児ASD易刺激性</td>
          <td>EPS（パーキンソニズム）<br><span style="color:#b91c1c; font-weight:700;">高プロラクチン血症</span>（無月経）</td>
          <td><span class="char">陽性症状（幻聴・被害妄想）を最速で鎮圧する切れ味No.1</span> 急性期の激しい精神運動興奮を一気に抑え込む。内用液や持効性注射剤（ゼプリオン）もありアドヒアランス確保に最強。</td>
        </tr>
        <tr>
          <td><strong>MARTA</strong><br><strong>ジプレキサ</strong><br>（オランザピン）<br><strong>セロクエル</strong></td>
          <td>多元受容体作用<br>（D2, 5-HT, H1, M1, α1）</td>
          <td>不穏・焦燥・不眠<br>双極性障害（躁・うつ）<br>抗がん薬制吐</td>
          <td><strong style="color:#b91c1c; font-size:0.95rem;">🚨 糖尿病患者に原則禁忌！</strong><br>著しい体重増加・過食・強い眠気</td>
          <td><span class="char">過鎮静と気分安定化を併せ持つ万能薬（血糖管理が絶対条件）</span> 眠れず暴れる患者を深く鎮静させ、双極性障害の躁・うつ両方に効く。食欲亢進による体重増加と高血糖ケトアシドーシスに厳重警戒。</td>
        </tr>
        <tr>
          <td><strong>DSS</strong><br><strong>エビリファイ</strong><br>（アリピプラゾール）<br><strong>レキサルティ</strong></td>
          <td>ドパミン部分作動薬<br>（D2 PA：スタビライザー）</td>
          <td>陰性症状・意欲低下<br>うつ病増強（1〜3mg）<br>双極性躁病</td>
          <td><strong style="color:#d97706;">アカシジア（足ムズムズ）</strong><br>不眠・悪心<br><span style="color:#15803d;">※体重増加・眠気なし</span></td>
          <td><span class="char">頭が冴えて社会復帰できる昼の薬 ＆ うつ病増強の切り札</span> ドパミンを適正濃度に整える。過鎮静や代謝異常を起こさないため就労支援に最適。うつ病への少量付加でも劇的な効果を発揮。</td>
        </tr>
        <tr>
          <td><strong>新世代SDA系</strong><br><strong>ラツーダ</strong><br>（ルラシドン）</td>
          <td>D2 ＋ 5-HT2A/7遮断<br>5-HT1A部分作動</td>
          <td><strong>双極性障害のうつ状態</strong><br>統合失調症</td>
          <td>アカシジア、傾眠<br><strong style="color:#b91c1c;">【食後服用厳守！】</strong><br>（空腹時で吸収半減）</td>
          <td><span class="char">双極性うつを救う！体重が増えない最新スマート薬</span> 双極性うつ病の第一選択。オランザピンと違い代謝異常・過食を起こさないため若年女性に大人気。食後に飲まないと効果が出ない点に注意。</td>
        </tr>
      </tbody>
    </table>

    <!-- 双極性障害 ＆ ADHD ガチンコ比較 -->
    <div class="sub-banner banner-within" style="margin-top:2rem;">
      <span>⚖️ 【双極性障害（気分安定薬） ＆ ADHD治療薬】ガチンコ比較図鑑</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">領域・薬剤名</th>
          <th style="width:16%;">分類・作用機序</th>
          <th style="width:18%;">適応・得意な場面</th>
          <th style="width:20%;">重大鑑査ポイント</th>
          <th style="width:30%;">なぜ医師はこの薬を選んだのか？（決定打・処方意図）</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>リーマス</strong><br>（炭酸リチウム）</td>
          <td>気分安定薬<br>（イノシトール枯渇等）</td>
          <td>双極性躁病・維持療法<br>自殺企図の予防</td>
          <td><strong style="color:#b91c1c;">治療域狭小（TDM必須）</strong><br>NSAIDs/降圧薬併用で中毒死</td>
          <td><span class="char">双極性障害のゴールドスタンダード！</span> 自殺率を明確に下げることが証明されている唯一無二の薬。血中濃度（0.4〜1.2 mEq/L）を厳密管理する。</td>
        </tr>
        <tr>
          <td><strong>ラミクタール</strong><br>（ラモトリギン）</td>
          <td>気分安定薬・抗てんかん薬<br>（Naチャネル遮断）</td>
          <td><strong>双極性うつ病の再発予防</strong><br>てんかん部分発作</td>
          <td><strong style="color:#b91c1c;">重篤な皮膚障害（SJS/TEN）</strong><br>隔週倍増ルールの厳格遵守</td>
          <td><span class="char">双極性うつの底冷えを食い止める防波堤</span> 躁病には弱いが、落ち込むうつ病相の予防効果は最強。急激に増量すると皮膚壊死（SJS）で命に関わるため初期用量を守る。</td>
        </tr>
        <tr>
          <td><strong>コンサータ</strong><br>（メチルフェニデート徐放）</td>
          <td>中枢神経刺激薬<br>（DAT/NET阻害）</td>
          <td>ADHD（不注意・多動）<br>（学齢期・成人）</td>
          <td><strong style="color:#b91c1c;">ADHD適正流通管理システム</strong><br>登録医・登録薬局・処方30日上限</td>
          <td><span class="char">即効性・効果絶大のADHD主力中枢刺激薬</span> 服用当日から劇的に集中力が高まり約12時間持続。厳格な流通管理制度と、食欲減退・不眠モニタリングが必須。</td>
        </tr>
        <tr>
          <td><strong>ストラテラ</strong><br>（アトモキセチン）</td>
          <td>非中枢刺激薬<br>（選択的NET阻害）</td>
          <td>ADHD全般<br>（不安合併例）</td>
          <td>効果発現まで2〜4週間<br>悪心・頭痛・肝機能</td>
          <td><span class="char">依存性ゼロ ＆ 24時間安定持続の非刺激薬</span> 即効性はないが夜や朝の準備まで一日中穏やかに効果が持続。依存のリスクがなく長期投与に安心。</td>
        </tr>
        <tr>
          <td><strong>インチュニブ</strong><br>（グアンファシン徐放）</td>
          <td>非中枢刺激薬<br>（シナプス後α2A作動）</td>
          <td>ADHD（多動・衝動性優位）<br>チック合併例</td>
          <td>眠気、低血圧<br><strong style="color:#b91c1c;">急な中止で反跳性高血圧！</strong></td>
          <td><span class="char">感情の爆発・イライラ・多動を鎮める非刺激薬</span> 前頭前皮質を強化し衝動性を鎮静。急に休薬すると血圧が跳ね上がるため必ず徐々に漸減する。</td>
        </tr>
      </tbody>
    </table>
`;

const pSec5Header = compHtml.indexOf('<div class="comp-section sec-imm">');
if (pSec5Header === -1) {
  console.error("Could not find sec-imm in 05_comparison.html");
  process.exit(1);
}

const beforeSec5 = compHtml.substring(0, pSec5Header);
const lastDivOfSec4 = beforeSec5.lastIndexOf('</div>');

compHtml = compHtml.substring(0, lastDivOfSec4) + psychComparisonTables + '\n  ' + compHtml.substring(lastDivOfSec4);

// Update Section 4 Title in 05_comparison.html
compHtml = compHtml.replace(
  '④ 精神神経疾患：「睡眠薬の新旧対決」と「抗うつ薬・認知症薬のマトリクス」',
  '④ 精神神経疾患：「睡眠薬」「抗うつ薬」「抗精神病薬4大クラス」「気分安定薬」「ADHD薬」完全使い分け'
);

fs.writeFileSync(compPath, compHtml, 'utf8');
console.log("Successfully updated 05_comparison.html with SGA, Mood Stabilizers & ADHD tables!");


// ============================================================================
// 3. Update src/14_dictionary.html (Add 10 Psychiatry Cards)
// ============================================================================
const dictPath = path.join(__dirname, '..', '14_dictionary.html');
let dictHtml = fs.readFileSync(dictPath, 'utf8');

const psychDictCards = `
      <!-- 第2世代抗精神病薬（SGA分類） -->
      <div class="dict-card" data-category="psy">
        <div class="dict-card-header">
          <span class="dict-tag">精神科・抗精神病薬</span>
          <span class="dict-badge">4大クラス</span>
        </div>
        <h3 class="dict-card-title">第2世代抗精神病薬（SGA：SDA / MARTA / DSS 4大クラス分類）</h3>
        <p class="dict-card-desc">
          定型抗精神病薬に比べ錐体外路症状（EPS）が少なく陰性症状にも有効な新世代群：<br>
          <strong>① SDA（セロトニン・ドパミン拮抗薬）：</strong>リスパダール、インヴェガ。幻覚・妄想に切れ味鋭い。EPSと高プロラクチンに注意。<br>
          <strong>② MARTA（多元受容体作用抗精神病薬）：</strong>ジプレキサ、セロクエル。鎮静・気分安定に万能だが<strong>【糖尿病禁忌・体重増加】</strong>。<br>
          <strong>③ DSS（ドパミン受容体部分作動薬）：</strong>エビリファイ、レキサルティ。過鎮静・体重増加がなく社会復帰を支援。アカシジア注意。<br>
          <strong>④ 新世代SDA系：</strong>ラツーダ（ルラシドン）。双極性うつ病の第一選択。食後服用厳守。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">原則：抗精神病薬は単剤治療が基本（多剤併用の脱却）</span>
        </div>
      </div>

      <!-- オランザピン / クエチアピン（糖尿病禁忌） -->
      <div class="dict-card" data-category="psy">
        <div class="dict-card-header">
          <span class="dict-tag">抗精神病薬・MARTA</span>
          <span class="dict-badge">糖尿病禁忌</span>
        </div>
        <h3 class="dict-card-title">オランザピン / クエチアピン（ジプレキサ / セロクエル 糖尿病禁忌・体重増加）</h3>
        <p class="dict-card-desc">
          <strong>【分類】</strong>MARTA（多元受容体作用抗精神病薬）。<br>
          <strong>【最大鑑査警告】</strong><strong>糖尿病患者および糖尿病の既往のある患者には【原則禁忌】！</strong>急激な血糖上昇、糖尿病性ケトアシドーシス、高浸透圧高血糖状態による昏睡・死亡例が報告されている。<br>
          <strong>【薬理背景】</strong>H1および5-HT2C受容体遮断による著明な食欲亢進・過食、体重増加、インスリン抵抗性増悪。<br>
          <strong>【指導】</strong>処方前にHbA1c測定を確認し、口渇・多飲・多尿などの高血糖徴候を必ず患者に確認する。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">鑑査：血糖測定のない長期処方には疑義照会・トレーシングレポート</span>
        </div>
      </div>

      <!-- アリピプラゾール（エビリファイ） -->
      <div class="dict-card" data-category="psy">
        <div class="dict-card-header">
          <span class="dict-tag">抗精神病薬・DSS</span>
          <span class="dict-badge">部分作動薬</span>
        </div>
        <h3 class="dict-card-title">アリピプラゾール / ブレクスピプラゾール（エビリファイ / レキサルティ DSS）</h3>
        <p class="dict-card-desc">
          <strong>【分類】</strong>DSS（Dopamine System Stabilizer：ドパミン部分作動薬）。<br>
          <strong>【特徴】</strong>ドパミン過剰な中脳辺縁系ではアンタゴニストとして働き陽性症状を抑え、ドパミン不足な中脳皮質系ではアゴニストとして働き陰性症状・認知機能を改善。過鎮静・体重増加・高PRL血症が最も少ない。<br>
          <strong>【副作用】</strong><strong>アカシジア（静坐不能症）</strong>が初期に出やすい。<br>
          <strong>【ウラ読み】</strong>1〜3mgの少量処方は「うつ病増強療法（Augmentation）」として頻用される。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">適応：統合失調症、双極性躁病、うつ病増強、小児ASD易刺激性</span>
        </div>
      </div>

      <!-- 炭酸リチウム（リーマス） -->
      <div class="dict-card" data-category="psy">
        <div class="dict-card-header">
          <span class="dict-tag">双極性・気分安定薬</span>
          <span class="dict-badge">TDM必須</span>
        </div>
        <h3 class="dict-card-title">炭酸リチウム（リーマス / TDM・リチウム中毒・相互作用）</h3>
        <p class="dict-card-desc">
          <strong>【適応】</strong>双極性障害（躁病エピソード・維持療法）。自殺予防効果が実証された唯一の薬剤。<br>
          <strong>【治療域】</strong>0.4〜1.2 mEq/L（1.5 mEq/L以上で中毒症状、2.0超で透析適応）。<br>
          <strong>【リチウム中毒】</strong>手の震え（振戦）、運動失調、ろれつが回らない、悪心・下痢、傾眠・意識混濁。<br>
          <strong>【超重要相互作用】</strong><strong>NSAIDs（ロキソニン等）、ACE阻害薬/ARB、利尿薬</strong>の併用で腎排泄が低下し急激に中毒域に達する！脱水時も要注意。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">鑑査：整形外科のロキソニン処方見落としに最大警戒！</span>
        </div>
      </div>

      <!-- ラモトリギン（ラミクタール） -->
      <div class="dict-card" data-category="psy">
        <div class="dict-card-header">
          <span class="dict-tag">双極性・抗てんかん</span>
          <span class="dict-badge">初期漸増遵守</span>
        </div>
        <h3 class="dict-card-title">ラモトリギン（ラミクタール / 双極性うつ病再発予防・重篤皮疹）</h3>
        <p class="dict-card-desc">
          <strong>【適応】</strong>双極性障害における気分エピソード（特にうつ状態）の再発・再燃予防、てんかん。<br>
          <strong>【重篤副作用】</strong>中毒性表皮壊死症（TEN）、スティーブンス・ジョンソン症候群（SJS）などの致死性皮膚障害。<br>
          <strong>【初期投与スケジュール遵守】</strong>皮膚障害を防ぐため、1〜2週目は25mg隔日または1日25mg、3〜4週目は50mg…と段階的に漸増する法定制限がある。<br>
          <strong>【バルプロ酸併用】</strong>代謝が著しく競合阻害されるため、開始用量は半量（隔日投与）厳守！
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">指導：発熱・目の充血・粘膜ただれ・皮疹出現時は直ちに服用中止受診</span>
        </div>
      </div>

      <!-- ルラシドン（ラツーダ） -->
      <div class="dict-card" data-category="psy">
        <div class="dict-card-header">
          <span class="dict-tag">抗精神病薬・双極性</span>
          <span class="dict-badge">食後服用厳守</span>
        </div>
        <h3 class="dict-card-title">ルラシドン塩酸塩（ラツーダ / 双極性うつ病第一選択・食後服用）</h3>
        <p class="dict-card-desc">
          <strong>【適応】</strong>双極性障害のうつ状態、統合失調症。<br>
          <strong>【薬理特徴】</strong>D2/5-HT2A遮断に加え5-HT7/1Aに作用し抗うつ効果を発揮。H1やM1への親和性が低く、体重増加・糖代謝異常・過鎮静が極めて少ない。<br>
          <strong>【服薬指導の急所】</strong><strong>必ず「食後」に服用！</strong>空腹時に服用するとバイオアベイラビリティが約半分（Cmax 3倍、AUC 2倍の食事影響）に低下して治療失敗を招くため、夕食後服用の徹底を指導する。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">同効比較：オランザピンで太りたくない患者の最有力選択肢</span>
        </div>
      </div>

      <!-- メチルフェニデート徐放（コンサータ） -->
      <div class="dict-card" data-category="psy">
        <div class="dict-card-header">
          <span class="dict-tag">ADHD・中枢刺激</span>
          <span class="dict-badge">流通管理登録制</span>
        </div>
        <h3 class="dict-card-title">メチルフェニデート徐放錠（コンサータ / ADHD適正流通管理システム）</h3>
        <p class="dict-card-desc">
          <strong>【適応】</strong>小児および成人のADHD（注意欠如・多動症）。<br>
          <strong>【作用】</strong>DATおよびNETを阻害し、前頭葉シナプス間ドパミン・ノルアドレナリン濃度を速やかに高める。即効性があり朝1回で約12時間持続。<br>
          <strong>【適正流通管理制度】</strong>依存性・乱用防止のため、<strong>登録医師・登録医療機関・登録薬局・患者カード</strong>の全照合が法定義務。処方日数は1回30日分が上限。<br>
          <strong>【副作用】</strong>食欲減退・体重減少（朝食直後服用を推奨）、不眠、血圧上昇・頻脈。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">鑑査：登録番号未記載処方箋は調剤不可（要確認）</span>
        </div>
      </div>

      <!-- アトモキセチン / グアンファシン -->
      <div class="dict-card" data-category="psy">
        <div class="dict-card-header">
          <span class="dict-tag">ADHD・非中枢刺激</span>
          <span class="dict-badge">依存性ゼロ</span>
        </div>
        <h3 class="dict-card-title">アトモキセチン / グアンファシン（ストラテラ vs インチュニブ 非刺激薬）</h3>
        <p class="dict-card-desc">
          コンサータと異なり依存性がなく登録制度不要なADHD治療薬：<br>
          <strong>① ストラテラ（アトモキセチン）：</strong>選択的NET阻害薬。効果発現に2〜4週間要するが24時間効果持続。悪心・頭痛注意。<br>
          <strong>② インチュニブ（グアンファシン徐放）：</strong>シナプス後α2A受容体作動薬。衝動性・多動性・イライラに著効。眠気・徐脈・低血圧に注意。<strong>【急な中止でリバウンド高血圧を起こすため漸減中止が必須】</strong>。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">使い分け：不注意中心ならストラテラ、衝動・多動中心ならインチュニブ</span>
        </div>
      </div>

      <!-- 悪性症候群（NMS） -->
      <div class="dict-card" data-category="psy">
        <div class="dict-card-header">
          <span class="dict-tag">精神科最緊急</span>
          <span class="dict-badge">致死性副作用</span>
        </div>
        <h3 class="dict-card-title">悪性症候群（Neuroleptic Malignant Syndrome：NMS）</h3>
        <p class="dict-card-desc">
          <strong>【原因】</strong>抗精神病薬の急激な開始・増量、または抗パーキンソン病薬の急激な中断によって視床下部・線条体のドパミン伝達が遮断されて起こる最緊急病態。<br>
          <strong>【4大主徴】</strong>①<strong>38℃以上の急激な高熱</strong>、②<strong>筋固縮</strong>（鉛管様・歯車様強直）、③<strong>自律神経症状</strong>（大量発汗・頻脈・血圧変動）、④<strong>意識障害・CK（CPK）著増</strong>（横紋筋融解症による腎不全）。<br>
          <strong>【初期対応】</strong>直ちに原因薬中止、補液、筋弛緩薬<strong>ダントロレンナトリウム</strong>投与。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">鑑査：夏場の脱水時や多剤併用時に発症リスクが急上昇</span>
        </div>
      </div>

      <!-- 賦活症候群（アクチベーション） -->
      <div class="dict-card" data-category="psy">
        <div class="dict-card-header">
          <span class="dict-tag">抗うつ薬リスク</span>
          <span class="dict-badge">初期厳重警戒</span>
        </div>
        <h3 class="dict-card-title">賦活症候群（Activation Syndrome / アクチベーション・シンドローム）</h3>
        <p class="dict-card-desc">
          <strong>【病態】</strong>SSRIやSNRIなどの抗うつ薬の投与初期（1〜2週間以内）や増量時に、中枢神経系が過剰に刺激されて起こる情動不安定状態。<br>
          <strong>【症状】</strong>不安、焦燥、不穏、敵意、パニック発作、衝動性、自傷・他害、<strong>希死念慮の増強・自殺企図</strong>。<br>
          <strong>【高リスク】</strong>24歳以下の若年者、小児、双極性障害の素因を持つ患者。<br>
          <strong>【対応】</strong>抗うつ薬の減量・中止、抗不安薬の併用。投与初期は家族に見守りを依頼し、行動の変化に注意を促す。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">指導：若年者への抗うつ薬開始時は「行動の変化」を家族に説明</span>
        </div>
      </div>
`;

if (dictHtml.includes('id="dict-grid"')) {
  const lastGridIdx = dictHtml.lastIndexOf('</div>');
  const secondLastGridIdx = dictHtml.lastIndexOf('</div>', lastGridIdx - 1);
  dictHtml = dictHtml.substring(0, secondLastGridIdx) + psychDictCards + '\n    ' + dictHtml.substring(secondLastGridIdx);
  fs.writeFileSync(dictPath, dictHtml, 'utf8');
  console.log("Successfully added 10 psychiatry cards to 14_dictionary.html!");
}


// ============================================================================
// 4. Update src/09_app.js (Add Psychiatry Drugs to DRUG_DB)
// ============================================================================
const appPath = path.join(__dirname, '..', '09_app.js');
let appJs = fs.readFileSync(appPath, 'utf8');

const newPsychDrugs = `
  // 6. 精神神経疾患・精神科薬学マスター（Core 06 追加）
  { name: "ジプレキサ", gen: "オランザピン", cat: "06. 精神神経（MARTA）", char: "多元受容体に作用し不穏・焦燥・双極性を深く鎮静！糖尿病患者には原則禁忌", desc: "D2/5-HT/H1等に作用。鎮静力と気分安定化に優れるが食欲亢進・体重増加必発。【糖尿病に原則禁忌】。定期的な血糖・HbA1c測定が法的に義務付けられている。", gId: "c6", cSec: "sec-psy" },
  { name: "セロクエル", gen: "クエチアピンフマル酸塩", cat: "06. 精神神経（MARTA）", char: "鎮静・催眠作用が強くEPSが極めて少ない！糖尿病患者には原則禁忌", desc: "半減期が短く眠気・鎮静が強い。パーキンソン病患者の精神症状にも使いやすい。オランザピン同様【糖尿病患者に原則禁忌】。急激な高血糖昏睡に厳重注意。", gId: "c6", cSec: "sec-psy" },
  { name: "リスパダール / インヴェガ", gen: "リスペリドン / パリペリドン", cat: "06. 精神神経（SDA）", char: "幻覚・妄想を最速で鎮圧する切れ味No.1！EPSと高プロラクチン血症に注意", desc: "D2と5-HT2Aを高親和性遮断。陽性症状の消火力が高い。用量依存的な錐体外路症状（手の震え）や高プロラクチン血症（無月経・乳汁分泌・女性化乳房）を定期監査。", gId: "c6", cSec: "sec-psy" },
  { name: "エビリファイ / レキサルティ", gen: "アリピプラゾール / ブレクスピプラゾール", cat: "06. 精神神経（DSS）", char: "ドパミンを正常化し過鎮静・体重増加ゼロ！うつ病増強（1〜3mg）でも大活躍", desc: "D2部分作動薬。頭が冴えて社会復帰を支援。うつ病増強療法（Augmentation）として1〜3mg少量付加が頻用。初期のアカシジア（足のムズムズ）を見逃さない。", gId: "c6", cSec: "sec-psy" },
  { name: "ラツーダ", gen: "ルラシドン塩酸塩", cat: "06. 精神神経（新世代SDA系）", char: "双極性うつ病の第一選択！体重増加がなく代謝に優しい！【食後服用厳守】", desc: "双極性障害のうつ状態に適応。オランザピンと違い体重増加が極めて少ない。空腹時服用だと吸収が約半分に激減するため【必ず食後】に服用するよう徹底指導。", gId: "c6", cSec: "sec-psy" },
  { name: "リーマス", gen: "炭酸リチウム", cat: "06. 精神神経（気分安定薬）", char: "双極性躁病・維持療法の絶対王者！治療域狭小（TDM必須）・NSAIDs併用禁忌", desc: "自殺予防効果が証明された唯一の薬。有効域（0.4〜1.2 mEq/L）が狭い。ロキソニン等のNSAIDsや降圧薬併用で腎排泄低下し【リチウム中毒（振戦・昏睡）】を招く。", gId: "c6", cSec: "sec-psy" },
  { name: "ラミクタール", gen: "ラモトリギン", cat: "06. 精神神経（気分安定薬）", char: "双極性うつ病の再発予防に最強！重篤皮疹（SJS）防止の隔週倍増ルール厳守", desc: "うつ病相の再発を強力に食い止める。初期投与量の厳守（隔週倍増）が法的に義務。バルプロ酸併用時は代謝阻害されるため半量開始。発疹・発熱時は直ちに中止受診。", gId: "c6", cSec: "sec-psy" },
  { name: "コンサータ", gen: "メチルフェニデート塩酸塩徐放錠", cat: "06. 精神神経（中枢刺激薬）", char: "ADHDの中核薬！即効性・効果絶大！【適正流通管理システム・登録制】", desc: "DAT/NET阻害でドパミン急増。朝1回で約12時間集中力持続。登録医・登録薬局・患者カードの全照合が必須。処方上限30日。朝食直後服用で食欲減退・不眠を防止。", gId: "c6", cSec: "sec-psy" },
  { name: "ストラテラ", gen: "アトモキセチン塩酸塩", cat: "06. 精神神経（非中枢刺激薬）", char: "依存性ゼロ・登録制度不要のADHD薬！24時間穏やかに効果が持続", desc: "選択的NET阻害薬。効果発現まで2〜4週間かかるが24時間効果が持続し夕方の家庭生活も安定。悪心・頭痛に注意。登録不要で長期処方しやすい。", gId: "c6", cSec: "sec-psy" },
  { name: "インチュニブ", gen: "グアンファシン塩酸塩徐放錠", cat: "06. 精神神経（非中枢刺激薬）", char: "衝動性・多動性・イライラを劇的鎮静！【急な中止で反跳性高血圧注意】", desc: "シナプス後α2A受容体作動薬。前頭前皮質を強化し衝動性を抑える。眠気・低血圧に注意。急激な断薬でリバウンド高血圧を起こすため必ず徐々に漸減する。", gId: "c6", cSec: "sec-psy" },
`;

const targetPos = appJs.indexOf('cSec: "sec-home" },');
if (targetPos !== -1) {
  const insertPos = targetPos + 'cSec: "sec-home" },'.length;
  appJs = appJs.substring(0, insertPos) + '\n' + newPsychDrugs + appJs.substring(insertPos);
  fs.writeFileSync(appPath, appJs, 'utf8');
  console.log("Successfully inserted psychiatry drugs into 09_app.js!");
} else {
  console.error("Could not find insert position in 09_app.js");
}

console.log("=== Psychiatry Comprehensive Expansion Complete! ===");
