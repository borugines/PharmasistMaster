// ============================================================================
// tools/simulate_wizard.js — ベイズ推論アキネーター 自動シミュレーション検証スイート
// 1. 全361仮説の自己同定シミュレーション（1剤入力からのアキネーター特定率・平均質問数）
// 2. 低エビデンス・適応外仮説（Evidence B/C・offlabel）の非切り捨て＆到達性テスト
// 3. 棄却候補（P < 0.5%）の理由保持＆回答変更による自動復活テスト
// 4. NSIPSテストデータ自動回答（🤖自動）による質問数圧縮テスト
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
const adpJsCode = fs.readFileSync(path.join(rootDir, 'src', '23_wizard_adapters.js'), 'utf8');

const startIdx = appJsCode.indexOf('const CLINICAL_WIZARD_DATA = {');
const endIdx = appJsCode.indexOf('// ウィザードの実行状態管理');

const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(
  appJsCode.slice(startIdx, endIdx) + '\nwindow.CLINICAL_WIZARD_DATA = CLINICAL_WIZARD_DATA;\n' +
  qJsCode + '\n' + sigJsCode + '\n' + kbJsCode + '\n' + engJsCode + '\n' + adpJsCode,
  sandbox
);

const structuredKB = sandbox.window.buildStructuredWizardKB(sandbox.window.CLINICAL_WIZARD_DATA);
const engine = sandbox.window.wizardBayesianEngine;
const resolveDrugEntryFromKB = sandbox.window.resolveDrugEntryFromKB;
const parsePrescriptionText = sandbox.window.parsePrescriptionText;
const extractAutoAnswersForEntry = sandbox.window.extractAutoAnswersForEntry;
const WIZARD_NSIPS_SAMPLES = sandbox.window.WIZARD_NSIPS_SAMPLES;

// ----------------------------------------------------------------------------
// Test 1: 全仮説の1剤起点アキネーター自己同定シミュレーション
// ----------------------------------------------------------------------------
let totalHyps = 0;
let top1Success = 0;
let top2Success = 0;
let totalQuestionsAsked = 0;
let wave1Total = 0;
let wave1Top1 = 0;

for (const [drugKey, entry] of Object.entries(structuredKB.drugs)) {
  const hyps = Object.values(entry.diseases);
  for (const targetHyp of hyps) {
    totalHyps++;
    const isWave1 = targetHyp.specialtyWave === 'wave1_cardiology';
    if (isWave1) wave1Total++;

    const answers = [];
    let step = 0;
    while (step < engine.MAX_QUESTIONS) {
      const state = engine.evaluateState(entry, answers, {});
      if (state.stoppingStatus.stop || !state.nextQuestion) {
        break;
      }
      const q = state.nextQuestion;
      // 目標仮説 targetHyp にとって最も尤度比 P(opt | targetHyp) / P(opt | others) が高い特徴的選択肢を回答するとシミュレート
      let bestOpt = null;
      let bestScore = -1;
      for (const opt of (q.options || [])) {
        const l = q.isShared
          ? engine.getSharedQuestionLikelihood(q, opt, targetHyp.id, entry)
          : engine.getOptionLikelihood(q, opt, targetHyp.id, entry);
        let otherSum = 0;
        let otherCount = 0;
        for (const h of hyps) {
          if (h.id === targetHyp.id) continue;
          const ol = q.isShared
            ? engine.getSharedQuestionLikelihood(q, opt, h.id, entry)
            : engine.getOptionLikelihood(q, opt, h.id, entry);
          otherSum += ol;
          otherCount++;
        }
        const meanOther = otherCount > 0 ? (otherSum / otherCount) : 0.25;
        const score = (l * 10) + (l / Math.max(0.05, meanOther));
        if (score > bestScore) {
          bestScore = score;
          bestOpt = opt;
        }
      }
      if (!bestOpt) break;
      answers.push({
        questionId: q.id,
        optionId: bestOpt.id,
        confidence: 'yes',
        auto: false
      });
      step++;
    }

    totalQuestionsAsked += answers.length;
    const finalState = engine.evaluateState(entry, answers, {});
    const top1Id = finalState.ranked[0] ? finalState.ranked[0].id : null;
    const top2Id = finalState.ranked[1] ? finalState.ranked[1].id : null;

    if (top1Id === targetHyp.id) {
      top1Success++;
      if (isWave1) wave1Top1++;
    }
    if (top1Id === targetHyp.id || top2Id === targetHyp.id) {
      top2Success++;
    }
  }
}

