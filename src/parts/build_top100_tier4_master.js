const fs = require('fs');
const path = require('path');

console.log('=== Building Tier 4 (61-80) Master Completion (Fixed) ===');

// =========================================================================
// 1. Update src/05_comparison.html (Add Herpes PIT, RLS, Spinal stenosis)
// =========================================================================
const pComp = path.join(__dirname, '..', '05_comparison.html');
let compHtml = fs.readFileSync(pComp, 'utf8');

// A. Herpes PIT in sec-extra
const herpesCompHtml = `
    <div class="sub-banner banner-class" style="margin-top:20px;">
      <span>👄 【単純ヘルペス（口唇・性器）治療薬ガチンコ比較】外用軟膏 vs PIT短期集中内服（ファムビル1回1000mg）</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">投与形態・薬剤名</th>
          <th style="width:18%;">成分名（一般名）</th>
          <th style="width:18%;">用法・投与タイミング</th>
          <th style="width:22%;">強み・特徴</th>
          <th style="width:26%;">現場の鑑査急所・服薬指導の鉄則</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>再発時PIT内服<br>【1日完結療法】</strong><br><strong>ファムビル錠</strong></td>
          <td>ファムシクロビル<br>（500mg錠）</td>
          <td><strong>1回1000mg（2錠）</strong><br><strong>12時間あけて計2回（1日のみ）</strong></td>
          <td><span class="char">あらかじめ処方・発症直後即服用</span><br>初期症状（ピリピリ・違和感）から<strong>6時間以内に患者自身が自己判断で内服開始</strong>。水疱化を防ぎ病悩期間を激減。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">「ピリピリしたら6時間以内に飲む」</span> ことが絶対条件。水疱が完成してからでは効果が落ちる。腎機能eGFRに応じた減量用量チェック必須。</td>
        </tr>
        <tr>
          <td><strong>通常内服療法</strong><br><strong>バルトレックス錠</strong></td>
          <td>バラシクロビル塩酸塩<br>（500mg錠）</td>
          <td>1回500mg 1日2回<br>5日間連続内服</td>
          <td>アシクロビルのプロドラッグで高いバイオアベイラビリティ。口唇・性器ヘルペスの確実な治療。</td>
          <td>腎排泄型のため高齢者・腎機能低下例で**意識障害・せん妄・精神症状（アシクロビル脳症）**に注意。十分な水分摂取。</td>
        </tr>
        <tr>
          <td><strong>外用抗ウイルス薬</strong><br>・アラセナA軟膏<br>・ゾビラックス軟膏</td>
          <td>ビダラビン / アシクロビル</td>
          <td>1日1〜4回 患部に塗布</td>
          <td>局所への直接作用。全身副作用がほぼなく軽度口唇ヘルペスや妊婦にも使いやすい。</td>
          <td>チクチク・違和感の初期から塗布。患部を清潔にしてから塗布。目に入れないよう注意。</td>
        </tr>
      </tbody>
    </table>
`;

