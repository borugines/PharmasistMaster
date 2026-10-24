const fs = require('fs');
const path = require('path');

console.log('=== Building Tier 3 (41-60) Master Completion ===');

// =========================================================================
// 1. Update src/05_comparison.html (Add Menopause, Otitis, Hemorrhoids)
// =========================================================================
const pComp = path.join(__dirname, '..', '05_comparison.html');
let compHtml = fs.readFileSync(pComp, 'utf8');

// A. Menopause comparison in sec-extra
const menopauseCompHtml = `
    <div class="sub-banner banner-class" style="margin-top:20px;">
      <span>🌸 【更年期障害 治療薬ガチンコ比較】ホルモン補充療法（HRT経皮パッチ） vs 漢方3大処方の証別使い分け</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">分類・処方名</th>
          <th style="width:20%;">代表薬剤名・成分</th>
          <th style="width:18%;">適した体質・主症状</th>
          <th style="width:20%;">強み・特徴</th>
          <th style="width:26%;">現場の鑑査急所・ピットフォール</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>HRT経皮パッチ<br>（合剤）</strong></td>
          <td><strong>メノエイドコンビパッチ</strong><br>（エストラジオール＋酢酸ノルエチステロン）</td>
          <td>子宮を有する閉経後女性<br>（ホットフラッシュ・発汗・不眠）</td>
          <td><span class="char">貼るだけでエストロゲン＋黄体ホルモン補充</span><br>肝初回通過効果を回避し、静脈血栓症（VTE）や中性脂肪上昇リスクを経口剤より低減。</td>
          <td>週2回（3〜4日ごと）下腹部等に貼り替え。乳房緊満感、不正出血。<strong>乳がん・子宮内膜がんの既往、急性血栓塞栓症には禁忌</strong>！</td>
        </tr>
        <tr>
          <td><strong>更年期漢方<br>【自律神経・イライラ】</strong></td>
          <td><strong>加味逍遙散</strong><br>（かみしょうようさん：ツムラ24）</td>
          <td>虚弱〜中等度体質<br>（ホットフラッシュ・苛立ち・不眠）</td>
          <td><span class="char">気逆・気鬱を鎮める第一選択</span><br>上半身のほてりや情緒不安定、パニック傾向、自律神経失調を穏やかに整える。</td>
          <td>甘草配合のため偽アルドステロン症（低K血症・浮腫・血圧上昇）に注意。長期投与時は定期血清K採血。</td>
        </tr>
        <tr>
          <td><strong>更年期漢方<br>【冷え・むくみ・貧血】</strong></td>
          <td><strong>当帰芍薬散</strong><br>（とうきしゃくやくさん：ツムラ23）</td>
          <td>虚証（やせ型・体力低下）<br>（冷え性・貧血・下肢浮腫・めまい）</td>
          <td><span class="char">血虚・水滞を改善する潤い処方</span><br>血行を良くして体を温め、余分な水分を排泄。色白で疲れやすい女性に最適。</td>
          <td>胃腸虚弱で食欲不振や下痢がある場合は慎重投与。</td>
        </tr>
        <tr>
          <td><strong>更年期漢方<br>【のぼせ・肩こり・実証】</strong></td>
          <td><strong>桂枝茯苓丸</strong><br>（けいしぶくりょうがん：ツムラ25）</td>
          <td>実証（比較的体力あり・赤ら顔）<br>（のぼせて足冷える・頭痛・下腹部痛）</td>
          <td><span class="char">瘀血（血の滞り）を一撃打破</span><br>下半身は冷えるのに顔がカッと熱くなる「冷えのぼせ」や下腹部圧痛に切れ味鋭い。</td>
          <td>体力が著しく低下している虚弱者には強すぎるため回避。</td>
        </tr>
      </tbody>
    </table>
`;

