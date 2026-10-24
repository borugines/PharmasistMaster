const fs = require('fs');
const path = require('path');

console.log('=== Building Tier 2 (21-40) Master Completion ===');

// =========================================================================
// 1. Update src/05_comparison.html (Add Eye allergy, Tinea/Nail fungus, Acne)
// =========================================================================
const pComp = path.join(__dirname, '..', '05_comparison.html');
let compHtml = fs.readFileSync(pComp, 'utf8');

// A. Eye allergy comparison in sec-extra
const eyeAllergyCompHtml = `
    <div class="sub-banner banner-class" style="margin-top:20px;">
      <span>👁️ 【アレルギー性結膜炎 点眼薬ガチンコ比較】コンタクト装用・即効性・ステロイド点眼の眼圧注意</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">分類・薬剤名</th>
          <th style="width:20%;">成分名（一般名）</th>
          <th style="width:18%;">用法・点眼回数</th>
          <th style="width:20%;">特徴・コンタクトレンズ可否</th>
          <th style="width:26%;">現場の鑑査急所・ピットフォール</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>アレジオン点眼液<br>（LX 0.1% / 0.05%）</strong></td>
          <td>エピナスチン塩酸塩</td>
          <td><strong>1日2回（LX 0.1%）</strong><br>1日4回（0.05%）</td>
          <td><span class="char">コンタクトレンズの上から点眼OK！</span><br>防腐剤に塩化ベンザルコニウムを含まないためソフトコンタクト装用中でも点眼可能。LXは朝・夕の2回で1日中持続。</td>
          <td>学校や仕事中に点眼できない小児やビジネスパーソンに「アレジオンLX（1日2回）」が絶大な支持。</td>
        </tr>
        <tr>
          <td><strong>パタノール点眼液</strong></td>
          <td>オロパタジン塩酸塩</td>
          <td>1日4回（朝・昼・夕・就寝前）</td>
          <td><span class="char">即効性と痒み鎮静力に定評</span><br>強い痒みを素早く鎮める標準的抗アレルギー点眼。</td>
          <td>塩化ベンザルコニウムを含有するため、<strong>ソフトコンタクトレンズ装用中はレンズを外してから点眼し、10〜15分あけて再装用</strong>するよう指導。</td>
        </tr>
        <tr>
          <td><strong>フルメトロン点眼液<br>（0.02% / 0.1%）</strong></td>
          <td>フルオロメトロン<br>（ステロイド点眼）</td>
          <td>1日2〜4回 症状により適宜増減</td>
          <td><span class="char">重症・春季カタル等の強力消炎</span><br>抗アレルギー点眼で引かない激しい炎症を鎮火。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【眼圧上昇・ステロイド緑内障に厳戒！】</span> 漫然連用厳禁。定期的な眼圧測定が必須。懸濁性点眼のため<strong>「よく振ってから点眼」</strong>。</td>
        </tr>
      </tbody>
    </table>
`;

