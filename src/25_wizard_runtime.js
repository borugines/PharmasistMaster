// ============================================================================
// 25_wizard_runtime.js — アキネーター型ベイズ推論エンジン UI統合ランタイム
// 1剤入力時の情報利得最大化による動的1問1答・NSIPS自動絞り込み・
// 適応外/エビデンスバッジ・棄却理由表示・水増しゼロ事後確率表示を統括する
// ============================================================================

// ウィザード拡張状態の初期化
wizardState.structuredEntry = null;
wizardState.bayesianAnswers = []; // [{ questionId, optionId, confidence, auto, source }]
wizardState.answerConfidenceMode = 'yes'; // 'yes' (確実) | 'prob_yes' (たぶんそう)
wizardState.normalizedRx = null;
wizardState.forceContinueAsking = false;

/**
 * 承認区分（label / guideline / offlabel）とエビデンスレベル（A/B/C）のバッジHTMLを生成する
 */
function renderHypothesisEvidenceBadges(dis) {
  if (!dis) return '';
  const status = dis.regulatoryStatus || 'label';
  const ev = dis.evidenceLevel || 'B';
  const claimRisk = dis.claimRisk || 'none';

  let regBadge = '';
  if (status === 'offlabel') {
    regBadge = `<span style="display:inline-flex; align-items:center; gap:3px; background:#fff7ed; color:#c2410c; border:1px solid #fdba74; padding:2px 8px; border-radius:999px; font-size:0.73rem; font-weight:800;">🟠 適応外使用${claimRisk === 'medium' || claimRisk === 'high' ? '（査定注意）' : '（55年通知等）'}</span>`;
  } else if (status === 'guideline') {
    regBadge = `<span style="display:inline-flex; align-items:center; gap:3px; background:#ecfdf5; color:#047857; border:1px solid #6ee7b7; padding:2px 8px; border-radius:999px; font-size:0.73rem; font-weight:800;">🟢 ガイドライン推奨</span>`;
  } else {
    regBadge = `<span style="display:inline-flex; align-items:center; gap:3px; background:#eff6ff; color:#1d4ed8; border:1px solid #93c5fd; padding:2px 8px; border-radius:999px; font-size:0.73rem; font-weight:800;">🔵 添付文書適応</span>`;
  }

  const evColors = {
    A: 'background:#fef3c7; color:#92400e; border:1px solid #fcd34d;',
    B: 'background:#f1f5f9; color:#334155; border:1px solid #cbd5e1;',
    C: 'background:#fae8ff; color:#86198f; border:1px solid #f0abfc;'
  };
  const evStyle = evColors[ev] || evColors.B;
  const evBadge = `<span style="display:inline-flex; align-items:center; padding:2px 7px; border-radius:999px; font-size:0.72rem; font-weight:800; ${evStyle}">Evidence ${ev}</span>`;

  const redFlagBadge = dis.redFlag
    ? `<span style="display:inline-flex; align-items:center; gap:2px; background:#fef2f2; color:#b91c1c; border:1px solid #fca5a5; padding:2px 7px; border-radius:999px; font-size:0.72rem; font-weight:800;">🚨 Red-Flag鑑別</span>`
    : '';

  const srcBadge = Array.isArray(dis.sourceIds) && dis.sourceIds.length > 0
    ? `<span style="display:inline-flex; align-items:center; gap:2px; background:#f8fafc; color:#475569; border:1px solid #e2e8f0; padding:2px 7px; border-radius:999px; font-size:0.7rem; font-weight:700;">📚 ${dis.sourceIds.join(', ')}</span>`
    : '';

  return `<span style="display:inline-flex; flex-wrap:wrap; gap:4px; align-items:center;">${regBadge}${evBadge}${redFlagBadge}${srcBadge}</span>`;
}

/**
 * 手動プロファイル設定（wizardState.patientProfile）を共通質問の回答リストへ同期する
 */
function syncProfileToBayesianAnswers() {
  const prof = wizardState.patientProfile;
  if (!prof) return [];
  const profileAnswers = [];

  // 1. 診療科
  if (prof.dept) {
    profileAnswers.push({
      questionId: 'shared_q_dept',
      optionId: `dept_${prof.dept}`,
      confidence: 'yes',
      auto: true,
      source: '患者プロファイル設定（受診科）'
    });
  }

  // 2. 処方日数
  if (prof.days) {
    profileAnswers.push({
      questionId: 'shared_q_days',
      optionId: `days_${prof.days}`,
      confidence: 'yes',
      auto: true,
      source: '患者プロファイル設定（処方日数）'
    });
  }

  // 3. 処方変更ステータス
  if (prof.change) {
    profileAnswers.push({
      questionId: 'shared_q_change',
      optionId: `change_${prof.change}`,
      confidence: 'yes',
      auto: true,
      source: '患者プロファイル設定（処方変更）'
    });
  }

  // 4. 年齢・性別
  if (prof.gender === 'female') {
    const optId = (prof.age === 'senior' || prof.age === 'elderly') ? 'sa_female_senior' : 'sa_female_repro';
    profileAnswers.push({
      questionId: 'shared_q_sex_age',
      optionId: optId,
      confidence: 'yes',
      auto: true,
      source: '患者プロファイル設定（女性・年代）'
    });
  } else if (prof.gender === 'male') {
    const optId = (prof.age === 'senior' || prof.age === 'elderly') ? 'sa_male_senior' : 'sa_male_adult';
    profileAnswers.push({
      questionId: 'shared_q_sex_age',
      optionId: optId,
      confidence: 'yes',
      auto: true,
      source: '患者プロファイル設定（男性・年代）'
    });
  } else if (prof.age === 'senior' || prof.age === 'elderly') {
    profileAnswers.push({
      questionId: 'shared_q_sex_age',
      optionId: 'sa_male_senior',
      confidence: 'yes',
      auto: true,
      source: '患者プロファイル設定（高齢者）'
    });
  }

  return profileAnswers;
}

