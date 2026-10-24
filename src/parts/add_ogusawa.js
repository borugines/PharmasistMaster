const fs = require('fs');
const path = require('path');

console.log('=== Adding Ogusawa Prescription (オグサワ処方) to System ===');

// 1. Update src/05_comparison.html (Add Ogusawa Prescription Deep Dive Box)
const compPath = path.join(__dirname, '../05_comparison.html');
let compContent = fs.readFileSync(compPath, 'utf8');

const ogusawaCompHtml = `
    <!-- 💊 【臨床の超頻出トラップ：オグサワ処方（オーグメンチン＋サワシリン併用）の真実】 -->
    <div style="background:#fefce8; border:2px solid #ca8a04; border-radius:10px; padding:16px 18px; margin-top:20px; margin-bottom:20px; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; border-bottom:2px dashed #eab308; padding-bottom:8px; margin-bottom:12px;">
        <h3 style="margin:0; font-size:1.15rem; color:#854d0e; display:flex; align-items:center; gap:8px;">
          <span>💊</span> <strong>【超頻出ウラ読み】「オグサワ処方（オーグメンチン ＋ サワシリン）」の真実</strong>
        </h3>
        <span style="background:#fef08a; color:#854d0e; padding:3px 10px; border-radius:12px; font-size:0.78rem; font-weight:bold; border:1px solid #facc15;">
          小児科・耳鼻科・呼吸器科 必須知識
        </span>
      </div>
      
      <div style="font-size:0.88rem; color:#451a03; line-height:1.6;">
        <p style="margin:0 0 10px 0;">
          <strong>🚨 実習生・新人薬剤師が必ず引っかかる落とし穴：</strong><br>
          「オーグメンチン（アモキシシリン＋クラブラン酸）」と「サワシリン（アモキシシリン）」が同時に処方されているのを見て、<span style="color:#b91c1c; font-weight:bold;">『アモキシシリンの重複処方！過量投与の疑義照会だ！』</span>と電話をかけてはいけない！これは日本の配合比率の欠陥を克服するために編み出された<strong>意図的な合目的処方（オグサワ処方）</strong>である。
        </p>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:12px; margin-bottom:12px;">
          <div style="background:#ffffff; border:1px solid #fde047; border-radius:6px; padding:10px 12px;">
            <strong style="color:#a16207; font-size:0.9rem;">① なぜオーグメンチン単独ではダメなのか？</strong><br>
            ・日本のオーグメンチン配合比率は<strong>「アモキシシリン：クラブラン酸 ＝ 2：1」</strong>。<br>
            ・耐性肺炎球菌（PRSP）や耐性インフルエンザ菌（BLPACR）を叩くためにアモキシシリンを高用量（小児70〜90mg/kg/日、成人1500〜2000mg/日）にしたい。<br>
            ・しかしオーグメンチンだけで増量すると、<strong>クラブラン酸も跳ね上がり、腸管運動亢進による「激烈な水様性下痢」</strong>で患者が脱落してしまう！
          </div>
          <div style="background:#ffffff; border:1px solid #fde047; border-radius:6px; padding:10px 12px;">
            <strong style="color:#a16207; font-size:0.9rem;">② オグサワ処方の奇跡のブレンド（欧米比率の再現）</strong><br>
            ・欧米のAugmentin製剤は下痢を防ぐため<strong>「7：1 や 14：1」</strong>の高アモキシシリン比率。<br>
            ・そこで、<strong>「オーグメンチン（下痢を起こさないクラブラン酸安全量）＋ サワシリン（アモキシシリン単剤を上乗せ！）」</strong>することで、<strong>下痢を防ぎつつアモキシシリンだけを高用量にする黄金比率</strong>を日本で人工的に作り出している！
          </div>
        </div>

        <div style="background:#fef9c3; border-left:4px solid #eab308; padding:8px 12px; border-radius:4px; font-size:0.83rem;">
          <strong>🎯 処方例と鑑査ポイント：</strong><br>
          ・<strong>小児（難治性急性中耳炎 10kg児）：</strong>オーグメンチン配合細粒（クラブラン酸約6.4〜10mg/kg/日） ＋ ワイドシリン細粒（アモキシシリン合計70〜90mg/kg/日になるよう上乗せ）。<br>
          ・<strong>成人（難治性副鼻腔炎・肺炎）：</strong>オーグメンチン250RS 1回1錠 ＋ サワシリン250mg 1回1Cap（1日3回） ➔ アモキシシリン計1500mg ＋ クラブラン酸375mg（4：1の理想比率で耐性菌を完封！）。
        </div>
      </div>
    </div>
`;