// B. RLS in sec-extra
const rlsCompHtml = `
    <div class="sub-banner banner-class" style="margin-top:20px;">
      <span>🦵 【むずむず脚症候群（RLS）治療薬ガチンコ比較】ドパミンアゴニスト vs α2δリガンド（レグナイト） vs 鉄補充</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">分類・薬剤名</th>
          <th style="width:20%;">成分名（一般名）</th>
          <th style="width:18%;">用法・服用タイミング</th>
          <th style="width:22%;">強み・キャラクター立ち</th>
          <th style="width:26%;">現場の鑑査急所・ピットフォール</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>α2δリガンド</strong><br><strong>レグナイト錠</strong></td>
          <td>ガバペンチン エナカルビル<br>（600mg錠）</td>
          <td><strong>1日1回 夕食後</strong><br>（600mg）</td>
          <td><span class="char">オーグメンテーション（症状前倒し悪化）が極めて少ない！</span><br>持続的に安定吸収され、夜間のむずむず・脚の不快感を遮断。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">必ず「夕食後」に服用！</span> 空腹時だと吸収トランスポーターが働かず効果激減。腎排泄型のためeGFR低下時は300mgへ減量。傾眠・ふらつき。</td>
        </tr>
        <tr>
          <td><strong>ドパミン作動薬</strong><br>・ビ・シフロール<br>・ニュープロパッチ</td>
          <td>プラミペキソール<br>ロティゴチン経皮パッチ</td>
          <td>就寝前（ビ・シフロール）<br>24時間貼付（ニュープロ）</td>
          <td>中枢ドパミン神経を刺激し即効鎮静。ニュープロパッチは持続的血中濃度を維持。</td>
          <td>長期連用により症状が夕方に前倒しで激化する**「オーグメンテーション」**に注意。突発性睡眠・傾眠（運転注意）。</td>
        </tr>
        <tr>
          <td><strong>鉄補充療法</strong><br>（フェロミア等）</td>
          <td>クエン酸第一鉄ナトリウム</td>
          <td>1日1〜2回 食後</td>
          <td>脳内ドパミン合成に鉄が必須。フェリチン低値（<50ng/mL）例に劇的効果。</td>
          <td>まず血清フェリチンを測定し、潜在的鉄欠乏を確認してから補充するのがガイドライン推奨。</td>
        </tr>
      </tbody>
    </table>
`;

// C. Spinal stenosis in sec-extra
const stenosisCompHtml = `
    <div class="sub-banner banner-class" style="margin-top:20px;">
      <span>🚶‍♂️ 【腰部脊柱管狭窄症 vs 椎間板ヘルニア 治療薬ガチンコ比較】間欠跛行の血流改善 vs 神経痛薬</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">病態・薬剤名</th>
          <th style="width:20%;">成分名・作用機序</th>
          <th style="width:18%;">用法・用量</th>
          <th style="width:22%;">強み・適した症状</th>
          <th style="width:26%;">現場の鑑査急所・ピットフォール</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>PGE1誘導体</strong><br><strong>オパルモン / プロレナール</strong></td>
          <td>リマプロスト アルファデクス<br>（5μg錠）</td>
          <td>1回5μg 1日3回<br><strong>食後服用</strong></td>
          <td><span class="char">脊髄馬尾神経の血流改善薬</span><br>血管拡張・血小板凝集抑制。「歩くと足がしびれて前かがみで休むと治る（神経性間欠跛行）」に特効！</td>
          <td>抗血栓作用があるため出血傾向・抗血小板/抗凝固薬との併用時出血注意。吸湿性が高いため分包開封後は湿気に注意。</td>
        </tr>
        <tr>
          <td><strong>神経障害性疼痛薬</strong><br><strong>タリージェ / リリカ</strong></td>
          <td>ミロガバリン / プレガバリン</td>
          <td>1日2回 朝・夕<br>少量から漸増</td>
          <td>ヘルニアや狭窄で圧迫された神経根の過剰興奮を鎮静（坐骨神経痛・放散痛）。</td>
          <td>めまい・ふらつき・転倒骨折注意。100%腎排泄型のためeGFR用量調整必須。漫然と漫然投与せず効果判定。</td>
        </tr>
      </tbody>
    </table>
`;

// Insert into 05_comparison.html
const extraMarker = '<div class="comp-section sec-extra">';
if (!compHtml.includes('【単純ヘルペス（口唇・性器）治療薬ガチンコ比較】')) {
  if (compHtml.includes(extraMarker)) {
    compHtml = compHtml.replace(extraMarker, extraMarker + '\n' + herpesCompHtml + '\n' + rlsCompHtml + '\n' + stenosisCompHtml);
    console.log('Successfully inserted Herpes, RLS, and Spinal stenosis tables into 05_comparison.html!');
  }
}

fs.writeFileSync(pComp, compHtml, 'utf8');

