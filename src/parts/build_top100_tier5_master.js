const fs = require('fs');
const path = require('path');

console.log('=== Building Tier 5 (81-100) Master Completion (Final Sprint) ===');

// =========================================================================
// 1. Update src/05_comparison.html (Add Enuresis, Psoriasis, Smoking cessation)
// =========================================================================
const pComp = path.join(__dirname, '..', '05_comparison.html');
let compHtml = fs.readFileSync(pComp, 'utf8');

// A. Enuresis (夜尿症) in sec-extra
const enuresisCompHtml = `
    <div class="sub-banner banner-class" style="margin-top:20px;">
      <span>🛏️ 【夜尿症（おねしょ）治療薬 ガチンコ比較】ミニリンメルト（デスモプレシン）の水分制限と水中毒厳戒</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">分類・薬剤名</th>
          <th style="width:20%;">成分名（一般名）</th>
          <th style="width:18%;">用法・服用タイミング</th>
          <th style="width:22%;">強み・作用機序</th>
          <th style="width:26%;">現場の鑑査急所・服薬指導の鉄則</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>抗利尿ホルモン製剤</strong><br><strong>ミニリンメルトOD錠</strong></td>
          <td>デスモプレシン酢酸塩水和物<br>（60μg / 120μg）</td>
          <td><strong>1日1回 就寝直前</strong><br>水なしで舌下崩壊</td>
          <td><span class="char">夜間の尿量を直接減らす特効薬</span><br>V2受容体に選択的作用し腎集合管で水分再吸収を促進。夜尿症の第一選択。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【水中毒・低ナトリウム血症に厳戒！】</span> 服用前2〜3時間および就寝中の<strong>水分摂取を厳格に制限</strong>（夕食後のガブ飲み禁止）。頭痛、悪心・嘔吐、浮腫、傾眠は水中毒の初期徴候！</td>
        </tr>
        <tr>
          <td><strong>抗コリン薬 / TCA</strong><br>・トピトロン / ポラキス<br>・トフラニール</td>
          <td>オキシブチニン / イミプラミン</td>
          <td>就寝前服用</td>
          <td>膀胱容量を増大させ尿意切迫感を緩和。昼間遺尿や過活動膀胱併発例。</td>
          <td>口渇・便秘・眠気。三環系抗うつ薬（トフラニール）は不整脈や心毒性に注意し漫然投与回避。</td>
        </tr>
      </tbody>
    </table>
`;

// B. Psoriasis (乾癬) in sec-imm
const psoriasisCompHtml = `
    <div class="sub-banner banner-class" style="margin-top:20px;">
      <span>✨ 【尋常性乾癬 治療薬ガチンコ比較】外用配合剤（ドボベット） vs 経口PDE4阻害（オテズラ） vs 生物学的製剤</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">分類・薬剤名</th>
          <th style="width:20%;">主成分・作用機序</th>
          <th style="width:18%;">用法・用量</th>
          <th style="width:22%;">強み・特徴</th>
          <th style="width:26%;">現場の鑑査急所・ピットフォール</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>外用配合剤</strong><br><strong>ドボベット<br>（軟膏 / ゲル / フォーム）</strong></td>
          <td>カルシポトリオール（活性型VitD3）<br>＋ ベタメタゾンジプロピオン酸エステル</td>
          <td>1日1回 患部に塗布<br>（フォームはよく振る）</td>
          <td><span class="char">乾癬外用の絶対的ゴールドスタンダード</span><br>角化抑制（VitD3）＋ 強力消炎（ステロイド）の相乗効果で紅斑・肥厚・落屑を急速改善。</td>
          <td>週90g（フォームは週60g）上限。<span style="color:#b91c1c; font-weight:bold;">高カルシウム血症に注意</span>（骨粗鬆症でエディロール等内服中は血清Ca定期採血）。フォーム剤は火気厳禁。</td>
        </tr>
        <tr>
          <td><strong>経口PDE4阻害薬</strong><br><strong>オテズラ錠</strong></td>
          <td>アプレミラスト<br>（10mg / 20mg / 30mg）</td>
          <td>1日2回 朝・夕<br><strong>5日間の初期漸増投与</strong></td>
          <td><span class="char">注射を避けたい中等症乾癬の内服薬</span><br>細胞内cAMPを高め炎症性サイトカインを全般的に抑制。爪乾癬や関節症性乾癬にも有効。</td>
          <td>投与初期の**「下痢・悪心」**が高率に出るため専用スターターパックで漸増。抑うつ症状・体重減少のモニタリング。</td>
        </tr>
      </tbody>
    </table>
`;

