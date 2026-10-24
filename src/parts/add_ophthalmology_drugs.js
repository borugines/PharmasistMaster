const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '..', '09_app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');

const targetAnchor = '  // 17. 頻出漢方薬・重要生薬';

const newDrugsSnippet = `  // --- Core 14 眼科・白内障・点眼マスター薬剤 ---
  { name: "カリーユニ点眼用", gen: "ピレノキシン", cat: "14. 眼科（白内障進行予防）", char: "水晶体タンパク質の変性を防ぎ白内障の進行を遅らせる懸濁点眼薬", desc: "キノイド説に基づく初期白内障治療薬。混濁した水晶体を透明に戻す効果はなく「進行予防」が目的。粒子が沈殿するためよく振ってから点眼。水溶性点眼薬の次に点眼する。", gId: "c14", cSec: "sec-ophth" },
  { name: "ブロムフェナク点眼液 / ネバナック", gen: "ブロムフェナクNa / ネパフェナク", cat: "14. 眼科（白内障術後・NSAIDs）", char: "白内障術後の最重要薬！痛くなくても「術後黄斑浮腫（CME）」を防ぐ生命線！", desc: "非ステロイド性抗炎症点眼薬。手術の炎症刺激でプロスタグランジンが網膜黄斑部に波及して視力が落ちる「術後黄斑浮腫（CME）」を強力に予防。「痛くないから差さない」は失明リスク！指示期間を厳格完遂。", gId: "c14", cSec: "sec-ophth" },
  { name: "クラビット点眼液 / トスフロ点眼液", gen: "レボフロキサシン / トスフロキサシン", cat: "14. 眼科（抗菌点眼）", char: "細菌性結膜炎・白内障術前術後感染予防の主力キノロン点眼", desc: "黄色い目やに、角膜炎、術後眼内炎予防。1回1滴・1日3〜4回。容器先端が目やまつ毛に触れると薬液が逆流汚染するため浮かせて点眼。耐性菌防止のため指示期間使い切る。", gId: "c14", cSec: "sec-ophth" },
  { name: "ヒアレイン点眼液 / ジクアス", gen: "ヒアルロン酸Na / ジクアホソルNa", cat: "14. 眼科（ドライアイ・角膜保護）", char: "涙の量と質を補い角膜を守るドライアイ・高齢者目やにの第一選択", desc: "ヒアレインは水分保持、ジクアスは水分＋ムチン分泌促進。ソフトコンタクト装用時は防腐剤BAKの吸着毒性を防ぐため外して点眼するか、防腐剤フリー（ミニ点眼）を選択。", gId: "c14", cSec: "sec-ophth" },
`;

if (!appJs.includes('カリーユニ点眼用')) {
  appJs = appJs.replace(targetAnchor, newDrugsSnippet + '\n' + targetAnchor);
  fs.writeFileSync(appJsPath, appJs, 'utf8');
  console.log("Successfully added Core 14 ophthalmology drugs to 09_app.js");
} else {
  console.log("Ophthalmology drugs already exist in 09_app.js");
}