// B. Tinea / Nail fungus in sec-extra or sec-imm
const tineaCompHtml = `
    <div class="sub-banner banner-class" style="margin-top:20px;">
      <span>👣 【白癬（水虫）・爪白癬（爪水虫）治療薬 ガチンコ比較】外用薬の塗り方・期間 vs 爪外用 vs 経口抗真菌薬</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">病態・薬剤名</th>
          <th style="width:18%;">成分名・剤形</th>
          <th style="width:18%;">用法・塗布部位</th>
          <th style="width:22%;">強み・特徴</th>
          <th style="width:26%;">現場の鑑査急所・服薬指導の鉄則</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>足白癬外用薬</strong><br>・ルリコン（ルリコナゾール）<br>・ラミシール（テルビナフィン）</td>
          <td>イミダゾール系 / アリルアミン系<br>（クリーム / 液 / 軟膏）</td>
          <td>1日1回 入浴後<br><strong>両足裏全体〜足指間</strong></td>
          <td><span class="char">角質への浸透性と殺真菌力</span><br>1日1回塗布で優れた効果。かさかさ角化型にはクリーム、びらん・ただれには軟膏。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【自覚症状消失後も最低1ヶ月継続！】</span> 症状がある部位だけでなく「両足裏全体・足指の間」に広く塗る。皮がむけなくなっても菌は角質奥に潜伏しているため自己中断厳禁。</td>
        </tr>
        <tr>
          <td><strong>爪白癬外用薬</strong><br>・クレナフィン（エフィナコナゾール）<br>・ルコナック（ルリコナゾール）</td>
          <td>トリアゾール系 / イミダゾール系<br>（爪専用外用液）</td>
          <td>1日1回<br><strong>爪全体・爪周囲・爪先皮膚</strong></td>
          <td><span class="char">厚い爪甲を通過する高い透過性</span><br>内服薬が使えない高齢者・肝障害・併用薬多数例の第一選択。</td>
          <td>入浴後に水分を拭き取ってから塗布。ハケ一体型ボトル。爪の根元から先端、爪と皮膚の間まで塗布。<strong>新しい健康な爪が生え変わるまで（6ヶ月〜1年）継続</strong>。</td>
        </tr>
        <tr>
          <td><strong>爪白癬経口内服薬</strong><br><strong>ネイリンカプセル</strong><br>（ホスラブコナゾール）</td>
          <td>経口抗真菌薬<br>（カプセル 100mg）</td>
          <td><strong>1日1回1カプセル</strong><br><strong>12週間（約3ヶ月）連日内服</strong></td>
          <td><span class="char">圧倒的な完全治癒率</span><br>爪母（根元）から抗真菌成分を行き渡らせる。パルス療法（イトリゾール）より簡便。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【投与前・投与中の定期的な肝機能検査（AST/ALT/T-Bil）必須！】</span> 重篤な肝障害に注意。ワルファリン等の併用注意。妊婦禁忌。</td>
        </tr>
      </tbody>
    </table>
`;

// C. Acne (尋常性ざ瘡) in sec-imm
const acneCompHtml = `
    <div class="sub-banner banner-class" style="margin-top:20px;">
      <span>🪞 【尋常性ざ瘡（ニキビ）外用薬 ガチンコ比較】毛穴詰まり解除 vs 殺菌 vs 抗菌薬耐性対策</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">薬剤名（製品名）</th>
          <th style="width:20%;">主成分・作用機序</th>
          <th style="width:16%;">用法・塗布タイミング</th>
          <th style="width:22%;">強み・キャラクター立ち</th>
          <th style="width:26%;">現場の鑑査急所・ピットフォール</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>ベピオゲル / ローション</strong><br>（過酸化ベンゾイル：BPO）</td>
          <td>過酸化ベンゾイル（BPO 2.5%）<br>（強力な酸化殺菌＋角層剥離）</td>
          <td>1日1回 就寝前<br>洗顔・保湿後に塗布</td>
          <td><span class="char">薬剤耐性菌が生じない絶対エース</span><br>フリーラジカルによる酸化殺菌でアクネ菌を死滅させ、毛穴の詰まりも除去。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【漂白作用に厳重注意！】</span> 髪の毛、枕カバー、衣類、タオルに付着すると脱色する！手洗いを徹底。初期の赤み・ヒリヒリ感には保湿剤先行塗布で対処。</td>
        </tr>
        <tr>
          <td><strong>ディフェリンゲル</strong><br>（アダパレン 0.1%）</td>
          <td>レチノイド受容体作動薬<br>（表皮角化正常化・面皰形成抑制）</td>
          <td>1日1回 就寝前<br>患部全体に薄く塗布</td>
          <td><span class="char">白ニキビ（面皰）の根本治療薬</span><br>毛穴の角化異常を正常化し、ニキビの始まりを遮断。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【妊婦・妊娠の可能性のある女性には禁忌！】</span> 催奇形性リスク。使い始めの2〜4週間に「乾燥・落屑・赤み」が高率に出るが、保湿併用で乗り切れば改善。</td>
        </tr>
        <tr>
          <td><strong>エピデュオゲル</strong><br>（配合剤）</td>
          <td>ベピオ（BPO 2.5%）<br>＋ ディフェリン（アダパレン 0.1%）</td>
          <td>1日1回 就寝前</td>
          <td><span class="char">ニキビ外用の最強合剤</span><br>毛穴詰まり解除＋殺菌の二刀流で中等度〜重症ニキビに劇的効果。</td>
          <td>効果最強だが刺激感（赤み・皮剥け・乾燥）も最も強い。保湿剤（ヒルドイド等）をしっかり塗った上から薄く塗布指導。</td>
        </tr>
        <tr>
          <td><strong>デュアック配合ゲル</strong><br>（配合剤）</td>
          <td>ベピオ（BPO 3%）<br>＋ ダラシン（クリンダマイシン 1%）</td>
          <td>1日1回 就寝前<br><strong>要冷蔵（2〜8℃）</strong></td>
          <td><span class="char">赤ニキビ（炎症性皮疹）の急性期</span><br>BPOがクリンダマイシン耐性菌の出現をブロックしながら素早く炎症鎮火。</td>
          <td><strong>冷蔵庫保存（2〜8℃）必須</strong>。耐性菌防止のため急性期の炎症がおさまったらベピオ単剤等へ切り替える。</td>
        </tr>
        <tr>
          <td><strong>ゼビアックスローション</strong><br>（オゼノキサシン 2%）</td>
          <td>新規キノロン系外用抗菌薬<br>（DNAジャイレース/トポIV阻害）</td>
          <td><strong>1日1回</strong> 患部に塗布</td>
          <td><span class="char">1日1回で済む最新外用抗菌薬</span><br>耐性アクネ菌にも高い抗菌力。アクアチムやダラシン（1日2回）より簡便。</td>
          <td>漫然投与厳禁。化膿・赤ニキビが引いたら維持療法（ベピオやディフェリン）へステップダウン。</td>
        </tr>
      </tbody>
    </table>
`;