// C. Smoking cessation (禁煙) in sec-extra
const smokingCompHtml = `
    <div class="sub-banner banner-class" style="margin-top:20px;">
      <span>🚭 【禁煙治療薬 ガチンコ比較】チャンピックス（バレニクリン） vs ニコチネルパッチ（貼付中喫煙絶対禁止）</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">分類・薬剤名</th>
          <th style="width:20%;">成分名・作用機序</th>
          <th style="width:18%;">用法・治療期間</th>
          <th style="width:22%;">強み・禁煙成功率</th>
          <th style="width:26%;">現場の鑑査急所・服薬指導の鉄則</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>経口禁煙治療薬</strong><br><strong>チャンピックス錠</strong></td>
          <td>バレニクリン酒石酸塩<br>（α4β2ニコチン受容体部分作動薬）</td>
          <td>1日2回 食後<br><strong>12週間プログラム</strong></td>
          <td><span class="char">ニコチン切れの離脱症状とタバコへの満足感を両面ブロック</span><br>禁煙開始予定日の1週間前から吸いながら服用開始。最も高い禁煙成功率。</td>
          <td>悪心・嘔吐（食後服用で軽減）。眠気・めまいがあるため**「自動車運転等の危険作業は絶対禁止」**！抑うつ・気分変化の初期指導。</td>
        </tr>
        <tr>
          <td><strong>経皮ニコチン製剤</strong><br><strong>ニコチネル パッチ</strong></td>
          <td>ニコチン（経皮吸収TTS）<br>（20 ➔ 10 へステップダウン）</td>
          <td>1日1回 朝起床時貼付<br><strong>8週間プログラム</strong></td>
          <td>タバコを吸わずにニコチンだけを経皮補給し離脱症状を緩和。OTC第1類でも購入可能。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【パッチ貼付中の喫煙は絶対禁止！】</span> 急性ニコチン中毒・不整脈・心筋梗塞のリスク。急性心疾患（3ヶ月以内）禁忌。</td>
        </tr>
      </tbody>
    </table>
`;

// Insert into 05_comparison.html
const extraMarker = '<div class="comp-section sec-extra">';
if (!compHtml.includes('【夜尿症（おねしょ）治療薬 ガチンコ比較】')) {
  if (compHtml.includes(extraMarker)) {
    compHtml = compHtml.replace(extraMarker, extraMarker + '\n' + enuresisCompHtml + '\n' + smokingCompHtml);
    console.log('Successfully inserted Enuresis and Smoking cessation tables into 05_comparison.html!');
  }
}

const immMarker = '<div class="comp-section sec-imm">';
if (!compHtml.includes('【尋常性乾癬 治療薬ガチンコ比較】')) {
  if (compHtml.includes(immMarker)) {
    compHtml = compHtml.replace(immMarker, immMarker + '\n' + psoriasisCompHtml);
    console.log('Successfully inserted Psoriasis table into 05_comparison.html!');
  }
}

fs.writeFileSync(pComp, compHtml, 'utf8');

// =========================================================================
// 2. Update src/03_guide.html (Enhance c18, c16, c14 with Pearls)
// =========================================================================
const pGuide = path.join(__dirname, '..', '03_guide.html');
let guideHtml = fs.readFileSync(pGuide, 'utf8');

// Enhance c18 (夜尿症ミニリンメルト)
const c18Target = '<li><strong>粉薬を飲ませる時の「混ぜてはいけない禁忌」：</strong>';
const c18Add = `<li><strong>小児夜尿症（ミニリンメルト）の「水中毒」絶対厳戒ルール：</strong>抗利尿ホルモン製剤で夜間尿を減らす特効薬だが、<strong>「服用前2〜3時間および就寝中の飲水制限」</strong>を守らないと、体内に水分が溜まり血液中のNaが急降下して「重篤な水中毒（激しい頭痛・嘔吐・意識混濁・痙攣）」を引き起こす！夕食後の水分補給をコップ1杯以下に抑えさせる指導が必須。</li>
        <li><strong>粉薬を飲ませる時の「混ぜてはいけない禁忌」：</strong>`;