// =========================================================================
// 2. Update src/03_guide.html (Enhance c14, c15, c16, c12, c06 with Pearls)
// =========================================================================
const pGuide = path.join(__dirname, '..', '03_guide.html');
let guideHtml = fs.readFileSync(pGuide, 'utf8');

// Enhance c14 (サンコバ眼精疲労)
const c14Target = '<li><strong>「目薬を差した後にパチパチまばたきをするな！」：</strong>';
const c14Add = `<li><strong>眼精疲労・ピント調節障害（サンコバ点眼）：</strong>ビタミンB12（シアノコバラミン 0.02%）の鮮やかな赤色点眼液。毛様体筋の代謝を活性化し、長時間のスマホ・PC作業によるピント調節フリーズを改善する。光に弱いため遮光袋保管を指導。</li>
        <li><strong>「目薬を差した後にパチパチまばたきをするな！」：</strong>`;

if (!guideHtml.includes('サンコバ点眼')) {
  if (guideHtml.includes(c14Target)) {
    guideHtml = guideHtml.replace(c14Target, c14Add);
    console.log('Enhanced c14 with Sancoba pearls!');
  }
}

// Enhance c15 (MASLD/脂肪肝)
const c15Target = '<li><strong>リーバクト（BCAA配合顆粒）は「水に溶けない」！：</strong>';
const c15Add = `<li><strong>脂肪肝・MASLD（代謝機能障害関連脂肪性肝疾患）の新常識：</strong>飲酒歴のない脂肪肝が肝硬変・肝がんへ進展する。根本治療は「体重7〜10%減量」。糖尿病合併例ではインスリン抵抗性・肝線維化を抑える<strong>ピオグリタゾン（アクトス）</strong>や<strong>SGLT2阻害薬・GLP-1作動薬</strong>が強力な改善効果を示す。</li>
        <li><strong>リーバクト（BCAA配合顆粒）は「水に溶けない」！：</strong>`;

if (!guideHtml.includes('脂肪肝・MASLD')) {
  if (guideHtml.includes(c15Target)) {
    guideHtml = guideHtml.replace(c15Target, c15Add);
    console.log('Enhanced c15 with MASLD pearls!');
  }
}

// Enhance c16 (ヘルペスPIT)
const c16Target = '<li><strong>ステロイド外用薬を塗る「量」の基準＝FTU（フィンガーチップユニット）：</strong>';
const c16Add = `<li><strong>単純ヘルペス再発の切り札「PIT療法（ファムビル1回1000mg 1日完結）」：</strong>再発を繰り返す患者にあらかじめファムビルを処方しておき、<strong>「あ、ピリピリ・ムズムズしてきた」という前駆症状から6時間以内に自己判断で内服</strong>させる。12時間後に2回目を飲んで治療終了。水疱ができる前にウイルス増殖を先手必勝で叩く！</li>
        <li><strong>ステロイド外用薬を塗る「量」の基準＝FTU（フィンガーチップユニット）：</strong>`;

if (!guideHtml.includes('ファムビル1回1000mg')) {
  if (guideHtml.includes(c16Target)) {
    guideHtml = guideHtml.replace(c16Target, c16Add);
    console.log('Enhanced c16 with Herpes PIT pearls!');
  }
}

// Enhance c12 (脊柱管狭窄症オパルモン)
const c12Target = '<li><strong>「薬物乱用頭痛（MOH）」を見抜け！：</strong>';
const c12Add = `<li><strong>腰部脊柱管狭窄症の「間欠跛行」とオパルモン（プロレナール）：</strong>「少し歩くと太ももやふくらはぎがしびれて痛くなり、前かがみで少し休むとまた歩ける」のが典型症状。馬尾神経周囲の血管が圧迫されて酸欠を起こしているため、PGE1製剤（リマプロスト）で神経血流を改善させる。食後服用で吸湿性注意。</li>
        <li><strong>「薬物乱用頭痛（MOH）」を見抜け！：</strong>`;