// B. Otitis (中耳炎・点耳薬) in sec-inf or sec-extra
const otitisCompHtml = `
    <div class="sub-banner banner-class" style="margin-top:20px;">
      <span>👂 【急性中耳炎・外耳炎 治療薬＆点耳薬ガチンコ比較】小児AMPC高用量投与 vs 点耳薬の「体温加温」ルール</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">病態・薬剤区分</th>
          <th style="width:20%;">代表薬剤名（一般名）</th>
          <th style="width:18%;">用法・投与量</th>
          <th style="width:20%;">強み・作用機序</th>
          <th style="width:26%;">現場の鑑査急所・服薬指導の鉄則</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>小児急性中耳炎<br>第一選択内服薬</strong></td>
          <td><strong>サワシリン / ワイドシリン</strong><br>（アモキシシリン高用量）</td>
          <td><strong>小児 60〜90mg/kg/日</strong><br>（通常量の1.5〜2倍を1日3回）</td>
          <td><span class="char">中耳腔への高濃度移行とPRSP制圧</span><br>ペニシリン耐性肺炎球菌（PRSP）を叩くためガイドラインで高用量が強く推奨。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">「体重換算で通常より多いが間違いではない」</span> ことを保護者へ明確に説明。自己中断せず確実に飲み切らせる指導が再発防止の肝。</td>
        </tr>
        <tr>
          <td><strong>抗菌点耳薬<br>（キノロン系）</strong></td>
          <td><strong>タリビッド耳科用液</strong><br>（オフロキサシン 0.3%）</td>
          <td>1回6〜10滴 点耳後<br><strong>約10分間耳浴（側臥位）</strong></td>
          <td><span class="char">中耳・外耳道への局所ダイレクト殺菌</span><br>緑膿菌やブドウ球菌による急性外耳炎、慢性中耳炎の急性増悪に高い組織移行。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【点耳液は必ず手で温めてから点耳！】</span> 冷たいまま点耳すると内耳（三半規管）が刺激され<strong>「激しいめまい・嘔気（カロリック反応）」</strong>を起こす！容器を数分手のひらで握り体温に近づける。</td>
        </tr>
      </tbody>
    </table>
`;

// C. Hemorrhoids (痔疾外用薬) in sec-extra
const hemorrhoidsCompHtml = `
    <div class="sub-banner banner-class" style="margin-top:20px;">
      <span>🩺 【痔疾（痔核・裂肛）外用薬 ガチンコ比較】注入軟膏の二刀流、ステロイド含有 vs 非ステロイド、内服舌下錠</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">分類・剤形</th>
          <th style="width:20%;">代表薬剤名（一般名）</th>
          <th style="width:18%;">用法・使用部位</th>
          <th style="width:20%;">強み・特徴</th>
          <th style="width:26%;">現場の鑑査急所・ピットフォール</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>ステロイド配合<br>注入軟膏</strong></td>
          <td><strong>強力ポステリザン軟膏</strong><br>・プロクトセディル軟膏</td>
          <td>1日1〜2回<br><strong>内痔核＝注入 / 外痔核・裂肛＝塗布</strong></td>
          <td><span class="char">「注入」と「塗布」の便利な二刀流</span><br>強い腫れ・炎症・出血を素早く抑える急性期の第一選択。大腸菌死菌含有で局所免疫賦活。</td>
          <td>容器先端を肛門内に挿入して全量注入するか、指先に取って患部に塗布。局所感染（真菌症等）併発時は禁忌。漫然連用を避け症状改善後は休薬。</td>
        </tr>
        <tr>
          <td><strong>非ステロイド<br>注入軟膏</strong></td>
          <td><strong>ボラザG軟膏</strong><br>（トリベノシド・リドカイン）</td>
          <td>1日2回（朝・排便後または就寝前）<br>注入または塗布</td>
          <td><span class="char">ステロイド不含で長期維持に最適</span><br>抗炎症・創傷治癒促進（トリベノシド）＋ 局所麻酔（リドカイン）で痛みを遮断。</td>
          <td>ステロイドによる皮膚菲薄化や感染リスクがないため、慢性裂肛や軽度内痔核の長期維持療法に使いやすい。</td>
        </tr>
        <tr>
          <td><strong>静脈叢改善<br>内服舌下錠</strong></td>
          <td><strong>ヘモリンガル舌下錠</strong><br>（静脈血管叢エキス）</td>
          <td>1回1錠 1日3回（急性期1日4回）<br><strong>空腹時に舌下崩壊</strong></td>
          <td><span class="char">水なしで溶ける内痔核の飲み薬</span><br>痔静脈叢のうっ血・浮腫を改善し、いぼ痔を小さくする。</td>
          <td><strong>「飲み込まずに舌の下で溶かす（舌下投与）」</strong>ことが鉄則！飲み込むと胃酸や初回通過効果で分解され効果が低下する。排便時のいきみ防止（酸化Mg併用）指導。</td>
        </tr>
      </tbody>
    </table>
`;

