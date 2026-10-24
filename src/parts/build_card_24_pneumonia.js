const fs = require('fs');
const path = require('path');

const guidePath = path.join(__dirname, '..', '03_guide.html');
let guideHtml = fs.readFileSync(guidePath, 'utf8');

// 1. サイドバー更新（全23大疾患 ➔ 全24大疾患）
guideHtml = guideHtml.replace(
  '<span>🌟 全23大疾患を表示</span>',
  '<span>🌟 全24大疾患を表示</span>'
);

const c23NavAnchor = '<li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard(\'c23\', this)"><span>23. 褥瘡・創傷外用療法</span><span class="guide-nav-badge">Wound</span></a></li>';

const c24NavLink = `
        <li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c24', this)"><span>24. 肺炎・呼吸器感染症</span><span class="guide-nav-badge">Pneumonia</span></a></li>`;

if (!guideHtml.includes("filterGuideCard('c24'")) {
  guideHtml = guideHtml.replace(c23NavAnchor, c23NavAnchor + c24NavLink);
}

// 2. Core 24 カード本体
const card24Html = `
  <!-- 24. 肺炎・呼吸器感染症（小児〜成人〜誤嚥性） -->
  <div class="card" id="c24">
    <div class="card-header">
      <span class="tag">Core 24 / Pulmonology & Pneumonia Master</span>
      <h2 class="card-title">24. 肺炎・呼吸器感染症（小児・市中・誤嚥性・非定型・薬剤性）</h2>
    </div>
    <div class="catchphrase">
      🎯 一言でいうと：「肺炎は『年齢・原因菌・誤嚥リスク』で薬が180度変わる！小児マイコプラズマの耐性菌対策から高齢者の誤嚥予防まで見抜くのがプロ！」
    </div>

    <!-- 📊 ガイドライン第一選択・条件分岐アルゴリズムフローチャート -->
    <div class="algo-flow-container">
      <div class="algo-header">
        <div class="algo-title-group">
          <span class="algo-tag">Clinical Flowchart</span>
          <h3 class="algo-title">📊 24. 肺炎 年齢・病態別 第一選択・条件分岐アルゴリズム</h3>
        </div>
        <span class="algo-goal-badge">🎯 目標：適切なエンピリック治療 ＆ マクロライド耐性打破 ＆ 誤嚥再発阻止</span>
      </div>
      <div class="decision-tree-grid">

        <!-- 枝1: 小児の肺炎 -->
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［小児肺炎（幼児〜学童期）］</span>
            <span class="branch-target">細菌性（肺炎球菌） vs マイコプラズマ（学童期の頑固な乾性咳）</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">細菌性（肺炎球菌等）</div>
              <div class="step-drug">アモキシシリン高用量（サワシリン 40〜50mg/kg/日 分3）</div>
              <div class="step-rationale">耐性肺炎球菌（PRSP）を打破する十分な血中濃度を確保。※セフェム細粒より確実！</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ワイドシリン')">サワシリン細粒</span></div>
            </div>
            <div class="step-arrow">➔</div>
            <div class="step-card second-choice">
              <div class="step-pill second">マイコプラズマ（第一選択）</div>
              <div class="step-drug">マクロライド系（クラリス / ジスロマック）</div>
              <div class="step-rationale">細胞壁がないためペニシリン/セフェムは構造上100%無効！マクロライドで蛋白合成阻害。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('クラリス細粒')">クラリス細粒</span><span class="flow-chip" onclick="quickSearch('ジスロマック')">ジスロマック細粒</span></div>
            </div>
            <div class="step-arrow">➔</div>
            <div class="step-card third-choice">
              <div class="step-pill third">耐性マイコプラズマ（48h解熱せず）</div>
              <div class="step-drug">8歳以上：ミノマイシン ／ 8歳未満：オゼックス細粒</div>
              <div class="step-rationale">8歳未満のテトラサイクリンは歯牙着色・骨発育不全のため禁忌！小児用キノロン（オゼックス）へ。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('オゼックス細粒')">オゼックス細粒</span><span class="flow-chip" onclick="quickSearch('ミノマイシン')">ミノマイシン</span></div>
            </div>
          </div>
        </div>

        <!-- 枝2: 成人市中肺炎 -->
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［成人市中肺炎（CAP：外来治療）］</span>
            <span class="branch-target">細菌性（喀痰あり・WBC高値） vs 非定型（乾性咳・若年・白血球正常）</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">細菌性（肺炎球菌等）</div>
              <div class="step-drug">サワシリン高用量（500mg 1日3〜4回） または オーグメンチン併用</div>
              <div class="step-rationale">%T>MICを最大化。インフルエンザ菌（BLNAR）合併疑いならクラブラン酸配合へ。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('サワシリン')">サワシリン</span><span class="flow-chip" onclick="quickSearch('オーグメンチン')">オーグメンチン</span></div>
            </div>
            <div class="step-arrow">➔</div>
            <div class="step-card second-choice">
              <div class="step-pill second">非定型 / 重症 / レジオネラ疑い</div>
              <div class="step-drug">レスピラトリーキノロン（ジェニナック / ラスビック / レボフロキサシン）</div>
              <div class="step-rationale">肺炎球菌と非定型菌（マイコプラズマ・レジオネラ）を1剤で強力にカバー。1日1回投与。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ジェニナック')">ジェニナック</span><span class="flow-chip" onclick="quickSearch('ラスビック')">ラスビック</span><span class="flow-chip" onclick="quickSearch('クラビット')">クラビット</span></div>
            </div>
          </div>
        </div>

        <!-- 枝3: 高齢者・誤嚥性肺炎 -->
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［誤嚥性肺炎（Aspiration：高齢者・在宅）］</span>
            <span class="branch-target">口腔内嫌気性菌 ＋ 肺炎球菌・グラム陰性桿菌（不顕性誤嚥）</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">治療第一選択（嫌気性菌カバー）</div>
              <div class="step-drug">ユナシン（アンピシリン/スルバクタム点滴） / オーグメンチン経口</div>
              <div class="step-rationale">誤嚥した唾液中のペプトストレプトコッカス等の嫌気性菌をスルバクタム/クラブラン酸で叩く。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ユナシン')">ユナシン点滴</span><span class="flow-chip" onclick="quickSearch('オーグメンチン')">オーグメンチン</span></div>
            </div>
            <div class="step-arrow">➔</div>
            <div class="step-card second-choice">
              <div class="step-pill second">再発予防薬（咳・嚥下反射改善）</div>
              <div class="step-drug">ACE阻害薬 ＋ シロスタゾール ＋ 半夏厚朴湯（ツムラ16）</div>
              <div class="step-rationale">サブスタンスPを増加させて低下した嚥下反射・咳反射を呼び覚まし、誤嚥の芽を摘む！</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('エースコール')">ACE阻害薬</span><span class="flow-chip" onclick="quickSearch('プレタール')">プレタール</span><span class="flow-chip" onclick="quickSearch('半夏厚朴湯')">半夏厚朴湯</span></div>
            </div>
          </div>
        </div>

      </div>
      <div class="algo-footer-pitfall">
        <strong>⚠️ 処方監査・超特級チェック：</strong>
        <span>
          ① 8歳未満の小児にテトラサイクリン系（ミノマイシン等）は「歯牙着色（黄色〜褐色沈着・エナメル質形成不全）」「骨発育不全」を起こすため原則禁忌！耐性マイコプラズマにはオゼックス細粒。<br>
          ② レジオネラ肺炎（温泉・給湯器・加湿器）は高熱・意識障害・低Na血症を伴い重篤化！ペニシリン/セフェムは無効、キノロン系/マクロライド点滴が必須。<br>
          ③ プレドニン、MTX、アミオダロン、分子標的薬服用中の「階段を登るときの息切れ・空咳」は薬剤性間質性肺炎の赤信号！
        </span>
      </div>
    </div>

    <!-- 臨床詳細ボックス（Grid-2） -->
    <div class="grid-2">
      <div class="box">
        <h3>🔍 細菌性 vs 非定型肺炎の鑑別（新明石スコア）</h3>
        <ul>
          <li><strong>非定型肺炎（マイコプラズマ・クラミドフィラ）を疑う6項目：</strong>
            <br>① 年齢 &lt; 60歳
            <br>② 基礎疾患がない、または軽微
            <br>③ 頑固な咳（乾性咳嗽）が続く
            <br>④ 胸部聴診所見が乏しい（ラ音があまり聞こえない）
            <br>⑤ 痰が出ない、または迅速塗抹で菌が見当たらない
            <br>⑥ 末梢血白血球数 &lt; 10,000 /μL
            <br>➔ <strong>4項目以上当てはまれば「非定型肺炎」の可能性大！マクロライドやキノロン系を選択する根拠となる。</strong>
          </li>
        </ul>
      </div>
      <div class="box">
        <h3>👶 小児マイコプラズマ肺炎のリアルな現場対応</h3>
        <ul>
          <li><strong>細胞壁がない＝ペニシリン・セフェムは効かない：</strong>
            「咳がひどいからワイドシリンを飲み続けているが全く熱が下がらない」という小児はマイコプラズマの典型。
          </li>
          <li><strong>マクロライド耐性菌への切り替え判断：</strong>
            クラリスやジスロマックを開始して**48〜72時間経っても有熱が持続**する場合、耐性菌と判断して薬剤を変更する。
          </li>
        </ul>
      </div>
    </div>

    <!-- 処方箋のウラ読み -->
    <div class="offlabel">
      <h3>🕵️‍♂️ 処方箋のウラ読み（適応外・意外な処方意図・予防戦略）</h3>
      <ul>
        <li><strong>高血圧でもない脳梗塞高齢者にタナトリル（ACE阻害薬）やプレタール（シロスタゾール）：</strong>
          降圧や抗血小板目的ではなく、**「誤嚥性肺炎予防」**！ブラジキニン分解抑制やPDE3阻害により「サブスタンスP」を増やし、麻痺した嚥下反射・むせ（咳反射）を取り戻させる。
        </li>
        <li><strong>免疫抑制・ステロイド大量投与患者にバクタ（ST合剤）週3回（月・水・金）：</strong>
          膀胱炎治療ではなく、日和見感染症である**「ニューモシスチス肺炎（PCP）」の予防投与**！1日1錠または週3回の少量連用で致死的な肺炎を防ぐ。
        </li>
      </ul>
    </div>

    <!-- 先輩からの現場の勘所 -->
    <div class="pearl">
      <h3>💡 先輩からの現場の勘所（Clinical Pearls）</h3>
      <ul>
        <li><strong>オゼックス小児用細粒（トスフロキサシン）の適正監査：</strong>
          小児へのキノロン系は関節軟骨障害の懸念から慎重投与。「耐性マイコプラズマ」や「ペニシリン耐性肺炎球菌（PRSP）」など他の抗菌薬が無効な場合に限り、厳格な体重換算（1回6mg/kg 1日2回）で使用されているか確認する。
        </li>
        <li><strong>ジスロマック（アジスロマイシン）の「3日間飲んで7日間効く」仕組み：</strong>
          組織移行性が異常に高く、白血球やマクロファージの中に取り込まれて感染局所に高濃度で留まるため、3日間の内服で約1週間抗菌力が持続する。飲み忘れに強いが、効果判定には時間がかかる。
        </li>
      </ul>
    </div>

    <div class="question-box">
      <strong>🙋‍♂️ 実習生への問いかけ：</strong>「マイコプラズマ肺炎と診断された6歳の男の子に、医師が『ミノマイシン錠』を処方してきました。あなたはこの処方箋を見て、薬剤師としてどんな疑義照会・処方提案を行いますか？歯や骨への影響を含めて説明できる？」
    </div>

    <div class="memo-area">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <strong style="color:#0f172a; font-size:0.92rem;">📝 実習生 症例ディスカッション＆メモ欄（印刷後手書き用）：</strong>
        <span style="font-size:0.75rem; color:#64748b; border:1px solid #cbd5e1; padding:2px 10px; border-radius:4px; background:white;">指導薬剤師 印：　　　　</span>
      </div>
      <div style="font-size:0.85rem; color:#64748b; line-height:1.5;">
        ・患者年齢・原因菌鑑別（細菌性 vs 非定型 vs 誤嚥性）：<br>
        ・抗菌薬選択（小児禁忌チェック・耐性菌対策）・誤嚥予防薬の提案：
      </div>
    </div>
  </div>
`;

// 3. 挿入位置（Core 23の末尾、</div><!-- /#tab-guide --> の直前）
const targetGuideClose = '</div><!-- /#tab-guide -->';
if (!guideHtml.includes('id="c24"')) {
  guideHtml = guideHtml.replace(targetGuideClose, card24Html + '\n\n' + targetGuideClose);
  fs.writeFileSync(guidePath, guideHtml, 'utf8');
  console.log("Successfully built Core 24 (Pneumonia Master) in src/03_guide.html");
} else {
  console.log("Core 24 already exists in src/03_guide.html");
}
