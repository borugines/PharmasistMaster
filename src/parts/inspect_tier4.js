const fs = require('fs');

const tier4Diseases = [
  { rank: 61, name: "脂漏性皮膚炎", keywords: ["脂漏性皮膚炎", "ニゾラール", "ケトコナゾール", "マラセチア", "ロコイド"] },
  { rank: 62, name: "虫刺され（虫刺症）", keywords: ["虫刺", "アンテベート", "デルモベート", "フルメタ", "レスタミン"] },
  { rank: 63, name: "単純ヘルペス（口唇・性器ヘルペス）", keywords: ["単純ヘルペス", "口唇ヘルペス", "アラセナA", "ゾビラックス", "バルトレックス", "ファムビル", "PIT"] },
  { rank: 64, name: "麦粒腫・霰粒腫（ものもらい）", keywords: ["麦粒腫", "霰粒腫", "ものもらい", "タリビッド点眼", "クラビット点眼", "フルメトロン"] },
  { rank: 65, name: "眼精疲労（調節機能改善）", keywords: ["眼精疲労", "サンコバ", "シアノコバラミン", "ミドリンP", "調節麻痺"] },
  { rank: 66, name: "細菌性結膜炎（はやり目など）", keywords: ["細菌性結膜炎", "クラビット点眼", "レボフロキサシン点眼", "トスフロ点眼"] },
  { rank: 67, name: "機能性ディスペプシア（胃もたれ・早期満腹感）", keywords: ["機能性ディスペプシア", "アコファイド", "アコチアミド", "六君子湯", "FD"] },
  { rank: 68, name: "潰瘍性大腸炎", keywords: ["潰瘍性大腸炎", "UC", "リアルダ", "アサコール", "ペンタサ", "ステロラ", "ゼルヤンツ"] },
  { rank: 69, name: "胆石症・慢性胆嚢炎", keywords: ["胆石", "胆嚢炎", "ウルソ", "UDCA", "コスパノン"] },
  { rank: 70, name: "脂肪肝（MASLD/NAFLD）・慢性肝炎", keywords: ["脂肪肝", "MASLD", "NAFLD", "NASH", "ピオグリタゾン", "ウルソ"] },
  { rank: 71, name: "甲状腺機能亢進症（バセドウ病など）", keywords: ["バセドウ病", "甲状腺機能亢進", "メルカゾール", "チアマゾール", "プロパジール", "無顆粒球症"] },
  { rank: 72, name: "パーキンソン病", keywords: ["パーキンソン", "マドパー", "ネオドパストン", "メネシット", "ドパコール", "ミラペックス", "ハルロピテープ"] },
  { rank: 73, name: "むずむず脚症候群（レストレスレッグス症候群）", keywords: ["むずむず脚", "レストレスレッグス", "レグナイト", "プラミペキソール", "ニュープロパッチ"] },
  { rank: 74, name: "三叉神経痛・肋間神経痛", keywords: ["三叉神経痛", "肋間神経痛", "テグレトール", "カルバマゼピン", "タリージェ"] },
  { rank: 75, name: "閉塞性動脈硬化症（末梢動脈疾患）", keywords: ["閉塞性動脈硬化症", "ASO", "PAD", "プレタール", "プロレナール", "オパルモン"] },
  { rank: 76, name: "下肢静脈瘤・深部静脈血栓症", keywords: ["深部静脈血栓", "DVT", "下肢静脈瘤", "弾性ストッキング", "DOAC", "エリキュース"] },
  { rank: 77, name: "腱鞘炎・ばね指・テニス肘", keywords: ["腱鞘炎", "ばね指", "テニス肘", "ロキソニンテープ", "モーラステープ", "ケナコルト"] },
  { rank: 78, name: "肩関節周囲炎（五十肩・四十肩）", keywords: ["五十肩", "肩関節周囲炎", "ヒアルロン酸", "関節腔内", "セレコックス"] },
  { rank: 79, name: "椎間板ヘルニア・脊柱管狭窄症", keywords: ["脊柱管狭窄症", "椎間板ヘルニア", "リマプロスト", "オパルモン", "プロレナール", "間欠跛行"] },
  { rank: 80, name: "捻挫・打撲・筋肉痛（外傷）", keywords: ["捻挫", "打撲", "筋肉痛", "冷感パップ", "ロキソニンパップ", "RICE"] }
];

const files = ['src/03_guide.html', 'src/05_comparison.html', 'src/14_dictionary.html', 'src/09_app.js'];
const contents = {};
files.forEach(f => contents[f] = fs.readFileSync(f, 'utf8'));

console.log('=== Tier 4 (61-80) Coverage Analysis ===');
tier4Diseases.forEach(d => {
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