// Insert tables into 05_comparison.html
const secExtraMarker = '<div class="comp-section sec-extra">';
if (!compHtml.includes('【アレルギー性結膜炎 点眼薬ガチンコ比較】')) {
  if (compHtml.includes(secExtraMarker)) {
    compHtml = compHtml.replace(secExtraMarker, secExtraMarker + '\n' + eyeAllergyCompHtml + '\n' + tineaCompHtml);
    console.log('Successfully inserted Eye allergy and Tinea tables into 05_comparison.html!');
  }
}

const secImmMarker = '<div class="comp-section sec-imm">';
if (!compHtml.includes('【尋常性ざ瘡（ニキビ）外用薬 ガチンコ比較】')) {
  if (compHtml.includes(secImmMarker)) {
    compHtml = compHtml.replace(secImmMarker, secImmMarker + '\n' + acneCompHtml);
    console.log('Successfully inserted Acne table into 05_comparison.html!');
  }
}

fs.writeFileSync(pComp, compHtml, 'utf8');

// =========================================================================
// 2. Update src/03_guide.html (Enhance c14 eye allergy & c16 tinea/acne)
// =========================================================================
const pGuide = path.join(__dirname, '..', '03_guide.html');
let guideHtml = fs.readFileSync(pGuide, 'utf8');

// Enhance c14 with eye allergy
const c14PearlsTarget = '<li><strong>「目薬を差した後にパチパチまばたきをするな！」：</strong>点眼後にパチパチすると、瞬目のポンプ作用で目薬が涙道から鼻や喉へ一瞬で流れ出てしまう。';
const c14PearlsAdd = `<li><strong>アレルギー性結膜炎（アレジオンLX vs パタノール）：</strong>アレジオン点眼（エピナスチン）は防腐剤に塩化ベンザルコニウムを含まないため**「コンタクトレンズを装用したまま点眼可能」**！アレジオンLXなら1日2回（朝・夕）で1日中持続し、学校や職場で点眼できない患者に最適。パタノールは即効性に優れるがコンタクト装用中は外す必要がある。</li>
        <li><strong>フルメトロン等ステロイド点眼の「眼圧上昇（ステロイド緑内障）」に厳戒注意！：</strong>抗アレルギー点眼で効かない激しい炎症に使われるが、漫然と点眼を続けると眼圧が急上昇して視神経障害を起こす事例がある。定期的な眼圧測定の受診勧奨と、懸濁液のため「よく振ってから点眼」を徹底せよ。</li>
        <li><strong>「目薬を差した後にパチパチまばたきをするな！」：</strong>点眼後にパチパチすると、瞬目のポンプ作用で目薬が涙道から鼻や喉へ一瞬で流れ出てしまう。`;

if (!guideHtml.includes('アレジオンLX vs パタノール')) {
  if (guideHtml.includes(c14PearlsTarget)) {
    guideHtml = guideHtml.replace(c14PearlsTarget, c14PearlsAdd);
    console.log('Enhanced c14 with Eye allergy pearls!');
  }
}

