// ============================================================================
// tools/make_review_sheet.js — 領域別・臨床確認レビューシート自動生成CLI
// 使い方:
//   node tools/make_review_sheet.js --wave wave1_cardiology
// ============================================================================
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.resolve(__dirname, '..');
const appJsCode = fs.readFileSync(path.join(rootDir, 'src', '09_app.js'), 'utf8');
const kbJsCode = fs.readFileSync(path.join(rootDir, 'src', '20_wizard_kb.js'), 'utf8');
const qJsCode = fs.readFileSync(path.join(rootDir, 'src', '21_wizard_questions.js'), 'utf8');
const sigJsCode = fs.readFileSync(path.join(rootDir, 'src', '24_wizard_signatures.js'), 'utf8');
const engJsCode = fs.readFileSync(path.join(rootDir, 'src', '22_wizard_engine.js'), 'utf8');

const startIdx = appJsCode.indexOf('const CLINICAL_WIZARD_DATA = {');
const endIdx = appJsCode.indexOf('// ウィザードの実行状態管理');

const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(
  appJsCode.slice(startIdx, endIdx) + '\nwindow.CLINICAL_WIZARD_DATA = CLINICAL_WIZARD_DATA;\n' +
  qJsCode + '\n' + sigJsCode + '\n' + kbJsCode + '\n' + engJsCode,
  sandbox
);

const structuredKB = sandbox.window.buildStructuredWizardKB(sandbox.window.CLINICAL_WIZARD_DATA);
const engine = sandbox.window.wizardBayesianEngine;

const args = process.argv.slice(2);
const waveIdx = args.indexOf('--wave');
const targetWave = waveIdx >= 0 ? args[waveIdx + 1] : 'wave1_cardiology';

const outDir = path.join(rootDir, 'kb', 'review_sheets');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const lines = [
  `# 🩺 臨床推論知識ベース 確認レビューシート（${targetWave}）`,
  '',
  `- **生成日時**: ${new Date().toISOString().slice(0, 10)}`,
  `- **KBバージョン**: \`${structuredKB.meta.kbVersion}\``,
  `- **対象Wave**: \`${targetWave}\`（循環器・抗血栓・脂質・甲状腺重点領域）`,
  '',
  '> [!IMPORTANT]',
  '> 本シートは、各起点薬における**疾患仮説（ガイドライン標準適応＋適応外使用）**・**エビデンスレベル（A/B/C）**・**初期事前確率**・**決定打となる質問/選択肢**の一覧です。内容をご確認いただき、修正が必要な箇所があればご指示ください。',
  ''
];

let drugCount = 0;
let hypCount = 0;

for (const [drugKey, entry] of Object.entries(structuredKB.drugs)) {
  if (entry.specialtyWave !== targetWave) continue;
  drugCount++;
  const priors = engine.computeInitialPriors(entry);
  const hyps = Object.values(entry.diseases);
  hypCount += hyps.length;

  lines.push(`## ${drugCount}. ${entry.name} (\`${drugKey}\`)`);
  lines.push(`- **カテゴリ**: ${entry.category}`);
  lines.push(`- **登録エイリアス**: ${entry.aliases.join(', ')}`);
  lines.push('');
  lines.push('| 仮説ID | 疾患・病態名 | 承認区分 | Evidence | 頻度 | 初期事前確率 | Red-Flag | 出典ID | ステータス |');
  lines.push('|---|---|---|---|---|---|---|---|---|');

  for (const h of hyps) {
    const regBadge = h.type === 'offlabel' ? '🟠 offlabel' : (h.type === 'guideline' ? '🟢 guideline' : '🔵 label');
    const priorPct = (priors[h.id] * 100).toFixed(1) + '%';
    const rf = h.redFlag ? '🚨 Yes' : '-';
    const srcs = (h.sources || []).join(', ');
    lines.push(`| \`${h.id}\` | **${h.name}** | ${regBadge} | **${h.evidence}** | ${h.frequency} | ${priorPct} | ${rf} | \`${srcs}\` | \`${h.status}\` |`);
  }

  lines.push('');
  lines.push('### ❓ 設定されている鑑別質問と重み付け');
  for (const q of (entry.questions || [])) {
    lines.push(`- **${q.title}** *(Cost: ${q.cost})*`);
    for (const opt of (q.options || [])) {
      const wStr = Object.entries(opt.weights || {})
        .map(([k, v]) => `${k}: ${v > 0 ? '+' + v : v}`)
        .join(', ');
      lines.push(`  - \`${opt.id}\`: ${opt.label} ➔ \`[${wStr}]\``);
    }
  }
  lines.push('');
}

const outPath = path.join(outDir, `${targetWave}.md`);
fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
console.log(`[GENERATED] ${outPath} (${drugCount} 薬剤 / ${hypCount} 仮説)`);
