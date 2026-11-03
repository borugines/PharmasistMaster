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
        const cleanCat = (drugDbItem.cat || '').replace(/^\d+\.\s*/, '').split('（')[0].trim();
        const catResolved = cleanCat ? resolveDrugEntryFromKB(cleanCat) : null;
        if (catResolved && catResolved.entry) {
          resolved = catResolved;
        } else {
          fallbackKey = 'drugdb_' + qLower;
          const primaryName = drugDbItem.name.split('/')[0].trim();
          let cNum = 1;
          if (drugDbItem.gId) {
            const numPart = parseInt(drugDbItem.gId.replace('c', ''), 10);
            if (!isNaN(numPart) && numPart <= 46) cNum = numPart;
          }
          const baseCatName = (drugDbItem.cat || primaryName).replace(/^\d+\.\s*/, '');
          fallbackRaw = {
            name: `${drugDbItem.name}（${drugDbItem.gen}）`,
            aliases: [primaryName, drugDbItem.gen].filter(Boolean),
            category: drugDbItem.cat || '全150疾患 臨床事典マスター連携',
            questions: [
              {
                id: 'ddb_q1',
                title: `Q1. 処方箋情報：【${primaryName}】の処方フェーズ・用法の特徴はどれですか？`,
                subtitle: '導入期・維持期・安全管理の観点からサブタイプを絞り込みます',
                options: [
                  {
                    id: 'ddb_opt1_standard',
                    label: `標準導入・急性期/初期治療レジメン（${drugDbItem.char}）`,
                    badge: '標準導入・主適応',
                    desc: drugDbItem.desc,
                    weights: { ddb_dis_standard: 95, ddb_dis_maintenance: -20, ddb_dis_safety: -20 }
                  },
                  {
                    id: 'ddb_opt1_maint',
                    label: `長期維持・再発予防・併用強化レジメン（${baseCatName}の継続コントロール）`,
                    badge: '長期維持・再発予防',
                    desc: `${primaryName}の継続投与による症状安定化と合併症・再燃防止`,
                    weights: { ddb_dis_standard: -20, ddb_dis_maintenance: 95, ddb_dis_safety: -20 }
                  },
                  {
                    id: 'ddb_opt1_safety',
                    label: `ハイリスク背景・相互作用・臓器機能（腎・肝・高齢・妊産婦）配慮レジメン`,
                    badge: '🚨安全性・減量/相互作用監査',
                    desc: `副作用モニタリング・併用禁忌/注意・用量調整を要するケース`,
                    weights: { ddb_dis_standard: -20, ddb_dis_maintenance: -20, ddb_dis_safety: 95 }
                  }
                ]
              },
              {
                id: 'ddb_q2',
                title: `Q2. 🗣️【患者確認・臨床背景】現在の症状や服薬指導上の重要確認事項はどれですか？`,
                subtitle: '患者背景から最終サブタイプを確定します',
                options: [
                  {
                    id: 'ddb_opt2_standard',
                    label: `主訴・標的症状の改善を目的として標準用量で開始・使用している`,
                    badge: '主適応・症状改善',
                    desc: drugDbItem.char,
                    weights: { ddb_dis_standard: 98, ddb_dis_maintenance: -20, ddb_dis_safety: -20 }
                  },
                  {
                    id: 'ddb_opt2_maint',
                    label: `症状は安定しており、自己中断防止と定期検査フォローを行いながら継続している`,
                    badge: '維持療法・アドヒアランス',
                    desc: `${baseCatName}の長期マネジメント`,
                    weights: { ddb_dis_standard: -20, ddb_dis_maintenance: 98, ddb_dis_safety: -20 }
                  },
                  {
                    id: 'ddb_opt2_safety',
                    label: `特有の副作用初期症状の確認や併用薬・生活上の注意点（眠気・腎機能等）の指導が重点である`,
                    badge: '🚨副作用・相互作用管理',
                    desc: drugDbItem.desc,
                    weights: { ddb_dis_standard: -20, ddb_dis_maintenance: -20, ddb_dis_safety: 98 }
                  }
                ]
              }
            ],
            diseases: [
              {
                id: 'ddb_dis_standard',
                cardNum: cNum,
                name: `${baseCatName}（標準導入・主適応レジメン）`,
                subType: `🎯 ${drugDbItem.char}`,
                baseProb: 45,
                criteria: `【処方薬】${drugDbItem.name}（${drugDbItem.gen}）標準導入`,
                reason: drugDbItem.desc,
                keyPoint: drugDbItem.char
              },
              {
                id: 'ddb_dis_maintenance',
                cardNum: cNum,
                name: `${baseCatName}（長期維持・再発予防・併用レジメン）`,
                subType: `🔄 継続維持療法・アドヒアランス管理`,
                baseProb: 35,
                criteria: `【処方薬】${drugDbItem.name}（${drugDbItem.gen}）継続処方`,
                reason: `${drugDbItem.desc}（長期維持による再燃・合併症抑制）`,
                keyPoint: `自己判断での中断を防ぎ、定期的な効果判定と併用薬バランスを確認する。`
              },
              {
                id: 'ddb_dis_safety',
                cardNum: cNum,
                name: `${baseCatName}（ハイリスク患者・副作用/相互作用重点管理）`,
                subType: `🚨 臓器機能・相互作用・有害事象モニタリング`,
                baseProb: 20,
                criteria: `【処方薬】${drugDbItem.name}（${drugDbItem.gen}）安全性重点監査`,
                reason: `${drugDbItem.desc}における特有の有害事象・相互作用リスク管理。`,
                keyPoint: `${drugDbItem.char}（体調変化時の早期受診・併用薬チェックを徹底）`
              }
            ]
          };
        }
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

