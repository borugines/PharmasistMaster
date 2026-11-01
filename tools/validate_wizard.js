// ============================================================================
// tools/validate_wizard.js — 疾患特定知識ベース 静的整合性・スキーマ検証CLI
// ============================================================================
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.resolve(__dirname, '..');
const appJsCode = fs.readFileSync(path.join(rootDir, 'src', '09_app.js'), 'utf8');
const kbJsCode = fs.readFileSync(path.join(rootDir, 'src', '20_wizard_kb.js'), 'utf8');
const qJsCode = fs.readFileSync(path.join(rootDir, 'src', '21_wizard_questions.js'), 'utf8');
const sigJsCode = fs.readFileSync(path.join(rootDir, 'src', '24_wizard_signatures.js'), 'utf8');
const sourceRegistry = JSON.parse(fs.readFileSync(path.join(rootDir, 'kb', 'source_registry.json'), 'utf8'));

// CLINICAL_WIZARD_DATA を抽出してVM内で評価
const startIdx = appJsCode.indexOf('const CLINICAL_WIZARD_DATA = {');
const endMarker = '// ウィザードの実行状態管理';
const endIdx = appJsCode.indexOf(endMarker);
if (startIdx < 0 || endIdx < 0) {
  console.error('[FATAL] CLINICAL_WIZARD_DATA block not found in src/09_app.js');
  process.exit(1);
}

const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(
  appJsCode.slice(startIdx, endIdx) + '\nwindow.CLINICAL_WIZARD_DATA = CLINICAL_WIZARD_DATA;\n' +
  qJsCode + '\n' + sigJsCode + '\n' + kbJsCode,
  sandbox
);

const rawKB = sandbox.window.CLINICAL_WIZARD_DATA;
const structuredKB = sandbox.window.buildStructuredWizardKB(rawKB);
const resolveDrugEntryFromKB = sandbox.window.resolveDrugEntryFromKB;
const validSourceIds = new Set(Object.keys(sourceRegistry.sources || {}));

let errors = 0;
let warnings = 0;
let totalDrugs = 0;
let totalQuestions = 0;
let totalOptions = 0;
let totalHypotheses = 0;

for (const [drugKey, entry] of Object.entries(structuredKB.drugs || {})) {
  totalDrugs++;
  const diseases = entry.diseases || {};
  const dIds = Object.keys(diseases);
  totalHypotheses += dIds.length;

  if (dIds.length === 0) {
    console.error(`[ERROR] ${drugKey}: No diseases defined`);
    errors++;
  }

  const weightedCount = {};
  for (const id of dIds) weightedCount[id] = 0;

  // 各疾患仮説のスキーマ検査
  for (const [dId, d] of Object.entries(diseases)) {
    if (!d.name) {
      console.error(`[ERROR] ${drugKey}.${dId}: Missing name`);
      errors++;
    }
    if (typeof d.baseProb !== 'number' || isNaN(d.baseProb)) {
      console.error(`[ERROR] ${drugKey}.${dId}: Missing or non-numeric baseProb`);
      errors++;
    }
    if (!['label', 'guideline', 'offlabel'].includes(d.regulatoryStatus)) {
      console.error(`[ERROR] ${drugKey}.${dId}: Invalid regulatoryStatus '${d.regulatoryStatus}'`);
      errors++;
    }
    if (!['A', 'B', 'C'].includes(d.evidenceLevel)) {
      console.error(`[ERROR] ${drugKey}.${dId}: Invalid evidenceLevel '${d.evidenceLevel}'`);
      errors++;
    }
    if (!['common', 'occasional', 'rare'].includes(d.frequencyTier)) {
      console.error(`[ERROR] ${drugKey}.${dId}: Invalid frequencyTier '${d.frequencyTier}'`);
      errors++;
    }
    if (!Array.isArray(d.sourceIds) || d.sourceIds.length === 0) {
      console.error(`[ERROR] ${drugKey}.${dId}: Missing sourceIds`);
      errors++;
    } else {
      for (const sId of d.sourceIds) {
        if (!validSourceIds.has(sId)) {
          console.error(`[ERROR] ${drugKey}.${dId}: Unregistered sourceId '${sId}' (not in kb/source_registry.json)`);
          errors++;
        }
      }
    }
  }

  // 各質問・選択肢の weights 参照整合性チェック
  for (const q of (entry.questions || [])) {
    totalQuestions++;
    for (const opt of (q.options || [])) {
      totalOptions++;
      const weights = opt.weights || {};
      for (const [targetId, wVal] of Object.entries(weights)) {
        if (!diseases[targetId]) {
          console.error(`[ERROR] ${drugKey} -> ${q.id} -> ${opt.id}: weights references undefined disease '${targetId}'`);
          errors++;
        } else if (wVal > 0) {
          weightedCount[targetId]++;
        }
      }
    }
  }

  // 到達不能（孤立）仮説のチェック
  for (const id of dIds) {
    if (weightedCount[id] === 0) {
      console.error(`[ERROR] ${drugKey}.${id}: Orphan hypothesis (never weighted positively by any option)`);
      errors++;
    }
  }
}

// 重複エイリアスの統合解決テスト
const duplicateAliasesToTest = ['サインバルタ', 'サムスカ', 'モサプリド', 'バルトレックス', 'クラリス', 'ロコイド', 'サワシリン'];
for (const alias of duplicateAliasesToTest) {
  const res = resolveDrugEntryFromKB(alias, structuredKB);
  if (!res || !res.entry) {
    console.error(`[ERROR] Alias resolution failed for '${alias}'`);
    errors++;
  } else if (!Array.isArray(res.entry.mergedFrom) || res.entry.mergedFrom.length < 2) {
    console.warn(`[WARN] Alias '${alias}' resolved to single entry instead of merged composite`);
    warnings++;
  }
}

console.log('==========================================================');
console.log('  VALIDATE_WIZARD.JS — 知識ベース整合性監査レポート');
console.log('==========================================================');
console.log(`  対象薬剤エントリ数 : ${totalDrugs}`);
console.log(`  総疾患・病態仮説数 : ${totalHypotheses}`);
console.log(`  総質問数           : ${totalQuestions}`);
console.log(`  総選択肢数         : ${totalOptions}`);
console.log(`  登録公的出典数     : ${validSourceIds.size}`);
console.log(`  エラー件数         : ${errors}`);
console.log(`  警告件数           : ${warnings}`);
console.log('==========================================================');

if (errors > 0) {
  process.exit(1);
}
console.log('[PASS] 全スキーマ・参照整合性・出典レジストリ・重複エイリアス統合チェック合格');