/**
 * 現在の全回答（ユーザー手動回答 ＋ NSIPS自動回答 ＋ プロファイル連動回答）を統合して取得する
 */
function getEffectiveBayesianAnswers() {
  const byQ = new Map();
  // プロファイル回答をまずセット
  for (const a of syncProfileToBayesianAnswers()) {
    byQ.set(a.questionId, a);
  }
  // NSIPS自動回答・ユーザー回答で上書き（ユーザー回答が最優先）
  for (const a of (wizardState.bayesianAnswers || [])) {
    byQ.set(a.questionId, a);
  }
  return Array.from(byQ.values());
}

/**
 * 現在のベイズ評価結果を取得する（主訴フリーワード・検査値ピルもベイズ事後確率へ統合）
 */
function getCurrentBayesianEvaluation() {
  if (!wizardState.structuredEntry) return null;
  const effectiveAnswers = getEffectiveBayesianAnswers();
  const baseEval = wizardBayesianEngine.evaluateState(
    wizardState.structuredEntry,
    effectiveAnswers,
    {
      coDrugs: wizardState.customDrugs || [],
      normalizedRx: wizardState.normalizedRx
    }
  );

  // プロファイル検査値ピルやフリー主訴が入力されている場合、事後確率へ追加尤度更新を行う
  const hasLabs = wizardState.patientProfile && wizardState.patientProfile.labs && wizardState.patientProfile.labs.size > 0;
  const hasVitals = wizardState.patientProfile && wizardState.patientProfile.vitals && wizardState.patientProfile.vitals.size > 0;
  const hasCustomText = Array.isArray(wizardState.customDrugs) && wizardState.customDrugs.length > 0;

  if (hasLabs || hasVitals || hasCustomText) {
    const bonusScores = {};
    for (const r of baseEval.ranked) {
      bonusScores[r.id] = 0;
    }
    if (typeof applyProfileWeights === 'function') {
      applyProfileWeights(bonusScores);
    }
    // フリー主訴・併用薬キーワードのマッチング
    for (const cd of (wizardState.customDrugs || [])) {
      const cdLower = cd.toLowerCase();
      for (const r of baseEval.ranked) {
        const pool = `${r.name || ''} ${r.subType || ''} ${r.criteria || ''} ${r.reason || ''} ${r.keyPoint || ''}`.toLowerCase();
        if (pool.includes(cdLower)) {
          bonusScores[r.id] += 55;
          r.supportingReasons.push({
            type: 'custom_symptom',
            label: `🗣️ 追加情報「${cd}」に一致`,
            logOdds: 1.4
          });
        }
      }
    }

    // bonusScores をソフトマックス乗算して再正規化
    let sumP = 0;
    for (const r of baseEval.ranked) {
      const boost = bonusScores[r.id] || 0;
      const mult = Math.exp(boost / 65.0);
      r.posterior = r.posterior * mult;
      sumP += r.posterior;
    }
    if (sumP > 0) {
      for (const r of baseEval.ranked) {
        r.posterior = r.posterior / sumP;
        r.prob = Math.round(r.posterior * 100);
        r.probExact = Math.round(r.posterior * 1000) / 10;
        r.ruledOut = effectiveAnswers.length > 0 && r.posterior < wizardBayesianEngine.RULED_OUT_THRESHOLD;
        baseEval.posteriors[r.id] = r.posterior;
      }
      baseEval.ranked.sort((a, b) => b.posterior - a.posterior);
      baseEval.activeCandidates = baseEval.ranked.filter(r => !r.ruledOut);
      baseEval.ruledOutCandidates = baseEval.ranked.filter(r => r.ruledOut);
    }
  }

  return baseEval;
}

/**
 * 起点薬の選択処理（重複エイリアス自動統合KB + ベイズエンジン初期化）
 */
