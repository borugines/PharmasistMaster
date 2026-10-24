const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '..', '09_app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');

const targetAnchor = '  // 17. 頻出漢方薬・重要生薬';

const newDrugsSnippet = `  // --- Core 25 気管支喘息・咳喘息・COPD薬剤 ---
  { name: "シムビコート タービュヘイラー", gen: "ブデソニド / ホルモテロールフマル酸塩水和物", cat: "25. 気管支喘息（SMART療法）", char: "定期吸入も発作時頓用もこれ1本！画期的SMART療法", desc: "速効性LABA（ホルモテロール）とICSの配合剤。維持療法だけでなく発作時にも追加吸入（1日最大8吸入）可能。吸入後は必ずブクブク＋ガラガラうがい。", gId: "c25", cSec: "sec-imm" },
  { name: "テリルジー / エナジア", gen: "フルチカゾンフランカルボン酸エステル等 / 3剤配合", cat: "25. 喘息・COPD（3剤配合）", char: "ICS/LABA/LAMAの3剤が1日1回1吸入で完結する重症・難治性治療薬", desc: "抗コリン薬（LAMA）を加えた強力トリプル配合剤。気管支拡張と抗炎症を最大化。緑内障（閉塞隅角）や前立腺肥大症の排尿障害に注意。", gId: "c25", cSec: "sec-imm" },
  { name: "シングレア / キプレス", gen: "モンテルカストナトリウム", cat: "25. 喘息 / アレルギー", char: "夜間〜早朝の気道収縮を抑える経口LTRA（寝る前服用！）", desc: "ロイコトリエン受容体拮抗薬。小児から高齢者まで飲みやすい。モーニングサージ（早朝悪化）を防ぐため就寝前投与が合理的。アレルギー性鼻炎合併にも頻用。", gId: "c25", cSec: "sec-imm" },
  { name: "メプチンエアー / サルタノール", gen: "プロカテロール / サルブタモール", cat: "25. 急性発作治療薬（SABA）", char: "気管支発作時の即効レスキュー！月1本以上使い切りは重症化警告！", desc: "短時間作用性β2刺激薬。数分で気管支拡張。使いすぎ（1ヶ月1本以上）は気道炎症悪化と心臓負荷（頻脈・振戦・不整脈死リスク）のサイン。速やかにICS強化が必要。", gId: "c25", cSec: "sec-imm" },
`;

if (!appJs.includes('シムビコート タービュヘイラー')) {
  appJs = appJs.replace(targetAnchor, newDrugsSnippet + '\n' + targetAnchor);
  fs.writeFileSync(appJsPath, appJs, 'utf8');
  console.log("Successfully added Core 25 asthma drugs to 09_app.js");
} else {
  console.log("Asthma drugs already exist in 09_app.js");
}
