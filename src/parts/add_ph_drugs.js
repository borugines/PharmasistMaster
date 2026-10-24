const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '..', '09_app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');

const targetAnchor = '{ name: "プラビックス / エフィエント"';

const newDrugsSnippet = `  { name: "アドシルカ / レバチオ", gen: "タダラフィル / シルデナフィル", cat: "4. 肺高血圧症 / 循環器", char: "肺動脈のPDE5を選択的に阻害し血管拡張！硝酸薬と絶対併用禁忌！", desc: "肺動脈平滑筋のcGMPを増やして血管拡張。タダラフィル（アドシルカ 40mg）は1日1回、シルデナフィル（レバチオ 20mg）は1日3回。ニトロペン等の硝酸薬と併用すると急激な致死的血圧低下を起こすため絶対禁忌！sGC刺激薬（アデムパス）との併用も禁忌。", gId: "c4", cSec: "sec-cv" },
  { name: "アデムパス", gen: "リオシグアト", cat: "4. 肺高血圧症（PAH / CTEPH）", char: "CTEPH（第4群）にも唯一使える可溶性グアニル酸シクラーゼ（sGC）刺激薬", desc: "内因性NOに依存せず直接sGCを刺激してcGMPを産生し強力に肺血管拡張。肺動脈性（PAH）だけでなく慢性血栓塞栓性肺高血圧症（CTEPH）に保険適用。PDE5阻害薬（アドシルカ等）や硝酸薬とは絶対併用禁忌！喫煙により血中濃度が激減するため禁煙必須。催奇形性禁忌。", gId: "c4", cSec: "sec-cv" },
  { name: "オプスミット / ヴォリブリス", gen: "マシテンタン / アンブリセンタン", cat: "4. 肺高血圧症（ERA）", char: "強力な血管収縮物質エンドセリンを阻害する主力経口薬（催奇形性禁忌！）", desc: "エンドセリン受容体拮抗薬（ERA）。早期からPDE5阻害薬と2剤併用（Initial Dual Combination）される。ボセンタン（トラクリア）と比べ肝障害リスクが低減されているが、貧血・浮腫に注意。胎児毒性があるため妊婦禁忌・避妊指導必須。", gId: "c4", cSec: "sec-cv" },
  { name: "ウプトラビ / フローラン", gen: "セレキシパグ / エポプロステノール", cat: "4. 肺高血圧症（PGI2経路）", char: "プロスタサイクリン経路を刺激する救命薬（フローランは中断絶対厳禁！）", desc: "ウプトラビは経口PGI2受容体作動薬（下痢・頭痛・顎痛の用量調節）。フローラン（持続静注）は最重症PAHの切り札で半減期3〜5分。ポンプ閉塞・液漏れによる急な投与中断は反跳性肺高血圧発作（リバウンド）で死に至るため絶対厳禁！専用溶解液管理必須。", gId: "c4", cSec: "sec-cv" },\n`;

if (!appJs.includes('アドシルカ')) {
  appJs = appJs.replace(targetAnchor, newDrugsSnippet + '  ' + targetAnchor);
  fs.writeFileSync(appJsPath, appJs, 'utf8');
  console.log("Successfully added PH drugs to DRUG_DB in 09_app.js");
} else {
  console.log("PH drugs already exist in 09_app.js");
}
