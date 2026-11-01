// ============================================================================
// 23_wizard_adapters.js — NSIPS実テストデータ適応パーサ・JAHIS QR・自動回答抽出器
// 仕様書がなくても薬局レセコンから出力した実テストデータ（CSV/カンマ区切り）の
// レコード構造をヒューリスティック推定＋カスタムマッピングで解析し、
// 質問数を最小化する自動回答（🤖自動）を生成する（完全ローカル処理・外部送信ゼロ）
// ============================================================================

const WIZARD_DEPT_KEYWORD_MAP = [
  { code: 'cardio',   label: '循環器内科・心臓血管外科', regex: /循環器|心臓|血管|不整脈|血圧/ },
  { code: 'gi',       label: '消化器内科・肝臓内科・胃腸科', regex: /消化器|胃腸|肝臓|肝胆膵|胆|膵|内視鏡|肛門/ },
  { code: 'dm',       label: '糖尿病・代謝・内分泌内科', regex: /糖尿病|内分泌|代謝|甲状腺/ },
  { code: 'renal',    label: '腎臓内科・人工透析科', regex: /腎臓|透析/ },
  { code: 'uro_derm', label: '泌尿器科・皮膚科・形成外科', regex: /皮膚|形成|美容|泌尿器|前立腺/ },
  { code: 'neuro',    label: '脳神経内科・脳神経外科', regex: /脳神経|神経内科|脳外/ },
  { code: 'psych',    label: '心療内科・精神科', regex: /精神|心療|メンタル/ },
  { code: 'resp',     label: '呼吸器内科・アレルギー科', regex: /呼吸器|気管支|喘息|アレルギー/ },
  { code: 'ent_dent', label: '耳鼻咽喉科・歯科口腔外科', regex: /耳鼻|咽喉|歯科|口腔/ },
  { code: 'rheuma',   label: 'リウマチ・膠原病内科', regex: /リウマチ|膠原病/ },
  { code: 'ortho',    label: '整形外科・ペインクリニック', regex: /整形|ペイン|リハビリ/ },
  { code: 'eye',      label: '眼科', regex: /眼科/ },
  { code: 'hema',     label: '血液内科・腫瘍内科', regex: /血液|腫瘍/ }
];

/**
 * 診療科文字列を正規化コード ('cardio', 'gi', etc.) に変換する
 */
function classifyMedicalDepartment(rawDept) {
  if (!rawDept) return null;
  const s = String(rawDept).trim();
  for (const item of WIZARD_DEPT_KEYWORD_MAP) {
    if (item.regex.test(s)) return item.code;
  }
  return null;
}

/**
 * 生年月日文字列 (YYYYMMDD / YYYY-MM-DD / 和暦) から年齢を概算する
 */
function estimateAgeFromString(rawDob, referenceYear = new Date().getFullYear()) {
  if (!rawDob) return null;
  const s = String(rawDob).trim();
  const mIso = s.match(/^(19\d{2}|20\d{2})[-/]?(\d{2})[-/]?(\d{2})$/);
  if (mIso) {
    const birthYear = parseInt(mIso[1], 10);
    const age = referenceYear - birthYear;
    if (age >= 0 && age <= 120) return age;
  }
  const mEra = s.match(/^(?:(S|昭和|3)|(H|平成|4)|(R|令和|5))[\s./-]*(\d{1,2})/i);
  if (mEra) {
    const yr = parseInt(mEra[4], 10);
    let west = null;
    if (mEra[1]) west = 1925 + yr;
    else if (mEra[2]) west = 1988 + yr;
    else if (mEra[3]) west = 2018 + yr;
    if (west) {
      const age = referenceYear - west;
      if (age >= 0 && age <= 120) return age;
    }
  }
  return null;
}

/**
 * NSIPS / JAHIS 共通のヒューリスティック・テストデータ適応パーサ
 */