// Enhance c16 with tinea and acne
const c16PearlsTarget = '<li><strong>ステロイド外用薬を塗る「量」の基準＝FTU（フィンガーチップユニット）：</strong>大人の人差し指の先端から第一関節までチューブから出した量（約0.5g）で、<strong>大人の手のひら2枚分の面積</strong>に塗る。';
const c16PearlsAdd = `<li><strong>尋常性ざ瘡（ニキビ外用薬）の2大鉄則「ベピオの漂白作用」＆「ディフェリンの妊婦禁忌」：</strong>
          <br>・<strong>ベピオ（過酸化ベンゾイル）：</strong>耐性菌が出ない酸化殺菌薬だが、<strong>「髪やタオル・枕カバーに触れると白く脱色する」</strong>ため就寝前の手洗いとタオルの注意を必ず伝える。
          <br>・<strong>ディフェリン（アダパレン）：</strong>毛穴の詰まりを取るレチノイド誘導体だが、<strong>催奇形性リスクのため妊婦・妊娠希望女性には絶対禁忌</strong>！初期の乾燥・皮剥けは保湿併用で乗り切らせる。</li>
        <li><strong>白癬（水虫）・爪水虫の服薬指導急所：</strong>
          <br>・<strong>足白癬外用薬（ルリコン・ラミシール等）：</strong>皮がむけている所だけでなく「両足裏全体・足指間」に広く塗り、<strong>見た目が治ってからも最低1ヶ月間は塗り続ける</strong>（角質奥の潜伏菌を根絶する）。
          <br>・<strong>爪白癬内服薬ネイリン（ホスラブコナゾール）：</strong>12週間内服で治癒率が高いが、<strong>定期的な肝機能検査（AST/ALT）が必須</strong>！</li>
        <li><strong>ステロイド外用薬を塗る「量」の基準＝FTU（フィンガーチップユニット）：</strong>大人の人差し指の先端から第一関節までチューブから出した量（約0.5g）で、<strong>大人の手のひら2枚分の面積</strong>に塗る。`;

if (!guideHtml.includes('ベピオの漂白作用')) {
  if (guideHtml.includes(c16PearlsTarget)) {
    guideHtml = guideHtml.replace(c16PearlsTarget, c16PearlsAdd);
    console.log('Enhanced c16 with Acne and Tinea pearls!');
  }
}

fs.writeFileSync(pGuide, guideHtml, 'utf8');

// =========================================================================
// 3. Update src/16_top100.html (Set 21-40 to status: "ok" with full details)
// =========================================================================
const pTop100 = path.join(__dirname, '..', '16_top100.html');
let top100Html = fs.readFileSync(pTop100, 'utf8');

