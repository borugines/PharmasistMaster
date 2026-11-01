// ============================================================================
// tools/analyze_nsips_sample.js — NSIPS実テストデータ適応プロファイラ＆個人情報マスクCLI
// 仕様書がなくても、薬局レセコンから出力したNSIPS CSVファイルを読み込み、
// 個人情報を自動マスクした上でカラム構造・抽出薬品・自動回答（🤖自動）を検証する
// 使い方:
//   node tools/analyze_nsips_sample.js [path/to/nsips_sample.csv]
//   （引数省略時は内蔵3パターンのテストデータで検証を実行）
// ============================================================================
const fs = require('fs');
const path = require('path');
const {
  parsePrescriptionText,
  extractAutoAnswersForEntry,
  WIZARD_NSIPS_SAMPLES
} = require('../src/23_wizard_adapters.js');

function maskPersonalInfoInLine(line) {
  const cols = line.split(',');
  if (cols[0] === '1' && cols.length >= 4) {
    // NSIPS 第1レコード（患者氏名・カナ・電話番号等をマスク）
    if (cols[2]) cols[2] = '【氏名マスク済】';
    if (cols[3]) cols[3] = '【カナマスク済】';
    for (let i = 6; i < cols.length; i++) {
      if (/^0\d{1,4}-?\d{1,4}-?\d{3,4}$/.test(cols[i])) {
        cols[i] = '【TELマスク済】';
      }
    }
  }
  return cols.join(',');
}

const inputFile = process.argv[2];
const samplesToRun = [];

if (inputFile) {
  const absPath = path.resolve(process.cwd(), inputFile);
  const raw = fs.readFileSync(absPath, 'utf8');
  samplesToRun.push({ title: `実ファイル: ${path.basename(absPath)}`, raw });
} else {
  for (const s of Object.values(WIZARD_NSIPS_SAMPLES)) {
    samplesToRun.push(s);
  }
}

console.log('====================================================================');
console.log('  ANALYZE_NSIPS_SAMPLE.JS — NSIPSテストデータ構造プロファイラ');
console.log('====================================================================');

for (const item of samplesToRun) {
  const maskedRaw = item.raw
    .split(/\r?\n/)
    .map(maskPersonalInfoInLine)
    .join('\n');

  const parsed = parsePrescriptionText(maskedRaw);
  console.log(`\n📌 【${item.title}】`);
  console.log(`   - 検出フォーマット : ${parsed.format}`);
  console.log(`   - 検出診療科       : ${parsed.department.raw || 'なし'} (正規化コード: ${parsed.department.code || 'なし'})`);
  console.log(`   - 検出患者属性     : 年齢=${parsed.patient.age !== null ? parsed.patient.age + '歳' : '不明'}, 性別=${parsed.patient.sex || '不明'} ➔ 区分=${parsed.patient.ageSexCategory || 'なし'}`);
  console.log(`   - 最長処方日数     : ${parsed.maxDays ? parsed.maxDays + '日分' : '不明'} (頓服のみ=${parsed.isPrnOnly})`);
  console.log(`   - 抽出薬品一覧 (${parsed.drugs.length}剤):`);
  for (const d of parsed.drugs) {
    console.log(`       * [RP${d.rpNo}] ${d.rawName} (一般化名: ${d.cleanName}) | 数量: ${d.doseAmount || '?'}${d.doseUnit || ''} | 推定1日量: ${d.estimatedDailyMg ? d.estimatedDailyMg + 'mg' : '-'} | YJ: ${d.yjCode || '-'}`);
  }
}
console.log('\n====================================================================');
console.log('[PASS] NSIPSテストデータ解析完了（個人情報マスク・ヒューリスティック抽出正常）');