if (!guideHtml.includes('腰部脊柱管狭窄症の「間欠跛行」')) {
  if (guideHtml.includes(c12Target)) {
    guideHtml = guideHtml.replace(c12Target, c12Add);
    console.log('Enhanced c12 with Spinal stenosis pearls!');
  }
}

// Enhance c06 (むずむず脚症候群レグナイト)
const c06Target = '<li><strong>悪性症候群（NMS）の超警戒サイン：</strong>';
const c06Add = `<li><strong>むずむず脚症候群（RLS）とレグナイト（夕食後服用の鉄則）：</strong>夜布団に入ると脚の中に虫が這うような我慢できない不快感が生じる。レグナイト（ガバペンチン エナカルビル）はオーグメンテーション（症状前倒し悪化）が少ない第一選択薬。<strong>必ず「夕食後」に服用</strong>（空腹時だと吸収激減）。血清フェリチン（鉄貯蔵量）測定も必須！</li>
        <li><strong>悪性症候群（NMS）の超警戒サイン：</strong>`;

if (!guideHtml.includes('むずむず脚症候群（RLS）とレグナイト')) {
  if (guideHtml.includes(c06Target)) {
    guideHtml = guideHtml.replace(c06Target, c06Add);
    console.log('Enhanced c06 with RLS pearls!');
  }
}

fs.writeFileSync(pGuide, guideHtml, 'utf8');

// =========================================================================
// 3. Update src/16_top100.html (Set 61-80 to status: "ok" with full details)
// =========================================================================
const pTop100 = path.join(__dirname, '..', '16_top100.html');
let top100Html = fs.readFileSync(pTop100, 'utf8');

