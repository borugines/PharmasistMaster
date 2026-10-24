const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '..', '09_app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');

const targetAnchor = '{ name: "プラビックス / エフィエント"';

const newDrugsSnippet = `  { name: "ニトロペン (舌下錠)", gen: "ニトログリセリン", cat: "4. 虚血性心疾患", char: "狭心症発作の絶対的レスキュー（立って飲むな・飲み込むな！）", desc: "冠動脈拡張と静脈還流量低減で発作を速効寛解。血圧低下による失神防止のため必ず「座るか横になって」舌下投与。飲み込むと肝初回通過効果で無効！5分間隔で2〜3回使っても治まらない胸痛は即119番（ACS疑い）！重度大動脈弁狭窄症（AS）では失神ショックの恐れがあり原則回避。", gId: "c4", cSec: "sec-cv" },
  { name: "ヘルベッサー", gen: "ジルチアゼム塩酸塩", cat: "4. 虚血性心疾患 / 不整脈", char: "冠攣縮性狭心症の主役 兼 上室性不整脈レート調整のCa拮抗薬", desc: "冠動脈平滑筋を強力に弛緩しスパスム（痙攣）を阻止。夜間〜早朝発作を防ぐため夕食後〜就寝前投与が合理的。房室伝導を抑えるため心房細動のレートコントロールにも頻用。非選択的β遮断薬単独は冠攣縮を誘発するため禁忌！", gId: "c4", cSec: "sec-cv" },
  { name: "ワーファリン", gen: "ワルファリンカリウム", cat: "4. 弁膜症 / 不整脈", char: "機械弁置換術後の絶対的守護神（DOAC絶対禁忌！PT-INR管理）", desc: "機械弁置換後や中等度以上僧帽弁狭窄症（MS）ではDOACは臨床試験で血栓・出血が激増し「絶対禁忌」！ワルファリンのみが適応。納豆・クロレラ・青汁のビタミンK厳禁。併用薬相互作用（ケアラム併用禁忌など）に厳重警戒。", gId: "c4", cSec: "sec-cv" },
  { name: "アンカロン", gen: "アミオダロン塩酸塩", cat: "4. 不整脈", char: "致死性不整脈をねじ伏せる最強のⅢ群抗不整脈薬（副作用トリプル毒性に注意！）", desc: "心室細動（Vf）・心室頻拍（VT）や難治性心房細動の切り札。ヨウ素を含むため「甲状腺機能異常（TSH定期採血）」「間質性肺炎（乾性咳嗽・SpO2低下）」「角膜色素沈着」のモニタリングが必須。半減期が数週〜1ヶ月以上と超長い。", gId: "c4", cSec: "sec-cv" },
  { name: "カムジオス", gen: "マバカムテン", cat: "4. 心筋症（新薬）", char: "閉塞性肥大型心筋症（HOCM）の初の心筋ミオシン阻害薬", desc: "過剰なアクチン・ミオシン架橋形成を抑制し左室流出路閉塞を劇的に解除する新薬。過度な心収縮抑制による心不全悪化を防ぐため定期心エコー（LVEF測定）とCYP2C19相互作用監査が必須。", gId: "c4", cSec: "sec-cv" },\n`;

if (!appJs.includes('ニトロペン')) {
  appJs = appJs.replace(targetAnchor, newDrugsSnippet + '  ' + targetAnchor);
  fs.writeFileSync(appJsPath, appJs, 'utf8');
  console.log("Successfully added heart drugs to DRUG_DB in 09_app.js");
} else {
  console.log("Heart drugs already exist in 09_app.js");
}
