// ============================================================================
// 22_wizard_engine.js — アキネーター型適応ベイズ推論エンジン (WizardBayesianEngine)
// 1剤入力からでも期待情報利得 IG(q)/Cost(q) 最大化により1問ずつ質問を動的選択し、
// 水増しなしの実事後確率 P(H|E)・棄却理由・Red-Flag・根拠ログを算出する
// ============================================================================

const WIZARD_FREQ_PRIOR = {
  common: 0.60,
  occasional: 0.30,
  rare: 0.10
};

const WIZARD_EVID_PRIOR = {
  A: 1.00,
  B: 0.60,
  C: 0.30
};

const WIZARD_SOFT_ANSWER_ALPHA = {
  yes: 1.00,
  prob_yes: 0.75,
  unknown: 0.50,
  prob_no: 0.25,
  no: 0.00
};

class WizardBayesianEngine {
  constructor() {
    this.MIN_LIKELIHOOD_FLOOR = 0.015; // ゼロ確率潰れ防止フロア（強い反証では0.5%未満まで下がる）
    this.RULED_OUT_THRESHOLD = 0.005;  // P(h) < 0.5% で棄却候補へ移動（削除はしない）
    this.CONFIRMED_PROB = 0.85;        // 確定閾値 P(h_1) >= 85%
    this.CONFIRMED_RATIO = 4.0;        // かつ P(h_1)/P(h_2) >= 4.0
    this.MIN_IG_THRESHOLD = 0.03;      // 残存最大情報利得 < 0.03 bit で質問打ち切り
    this.MAX_QUESTIONS = 15;           // 最大質問数キャップ
  }

  /**
   * 薬剤エントリの全仮説について初期事前確率 P_0(h) を計算する
   * P_0(h) ∝ w_freq(h) * w_evid(h) * (baseProb補正)
   */
  computeInitialPriors(entry) {
    const diseases = (entry && entry.diseases) ? entry.diseases : {};
    const ids = Object.keys(diseases);
    if (ids.length === 0) return {};

    const raw = {};
    let sum = 0;
    for (const id of ids) {
      const d = diseases[id];
      const freqW = WIZARD_FREQ_PRIOR[d.frequencyTier || d.frequency] || 0.30;
      const evidW = WIZARD_EVID_PRIOR[d.evidenceLevel || d.evidence] || 0.60;
      const baseFactor = Math.max(8, Number(d.baseProb || 30)) / 40.0;
      const w = freqW * evidW * baseFactor;
      raw[id] = w;
      sum += w;
    }

    const priors = {};
    for (const id of ids) {
      priors[id] = sum > 0 ? (raw[id] / sum) : (1.0 / ids.length);
    }
    return priors;
  }

  /**
   * 質問 q の選択肢 opt が選ばれたときの、仮説 h に対する尤度 P(opt | h) を算出する
   */
  getOptionLikelihood(question, option, hypothesisId, entry) {
    if (!option) return 0.28;
    const weights = option.weights || {};
    const hasExplicitWeight = Object.prototype.hasOwnProperty.call(weights, hypothesisId);
    const allWeightedIds = Object.keys(weights);

    // どの仮説にも重みがない選択肢（「不明・確認できない」等）は完全中立
    if (allWeightedIds.length === 0) {
      return 0.50;
    }

    if (hasExplicitWeight) {
      const w = Number(weights[hypothesisId]);
      if (w >= 98) return 0.98;
      if (w >= 92) return 0.95;
      if (w >= 82) return 0.88;
      if (w >= 70) return 0.80;
      if (w >= 50) return 0.66;
      if (w >= 25) return 0.48;
      if (w > 0)   return 0.32;
      if (w === 0) return 0.18;
      // 負の重み（強い反証）
      if (w <= -55) return 0.015;
      if (w <= -30) return 0.04;
      return 0.08;
    }

    // この質問内の他の選択肢がその仮説に高い重みを持っている場合、
    // 別の排他的選択肢を選んだことは反証となる
    let maxWeightInOtherOptions = 0;
    if (question && Array.isArray(question.options)) {
      for (const otherOpt of question.options) {
        if (otherOpt.id === option.id) continue;
        const ow = (otherOpt.weights && otherOpt.weights[hypothesisId]) || 0;
        if (ow > maxWeightInOtherOptions) maxWeightInOtherOptions = ow;
      }
    }

    if (maxWeightInOtherOptions >= 80) {
      return 0.06; // 他の選択肢が典型所見である質問で別選択肢を選んだ場合は強く減衰
    }
    if (maxWeightInOtherOptions >= 50) {
      return 0.14;
    }
    return 0.25;
  }