if (!guideHtml.includes('小児夜尿症（ミニリンメルト）')) {
  if (guideHtml.includes(c18Target)) {
    guideHtml = guideHtml.replace(c18Target, c18Add);
    console.log('Enhanced c18 with Enuresis pearls!');
  }
}

// Enhance c16 (乾癬・掌蹠膿疱症)
const c16Target = '<li><strong>ステロイド外用薬を塗る「量」の基準＝FTU（フィンガーチップユニット）：</strong>';
const c16Add = `<li><strong>尋常性乾癬（ドボベット・オテズラ）と掌蹠膿疱症の指導急所：</strong>
          <br>・<strong>ドボベット配合剤（軟膏・ゲル・フォーム）：</strong>VitD3＋ステロイドで最強の局所効果。フォーム剤は頭皮や広範囲に塗りやすい（使用直前によく振る、火気厳禁）。骨粗鬆症治療中の高齢者では高Ca血症チェック。
          <br>・<strong>掌蹠膿疱症：</strong>手足の無菌性膿疱。最大の増悪因子は「喫煙」と「歯科病巣感染（歯周病・慢性扁桃炎）」であるため、外用治療と同時に<strong>禁煙指導と歯科受診勧奨</strong>をセットで行う。</li>
        <li><strong>ステロイド外用薬を塗る「量」の基準＝FTU（フィンガーチップユニット）：</strong>`;

if (!guideHtml.includes('尋常性乾癬（ドボベット・オテズラ）')) {
  if (guideHtml.includes(c16Target)) {
    guideHtml = guideHtml.replace(c16Target, c16Add);
    console.log('Enhanced c16 with Psoriasis pearls!');
  }
}

// Enhance c14 (乗物酔い)
const c14Target = '<li><strong>「目薬を差した後にパチパチまばたきをするな！」：</strong>';
const c14Add = `<li><strong>乗物酔い（動揺病）予防薬の服用タイミング：</strong>トラベルミンやアネロンなどの市販薬・処方薬は、酔ってから飲むよりも<strong>「乗車・乗船の30分前」に先行服用</strong>させるのが鉄則。抗コリン作用・抗ヒスタミン作用を含むため、緑内障・前立腺肥大症の既往確認と運転禁止を伝える。</li>
        <li><strong>「目薬を差した後にパチパチまばたきをするな！」：</strong>`;

if (!guideHtml.includes('乗物酔い（動揺病）予防薬の服用タイミング')) {
  if (guideHtml.includes(c14Target)) {
    guideHtml = guideHtml.replace(c14Target, c14Add);
    console.log('Enhanced c14 with Motion sickness pearls!');
  }
}

fs.writeFileSync(pGuide, guideHtml, 'utf8');

// =========================================================================
// 3. Update src/16_top100.html (Set 81-100 to status: "ok" with full details)
// =========================================================================
const pTop100 = path.join(__dirname, '..', '16_top100.html');
let top100Html = fs.readFileSync(pTop100, 'utf8');