// Insert into 05_comparison.html
const extraMarker = '<div class="comp-section sec-extra">';
if (!compHtml.includes('【更年期障害 治療薬ガチンコ比較】')) {
  if (compHtml.includes(extraMarker)) {
    compHtml = compHtml.replace(extraMarker, extraMarker + '\n' + menopauseCompHtml + '\n' + otitisCompHtml + '\n' + hemorrhoidsCompHtml);
    console.log('Successfully inserted Menopause, Otitis, and Hemorrhoids tables into 05_comparison.html!');
  }
}

fs.writeFileSync(pComp, compHtml, 'utf8');

// =========================================================================
// 2. Update src/03_guide.html (Enhance c13, c14, c26 with Pearls)
// =========================================================================
const pGuide = path.join(__dirname, '..', '03_guide.html');
let guideHtml = fs.readFileSync(pGuide, 'utf8');

// Enhance c13 (Menopause)
const c13PearlsTarget = '<li><strong>甲状腺と不妊・流産リスク（TSHコントロール）：</strong>甲状腺ホルモンは胎児の脳や神経の発達に直結するため、妊娠希望・妊婦の潜在性甲状腺機能低下症は流産や早産のリスクが激増する。';
const c13PearlsAdd = `<li><strong>更年期障害のHRT（メノエイドコンビパッチ）と漢方3大処方の極意：</strong>
          <br>・<strong>メノエイドコンビパッチ：</strong>経皮吸収型エストロゲン＋黄体ホルモン製剤。肝初回通過効果を回避できるため経口ピルよりも血栓症・中性脂肪リスクが低い。週2回下腹部に貼り替える（乳房・創傷部位は避ける）。
          <br>・<strong>更年期漢方3大処方の使い分け：</strong>イライラ・ホットフラッシュ優位なら<strong>加味逍遙散</strong>（気逆を鎮静）、冷え・貧血・むくみなら<strong>当帰芍薬散</strong>（血行改善と利水）、のぼせて足が冷える瘀血・肩こりなら<strong>桂枝茯苓丸</strong>。</li>
        <li><strong>甲状腺と不妊・流産リスク（TSHコントロール）：</strong>甲状腺ホルモンは胎児の脳や神経の発達に直結するため、妊娠希望・妊婦の潜在性甲状腺機能低下症は流産や早産のリスクが激増する。`;

if (!guideHtml.includes('更年期障害のHRT（メノエイドコンビパッチ）')) {
  if (guideHtml.includes(c13PearlsTarget)) {
    guideHtml = guideHtml.replace(c13PearlsTarget, c13PearlsAdd);
    console.log('Enhanced c13 with Menopause pearls!');
  }
}

// Enhance c14 (Otitis点耳加温)
const c14OtitisTarget = '<li><strong>「目薬を差した後にパチパチまばたきをするな！」：</strong>';
const c14OtitisAdd = `<li><strong>点耳薬（タリビッド耳科用等）の「体温加温」は絶対に譲れない服薬指導！：</strong>冷蔵庫や冷暗所から出した冷たい点耳液をそのまま耳に入れると、内耳の三半規管が強烈に刺激され<strong>「激しい回転性めまいや嘔吐（カロリック反応）」</strong>で倒れてしまう！容器を手のひらで数分間しっかり握って体温程度まで温めてから点耳し、約10分間横向きの姿勢（耳浴）を保つよう指導せよ。</li>
        <li><strong>「目薬を差した後にパチパチまばたきをするな！」：</strong>`;

if (!guideHtml.includes('点耳薬（タリビッド耳科用等）の「体温加温」')) {
  if (guideHtml.includes(c14OtitisTarget)) {
    guideHtml = guideHtml.replace(c14OtitisTarget, c14OtitisAdd);
    console.log('Enhanced c14 with Otitis pearls!');
  }
}