const compTarget = '<!-- 👶 【小児科調剤鑑査・小児用量（mg/kg）＆ 年齢・体重換算 完全早見マトリクス】 -->';
if (compContent.includes(compTarget) && !compContent.includes('オグサワ処方')) {
  compContent = compContent.replace(compTarget, ogusawaCompHtml + '\n' + compTarget);
  fs.writeFileSync(compPath, compContent, 'utf8');
  console.log('Successfully inserted Ogusawa Prescription box into 05_comparison.html!');
} else {
  console.log('05_comparison.html already updated or target not found.');
}

// 2. Update src/03_guide.html (Add Ogusawa to Core 18 Off-label section)
const guidePath = path.join(__dirname, '../03_guide.html');
let guideContent = fs.readFileSync(guidePath, 'utf8');

const oldC18Offlabel = `      <div class="offlabel">
      <h3>🕵️‍♂️ 処方箋のウラ読み（適応外・意外な処方意図）</h3>
      <ul>
        <li><strong>生後6ヶ月〜乳幼児にデカドロンエリキシル（デキサメタゾン）：</strong>「オットセイの鳴き声のような咳（犬吠様咳嗽）」を伴う<strong>クループ症候群（急性喉頭気管気管支炎）</strong>のレスキュー！喉の急激な狭窄・窒息を防ぐため単回内服される救急処方。</li>
      </ul>
    </div>`;

const newC18Offlabel = `      <div class="offlabel">
      <h3>🕵️‍♂️ 処方箋のウラ読み（適応外・意外な処方意図）</h3>
      <ul>
        <li><strong>生後6ヶ月〜乳幼児にデカドロンエリキシル（デキサメタゾン）：</strong>「オットセイの鳴き声のような咳（犬吠様咳嗽）」を伴う<strong>クループ症候群（急性喉頭気管気管支炎）</strong>のレスキュー！喉の急激な狭窄・窒息を防ぐため単回内服される救急処方。</li>
        <li><strong>小児科・耳鼻科の「オグサワ処方（オーグメンチン＋サワシリン）」：</strong>
          オーグメンチンとサワシリンの同時処方は重複過量投与ではない！日本のオーグメンチンはクラブラン酸比率が高く（2:1）そのまま増量すると激烈な下痢を起こすため、<strong>「オーグメンチンで下痢の起きないクラブラン酸量を確保し、サワシリンでアモキシシリンだけを高用量（中耳炎倍量 70〜90mg/kg/日）に上乗せして耐性菌（PRSP/BLPACR）を叩き潰す」</strong>専門処方！
        </li>
      </ul>
    </div>`;

if (guideContent.includes(oldC18Offlabel) && !guideContent.includes('小児科・耳鼻科の「オグサワ処方')) {
  guideContent = guideContent.replace(oldC18Offlabel, newC18Offlabel);
  fs.writeFileSync(guidePath, guideContent, 'utf8');
  console.log('Successfully updated Core 18 offlabel in 03_guide.html!');
} else {
  console.log('03_guide.html already updated or target not found.');
}

// 3. Update src/06_answers.html (Add Question & Answer for Ogusawa)
const answersPath = path.join(__dirname, '../06_answers.html');
let answersContent = fs.readFileSync(answersPath, 'utf8');