const tier2FullData = [
  { rank: 21, name: "緑内障・高眼圧症", cat: "眼科", guideId: "c14", compId: "sec-extra", drugs: "キサラタン、タプロス、チモプトールXE、アイファガン、アゾプト、アイラミド", key: "第一選択FP作動薬（夜1回点滴・色素沈着まぶた洗い流し）、β遮断点眼（チモプトール：喘息禁忌・目頭押さえ）。" },
  { rank: 22, name: "過活動膀胱（頻尿・尿失禁）", cat: "泌尿器", guideId: "c9", compId: "sec-ckd", drugs: "ベオーバ（ビベグロン）、ベタニス（ミラベグロン）、トビエース、ベシケア", key: "第一選択β3作動薬（ベオーバ：相互作用少なく高齢者に安全）、抗コリン薬（口渇・便秘・尿閉・認知機能低下に注意）。" },
  { rank: 23, name: "不安障害・パニック障害", cat: "精神神経", guideId: "c6", compId: "sec-psy", drugs: "レクサプロ、ジェイゾロフト、パキシルCR、ソラナックス、デパス、セディール", key: "第一選択SSRI（ゆっくり効いて再発予防）、急性期発作頓用にベンゾ短期間（依存・離脱症状に留意し漫然連用回避）。" },
  { rank: 24, name: "片頭痛・緊張型頭痛", cat: "神経内科", guideId: "c12", compId: "sec-extra", drugs: "トリプタン（エレトリプタン等）、レイボー、エムガルティ、デパケン、ミオナール", key: "片頭痛急性期（痛み初期にトリプタン、血管収縮なしレイボー）、CGRP抗体予防注射、薬物乱用頭痛（MOH月10〜15日以上）。" },
  { rank: 25, name: "アレルギー性結膜炎", cat: "眼科", guideId: "c14", compId: "sec-extra", drugs: "アレジオンLX点眼、パタノール点眼、リボスチン点眼、フルメトロン点眼", key: "アレジオンLX（1日2回・コンタクト装用したまま点眼可能）、パタノール（即効性）、ステロイド点眼（眼圧上昇注意・よく振る）。" },
  { rank: 26, name: "新型コロナウイルス感染症（COVID-19）", cat: "感染症", guideId: "tab-newdrugs", compId: "sec-inf", drugs: "ゾコーバ（エンシトレルビル）、パキロビッド、ラゲブリオ、カロナール", key: "ゾコーバ（催奇形性で妊婦絶対禁忌・CYP3A阻害）、パキロビッド（併用禁忌40種以上の照合必須）、重症化リスク層評価。" },
  { rank: 27, name: "認知症（アルツハイマー型など）", cat: "精神・老年", guideId: "c6", compId: "sec-psy", drugs: "アリセプト（ドネペジル）、メマリー（メマンチン）、リバスタッチ/イクセロン、レケンビ", key: "コリンエステラーゼ阻害薬（消化器症状・徐脈・興奮に注意、貼付剤活用）、メマリー（中等度〜高度・NMDA阻害・腎機能用量）。" },
  { rank: 28, name: "心房細動・不整脈", cat: "循環器", guideId: "c4", compId: "sec-cv", drugs: "エリキュース、リクシアナ、イグザレルト、プラザキサ、ワルファリン、メインテート", key: "DOAC 4剤使い分け（腎機能eGFR用量調整、1日1回vs2回、中和剤）、ワルファリン（納豆禁忌・INR管理）、心不全・徐脈注意。" },
  { rank: 29, name: "感染性胃腸炎・急性下痢症", cat: "消化器・感染症", guideId: "c21", compId: "sec-ckd", drugs: "ビオフェルミン、耐性乳酸菌、五苓散、経口補水液（OS-1）、ホスホマイシン", key: "感染性下痢にロペミン（止瀉薬）安易投与絶対厳禁（菌や毒素の腸内停滞・腸管麻痺）、脱水補正（OS-1少量頻回）、吐き気（五苓散）。" },
  { rank: 30, name: "白癬（水虫・爪水虫）", cat: "皮膚科", guideId: "c16", compId: "sec-extra", drugs: "ルリコン、ラミシール、クレナフィン、ルコナック、ネイリンカプセル", key: "足白癬外用（両足裏全体に広く・皮むけ治癒後も最低1ヶ月継続）、爪白癬外用（新爪生え変わりまで）、経口ネイリン（定期肝機能検査必須）。" },
  { rank: 31, name: "狭心症・陳旧性心筋梗塞", cat: "循環器", guideId: "c4", compId: "sec-cv", drugs: "ニトロペン舌下錠、バイアスピリン、エフィエント、ニトロール、ビソプロロール", key: "発作時ニトロペン（坐位で舌下投与・立ちくらみ転倒注意・PDE5併用禁忌）、DAPT（抗血小板2剤併用期間・出血リスク）、β遮断薬。" },
  { rank: 32, name: "蕁麻疹（じんましん）", cat: "皮膚科・アレルギー", guideId: "c16", compId: "sec-imm", drugs: "デザレックス、ビラノア、ルパフィン、アレロック、ヒドロキシジン、ゾレア皮下注", key: "第二世代抗ヒスタミン薬が第一選択（効果不十分時は倍量増量または他剤併用）、難治性特発性蕁麻疹へのゾレア（抗IgE抗体皮下注）。" },
  { rank: 33, name: "月経困難症・PMS（月経前症候群）", cat: "婦人科", guideId: "c13", compId: "sec-extra", drugs: "ヤーズ、ジェミーナ、ヤーズフレックス、ドロエチ、当帰芍薬散、加味逍遙散", key: "低用量ピル・LEP製剤（血栓症VTEリスクACHESの初期説明必須！）、連続投与製剤（出血回数減少）、PMS漢方（加味逍遙散/抑肝散）。" },
  { rank: 34, name: "尋常性ざ瘡（ニキビ）", cat: "皮膚科", guideId: "c16", compId: "sec-imm", drugs: "ベピオ（過酸化ベンゾイル）、ディフェリン、エピデュオ、デュアック、ゼビアックス", key: "ベピオ（耐性菌なし・衣類漂白注意）、ディフェリン（催奇形性・妊婦禁忌・初期乾燥剥離）、ゼビアックス（1日1回外用抗菌薬）。" },
  { rank: 35, name: "白内障（術前後管理含む）", cat: "眼科", guideId: "c14", compId: "sec-extra", drugs: "カリーユニ、ピレノキシン、ガチフロ点眼、ベストロン点眼、ジクロード点眼", key: "進行予防（カリーユニ）、術前・術後管理（感染予防抗菌点眼＋消炎ステロイド/NSAIDs点眼の3剤併用・5分以上あけて点眼）。" },
  { rank: 36, name: "脳梗塞後遺症（再発予防含む）", cat: "脳神経", guideId: "c5", compId: "sec-cv", drugs: "クロピドグレル（プラビックス）、バイアスピリン、シロスタゾール（プレタール）", key: "病型別抗血栓（非心原性アテローム/ラクナ＝抗血小板、心原性塞栓＝DOAC）、クロピドグレル（CYP2C19）、シロスタゾール（頻脈・頭痛）。" },
  { rank: 37, name: "鉄欠乏性貧血", cat: "血液・内科", guideId: "c19", compId: "sec-extra", drugs: "フェロミア、フェルム、スローフィー、リオナ、インクレミンシロップ", key: "経口鉄剤（悪心・胃痛・便秘・便の黒色化）、キノロン・テトラサイクリン・チラーヂンとのキレート2時間空け、フェリチン正常化まで継続。" },
  { rank: 38, name: "副鼻腔炎（ちくのう症）", cat: "耳鼻科", guideId: "c27", compId: "sec-inf", drugs: "クラリス（少量長期投与）、オーグメンチン、カルボシステイン、辛夷清肺湯", key: "慢性副鼻腔炎（マクロライド14員環CAM 200mg 1日1回少量長期投与による抗炎症・粘液抑制）、急性増悪（ペニシリン系高用量）。" },
  { rank: 39, name: "めまい（メニエール病・良性発作性頭位めまい症）", cat: "耳鼻科・神経", guideId: "c14", compId: "sec-extra", drugs: "メリスロン（ベタヒスチン）、セファドール、イソバイド、アデホスコーワ、五苓散", key: "メリスロン（ヒスタミン様作用で喘息・消化性潰瘍注意）、イソバイド（浸透圧利尿・冷所保管・水や炭酸水割り指導）、頭位めまいリハビリ。" },
  { rank: 40, name: "慢性腎臓病（CKD）", cat: "腎臓内科", guideId: "c9", compId: "sec-ckd", drugs: "フォシーガ、ケレンディア、クレメジン、球形吸着炭、炭酸水素ナトリウム、ロカルトロール", key: "SGLT2阻害薬（心腎保護・非糖尿病CKD適応）、ケレンディア（非ステロイドMRA・高K血症注意）、クレメジン（他剤と2時間空け服用）。" }
];