const tier5FullData = [
  { rank: 81, name: "子宮内膜症・子宮筋腫", cat: "婦人科", guideId: "c13", compId: "sec-extra", drugs: "レルミナ（レルゴリクス）、ディナゲスト（ジエノゲスト）、ヤーズ、リュープリン", key: "経口GnRHレルミナ（必ず食前服用・骨密度低下のため原則6ヶ月上限）、ディナゲスト（不正出血の事前説明）、LEP製剤。" },
  { rank: 82, name: "膣カンジダ症・細菌性膣症", cat: "婦人科・感染症", guideId: "tab-otc", compId: "sec-inf", drugs: "オキナゾール膣錠、メディトリート、フロリード、フラジール内服/膣錠", key: "膣カンジダ（確定診断後の再発に限る、就寝前膣深部挿入）、細菌性膣症（フラジール：内服中アルコール絶対禁止！ジスルフィラム様作用）。" },
  { rank: 83, name: "不妊症（排卵誘発・ホルモン補充）", cat: "産婦人科・生殖", guideId: "c22", compId: "sec-extra", drugs: "クロミッド、レトロゾール、ウトロゲスタン、ルティナス、デュファストン", key: "排卵誘発（クロミッド多胎妊娠注意）、黄体補充（ウトロゲスタン膣用カプセル：指定時間厳守・眠気めまい）、自己注射ゴナールエフ。" },
  { rank: 84, name: "勃起不全（ED）・男性更年期障害", cat: "泌尿器", guideId: "c9", compId: "sec-extra", drugs: "シアリス（タダラフィル）、バイアグラ、レビトラ、エナント酸テストステロン", key: "PDE5阻害薬（**硝酸薬・ニトログリセリン服用中は絶対併用禁忌！致死性血圧低下**）、食事の影響（シアリス影響小、バイアグラ空腹時）。" },
  { rank: 85, name: "男性型脱毛症（AGA）・円形脱毛症", cat: "皮膚科", guideId: "tab-otc", compId: "sec-extra", drugs: "プロペシア（フィナステリド）、ザガーロ（デュタステリド）、リアップ、オルミエント", key: "5α還元酵素阻害薬（プロペシア/ザガーロ：**妊婦・授乳婦・小児の接触粉砕絶対禁忌！男子胎児外生殖器発育障害**）、円形脱毛JAK阻害薬。" },
  { rank: 86, name: "夜尿症（おねしょ）", cat: "小児科・泌尿器", guideId: "c18", compId: "sec-extra", drugs: "ミニリンメルトOD錠（デスモプレシン）、トピトロン、トフラニール", key: "就寝直前舌下崩壊、**服用前2〜3時間および就寝中の飲水制限厳守（水中毒・低Na血症予防）**、頭痛・悪心・嘔吐は受診勧奨。" },
  { rank: 87, name: "熱性けいれん（小児）", cat: "小児科", guideId: "c18", compId: "sec-psy", drugs: "ダイアップ坐剤（ジアゼパム 4mg/6mg）", key: "発熱初期37.5℃時1回目挿入、**8時間後に熱が下がらなければ必ず2回目挿入**、解熱剤坐剤（アンヒバ等）併用時は30分あける。" },
  { rank: 88, name: "溶連菌感染症（A群溶血性レンサ球菌咽頭炎）", cat: "小児科・感染症", guideId: "c27", compId: "sec-inf", drugs: "サワシリン（アモキシシリン）、ワイドシリン、セファクロル", key: "急性期解熱しても**ペニシリン系を10日間確実に飲み切らせる！（リウマチ熱・急性糸球体腎炎予防）**、2〜3週後の検尿指導。" },
  { rank: 89, name: "手足口病・ヘルパンギーナ", cat: "小児科・感染症", guideId: "c18", compId: "sec-inf", drugs: "カロナール、口腔用アズノール軟膏、経口補水液（OS-1）", key: "特異的抗ウイルス薬なし（対症療法）、口腔内水疱痛による摂食・飲水困難対策（脱水防止・冷たいプリンや麦茶推奨）、髄膜炎初期警戒。" },
  { rank: 90, name: "水痘（みずぼうそう）・伝染性軟属腫（水いぼ）", cat: "小児科・皮膚科", guideId: "c18", compId: "sec-imm", drugs: "バルトレックス、ゾビラックス、カチリフェノール、ゲンタシン軟膏", key: "水痘（発症早期抗ウイルス薬内服、**全皮疹が痂皮化するまで出席停止**）、水いぼ（自然治癒傾向・小児プール配慮・摘除指導）。" },
  { rank: 91, name: "伝染性膿痂疹（とびひ）", cat: "皮膚科・小児科", guideId: "c18", compId: "sec-imm", drugs: "フシジンレオ軟膏、アクアチム軟膏、セフカペンピボキシル、ケフラール", key: "黄色ブドウ球菌・化膿レンサ球菌、石鹸泡洗浄で清潔にしてから外用塗布、掻破拡大防止（爪を短く切る・ガーゼ保護）、セフェム内服。" },
  { rank: 92, name: "尋常性乾癬", cat: "皮膚科", guideId: "c16", compId: "sec-imm", drugs: "ドボベット（軟膏/ゲル/フォーム）、オテズラ、スキリージ、トレムフィア", key: "外用配合剤ドボベット（1日1回・高Ca血症注意・週上限90g/60g）、内服オテズラ（初期下痢悪心・漸増）、生物学的製剤感染症スクリーニング。" },
  { rank: 93, name: "掌蹠膿疱症", cat: "皮膚科", guideId: "c16", compId: "sec-imm", drugs: "ドボベット、ストロングステロイド外用、ビオチン散、トレムフィア", key: "手足の無菌性膿疱、**最大の悪化因子は「喫煙」と「歯科病巣感染（歯周病・扁桃炎）」**、外用継続と同時に禁煙・歯科受診指導。" },
  { rank: 94, name: "尋常性白斑・肝斑（しみ）", cat: "皮膚科・美容", guideId: "tab-otc", compId: "sec-imm", drugs: "トランシーノII、トラネキサム酸、シナール、プロトピック軟膏、紫外線療法", key: "肝斑（トランシーノII：1回2錠1日2回・最大2ヶ月服用後必ず2ヶ月休薬・血栓症禁忌）、白斑（プロトピック外用・ステロイド）。" },
  { rank: 95, name: "熱傷（やけど）・日焼け", cat: "皮膚科・外傷", guideId: "c23", compId: "sec-imm", drugs: "ゲーベンクリーム（銀中毒注意）、プロペト、アズノール軟膏、創傷被覆材", key: "直後の流水冷却（20分以上・水疱破かない）、感染予防と湿潤環境維持、重症深部熱傷の植皮連携。" },
  { rank: 96, name: "褥瘡（床ずれ）", cat: "皮膚科・在宅", guideId: "c23", compId: "sec-imm", drugs: "カデックス軟膏、ゲーベンクリーム、プロスタンディン、アクトシン軟膏", key: "DESIGN-R評価（黒色壊死期カデックス ➔ 黄色感染期ゲーベン ➔ 赤色肉芽期プロスタンディン/アクトシン ➔ 白色上皮化）、体位変換。" },
  { rank: 97, name: "乗物酔い（動揺病）", cat: "耳鼻科・OTC", guideId: "c14", compId: "sec-extra", drugs: "トラベルミン、アネロンニスキャップ、センパア、トラベルミンR", key: "乗車・乗船の**「30分前」に先行服用**、抗コリン・抗ヒスタミン（緑内障・前立腺肥大禁忌、眠気運転禁止）。" },
  { rank: 98, name: "ニコチン依存症（禁煙治療）", cat: "禁煙外来", guideId: "c11", compId: "sec-extra", drugs: "チャンピックス錠（バレニクリン）、ニコチネルパッチ（TTS）", key: "チャンピックス（禁煙予定1週間前開始・運転禁止・悪心食後軽減）、ニコチネルパッチ（**貼付中の喫煙絶対禁止！心筋梗塞死リスク**）。" },
  { rank: 99, name: "睡眠時無呼吸症候群（SAS）", cat: "呼吸器・睡眠", guideId: "c20", compId: "sec-psy", drugs: "CPAP療法（経鼻的持続陽圧呼吸）、ナステント、減量指導", key: "閉塞性SASへのCPAPアドヒアランス指導、**ベンゾジアゼピン系睡眠薬は筋弛緩作用で無呼吸を悪化させるため原則禁忌（オレキシン拮抗薬推奨）**。" },
  { rank: 100, name: "がん性疼痛・化学療法の副作用対策（制吐剤・支持療法など）", cat: "腫瘍・緩和ケア", guideId: "c1", compId: "sec-onc", drugs: "オキシコンチン、フェントステープ、モルヒネ、アプレピタント、スインプロイク", key: "WHO方式がん疼痛治療法（オピオイド換算表活用）、便秘対策スインプロイク（末梢μ拮抗薬）併用、遅発性嘔気アプレピタント＋デキサメタゾン。" }
];