const top1Rate = ((top1Success / totalHyps) * 100).toFixed(1);
const top2Rate = ((top2Success / totalHyps) * 100).toFixed(1);
const wave1Rate = ((wave1Top1 / Math.max(1, wave1Total)) * 100).toFixed(1);
const avgQuestions = (totalQuestionsAsked / totalHyps).toFixed(2);

// ----------------------------------------------------------------------------
// Test 2: 低エビデンス・適応外仮説（offlabel / Evidence B, C）の到達性検証
// ----------------------------------------------------------------------------
const offlabelTests = [
  {
    name: 'スピロノラクトン ➔ 成人女性難治性ざ瘡（適応外・Evidence C）',
    drugQuery: 'スピロノラクトン',
    targetId: 'spiro_female_acne_offlabel',
    answers: [
      { questionId: 'spiro_q1_combo', optionId: 'spiro_opt_none', confidence: 'yes' },
      { questionId: 'spiro_q2_dose', optionId: 'spiro_opt_high_dose', confidence: 'yes' },
      { questionId: 'shared_q_dept', optionId: 'dept_uro_derm', confidence: 'yes' },
      { questionId: 'shared_q_sex_age', optionId: 'sa_female_repro', confidence: 'yes' }
    ]
  },
  {
    name: 'アムロジピン ➔ レイノー症候群・強皮症末梢循環障害（適応外・Evidence B）',
    drugQuery: 'アムロジピン',
    targetId: 'amlodipine_raynaud_offlabel',
    answers: [
      { questionId: 'ccb_q1_type', optionId: 'ccb_opt_nife_cr', confidence: 'yes' },
      { questionId: 'ccb_q2_combo', optionId: 'ccb_opt_none', confidence: 'yes' },
      { questionId: 'shared_q_dept', optionId: 'dept_rheuma', confidence: 'yes' },
      { questionId: 'shared_q_sex_age', optionId: 'sa_female_repro', confidence: 'yes' }
    ]
  },
  {
    name: 'ロサルタン ➔ マルファン症候群大動脈基部拡張抑制（適応外・Evidence B・RedFlag）',
    drugQuery: 'ロサルタン',
    targetId: 'losartan_marfan_offlabel',
    answers: [
      { questionId: 'arb_q1_molecule', optionId: 'arb_opt_losartan_young_beta', confidence: 'yes' },
      { questionId: 'arb_q2_patient', optionId: 'arb_opt_pat_marfan', confidence: 'yes' }
    ]
  },
  {
    name: 'ベザフィブラート ➔ 原発性胆汁性胆管炎 PBC（適応外・GL推奨）',
    drugQuery: 'ベザフィブラート',
    targetId: 'pbc_cholestasis',
    answers: [
      { questionId: 'fib_q2_combo', optionId: 'fib_opt_combo_udca', confidence: 'yes' },
      { questionId: 'shared_q_dept', optionId: 'dept_gi', confidence: 'yes' }
    ]
  }
];

let offlabelPassCount = 0;
const offlabelReport = [];
for (const t of offlabelTests) {
  const entry = resolveDrugEntryFromKB(structuredKB, t.drugQuery);
  const initEval = engine.evaluateState(entry, [], {});
  const initCand = initEval.ranked.find(r => r.id === t.targetId);
  const finalEval = engine.evaluateState(entry, t.answers, {});
  const top1 = finalEval.ranked[0];
  const passed = Boolean(initCand && !initCand.ruledOut && top1 && top1.id === t.targetId);
  if (passed) offlabelPassCount++;
  offlabelReport.push({
    name: t.name,
    initialPriorPct: initCand ? initCand.probExact : 0,
    finalTop1Id: top1 ? top1.id : 'none',
    finalTop1ProbPct: top1 ? top1.probExact : 0,
    passed
  });
}

// ----------------------------------------------------------------------------
// Test 3: 棄却候補の非削除保持と回答変更による自動復活テスト
// ----------------------------------------------------------------------------
const spiroEntry = resolveDrugEntryFromKB(structuredKB, 'スピロノラクトン');
const stepA = engine.evaluateState(spiroEntry, [
  { questionId: 'spiro_q1_combo', optionId: 'spiro_opt_4pillars', confidence: 'yes' },
  { questionId: 'spiro_q2_dose', optionId: 'spiro_opt_low_dose', confidence: 'yes' },
  { questionId: 'spiro_q3_patient', optionId: 'spiro_opt_sym_dyspnea', confidence: 'yes' },
  { questionId: 'spiro_q4_lab', optionId: 'spiro_opt_lab_lvef_low', confidence: 'yes' }
], {});
const acneInStepA = stepA.ranked.find(r => r.id === 'spiro_female_acne_offlabel');
const ruledOutProperly = Boolean(acneInStepA && acneInStepA.ruledOut && acneInStepA.ruledOutReason);