let newRange2Cards = '';
tier2FullData.forEach(item => {
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

  newRange2Cards += `        <div class="card" style="margin:0; padding:14px; ${borderStyle} background:#ffffff;">
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

// Replace Range 2 block in 16_top100.html
const range2Regex = /<!-- ==================== 【第2弾】21位〜40位（感覚器・感染症・慢性疾患） ==================== -->[\s\S]*?<!-- ==================== 【第3弾】41位〜60位/;
const newRange2Block = `<!-- ==================== 【第2弾】21位〜40位（感覚器・感染症・慢性疾患） ==================== -->
    <div id="top100-range-r2" class="top100-range-pane" style="display:none;">
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:14px;">
${newRange2Cards}      </div>
    </div>

    <!-- ==================== 【第3弾】41位〜60位`;

top100Html = top100Html.replace(range2Regex, newRange2Block);

// Update status summary in 16_top100.html
const statusRegex = /<span style="color:#16a34a; margin-left:8px; font-weight:900;">[\s\S]*?<\/span>/;
const updatedSummary = `<span style="color:#16a34a; margin-left:8px; font-weight:900;">🟢 第1弾（1〜20位）＆ 第2弾（21〜40位）計40疾患 100% 完備完了！（全Coreガイド ＆ 同効薬比較へ完全同期）</span>`;

top100Html = top100Html.replace(statusRegex, updatedSummary);

// Update badge in hero of 16_top100.html
top100Html = top100Html.replace('📊 第1弾（1〜20位）精査中', '📊 第1弾・第2弾（1〜40位）完備達成！');

fs.writeFileSync(pTop100, top100Html, 'utf8');
console.log('Successfully updated 16_top100.html for Tier 2 Complete!');

// =========================================================================
// 4. Update src/14_dictionary.html (Add Tier 2 drug cards)
// =========================================================================
const pDict = path.join(__dirname, '..', '14_dictionary.html');
let dictHtml = fs.readFileSync(pDict, 'utf8');

const tier2DictCards = `    <div class="dict-card" data-type="drug" data-kana="あ" data-name="アレジオンLX点眼液" data-desc="抗アレルギー点眼薬。エピナスチン塩酸塩。1日2回点眼で1日中効果持続。防腐剤ベンザルコニウム不含のためコンタクトレンズ装用したまま点眼可能。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">アレジオンLX点眼液 0.1%</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">エピナスチン塩酸塩 / 高濃度抗ヒスタミン点眼薬</div>
        <div class="dict-card-desc">1日2回（朝・夕）点眼で1日中アレルギー性結膜炎の痒みを遮断。防腐剤ベンザルコニウム不含のため、ソフトコンタクトレンズの上から直接点眼可能！</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-extra')">⚔️ 点眼比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c14')">📘 眼科ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('アレジオン点眼')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="へ" data-name="ベピオゲル / ローション" data-desc="尋常性ざ瘡治療薬。過酸化ベンゾイル（bpo）。強力な酸化殺菌＋角層剥離作用。アクネ菌耐性化が起こらない。髪・衣類・タオルの漂白（脱色）に注意。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ベピオゲル 2.5% / ローション</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">過酸化ベンゾイル（BPO） / ニキビ治療薬</div>
        <div class="dict-card-desc">酸化殺菌でアクネ菌を死滅させ毛穴詰まりを解消。薬剤耐性菌が生じない。髪・衣類・タオルの「漂白脱色」に厳重注意。初期の乾燥・赤みには保湿剤先行塗布。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-imm')">⚔️ ニキビ薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c16')">📘 皮膚科ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('ベピオ')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="て" data-name="ディフェリンゲル" data-desc="尋常性ざ瘡治療薬。アダパレン。レチノイド受容体作動薬。表皮角化正常化により毛穴詰まりを予防。催奇形性のため妊婦・妊娠希望女性には絶対禁忌。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ディフェリンゲル 0.1%</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">アダパレン / 外用レチノイド様作用薬</div>
        <div class="dict-card-desc">微小面皰の形成を抑えニキビを根本予防。催奇形性リスクのため妊婦・妊娠可能性女性は禁忌。使い始めの2〜4週間に乾燥・皮剥けが出やすいため保湿必須。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-imm')">⚔️ ニキビ薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c16')">📘 皮膚科ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('ディフェリン')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="ね" data-name="ネイリンカプセル" data-desc="爪白癬治療薬。ホスラブコナゾール。1日1回1カプセルを12週間連日内服。高い爪甲移行性と完全治癒率。投与前・投与中の定期的な肝機能検査（ast/alt）必須。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ネイリンカプセル 100mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">ホスラブコナゾール L-リシンエタノール / 経口爪白癬治療薬</div>
        <div class="dict-card-desc">1日1回1カプセルを12週間内服。爪母から爪全体へ成分を浸透させ治癒に導く。重篤な肝機能障害リスクがあるため投与前および投与中の定期採血（AST/ALT/T-Bil）必須。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-extra')">⚔️ 白癬薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c16')">📘 皮膚科ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('ネイリン')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="く" data-name="クレナフィン爪外用液" data-desc="爪白癬外用薬。エフィナコナゾール。爪甲透過性に優れた外用液。ハケ一体型ボトル。爪全体・爪と皮膚の間に1日1回塗布。健康な爪が生え変わるまで継続。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">クレナフィン爪外用液 10%</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">エフィナコナゾール / 爪白癬外用抗真菌液</div>
        <div class="dict-card-desc">硬い爪甲を深く通過して白癬菌を殺菌。内服薬が使えない高齢者・肝機能低下例に第一選択。新しい健康な爪が生え変わるまで（半年〜1年）根気強く塗布指導。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-extra')">⚔️ 白癬薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c16')">📘 皮膚科ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('クレナフィン')">📋 詳細</button>
      </div>
    </div>
  