function parsePrescriptionText(rawText, customMapping = null) {
  const text = String(rawText || '').trim();
  if (!text) {
    return {
      format: 'EMPTY',
      patient: { age: null, sex: null, ageSexCategory: null },
      department: { raw: null, code: null },
      drugs: [],
      maxDays: null,
      isPrnOnly: false,
      rawRecords: [],
      diagnostics: ['入力データが空です']
    };
  }

  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const isJahis = /^JAHIS/i.test(lines[0]);
  const format = isJahis ? 'JAHIS_QR' : 'NSIPS_OR_CSV';

  let detectedSex = null; // 'M' | 'F'
  let detectedAge = null;
  let detectedDeptRaw = null;
  let detectedDeptCode = null;
  const drugs = [];
  const rpDaysMap = {};
  let currentRpNum = '1';
  let currentRpDays = null;
  let currentRpIsPrn = false;
  let currentRpDailyFreq = 1;
  const rawRecords = [];
  const diagnostics = [];

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];
    const cols = line.split(',').map(c => c.replace(/^["']|["']$/g, '').trim());
    const recType = cols[0] || '';

    rawRecords.push({ lineNumber: lineIdx + 1, recType, colCount: cols.length, preview: cols.slice(0, 6) });

    // 1. 診療科の検出
    for (const col of cols) {
      if (!detectedDeptCode && /(内科|外科|皮膚科|眼科|耳鼻|泌尿器|精神科|心療内科|整形|小児科|産婦人科|歯科|リウマチ|循環器|消化器|呼吸器|肝胆膵)/.test(col)) {
        detectedDeptRaw = col;
        detectedDeptCode = classifyMedicalDepartment(col);
      }
    }

    // 2. 患者属性（性別・生年月日）の検出（ヘッダ行 NSIPS / JAHIS の処方日 2026xxxx は除外）
    if ((recType === '1' || recType === '11' || recType === '12') && !/^(?:NSIPS|JAHIS)$/i.test(recType)) {
      for (const col of cols) {
        if (detectedAge === null) {
          const maybeAge = estimateAgeFromString(col);
          if (maybeAge !== null) detectedAge = maybeAge;
        }
        if (!detectedSex) {
          if (col === '男' || col === '男性' || col === 'M' || col === 'Male') detectedSex = 'M';
          else if (col === '女' || col === '女性' || col === 'F' || col === 'Female') detectedSex = 'F';
        }
      }
      if (!detectedSex) {
        for (let i = 1; i < cols.length; i++) {
          if (/^(19\d{6}|20\d{6})$/.test(cols[i])) {
            const prev = cols[i - 1];
            const next = cols[i + 1];
            if (prev === '1' || next === '1') detectedSex = 'M';
            else if (prev === '2' || next === '2') detectedSex = 'F';
          }
        }
      }
    }

    // 3. 用法・RPレコード（NSIPS "3" または JAHIS "201"）
    if (recType === '3' || recType === '201' || cols.some(c => /毎食|朝食|夕食|就寝前|頓服|日分/.test(c))) {
      if (cols[1] && /^\d{1,2}$/.test(cols[1])) {
        currentRpNum = cols[1];
      }
      const joined = cols.join(' ');
      if (/頓服|疼痛時|不眠時|発作時|発熱時|頓用/.test(joined)) {
        currentRpIsPrn = true;
      } else if (/毎食|朝食|夕食|昼食|起床時|就寝前|1日\d回/.test(joined)) {
        currentRpIsPrn = false;
      }

      const mFreq = joined.match(/1日(\d)回/);
      if (mFreq) {
        currentRpDailyFreq = parseInt(mFreq[1], 10);
      } else if (/毎食/.test(joined)) {
        currentRpDailyFreq = 3;
      } else if (/朝夕食/.test(joined)) {
        currentRpDailyFreq = 2;
      } else {
        currentRpDailyFreq = 1;
      }

      const mDayText = joined.match(/(\d{1,3})\s*(?:日分|回分)/);
      if (mDayText) {
        currentRpDays = parseInt(mDayText[1], 10);
        rpDaysMap[currentRpNum] = currentRpDays;
      } else if (recType === '3') {
        for (let i = 2; i < cols.length; i++) {
          if (/^\d{1,3}$/.test(cols[i])) {
            const dVal = parseInt(cols[i], 10);
            if (dVal >= 1 && dVal <= 180) {
              currentRpDays = dVal;
              rpDaysMap[currentRpNum] = dVal;
              break;
            }
          }
        }
      }
    }

    // 4. 薬品レコード（NSIPS "4" / JAHIS "301"）
    const hasYjCode = cols.find(c => /^[0-9]{9}[0-9A-Z]{3}$/i.test(c));
    const hasReceiptCode = cols.find(c => /^6[0-9]{8}$/.test(c));
    const drugNameCandidate = cols.find(c =>
      /(?:錠|カプセル|散|細粒|顆粒|OD錠|内用液|シロップ|ドライシロップ|テープ|パップ|軟膏|クリーム|ローション|ゲル|点眼|点鼻|吸入|注|ペン|パッチ|[0-9]+(?:\.[0-9]+)?\s*(?:mg|μg|mcg|g|mL|単位))/i.test(c) &&
      !/毎食|朝食|夕食|就寝前|日分/.test(c)
    );

    if (recType === '4' || recType === '301' || drugNameCandidate || hasYjCode) {
      const rpNo = (cols[1] && /^\d{1,2}$/.test(cols[1])) ? cols[1] : currentRpNum;
      const rawName = (customMapping && customMapping.drugNameCol !== undefined && cols[customMapping.drugNameCol])
        ? cols[customMapping.drugNameCol]
        : (drugNameCandidate || cols.find((c, idx) => idx >= 2 && c.length >= 3 && !/^[0-9.]+$/.test(c)) || '');

      if (rawName) {
        let doseAmount = null;
        let doseUnit = null;
        for (let i = 2; i < cols.length; i++) {
          if (/^\d+(?:\.\d+)?$/.test(cols[i])) {
            const num = parseFloat(cols[i]);
            const nextCol = cols[i + 1] || '';
            if (/^(錠|カプセル|包|g|mg|mL|ブリスター|シート|枚|滴|吸入)$/.test(nextCol)) {
              doseAmount = num;
              doseUnit = nextCol;
              break;
            }
            if (doseAmount === null && num > 0 && num <= 2000) {
              doseAmount = num;
            }
          }
        }

        let estimatedDailyMg = null;
        const mStrength = rawName.match(/(\d+(?:\.\d+)?)\s*mg/i);
        if (mStrength && doseAmount !== null) {
          const strengthMg = parseFloat(mStrength[1]);
          estimatedDailyMg = Math.round(strengthMg * doseAmount * 100) / 100;
        }

        const cleanName = rawName
          .replace(/[0-9０-９.．]+\s*(?:mg|μg|mcg|g|mL|%|単位).*$/i, '')
          .replace(/(?:SR錠|CR錠|OD錠|錠|カプセル|細粒|散|顆粒|内用液|テープ|軟膏|クリーム|点眼液).*$/i, '')
          .replace(/A$/i, '') // アルダクトンA ➔ アルダクトン
          .trim() || rawName;

        drugs.push({
          rpNo,
          rawName,
          cleanName,
          yjCode: hasYjCode || null,
          receiptCode: hasReceiptCode || null,
          doseAmount,
          doseUnit,
          estimatedDailyMg,
          days: rpDaysMap[rpNo] || currentRpDays || null,
          isPrn: currentRpIsPrn
        });
      }
    }
  }

  // 年齢・性別区分の判定（21_wizard_questions.js の value 仕様に完全準拠）
  let ageSexCategory = null;
  if (detectedSex === 'F') {
    if (detectedAge !== null && detectedAge >= 50) ageSexCategory = 'female_senior';
    else ageSexCategory = 'female_repro';
  } else if (detectedSex === 'M') {
    if (detectedAge !== null && detectedAge >= 60) ageSexCategory = 'male_senior';
    else ageSexCategory = 'male_adult';
  } else if (detectedAge !== null) {
    if (detectedAge >= 60) ageSexCategory = 'male_senior';
    else ageSexCategory = 'male_adult';
  }

  const dayValues = drugs.map(d => d.days).filter(v => typeof v === 'number' && v > 0);
  const maxDays = dayValues.length > 0 ? Math.max(...dayValues) : currentRpDays;
  const isPrnOnly = drugs.length > 0 && drugs.every(d => d.isPrn);

  diagnostics.push(`検出フォーマット: ${format} (${lines.length}行)`);
  diagnostics.push(`検出薬剤数: ${drugs.length}剤`);
  if (detectedDeptRaw) diagnostics.push(`検出診療科: ${detectedDeptRaw} → ${detectedDeptCode || '未分類'}`);
  if (detectedAge !== null || detectedSex) diagnostics.push(`検出患者属性: ${detectedAge !== null ? detectedAge + '歳' : '年齢不明'} / ${detectedSex || '性別不明'}`);
  if (maxDays) diagnostics.push(`検出処方日数: 最長 ${maxDays}日分`);

  return {
    format,
    patient: {
      age: detectedAge,
      sex: detectedSex,
      ageSexCategory
    },
    department: {
      raw: detectedDeptRaw,
      code: detectedDeptCode
    },
    drugs,
    maxDays,
    isPrnOnly,
    rawRecords,
    diagnostics
  };
}

/**
 * 解析済み処方データ (NormalizedPrescription) と現在の対象薬剤エントリから、
 * 自動回答できる質問（共通質問＋薬剤固有の用量・併用薬質問）を抽出する
 */
function extractAutoAnswersForEntry(normalizedRx, entry) {
  if (!normalizedRx || !entry) return [];
  const autoAnswers = [];

  // 1. 共通質問：診療科 (shared_q_dept) -> optionId: 'dept_' + deptCode
  if (normalizedRx.department && normalizedRx.department.code) {
    const deptCode = normalizedRx.department.code;
    autoAnswers.push({
      questionId: 'shared_q_dept',
      optionId: `dept_${deptCode}`,
      confidence: 'yes',
      auto: true,
      source: `NSIPS/QR 診療科 (${normalizedRx.department.raw})`
    });
  }

  // 2. 共通質問：処方日数 (shared_q_days) -> optionId: 'days_short7' | 'days_14' | 'days_long28' | 'days_as_needed'
  if (normalizedRx.isPrnOnly) {
    autoAnswers.push({
      questionId: 'shared_q_days',
      optionId: 'days_as_needed',
      confidence: 'yes',
      auto: true,
      source: 'NSIPS/QR 用法（頓服）'
    });
  } else if (typeof normalizedRx.maxDays === 'number') {
    const d = normalizedRx.maxDays;
    let optId = 'days_14';
    if (d <= 7) optId = 'days_short7';
    else if (d >= 28) optId = 'days_long28';
    autoAnswers.push({
      questionId: 'shared_q_days',
      optionId: optId,
      confidence: 'yes',
      auto: true,
      source: `NSIPS/QR 処方日数 (${d}日分)`
    });
  }

  // 3. 共通質問：年齢・性別 (shared_q_sex_age) -> optionId: 'sa_' + ageSexCategory
  if (normalizedRx.patient && normalizedRx.patient.ageSexCategory) {
    const cat = normalizedRx.patient.ageSexCategory;
    autoAnswers.push({
      questionId: 'shared_q_sex_age',
      optionId: `sa_${cat}`,
      confidence: 'yes',
      auto: true,
      source: `NSIPS/QR 患者属性 (${normalizedRx.patient.age !== null ? normalizedRx.patient.age + '歳' : ''}${normalizedRx.patient.sex === 'F' ? '女性' : normalizedRx.patient.sex === 'M' ? '男性' : ''})`
    });
  }

  // 4. 薬剤固有質問のうち、併用薬や1日用量から確実に自動判定できるものをマッチング
  const allDrugNames = (normalizedRx.drugs || []).map(d => d.rawName).join(' ');
  const matchedDrugRecord = (normalizedRx.drugs || []).find(d =>
    entry.name.includes(d.cleanName) ||
    (Array.isArray(entry.aliases) && entry.aliases.some(a => d.rawName.includes(a) || a.includes(d.cleanName)))
  );
  const dailyMg = matchedDrugRecord ? matchedDrugRecord.estimatedDailyMg : null;
  const totalDrugsCount = (normalizedRx.drugs || []).length;

  for (const q of (entry.questions || [])) {
    const qText = `${q.title || q.text || ''} ${q.subtitle || ''}`;

    // (a) 1日用量を尋ねる質問の自動判定
    if (dailyMg !== null && /1日量|維持量|用量|投与量|mg/.test(qText)) {
      for (const opt of (q.options || [])) {
        const label = opt.label || '';
        const mRange = label.match(/(\d+(?:\.\d+)?)\s*(?:mg)?\s*[〜~-]\s*(\d+(?:\.\d+)?)\s*mg/i);
        if (mRange) {
          const low = parseFloat(mRange[1]);
          const high = parseFloat(mRange[2]);
          if (dailyMg >= low && dailyMg <= high) {
            autoAnswers.push({
              questionId: q.id,
              optionId: opt.id,
              confidence: 'yes',
              auto: true,
              source: `処方1日量 (${dailyMg}mg/日)`
            });
            break;
          }
        }
      }
    }

    // (b) 併用薬を尋ねる質問の自動判定
    if (/併用|一緒に処方|同時処方/.test(qText)) {
      if (totalDrugsCount === 1) {
        // 単剤処方の場合、「単剤」「併用薬はない」選択肢を自動選択
        const monoOpt = (q.options || []).find(o => /単剤|単独|併用薬はない|特に上記のような併用薬はない/.test(o.label || ''));
        if (monoOpt) {
          autoAnswers.push({
            questionId: q.id,
            optionId: monoOpt.id,
            confidence: 'yes',
            auto: true,
            source: 'NSIPS 単剤処方自動検出'
          });
          continue;
        }
      } else if (totalDrugsCount >= 2) {
        for (const opt of (q.options || [])) {
          const label = opt.label || '';
          if (/ウルソ|UDCA/.test(label) && /ウルソ|ウルソデオキシコール/.test(allDrugNames)) {
            autoAnswers.push({
              questionId: q.id,
              optionId: opt.id,
              confidence: 'yes',
              auto: true,
              source: '併用薬自動検出（UDCA）'
            });
            break;
          }
          if (/エンレスト|フォシーガ|ジャディアンス|メインテート|カルベジロール/.test(label) &&
              /フォシーガ|ダパグリフロジン|ジャディアンス|エンパグリフロジン|エンレスト|ビソプロロール|メインテート|カルベジロール|アーチスト/.test(allDrugNames)) {
            autoAnswers.push({
              questionId: q.id,
              optionId: opt.id,
              confidence: 'yes',
              auto: true,
              source: '併用薬自動検出（心不全GDMT併用薬）'
            });
            break;
          }
        }
      }
    }
  }

  return autoAnswers;
}

// サンプルNSIPSテストデータ（ユーザーがワンクリックで動作確認できる匿名ダミー処方3パターン）
const WIZARD_NSIPS_SAMPLES = {
  cardio_hfref: {
    title: '循環器：HFrEF（慢性心不全ファンタスティック4処方）',
    raw: [
      'NSIPS,1.04,20261102,テスト薬局',
      '1,10001,テスト太郎,テストタロウ,1,19520514',
      '2,循環器内科,テスト総合病院,循環器太郎',
      '3,1,1日1回朝食後,28',
      '4,1,111111111111,スピロノラクトン錠25mg,1,錠',
      '4,1,2149048F1024,フォシーガ錠10mg,1,錠',
      '3,2,1日2回朝夕食後,28',
      '4,2,2190041F1020,エンレスト錠100mg,2,錠',
      '4,2,2123016F2020,カルベジロール錠2.5mg,2,錠'
    ].join('\n')
  },
  derm_spiro_acne: {
    title: '皮膚科：成人女性ざ瘡（スピロノラクトン高用量・適応外）',
    raw: [
      'NSIPS,1.04,20261102,テスト薬局',
      '1,10002,テスト花子,テストハナコ,2,19980820',
      '2,皮膚科,テストスキンクリニック,皮膚次郎',
      '3,1,1日2回朝夕食後,28',
      '4,1,2133001F1020,アルダクトンA錠50mg,2,錠'
    ].join('\n')
  },
  gi_pbc_fibrate: {
    title: '消化器：原発性胆汁性胆管炎 PBC（ウルソ＋ベザフィブラート適応外併用）',
    raw: [
      'NSIPS,1.04,20261102,テスト薬局',
      '1,10003,テスト美咲,テストミサキ,2,19681103',
      '2,消化器内科,テスト肝胆膵クリニック,消化三郎',
      '3,1,1日2回朝夕食後,28',
      '4,1,2183005F1020,ベザトールSR錠200mg,2,錠',
      '3,2,1日3回毎食後,28',
      '4,2,2362001F2020,ウルソ錠100mg,6,錠'
    ].join('\n')
  }
};

if (typeof window !== 'undefined') {
  window.parsePrescriptionText = parsePrescriptionText;
  window.extractAutoAnswersForEntry = extractAutoAnswersForEntry;
  window.classifyMedicalDepartment = classifyMedicalDepartment;
  window.WIZARD_NSIPS_SAMPLES = WIZARD_NSIPS_SAMPLES;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    parsePrescriptionText,
    extractAutoAnswersForEntry,
    classifyMedicalDepartment,
    estimateAgeFromString,
    WIZARD_NSIPS_SAMPLES
  };
}