// Enhance c26 (Hemorrhoids)
const c26PearlsTarget = '<li><strong>刺激性下剤（センナ・センノシド・大黄等）の「大腸黒皮症（メラノーシス・コリ）」：</strong>';
const c26PearlsAdd = `<li><strong>痔疾（いぼ痔・切れ痔）の「注入軟膏」と排便コントロール：</strong>痔の悪化原因の9割は「便秘時のいきみ」と「下痢便の強烈な刺激」。酸化マグネシウムやモビコールでバナナ状の軟便を維持させることが根本治療。注入軟膏（強力ポステリザン・ボラザG）は内痔核なら肛門内へ全量注入、外痔核や切れ痔なら清潔な指先で患部に薄く塗布する「二刀流」の使い方を指導する。</li>
        <li><strong>刺激性下剤（センナ・センノシド・大黄等）の「大腸黒皮症（メラノーシス・コリ）」：</strong>`;

if (!guideHtml.includes('痔疾（いぼ痔・切れ痔）の「注入軟膏」')) {
  if (guideHtml.includes(c26PearlsTarget)) {
    guideHtml = guideHtml.replace(c26PearlsTarget, c26PearlsAdd);
    console.log('Enhanced c26 with Hemorrhoids pearls!');
  }
}

fs.writeFileSync(pGuide, guideHtml, 'utf8');

// =========================================================================
// 3. Update src/16_top100.html (Set 41-60 to status: "ok" with full details)
// =========================================================================
const pTop100 = path.join(__dirname, '..', '16_top100.html');
let top100Html = fs.readFileSync(pTop100, 'utf8');