  /**
   * 共通質問（診療科・日数・変更有無・年齢性別）に対する各仮説の適合尤度 P(opt | h)
   */
  getSharedQuestionLikelihood(sharedQuestion, option, hypothesisId, entry) {
    if (!option || option.value === 'unknown') return 0.50;
    const d = (entry && entry.diseases && entry.diseases[hypothesisId]) || {};
    const feature = sharedQuestion.feature || (sharedQuestion.id || '').replace('shared_q_', '');
    const val = option.value;

    // 1. 構造化KBの sharedLikelihoods マッピングがある場合は最優先で使用
    if (d.sharedLikelihoods && d.sharedLikelihoods[feature]) {
      const fMap = d.sharedLikelihoods[feature];
      const label = fMap[val];
      if (label === 'typical') return 0.94;
      if (label === 'often')   return 0.76;
      if (label === 'neutral') return 0.45;
      if (label === 'rare')    return 0.12;
      if (label === 'contra')  return 0.02;

      // 他の選択肢に typical が定義されているのに、指定されていない別領域（例：循環器疾患なのに皮膚科や消化器科）が選ばれた場合
      const hasTypicalElsewhere = Object.values(fMap).some(v => v === 'typical');
      if (hasTypicalElsewhere) {
        return 0.10;
      }
    }

    // 2. フォールバック：テキストキーワードによる尤度推定
    const textPool = [
      d.name || '',
      d.subType || '',
      d.criteria || '',
      d.reason || '',
      d.keyPoint || ''
    ].join(' ');

    if (feature === 'dept') {
      const deptKeywords = {
        cardio: /心不全|不整脈|心房細動|狭心症|心筋梗塞|冠動脈|血圧|循環器|大動脈|マルファン|頻脈|徐脈|HFrEF|HFpEF/,
        gi: /胃|十二指腸|逆流性食道炎|GERD|潰瘍|ピロリ|便秘|下痢|腸|胆|肝|膵|PBC|腹水|消化器/,
        dm: /糖尿病|甲状腺|バセドウ|橋本病|脂質|コレステロール|中性脂肪|アルドステロン|内分泌|痛風|高尿酸|骨粗鬆/,
        renal: /腎|CKD|透析|ネフローゼ|蛋白尿|アルブミン尿/,
        neuro: /脳梗塞|TIA|てんかん|片頭痛|パーキンソン|認知症|神経|振戦|重症筋無力症/,
        psych: /うつ|不眠|不安|双極|統合失調|精神|心療|ADHD/,
        uro_derm: /皮膚|湿疹|アトピー|蕁麻疹|ざ瘡|ニキビ|乾癬|帯状疱疹|ヘルペス|白癬|脱毛|多毛|前立腺|排尿|過活動膀胱|泌尿器|膀胱炎|黄色腫|そう痒/,
        ent_dent: /耳鼻|副鼻腔|中耳炎|めまい|味覚|口内炎|歯科|抜歯|口腔|唾液/,
        resp: /喘息|COPD|肺炎|気管支|咳|呼吸器|MAC症/,
        ortho: /変形性|腰痛|坐骨神経|整形|骨粗鬆|痛風/,
        rheuma: /関節リウマチ|リウマチ|膠原病|SLE|PMR|多発筋痛症|強皮症|レイノー|血管炎|シェーグレン/,
        eye: /眼|緑内障|白内障|結膜炎|網膜|ドライアイ|夜盲/,
        hema: /血小板|貧血|多血症|白血病|肉腫|腫瘍|血液/
      };
      const regex = deptKeywords[val];
      if (!regex) return 0.45;
      if (regex.test(textPool)) return 0.85;
      return 0.16;
    }

    if (feature === 'days') {
      const isAcute = /急性|発作|短期|除菌|感染症|帯状疱疹|ヘルペス|カンジダ|感冒|頓服|術後|周術期/.test(textPool);
      const isChronic = /慢性|維持|長期|予防|高血圧|心不全|糖尿病|脂質異常|CKD|橋本病|緑内障|PBC/.test(textPool);
      if (val === 'short7' || val === 'as_needed') {
        if (isAcute) return 0.82;
        if (isChronic && !isAcute) return 0.20;
        return 0.45;
      }
      if (val === 'long28') {
        if (isChronic) return 0.80;
        if (isAcute && !isChronic) return 0.18;
        return 0.50;
      }
      return 0.50;
    }

    if (feature === 'sex_age') {
      const isFemaleSpecific = /女性|妊婦|妊娠|授乳|月経|更年期|子宮|卵巣|成人女性|PCOS|ざ瘡|多毛|レイノー|PBC/.test(textPool);
      const isElderly = /高齢|認知症|前立腺肥大|フレイル|誤嚥|収縮期単独高血圧|HFpEF/.test(textPool);
      if (val === 'female_repro') {
        if (isFemaleSpecific) return 0.90;
        if (isElderly || /前立腺/.test(textPool)) return 0.06;
        return 0.42;
      }
      if (val === 'female_senior') {
        if (/PBC|骨粗鬆|HFpEF|PMR|更年期/.test(textPool)) return 0.85;
        if (/前立腺/.test(textPool)) return 0.02;
        return 0.50;
      }
      if (val === 'male_senior') {
        if (isElderly) return 0.78;
        if (/妊娠|月経|PCOS|成人女性|子宮/.test(textPool)) return 0.03;
        return 0.50;
      }
      return 0.50;
    }

    return 0.50;
  }