`;

if (!dictHtml.includes('アレジオンLX点眼液')) {
  const dictTarget = '<div class="dict-card" data-type="drug" data-kana="ほ" data-name="ボルズィ錠"';
  if (dictHtml.includes(dictTarget)) {
    dictHtml = dictHtml.replace(dictTarget, tier2DictCards + dictTarget);
    fs.writeFileSync(pDict, dictHtml, 'utf8');
    console.log('Successfully inserted Tier 2 cards into 14_dictionary.html!');
  }
}

// =========================================================================
// 5. Update src/09_app.js (DRUG_DB)
// =========================================================================
const pApp = path.join(__dirname, '..', '09_app.js');
let appJs = fs.readFileSync(pApp, 'utf8');

const tier2AppDb = `  { name: "アレジオンLX点眼液", gen: "エピナスチン塩酸塩", cat: "25. アレルギー性結膜炎", char: "1日2回で効果持続！コンタクトレンズを装用したまま直接点眼できる最強点眼薬", desc: "塩化ベンザルコニウム不含のためソフトコンタクト装用中もそのまま点眼OK。朝・夕の1日2回で日中の目のかゆみを完全ブロック。", gId: "c14", cSec: "sec-extra" },
  { name: "ベピオゲル / ローション", gen: "過酸化ベンゾイル（BPO）", cat: "34. 尋常性ざ瘡（ニキビ）", char: "耐性菌が出ない酸化殺菌エース！衣類・タオルの漂白（脱色）に厳重注意", desc: "アクネ菌を死滅させ毛穴詰まりを解除。髪や枕カバー、衣類、タオルに付着すると白く色が抜けるため手洗い徹底。初期の乾燥赤みには保湿併用。", gId: "c16", cSec: "sec-imm" },
  { name: "ディフェリンゲル", gen: "アダパレン", cat: "34. 尋常性ざ瘡（ニキビ）", char: "白ニキビの毛穴詰まりを根本解除！妊婦・妊娠希望女性には催奇形性のため絶対禁忌", desc: "表皮角化を正常化。使い始めの2〜4週間に乾燥・落屑・赤みが高率に出るが保湿で乗り切れば改善。妊婦禁忌。", gId: "c16", cSec: "sec-imm" },
  { name: "ネイリンカプセル", gen: "ホスラブコナゾール", cat: "30. 爪白癬（爪水虫）", char: "1日1回1カプセルを12週間内服で治癒！定期的な肝機能検査（AST/ALT）必須", desc: "爪母から爪全体に強力浸透。12週間内服で高い完全治癒率。重篤な肝障害を防ぐため投与前および投与中の定期採血必須。妊婦禁忌。", gId: "c16", cSec: "sec-extra" },
  { name: "クレナフィン爪外用液", gen: "エフィナコナゾール", cat: "30. 爪白癬（爪水虫）", char: "厚い爪を透過する外用爪水虫薬！新しい健康な爪が生え変わるまで毎日塗布", desc: "ハケ一体型で爪全体・爪周囲・爪先に塗布。内服が使えない肝障害や高齢者にも安全。爪の生え変わり（半年〜1年）まで継続。", gId: "c16", cSec: "sec-extra" },
  { name: "ベオーバ", gen: "ビベグロン", cat: "22. 過活動膀胱（OAB）", char: "選択的β3作動薬！CYP2D6阻害がなく多剤併用の高齢者でも使いやすいOAB第一選択", desc: "膀胱平滑筋を弛緩させ蓄尿機能を改善。ベタニスと異なりCYP2D6阻害や生殖年齢への制限がなく相互作用が少ない。", gId: "c9", cSec: "sec-ckd" },
`;

if (!appJs.includes('"アレジオンLX点眼液"')) {
  const appTarget = '  { name: "ビラノア",';
  if (appJs.includes(appTarget)) {
    appJs = appJs.replace(appTarget, tier2AppDb + appTarget);
    fs.writeFileSync(pApp, appJs, 'utf8');
    console.log('Successfully inserted Tier 2 drugs into 09_app.js!');
  }
}

console.log('=== Tier 2 Master Build Complete! ===');