const tier3FullData = [
  { rank: 41, name: "歯周病・抜歯後感染予防", cat: "歯科連携", guideId: "c8", compId: "sec-inf", drugs: "サワシリン（アモキシシリン）、フロモックス、ロキソニン、SPトローチ", key: "第一選択ペニシリン系（嫌気性菌カバー）、アスピリン喘息チェック、骨粗鬆症治療薬（BP・プラリア）服用者の抜歯時顎骨壊死（MRONJ）連携。" },
  { rank: 42, name: "甲状腺機能低下症（橋本病など）", cat: "内分泌", guideId: "c13", compId: "sec-extra", drugs: "チラーヂンS（レボチロキシンNa）", key: "朝食前内服、鉄剤・カルシウム製剤・アルミニウム含有制酸剤・PPIとはキレート/吸収阻害のため2〜4時間あける。" },
  { rank: 43, name: "過敏性腸症候群（IBS）", cat: "消化器", guideId: "c11", compId: "sec-ckd", drugs: "イリボー（ラモセトロン）、コロネル/ポリフル、セレキノン、漢方（桂枝加芍薬湯）", key: "下痢型IBS（イリボー：5-HT3拮抗・男性5μg/女性2.5μgから開始・便秘化注意）、混合型（高分子重合体コロネル：十分な水分で服用）。" },
  { rank: 44, name: "更年期障害", cat: "婦人科", guideId: "c13", compId: "sec-extra", drugs: "メノエイドコンビパッチ、エストラーナ、加味逍遙散、当帰芍薬散、桂枝茯苓丸", key: "経皮HRT（メノエイド：週2回貼替・肝初回通過回避で血栓低減）、漢方3大処方使い分け（イライラ加味逍遙散 / 冷え貧血当帰芍薬散 / のぼせ瘀血桂枝茯苓丸）。" },
  { rank: 45, name: "帯状疱疹・帯状疱疹後神経痛", cat: "皮膚科・疼痛", guideId: "c16", compId: "sec-extra", drugs: "アメナリーフ、バルトレックス、ファムビル、タリージェ、リリカ、アラセナA軟膏", key: "アメナリーフ（食後服用必須・腎排泄でないため腎機能減量不要）、バルトレックス（腎機能eGFR減量必須）、皮疹消失後の神経痛PHN（タリージェ）。" },
  { rank: 46, name: "急性中耳炎・外耳炎", cat: "耳鼻科", guideId: "c14", compId: "sec-extra", drugs: "アモキシシリン高用量（60〜90mg/kg）、タリビッド耳科用液、ベストロン耳科用", key: "小児中耳炎（PRSP対策でAMPC高用量）、点耳薬（タリビッド耳科用：手で体温近くまで温めてから点耳・冷たいままだとめまいカロリック反応誘発）。" },
  { rank: 47, name: "慢性閉塞性肺疾患（COPD）", cat: "呼吸器", guideId: "c25", compId: "sec-imm", drugs: "スピリーバ（チオトロピウム）、ウルティブロ、アノーロ、ビベピ、テオフィリン", key: "気管支拡張薬（長時間作用型抗コリンLAMAが基盤）、吸入手技（十分な吸気力・デバイス選択・吸入後の息止め）、禁煙指導。" },
  { rank: 48, name: "てんかん", cat: "脳神経", guideId: "c6", compId: "sec-psy", drugs: "イーケプラ（レベチラセタム）、ビムパット、テグレトール、デパケン、ラミクタール", key: "イーケプラ（ほぼ100%腎排泄・相互作用少ない）、テグレトール（CYP3A自己誘導・TDM必須）、急激な自己中断による重積発作警告。" },
  { rank: 49, name: "関節リウマチ", cat: "膠原病・リウマチ", guideId: "c16", compId: "sec-imm", drugs: "リウマトレックス（MTX）、フォリアミン、ケアラム、エンブレル、ゼルヤンツ", key: "アンカードラッグMTX（週1〜2日投与・休薬日厳守・飲み間違い厳重注意）、葉酸フォリアミン（48h後投与）、間質性肺炎（乾性咳嗽）初期警告。" },
  { rank: 50, name: "痔核（いぼ痔・切れ痔）", cat: "肛門科", guideId: "c26", compId: "sec-extra", drugs: "強力ポステリザン軟膏、プロクトセディル、ボラザG軟膏、ヘモリンガル舌下錠", key: "注入軟膏の二刀流（内痔核は注入、外痔核・裂肛は塗布）、非ステロイド維持（ボラザG）、ヘモリンガル（空腹時舌下投与・飲み込まない）、排便いきみ対策。" },
  { rank: 51, name: "慢性心不全", cat: "循環器", guideId: "c4", compId: "sec-cv", drugs: "エンレスト、フォシーガ、ジャディアンス、ビソプロロール、スピロノラクトン", key: "HFrEF標準治療「ファンタスティック4」（ARNI＋SGLT2i＋MRA＋β遮断薬）、低血圧・腎機能eGFR・血清K（高K血症）・脱水モニタリング。" },
  { rank: 52, name: "頸肩腕症候群（肩こり・首の痛み）", cat: "整形外科", guideId: "c12", compId: "sec-extra", drugs: "ミオナール（エペリゾン）、テルネリン、メチコバール、ロキソニンテープ", key: "中枢性筋弛緩薬（ミオナール：筋緊張緩和）、末梢神経修復ビタミンB12（メチコバール）、外用消炎鎮痛湿布併用。" },
  { rank: 53, name: "口内炎・舌炎", cat: "口腔・耳鼻科", guideId: "c14", compId: "sec-extra", drugs: "アフタゾロン口腔用軟膏、デキサルチン、トラネキサム酸、チョコラBBプラス", key: "口腔用ステロイド軟膏（患部の水分・唾液をティッシュで軽く拭き取ってから擦らず置くように塗布、塗布後飲食30分控える）、ビタミンB2/B6補給。" },
  { rank: 54, name: "膀胱炎（急性・単純性）", cat: "泌尿器・感染症", guideId: "c8", compId: "sec-inf", drugs: "レボフロキサシン、セフカペンピボキシル、バクタ、猪苓湯（ちょれいとう）", key: "急性単純性膀胱炎（大腸菌が主原因、3〜5日間短期間投与）、水分多量摂取で排尿による菌排出を促す、耐性菌予防のため確実に飲み切る。" },
  { rank: 55, name: "統合失調症", cat: "精神神経", guideId: "c6", compId: "sec-psy", drugs: "エビリファイ、ジプレキサ、リスパダール、インヴェガ、ロナセン、レキサルティ", key: "SGA 4大クラス（DSSエビリファイ / MARTAジプレキサ［糖尿病禁忌］ / SDAリスパダール［高PRL］）、錐体外路症状（EPS）・体重増加・高血糖鑑査。" },
  { rank: 56, name: "双極性障害（躁うつ病）", cat: "精神神経", guideId: "c6", compId: "sec-psy", drugs: "リーマス（炭酸リチウム）、ラミクタール、ラツーダ、ビプレッソ、デパケン", key: "気分安定薬リチウム（TDM血中濃度0.6〜1.2目標・脱水時中毒）、ラミクタール（重篤薬疹SJS防止の隔週倍増プロトコル）、ラツーダ（食後服用必須）。" },
  { rank: 57, name: "注意欠如・多動症（ADHD）", cat: "精神・小児", guideId: "c6", compId: "sec-psy", drugs: "コンサータ、ストラテラ（アトモキセチン）、インチュニブ（グアンファシン）", key: "コンサータ（適正流通管理システム登録確認・朝食後服用・食欲不振）、ストラテラ（効果発現2〜4週・CYP2D6）、インチュニブ（急な断薬血圧リバウンド）。" },
  { rank: 58, name: "急性気管支炎・肺炎", cat: "呼吸器・感染症", guideId: "c24", compId: "sec-inf", drugs: "サワシリン、オーグメンチン、ラスビック、クラリス、ジェニナック", key: "市中肺炎第一選択（ペニシリン系高用量＋βラクタマーゼ阻害薬）、非定型肺炎マイコプラズマ（キノロン/マクロライド）、高齢者誤嚥性肺炎（アンピシリン/スルバクタム）。" },
  { rank: 59, name: "扁桃炎・咽頭炎", cat: "耳鼻科・感染症", guideId: "c27", compId: "sec-inf", drugs: "サワシリン（アモキシシリン10日間）、セフジトレン、トラネキサム酸、カロナール", key: "A群β溶血性レンサ球菌（Centorスコア・迅速抗原検査）、溶連菌感染時はリウマチ熱予防のためアモキシシリンを**10日間確実に完遂**させる！" },
  { rank: 60, name: "乾燥肌（皮脂欠乏症・乾皮症）", cat: "皮膚科", guideId: "c16", compId: "sec-imm", drugs: "ヒルドイド（ヘパリン類似物質）、プロペト（白色ワセリン）、パスタロン（尿素）", key: "入浴後5分以内の水分保持塗布、皮膚バリア修復（ヘパリン類似物質）、亀裂・角化部位（尿素製剤※傷口にしみる注意）、刺激保護（プロペト）。" }
];