  /**
   * 薬剤固有質問＋共通質問の統合リストを返す
   */
  getAllCandidateQuestions(entry) {
    const drugQs = (entry && Array.isArray(entry.questions)) ? entry.questions.map(q => ({
      ...q,
      isShared: false,
      cost: q.cost || 1.0
    })) : [];

    const sharedQs = (typeof WIZARD_SHARED_QUESTIONS !== 'undefined' && Array.isArray(WIZARD_SHARED_QUESTIONS))
      ? WIZARD_SHARED_QUESTIONS.map(q => ({
          ...q,
          text: q.title || q.text || '',
          isShared: true,
          cost: q.cost || 1.0
        }))
      : [];

    return [...drugQs, ...sharedQs];
  }

  /**
   * 現在の全回答・併用薬シグネチャから事後確率分布・根拠・棄却候補・Red-Flagを一括計算する
   */
  evaluateState(entry, answers = [], context = {}) {
    if (!entry || !entry.diseases) {
      return {
        posteriors: {},
        ranked: [],
        activeCandidates: [],
        ruledOutCandidates: [],
        activeRedFlags: [],
        entropy: 0,
        maxEntropy: 0,
        stoppingStatus: { stop: true, reason: 'no_data', label: 'データなし' },
        matchedSignatures: []
      };
    }

    const diseases = entry.diseases;
    const hypIds = Object.keys(diseases);
    const nHyp = hypIds.length;
    const priors = this.computeInitialPriors(entry);
    const allQuestions = this.getAllCandidateQuestions(entry);
    const qMap = {};
    for (const q of allQuestions) qMap[q.id] = q;

    const logScores = {};
    const supportingByHyp = {};
    const opposingByHyp = {};
    const worstPenaltyByHyp = {};
    const cumulativeLR = {};

    for (const id of hypIds) {
      logScores[id] = Math.log(Math.max(1e-6, priors[id]));
      supportingByHyp[id] = [];
      opposingByHyp[id] = [];
      worstPenaltyByHyp[id] = null;
      cumulativeLR[id] = 1.0;
    }

    // 1. 併用薬シグネチャ（Co-Prescription Signatures）の適用
    const matchedSignatures = [];
    const coDrugList = [
      entry.name || '',
      ...(Array.isArray(context.coDrugs) ? context.coDrugs : [])
    ].filter(Boolean);

    if (coDrugList.length >= 2 && typeof matchComboSignatures === 'function') {
      const sigs = matchComboSignatures(coDrugList);
      for (const sig of sigs) {
        matchedSignatures.push(sig);
        const boosts = sig.boostHypotheses || sig.boostDiseases || {};
        const dampens = sig.dampenHypotheses || {};
        for (const id of hypIds) {
          if (boosts[id]) {
            const lr = Number(boosts[id]);
            logScores[id] += Math.log(lr);
            cumulativeLR[id] *= lr;
            supportingByHyp[id].push({
              type: 'combo_signature',
              label: `🔗 ${sig.name || sig.label}`,
              detail: sig.clinicalNote || sig.clinicalMeaning,
              logOdds: Math.round(Math.log2(lr) * 100) / 100
            });
          }
          if (dampens[id]) {
            const lr = Number(dampens[id]);
            logScores[id] += Math.log(lr);
            cumulativeLR[id] *= lr;
          }
        }
      }
    }

    // 2. 各回答のベイズ更新
    for (const ans of answers) {
      const q = qMap[ans.questionId];
      if (!q) continue;
      const opt = (q.options || []).find(o => o.id === ans.optionId);
      if (!opt) continue;

      const confKey = ans.confidence || 'yes';
      const alpha = WIZARD_SOFT_ANSWER_ALPHA[confKey] !== undefined ? WIZARD_SOFT_ANSWER_ALPHA[confKey] : 1.0;
      if (confKey === 'unknown' || opt.value === 'unknown' || /不明|わからない|確認できない/.test(opt.label || '')) {
        continue;
      }

      const likelihoods = {};
      let meanLikelihood = 0;
      for (const id of hypIds) {
        const rawL = q.isShared
          ? this.getSharedQuestionLikelihood(q, opt, id, entry)
          : this.getOptionLikelihood(q, opt, id, entry);
        const effL = Math.max(this.MIN_LIKELIHOOD_FLOOR, (alpha * rawL) + ((1 - alpha) * 0.50));
        likelihoods[id] = effL;
        meanLikelihood += effL;
      }
      meanLikelihood = meanLikelihood / Math.max(1, nHyp);

      for (const id of hypIds) {
        const effL = likelihoods[id];
        logScores[id] += Math.log(effL);
        const lr = effL / Math.max(0.05, meanLikelihood);
        cumulativeLR[id] *= lr;
        const bits = Math.round(Math.log2(lr) * 100) / 100;

        if (bits >= 0.30) {
          supportingByHyp[id].push({
            type: ans.auto ? 'auto_answer' : 'user_answer',
            questionId: q.id,
            questionText: q.text || q.title,
            optionLabel: opt.label,
            logOdds: bits
          });
        } else if (bits <= -0.40) {
          const penaltyItem = {
            type: ans.auto ? 'auto_answer' : 'user_answer',
            questionId: q.id,
            questionText: q.text || q.title,
            optionLabel: opt.label,
            logOdds: bits
          };
          opposingByHyp[id].push(penaltyItem);
          if (!worstPenaltyByHyp[id] || bits < worstPenaltyByHyp[id].logOdds) {
            worstPenaltyByHyp[id] = penaltyItem;
          }
        }
      }
    }

    // 3. Log-Sum-Exp で事後確率 P(h | E) に正規化（水増しゼロ）
    let maxLog = -Infinity;
    for (const id of hypIds) {
      if (logScores[id] > maxLog) maxLog = logScores[id];
    }

    let sumExp = 0;
    const unnorm = {};
    for (const id of hypIds) {
      const v = Math.exp(logScores[id] - maxLog);
      unnorm[id] = v;
      sumExp += v;
    }

    const posteriors = {};
    let entropy = 0;
    for (const id of hypIds) {
      const p = sumExp > 0 ? (unnorm[id] / sumExp) : (1.0 / Math.max(1, nHyp));
      posteriors[id] = p;
      if (p > 1e-9) {
        entropy -= p * Math.log2(p);
      }
    }
    const maxEntropy = nHyp > 1 ? Math.log2(nHyp) : 1.0;

    // 4. ランキング構築＆棄却候補（P < 0.005）の分離（削除はせず理由付きで保持）
    const ranked = hypIds.map(id => {
      const d = diseases[id];
      const p = posteriors[id];
      const pct = Math.round(p * 1000) / 10;
      const isRuledOut = answers.length > 0 && p < this.RULED_OUT_THRESHOLD;
      return {
        id,
        ...d,
        prior: priors[id],
        posterior: p,
        prob: Math.round(p * 100),
        probExact: pct,
        ruledOut: isRuledOut,
        ruledOutReason: isRuledOut && worstPenaltyByHyp[id]
          ? `「${worstPenaltyByHyp[id].optionLabel}」により可能性低下`
          : (isRuledOut ? '他候補との相対尤度差により可能性低下（0.5%未満）' : null),
        supportingReasons: supportingByHyp[id].sort((a, b) => b.logOdds - a.logOdds),
        opposingReasons: opposingByHyp[id].sort((a, b) => a.logOdds - b.logOdds),
        cumulativeLR: cumulativeLR[id]
      };
    }).sort((a, b) => b.posterior - a.posterior);

    const activeCandidates = ranked.filter(r => !r.ruledOut);
    const ruledOutCandidates = ranked.filter(r => r.ruledOut);

    // 5. Red-Flag 監視（P(h) >= 0.10 の Red-Flag 仮説があれば常時警告）
    const activeRedFlags = ranked.filter(r => r.redFlag && r.posterior >= 0.10);

    // 6. 次の最適質問と残存最大情報利得を計算
    const nextQInfo = this.selectNextOptimalQuestion(entry, posteriors, answers);

    // 7. 停止判定（Stopping Criteria）
    const stoppingStatus = this.checkStoppingCriteria(ranked, answers, nextQInfo, allQuestions.length);

    return {
      posteriors,
      ranked,
      activeCandidates: activeCandidates.length > 0 ? activeCandidates : ranked.slice(0, 1),
      ruledOutCandidates,
      activeRedFlags,
      entropy: Math.round(entropy * 100) / 100,
      maxEntropy: Math.round(maxEntropy * 100) / 100,
      nextQuestion: nextQInfo.question,
      nextQuestionIG: nextQInfo.expectedIG,
      nextQuestionReason: nextQInfo.reasonText,
      questionRanking: nextQInfo.ranking,
      stoppingStatus,
      matchedSignatures
    };
  }