let newRange5Cards = '';
tier5FullData.forEach(item => {
  const badgeHtml = '<span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>';
  const borderStyle = 'border-left: 4px solid #16a34a;';
  const rankBadge = '<span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">' + item.rank + '位</span>';

  let jumpBtns = '';
  if (item.guideId) {
    if (item.guideId.startsWith('c')) {
      jumpBtns += '<button class="dict-jump-btn" onclick="jumpToGuide(\'' + item.guideId + '\')">📘 ガイド</button>';
    } else {
      jumpBtns += '<button class="dict-jump-btn" onclick="switchTab(\'' + item.guideId + '\')">🚀 関連タブ</button>';
    }
  }
  if (item.compId) {
    jumpBtns += '<button class="dict-jump-btn" onclick="jumpToSpecialTab(\'tab-comparison\', \'' + item.compId + '\')">⚔️ 比較</button>';
  }
  jumpBtns += '<button class="dict-jump-btn" onclick="quickSearch(\'' + item.name.split('（')[0] + '\')">🔍 検索</button>';

  newRange5Cards += '        <div class="card" style="margin:0; padding:14px; ' + borderStyle + ' background:#ffffff;">\n' +
    '          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">\n' +
    '            <div style="display:flex; align-items:center; gap:8px;">\n' +
    '              ' + rankBadge + '\n' +
    '              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">' + item.name + '</h3>\n' +
    '            </div>\n' +
    '            ' + badgeHtml + '\n' +
    '          </div>\n' +
    '          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>' + item.cat + '</strong></div>\n' +
    '          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">\n' +
    '            <strong>💊 代表薬：</strong> ' + item.drugs + '\n' +
    '          </div>\n' +
    '          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">\n' +
    '            <strong>🎯 鑑査・服薬指導の急所：</strong><br>' + item.key + '\n' +
    '          </div>\n' +
    '          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">\n' +
    '            ' + jumpBtns + '\n' +
    '          </div>\n' +
    '        </div>\n';
});