const tier4FullData = [
  { rank: 61, name: "脂漏性皮膚炎", cat: "皮膚科", guideId: "c16", compId: "sec-imm", drugs: "ニゾラールローション/クリーム（ケトコナゾール）、ロコイド、スピラゾン", key: "原因菌マラセチア（抗真菌外用薬ニゾラールが主役）、急性期炎症に弱〜中ステロイド外用併用、洗顔・洗髪指導。" },
  { rank: 62, name: "虫刺され（虫刺症）", cat: "皮膚科", guideId: "c16", compId: "sec-imm", drugs: "アンテベート軟膏、デルモベート、フルメタ、レスタミン、抗ヒスタミン内服", key: "強い痒みと掻爬による二次感染（とびひ）防止、強力ステロイド外用（ベリーストロング等）を短期間しっかり塗布、冷罨法。" },
  { rank: 63, name: "単純ヘルペス（口唇・性器ヘルペス）", cat: "感染症・皮膚", guideId: "c16", compId: "sec-extra", drugs: "ファムビル（PIT療法）、バルトレックス、アラセナA軟膏、ゾビラックス", key: "PIT療法（ファムビル1回1000mg計2回・前駆症状から6時間以内服用）、外用薬（初期ピリピリ塗布）、アシクロビル脳症注意。" },
  { rank: 64, name: "麦粒腫・霰粒腫（ものもらい）", cat: "眼科", guideId: "c14", compId: "sec-extra", drugs: "タリビッド点眼/眼軟膏、クラビット点眼、フルメトロン点眼", key: "急性化膿性炎症（キノロン系抗菌点眼）、しこり肉芽腫（霰粒腫：ステロイド点眼併用、温罨法）、目頭押さえ指導。" },
  { rank: 65, name: "眼精疲労（調節機能改善）", cat: "眼科", guideId: "c14", compId: "sec-extra", drugs: "サンコバ点眼液（シアノコバラミン 0.02%）、ミドリンP", key: "ビタミンB12赤色点眼液（毛様体筋代謝改善・VDT作業ピント疲労改善）、遮光袋保管指導、就寝前調節麻痺点眼。" },
  { rank: 66, name: "細菌性結膜炎（はやり目など）", cat: "眼科", guideId: "c14", compId: "sec-extra", drugs: "クラビット点眼、トスフロ点眼、ベストロン点眼", key: "抗菌点眼薬（1日3〜4回）、目やに・充血改善後も数日間継続、家族内感染予防（タオル共用禁止、点眼容器先端非接触）。" },
  { rank: 67, name: "機能性ディスペプシア（胃もたれ・早期満腹感）", cat: "消化器", guideId: "c11", compId: "sec-ckd", drugs: "アコファイド（アコチアミド）、六君子湯、タケキャブ、ドグマチール", key: "胃運動改善薬アコファイド（食前服用必須・食後だと効果半減）、六君子湯（胃適応性弛緩・グレリン分泌促進）、酸分泌抑制併用。" },
  { rank: 68, name: "潰瘍性大腸炎", cat: "消化器・IBD", guideId: "c11", compId: "sec-ckd", drugs: "リアルダ、アサコール、ペンタサ、プレドニン、ステラーラ、エンタイビオ", key: "5-ASA製剤（大腸局所到達製剤・リアルダ1日1回全大腸型）、自己中断による再燃防止、顆粒球吸着療法・バイオ製剤。" },
  { rank: 69, name: "胆石症・慢性胆嚢炎", cat: "肝胆膵", guideId: "c15", compId: "sec-extra", drugs: "ウルソ（ウルソデオキシコール酸 UDCA 100mg）、コスパノン、ブスコパン", key: "コレステロール系胆石溶解（ウルソ：利胆作用・肝機能改善）、Oddi括約筋痙攣痛（コスパノン）、脂っこい食事制限。" },
  { rank: 70, name: "脂肪肝（MASLD/NAFLD）・慢性肝炎", cat: "肝胆膵", guideId: "c15", compId: "sec-extra", drugs: "アクトス（ピオグリタゾン）、フォシーガ、マンジャロ、ウルソ、ビタミンE", key: "体重7〜10%減量生活改善、ピオグリタゾン（インスリン抵抗性改善・線維化抑制）、SGLT2i/GLP-1心腎肝代謝保護、禁酒。" },
  { rank: 71, name: "甲状腺機能亢進症（バセドウ病など）", cat: "内分泌", guideId: "c13", compId: "sec-extra", drugs: "メルカゾール（チアマゾール）、プロパジール、インデラル", key: "抗甲状腺薬メルカゾール、**初期2〜3ヶ月の「無顆粒球症」超厳重警戒（急な発熱・咽頭痛は直ちに服用中止し白血球採血！）**、妊娠時プロパジール。" },
  { rank: 72, name: "パーキンソン病", cat: "神経内科", guideId: "c6", compId: "sec-psy", drugs: "マドパー、ネオドパストン、ハルロピテープ、ミラペックス、アジレクト", key: "L-ドパ/DCI合剤（食前/食後吸収、急な断薬での悪性症候群）、ドパミンアゴニスト（突発性睡眠）、オン・オフ現象・ウェアリングオフ。" },
  { rank: 73, name: "むずむず脚症候群（レストレスレッグス症候群）", cat: "神経内科", guideId: "c6", compId: "sec-extra", drugs: "レグナイト（ガバペンチンエナカルビル）、ニュープロパッチ、フェロミア", key: "第一選択レグナイト（**夕食後服用厳守**・空腹時効果激減・オーグメンテーション防止）、鉄欠乏チェック（フェリチン<50）。" },
  { rank: 74, name: "三叉神経痛・肋間神経痛", cat: "神経内科・ペイン", guideId: "c12", compId: "sec-extra", drugs: "テグレトール（カルバマゼピン）、タリージェ、リリカ、メチコバール", key: "三叉神経痛第一選択テグレトール（特異的奏功・血中濃度TDM・重篤薬疹SJS/TEN注意）、肋間神経痛（タリージェ/湿布）。" },
  { rank: 75, name: "閉塞性動脈硬化症（末梢動脈疾患）", cat: "循環器・血管", guideId: "c4", compId: "sec-cv", drugs: "プレタール（シロスタゾール）、オパルモン/プロレナール、バイアスピリン", key: "間欠跛行改善（プレタール：抗血小板＋血管拡張・頻脈頭痛注意）、PGE1プロレナール（末梢血流改善）、フットケア指導。" },
  { rank: 76, name: "下肢静脈瘤・深部静脈血栓症", cat: "血管・循環器", guideId: "c4", compId: "sec-cv", drugs: "エリキュース、リクシアナ、イグザレルト、弾性ストッキング", key: "DVT治療・肺塞栓予防（DOAC体重・腎機能用量）、弾性ストッキング正しい圧迫着用法、長距離移動時の水分摂取・足首運動。" },
  { rank: 77, name: "腱鞘炎・ばね指・テニス肘", cat: "整形外科", guideId: "c12", compId: "sec-extra", drugs: "ロキソニンテープ、モーラステープ、ボルタレンゲル、ケナコルト局注", key: "局所消炎鎮痛（テープ剤・ゲル剤）、安静保持、難治例ステロイド腱鞘内注射（血糖上昇・腱断裂リスク説明）。" },
  { rank: 78, name: "肩関節周囲炎（五十肩・四十肩）", cat: "整形外科", guideId: "c12", compId: "sec-extra", drugs: "セレコキシブ、ロキソニン、アルツ関節注、冷感/温感パップ", key: "急性期激痛（セレコックス短期＋冷湿布・三角巾安静）、慢性期拘縮（ヒアルロン酸関節腔内注射＋温罨法・可動域リハビリ）。" },
  { rank: 79, name: "椎間板ヘルニア・脊柱管狭窄症", cat: "整形外科", guideId: "c12", compId: "sec-extra", drugs: "オパルモン/プロレナール、タリージェ、セレコックス、トラマドール", key: "脊柱管狭窄症の間欠跛行（PGE1オパルモン：馬尾血流改善・食後）、ヘルニア坐骨神経痛（タリージェ漸増・下行性抑制系）。" },
  { rank: 80, name: "捻挫・打撲・筋肉痛（外傷）", cat: "整形外科", guideId: "c12", compId: "sec-extra", drugs: "ロキソニンパップ、冷感パップ剤、ロキソプロフェン、カロナール", key: "受傷初期48時間の「RICE処置」（安静・冷却・圧迫・挙上）、冷感パップ貼付、急性痛NSAIDs頓用、温感湿布は慢性期のみ。" }
];