// ============================================================================
// 🔍 スマートサジェスト補助エンジン（入力起点駆動・疾患名/適応外/Wave1逆引き対応）
// ============================================================================

let activeSuggestIndex = -1;
let currentSuggestions = [];

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeJsString(str) {
  if (!str) return '';
  return String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"');
}

function highlightMatchText(text, query) {
  if (!text) return '';
  const q = (query || '').trim();
  if (!q) return escapeHtml(text);

  const escapedText = escapeHtml(text);
  const toKatakana = s => s.replace(/[\u3041-\u3096]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 0x60));
  const toHiragana = s => s.replace(/[\u30a1-\u30f6]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60));
  const qK = toKatakana(q);
  const qH = toHiragana(q);
  const safePats = Array.from(new Set([q, qK, qH])).map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).filter(Boolean);
  if (safePats.length === 0) return escapedText;

  const regex = new RegExp(`(${safePats.join('|')})`, 'gi');
  return escapedText.replace(regex, '<span style="color:#059669; font-weight:800; background:#ecfdf5; padding:0 2px; border-radius:3px;">$1</span>');
}

function searchWizardDrugSuggestions(rawQuery) {
  const q = (rawQuery || '').trim().toLowerCase();
  if (!q) return [];

  const toKatakana = str => str.replace(/[\u3041-\u3096]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 0x60));
  const toHiragana = str => str.replace(/[\u30a1-\u30f6]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60));

  const qKata = toKatakana(q);
  const qHira = toHiragana(q);

  const testMatch = (target) => {
    if (!target) return false;
    const t = String(target).toLowerCase();
    return t.includes(q) || t.includes(qKata) || t.includes(qHira);
  };

  const testExactOrPrefix = (target) => {
    if (!target) return false;
    const t = String(target).toLowerCase();
    return t === q || t === qKata || t === qHira || t.startsWith(q) || t.startsWith(qKata) || t.startsWith(qHira);
  };

  const results = [];
  const seenNames = new Set();

  // 1. 構造化KB（全108薬剤・361疾患仮説）から検索
  const kb = typeof buildStructuredWizardKB === 'function' ? buildStructuredWizardKB() : null;
  if (kb && kb.drugs) {
    for (const [drugKey, drug] of Object.entries(kb.drugs)) {
      if (seenNames.has(drug.name)) continue;

      let score = 0;
      let hitDisease = '';
      const isWave1 = drug.specialtyWave === 'wave1_cardiology' || (drug.hypotheses && drug.hypotheses.some(h => h.specialtyWave === 'wave1_cardiology'));

      // ① 薬剤名・エイリアス一致
      const aliases = Array.isArray(drug.aliases) ? drug.aliases : [];
      const allNames = [drug.name, drugKey, ...aliases];

      if (allNames.some(testExactOrPrefix)) {
        score = 100;
      } else if (allNames.some(testMatch)) {
        score = 80;
      }

      // ② 鑑別対象の疾患名・病態名一致（逆引き検索）
      const hypotheses = Array.isArray(drug.hypotheses) ? drug.hypotheses : [];
      for (const hyp of hypotheses) {
        if (testExactOrPrefix(hyp.name)) {
          score = Math.max(score, 75);
          if (!hitDisease) hitDisease = hyp.name;
        } else if (testMatch(hyp.name)) {
          score = Math.max(score, 65);
          if (!hitDisease) hitDisease = hyp.name;
        } else if (testMatch(hyp.desc) || testMatch(hyp.criteria) || testMatch(hyp.reason)) {
          score = Math.max(score, 50);
          if (!hitDisease) hitDisease = hyp.name;
        }
      }

      if (score > 0) {
        // 主な鑑別疾患プレビュー（最大3件）
        const previews = hypotheses.slice(0, 3).map(h => {
          const short = h.name.replace(/（[^）]+）/g, '').replace(/【[^】]+】/g, '').trim();
          return h.type === 'offlabel' ? `${short}［適応外］` : short;
        });

        results.push({
          key: drugKey,
          name: drug.name,
          category: drug.category || '処方推論データベース',
          score: score + (isWave1 ? 8 : 0),
          isWave1,
          hitDisease,
          previews
        });
        seenNames.add(drug.name);
      }
    }
  }

  // 2. CLINICAL_WIZARD_DATA からの補完
  if (typeof CLINICAL_WIZARD_DATA !== 'undefined') {
    for (const [key, item] of Object.entries(CLINICAL_WIZARD_DATA)) {
      if (seenNames.has(item.name)) continue;
      const aliases = item.aliases || [];
      const allNames = [item.name, key, ...aliases];
      if (allNames.some(testMatch)) {
        results.push({
          key,
          name: item.name,
          category: item.category || '処方鑑別データベース',
          score: allNames.some(testExactOrPrefix) ? 75 : 60,
          isWave1: false,
          hitDisease: '',
          previews: []
        });
        seenNames.add(item.name);
      }
    }
  }

  // 3. 全150疾患 臨床事典（DRUG_DB）からも件数が少ない場合に補完
  if (typeof DRUG_DB !== 'undefined' && results.length < 8) {
    DRUG_DB.forEach(dbItem => {
      if (results.length >= 10) return;
      const matchName = testMatch(dbItem.name);
      const matchGen = testMatch(dbItem.gen);
      if (matchName || matchGen) {
        const shortName = (dbItem.name || '').split('/')[0].trim();
        if (!seenNames.has(shortName) && !seenNames.has(dbItem.name)) {
          results.push({
            key: dbItem.id || shortName,
            name: shortName,
            category: dbItem.cat || '全150疾患 臨床事典',
            score: (testExactOrPrefix(dbItem.name) || testExactOrPrefix(dbItem.gen)) ? 50 : 35,
            isWave1: false,
            hitDisease: '',
            previews: []
          });
          seenNames.add(shortName);
        }
      }
    });
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 8);
}