selectWizardPrimaryDrug = function(drugName, preserveAutoContext = false) {
  const query = (drugName || '').trim();
  if (!query) return;

  // 1. 構造化KB（重複エイリアス30件を自動マージしたKB）から検索
  let resolved = (typeof resolveDrugEntryFromKB === 'function')
    ? resolveDrugEntryFromKB(query)
    : null;

  // 2. 構造化KBにない場合は DRUG_DIFF_MAP / DRUG_DB フォールバックから生成して構造化
  if (!resolved) {
    const qLower = query.toLowerCase();
    let fallbackRaw = null;
    let fallbackKey = null;

    if (typeof DRUG_DIFF_MAP !== 'undefined') {
      const mapItem = DRUG_DIFF_MAP.find(m => m.drugs.some(d => d.toLowerCase().includes(qLower) || qLower.includes(d.toLowerCase())));
      if (mapItem) {
        fallbackKey = 'auto_' + qLower;
        const primaryDrugName = mapItem.drugs[0];
        fallbackRaw = {
          name: primaryDrugName,
          aliases: mapItem.drugs,
          category: '処方鑑別データベース連携薬剤',
          questions: [
            {
              id: 'auto_q1',
              title: `Q1. 処方箋情報：【${primaryDrugName}】の用量や併用薬の特徴はどれですか？`,
              subtitle: '処方の組み合わせから病態を推定します',
              options: mapItem.diffs.map((d, idx) => ({
                id: 'auto_opt_sign_' + idx,
                label: d.criteria.replace(/【処方サイン】/, '').trim(),
                badge: '処方サイン: ' + d.name.replace(/^\d+\.\s*/, ''),
                desc: d.subType,
                weights: { ['auto_dis_' + idx]: 75 }
              }))
            },
            {
              id: 'auto_q2',
              title: `Q2. 🗣️【患者への問診・確認】薬だけでは特定できない場合の主訴はどれですか？`,
              subtitle: '患者さんの生の声から鑑別を確定します',
              options: mapItem.diffs.map((d, idx) => {
                const mainSym = d.keyPoint.split('、')[0] || d.keyPoint;
                return {
                  id: 'auto_opt_pat_' + idx,
                  label: `「${mainSym}」などの自覚症状・主訴がある`,
                  badge: '🗣️ 患者問診: ' + d.name.replace(/^\d+\.\s*/, ''),
                  desc: `【確認の急所】${d.keyPoint}`,
                  weights: { ['auto_dis_' + idx]: 85 }
                };
              })
            }
          ],
          diseases: mapItem.diffs.map((d, idx) => ({
            id: 'auto_dis_' + idx,
            cardNum: d.cardNum,
            name: d.name,
            subType: d.subType,
            baseProb: Math.round(100 / mapItem.diffs.length),
            criteria: d.criteria,
            reason: d.reason,
            keyPoint: d.keyPoint
          }))
        };
      }
    }

    if (!fallbackRaw && typeof DRUG_DB !== 'undefined') {
      const drugDbItem = DRUG_DB.find(d =>
        (d.name && d.name.toLowerCase().includes(qLower)) ||
        (d.gen && d.gen.toLowerCase().includes(qLower)) ||
        qLower.includes((d.name || '').toLowerCase())
      );
      if (drugDbItem) {
        fallbackKey = 'drugdb_' + qLower;
        const primaryName = drugDbItem.name.split('/')[0].trim();
        let cNum = 1;
        if (drugDbItem.gId) {
          const numPart = parseInt(drugDbItem.gId.replace('c', ''), 10);
          if (!isNaN(numPart) && numPart <= 46) cNum = numPart;
        }
        fallbackRaw = {
          name: `${drugDbItem.name}（${drugDbItem.gen}）`,
          aliases: [primaryName, drugDbItem.gen].filter(Boolean),
          category: drugDbItem.cat || '全150疾患 臨床事典マスター連携',
          questions: [
            {
              id: 'ddb_q1',
              title: `Q1. 処方箋情報：【${primaryName}】の用法・処方特徴はどれですか？`,
              subtitle: '標準的な処方パターンを確認します',
              options: [
                {
                  id: 'ddb_opt1',
                  label: `標準的な用法・用量（${drugDbItem.char}）`,
                  badge: '適応病態',
                  desc: drugDbItem.desc,
                  weights: { ddb_dis: 80 }
                }
              ]
            }
          ],
          diseases: [
            {
              id: 'ddb_dis',
              cardNum: cNum,
              name: drugDbItem.cat.replace(/^\d+\.\s*/, ''),
              subType: `🎯 ${drugDbItem.char}`,
              baseProb: 80,
              criteria: `【処方薬】${drugDbItem.name}（${drugDbItem.gen}）`,
              reason: drugDbItem.desc,
              keyPoint: drugDbItem.char
            }
          ]
        };
      }
    }

    if (fallbackRaw) {
      const disMap = {};
      for (const d of fallbackRaw.diseases) {
        disMap[d.id] = {
          ...d,
          regulatoryStatus: 'label',
          evidenceLevel: 'B',
          frequencyTier: 'common',
          claimRisk: 'none',
          redFlag: false,
          sourceIds: ['PMDA_PACKAGE_INSERT'],
          reviewStatus: 'draft'
        };
      }
      resolved = {
        key: fallbackKey,
        entry: {
          id: fallbackKey,
          name: fallbackRaw.name,
          aliases: fallbackRaw.aliases || [],
          category: fallbackRaw.category,
          specialtyWave: 'other',
          questions: (fallbackRaw.questions || []).map(q => ({
            ...q,
            text: q.title,
            cost: 1.0
          })),
          diseases: disMap
        }
      };
    }
  }

  if (!resolved || !resolved.entry) {
    alert(`「${drugName}」に合致する処方鑑別データが見つかりませんでした。別の薬剤名でお試しください。`);
    return;
  }

  const structEntry = resolved.entry;
  const diseasesArray = Object.values(structEntry.diseases || {});
  const allQuestions = wizardBayesianEngine.getAllCandidateQuestions(structEntry);

  wizardState.activeKey = resolved.key;
  wizardState.structuredEntry = structEntry;
  wizardState.activeData = {
    name: structEntry.name,
    category: structEntry.category,
    aliases: structEntry.aliases,
    questions: allQuestions,
    diseases: diseasesArray
  };

  if (!preserveAutoContext) {
    wizardState.bayesianAnswers = [];
    wizardState.selectedOptionIds.clear();
    wizardState.customDrugs = [];
    wizardState.normalizedRx = null;
    wizardState.forceContinueAsking = false;
    const diagBox = document.getElementById('wizardNsipsDiagnosticsBox');
    if (diagBox) diagBox.style.display = 'none';
  }
  wizardState.history = [];
  wizardState.currentQuestionIndex = 0;

  // UI更新
  const inputEl = document.getElementById('wizardDrugInput');
  if (inputEl) inputEl.value = structEntry.name;
  const clearBtn = document.getElementById('wizardClearInputBtn');
  if (clearBtn) clearBtn.style.display = 'flex';
  const dropdown = document.getElementById('wizardSuggestDropdown');
  if (dropdown) dropdown.style.display = 'none';

  const step2 = document.getElementById('wizardStep2');
  if (step2) step2.style.display = 'block';
  const step3 = document.getElementById('wizardStep3');
  if (step3 && !preserveAutoContext) step3.style.display = 'none';

  const badgeEl = document.getElementById('wizardSelectedDrugBadge');
  if (badgeEl) {
    const mergedTag = Array.isArray(structEntry.mergedFrom) && structEntry.mergedFrom.length > 1
      ? `<span style="font-size:0.72rem; background:#0284c7; color:white; padding:2px 8px; border-radius:10px;">🔗 複数領域統合 (${structEntry.mergedFrom.length}領域・計${diseasesArray.length}仮説)</span>`
      : `<span style="font-size:0.72rem; background:#0f766e; color:white; padding:2px 8px; border-radius:10px;">全${diseasesArray.length}仮説</span>`;
    badgeEl.innerHTML = `<span>💊 鑑別起点薬：<strong>${structEntry.name}</strong></span> <span style="font-size:0.75rem; background:#10b981; color:white; padding:2px 8px; border-radius:10px;">${structEntry.category}</span> ${mergedTag}`;
  }

  renderWizardCustomDrugTags();
  updateAkinatorGauge();
  renderAkinatorCurrentQuestion();

  if (!preserveAutoContext) {
    setTimeout(() => {
      if (step2) step2.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
};

/**
 * アキネーター型 動的最適質問ステージの描画
 */
renderAkinatorCurrentQuestion = function() {
  const stage = document.getElementById('wizardQuestionStage');
  const tracker = document.getElementById('wizardStepTracker');
  const prevBtn = document.getElementById('wizardPrevBtn');
  if (!stage || !wizardState.structuredEntry) return;

  const evalState = getCurrentBayesianEvaluation();
  if (!evalState) return;

  const userAnsweredCount = (wizardState.bayesianAnswers || []).filter(a => !a.auto).length;
  const autoAnsweredList = getEffectiveBayesianAnswers().filter(a => a.auto);

  if (prevBtn) {
    prevBtn.style.display = wizardState.history.length > 0 ? 'inline-flex' : 'none';
  }

  // 停止条件を満たしており、かつ「質問を続ける」が押されていない場合は自動的に結果を表示
  if (evalState.stoppingStatus.stop && !wizardState.forceContinueAsking && getEffectiveBayesianAnswers().length > 0) {
    calculateWizardDiagnosis(true);
    if (!evalState.nextQuestion) return;
  }

  const q = evalState.nextQuestion;
  if (!q) {
    stage.innerHTML = `
      <div style="padding:16px; background:#ecfdf5; border:1px solid #6ee7b7; border-radius:10px; color:#065f46; font-weight:700;">
        🎉 すべての鑑別質問が完了しました。下部の診断レポートをご確認ください。
      </div>
    `;
    calculateWizardDiagnosis(true);
    return;
  }

  // 現在提示中の質問を状態に記録
  wizardState.currentActiveQuestion = q;

  if (tracker) {
    const autoBadge = autoAnsweredList.length > 0
      ? ` <span style="background:#dbeafe; color:#1e40af; padding:2px 8px; border-radius:999px; font-size:0.74rem;">🤖 自動回答 ${autoAnsweredList.length}件適用済</span>`
      : '';
    tracker.innerHTML = `<span>❓ 問診ステップ ${userAnsweredCount + 1}（最大15問）</span>${autoBadge}`;
  }

  // 1. 自動回答＆併用シグネチャ通知バー
  let autoSummaryHtml = '';
  if (autoAnsweredList.length > 0 || (evalState.matchedSignatures && evalState.matchedSignatures.length > 0)) {
    const chips = [
      ...autoAnsweredList.map(a => `<span style="background:#eff6ff; color:#1d4ed8; border:1px solid #bfdbfe; padding:2px 8px; border-radius:999px; font-size:0.73rem; font-weight:700;">🤖 ${a.source}</span>`),
      ...(evalState.matchedSignatures || []).map(s => `<span style="background:#f0fdf4; color:#15803d; border:1px solid #bbf7d0; padding:2px 8px; border-radius:999px; font-size:0.73rem; font-weight:700;">🔗 ${s.label}</span>`)
    ].join(' ');
    autoSummaryHtml = `
      <div style="margin-bottom:10px; padding:8px 12px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; display:flex; align-items:center; flex-wrap:wrap; gap:6px;">
        <span style="font-size:0.76rem; font-weight:800; color:#334155;">⚡ 自動絞り込み済：</span>
        ${chips}
      </div>
    `;
  }

  // 2. Red-Flag 警告バー
  let redFlagHtml = '';
  if (evalState.activeRedFlags && evalState.activeRedFlags.length > 0) {
    redFlagHtml = `
      <div style="margin-bottom:10px; padding:9px 12px; background:#fef2f2; border:1px solid #fca5a5; border-radius:8px; color:#991b1b; font-size:0.8rem; font-weight:700;">
        🚨 <strong>Red-Flag 鑑別注意：</strong>現在「${evalState.activeRedFlags.map(r => `${r.name} (${r.prob}%)`).join(' / ')}」の可能性が残っています。禁忌・緊急受診徴候を優先確認してください。
      </div>
    `;
  }

  // 3. リアルタイム上位3候補のベイズ事後確率バー
  const top3 = evalState.activeCandidates.slice(0, 3);
  const liveCandidatesHtml = `
    <div style="margin-bottom:12px; padding:10px 14px; background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; box-shadow:0 1px 2px rgba(0,0,0,0.03);">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px; margin-bottom:8px;">
        <span style="font-size:0.8rem; font-weight:800; color:#1e293b;">📊 リアルタイム疾患候補ランキング（ベイズ事後確率・水増しなし）</span>
        <span style="font-size:0.73rem; color:#64748b;">エントロピー: ${evalState.entropy} bit / 棄却候補: ${evalState.ruledOutCandidates.length}件</span>
      </div>
      <div style="display:flex; flex-direction:column; gap:6px;">
        ${top3.map((cand, idx) => {
          const rankIcon = idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉';
          const barColor = cand.regulatoryStatus === 'offlabel' ? '#f97316' : (idx === 0 ? '#10b981' : '#3b82f6');
          return `
            <div style="display:flex; flex-direction:column; gap:3px;">
              <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
                <div style="font-size:0.82rem; font-weight:700; color:#1e293b; display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                  <span>${rankIcon} ${cand.name}</span>
                  ${renderHypothesisEvidenceBadges(cand)}
                </div>
                <span style="font-size:0.86rem; font-weight:900; color:#0f172a;">${cand.probExact}%</span>
              </div>
              <div style="height:6px; width:100%; background:#f1f5f9; border-radius:999px; overflow:hidden;">
                <div style="height:100%; width:${Math.min(100, Math.max(2, cand.prob))}%; background:${barColor}; transition:width 0.25s ease;"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // 4. なぜこの質問？（期待情報利得 IG 表示）＋ 回答確信度モード切替
  const whyQuestionHtml = `
    <div style="margin-bottom:10px; padding:8px 12px; background:#eff6ff; border-left:4px solid #2563eb; border-radius:6px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
      <div style="font-size:0.8rem; color:#1e3a8a;">
        <strong>💡 なぜこの質問？：</strong>${evalState.nextQuestionReason || '上位候補を最も効率よく鑑別するため'}
      </div>
      <div style="display:inline-flex; align-items:center; gap:4px; background:#ffffff; padding:3px 6px; border-radius:8px; border:1px solid #bfdbfe;">
        <span style="font-size:0.72rem; color:#475569; font-weight:700;">回答の確からしさ：</span>
        <button type="button" onclick="setWizardAnswerConfidenceMode('yes')" style="font-size:0.72rem; padding:2px 8px; border-radius:6px; border:none; cursor:pointer; font-weight:800; ${wizardState.answerConfidenceMode === 'yes' ? 'background:#2563eb; color:white;' : 'background:#f1f5f9; color:#475569;'}">◎ 確実</button>
        <button type="button" onclick="setWizardAnswerConfidenceMode('prob_yes')" style="font-size:0.72rem; padding:2px 8px; border-radius:6px; border:none; cursor:pointer; font-weight:800; ${wizardState.answerConfidenceMode === 'prob_yes' ? 'background:#0284c7; color:white;' : 'background:#f1f5f9; color:#475569;'}">○ たぶんそう</button>
      </div>
    </div>
  `;

  const qTitleClean = (q.text || q.title || '').replace(/^Q\d+\.\s*/, '');

  let choicesHtml = '';
  for (const opt of (q.options || [])) {
    const existingAns = getEffectiveBayesianAnswers().find(a => a.questionId === q.id && a.optionId === opt.id);
    const isSelected = Boolean(existingAns);
    choicesHtml += `
      <div class="wizard-akinator-btn ${isSelected ? 'selected' : ''}" onclick="wizardChooseOption('${opt.id}')">
        <div class="wizard-btn-left">
          <div class="wizard-btn-label">
            <span>${isSelected ? '✅' : '⚪'}</span>
            <span>${opt.label}</span>
          </div>
          ${opt.desc ? `<div class="wizard-btn-desc">${opt.desc}</div>` : ''}
        </div>
        ${opt.badge ? `<span class="wizard-btn-badge">${opt.badge}</span>` : ''}
      </div>
    `;
  }

  stage.innerHTML = `
    ${autoSummaryHtml}
    ${redFlagHtml}
    ${liveCandidatesHtml}
    ${whyQuestionHtml}
    <div class="wizard-stage-title-box">
      <h3 class="wizard-stage-title">Q${userAnsweredCount + 1}. ${qTitleClean}</h3>
      ${q.subtitle ? `<div class="wizard-stage-subtitle">💡 ${q.subtitle}</div>` : ''}
    </div>
    <div class="wizard-akinator-choices">
      ${choicesHtml}
      <div class="wizard-akinator-btn" onclick="wizardStepSkip()" style="border-style:dashed; opacity:0.88; background:#f8fafc;">
        <div class="wizard-btn-left">
          <div class="wizard-btn-label" style="color:#64748b;">
            <span>❓</span>
            <span>不明・確認できない（確率を変えずに次の最適質問へ）</span>
          </div>
          <div class="wizard-btn-desc">わからない場合は無理に選ばずスキップしてください（事後確率は歪みません）</div>
        </div>
        <span class="wizard-btn-badge" style="background:#cbd5e1;">不明 / スキップ</span>
      </div>
    </div>
  `;
};

/**
 * 回答確信度モード（◎確実 / ○たぶんそう）の切り替え
 */
function setWizardAnswerConfidenceMode(mode) {
  wizardState.answerConfidenceMode = mode === 'prob_yes' ? 'prob_yes' : 'yes';
  renderAkinatorCurrentQuestion();
}

/**
 * 選択肢をタップした時の処理（ベイズ更新して次の最適質問を選出）
 */
wizardChooseOption = function(optionId) {
  const q = wizardState.currentActiveQuestion;
  if (!q) return;

  // 履歴に現在の回答配列のスナップショットを保存
  wizardState.history.push(JSON.parse(JSON.stringify(wizardState.bayesianAnswers || [])));

  // 同じ質問に対する既存の回答を除去して新しい回答を追加
  wizardState.bayesianAnswers = (wizardState.bayesianAnswers || []).filter(a => a.questionId !== q.id);
  wizardState.bayesianAnswers.push({
    questionId: q.id,
    optionId,
    confidence: wizardState.answerConfidenceMode || 'yes',
    auto: false,
    source: '手動回答'
  });

  // 互換用 selectedOptionIds も同期
  if (q.options) {
    for (const o of q.options) {
      wizardState.selectedOptionIds.delete(o.id);
    }
  }
  wizardState.selectedOptionIds.add(optionId);

  updateAkinatorGauge();

  setTimeout(() => {
    renderAkinatorCurrentQuestion();
    const step3 = document.getElementById('wizardStep3');
    if (step3 && step3.style.display !== 'none') {
      calculateWizardDiagnosis(false);
    }
  }, 150);
};

/**
 * 前の質問に戻る
 */
wizardStepToPrev = function() {
  if (wizardState.history && wizardState.history.length > 0) {
    wizardState.bayesianAnswers = wizardState.history.pop();
    wizardState.selectedOptionIds = new Set(wizardState.bayesianAnswers.map(a => a.optionId));
    wizardState.forceContinueAsking = true;
    updateAkinatorGauge();
    renderAkinatorCurrentQuestion();
  }
};

/**
 * この質問を「不明（unknown）」としてスキップし、次の最適質問へ進む
 */
wizardStepSkip = function() {
  const q = wizardState.currentActiveQuestion;
  if (!q) return;

  wizardState.history.push(JSON.parse(JSON.stringify(wizardState.bayesianAnswers || [])));
  wizardState.bayesianAnswers = (wizardState.bayesianAnswers || []).filter(a => a.questionId !== q.id);
  const firstOptId = (q.options && q.options[0]) ? q.options[0].id : 'skip';
  wizardState.bayesianAnswers.push({
    questionId: q.id,
    optionId: firstOptId,
    confidence: 'unknown',
    auto: false,
    source: 'スキップ（不明）'
  });

  updateAkinatorGauge();
  renderAkinatorCurrentQuestion();
};

/**
 * 確信度メーターのリアルタイム更新（水増しゼロ・真のベイズ事後確率を表示）
 */
updateAkinatorGauge = function() {
  const evalState = getCurrentBayesianEvaluation();
  if (!evalState || !evalState.ranked || evalState.ranked.length === 0) return;

  const gaugeFill = document.getElementById('wizardGaugeFill');
  const confText = document.getElementById('wizardConfidenceText');
  const predText = document.getElementById('wizardPredictionText');

  const topDis = evalState.ranked[0];
  const topProb = topDis.prob;
  const effectiveAnswers = getEffectiveBayesianAnswers().filter(a => a.confidence !== 'unknown');
  const hasAnyEvidence = effectiveAnswers.length > 0 || (wizardState.customDrugs && wizardState.customDrugs.length > 0) || (evalState.matchedSignatures && evalState.matchedSignatures.length > 0);

  if (gaugeFill) gaugeFill.style.width = `${Math.min(99, Math.max(3, topProb))}%`;
  if (confText) {
    confText.innerText = hasAnyEvidence ? `${topDis.probExact}%` : `事前確率 ${topDis.probExact}%`;
  }
  if (predText && topDis) {
    predText.innerHTML = `${evalState.stoppingStatus.label} — 最有力：<strong>${topDis.name}</strong>`;
  }
};

/**
 * サンプルNSIPSテストデータのワンクリック読み込み＆自動解析
 */
function loadWizardSampleNsips(sampleKey) {
  if (typeof WIZARD_NSIPS_SAMPLES === 'undefined' || !WIZARD_NSIPS_SAMPLES[sampleKey]) return;
  const sample = WIZARD_NSIPS_SAMPLES[sampleKey];
  const textarea = document.getElementById('wizardPasteTextarea');
  if (textarea) {
    textarea.value = sample.raw;
    handlePrescriptionPaste();
  }
}

/**
 * NSIPS / JAHIS QR / 処方箋テキスト一括貼り付け解析（仕様書不要のヒューリスティック適応パーサ連携）
 */
const _legacyHandlePrescriptionPaste = handlePrescriptionPaste;
handlePrescriptionPaste = function() {
  const textarea = document.getElementById('wizardPasteTextarea');
  if (!textarea) return;
  const text = (textarea.value || '').trim();
  if (!text) {
    alert('処方箋テキストまたはNSIPSデータを貼り付けてください。');
    return;
  }

  // NSIPS / CSV / JAHIS 形式かどうかを判定（カンマ区切りレコードが含まれるか）
  const looksLikeStructuredRx = /^(?:NSIPS|JAHIS|[1-7],)/m.test(text);
  if (!looksLikeStructuredRx && typeof _legacyHandlePrescriptionPaste === 'function') {
    // 自由文の処方箋テキストは既存パーサでも処理しつつベイズエンジンへ橋渡し
    _legacyHandlePrescriptionPaste();
    return;
  }

  wizardState.rawPrescriptionText = text;
  resetPatientProfile();

  const parsed = parsePrescriptionText(text);
  wizardState.normalizedRx = parsed;

  // 診断プレビューボックスに解析結果を表示
  const diagBox = document.getElementById('wizardNsipsDiagnosticsBox');
  if (diagBox) {
    diagBox.style.display = 'block';
    diagBox.innerHTML = `
      <div style="font-weight:800; color:#0f766e; margin-bottom:4px;">✅ NSIPS / 処方構造化データ自動解析レポート</div>
      <div>${parsed.diagnostics.join(' ｜ ')}</div>
      ${parsed.drugs.length > 0 ? `<div style="margin-top:4px; color:#1e40af;">💊 抽出薬品：${parsed.drugs.map(d => `${d.rawName}${d.estimatedDailyMg ? ` (1日${d.estimatedDailyMg}mg)` : ''}${d.days ? ` [${d.days}日分]` : ''}`).join(' ／ ')}</div>` : ''}
    `;
  }

  // 抽出された薬品から構造化KBにマッチする最初の薬品を起点薬に選定
  let primaryDrugName = null;
  const otherDrugs = [];
  for (const d of parsed.drugs) {
    const resolved = resolveDrugEntryFromKB(d.cleanName) || resolveDrugEntryFromKB(d.rawName);
    if (!primaryDrugName && resolved) {
      primaryDrugName = d.cleanName;
    } else {
      otherDrugs.push(d.cleanName);
    }
  }

  if (!primaryDrugName && parsed.drugs.length > 0) {
    primaryDrugName = parsed.drugs[0].cleanName;
  }

  if (!primaryDrugName) {
    alert('NSIPSデータから認識可能な薬品名が見つかりませんでした。');
    return;
  }

  // 起点薬をセット
  selectWizardPrimaryDrug(primaryDrugName, true);
  wizardState.normalizedRx = parsed;
  wizardState.customDrugs = otherDrugs;

  // NSIPS情報から自動回答（🤖自動）を抽出してセット
  const autoAns = extractAutoAnswersForEntry(parsed, wizardState.structuredEntry);
  wizardState.bayesianAnswers = autoAns;
  wizardState.selectedOptionIds = new Set(autoAns.map(a => a.optionId));

  renderWizardCustomDrugTags();
  updateAkinatorGauge();
  renderAkinatorCurrentQuestion();
  calculateWizardDiagnosis(true);
};

/**
 * Step 3 診断結果レポートの描画（既存の詳細レポートの上に「ベイズ推論サマリー・適応外/エビデンスバッジ・支持/反証根拠・棄却候補一覧」を追加）
 */
const _legacyCalculateWizardDiagnosis = calculateWizardDiagnosis;
calculateWizardDiagnosis = function(isForced = false) {
  if (!wizardState.structuredEntry) return;

  // まず既存のレポート描画を実行
  _legacyCalculateWizardDiagnosis(isForced);

  // ベイズエンジンの評価結果を取得して、Step 3 上部に厳密なベイズ推論サマリー＆棄却候補パネルを挿入
  const evalState = getCurrentBayesianEvaluation();
  const resultsContainer = document.getElementById('wizardResultsContainer');
  if (!evalState || !resultsContainer) return;

  const top = evalState.ranked[0];
  if (!top) return;

  // ヒーローカード内の確信度表示を水増しなしのベイズ事後確率に統一
  const heroRankTag = resultsContainer.querySelector('.wizard-report-rank-tag');
  if (heroRankTag) {
    heroRankTag.innerHTML = `
      <span>🥇 ベイズ推論 最有力病態</span>
      <span>|</span>
      <span>事後確率：${top.probExact}%</span>
    `;
  }
  const heroTitle = resultsContainer.querySelector('.wizard-report-title');
  if (heroTitle) {
    heroTitle.innerHTML = `${top.name} <div style="margin-top:6px;">${renderHypothesisEvidenceBadges(top)}</div>`;
  }

  // ベイズ推論の根拠ログ＆適応外注意＆棄却候補アコーディオンカードを生成
  const bayesianAuditHtml = `
    <div style="margin-bottom:18px; padding:16px; background:#f8fafc; border:2px solid #0ea5e9; border-radius:12px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:10px;">
        <div style="font-size:0.96rem; font-weight:800; color:#0f172a; display:flex; align-items:center; gap:8px;">
          <span>🧮</span>
          <span>ベイズ推論エビデンス・監査サマリー（水増しなし実事後確率）</span>
        </div>
        <span style="font-size:0.78rem; font-weight:700; color:#0369a1; background:#e0f2fe; padding:3px 10px; border-radius:999px;">
          ${evalState.stoppingStatus.label}
        </span>
      </div>

      <!-- 上位候補の事後確率・承認区分・支持/反証根拠テーブル -->
      <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:12px;">
        ${evalState.activeCandidates.slice(0, 4).map((cand, idx) => {
          const rankLabel = idx === 0 ? '🥇 第1候補' : idx === 1 ? '🥈 第2候補' : idx === 2 ? '🥉 第3候補' : `第${idx + 1}候補`;
          const supText = cand.supportingReasons && cand.supportingReasons.length > 0
            ? cand.supportingReasons.map(s => `<span style="color:#047857;">＋ ${s.optionLabel || s.label} (+${s.logOdds} bit)</span>`).join(' ／ ')
            : '<span style="color:#64748b;">明示的なプラス根拠なし（事前確率ベース）</span>';
          const oppText = cand.opposingReasons && cand.opposingReasons.length > 0
            ? cand.opposingReasons.map(o => `<span style="color:#b91c1c;">－ ${o.optionLabel || o.label} (${o.logOdds} bit)</span>`).join(' ／ ')
            : '';
          const offlabelWarning = cand.regulatoryStatus === 'offlabel'
            ? `<div style="margin-top:6px; padding:6px 10px; background:#fff7ed; border:1px solid #fdba74; border-radius:6px; font-size:0.78rem; color:#9a3412;">
                 <strong>🟠 適応外処方に関する留意事項：</strong>この病態は国内添付文書上の承認外（または55年通知・ガイドライン推奨の適応外使用）です。患者へ「添付文書の記載とは異なるがガイドラインや専門医判断で確立された使用法である」旨を丁寧に説明し、不安による自己中断を防いでください。
               </div>`
            : '';

          return `
            <div style="padding:10px 12px; background:#ffffff; border:1px solid #e2e8f0; border-radius:8px;">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                  <strong style="font-size:0.88rem; color:#0f172a;">${rankLabel}：${cand.name}</strong>
                  ${renderHypothesisEvidenceBadges(cand)}
                </div>
                <div style="font-size:0.95rem; font-weight:900; color:#059669;">
                  事後確率 ${cand.probExact}% <span style="font-size:0.74rem; color:#64748b; font-weight:600;">(初期事前 ${Math.round(cand.prior * 100)}%)</span>
                </div>
              </div>
              <div style="font-size:0.78rem; margin-top:6px; line-height:1.45;">
                <div><strong>✅ 支持根拠：</strong>${supText}</div>
                ${oppText ? `<div style="margin-top:2px;"><strong>⚠️ 反証要素：</strong>${oppText}</div>` : ''}
              </div>
              ${offlabelWarning}
            </div>
          `;
        }).join('')}
      </div>

      <!-- 棄却された低確率候補（削除せず理由付きで保持） -->
      ${evalState.ruledOutCandidates.length > 0 ? `
        <details style="background:#f1f5f9; border:1px solid #cbd5e1; border-radius:8px; padding:8px 12px;">
          <summary style="cursor:pointer; font-size:0.8rem; font-weight:800; color:#475569;">
            📂 可能性が低下した候補（事後確率 0.5%未満：${evalState.ruledOutCandidates.length}件 — 回答を変更すると自動復活します）
          </summary>
          <div style="margin-top:8px; display:flex; flex-direction:column; gap:6px;">
            ${evalState.ruledOutCandidates.map(rc => `
              <div style="font-size:0.78rem; color:#475569; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px; padding:4px 8px; background:#ffffff; border-radius:6px;">
                <span><strong>${rc.name}</strong> ${renderHypothesisEvidenceBadges(rc)}</span>
                <span style="color:#b91c1c;">${rc.probExact}% — 理由: ${rc.ruledOutReason}</span>
              </div>
            `).join('')}
          </div>
        </details>
      ` : ''}
    </div>
  `;

  resultsContainer.innerHTML = bayesianAuditHtml + resultsContainer.innerHTML;
};

if (typeof window !== 'undefined') {
  window.renderHypothesisEvidenceBadges = renderHypothesisEvidenceBadges;
  window.setWizardAnswerConfidenceMode = setWizardAnswerConfidenceMode;
  window.loadWizardSampleNsips = loadWizardSampleNsips;
  window.getCurrentBayesianEvaluation = getCurrentBayesianEvaluation;
}
