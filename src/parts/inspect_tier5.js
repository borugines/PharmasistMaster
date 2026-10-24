const fs = require('fs');

const tier5Diseases = [
  { rank: 81, name: "子宮内膜症・子宮筋腫", keywords: ["子宮内膜症", "子宮筋腫", "レルミナ", "ディナゲスト", "ジエノゲスト", "リュープリン"] },
  { rank: 82, name: "膣カンジダ症・細菌性膣症", keywords: ["膣カンジダ", "オキナゾール", "メディトリート", "フロリード", "フラジール", "メトロニダゾール"] },
  { rank: 83, name: "不妊症（排卵誘発・ホルモン補充）", keywords: ["不妊", "クロミッド", "レトロゾール", "ウトロゲスタン", "ルティナス", "ゴナールエフ"] },
  { rank: 84, name: "勃起不全（ED）・男性更年期障害", keywords: ["ED", "シアリス", "タダラフィル", "バイアグラ", "シルデナフィル", "レビトラ", "硝酸薬"] },
  { rank: 85, name: "男性型脱毛症（AGA）・円形脱毛症", keywords: ["AGA", "プロペシア", "フィナステリド", "ザガーロ", "デュタステリド", "リアップ", "オルミエント"] },
  { rank: 86, name: "夜尿症（おねしょ）", keywords: ["夜尿症", "ミニリンメルト", "デスモプレシン", "水中毒", "低ナトリウム"] },
  { rank: 87, name: "熱性けいれん（小児）", keywords: ["熱性けいれん", "ダイアップ", "ジアゼパム坐剤", "37.5", "8時間"] },
  { rank: 88, name: "溶連菌感染症（A群溶血性レンサ球菌咽頭炎）", keywords: ["溶連菌", "サワシリン", "ペニシリン", "10日間", "リウマチ熱", "腎炎"] },
  { rank: 89, name: "手足口病・ヘルパンギーナ", keywords: ["手足口病", "ヘルパンギーナ", "コクサッキー", "エンテロ", "脱水"] },
  { rank: 90, name: "水痘（みずぼうそう）・伝染性軟属腫（水いぼ）", keywords: ["水痘", "みずぼうそう", "水いぼ", "カチリ", "バルトレックス"] },
  { rank: 91, name: "伝染性膿痂疹（とびひ）", keywords: ["伝染性膿痂疹", "とびひ", "フシジンレオ", "アクアチム", "セフェム"] },
  { rank: 92, name: "尋常性乾癬", keywords: ["乾癬", "ドボベット", "ドボネックス", "オテズラ", "スキリージ", "トレムフィア"] },
  { rank: 93, name: "掌蹠膿疱症", keywords: ["掌蹠膿疱症", "ビオチン", "ドボベット", "禁煙"] },
  { rank: 94, name: "尋常性白斑・肝斑（しみ）", keywords: ["肝斑", "トランシーノ", "トラネキサム酸", "シナール", "白斑", "プロトピック"] },
  { rank: 95, name: "熱傷（やけど）・日焼け", keywords: ["熱傷", "やけど", "ゲーベン", "プロペト", "アズノール", "日焼け"] },
  { rank: 96, name: "褥瘡（床ずれ）", keywords: ["褥瘡", "DESIGN-R", "カデックス", "プロスタンディン", "アクトシン", "オルセノン"] },
  { rank: 97, name: "乗物酔い（動揺病）", keywords: ["乗物酔い", "トラベルミン", "アネロン", "動揺病"] },
  { rank: 98, name: "ニコチン依存症（禁煙治療）", keywords: ["ニコチン依存", "チャンピックス", "バレニクリン", "ニコチネル", "禁煙"] },
  { rank: 99, name: "睡眠時無呼吸症候群（SAS）", keywords: ["睡眠時無呼吸", "SAS", "CPAP", "閉塞性"] },
  { rank: 100, name: "がん性疼痛・化学療法の副作用対策（制吐剤・支持療法など）", keywords: ["がん性疼痛", "オピオイド", "モルヒネ", "オキシコドン", "フェンタニル", "アプレピタント", "イメンド", "オランザピン"] }
];

const files = ['src/03_guide.html', 'src/05_comparison.html', 'src/10_new_drugs.html', 'src/12_otc_guide.html', 'src/14_dictionary.html', 'src/09_app.js'];
const contents = {};
files.forEach(f => contents[f] = fs.readFileSync(f, 'utf8'));

console.log('=== Tier 5 (81-100) Coverage Analysis ===');
tier5Diseases.forEach(d => {
  let guideFound = false;
  let compFound = false;
  let dictFound = false;
  let appFound = false;

  d.keywords.forEach(kw => {
    if (contents['src/03_guide.html'].includes(kw)) guideFound = true;
    if (contents['src/05_comparison.html'].includes(kw)) compFound = true;
    if (contents['src/10_new_drugs.html'].includes(kw) || contents['src/12_otc_guide.html'].includes(kw)) compFound = true;
    if (contents['src/14_dictionary.html'].includes(kw)) dictFound = true;
    if (contents['src/09_app.js'].includes(kw)) appFound = true;
  });

  console.log(`${d.rank}位 ${d.name}: Guide=${guideFound}, Comp=${compFound}, Dict=${dictFound}, App=${appFound}`);
});