// Replace Range 5 block in 16_top100.html
const range5Regex = /<!-- ==================== 【第5弾】81位〜100位（小児・皮膚・泌尿器・専門領域） ==================== -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*$/;
const newRange5Block = `<!-- ==================== 【第5弾】81位〜100位（小児・皮膚・泌尿器・専門領域） ==================== -->
    <div id="top100-range-r5" class="top100-range-pane" style="display:none;">
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:14px;">
${newRange5Cards}      </div>
    </div>

  </div>
</div>
`;

top100Html = top100Html.replace(range5Regex, newRange5Block);

// Update status summary in 16_top100.html
const statusRegex = /<span style="color:#16a34a; margin-left:8px; font-weight:900;">[\s\S]*?<\/span>/;
const updatedSummary = `<span style="color:#16a34a; margin-left:8px; font-weight:900;">🎉 祝！全100疾患 100% 完全完備達成！（第1弾〜第5弾 全制覇・全Coreガイド ＆ 同効薬比較へ完全同期）</span>`;

top100Html = top100Html.replace(statusRegex, updatedSummary);

// Update badge in hero of 16_top100.html
top100Html = top100Html.replace('📊 第1弾〜第4弾（1〜80位）80疾患完備達成！', '🎉 全100疾患 100% 完備完了！');

fs.writeFileSync(pTop100, top100Html, 'utf8');
console.log('Successfully updated 16_top100.html for Tier 5 Complete! (ALL 100 DISEASES COMPLETE!)');

// =========================================================================
// 4. Update src/14_dictionary.html (Add Tier 5 drug cards)
// =========================================================================
const pDict = path.join(__dirname, '..', '14_dictionary.html');
let dictHtml = fs.readFileSync(pDict, 'utf8');

const tier5DictCards = `    <div class="dict-card" data-type="drug" data-kana="み" data-name="ミニリンメルトOD錠" data-desc="小児夜尿症治療薬。デスモプレシン酢酸塩。1日1回就寝直前舌下崩壊。水中毒・低ナトリウム血症を防ぐため「就寝前2〜3時間および就寝中の飲水制限」厳格指導。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ミニリンメルトOD錠 60μg / 120μg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">デスモプレシン酢酸塩水和物 / 抗利尿ホルモン製剤</div>
        <div class="dict-card-desc">夜間の尿量を直接減らしおねしょを改善。水なしで就寝直前舌下投与。服用前2〜3時間の飲水制限厳守（夕食後のガブ飲み禁止）。水中毒（頭痛・嘔吐・浮腫・痙攣）に厳戒。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-extra')">⚔️ 夜尿症比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c18')">📘 小児科ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('ミニリンメルト')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="と" data-name="ドボベット軟膏 / ゲル / フォーム" data-desc="尋常性乾癬外用配合剤。カルシポトリオール（活性型vitd3）＋ベタメタゾンジプロピオン酸エステル。角化抑制と強力消炎の相乗効果。高カルシウム血症に注意。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ドボベット軟膏 / ゲル / フォーム</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">カルシポトリオール・ベタメタゾン / 乾癬治療外用配合剤</div>
        <div class="dict-card-desc">尋常性乾癬の標準外用薬。1日1回患部に塗布。フォーム剤は使用前によく振る（火気厳禁）。週上限90g（フォーム週60g）。高Ca血症・血清Ca定期チェック。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-imm')">⚔️ 乾癬薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c16')">📘 皮膚科ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('ドボベット')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="お" data-name="オテズラ錠" data-desc="尋常性乾癬・乾癬性関節炎治療薬。アプレミラスト。経口pde4阻害薬。初期下痢・悪心を防ぐため5日間の漸増投与。抑うつ・体重減少モニタリング。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">オテズラ錠 10mg / 20mg / 30mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">アプレミラスト / 経口PDE4阻害薬</div>
        <div class="dict-card-desc">注射を避けたい乾癬患者の経口薬。初期に下痢・悪心が出やすいためスターターパックで段階的に増量。気分変化・うつ症状の出現に留意。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-imm')">⚔️ 乾癬薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c16')">📘 皮膚科ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('オテズラ')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="ち" data-name="チャンピックス錠" data-desc="禁煙治療薬。バレニクリン酒石酸塩。ニコチンα4β2受容体部分作動薬。禁煙予定日1週間前から服用開始。悪心・傾眠。自動車運転等は絶対禁止。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">チャンピックス錠 0.5mg / 1mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">バレニクリン酒石酸塩 / 経口禁煙治療薬</div>
        <div class="dict-card-desc">離脱症状と喫煙時の満足感を両面ブロック。12週間投与。食後服用で悪心を軽減。傾眠・めまいが起こるため自動車運転等の危険作業は絶対不可！</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-extra')">⚔️ 禁煙薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c11')">📘 生活習慣ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('チャンピックス')">📋 詳細</button>
      </div>
    </div>
  
`;

