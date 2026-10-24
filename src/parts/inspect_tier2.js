const fs = require('fs');

const tier2Diseases = [
  { rank: 21, name: "緑内障・高眼圧症", keywords: ["緑内障", "キサラタン", "タプロス", "トラバタンズ", "チモプトール", "アイラミド"] },
  { rank: 22, name: "過活動膀胱（頻尿・尿失禁）", keywords: ["過活動膀胱", "ベオーバ", "ベタニス", "トビエース", "ベシケア"] },
  { rank: 23, name: "不安障害・パニック障害", keywords: ["パニック", "不安障害", "SSRI", "ベンゾ", "ソラナックス", "デパス"] },
  { rank: 24, name: "片頭痛・緊張型頭痛", keywords: ["片頭痛", "トリプタン", "レイボー", "エムガルティ", "緊張型頭痛"] },
  { rank: 25, name: "アレルギー性結膜炎", keywords: ["アレルギー性結膜炎", "アレジオン点眼", "パタノール", "リボスチン", "フルメトロン点眼"] },
  { rank: 26, name: "新型コロナウイルス感染症（COVID-19）", keywords: ["COVID-19", "ゾコーバ", "パキロビッド", "ラゲブリオ"] },
  { rank: 27, name: "認知症（アルツハイマー型など）", keywords: ["認知症", "アリセプト", "ドネペジル", "メマリー", "レミニール", "リバスタッチ", "レケンビ"] },
  { rank: 28, name: "心房細動・不整脈", keywords: ["心房細動", "DOAC", "エリキュース", "リクシアナ", "イグザレルト", "プラザキサ", "ワルファリン"] },
  { rank: 29, name: "感染性胃腸炎・急性下痢症", keywords: ["感染性胃腸炎", "ロタ", "ノロ", "止瀉薬", "ロペミン", "ビオフェルミン", "経口補水液"] },
  { rank: 30, name: "白癬（水虫・爪水虫）", keywords: ["白癬", "水虫", "爪白癬", "ルコナック", "クレナフィン", "ネイリン", "ラミシール", "テルビナフィン"] },
  { rank: 31, name: "狭心症・陳旧性心筋梗塞", keywords: ["狭心症", "心筋梗塞", "ニトロ", "硝酸薬", "アスピリン", "β遮断薬"] },
  { rank: 32, name: "蕁麻疹（じんましん）", keywords: ["蕁麻疹", "抗ヒスタミン", "アレロック", "ゾレア"] },
  { rank: 33, name: "月経困難症・PMS（月経前症候群）", keywords: ["月経困難症", "PMS", "LEP", "ヤーズ", "ジェミーナ", "当帰芍薬散", "加味逍遙散"] },
  { rank: 34, name: "尋常性ざ瘡（ニキビ）", keywords: ["ニキビ", "尋常性ざ瘡", "ベピオ", "ディフェリン", "エピデュオ", "デュアック", "ゼビアックス", "アクアチム"] },
  { rank: 35, name: "白内障（術前後管理含む）", keywords: ["白内障", "カリーユニ", "ピレノキシン", "術後点眼"] },
  { rank: 36, name: "脳梗塞後遺症（再発予防含む）", keywords: ["脳梗塞", "抗血小板", "クロピドグレル", "プラビックス", "バイアスピリン", "シロスタゾール"] },
  { rank: 37, name: "鉄欠乏性貧血", keywords: ["鉄欠乏性貧血", "フェロミア", "フェルム", "スローフィー"] },
  { rank: 38, name: "副鼻腔炎（ちくのう症）", keywords: ["副鼻腔炎", "ちくのう", "クラリス", "マクロライド少量長期", "辛夷清肺湯", "カルボシステイン"] },
  { rank: 39, name: "めまい（メニエール病・良性発作性頭位めまい症）", keywords: ["めまい", "メニエール", "メリスロン", "セファドール", "イソバイド", "トラベルミン", "五苓散"] },
  { rank: 40, name: "慢性腎臓病（CKD）", keywords: ["慢性腎臓病", "CKD", "eGFR", "フォシーガ", "ケレンディア", "クレメジン", "球形吸着炭"] }
];

const files = ['src/03_guide.html', 'src/05_comparison.html', 'src/14_dictionary.html', 'src/09_app.js'];
const contents = {};
files.forEach(f => contents[f] = fs.readFileSync(f, 'utf8'));

console.log('=== Tier 2 (21-40) Coverage Analysis ===');
tier2Diseases.forEach(d => {
  let guideFound = false;
  let compFound = false;
  let dictFound = false;
  let appFound = false;

  d.keywords.forEach(kw => {
    if (contents['src/03_guide.html'].includes(kw)) guideFound = true;
    if (contents['src/05_comparison.html'].includes(kw)) compFound = true;
    if (contents['src/14_dictionary.html'].includes(kw)) dictFound = true;
    if (contents['src/09_app.js'].includes(kw)) appFound = true;
  });

  console.log(`${d.rank}位 ${d.name}: Guide=${guideFound}, Comp=${compFound}, Dict=${dictFound}, App=${appFound}`);
});
