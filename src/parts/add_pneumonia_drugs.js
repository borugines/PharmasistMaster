const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '..', '09_app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');

const targetAnchor = '  // 17. 頻出漢方薬・重要生薬';

const newDrugsSnippet = `  // --- Core 24 肺炎・呼吸器感染症マスター薬剤 ---
  { name: "オゼックス細粒小児用", gen: "トスフロキサシントシル酸塩水和物", cat: "24. 肺炎・呼吸器感染症（小児キノロン）", char: "小児耐性マイコプラズマ・PRSPの切り札（厳格体重換算！）", desc: "小児に適応のある数少ないニューキノロン系抗菌薬。クラリス等マクロライド耐性マイコプラズマ肺炎やPRSPに切り札として使用。関節軟骨障害の懸念から漫然連用を避け、適応菌種と1回6mg/kg 1日2回の用量を厳格遵守。", gId: "c24", cSec: "sec-inf" },
  { name: "ミノマイシン", gen: "ミノサイクリン塩酸塩", cat: "24. 肺炎・呼吸器感染症 / 感染症", char: "8歳以上耐性マイコプラズマの第二選択（8歳未満歯牙着色禁忌！）", desc: "テトラサイクリン系。マクロライド耐性マイコプラズマ肺炎に極めて有効。8歳未満の小児には歯牙着色（黄色〜褐色沈着・エナメル質形成不全）および骨発育不全を起こすため原則禁忌！めまい・ふらつきに注意。", gId: "c24", cSec: "sec-inf" },
  { name: "ジスロマック", gen: "アジスロマイシン水和物", cat: "24. 肺炎・呼吸器感染症 / 感染症", char: "3日間服用で7日間抗菌力が持続する高組織移行性マクロライド", desc: "白血球やマクロファージ内に高濃度移行し感染局所に留まる。マイコプラズマ肺炎やクラミドフィラ肺炎、百日咳に頻用。食事の影響を受けにくい。近年マクロライド耐性菌が増加している点に留意。", gId: "c24", cSec: "sec-inf" },
  { name: "ジェニナック / ラスビック", gen: "ガレノキサシン / ラスクフロキサシン", cat: "24. 肺炎・呼吸器感染症（キノロン）", char: "肺炎球菌と非定型菌を一網打尽にする呼吸器特化型キノロン", desc: "市中肺炎の主要原因菌である肺炎球菌からマイコプラズマ・レジオネラ・クラミドフィラまで1剤で強力にカバー。1日1回投与でアドヒアランス良好。金属イオン（鉄・Mg・Ca）とのキレート相互作用に注意。", gId: "c24", cSec: "sec-inf" },
  { name: "ユナシン / ユナシンS", gen: "アンピシリンナトリウム・スルバクタムナトリウム", cat: "24. 誤嚥性肺炎 / 感染症", char: "嫌気性菌を叩く誤嚥性肺炎の絶対的ゴールドスタンダード（注射）", desc: "ペニシリン系アンピシリンにβラクタマーゼ阻害薬スルバクタムを配合。口腔内嫌気性菌（ペプトストレプトコッカス等）とグラム陽性・陰性菌を広くカバーし、高齢者・在宅誤嚥性肺炎の第一選択。", gId: "c24", cSec: "sec-inf" },
`;

if (!appJs.includes('オゼックス細粒小児用')) {
  appJs = appJs.replace(targetAnchor, newDrugsSnippet + '\n' + targetAnchor);
  fs.writeFileSync(appJsPath, appJs, 'utf8');
  console.log("Successfully added Core 24 pneumonia drugs to 09_app.js");
} else {
  console.log("Pneumonia drugs already exist in 09_app.js");
}