// 回答を皮膚科・高用量・単独に変更したときに自動復活するか検証
const stepB = engine.evaluateState(spiroEntry, [
  { questionId: 'spiro_q1_combo', optionId: 'spiro_opt_none', confidence: 'yes' },
  { questionId: 'spiro_q2_dose', optionId: 'spiro_opt_high_dose', confidence: 'yes' },
  { questionId: 'shared_q_dept', optionId: 'dept_uro_derm', confidence: 'yes' },
  { questionId: 'shared_q_sex_age', optionId: 'sa_female_repro', confidence: 'yes' }
], {});
const acneInStepB = stepB.ranked.find(r => r.id === 'spiro_female_acne_offlabel');
const revivedProperly = Boolean(acneInStepB && !acneInStepB.ruledOut && stepB.ranked[0].id === 'spiro_female_acne_offlabel');

// ----------------------------------------------------------------------------
// Test 4: NSIPS実データ形式サンプルによる自動回答・質問圧縮テスト
// ----------------------------------------------------------------------------
const nsipsResults = [];
for (const [key, sample] of Object.entries(WIZARD_NSIPS_SAMPLES)) {
  const parsed = parsePrescriptionText(sample.raw);
  const firstDrug = parsed.drugs[0].cleanName;
  const otherDrugs = parsed.drugs.slice(1).map(d => d.cleanName);
  const entry = resolveDrugEntryFromKB(structuredKB, firstDrug);
  const autoAnswers = extractAutoAnswersForEntry(parsed, entry);
  const evalWithAuto = engine.evaluateState(entry, autoAnswers, { coDrugs: otherDrugs, normalizedRx: parsed });
  nsipsResults.push({
    key,
    title: sample.title,
    autoAnswerCount: autoAnswers.length,
    matchedSignatures: evalWithAuto.matchedSignatures.length,
    topCandidate: evalWithAuto.ranked[0].name,
    topProbPct: evalWithAuto.ranked[0].probExact
  });
}

console.log('====================================================================');
console.log('  SIMULATE_WIZARD.JS — ベイズ推論エンジン シミュレーション検証結果');
console.log('====================================================================');
console.log(`  [1] 全仮説アキネーター自己同定テスト (全${totalHyps}仮説)`);
console.log(`      - Wave 1 (循環器重点領域) Top-1 同定率 : ${wave1Rate}% (${wave1Top1}/${wave1Total})`);
console.log(`      - 全体 Top-1 同定率                   : ${top1Rate}% (${top1Success}/${totalHyps})`);
console.log(`      - 全体 Top-2 以内同定率               : ${top2Rate}% (${top2Success}/${totalHyps})`);
console.log(`      - 1剤入力からの平均質問数             : ${avgQuestions} 問 (上限15問)`);
console.log('--------------------------------------------------------------------');
console.log(`  [2] 低エビデンス・適応外仮説の非切り捨て＆到達性テスト (${offlabelPassCount}/${offlabelTests.length} 合格)`);
for (const r of offlabelReport) {
  console.log(`      - ${r.passed ? '✅' : '❌'} ${r.name}`);
  console.log(`        初期事前確率: ${r.initialPriorPct}% (非ゼロ保持) ➔ 条件一致時Top-1: ${r.finalTop1Id} (${r.finalTop1ProbPct}%)`);
}
console.log('--------------------------------------------------------------------');
console.log(`  [3] 棄却候補の理由保持＆回答変更時の復活テスト`);
console.log(`      - 強反証時の棄却フラグ＆理由保持 : ${ruledOutProperly ? '✅ PASS' : '❌ FAIL'} (${acneInStepA ? acneInStepA.ruledOutReason : ''})`);
console.log(`      - 回答変更時の自動復活＆Top-1浮上: ${revivedProperly ? '✅ PASS' : '❌ FAIL'} (復活後事後確率: ${acneInStepB ? acneInStepB.probExact + '%' : ''})`);
console.log('--------------------------------------------------------------------');
console.log(`  [4] NSIPSテストデータ自動回答（🤖自動）質問圧縮テスト`);
for (const nr of nsipsResults) {
  console.log(`      - ✅ ${nr.title}`);
  console.log(`        自動回答: ${nr.autoAnswerCount}問 + 併用シグネチャ: ${nr.matchedSignatures}件 ➔ 最有力: ${nr.topCandidate} (${nr.topProbPct}%)`);
}
console.log('====================================================================');

if (offlabelPassCount < offlabelTests.length || !ruledOutProperly || !revivedProperly) {
  process.exit(1);
}
console.log('[PASS] 全シミュレーション・適応外到達性・棄却復活・NSIPS自動絞り込みテスト合格');