const ogusawaAnswerHtml = `
    <!-- Q&A: オグサワ処方 -->
    <div class="qa-card" style="background:#ffffff; border-left:4px solid #ca8a04; border-radius:8px; padding:14px 16px; margin-bottom:16px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="background:#fef08a; color:#854d0e; font-size:0.75rem; font-weight:bold; padding:2px 8px; border-radius:12px;">処方意図・疑義照会鑑別</span>
        <span style="font-size:0.75rem; color:#64748b;">難易度：★★★★☆</span>
      </div>
      <h3 style="margin:0 0 8px 0; font-size:1.02rem; color:#0f172a;">
        🙋‍♂️ 実習生の質問：「オーグメンチンとサワシリンが同時に処方されています。アモキシシリンが重複して過量投与になっているのではないでしょうか？疑義照会すべきですか？」
      </h3>
      <div style="font-size:0.88rem; color:#334155; line-height:1.55; background:#f8fafc; padding:10px 12px; border-radius:6px;">
        <strong>💡 指導薬剤師の回答（神回答）：</strong><br>
        「疑義照会してはいけません！これは感染症治療で極めて有名な<strong>『オグサワ処方』</strong>という合目的処方です。<br>
        日本のオーグメンチンは『アモキシシリン：クラブラン酸 ＝ 2：1』で配合されていますが、耐性肺炎球菌（PRSP）等を叩くためにオーグメンチンだけでアモキシシリンを増量すると、<strong>クラブラン酸も過量になって激しい水様性下痢</strong>を起こしてしまいます。<br>
        そこで、<strong>オーグメンチンで下痢の出ない安全なクラブラン酸量をキープしつつ、サワシリン（アモキシシリン単剤）を上乗せして、アモキシシリンだけを欧米基準の高用量（中耳炎なら70〜90mg/kg/日）に引き上げる</strong>という、医師の計算された高度な処方意図なのです！」
      </div>
    </div>
`;

const ansTarget = '  <div class="container"';
if (answersContent.includes(ansTarget) && !answersContent.includes('オグサワ処方')) {
  // Insert at top of container
  const cIdx = answersContent.indexOf('>', answersContent.indexOf(ansTarget)) + 1;
  answersContent = answersContent.substring(0, cIdx) + '\n' + ogusawaAnswerHtml + answersContent.substring(cIdx);
  fs.writeFileSync(answersPath, answersContent, 'utf8');
  console.log('Successfully inserted Ogusawa QA into 06_answers.html!');
} else {
  console.log('06_answers.html already updated or target not found.');
}

// 4. Update src/09_app.js (Add keyword to DRUG_DB for searchability)
const appPath = path.join(__dirname, '../09_app.js');
let appContent = fs.readFileSync(appPath, 'utf8');

const ogusawaDbEntry = `  { name: "オグサワ処方", gen: "オーグメンチン＋サワシリン併用", cat: "感染症・小児科処方ウラ読み", char: "アモキシシリン重複処方ではない！クラブラン酸下痢を防ぎ耐性菌を叩く黄金比率", desc: "日本のオーグメンチン配合比（2:1）の欠点を補うため、オーグメンチンにサワシリンを上乗せして下痢を起こさず高用量アモキシシリン（70〜90mg/kg/日）を達成する意図的処方。", gId: "c18", cSec: "sec-inf" },\n`;

if (appContent.includes('const DRUG_DB = [') && !appContent.includes('オグサワ処方')) {
  appContent = appContent.replace('const DRUG_DB = [\n', 'const DRUG_DB = [\n' + ogusawaDbEntry);
  fs.writeFileSync(appPath, appContent, 'utf8');
  console.log('Successfully added Ogusawa to DRUG_DB in 09_app.js!');
} else {
  console.log('09_app.js already updated or target not found.');
}

console.log('=== Ogusawa Integration Complete! ===');