let newRange3Cards = '';
tier3FullData.forEach(item => {
  const badgeHtml = '<span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>';
  const borderStyle = 'border-left: 4px solid #16a34a;';
  const rankBadge = `<span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">${item.rank}位</span>`;

  let jumpBtns = '';
  if (item.guideId) {
    if (item.guideId.startsWith('c')) {
      jumpBtns += `<button class="dict-jump-btn" onclick="jumpToGuide('${item.guideId}')">📘 ガイド</button>`;
    } else {
      jumpBtns += `<button class="dict-jump-btn" onclick="switchTab('${item.guideId}')">🚀 新薬</button>`;
    }
  }
  if (item.compId) {
    jumpBtns += `<button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', '${item.compId}')">⚔️ 比較</button>`;
  }
  jumpBtns += `<button class="dict-jump-btn" onclick="quickSearch('${item.name.split('（')[0]}')">🔍 検索</button>`;

  newRange3Cards += `        <div class="card" style="margin:0; padding:14px; ${borderStyle} background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              ${rankBadge}
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">${item.name}</h3>
            </div>
            ${badgeHtml}
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>${item.cat}</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> ${item.drugs}
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>${item.key}
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            ${jumpBtns}
          </div>
        </div>\n`;
});

// Replace Range 3 block in 16_top100.html
const range3Regex = /<!-- ==================== 【第3弾】41位〜60位（呼吸器・精神・皮膚・局所感染） ==================== -->[\s\S]*?<!-- ==================== 【第4弾】61位〜80位/;
const newRange3Block = `<!-- ==================== 【第3弾】41位〜60位（呼吸器・精神・皮膚・局所感染） ==================== -->
    <div id="top100-range-r3" class="top100-range-pane" style="display:none;">
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:14px;">
${newRange3Cards}      </div>
    </div>

    <!-- ==================== 【第4弾】61位〜80位`;

top100Html = top100Html.replace(range3Regex, newRange3Block);

