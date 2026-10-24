const fs = require('fs');
const path = require('path');

const pGuide = path.join(__dirname, '..', '03_guide.html');
let guideHtml = fs.readFileSync(pGuide, 'utf8');

// Add オスタバロ chip
const oldChips = `<span class="flow-chip" onclick="quickSearch('テリボン')">テリボン</span></div>`;
const newChips = `<span class="flow-chip" onclick="quickSearch('テリボン')">テリボン</span><span class="flow-chip" onclick="quickSearch('オスタバロ')">オスタバロ</span></div>`;

if (guideHtml.includes(oldChips)) {
  guideHtml = guideHtml.replace(oldChips, newChips);
}

// Enhance Question Box / Pearls in c10
const oldPearl = `        <li><strong>プラリア（デノスマブ）の「ドタキャン骨折（オーバーシュート）」：</strong>半年に1回の注射だからといって予約をすっぽかして中断すると、抑えつけられていた破骨細胞が反動で一気に大暴走し、<strong>背骨が次々と潰れる（多発性椎体骨折）</strong>。やめる時は必ずビスホスホネート製剤へバトンタッチする必要があることを伝えておこう。</li>`;

const newPearl = `        <li><strong>プラリア（デノスマブ）の「ドタキャン骨折（オーバーシュート）」：</strong>半年に1回の注射だからといって予約をすっぽかして中断すると、抑えつけられていた破骨細胞が反動で一気に大暴走し、<strong>背骨が次々と潰れる（多発性椎体骨折）</strong>。次回来院日の厳守を伝え、やむを得ず中止する場合は<strong>必ずビスホスホネート製剤（経口BPまたはリクラスト点滴）へリレー（ブリッジング）</strong>する！</li>
        <li><strong>BP製剤長期連用（3〜5年）での「非定型大腿骨骨折（AFF）」前駆痛：</strong>「太ももや足の付け根（鼠径部）が重だるい、鈍痛がある」と訴えたら要注意。骨代謝回転低下によるストレス骨折の前兆であり、直ちに整形外科精査＆BPホリデー（休薬）を検討する。</li>
        <li><strong>顎骨壊死（MRONJ）最新対策：</strong>「漫然としたBP・プラリア休薬は骨折リスクを高める」ため、投与開始前に歯科検診と必要な抜歯・スケーリングを完了させ、投与中も徹底的な口腔ケアを指導することが最善の予防策！</li>`;

if (guideHtml.includes(oldPearl)) {
  guideHtml = guideHtml.replace(oldPearl, newPearl);
  fs.writeFileSync(pGuide, guideHtml, 'utf8');
  console.log('Successfully enhanced c10 in 03_guide.html!');
} else {
  console.log('Target oldPearl not found or already replaced');
}