function renderWizardSuggestions(suggestions, query) {
  const dropdown = document.getElementById('wizardSuggestDropdown');
  if (!dropdown) return;

  currentSuggestions = suggestions || [];
  activeSuggestIndex = -1;

  if (currentSuggestions.length === 0) {
    if (query && query.trim().length > 0) {
      dropdown.style.display = 'block';
      dropdown.innerHTML = `
        <div style="padding:14px 16px; text-align:center; color:#64748b; font-size:0.85rem;">
          <div>🔍 「<strong>${escapeHtml(query)}</strong>」に一致する登録薬剤は見つかりませんでした</div>
          <div style="font-size:0.76rem; color:#94a3b8; margin-top:4px;">
            Enterキーを押すと入力された名称で鑑別推論を開始します
          </div>
        </div>
      `;
    } else {
      dropdown.style.display = 'none';
      dropdown.innerHTML = '';
    }
    return;
  }

  dropdown.style.display = 'block';
  dropdown.innerHTML = currentSuggestions.map((item, idx) => {
    const waveBadge = item.isWave1 ? `<span class="wizard-suggest-wave-badge">🫀 Wave 1 重点</span>` : '';
    const hitBadge = item.hitDisease ? `<span class="wizard-suggest-hit-disease">🎯 該当病態: ${escapeHtml(item.hitDisease)}</span>` : '';
    const previewsHtml = Array.isArray(item.previews) && item.previews.length > 0
      ? `<div class="wizard-suggest-previews"><span style="color:#94a3b8;">主な鑑別:</span> ${escapeHtml(item.previews.join(' · '))}</div>`
      : '';

    return `
      <div class="wizard-suggest-item" id="wizardSuggestItem_${idx}" data-index="${idx}" 
           onmouseenter="highlightWizardSuggestItem(${idx})" 
           onclick="selectWizardPrimaryDrug('${escapeJsString(item.name)}')">
        <div class="wizard-suggest-item-main">
          <div class="wizard-suggest-item-title">
            <span style="font-size:1rem;">💊</span>
            <strong style="color:#0f172a; font-size:0.92rem;">${highlightMatchText(item.name, query)}</strong>
            ${waveBadge}
          </div>
          <div class="wizard-suggest-item-sub">
            <span class="wizard-suggest-cat">${escapeHtml(item.category)}</span>
            ${hitBadge}
          </div>
          ${previewsHtml}
        </div>
        <div class="wizard-suggest-arrow">➔</div>
      </div>
    `;
  }).join('');
}