// Update status summary in 16_top100.html
const statusRegex = /<span style="color:#16a34a; margin-left:8px; font-weight:900;">[\s\S]*?<\/span>/;
const updatedSummary = `<span style="color:#16a34a; margin-left:8px; font-weight:900;">🟢 第1弾〜第3弾（1〜60位）計60疾患 100% 完備完了！（全Coreガイド ＆ 各種同効薬比較へ完全同期）</span>`;

top100Html = top100Html.replace(statusRegex, updatedSummary);

// Update badge in hero of 16_top100.html
top100Html = top100Html.replace('📊 第1弾・第2弾（1〜40位）完備達成！', '📊 第1弾〜第3弾（1〜60位）60疾患完備達成！');

fs.writeFileSync(pTop100, top100Html, 'utf8');
console.log('Successfully updated 16_top100.html for Tier 3 Complete!');

// =========================================================================
// 4. Update src/14_dictionary.html (Add Tier 3 drug cards)
// =========================================================================
const pDict = path.join(__dirname, '..', '14_dictionary.html');
let dictHtml = fs.readFileSync(pDict, 'utf8');

const tier3DictCards = `    <div class="dict-card" data-type="drug" data-kana="め" data-name="メノエイドコンビパッチ" data-desc="更年期障害ホルモン補充療法（hrt）薬。経皮吸収パッチ。エストラジオール＋酢酸ノルエチステロン配合。肝初回通過効果を回避し血栓リスク低減。週2回貼替。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">メノエイドコンビパッチ</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">エストラジオール・酢酸ノルエチステロン / 経皮吸収型HRT剤</div>
        <div class="dict-card-desc">週2回下腹部等に貼付。子宮を有する女性の更年期症状（ホットフラッシュ・発汗・不眠）を劇的改善。肝初回通過回避で経口ピルより血栓・脂質リスクが低い。乳がん・血栓症禁忌。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-extra')">⚔️ 更年期薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c13')">📘 女性医療ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('メノエイド')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="か" data-name="加味逍遙散" data-desc="漢方製剤（ツムラ24）。更年期障害・自律神経失調症の第一選択。ホットフラッシュ・苛立ち・不眠・情緒不安定を改善。甘草配合のため偽アルドステロン症注意。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">加味逍遙散（ツムラ24）</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">かみしょうようさん / 疏肝解鬱・清熱調経方</div>
        <div class="dict-card-desc">更年期のイライラ・急な発汗（ホットフラッシュ）・不安・不眠に特効。虚弱〜中等度体質に向く。長期連用時は甘草による低カリウム血症・浮腫に注意。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-extra')">⚔️ 更年期薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c13')">📘 女性医療ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('加味逍遙散')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="た" data-name="タリビッド耳科用液" data-desc="抗菌点耳薬。オフロキサシン。急性中耳炎・外耳炎治療薬。内耳カロリック反応（めまい・嘔気）を防ぐため「必ず手で温めてから点耳」するよう指導。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">タリビッド耳科用液 0.3%</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">オフロキサシン / キノロン系点耳薬</div>
        <div class="dict-card-desc">1回6〜10滴点耳後約10分耳浴。冷たいまま点耳すると三半規管が刺激され激しいめまい・嘔吐を起こすため、容器を手のひらで数分温めて体温に近づけてから点耳するよう厳格指導。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-extra')">⚔️ 点耳薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c14')">📘 感覚器ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('タリビッド耳科用')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="ほ" data-name="ボラザG軟膏" data-desc="痔疾治療薬。注入軟膏。トリベノシド・リドカイン配合。ステロイド不含のため長期維持に最適。内痔核には肛門内注入、外痔核・裂肛には患部塗布の二刀流。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ボラザG軟膏</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">トリベノシド・リドカイン / 非ステロイド性痔疾用剤</div>
        <div class="dict-card-desc">抗炎症・創傷治癒促進と局所麻酔による鎮痛。ステロイド不含で皮膚萎縮や感染リスクがなく、慢性裂肛や軽度内痔核の長期維持に安心。内痔核は注入、外痔核は塗布。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-extra')">⚔️ 痔疾薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c26')">📘 消化器ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('ボラザG')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="へ" data-name="ヘモリンガル舌下錠" data-desc="内痔核治療薬。静脈血管叢エキス。水なしで服用できる舌下錠。痔静脈叢のうっ血・浮腫を改善しいぼ痔を縮小。飲み込まずに舌下で溶かす指導必須。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ヘモリンガル舌下錠 0.18mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">静脈血管叢エキス / 内痔核用舌下錠</div>
        <div class="dict-card-desc">いぼ痔の血流を改善し腫れと出血を抑える。空腹時に舌の下に入れて唾液で溶かす。「飲み込むと胃酸や肝初回通過で効果激減する」ため舌下投与を厳守させる。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-extra')">⚔️ 痔疾薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c26')">📘 消化器ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('ヘモリンガル')">📋 詳細</button>
      </div>
    </div>
  
`;

