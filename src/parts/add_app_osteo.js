const fs = require('fs');
const path = require('path');

const pApp = path.join(__dirname, '..', '09_app.js');
let appJs = fs.readFileSync(pApp, 'utf8');

const additionalOsteoDrugs = `  { name: "イベニティ", gen: "ロモソズマブ", cat: "新薬 / 骨粗鬆症", char: "骨形成促進＋骨吸収抑制のデュアルアクション！月1回2本皮下注（12ヶ月限定）", desc: "抗スクレロスチン抗体。過去1年以内の心筋梗塞・脳卒中歴は禁忌！12ヶ月終了後は骨量維持のため必ずプラリアまたはBPへ移行（シーケンシャルセラピー）。", gId: "tab-newdrugs", cSec: "sec-ckd" },
  { name: "オスタバロ", gen: "アバロパラチド酢酸塩", cat: "新薬 / 骨粗鬆症", char: "骨吸収を刺激せず骨形成を選択的促進！新規PTH1受容体作動薬（1日1回・18ヶ月上限）", desc: "高骨折リスク骨粗鬆症の切り札。初期の起立性低血圧・めまいに注意。通算18ヶ月まで。終了後はプラリアまたはBPへバトンタッチ。", gId: "tab-newdrugs", cSec: "sec-ckd" },
  { name: "フォルテオ / テリボン", gen: "テリパラチド / テリパラチド酢酸塩", cat: "10. 骨粗鬆症（PTH）", char: "副甲状腺ホルモン間歇投与で骨梁を再構築！重症骨折例の切り札（通算24ヶ月上限）", desc: "骨芽細胞を刺激し骨形成を促進。投与初期の立ちくらみ・めまい・嘔気（投与後30分安静）。通算24ヶ月終了後はBPまたはプラリアへ移行。", gId: "c10", cSec: "sec-ckd" },
  { name: "ビビアント / エビスタ", gen: "バゼドキシフェン / ラロキシフェン", cat: "10. 骨粗鬆症（SERM）", char: "閉経後早期の椎体骨折を予防する選択的エストロゲン調節薬（深部静脈血栓症VTE禁忌！）", desc: "骨のエストロゲン受容体にアゴニスト、乳腺・子宮にアンタゴニストとして作用。静脈血栓塞栓症（肺塞栓・深部静脈血栓）の既往は禁忌。長期臥床時休薬。", gId: "c10", cSec: "sec-ckd" },
`;

if (!appJs.includes('"イベニティ"')) {
  const target = '  { name: "プラリア",';
  if (appJs.includes(target)) {
    appJs = appJs.replace(target, additionalOsteoDrugs + target);
    fs.writeFileSync(pApp, appJs, 'utf8');
    console.log('Successfully inserted additional Osteo drugs into 09_app.js!');
  } else {
    console.error('Could not find target in 09_app.js');
  }
} else {
  console.log('Already in 09_app.js');
}