  /**
   * 未回答の質問の中から Expected Information Gain / Cost が最大の質問を1つ選択する
   */
  selectNextOptimalQuestion(entry, currentPosteriors, answers = []) {
    const answeredIds = new Set(answers.map(a => a.questionId));
    const allQuestions = this.getAllCandidateQuestions(entry);
    const unanswered = allQuestions.filter(q => !answeredIds.has(q.id));

    if (unanswered.length === 0) {
      return { question: null, expectedIG: 0, reasonText: '全質問完了', ranking: [] };
    }

    const hypIds = Object.keys(currentPosteriors);
    let currentEntropy = 0;
    for (const id of hypIds) {
      const p = currentPosteriors[id];
      if (p > 1e-9) currentEntropy -= p * Math.log2(p);
    }

    const sortedHyps = hypIds
      .map(id => ({ id, p: currentPosteriors[id], name: (entry.diseases[id] && entry.diseases[id].name) || id }))
      .sort((a, b) => b.p - a.p);
    const top1 = sortedHyps[0];
    const top2 = sortedHyps[1];

    const ranking = [];

    for (const q of unanswered) {
      const opts = q.options || [];
      if (opts.length === 0) continue;

      const optLikelihoodByHyp = {};
      for (const id of hypIds) {
        let sumL = 0;
        optLikelihoodByHyp[id] = {};
        for (const opt of opts) {
          const l = q.isShared
            ? this.getSharedQuestionLikelihood(q, opt, id, entry)
            : this.getOptionLikelihood(q, opt, id, entry);
          optLikelihoodByHyp[id][opt.id] = l;
          sumL += l;
        }
        for (const opt of opts) {
          optLikelihoodByHyp[id][opt.id] = sumL > 0 ? (optLikelihoodByHyp[id][opt.id] / sumL) : (1.0 / opts.length);
        }
      }

      let expectedPosteriorEntropy = 0;
      for (const opt of opts) {
        let pOpt = 0;
        for (const id of hypIds) {
          pOpt += currentPosteriors[id] * optLikelihoodByHyp[id][opt.id];
        }
        if (pOpt <= 1e-9) continue;

        let hGivenOpt = 0;
        for (const id of hypIds) {
          const pHypGivenOpt = (currentPosteriors[id] * optLikelihoodByHyp[id][opt.id]) / pOpt;
          if (pHypGivenOpt > 1e-9) {
            hGivenOpt -= pHypGivenOpt * Math.log2(pHypGivenOpt);
          }
        }
        expectedPosteriorEntropy += pOpt * hGivenOpt;
      }

      const ig = Math.max(0, currentEntropy - expectedPosteriorEntropy);
      const specificityBonus = q.isShared ? 0.70 : 1.35;
      const cost = Math.max(0.3, Number(q.cost || 1.0));
      const utility = (ig * specificityBonus) / cost;

      let reasonText = '上位候補の鑑別精度を最大化するため';
      if (top1 && top2) {
        const short1 = top1.name.split(/[（(：:]/)[0];
        const short2 = top2.name.split(/[（(：:]/)[0];
        reasonText = `「${short1}」と「${short2}」を最も効率よく鑑別するため（期待情報利得 ${ig.toFixed(2)} bit）`;
      }

      ranking.push({
        question: q,
        expectedIG: Math.round(ig * 1000) / 1000,
        utility: Math.round(utility * 1000) / 1000,
        reasonText
      });
    }

    ranking.sort((a, b) => b.utility - a.utility);
    const best = ranking[0] || { question: null, expectedIG: 0, reasonText: '', ranking: [] };
    return {
      question: best.question,
      expectedIG: best.expectedIG,
      reasonText: best.reasonText,
      ranking
    };
  }

  /**
   * 終了条件（確定・収束・上限・矛盾）を判定する
   */
  checkStoppingCriteria(ranked, answers, nextQInfo, totalQuestionsCount) {
    const p1 = ranked[0] ? ranked[0].posterior : 0;
    const p2 = ranked[1] ? ranked[1].posterior : 0;
    const ratio = p2 > 1e-6 ? (p1 / p2) : 99.0;
    const answeredCount = answers.length;

    const maxLR = ranked.reduce((acc, r) => Math.max(acc, r.cumulativeLR || 1), 0);
    if (answeredCount >= 2 && maxLR < 0.15) {
      return {
        stop: false,
        reason: 'conflict',
        label: '⚠️ 回答間に臨床的な矛盾の可能性があります（直前の回答を見直すか、複合病態をご検討ください）'
      };
    }

    // 1. 高確信度確定（最低2問以上回答して残存IGが小さい、または3問以上回答して P1 >= 0.85 & P1/P2 >= 4.0、または P1 >= 0.96）
    // また、薬剤固有質問をすべて回答済み（次の質問が共通質問 isShared のみ）で P1 >= 0.58 & P1/P2 >= 2.2 の場合も確定とする
    const remainingIG = (nextQInfo && typeof nextQInfo.expectedIG === 'number') ? nextQInfo.expectedIG : 0;
    const onlySharedRemaining = Boolean(nextQInfo && nextQInfo.question && nextQInfo.question.isShared);
    if (
      (answeredCount >= 3 && p1 >= this.CONFIRMED_PROB && ratio >= this.CONFIRMED_RATIO) ||
      (answeredCount >= 2 && p1 >= this.CONFIRMED_PROB && ratio >= this.CONFIRMED_RATIO && remainingIG < 0.15) ||
      (answeredCount >= 2 && onlySharedRemaining && p1 >= 0.58 && ratio >= 2.2) ||
      (answeredCount >= 2 && p1 >= 0.95)
    ) {
      return {
        stop: true,
        reason: 'confirmed',
        label: `🎯 特定完了（事後確率 ${Math.round(p1 * 100)}% / 第2候補の ${ratio.toFixed(1)} 倍）`
      };
    }

    if (answeredCount >= this.MAX_QUESTIONS || !nextQInfo || !nextQInfo.question) {
      return {
        stop: true,
        reason: 'max_questions',
        label: p1 >= 0.55
          ? `✅ 推論完了（最有力候補 ${Math.round(p1 * 100)}%）`
          : `⚠️ 情報不足（最有力でも ${Math.round(p1 * 100)}%：上位候補を併記して服薬指導を行ってください）`
      };
    }

    if (answeredCount >= 2 && nextQInfo.expectedIG < this.MIN_IG_THRESHOLD) {
      return {
        stop: true,
        reason: 'converged',
        label: p1 >= 0.55
          ? `✅ 推論収束（これ以上の質問による識別利得が小さいため完了：${Math.round(p1 * 100)}%）`
          : `⚠️ 情報不足で収束（処方情報のみでは複数候補が拮抗：${Math.round(p1 * 100)}%）`
      };
    }

    return {
      stop: false,
      reason: 'continue',
      label: `🔍 鑑別継続中（現在 ${answeredCount} 問回答 / 最有力 ${Math.round(p1 * 100)}%）`
    };
  }
}

const wizardBayesianEngine = new WizardBayesianEngine();

if (typeof window !== 'undefined') {
  window.WizardBayesianEngine = WizardBayesianEngine;
  window.wizardBayesianEngine = wizardBayesianEngine;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    WizardBayesianEngine,
    wizardBayesianEngine,
    WIZARD_FREQ_PRIOR,
    WIZARD_EVID_PRIOR,
    WIZARD_SOFT_ANSWER_ALPHA
  };
}
