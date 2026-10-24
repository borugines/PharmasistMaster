const fs = require('fs');
const path = require('path');

const guidePath = path.join(__dirname, '..', '03_guide.html');
let guideHtml = fs.readFileSync(guidePath, 'utf8');

const c14StartRegex = /<!--\s*14\.\s*眼科・耳鼻科[\s\S]*?<div\s+class="card"\s+id="c14">/;
const c14EndRegex = /<\/div>\s*\n\s*<!--\s*15\.\s*肝胆膵疾患/;

const matchStart = guideHtml.search(c14StartRegex);
const matchEnd = guideHtml.search(c14EndRegex);

if (matchStart === -1 || matchEnd === -1) {
  console.error("Failed to find c14 bounds in 03_guide.html");
  process.exit(1);
}

const newC14Html = `<!-- 14. 眼科疾患・点眼マスター ＆ 耳鼻科 -->
  <div class="card" id="c14">
    <div class="card-header">
      <span class="tag">Core 14 / Ophthalmology, Inhaler & ENT Master</span>
      <h2 class="card-title">14. 眼科疾患・点眼マスター ＆ 耳鼻科（緑内障・白内障・目やに・点眼指導）</h2>
    </div>
    <div class="catchphrase">
      🎯 一言でいうと：「点眼は『1回1滴・目頭押さえ・5分間隔』が絶対ルール！コンタクトの防腐剤トラップから1瓶の日数計算、白内障術後3本柱まで完全網羅！」
    </div>

    <!-- 👁️ 点眼指導・実践マスター特設カード（手技・順番・日数・コンタクト） -->
    <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:10px; padding:16px 20px; margin-bottom:22px;">
      <div style="font-weight:800; color:#0f172a; font-size:1.05rem; margin-bottom:12px; display:flex; align-items:center; gap:8px;">
        <span>💧 薬剤師が完璧にマスターすべき「点眼の科学と実務指導」</span>
      </div>
      
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:14px; margin-bottom:12px;">
        <!-- ① 1滴の量と1瓶の計算 -->
        <div style="background:white; border-left:4px solid #0284c7; border-radius:6px; padding:12px 14px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <div style="font-weight:700; color:#0369a1; font-size:0.92rem; margin-bottom:4px;">📊 ① 点眼1滴の量 ＆ 1瓶（5mL）の日数計算</div>
          <div style="font-size:0.83rem; color:#334155; line-height:1.55;">
            ・<strong>結膜嚢の許容量は「20〜30 μL」</strong>。一方、点眼器から落ちる<strong>1滴の量は「約40〜50 μL」</strong>！<br>
            ➔ <strong>1滴ですでに目から溢れるため「2〜3滴差しても効果は同じで溢れて副作用が出るだけ」！1回1滴で十分。</strong><br>
            ・<strong>1瓶（5mL）＝ 約100〜120滴</strong>。<br>
            ・<strong>日数計算公式：</strong><br>
            　・1日1回 両眼点眼（キサラタン等）：1日2滴 ➔ <strong>約50日分</strong><br>
            　・1日4回 両眼点眼（クラビット等）：1日8滴 ➔ <strong>約12〜13日分</strong>（1ヶ月なら2〜3本必要）<br>
            ・<strong>使用期限：</strong>開封後は雑菌繁殖を防ぐため<strong>「原則1ヶ月で破棄」</strong>。
          </div>
        </div>

        <!-- ② 正しい点眼手技 -->
        <div style="background:white; border-left:4px solid #10b981; border-radius:6px; padding:12px 14px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <div style="font-weight:700; color:#047857; font-size:0.92rem; margin-bottom:4px;">🎯 ② 正しい点眼手技（まばたき禁止・目頭押さえ）</div>
          <div style="font-size:0.83rem; color:#334155; line-height:1.55;">
            1. <strong>手洗い：</strong>石鹸で手指を清潔にする。<br>
            2. <strong>ノズル非接触：</strong>下まぶたを引き、<strong>容器の先が目・まつ毛・指に触れないよう</strong>点眼（菌の逆流汚染防止）。<br>
            3. <strong>まばたき（パチパチ）厳禁！：</strong>まばたきすると涙小管のポンプ作用で薬が喉へ流れ、効果半減＋全身副作用！<br>
            4. <strong>目頭（涙嚢部）を1〜5分軽く押さえる：</strong>鼻涙管への流出を防ぎ、局所効果最大化＆全身副作用防止。<br>
            5. <strong>拭き取り：</strong>あふれた液はティッシュで優しく拭き取る（かぶれ・色素沈着防止）。
          </div>
        </div>

        <!-- ③ 点眼の順番ルール -->
        <div style="background:white; border-left:4px solid #f59e0b; border-radius:6px; padding:12px 14px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <div style="font-weight:700; color:#b45309; font-size:0.92rem; margin-bottom:4px;">⏱️ ③ 点眼の順番ルール（5分間隔 ＆ 剤形順）</div>
          <div style="font-size:0.83rem; color:#334155; line-height:1.55;">
            ・<strong>2種類以上あるときは「必ず5分以上あける」！</strong>（間隔なしだと前の薬が洗い流される）。<br>
            ・<strong>差す順番の黄金順序：</strong><br>
            　<strong>① 水溶性点眼液（サラサラ）</strong>：ヒアレイン、アレジオン、キサラタン等<br>
            　<strong>② 懸濁性点眼液（白濁・にごり）</strong>：フルメトロン、カリーユニ等（振って点眼）<br>
            　<strong>③ 油性点眼液</strong><br>
            　<strong>④ ゲル化点眼液</strong>：チモプトールXE、リズモンTG<br>
            　<strong>⑤ 眼軟膏（一番最後！）</strong>：タリビッド眼軟膏等<br>
            ※ゲル化剤や眼軟膏を先に塗ると油膜で後続の薬をすべて弾いてしまう！
          </div>
        </div>

        <!-- ④ コンタクトレンズと点眼 -->
        <div style="background:white; border-left:4px solid #8b5cf6; border-radius:6px; padding:12px 14px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <div style="font-weight:700; color:#6d28d9; font-size:0.92rem; margin-bottom:4px;">👓 ④ コンタクトレンズ（CL）装着時の点眼ルール</div>
          <div style="font-size:0.83rem; color:#334155; line-height:1.55;">
            ・<strong>ソフトコンタクトレンズ（SCL）：原則「外して点眼」！</strong><br>
            　防腐剤の<strong>塩化ベンザルコニウム（BAK）</strong>がSCLに吸着・濃縮され、<strong>重篤な角膜上皮障害やレンズ変形</strong>を引き起こす！点眼後<strong>「5〜15分あけてからレンズ再装着」</strong>。<br>
            ・<strong>SCL装用中に点眼できる例外：</strong><br>
            　① 防腐剤フリー（1回使い切りPF製剤：ソフトサンティア、ヒアレインミニ等）<br>
            　② 添付文書に装用中点眼可能と明記された製剤（アレジオンLX点眼液等）<br>
            ・<strong>ハードコンタクトレンズ（HCL）：</strong>水分を含まないため原則装用したまま点眼可能（※懸濁性・油性・眼軟膏を除く）。
          </div>
        </div>
      </div>
    </div>

    <!-- 📊 ガイドライン第一選択・条件分岐アルゴリズムフローチャート -->
    <div class="algo-flow-container">
      <div class="algo-header">
        <div class="algo-title-group">
          <span class="algo-tag">Clinical Flowchart</span>
          <h3 class="algo-title">📊 14. 眼科・耳鼻科疾患 第一選択・条件分岐アルゴリズム</h3>
        </div>
        <span class="algo-goal-badge">🎯 目標：緑内障視野欠損進行停止 ＆ 白内障術後CME予防 ＆ 目やに・結膜炎適正管理</span>
      </div>
      <div class="decision-tree-grid">
        
        <!-- 枝1: 緑内障 -->
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［緑内障（開放隅角 / 正常眼圧）］</span>
            <span class="branch-target">目標眼圧達成による不可逆的視野欠損の進行阻止</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">第一選択（最強の眼圧下降）</div>
              <div class="step-drug">プロスタグランジン（PG）点眼薬（ラタノプロスト / トラボプロスト等）</div>
              <div class="step-rationale">ぶどう膜強膜流出路から房水排出。1日1回就寝前点眼。点眼後洗顔または拭き取り必須。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('キサラタン')">キサラタン</span><span class="flow-chip" onclick="quickSearch('タプロス')">タプロス</span><span class="flow-chip" onclick="quickSearch('エイベリス')">エイベリス</span></div>
            </div>
            <div class="step-arrow">➔</div>
            <div class="step-card second-choice">
              <div class="step-pill second">第二選択・追加（配合点眼薬）</div>
              <div class="step-drug">＋ β遮断薬点眼（チモプトール）または 配合剤（コソプト / タプコム）</div>
              <div class="step-rationale">房水産生抑制を追加。配合剤で本数・防腐剤負担を軽減。喘息・心疾患禁忌チェック。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('コソプト')">コソプト</span><span class="flow-chip" onclick="quickSearch('タプコム')">タプコム</span><span class="flow-chip" onclick="quickSearch('グラナテック')">グラナテック</span></div>
            </div>
          </div>
        </div>

        <!-- 枝2: 白内障治療 -->
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［白内障（進行遅延 ＆ 術前・術後管理）］</span>
            <span class="branch-target">初期混濁遅延 vs 手術前後の感染・炎症・黄斑浮腫予防</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">初期白内障進行予防</div>
              <div class="step-drug">ピレノキシン（カリーユニ） / グルタチオン（タチオン）</div>
              <div class="step-rationale">水晶体キノイド物質とタンパク質結合を阻害。※混濁を透明に戻す薬ではなく進行遅延。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('カリーユニ')">カリーユニ</span></div>
            </div>
            <div class="step-arrow">➔</div>
            <div class="step-card second-choice">
              <div class="step-pill second">白内障手術前後の鉄板3本柱</div>
              <div class="step-drug">抗菌点眼（クラビット） ＋ ステロイド（フルメトロン） ＋ NSAIDs（ブロムフェナク）</div>
              <div class="step-rationale">抗菌＝術後眼内炎予防。ステロイド＝炎症消火。NSAIDs＝【最重要】術後黄斑浮腫（CME）予防！</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ブロムフェナク')">ブロムフェナク</span><span class="flow-chip" onclick="quickSearch('フルメトロン')">フルメトロン</span></div>
            </div>
          </div>
        </div>

        <!-- 枝3: 目やに・結膜炎 -->
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［目やに・結膜炎（原因別鑑別）］</span>
            <span class="branch-target">細菌性 vs アレルギー性 vs 高齢者ドライアイ・眼瞼炎</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">細菌性（黄色・粘調な目やに）</div>
              <div class="step-drug">キノロン系点眼（レボフロキサシン / トスフロキサシン）</div>
              <div class="step-rationale">朝目が開かない黄色い目やに。耐性菌を防ぐため症状消失後もしっかり数日間使い切る。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('クラビット点眼')">クラビット点眼</span></div>
            </div>
            <div class="step-arrow">➔</div>
            <div class="step-card second-choice">
              <div class="step-pill second">高齢者ドライアイ＋目やに</div>
              <div class="step-drug">ヒアレイン / ジクアス / ムコスタ点眼 ＋ 清潔ガーゼ清拭</div>
              <div class="step-rationale">涙液分泌低下・涙道狭窄で自浄作用が低下。目をこすらず温罨法・清潔ガーゼ清拭を指導。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ヒアレイン')">ヒアレイン</span><span class="flow-chip" onclick="quickSearch('ジクアス')">ジクアス</span></div>
            </div>
          </div>
        </div>

        <!-- 枝4: メニエール病・めまい -->
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［メニエール病・内耳性めまい］</span>
            <span class="branch-target">回転性めまい・耳鳴り・難聴（内リンパ水腫）</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">第一選択（内耳水腫排泄）</div>
              <div class="step-drug">浸透圧利尿薬（イソバイド） ＋ 循環改善薬（メリスロン） ＋ 五苓散</div>
              <div class="step-rationale">浸透圧較差で内耳の余分な水分を引き抜く。まずい味の対策（冷やす、炭酸割り）。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('イソバイド')">イソバイド</span><span class="flow-chip" onclick="quickSearch('メリスロン')">メリスロン</span></div>
            </div>
          </div>
        </div>

      </div>
      <div class="algo-footer-pitfall">
        <strong>⚠️ 処方監査・超重要チェック：</strong>
        <span>
          ① 閉塞隅角緑内障患者に対する抗コリン薬（総合感冒薬、抗ヒスタミン薬、三環系抗うつ薬、過活動膀胱治療薬等）の絶対禁忌チェック！<br>
          ② PG点眼薬（キサラタン等）：虹彩色素沈着・まつ毛増毛・まぶたの黒ずみ防止のため「洗顔前点眼または濡れガーゼ拭き取り」を徹底！<br>
          ③ 白内障術後のNSAIDs点眼（ブロムフェナク等）は「痛みがなくても視力を守るため（術後黄斑浮腫CME予防）絶対に指示通り続ける」よう指導！
        </span>
      </div>
    </div>

    <!-- 臨床詳細ボックス（Grid-2） -->
    <div class="grid-2">
      <div class="box">
        <h3>👁️ 緑内障の「2つのタイプ」を必ず聞き分けろ！</h3>
        <ul>
          <li><strong>① 開放隅角緑内障（日本人の約8〜9割・正常眼圧緑内障含む）：</strong>
            房水の出口（隅角）は開いているが線維柱帯が目詰まりしている。実は<strong>抗コリン薬や風邪薬の多くは使用可能！</strong>
          </li>
          <li><strong>② 閉塞隅角緑内障（禁忌の対象！）：</strong>
            出口がもともと狭い。ここに抗コリン薬や交感神経刺激薬を使うと瞳孔が開いて出口が完全に塞がり、<strong>急性緑内障発作（激しい頭痛・眼痛・嘔吐・失明危機）</strong>を起こす！患者がどちらか不明な場合は眼科医へ確認。
          </li>
        </ul>
      </div>
      <div class="box">
        <h3>👵 高齢者の目やにとドライアイの真相</h3>
        <ul>
          <li><strong>「目やにが出るから抗菌目薬」の落とし穴：</strong>
            高齢者の慢性的目やには、細菌感染ではなく<strong>「加齢によるドライアイ＋マイボーム腺機能不全（眼瞼炎）」</strong>が原因のことが多い。油層が足りず涙が蒸発し、目の自浄作用が低下して目やにがこびりつく。
          </li>
          <li><strong>指導のコツ：</strong>
            目頭を清潔な温かい濡れタオルで温めて油を溶かし、優しく拭き取る。抗菌薬の漫然点眼は耐性菌を作るため避ける。
          </li>
        </ul>
      </div>
    </div>

    <!-- 処方箋のウラ読み -->
    <div class="offlabel">
      <h3>🕵️‍♂️ 処方箋のウラ読み（適応外・意外な処方意図）</h3>
      <ul>
        <li><strong>白内障手術後にNSAIDs点眼（ブロムフェナク/ネバナック等）が何週間も出ている理由：</strong>
          「痛み止め」ではなく、手術の刺激で出たプロスタグランジンが眼底に届いて視力が落ちる<strong>『術後黄斑浮腫（CME）』を防ぐため</strong>！「痛くないから差すのをやめました」という患者が最も危険。
        </li>
        <li><strong>めまい患者に出る「アデホス（ATP）＋メリスロン＋五苓散」：</strong>
          内耳の微小循環を改善し、水滞（内リンパ浮腫）をアクアポリン調節で速やかに捌く黄金トリオ処方。
        </li>
      </ul>
    </div>

    <!-- 先輩からの現場の勘所 -->
    <div class="pearl">
      <h3>💡 先輩からの現場の勘所（Clinical Pearls）</h3>
      <ul>
        <li><strong>β遮断薬点眼（チモプトール・コソプト等）の喘息・心臓トラップ：</strong>
          目から鼻涙管を通って全身に吸収されると、<strong>気管支喘息発作や高度徐脈・心不全悪化</strong>を起こす！点眼後は必ず「目頭（涙嚢部）を1〜5分軽く指で押さえる」手技を実演指導せよ。
        </li>
        <li><strong>イソバイドシロップ（めまい治療）の激マズ対策：</strong>
          高浸透圧で猛烈に甘苦い。「冷蔵庫でキンキンに冷やす」「無糖炭酸水やレモン水で1:1に割る」「氷を入れる」と格段に飲みやすくなる。
        </li>
      </ul>
    </div>

    <div class="question-box">
      <strong>🙋‍♂️ 実習生への問いかけ：</strong>「ソフトコンタクトレンズを着けたまま点眼薬を使ってはいけない本当の理由は何ですか？また、白内障の手術をした患者さんが『もう痛くないからブロムフェナク点眼液をやめていいですか？』と聞いてきたらどう答えますか？」
    </div>

    <div class="memo-area">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <strong style="color:#0f172a; font-size:0.92rem;">📝 実習生 症例ディスカッション＆メモ欄（印刷後手書き用）：</strong>
        <span style="font-size:0.75rem; color:#64748b; border:1px solid #cbd5e1; padding:2px 10px; border-radius:4px; background:white;">指導薬剤師 印：　　　　</span>
      </div>
      <div style="font-size:0.85rem; color:#64748b; line-height:1.5;">
        ・緑内障病型（開放/閉塞）・点眼順序（水溶性/懸濁/ゲル/軟膏）指導：<br>
        ・コンタクト装用有無・点眼手技（1滴・目頭押さえ）・1瓶日数計算：
      </div>
    </div>
  </div>`;

guideHtml = guideHtml.substring(0, matchStart) + newC14Html + "\n\n" + guideHtml.substring(matchEnd);
fs.writeFileSync(guidePath, guideHtml, 'utf8');
console.log("Successfully updated Core 14 (Ophthalmology & Inhaler Master) in src/03_guide.html");