function updateActiveSuggestItem() {
  const items = document.querySelectorAll('.wizard-suggest-item');
  items.forEach((el, idx) => {
    if (idx === activeSuggestIndex) {
      el.classList.add('active');
      el.scrollIntoView({ block: 'nearest' });
    } else {
      el.classList.remove('active');
    }
  });
}

function highlightWizardSuggestItem(idx) {
  activeSuggestIndex = idx;
  const items = document.querySelectorAll('.wizard-suggest-item');
  items.forEach((el, i) => {
    if (i === idx) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

handleWizardDrugInput = function(query) {
  const q = (query || '').trim();
  const clearBtn = document.getElementById('wizardClearInputBtn');
  if (clearBtn) clearBtn.style.display = q ? 'flex' : 'none';

  const dropdown = document.getElementById('wizardSuggestDropdown');
  if (!dropdown) return;

  if (!q) {
    dropdown.style.display = 'none';
    dropdown.innerHTML = '';
    currentSuggestions = [];
    activeSuggestIndex = -1;
    return;
  }

  const suggestions = searchWizardDrugSuggestions(q);
  renderWizardSuggestions(suggestions, q);
};

handleWizardDrugKeydown = function(event) {
  const dropdown = document.getElementById('wizardSuggestDropdown');
  const isDropdownVisible = dropdown && dropdown.style.display !== 'none' && currentSuggestions.length > 0;

  if (event.key === 'ArrowDown') {
    if (isDropdownVisible) {
      event.preventDefault();
      activeSuggestIndex = (activeSuggestIndex + 1) % currentSuggestions.length;
      updateActiveSuggestItem();
    }
  } else if (event.key === 'ArrowUp') {
    if (isDropdownVisible) {
      event.preventDefault();
      activeSuggestIndex = (activeSuggestIndex - 1 + currentSuggestions.length) % currentSuggestions.length;
      updateActiveSuggestItem();
    }
  } else if (event.key === 'Enter') {
    event.preventDefault();
    if (isDropdownVisible && activeSuggestIndex >= 0 && currentSuggestions[activeSuggestIndex]) {
      selectWizardPrimaryDrug(currentSuggestions[activeSuggestIndex].name);
    } else if (isDropdownVisible && currentSuggestions.length > 0) {
      selectWizardPrimaryDrug(currentSuggestions[0].name);
    } else {
      const input = document.getElementById('wizardDrugInput');
      if (input && input.value.trim()) {
        selectWizardPrimaryDrug(input.value.trim());
      }
    }
  } else if (event.key === 'Escape') {
    if (dropdown) dropdown.style.display = 'none';
    activeSuggestIndex = -1;
  }
};

clearWizardDrugInput = function() {
  const input = document.getElementById('wizardDrugInput');
  if (input) {
    input.value = '';
    handleWizardDrugInput('');
    input.focus();
  }
};

function toggleWizardPasteBox() {
  const box = document.getElementById('wizardPasteAccordion');
  const icon = document.getElementById('wizardPasteToggleIcon');
  if (!box) return;
  const isHidden = box.style.display === 'none' || !box.style.display;
  box.style.display = isHidden ? 'block' : 'none';
  if (icon) {
    icon.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('click', function(e) {
    const input = document.getElementById('wizardDrugInput');
    const dropdown = document.getElementById('wizardSuggestDropdown');
    const clearBtn = document.getElementById('wizardClearInputBtn');
    if (dropdown && input && !input.contains(e.target) && !dropdown.contains(e.target) && (!clearBtn || !clearBtn.contains(e.target))) {
      dropdown.style.display = 'none';
      activeSuggestIndex = -1;
    }
  });
}

if (typeof window !== 'undefined') {
  window.renderHypothesisEvidenceBadges = renderHypothesisEvidenceBadges;
  window.setWizardAnswerConfidenceMode = setWizardAnswerConfidenceMode;
  window.loadWizardSampleNsips = loadWizardSampleNsips;
  window.getCurrentBayesianEvaluation = getCurrentBayesianEvaluation;
  window.handleWizardDrugInput = handleWizardDrugInput;
  window.handleWizardDrugKeydown = handleWizardDrugKeydown;
  window.clearWizardDrugInput = clearWizardDrugInput;
  window.toggleWizardPasteBox = toggleWizardPasteBox;
  window.searchWizardDrugSuggestions = searchWizardDrugSuggestions;
  window.highlightWizardSuggestItem = highlightWizardSuggestItem;
}