let newRange4Cards = '';
tier4FullData.forEach(item => {
  const badgeHtml = '<span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>';
  const borderStyle = 'border-left: 4px solid #16a34a;';
  const rankBadge = '<span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">' + item.rank + '位</span>';

  let jumpBtns = '';
  if (item.guideId) {
    if (item.guideId.startsWith('c')) {
      jumpBtns += '<button class="dict-jump-btn" onclick="jumpToGuide(\'' + item.guideId + '\')">📘 ガイド</button>';
    } else {
      jumpBtns += '<button class="dict-jump-btn" onclick="switchTab(\'' + item.guideId + '\')">🚀 新薬</button>';
    }
  }
  if (item.compId) {
    jumpBtns += '<button class="dict-jump-btn" onclick="jumpToSpecialTab(\'tab-comparison\', \'' + item.compId + '\')">⚔️ 比較</button>';
  }
  jumpBtns += '<button class="dict-jump-btn" onclick="quickSearch(\'' + item.name.split('（')[0] + '\')">🔍 検索</button>';

  newRange4Cards += '        <div class="card" style="margin:0; padding:14px; ' + borderStyle + ' background:#ffffff;">\n' +
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

// Replace Range 4 block in 16_top100.html
const range4Regex = /<!-- ==================== 【第4弾】61位〜80位（消化器・肝胆・整形・婦人科） ==================== -->[\s\S]*?<!-- ==================== 【第5弾】81位〜100位/;
const newRange4Block = `<!-- ==================== 【第4弾】61位〜80位（消化器・肝胆・整形・婦人科） ==================== -->
    <div id="top100-range-r4" class="top100-range-pane" style="display:none;">
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:14px;">
${newRange4Cards}      </div>
    </div>

    <!-- ==================== 【第5弾】81位〜100位`;

top100Html = top100Html.replace(range4Regex, newRange4Block);

// Update status summary in 16_top100.html
const statusRegex = /<span style="color:#16a34a; margin-left:8px; font-weight:900;">[\s\S]*?<\/span>/;
const updatedSummary = `<span style="color:#16a34a; margin-left:8px; font-weight:900;">🟢 第1弾〜第4弾（1〜80位）計80疾患 100% 完備完了！（全Coreガイド ＆ 同効薬比較へ完全同期）</span>`;

top100Html = top100Html.replace(statusRegex, updatedSummary);

// Update badge in hero of 16_top100.html
top100Html = top100Html.replace('📊 第1弾〜第3弾（1〜60位）60疾患完備達成！', '📊 第1弾〜第4弾（1〜80位）80疾患完備達成！');

fs.writeFileSync(pTop100, top100Html, 'utf8');
console.log('Successfully updated 16_top100.html for Tier 4 Complete!');

// =========================================================================
// 4. Update src/14_dictionary.html (Add Tier 4 drug cards)
// =========================================================================
const pDict = path.join(__dirname, '..', '14_dictionary.html');
let dictHtml = fs.readFileSync(pDict, 'utf8');

const tier4DictCards = `    <div class="dict-card" data-type="drug" data-kana="ふ" data-name="ファムビル錠" data-desc="抗ヘルペスウイルス薬。ファムシクロビル。単純ヘルペス再発時pit療法（患者判断による前駆症状6時間以内内服・1回1000mg計2回1日完結）。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ファムビル錠 250mg / 500mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">ファムシクロビル / 単純ヘルペス再発PIT治療薬</div>
        <div class="dict-card-desc">再発ヘルペスのピリピリ初期症状から6時間以内に1回1000mg（500mg 2錠）、12時間後に2回目を飲んで1日で終了。水疱化を防ぎ速やかに鎮静。腎機能に応じた減量チェック。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-extra')">⚔️ ヘルペス比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c16')">📘 皮膚科ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('ファムビル')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="さ" data-name="サンコバ点眼液" data-desc="調節機能改善点眼薬。シアノコバラミン（ビタミンb12 0.02%）。鮮やかな赤色点眼。毛様体筋の代謝を活性化しvdt・スマホ眼精疲労を改善。遮光袋保管。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">サンコバ点眼液 0.02%</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">シアノコバラミン / ビタミンB12点眼液</div>
        <div class="dict-card-desc">毛様体筋の疲労を回復させピント調節機能を改善。パソコン・スマホ作業による眼精疲労に汎用。光に分解されやすいため必ず遮光投薬袋に保管するよう指導。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToGuide('c14')">📘 眼科ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('サンコバ')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="れ" data-name="レグナイト錠" data-desc="むずむず脚症候群治療薬。ガバペンチンエナカルビル。1日1回夕食後内服。オーグメンテーション（症状前倒し悪化）が少ない。必ず夕食後（空腹時吸収低下）。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">レグナイト錠 600mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">ガバペンチン エナカルビル / α2δリガンド</div>
        <div class="dict-card-desc">夜間の下肢異常感覚（むずむず感）を抑え睡眠を改善。オーグメンテーションリスクが極めて低い。「夕食後」服用厳守（空腹時だと吸収激減）。腎排泄型。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-extra')">⚔️ RLS薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c6')">📘 精神神経ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('レグナイト')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="お" data-name="オパルモン錠 / プロレナール錠" data-desc="腰部脊柱管狭窄症・末梢血流改善薬。リマプロストアルファデクス。プロスタグランジンe1誘導体。馬尾神経血流を改善し神経性間欠跛行を軽快。食後服用。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">オパルモン / プロレナール錠 5μg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">リマプロスト アルファデクス / 経口PGE1製剤</div>
        <div class="dict-card-desc">脊柱管狭窄症の「歩くと足がしびれて前かがみで休むと治る（間欠跛行）」に特効。馬尾神経血流と歩行距離を改善。抗血小板併用時出血注意。吸湿注意。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-extra')">⚔️ 狭窄症薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c12')">📘 整形外科ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('オパルモン')">📋 詳細</button>
      </div>
    </div>
  
`;

if (!dictHtml.includes('ファムビル錠 250mg')) {
  const dictTarget = '<div class="dict-card" data-type="drug" data-kana="ほ" data-name="ボルズィ錠"';
  if (dictHtml.includes(dictTarget)) {
    dictHtml = dictHtml.replace(dictTarget, tier4DictCards + dictTarget);
    fs.writeFileSync(pDict, dictHtml, 'utf8');
    console.log('Successfully inserted Tier 4 cards into 14_dictionary.html!');
  }
}

// =========================================================================
// 5. Update src/09_app.js (DRUG_DB)
// =========================================================================
const pApp = path.join(__dirname, '..', '09_app.js');
let appJs = fs.readFileSync(pApp, 'utf8');

const tier4AppDb = `  { name: "ファムビル", gen: "ファムシクロビル", cat: "63. 単純ヘルペス（PIT）", char: "ヘルペス再発の切り札！ピリピリ初期症状から6時間以内に自己判断服用（1回1000mg計2回完結）", desc: "再発ヘルペス患者にあらかじめ処方。初期症状から6時間以内に1回1000mg、12時間後に2回目を飲んで1日で終了。水疱化を阻止。", gId: "c16", cSec: "sec-extra" },
  { name: "サンコバ点眼液", gen: "シアノコバラミン", cat: "65. 眼精疲労", char: "鮮やかな赤色ビタミンB12点眼！毛様体筋の疲労を回復させスマホ・PC眼精疲労を改善", desc: "ピント調節麻痺・VDT作業疲労に1回1〜2滴1日3〜5回点眼。光分解を防ぐため遮光袋保管を必ず指導。", gId: "c14", cSec: "sec-extra" },
  { name: "レグナイト", gen: "ガバペンチンエナカルビル", cat: "73. むずむず脚症候群（RLS）", char: "「夕食後」服用が絶対鉄則！オーグメンテーションが極めて少ないRLS第一選択薬", desc: "夜間の下肢むずむず感を抑える。必ず夕食後に服用（空腹時だと吸収激減）。腎排泄型。血清フェリチン低値（<50）なら鉄補充併用。", gId: "c6", cSec: "sec-extra" },
  { name: "オパルモン / プロレナール", gen: "リマプロストアルファデクス", cat: "79. 脊柱管狭窄症 / 閉塞性動脈硬化症", char: "馬尾神経血流改善のPGE1誘導体！「少し歩くと足がしびれて前かがみで休むと治る（間欠跛行）」に特効", desc: "脊柱管狭窄症の神経性間欠跛行に1回5μg 1日3回食後内服。抗血栓作用のため出血注意。吸湿性に注意。", gId: "c12", cSec: "sec-extra" },
  { name: "アコファイド", gen: "アコチアミド", cat: "67. 機能性ディスペプシア（FD）", char: "世界初のFD治療薬！アセチルコリン分解を抑え胃運動を改善（「食前」服用必須！）", desc: "胃もたれ・早期膨満感に1回100mg 1日3回食前服用。食後だと効果が落ちるため食前投与を指導。", gId: "c11", cSec: "sec-ckd" },
`;

if (!appJs.includes('"ファムビル"')) {
  const appTarget = '  { name: "ビラノア",';
  if (appJs.includes(appTarget)) {
    appJs = appJs.replace(appTarget, tier4AppDb + appTarget);
    fs.writeFileSync(pApp, appJs, 'utf8');
    console.log('Successfully inserted Tier 4 drugs into 09_app.js!');
  }
}

console.log('=== Tier 4 Master Build Complete! ===');
