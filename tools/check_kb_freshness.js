// ============================================================================
// tools/check_kb_freshness.js — イベント駆動（ガイドライン改訂・添付文書改訂）＋定期鮮度監査CLI
// 使い方:
//   node tools/check_kb_freshness.js
//   node tools/check_kb_freshness.js --mark-updated JCS_HF_2025 --note "2026年フォーカスアップデート対応"
// ============================================================================
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.resolve(__dirname, '..');
const registryPath = path.join(rootDir, 'kb', 'source_registry.json');
const queuePath = path.join(rootDir, 'kb', 'kb_update_queue.md');

const appJsCode = fs.readFileSync(path.join(rootDir, 'src', '09_app.js'), 'utf8');
const kbJsCode = fs.readFileSync(path.join(rootDir, 'src', '20_wizard_kb.js'), 'utf8');
const startIdx = appJsCode.indexOf('const CLINICAL_WIZARD_DATA = {');
const endIdx = appJsCode.indexOf('// ウィザードの実行状態管理');

const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(
  appJsCode.slice(startIdx, endIdx) + '\nwindow.CLINICAL_WIZARD_DATA = CLINICAL_WIZARD_DATA;\n' + kbJsCode,
  sandbox
);

const structuredKB = sandbox.window.buildStructuredWizardKB(sandbox.window.CLINICAL_WIZARD_DATA);
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

const args = process.argv.slice(2);
const markIdx = args.indexOf('--mark-updated');
const noteIdx = args.indexOf('--note');
const targetSourceId = markIdx >= 0 ? args[markIdx + 1] : null;
const updateNote = noteIdx >= 0 ? args[noteIdx + 1] : 'ガイドライン・添付文書改訂イベント';

const today = new Date().toISOString().slice(0, 10);

// 1. 特定出典に紐づく仮説一覧を逆引き構築
const hypothesesBySource = {};
let expiredCount = 0;
let draftCount = 0;
let approvedCount = 0;
let reviewedCount = 0;

for (const [drugKey, entry] of Object.entries(structuredKB.drugs)) {
  for (const h of Object.values(entry.diseases)) {
    if (h.status === 'approved') approvedCount++;
    else if (h.status === 'reviewed') reviewedCount++;
    else draftCount++;

    if (h.nextReviewDue && h.nextReviewDue < today) {
      expiredCount++;
    }
    for (const sId of (h.sources || [])) {
      if (!hypothesesBySource[sId]) hypothesesBySource[sId] = [];
      hypothesesBySource[sId].push({
        drugKey,
        drugName: entry.name,
        hypId: h.id,
        hypName: h.name,
        type: h.type,
        evidence: h.evidence
      });
    }
  }
}

// 2. --mark-updated が指定された場合：該当出典に影響を受ける全仮説を抽出して kb_update_queue.md に追記
if (targetSourceId) {
  const srcInfo = registry.sources[targetSourceId];
  if (!srcInfo) {
    console.error(`[ERROR] Unknown sourceId: ${targetSourceId}`);
    process.exit(1);
  }
  const affected = hypothesesBySource[targetSourceId] || [];
  const block = [
    `\n## 🔔 イベント駆動・再検証トリガー発火 (${today})`,
    `- **対象出典ID**: \`${targetSourceId}\` (${srcInfo.title})`,
    `- **改訂・トリガー内容**: ${updateNote}`,
    `- **影響を受ける疾患仮説数**: ${affected.length} 件`,
    '',
    '| 薬剤キー | 薬剤名 | 仮説ID | 疾患・病態名 | 区分 | Evidence | ステータス |',
    '|---|---|---|---|---|---|---|',
    ...affected.map(a => `| \`${a.drugKey}\` | ${a.drugName.split('（')[0]} | \`${a.hypId}\` | ${a.hypName} | ${a.type} | ${a.evidence} | \`needs_revalidation\` |`),
    ''
  ].join('\n');

  fs.appendFileSync(queuePath, block, 'utf8');
  console.log(`[UPDATED] ${targetSourceId} に紐づく ${affected.length} 仮説を kb/kb_update_queue.md に要再検証として登録しました。`);
}

console.log('====================================================================');
console.log('  CHECK_KB_FRESHNESS.JS — ガイドライン改訂・鮮度・承認ステータス監査');
console.log('====================================================================');
console.log(`  監査基準日               : ${today}`);
console.log(`  承認済 (approved) 仮説   : ${approvedCount} 件`);
console.log(`  レビュー済 (reviewed)    : ${reviewedCount} 件`);
console.log(`  ドラフト (draft)         : ${draftCount} 件`);
console.log(`  定期レビュー期限切れ     : ${expiredCount} 件`);
console.log('--------------------------------------------------------------------');
console.log('  📚 出典ガイドライン別・紐づき仮説カバレッジ:');
for (const [sId, sObj] of Object.entries(registry.sources)) {
  const count = (hypothesesBySource[sId] || []).length;
  console.log(`    - ${sId.padEnd(22)} : ${String(count).padStart(3)} 仮説 | ${sObj.title}`);
}
console.log('====================================================================');
