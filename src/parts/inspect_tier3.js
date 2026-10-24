const fs = require('fs');

const tier3Diseases = [
  { rank: 41, name: "歯周病・抜歯後感染予防", keywords: ["抜歯", "歯周病", "サワシリン", "フロモックス", "MRONJ", "歯科"] },
  { rank: 42, name: "甲状腺機能低下症（橋本病など）", keywords: ["橋本病", "甲状腺機能低下", "チラーヂン", "レボチロキシン"] },
  { rank: 43, name: "過敏性腸症候群（IBS）", keywords: ["過敏性腸症候群", "IBS", "イリボー", "コロネル", "ポリフル", "セレキノン"] },
  { rank: 44, name: "更年期障害", keywords: ["更年期障害", "HRT", "メノエイド", "エストラーナ", "加味逍遙散", "桂枝茯苓丸"] },
  { rank: 45, name: "帯状疱疹・帯状疱疹後神経痛", keywords: ["帯状疱疹", "アメナリーフ", "バルトレックス", "ファムビル", "PHN", "タリージェ"] },
  { rank: 46, name: "急性中耳炎・外耳炎", keywords: ["中耳炎", "外耳炎", "タリビッド耳科", "ベストロン耳科", "オフロキサシン"] },
  { rank: 47, name: "慢性閉塞性肺疾患（COPD）", keywords: ["COPD", "慢性閉塞性肺疾患", "スピリーバ", "ウルティブロ", "ビベピ", "LAMA"] },
  { rank: 48, name: "てんかん", keywords: ["てんかん", "イーケプラ", "テグレトール", "ビムパット", "デパケン", "ラミクタール"] },
  { rank: 49, name: "関節リウマチ", keywords: ["関節リウマチ", "リウマトレックス", "メトトレキサート", "MTX", "エンブレル", "ヒュミラ", "ゼルヤンツ", "リンヴォック"] },
  { rank: 50, name: "痔核（いぼ痔・切れ痔）", keywords: ["痔核", "強力ポステリザン", "プロクトセディル", "ヘモレックス", "ボラザG", "ヘモリンガル"] },
  { rank: 51, name: "慢性心不全", keywords: ["心不全", "ファンタスティック4", "エンレスト", "フォシーガ", "ビソプロロール", "スピロノラクトン"] },
  { rank: 52, name: "頸肩腕症候群（肩こり・首の痛み）", keywords: ["頸肩腕", "肩こり", "ミオナール", "テルネリン", "メチコバール"] },
  { rank: 53, name: "口内炎・舌炎", keywords: ["口内炎", "アフタゾロン", "デキサルチン", "トラネキサム酸", "チョコラBB", "ケナログ"] },
  { rank: 54, name: "膀胱炎（急性・単純性）", keywords: ["膀胱炎", "単純性膀胱炎", "レボフロキサシン", "セフカペン", "バクタ", "猪苓湯"] },
  { rank: 55, name: "統合失調症", keywords: ["統合失調症", "エビリファイ", "ジプレキサ", "リスパダール", "ロナセン", "SGA"] },
  { rank: 56, name: "双極性障害（躁うつ病）", keywords: ["双極性障害", "リチウム", "リーマス", "ラミクタール", "ラツーダ", "ビプレッソ"] },
  { rank: 57, name: "注意欠如・多動症（ADHD）", keywords: ["ADHD", "コンサータ", "ストラテラ", "インチュニブ", "ビバンセ"] },
  { rank: 58, name: "急性気管支炎・肺炎", keywords: ["気管支炎", "肺炎", "市中肺炎", "オーグメンチン", "サワシリン", "ラスビック", "アジスロマイシン"] },
  { rank: 59, name: "扁桃炎・咽頭炎", keywords: ["扁桃炎", "咽頭炎", "溶連菌", "アモキシシリン", "小柴胡湯加桔梗石膏", "Centor"] },
  { rank: 60, name: "乾燥肌（皮脂欠乏症・乾皮症）", keywords: ["皮脂欠乏症", "乾皮症", "ヒルドイド", "ヘパリン類似物質", "パスタロン", "尿素", "プロペト"] }
];

const files = ['src/03_guide.html', 'src/05_comparison.html', 'src/14_dictionary.html', 'src/09_app.js'];
const contents = {};
files.forEach(f => contents[f] = fs.readFileSync(f, 'utf8'));

console.log('=== Tier 3 (41-60) Coverage Analysis ===');
tier3Diseases.forEach(d => {
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