if (!dictHtml.includes('メノエイドコンビパッチ')) {
  const dictTarget = '<div class="dict-card" data-type="drug" data-kana="ほ" data-name="ボルズィ錠"';
  if (dictHtml.includes(dictTarget)) {
    dictHtml = dictHtml.replace(dictTarget, tier3DictCards + dictTarget);
    fs.writeFileSync(pDict, dictHtml, 'utf8');
    console.log('Successfully inserted Tier 3 cards into 14_dictionary.html!');
  }
}

// =========================================================================
// 5. Update src/09_app.js (DRUG_DB)
// =========================================================================
const pApp = path.join(__dirname, '..', '09_app.js');
let appJs = fs.readFileSync(pApp, 'utf8');

const tier3AppDb = `  { name: "メノエイドコンビパッチ", gen: "エストラジオール・酢酸ノルエチステロン", cat: "44. 更年期障害", char: "週2回貼るだけ！肝初回通過回避で経口ピルより血栓・脂質リスクが低いHRT経皮パッチ", desc: "ホットフラッシュや発汗、情緒不安定を劇的改善。週2回下腹部に貼付。乳がん・子宮内膜がん既往や血栓症には禁忌。", gId: "c13", cSec: "sec-extra" },
  { name: "加味逍遙散", gen: "漢方エキス（ツムラ24等）", cat: "44. 更年期障害 / 漢方", char: "更年期のイライラ・のぼせ・自律神経失調を鎮める第一選択漢方方剤", desc: "虚弱〜中等度体質。ホットフラッシュ、不安、不眠に特効。甘草含有のため長期連用時の低カリウム血症・浮腫に注意。", gId: "c13", cSec: "sec-extra" },
  { name: "タリビッド耳科用液", gen: "オフロキサシン", cat: "46. 急性中耳炎・外耳炎", char: "点耳前の「体温加温」が絶対鉄則！冷たいまま差すと激しいめまい・嘔気（カロリック反応）", desc: "急性外耳炎・中耳炎に1回6〜10滴点耳後10分耳浴。容器を手で握って温めてから点耳する指導が事故防止に不可欠。", gId: "c14", cSec: "sec-extra" },
  { name: "ボラザG軟膏", gen: "トリベノシド・リドカイン", cat: "50. 痔核・裂肛", char: "非ステロイド性注入軟膏！内痔核は注入、外痔核・切れ痔は塗布の二刀流", desc: "創傷治癒促進＋局所麻酔による鎮痛。ステロイド不含のため長期維持にも安全。便秘のいきみ対策（酸化Mg）併用。", gId: "c26", cSec: "sec-extra" },
  { name: "ヘモリンガル舌下錠", gen: "静脈血管叢エキス", cat: "50. 内痔核", char: "飲み込まず舌の下で溶かす内痔核薬！痔静脈叢のうっ血・腫れを改善", desc: "空腹時に舌下崩壊させて吸収。飲み込むと効果が激減するため舌下投与を厳守指導。排便コントロールと併用。", gId: "c26", cSec: "sec-extra" },
`;

if (!appJs.includes('"メノエイドコンビパッチ"')) {
  const appTarget = '  { name: "ビラノア",';
  if (appJs.includes(appTarget)) {
    appJs = appJs.replace(appTarget, tier3AppDb + appTarget);
    fs.writeFileSync(pApp, appJs, 'utf8');
    console.log('Successfully inserted Tier 3 drugs into 09_app.js!');
  }
}

console.log('=== Tier 3 Master Build Complete! ===');