if (!dictHtml.includes('ミニリンメルトOD錠')) {
  const dictTarget = '<div class="dict-card" data-type="drug" data-kana="ほ" data-name="ボルズィ錠"';
  if (dictHtml.includes(dictTarget)) {
    dictHtml = dictHtml.replace(dictTarget, tier5DictCards + dictTarget);
    fs.writeFileSync(pDict, dictHtml, 'utf8');
    console.log('Successfully inserted Tier 5 cards into 14_dictionary.html!');
  }
}

// =========================================================================
// 5. Update src/09_app.js (DRUG_DB)
// =========================================================================
const pApp = path.join(__dirname, '..', '09_app.js');
let appJs = fs.readFileSync(pApp, 'utf8');

const tier5AppDb = `  { name: "ミニリンメルト", gen: "デスモプレシン酢酸塩水和物", cat: "86. 夜尿症（おねしょ）", char: "夜尿を直接減らす抗利尿ホルモン製剤！「就寝前2〜3時間飲水制限」で水中毒を厳重防止", desc: "就寝直前に舌下崩壊。服用前2〜3時間および就寝中の飲水制限厳守。頭痛・嘔吐・浮腫は低Na血症水中毒の初期徴候。", gId: "c18", cSec: "sec-extra" },
  { name: "ドボベット", gen: "カルシポトリオール・ベタメタゾン", cat: "92. 尋常性乾癬", char: "乾癬外用の標準配合剤！角化抑制VitD3＋強力ステロイドの相乗効果（高Ca血症注意）", desc: "1日1回患部に塗布。フォーム剤はよく振る（火気厳禁）。週上限90g（フォーム週60g）。エディロール併用時Ca値注意。", gId: "c16", cSec: "sec-imm" },
  { name: "オテズラ", gen: "アプレミラスト", cat: "92. 尋常性乾癬", char: "注射を避けたい乾癬患者の経口PDE4阻害薬！初期の下痢・悪心を漸増投与で乗り切る", desc: "5日間のスターター漸増パックで開始。下痢・悪心の初期説明必須。抑うつ気分・体重減少のモニタリング。", gId: "c16", cSec: "sec-imm" },
  { name: "チャンピックス", gen: "バレニクリン", cat: "98. ニコチン依存症（禁煙治療）", char: "離脱症状とタバコの美味しさを両面遮断！自動車運転等は絶対禁止の禁煙治療薬", desc: "禁煙開始1週間前から服用開始。12週間プログラム。食後服用で悪心を軽減。傾眠・めまいのため自動車運転等は終日禁止。", gId: "c11", cSec: "sec-extra" },
`;

if (!appJs.includes('"ミニリンメルト"')) {
  const appTarget = '  { name: "ビラノア",';
  if (appJs.includes(appTarget)) {
    appJs = appJs.replace(appTarget, tier5AppDb + appTarget);
    fs.writeFileSync(pApp, appJs, 'utf8');
    console.log('Successfully inserted Tier 5 drugs into 09_app.js!');
  }
}

console.log('=== Tier 5 Master Build Complete! ===');
