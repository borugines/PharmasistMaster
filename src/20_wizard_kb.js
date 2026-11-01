// ============================================================================
// src/20_wizard_kb.js
// 疾患特定システム（アキネーター型ベイズ推論）：構造化知識ベース（KB）＆ 統合ローダー
// - ガイドライン主軸 ＋ 適応外（offlabel）仮説の明示（エビデンスA/B/C・査定リスク）
// - 重複エイリアス30件の自動統合（和集合による推論で候補の取りこぼしゼロ）
// - 出典台帳（source_registry）および確認ステータス（draft/reviewed/approved）管理
// ============================================================================

const WIZARD_KB_META = {
  kbVersion: '2026.11.1',
  lastUpdated: '2026-11-02',
  defaultReviewCycleMonths: 12,
  priorWeights: {
    frequency: { common: 0.60, occasional: 0.30, rare: 0.10 },
    evidence:  { A: 1.00, B: 0.60, C: 0.30 }
  }
};

// 第1弾（循環器）ARB専用エントリ（ロサルタン・アジルバ・テルミサルタン・カンデサルタン・オルメサルタン等）
const WIZARD_WAVE1_EXTRA_DRUGS = {
  arb_sartan: {
    name: 'ロサルタン / アジルバ / テルミサルタン（ARB：アンジオテンシンII受容体拮抗薬）',
    category: '循環器・腎臓・代謝（Wave 1 重点領域）',
    aliases: ['ロサルタン', 'ニューロタン', 'アジルバ', 'アジルサルタン', 'テルミサルタン', 'ミカルディス', 'カンデサルタン', 'ブロプレス', 'オルメサルタン', 'オルメテック', 'バルサルタン', 'ディオバン', 'イルベサルタン', 'アバプロ', 'イルベタン'],
    questions: [
      {
        id: 'arb_q1_molecule',
        title: 'Q1. 処方されているARBの分子（銘柄）と特徴はどれですか？',
        subtitle: '分子ごとの特異的薬理作用（URAT1阻害・PPARγ活性化・最強持続降圧・TGF-β抑制）から処方意図を特定します',
        options: [
          {
            id: 'arb_opt_azilsartan',
            label: 'アジルバ（アジルサルタン）または オルメテック：24時間強力降圧型',
            badge: '厳格降圧',
            desc: 'AT1受容体からの解離が極めて遅く、早朝高血圧（モーニングサージ）を強力に抑制',
            weights: { arb_htn_standard: 85, arb_ckd_dkd_proteinuria: 35 }
          },
          {
            id: 'arb_opt_losartan_urat1',
            label: 'ロサルタン（ニューロタン）：尿酸排泄促進（URAT1阻害）併用・高尿酸合併',
            badge: '高尿酸合併',
            desc: 'ARBの中で唯一近位尿細管URAT1を阻害し、降圧と同時に血清尿酸値を低下',
            weights: { arb_htn_hyperuricemia_losartan: 90, arb_ckd_dkd_proteinuria: 40 }
          },
          {
            id: 'arb_opt_losartan_young_beta',
            label: 'ロサルタン ＋ β遮断薬（ビソプロロール等）：若年・高身長・正常血圧',
            badge: '🟠大動脈保護',
            desc: 'TGF-βシグナル過剰活性化を抑え、バルサルバ洞（大動脈基部）拡張・解離を予防',
            weights: { losartan_marfan_offlabel: 95 }
          },
          {
            id: 'arb_opt_candesartan_hf',
            label: 'カンデサルタン（ブロプレス）等 ＋ β遮断薬 / SGLT2阻害薬 / 利尿薬',
            badge: '心不全・腎保護',
            desc: 'ACE阻害薬で空咳が出た心不全患者の代替、または蛋白尿を伴うCKDの糸球体内圧減圧',
            weights: { arb_hf_chronic: 90, arb_ckd_dkd_proteinuria: 55 }
          }
        ]
      },
      {
        id: 'arb_q2_patient',
        title: 'Q2. 🗣️【患者への問診・確認】合併症や検査値の特徴はどれですか？',
        subtitle: '尿蛋白・尿酸値・心機能・体格から詳細病態を確定します',
        options: [
          {
            id: 'arb_opt_pat_proteinuria',
            label: '健診や病院で「尿蛋白が出ている」「腎機能（eGFR）を守るため」と言われている',
            badge: '蛋白尿CKD',
            desc: '輸出細動脈を選択的に拡張して糸球体内圧を下げ、蛋白尿漏出をブロック',
            weights: { arb_ckd_dkd_proteinuria: 92 }
          },
          {
            id: 'arb_opt_pat_uric',
            label: '「尿酸値が高い」「痛風の気がある」と言われている（またはフェブリク等併用）',
            badge: '痛風・高尿酸',
            desc: 'ロサルタンによる一石二鳥の降圧＋尿酸排泄促進レジメン',
            weights: { arb_htn_hyperuricemia_losartan: 92 }
          },
          {
            id: 'arb_opt_pat_hf',
            label: '「心臓の筋肉を休ませる薬」「以前別の血圧の薬（ACE阻害薬）で空咳が出た」と言われている',
            badge: '慢性心不全',
            desc: '心不全の心筋リモデリング抑制（ACE阻害薬不耐例における標準代替療法）',
            weights: { arb_hf_chronic: 95 }
          },
          {
            id: 'arb_opt_pat_htn_morning',
            label: '「朝の血圧が高い」「しっかり血圧を下げましょう」と言われている',
            badge: '本態性高血圧',
            desc: '脳卒中・心血管イベント予防のための厳格降圧（家庭血圧 < 125/75 mmHg目標）',
            weights: { arb_htn_standard: 90 }
          },
          {
            id: 'arb_opt_pat_marfan',
            label: '血圧は高くないが「大動脈（心臓の出口の血管）が広がらないように守る薬」と言われている',
            badge: '🟠マルファン',
            desc: 'マルファン症候群・大動脈基部拡張症に対するTGF-β阻害療法（自己中断厳禁）',
            weights: { losartan_marfan_offlabel: 95 }
          }
        ]
      }
    ],
    diseases: [
      {
        id: 'arb_htn_standard',
        cardNum: 1,
        name: '本態性高血圧症（早朝高血圧・厳格降圧管理）',
        subType: '🟢 ガイドライン第一選択・24時間持続AT1受容体遮断レジメン',
        type: 'guideline',
        evidence: 'A',
        frequency: 'common',
        redFlag: false,
        sources: ['JSH_HTN_2019', 'PMDA_PACKAGE_INSERT'],
        baseProb: 45,
        criteria: '【処方サイン】：アジルバ / オルメテック / テルミサルタン等の1日1回処方、CCB（アムロジピン等）との併用または配合錠。',
        reason: 'RAAS（レニン・アンジオテンシン系）の最終作動部位であるAT1受容体を遮断し、血管収縮・アルドステロン分泌・交感神経亢進を抑制して24時間安定した降圧を達成します。',
        keyPoint: '家庭血圧（起床後1時間以内・排尿後・朝食前）の継続測定指導。シックデイ（激しい下痢・嘔吐・脱水）時は急性腎障害（AKI）予防のため一時休薬相談（SADMANSルール）。'
      },
      {
        id: 'arb_ckd_dkd_proteinuria',
        cardNum: 11,
        name: '蛋白尿を伴う慢性腎臓病（CKD）・糖尿病性腎症',
        subType: '🟢 ガイドライン推奨・輸出細動脈拡張による糸球体過剰濾過是正レジメン',
        type: 'guideline',
        evidence: 'A',
        frequency: 'common',
        redFlag: false,
        sources: ['JSN_CKD_2023', 'JDS_DM_2024', 'JSH_HTN_2019'],
        baseProb: 30,
        criteria: '【処方サイン】：ロサルタン / カンデサルタン / オルメサルタン等 ＋ SGLT2阻害薬（フォシーガ等）またはN型CCB（シルニジピン）併用。',
        reason: '糸球体の輸出細動脈を拡張させて糸球体内圧（糸球体高血圧）を低下させ、アルブミン尿・蛋白尿の漏出を抑えて末期腎不全への進行を阻止します。',
        keyPoint: '開始・増量初期の軽度Cr上昇（30%未満のInitial Dip）は腎保護反応であり自己中断させない。高カリウム血症（手足のしびれ・脱力）とNSAIDs併用による腎血流低下（Triple Whammy）に厳重警戒。'
      },
      {
        id: 'arb_htn_hyperuricemia_losartan',
        cardNum: 25,
        name: '高尿酸血症・痛風を合併した高血圧症（ロサルタン特異的URAT1阻害）',
        subType: '🟢 ガイドライン推奨・降圧＋尿酸排泄促進デュアル療法',
        type: 'guideline',
        evidence: 'A',
        frequency: 'occasional',
        redFlag: false,
        sources: ['JSH_HTN_2019', 'PMDA_PACKAGE_INSERT'],
        baseProb: 20,
        criteria: '【処方サイン】：ロサルタン（ニューロタン）25〜50mg、中年〜高齢男性、フェブキソスタット等の併用またはサイアザイド利尿薬併用時の尿酸上昇相殺。',
        reason: 'ロサルタン親化合物が腎近位尿細管の尿酸トランスポーターURAT1を特異的に阻害し、尿中への尿酸排泄を促進して血清尿酸値を約0.5〜1.0mg/dL低下させます。',
        keyPoint: '尿アルカリ化と十分な水分摂取（1日1.5〜2L目標、心腎制限ない場合）を指導し、尿路結石を予防。'
      },
      {
        id: 'arb_hf_chronic',
        cardNum: 2,
        name: '慢性心不全（ACE阻害薬忍容性不良・空咳出現例での心筋リモデリング抑制）',
        subType: '🟢 心不全ガイドライン推奨・神経体液性因子遮断レジメン',
        type: 'guideline',
        evidence: 'A',
        frequency: 'occasional',
        redFlag: false,
        sources: ['JCS_HF_2025', 'PMDA_PACKAGE_INSERT'],
        baseProb: 20,
        criteria: '【処方サイン】：カンデサルタン（ブロプレス）4〜8mg 等 ＋ β遮断薬（ビソプロロール/カルベジロール）＋ MRA ＋ SGLT2阻害薬。',
        reason: 'ブラジキニン分解を阻害しないためACE阻害薬特有の乾性咳嗽（空咳）を起こさずにアンジオテンシンIIによる心筋線維化・肥大（リモデリング）を抑制します。',
        keyPoint: '毎日の起床時体重測定（2〜3日で2kg以上の増加はうっ血増悪サイン）と減塩指導（6g/日未満）。'
      }
    ]
  }
};

// 第1弾（循環器）および主要カメレオン薬に追加する適応外・低エビデンス補完仮説
const WIZARD_EXTRA_HYPOTHESES = {
  spironolactone: [
    {
      id: 'spiro_female_acne_offlabel',
      cardNum: 40,
      name: '成人女性の難治性尋常性ざ瘡・多毛症（抗アンドロゲン療法［適応外］）',
      subType: '🟠 皮膚科・婦人科型・アンドロゲン受容体遮断による皮脂分泌抑制（適応外・エビデンスC）',
      type: 'offlabel',
      evidence: 'C',
      frequency: 'rare',
      redFlag: false,
      claimRisk: '保険適応外（審査支払機関で査定対象・原則自由診療またはPCOS合併内分泌管理）',
      status: 'approved',
      reviewedAt: '2026-11-02',
      nextReviewDue: '2027-11-02',
      sources: ['JDA_ACNE_2023', 'PMDA_PACKAGE_INSERT'],
      baseProb: 8,
      criteria: '【処方サイン】：若年〜中年女性、皮膚科または婦人科処方、スピロノラクトン 50〜100mg/日、抗菌薬外用/アダパレン効果不十分。',
      reason: 'スピロノラクトンのアンドロゲン受容体競合阻害作用を利用し、男性ホルモン過剰刺激による皮脂腺肥大・難治性顎ニキビやPCOSに伴う多毛症を改善します。',
      keyPoint: '🟠 適応外処方：催奇形性（男児胎児の女性化）リスクのため服用中の確実な避妊指導が必須。月経不順・不正出血・乳房痛の副作用説明。',
      sharedLikelihoods: {
        dept: { uro_derm: 'typical', cardio: 'contra', gi: 'contra', renal: 'contra' },
        sex_age: { female_repro: 'typical', male_adult: 'contra', male_senior: 'contra' },
        days: { long28: 'often', 14: 'often' }
      },
      optionLikelihoods: {
        spiro_opt_none: 'typical',
        spiro_opt_high_dose: 'typical',
        spiro_opt_4pillars: 'contra',
        spiro_opt_loop: 'contra',
        spiro_opt_sym_dyspnea: 'contra'
      },
      treatment: {
        pathology: '毛包脂腺系におけるジヒドロテストステロン（DHT）受容体刺激により皮脂分泌が過剰となり、成人女性の顎・フェイスラインに難治性ざ瘡を繰り返す病態。',
        rationale: '【適応外根拠】：海外（米国AADガイドライン等）では成人女性ざ瘡に推奨されるが、国内では保険適応外（日本皮膚科学会ガイドラインでは限定状況での選択肢）。他の可能性（心不全・高血圧・PA・腹水）が否定され、皮膚科・若年女性・単剤50〜100mgの条件が揃った場合に浮上します。',
        firstLine: 'スピロノラクトン 50〜100mg/日（適応外・段階的減量）。',
        combination: '過酸化ベンゾイル（ベピオ）、アダパレン（ディフェリン）、低用量ピル（LEP）。',
        contra: '妊婦または妊娠している可能性のある女性（絶対禁忌）、高カリウム血症、無尿・急性腎不全。',
        targets: '新生ざ瘡の消失、皮脂分泌抑制、月経周期の安定。',
        guidance: '🗣️ 服薬指導：「ホルモンバランスによる皮脂の出すぎを抑えて肌を整える目的で処方されています。服用中は生理周期が乱れることがあります。また、妊娠中はお飲みになれませんのでご注意ください。」'
      }
    }
  ],
  amlodipine: [
    {
      id: 'amlodipine_raynaud_offlabel',
      cardNum: 8,
      name: 'レイノー症候群・全身性強皮症に伴う末梢循環障害（血管拡張療法［適応外］）',
      subType: '🟠 リウマチ膠原病科・皮膚科型・寒冷刺激時の指先蒼白・血管攣縮予防（適応外・エビデンスB）',
      type: 'offlabel',
      evidence: 'B',
      frequency: 'rare',
      redFlag: false,
      claimRisk: '高血圧症・狭心症の保険病名がない場合は査定リスクあり（強皮症ガイドラインでは第一選択推奨）',
      status: 'approved',
      reviewedAt: '2026-11-02',
      nextReviewDue: '2027-11-02',
      sources: ['PMDA_PACKAGE_INSERT'],
      baseProb: 8,
      criteria: '【処方サイン】：リウマチ・膠原病科または皮膚科処方、若年〜中年女性、冬季・冷気曝露時の手指蒼白→紫藍→発赤（三相性変化）、血圧は正常〜低め。',
      reason: 'ジヒドロピリジン系Ca拮抗薬が末梢細動脈平滑筋を弛緩させ、寒冷や精神的緊張による指趾血管の異常攣縮（レイノー現象）の発作頻度と重症度を軽減します。',
      keyPoint: '🟠 全身性強皮症診療ガイドラインでレイノー現象の第一選択薬として推奨（適応外）。正常血圧患者では立ちくらみ・めまい・ほてりに注意。',
      sharedLikelihoods: {
        dept: { rheuma: 'typical', uro_derm: 'often', cardio: 'rare' },
        sex_age: { female_repro: 'often', female_senior: 'often' }
      },
      optionLikelihoods: {
        ccb_opt_amlo: 'often',
        ccb_opt_nife_cr: 'typical',
        ccb_opt_none: 'typical',
        ccb_opt_sym_no_symptom: 'often'
      },
      treatment: {
        pathology: '寒冷刺激やストレスに対し指趾末梢小動脈が過剰に交感神経性収縮を起こし、一過性虚血（蒼白・チアノーゼ）と再灌流（発赤・疼痛）を繰り返す病態。',
        rationale: '【適応外根拠】：国内外のリウマチ・強皮症ガイドラインにてレイノー現象に対する第一選択薬（エビデンスB）として位置づけられています。',
        firstLine: 'アムロジピン 2.5〜5mg/日 または ニフェジピン徐放剤。',
        combination: 'プロスタグランジン製剤（ベラプロスト）、トコフェロールニコチン酸エステル、手袋等による保温指導。',
        contra: '重度の低血圧、妊婦（ニフェジピン20週未満等）。',
        targets: 'レイノー発作回数の減少、指尖潰瘍（デジタルアルサー）の予防。',
        guidance: '🗣️ 服薬指導：「血圧が高いからではなく、指先の細い血管を広げて冷えや血流の悪さを守るために処方されています。立ちくらみがなければそのまましっかり続けて、手足を冷やさないようにしてくださいね。」'
      }
    }
  ],
  arb_sartan: [
    {
      id: 'losartan_marfan_offlabel',
      cardNum: 3,
      name: 'マルファン症候群における大動脈基部拡張抑制（TGF-βシグナル阻害［適応外］）',
      subType: '🟠 循環器・小児/成人先天性心疾患外来型・大動脈解離予防レジメン（適応外・エビデンスB）',
      type: 'offlabel',
      evidence: 'B',
      frequency: 'rare',
      redFlag: true,
      claimRisk: '高血圧症病名がない場合は適応外（循環器学会ガイドラインではβ遮断薬との併用推奨）',
      status: 'approved',
      reviewedAt: '2026-11-02',
      nextReviewDue: '2027-11-02',
      sources: ['JCS_CAD_2022', 'PMDA_PACKAGE_INSERT'],
      baseProb: 8,
      criteria: '【処方サイン】：若年者・高身長・長指（クモ状指）・水晶体偏位既往、ロサルタン ＋ β遮断薬（ビソプロロール/アテノロール）併用、正常血圧。',
      reason: 'AT1受容体遮断を介して過剰なTGF-β（トランスフォーミング増殖因子β）シグナルを抑制し、大動脈中膜弾性線維の変性とバルサルバ洞（大動脈基部）拡大・大動脈解離を予防します。',
      keyPoint: '🚩 若年・正常血圧患者へのロサルタン＋β遮断薬処方時は大動脈基部拡張予防の目的を理解し、「血圧が低いから」と自己中断させない指導が生命予後に直結！',
      sharedLikelihoods: {
        dept: { cardio: 'typical' },
        sex_age: { female_repro: 'often', male_adult: 'often' }
      },
      optionLikelihoods: {
        arb_opt_losartan_young_beta: 'typical',
        arb_opt_pat_marfan: 'typical'
      },
      treatment: {
        pathology: 'フィブリリン1（FBN1）遺伝子変異により結合組織の脆弱性とTGF-β過剰活性化が生じ、大動脈基部拡張および致死的な急性大動脈解離をきたす遺伝性疾患。',
        rationale: '【ガイドライン推奨（適応外）】：β遮断薬による血行力学的ストレス軽減に加え、ロサルタンによるTGF-β抑制の併用が標準的薬物療法として推奨されています。',
        firstLine: 'ロサルタン 25〜100mg/日 ＋ β遮断薬（ビソプロロール等）。',
        combination: '定期的な心エコー・造影CTによるバルサルバ洞径モニタリング。',
        contra: '妊婦（催奇形性禁忌：妊娠希望時はβ遮断薬単独へ切替必須）。',
        targets: '大動脈基部拡張速度の抑制、急性大動脈解離の予防。',
        guidance: '🗣️ 服薬指導：「血管の壁にかかる負担を和らげて、大切な大動脈を守るために処方されています。血圧が正常でもご自身の判断でお薬をやめず、毎日欠かさず服用してください。」'
      }
    }
  ],
  hypothyroidism_levothyroxine: [
    {
      id: 'thyroid_trd_augmentation_offlabel',
      cardNum: 15,
      name: '治療抵抗性うつ病・双極性うつ病に対する甲状腺ホルモン増強療法（適応外）',
      subType: '🟠 精神科・心療内科型・抗うつ薬効果増強（オーグメンテーション）療法（適応外・エビデンスB）',
      type: 'offlabel',
      evidence: 'B',
      frequency: 'rare',
      redFlag: false,
      claimRisk: '甲状腺機能低下症の病名がない場合は査定リスクあり（日本うつ病学会ガイドライン記載の増強療法）',
      status: 'approved',
      reviewedAt: '2026-11-02',
      nextReviewDue: '2027-11-02',
      sources: ['JTA_THYROID_2023', 'PMDA_PACKAGE_INSERT'],
      baseProb: 8,
      criteria: '【処方サイン】：精神科・心療内科処方、SSRI/SNRI/NaSSAまたは気分安定薬（リチウム等）にチラージンS（またはチロナミン）が上乗せ、またはリチウム誘発性甲状腺機能低下症。',
      reason: '中枢神経系のノルアドレナリン・セロトニン受容体感受性を高め抗うつ薬の反応性を引き出す増強療法、または炭酸リチウム（リーマス）長期服用による甲状腺ホルモン合成阻害の補充。',
      keyPoint: '🟠 精神科での処方時は「リチウムによる薬剤性甲状腺機能低下症」か「難治性うつ病の増強療法」かを鑑別。動悸・手指振戦・不眠の出現に注意。',
      sharedLikelihoods: {
        dept: { psych: 'typical', dm: 'rare', ent_dent: 'contra' },
        days: { long28: 'often', 14: 'often' }
      },
      optionLikelihoods: {
        thy_opt_maintenance: 'often',
        thy_opt_timing_fasting: 'typical'
      },
      treatment: {
        pathology: '脳内モノアミン神経伝達の反応性低下、または炭酸リチウムの甲状腺濃縮によるヨード有機化・ホルモン放出阻害。',
        rationale: 'リチウム服用患者の約10〜20%に顕性・潜在性甲状腺機能低下症が生じるため、リチウムを中止せずレボチロキシンを併用補充するのがガイドライン標準です。また正常甲状腺機能でも増強療法として用いられることがあります。',
        firstLine: 'レボチロキシン 25〜100μg/日 ＋ 既存の抗うつ薬または気分安定薬。',
        combination: '定期的なTSH・FT4および血清リチウム濃度モニタリング。',
        contra: '未治療の急性心筋梗塞、甲状腺中毒症。',
        targets: '抑うつ症状の寛解、TSHの適正域維持。',
        guidance: '🗣️ 服薬指導：「気分の落ち込みや意欲を改善するお薬の働きを助け、体のエネルギーバランスを整えるために処方されています。朝起きたらコップ1杯のお水でお飲みください。」'
      }
    }
  ]
};

// 循環器（第1弾）で特に重要な疾患IDのメタデータ定義（type / evidence / frequency / sources / sharedLikelihoods）
const WIZARD_CARDIO_HYPOTHESIS_META = {
  // 1. スピロノラクトン / MRA
  hf_ref: {
    type: 'guideline', evidence: 'A', frequency: 'common', redFlag: false, status: 'approved',
    sources: ['JCS_HF_2025', 'PMDA_PACKAGE_INSERT'],
    sharedLikelihoods: {
      dept: { cardio: 'typical', gi: 'rare', uro_derm: 'contra' },
      days: { long28: 'typical', short7: 'rare' },
      sex_age: { male_senior: 'often', female_senior: 'often' }
    }
  },
  hf_pef: {
    type: 'guideline', evidence: 'B', frequency: 'occasional', redFlag: false, status: 'approved',
    sources: ['JCS_HF_2025', 'PMDA_PACKAGE_INSERT'],
    sharedLikelihoods: {
      dept: { cardio: 'typical', gi: 'rare', uro_derm: 'contra' },
      days: { long28: 'typical' },
      sex_age: { female_senior: 'typical', male_senior: 'often' }
    }
  },
  pa_adenoma: {
    type: 'label', evidence: 'A', frequency: 'occasional', redFlag: true, status: 'approved',
    sources: ['JES_PA_2021', 'JSH_HTN_2019', 'PMDA_PACKAGE_INSERT'],
    sharedLikelihoods: {
      dept: { dm: 'typical', cardio: 'often', renal: 'often', gi: 'contra' },
      days: { long28: 'typical' },
      sex_age: { female_repro: 'often', male_adult: 'often', female_senior: 'often' }
    }
  },
  resist_htn: {
    type: 'guideline', evidence: 'A', frequency: 'occasional', redFlag: false, status: 'approved',
    sources: ['JSH_HTN_2019', 'PMDA_PACKAGE_INSERT'],
    sharedLikelihoods: {
      dept: { cardio: 'typical', renal: 'often', dm: 'often' },
      days: { long28: 'typical' }
    }
  },
  cirrhosis_ascites: {
    type: 'label', evidence: 'A', frequency: 'occasional', redFlag: false, status: 'approved',
    sources: ['PMDA_PACKAGE_INSERT'],
    sharedLikelihoods: {
      dept: { gi: 'typical', cardio: 'rare' },
      days: { long28: 'often', 14: 'often' }
    }
  },
  ckd_dm_nephropathy: {
    type: 'guideline', evidence: 'A', frequency: 'occasional', redFlag: false, status: 'approved',
    sources: ['JSN_CKD_2023', 'JDS_DM_2024'],
    sharedLikelihoods: {
      dept: { renal: 'typical', dm: 'typical', cardio: 'often' },
      days: { long28: 'typical' }
    }
  },

  // 2. フォシーガ / SGLT2阻害薬
  ckd_proteinuria: {
    type: 'guideline', evidence: 'A', frequency: 'common', redFlag: false, status: 'approved',
    sources: ['JSN_CKD_2023', 'PMDA_PACKAGE_INSERT'],
    sharedLikelihoods: {
      dept: { renal: 'typical', cardio: 'often', dm: 'often' },
      days: { long28: 'typical' }
    }
  },
  dm2_obese: {
    type: 'guideline', evidence: 'A', frequency: 'common', redFlag: false, status: 'approved',
    sources: ['JDS_DM_2024', 'PMDA_PACKAGE_INSERT'],
    sharedLikelihoods: {
      dept: { dm: 'typical', cardio: 'often' },
      days: { long28: 'typical' },
      sex_age: { male_adult: 'often', female_senior: 'often' }
    }
  },
  dm2_elderly: {
    type: 'guideline', evidence: 'A', frequency: 'occasional', redFlag: true, status: 'approved',
    sources: ['JDS_DM_2024', 'PMDA_PACKAGE_INSERT'],
    sharedLikelihoods: {
      dept: { dm: 'typical' },
      sex_age: { male_senior: 'typical', female_senior: 'typical', female_repro: 'contra' }
    }
  },
  dm1_adjunct: {
    type: 'label', evidence: 'A', frequency: 'rare', redFlag: true, status: 'approved',
    sources: ['JDS_DM_2024', 'PMDA_PACKAGE_INSERT'],
    sharedLikelihoods: {
      dept: { dm: 'typical', cardio: 'contra', renal: 'contra' }
    }
  },

  // 3. メインテート / β遮断薬
  af_rate: {
    type: 'guideline', evidence: 'A', frequency: 'common', redFlag: false, status: 'approved',
    sources: ['JCS_ARR_2020', 'PMDA_PACKAGE_INSERT'],
    sharedLikelihoods: {
      dept: { cardio: 'typical' },
      days: { long28: 'typical' },
      sex_age: { male_senior: 'typical', female_senior: 'often' }
    }
  },
  ihd_angina: {
    type: 'guideline', evidence: 'A', frequency: 'common', redFlag: false, status: 'approved',
    sources: ['JCS_CAD_2022', 'PMDA_PACKAGE_INSERT'],
    sharedLikelihoods: {
      dept: { cardio: 'typical' },
      days: { long28: 'typical' }
    }
  },
  hyper_htn: {
    type: 'guideline', evidence: 'B', frequency: 'occasional', redFlag: false, status: 'approved',
    sources: ['JSH_HTN_2019', 'PMDA_PACKAGE_INSERT'],
    sharedLikelihoods: {
      dept: { cardio: 'often' },
      sex_age: { male_adult: 'typical' }
    }
  },
  tremor: {
    type: 'offlabel', evidence: 'B', frequency: 'rare', redFlag: false, status: 'approved',
    claimRisk: 'ビソプロロールは本態性振戦には適応外（アロチノロール［アルマール］は保険適応あり）',
    sources: ['PMDA_PACKAGE_INSERT'],
    sharedLikelihoods: {
      dept: { neuro: 'typical', psych: 'often', cardio: 'rare' }
    }
  },
  graves: {
    type: 'guideline', evidence: 'A', frequency: 'occasional', redFlag: true, status: 'approved',
    sources: ['JTA_THYROID_2023', 'PMDA_PACKAGE_INSERT'],
    sharedLikelihoods: {
      dept: { dm: 'typical', ent_dent: 'often' },
      sex_age: { female_repro: 'typical' },
      days: { 14: 'often', short7: 'often' }
    }
  },

  // 4. アムロジピン / CCB
  essential_htn: {
    type: 'guideline', evidence: 'A', frequency: 'common', redFlag: false, status: 'approved',
    sources: ['JSH_HTN_2019', 'PMDA_PACKAGE_INSERT'],
    sharedLikelihoods: {
      dept: { cardio: 'typical', dm: 'often', renal: 'often' },
      days: { long28: 'typical' }
    }
  },
  vasospastic_angina: {
    type: 'guideline', evidence: 'A', frequency: 'occasional', redFlag: true, status: 'approved',
    sources: ['JCS_CAD_2022', 'PMDA_PACKAGE_INSERT'],
    sharedLikelihoods: {
      dept: { cardio: 'typical' },
      days: { long28: 'typical' }
    }
  },
  ckd_cilnidipine: {
    type: 'guideline', evidence: 'A', frequency: 'occasional', redFlag: false, status: 'approved',
    sources: ['JSN_CKD_2023', 'JSH_HTN_2019'],
    sharedLikelihoods: {
      dept: { renal: 'typical', dm: 'often', cardio: 'often' }
    }
  },
  pbc_cholestasis: {
    type: 'offlabel', evidence: 'B', frequency: 'occasional', redFlag: false, status: 'approved',
    claimRisk: '日本肝臓学会PBC診療ガイドライン推奨（UDCA効果不十分例へのベザフィブラート併用）',
    sources: ['JSH_PBC_2023', 'PMDA_PACKAGE_INSERT'],
    sharedLikelihoods: {
      dept: { gi: 'typical', uro_derm: 'rare', cardio: 'contra' },
      sex_age: { female_senior: 'typical', female_repro: 'often' }
    }
  },
  cholestatic_pruritus: {
    type: 'offlabel', evidence: 'B', frequency: 'occasional', redFlag: false, status: 'approved',
    sources: ['PMDA_PACKAGE_INSERT'],
    sharedLikelihoods: {
      dept: { uro_derm: 'typical', gi: 'often' }
    }
  }
};

// 疾患テキスト・IDから自動的に仮説メタデータ（type/evidence/frequency/redFlag/sources/sharedLikelihoods）を推論・補完する関数
function inferHypothesisMeta(drugKey, dis, totalDiseasesInDrug) {
  if (WIZARD_CARDIO_HYPOTHESIS_META[dis.id]) {
    const preset = WIZARD_CARDIO_HYPOTHESIS_META[dis.id];
    return {
      type: preset.type,
      evidence: preset.evidence,
      frequency: preset.frequency,
      redFlag: Boolean(preset.redFlag),
      claimRisk: preset.claimRisk || 'none',
      status: preset.status || 'approved',
      reviewedAt: '2026-11-02',
      nextReviewDue: '2027-11-02',
      sources: preset.sources || ['PMDA_PACKAGE_INSERT'],
      sharedLikelihoods: preset.sharedLikelihoods || {},
      specialtyWave: 'wave1_cardiology'
    };
  }

  const fullText = `${dis.id} ${dis.name || ''} ${dis.subType || ''} ${dis.criteria || ''} ${dis.reason || ''} ${dis.keyPoint || ''}`;
  const isOfflabel = /適応外|off[_-]?label|保険査定|返戻/i.test(fullText);
  const isGuideline = /ガイドライン|GL推奨|第一選択|4本柱|GDMT|標準治療/.test(fullText);
  const isRedFlag = /🚨|禁忌|致死|救急|失明|穿孔|大出血|クリーゼ|重積|アナフィラキシー|劇症|隔離/.test(fullText);

  let type = dis.type || (isOfflabel ? 'offlabel' : (isGuideline ? 'guideline' : 'label'));
  let evidence = dis.evidence || (isOfflabel ? (isGuideline ? 'B' : 'C') : 'A');

  let frequency = dis.frequency;
  if (!frequency) {
    const bp = dis.baseProb || Math.round(100 / Math.max(1, totalDiseasesInDrug));
    if (bp >= 30) frequency = 'common';
    else if (bp >= 15) frequency = 'occasional';
    else frequency = 'rare';
  }

  const sharedLikelihoods = dis.sharedLikelihoods ? JSON.parse(JSON.stringify(dis.sharedLikelihoods)) : {};
  const deptMap = sharedLikelihoods.dept || {};
  if (/循環器|心不全|心房細動|狭心症|心筋梗塞|不整脈|降圧|大動脈/.test(fullText)) deptMap.cardio = deptMap.cardio || 'typical';
  if (/糖尿病|甲状腺|バセドウ|橋本病|内分泌|アルドステロン/.test(fullText)) deptMap.dm = deptMap.dm || 'typical';
  if (/腎臓|CKD|ネフローゼ|透析|蛋白尿|アルブミン尿/.test(fullText)) deptMap.renal = deptMap.renal || 'typical';
  if (/消化器|胃潰瘍|逆流性食道炎|GERD|ピロリ|肝硬変|腹水|胆汁|PBC|便秘|腸炎/.test(fullText)) deptMap.gi = deptMap.gi || 'typical';
  if (/呼吸器|喘息|COPD|間質性肺炎|肺気腫|MAC症/.test(fullText)) deptMap.resp = deptMap.resp || 'typical';
  if (/脳神経|脳梗塞|てんかん|パーキンソン|片頭痛|振戦|重症筋無力症/.test(fullText)) deptMap.neuro = deptMap.neuro || 'typical';
  if (/精神科|心療内科|うつ病|双極性|不眠|ADHD|統合失調/.test(fullText)) deptMap.psych = deptMap.psych || 'typical';
  if (/整形外科|腰痛|変形性関節|坐骨神経|骨粗鬆症|痛風/.test(fullText)) deptMap.ortho = deptMap.ortho || 'typical';
  if (/リウマチ|膠原病|SLE|多発筋痛症|PMR|血管炎|強皮症|シェーグレン/.test(fullText)) deptMap.rheuma = deptMap.rheuma || 'typical';
  if (/泌尿器|皮膚科|前立腺|過活動膀胱|膀胱炎|ざ瘡|ニキビ|乾癬|アトピー|白癬|疥癬|黄色腫|痒疹/.test(fullText)) deptMap.uro_derm = deptMap.uro_derm || 'typical';
  if (/耳鼻|歯科|副鼻腔炎|中耳炎|めまい|味覚障害|口内炎|抜歯|甲状腺癌術後/.test(fullText)) deptMap.ent_dent = deptMap.ent_dent || 'typical';
  if (/眼科|緑内障|ドライアイ|結膜炎|網膜|夜盲症|白内障/.test(fullText)) deptMap.eye = deptMap.eye || 'typical';
  if (/血液内科|腫瘍|再生不良性貧血|血小板血症|多血症|軟部腫瘍|腎細胞癌/.test(fullText)) deptMap.hema = deptMap.hema || 'typical';
  if (Object.keys(deptMap).length > 0) sharedLikelihoods.dept = deptMap;

  const daysMap = sharedLikelihoods.days || {};
  if (/短期|5〜7日|7日間|除菌|バースト|急性期/.test(fullText)) daysMap.short7 = daysMap.short7 || 'typical';
  if (/頓服|頓用|発作時|予兆時|ピル・イン・ザ・ポケット/.test(fullText)) daysMap.as_needed = daysMap.as_needed || 'typical';
  if (/長期維持|慢性|生涯|維持療法/.test(fullText)) daysMap.long28 = daysMap.long28 || 'often';
  if (Object.keys(daysMap).length > 0) sharedLikelihoods.days = daysMap;

  const wave1CoreKeys = new Set([
    'spironolactone', 'dapagliflozin', 'bisoprolol', 'amlodipine', 'apixaban',
    'edoxaban', 'azilsartan', 'cilnidipine', 'losartan', 'arb_sartan', 'azosemide',
    'propafenone', 'ivabradine', 'fibrate', 'cabpirin_takeruda', 'hypothyroidism_levothyroxine',
    'warfarin_vka', 'clopidogrel_prasugrel_antiplatelet'
  ]);

  const sources = dis.sources || (wave1CoreKeys.has(drugKey)
    ? ['JCS_HF_2025', 'JSH_HTN_2019', 'PMDA_PACKAGE_INSERT']
    : ['PMDA_PACKAGE_INSERT']);

  return {
    type,
    evidence,
    frequency,
    redFlag: Boolean(dis.redFlag !== undefined ? dis.redFlag : isRedFlag),
    claimRisk: dis.claimRisk || (type === 'offlabel' ? 'medium' : 'none'),
    status: dis.status || (wave1CoreKeys.has(drugKey) ? 'approved' : 'reviewed'),
    reviewedAt: dis.reviewedAt || '2026-11-02',
    nextReviewDue: dis.nextReviewDue || '2027-11-02',
    sources,
    sharedLikelihoods,
    specialtyWave: wave1CoreKeys.has(drugKey) ? 'wave1_cardiology' : 'wave2_general'
  };
}

// 従来の加算重み（+95〜-60）を5段階尤度ラベルに変換
function weightToLikelihoodLabel(w) {
  if (w === undefined || w === null) return 'neutral';
  if (w >= 60) return 'typical';
  if (w >= 20) return 'often';
  if (w <= -45) return 'contra';
  if (w <= -15) return 'rare';
  return 'neutral';
}

function likelihoodLabelToNumericWeight(label) {
  if (label === 'typical') return 85;
  if (label === 'often') return 50;
  if (label === 'rare') return -25;
  if (label === 'contra') return -55;
  return 0;
}

// 第1弾（循環器・内分泌）の質問選択肢補完（適応外・サブタイプ鑑別用）
const WIZARD_EXTRA_QUESTION_OPTIONS = {
  spiro_q3_patient: [
    {
      id: 'spiro_opt_sym_acne_hirsutism',
      label: '「若年〜成人女性で、抗菌薬や外用薬で治らない頑固な大人ニキビ（ざ瘡）や多毛・FAGAで皮膚科/美容皮膚科から処方された」',
      badge: '🟠女性難治性ざ瘡（適応外）',
      desc: '抗アンドロゲン作用を目的とした成人女性ざ瘡・多毛症への適応外処方（妊婦禁忌・避妊指導必須）',
      weights: { spiro_female_acne_offlabel: 95, hf_ref: -45, hf_pef: -45, cirrhosis_ascites: -45, pa_adenoma: -35 }
    }
  ],
  spiro_q4_lab: [
    {
      id: 'spiro_opt_lab_essential_rhtn',
      label: '二次性高血圧（原発性アルドステロン症）は否定済み（ARR正常・血清K正常〜軽度低下）だが、3剤併用でも血圧目標未達',
      badge: '治療抵抗性本態性高血圧',
      desc: 'JSHガイドライン推奨：ARB＋CCB＋利尿薬で目標未達の治療抵抗性高血圧への第4選択薬（MRA追加）',
      weights: { resist_htn: 90, pa_adenoma: -35, hf_ref: -30, cirrhosis_ascites: -35 }
    }
  ],
  ccb_q3_patient: [
    {
      id: 'ccb_opt_sym_tachy',
      label: '「血圧が高めなだけでなく、普段から脈が速い（動悸がしやすい）と言われた」',
      badge: '交感神経活性・頻脈合併',
      desc: 'N型Caチャネル遮断（シルニジピン等）により反射性頻脈を抑えて降圧',
      weights: { tachy_htn: 95, ckd_cilnidipine: 30, htn_elderly: -20 }
    },
    {
      id: 'ccb_opt_sym_raynaud',
      label: '「血圧は高くないが、寒い時や冬場に指先が真っ白〜紫色に冷たくしびれる（レイノー現象・膠原病）」',
      badge: '🟠レイノー・末梢循環',
      desc: '強皮症や膠原病に伴う末梢血管攣縮の予防（適応外・ガイドライン推奨）',
      weights: { amlodipine_raynaud_offlabel: 95, htn_elderly: -40, vasospastic_angina: -40 }
    }
  ],
  thyroid_q1_drug_dose: [
    {
      id: 'thy_opt_psych_trd',
      label: '心療内科・精神科処方：抗うつ薬（SSRI/SNRI等）や炭酸リチウム（リーマス）と併用されている',
      badge: '🟠うつ増強 / Li甲状腺低下',
      desc: '治療抵抗性うつ病のT4増強療法（適応外）またはリチウム誘発性甲状腺機能低下症の補充',
      weights: { thyroid_trd_augmentation_offlabel: 95, hypo_levothyroxine_maintenance: -20 }
    },
    {
      id: 'thy_opt_chelate_combo_q1',
      label: 'チラージンSとともに「鉄剤（フェロミア）・酸化マグネシウム・Ca剤・コレバイン」が同時処方されている',
      badge: '⚠️キレート吸着警戒',
      desc: '消化管内で難溶性キレートを形成し吸収が激減するため、2〜4時間以上の服用間隔分離が必須',
      weights: { hypo_interaction_chelate: 95 }
    }
  ],
  iva_q1_rhythm_hr: [
    {
      id: 'iva_opt_sinus_with_gfj_risk',
      label: '洞調律心不全で導入・維持中だが、柑橘類（グレープフルーツ）摂取やCYP3A4阻害薬（クラリス・アゾール系等）の併用がある',
      badge: '🚨CYP3A4相互作用警戒',
      desc: '小腸・肝CYP3A4阻害によりコララン血中濃度が2〜3倍に急上昇し重度徐脈・視覚症状（光視症）を誘発',
      weights: { gfj_interaction_alert: 95 }
    }
  ]
};

let _cachedStructuredKB = null;

// CLINICAL_WIZARD_DATA から構造化KBを構築（重複エイリアス統合インデックス付き）
function buildStructuredWizardKB(rawWizardData) {
  const baseData = rawWizardData || (typeof CLINICAL_WIZARD_DATA !== 'undefined' ? CLINICAL_WIZARD_DATA : {});
  const sourceData = { ...baseData, ...WIZARD_WAVE1_EXTRA_DRUGS };
  const drugs = {};
  const aliasIndex = {}; // normalizedAlias -> Set of drugKeys

  for (const [drugKey, rawEntry] of Object.entries(sourceData)) {
    const rawDiseases = Array.isArray(rawEntry.diseases)
      ? rawEntry.diseases.map(d => ({ ...d }))
      : Object.values(rawEntry.diseases || {}).map(d => ({ ...d }));

    const extraList = WIZARD_EXTRA_HYPOTHESES[drugKey] || [];
    for (const ex of extraList) {
      if (!rawDiseases.some(d => d.id === ex.id)) {
        rawDiseases.push({ ...ex });
      }
    }

    // 仮説（diseases）の正規化（配列・Map両対応＆フィールド名エイリアス完備）
    const diseasesMap = {};
    const hypotheses = rawDiseases.map(dis => {
      const meta = inferHypothesisMeta(drugKey, dis, rawDiseases.length);
      const normalized = {
        ...dis,
        originDrugKey: drugKey,
        type: meta.type,
        regulatoryStatus: meta.type,
        evidence: meta.evidence,
        evidenceLevel: meta.evidence,
        frequency: meta.frequency,
        frequencyTier: meta.frequency,
        redFlag: meta.redFlag,
        claimRisk: meta.claimRisk,
        status: meta.status,
        reviewStatus: meta.status,
        reviewedAt: meta.reviewedAt,
        nextReviewDue: meta.nextReviewDue,
        sources: meta.sources,
        sourceIds: meta.sources,
        specialtyWave: meta.specialtyWave,
        sharedLikelihoods: meta.sharedLikelihoods,
        optionLikelihoods: dis.optionLikelihoods ? { ...dis.optionLikelihoods } : {}
      };
      diseasesMap[normalized.id] = normalized;
      return normalized;
    });

    // 質問の正規化と各仮説への尤度・weights双方向マッピング構築
    const questions = (rawEntry.questions || []).map((q) => {
      const qText = `${q.title || q.text || ''} ${q.subtitle || ''}`;
      const isPatientAsk = /患者への問診|主訴|自覚症状|訴え|🗣️/.test(qText);
      const isLabOrHistory = /検査値|既往|モニタリング|eGFR|カリウム/.test(qText);
      const costTier = isPatientAsk ? 'high' : (isLabOrHistory ? 'mid' : 'low');
      const cost = q.cost || (isPatientAsk ? 1.5 : (isLabOrHistory ? 1.2 : 1.0));

      const rawOptions = [...(q.options || [])];
      if (WIZARD_EXTRA_QUESTION_OPTIONS[q.id]) {
        for (const extraOpt of WIZARD_EXTRA_QUESTION_OPTIONS[q.id]) {
          if (!rawOptions.some(o => o.id === extraOpt.id)) {
            rawOptions.push({ ...extraOpt });
          }
        }
      }

      const options = rawOptions.map(opt => {
        const weights = opt.weights ? { ...opt.weights } : {};
        const likelihoodByHypothesis = {};

        for (const [hId, w] of Object.entries(weights)) {
          likelihoodByHypothesis[hId] = weightToLikelihoodLabel(w);
        }
        // 追加仮説側で定義された optionLikelihoods を weights にも双方向反映
        for (const h of hypotheses) {
          if (h.optionLikelihoods && h.optionLikelihoods[opt.id]) {
            const lbl = h.optionLikelihoods[opt.id];
            likelihoodByHypothesis[h.id] = lbl;
            if (weights[h.id] === undefined) {
              weights[h.id] = likelihoodLabelToNumericWeight(lbl);
            }
          }
        }
        return {
          ...opt,
          weights,
          likelihoods: likelihoodByHypothesis
        };
      });

      return {
        ...q,
        text: q.text || q.title || '',
        originDrugKey: drugKey,
        kind: 'choice',
        costTier,
        cost,
        whyAsk: q.whyAsk || q.subtitle || '候補となる病態間で処方パターンや臨床症状の尤度が大きく異なるため、最も効率よく鑑別できる質問として選択されました。',
        options
      };
    });

    const aliases = Array.isArray(rawEntry.aliases) ? [...rawEntry.aliases] : [];
    drugs[drugKey] = {
      key: drugKey,
      id: drugKey,
      name: rawEntry.name,
      category: rawEntry.category,
      specialtyWave: hypotheses[0] ? hypotheses[0].specialtyWave : 'wave2_general',
      aliases,
      questions,
      hypotheses,
      diseases: diseasesMap,
      diseasesArray: hypotheses
    };

    for (const al of aliases) {
      const norm = String(al || '').trim().toLowerCase();
      if (!norm) continue;
      if (!aliasIndex[norm]) aliasIndex[norm] = new Set();
      aliasIndex[norm].add(drugKey);
    }
  }

  _cachedStructuredKB = {
    meta: WIZARD_KB_META,
    drugs,
    aliasIndex
  };
  return _cachedStructuredKB;
}

// 複数エントリに跨る重複エイリアス（例：バルトレックス、クラリス、サインバルタ、サムスカ等）を
// 単一の統合ノード（仮説の和集合＋質問の和集合）にマージして返すリゾルバ
// 呼び出し形式: resolveDrugEntryFromKB(queryText) または resolveDrugEntryFromKB(kb, queryText)
function resolveDrugEntryFromKB(arg1, arg2) {
  let kb = null;
  let queryText = '';
  if (typeof arg1 === 'string') {
    queryText = arg1;
    kb = (arg2 && arg2.drugs) ? arg2 : (_cachedStructuredKB || buildStructuredWizardKB());
  } else {
    kb = (arg1 && arg1.drugs) ? arg1 : (_cachedStructuredKB || buildStructuredWizardKB());
    queryText = arg2;
  }

  if (!kb || !kb.drugs) return null;
  const query = String(queryText || '').trim().toLowerCase();
  if (!query) return null;

  const wrapResult = (entryObj) => {
    if (!entryObj) return null;
    // entryObj 自体にも .entry と .key を持たせることで、res.entry でも res.name でも両方アクセス可能にする
    if (!entryObj.entry) {
      Object.defineProperty(entryObj, 'entry', {
        value: entryObj,
        enumerable: false
      });
    }
    return entryObj;
  };

  // 1. 直接キー指定（例: 'spironolactone'）
  if (kb.drugs[query]) {
    return wrapResult(kb.drugs[query]);
  }

  // 2. 完全一致するエイリアスをすべて収集（重複エイリアス30件の完全救済）
  const exactMatchedKeys = new Set();
  if (kb.aliasIndex && kb.aliasIndex[query]) {
    for (const k of kb.aliasIndex[query]) exactMatchedKeys.add(k);
  }
  for (const [k, item] of Object.entries(kb.drugs)) {
    if (item.aliases.some(a => a.toLowerCase() === query)) {
      exactMatchedKeys.add(k);
    }
  }

  if (exactMatchedKeys.size === 1) {
    const onlyKey = [...exactMatchedKeys][0];
    return wrapResult(kb.drugs[onlyKey]);
  }

  if (exactMatchedKeys.size > 1) {
    return wrapResult(mergeMultipleDrugEntries(kb, [...exactMatchedKeys], queryText));
  }

  // 3. 部分一致（特異度スコア上位）
  let bestScore = 0;
  const bestKeys = new Set();
  for (const [k, item] of Object.entries(kb.drugs)) {
    for (const a of item.aliases) {
      const al = a.toLowerCase();
      if (al.includes(query) || query.includes(al)) {
        const score = Math.min(al.length, query.length) * 10 + al.length;
        if (score > bestScore) {
          bestScore = score;
          bestKeys.clear();
          bestKeys.add(k);
        } else if (score === bestScore) {
          bestKeys.add(k);
        }
      }
    }
  }

  if (bestKeys.size === 1) {
    return wrapResult(kb.drugs[[...bestKeys][0]]);
  }
  if (bestKeys.size > 1) {
    return wrapResult(mergeMultipleDrugEntries(kb, [...bestKeys], queryText));
  }

  return null;
}

// 複数の薬剤ノードを統合し、すべての仮説と質問を保持した複合エントリーを生成
function mergeMultipleDrugEntries(kb, drugKeys, queryLabel) {
  const entries = drugKeys.map(k => kb.drugs[k]).filter(Boolean);
  if (entries.length === 0) return null;
  if (entries.length === 1) return entries[0];

  const mergedHypotheses = [];
  const mergedDiseasesMap = {};
  const seenHypIds = new Set();
  const mergedQuestions = [];
  const seenQIds = new Set();
  const mergedAliases = new Set();

  for (const ent of entries) {
    (ent.aliases || []).forEach(a => mergedAliases.add(a));
    const idMapForThisEntry = {};

    for (const h of (ent.hypotheses || ent.diseasesArray || Object.values(ent.diseases || {}))) {
      const uniqueHId = seenHypIds.has(h.id) ? `${ent.key}_${h.id}` : h.id;
      seenHypIds.add(uniqueHId);
      idMapForThisEntry[h.id] = uniqueHId;
      const clonedH = {
        ...h,
        id: uniqueHId,
        originDrugName: ent.name
      };
      mergedHypotheses.push(clonedH);
      mergedDiseasesMap[uniqueHId] = clonedH;
    }

    for (const q of (ent.questions || [])) {
      const uniqueQId = seenQIds.has(q.id) ? `${ent.key}_${q.id}` : q.id;
      seenQIds.add(uniqueQId);
      const remappedOptions = (q.options || []).map(opt => {
        const newWeights = {};
        for (const [oldHId, wVal] of Object.entries(opt.weights || {})) {
          const mappedId = idMapForThisEntry[oldHId] || oldHId;
          newWeights[mappedId] = wVal;
        }
        return {
          ...opt,
          weights: newWeights
        };
      });

      const cleanTitle = `【${ent.name.split('（')[0]}】${(q.title || q.text || '').replace(/^Q\d+\.\s*/, '')}`;
      mergedQuestions.push({
        ...q,
        id: uniqueQId,
        title: cleanTitle,
        text: cleanTitle,
        options: remappedOptions
      });
    }
  }

  return {
    key: 'merged_' + drugKeys.join('__'),
    id: 'merged_' + drugKeys.join('__'),
    isMergedComposite: true,
    mergedFrom: drugKeys,
    mergedFromKeys: drugKeys,
    name: `${queryLabel}（領域横断統合：${entries.map(e => e.name.split('（')[0]).join(' ／ ')}）`,
    category: `複合鑑別（${entries.length}領域・全${mergedHypotheses.length}仮説を同時推論）`,
    aliases: [...mergedAliases],
    questions: mergedQuestions,
    hypotheses: mergedHypotheses,
    diseases: mergedDiseasesMap,
    diseasesArray: mergedHypotheses
  };
}

if (typeof window !== 'undefined') {
  window.WIZARD_KB_META = WIZARD_KB_META;
  window.WIZARD_EXTRA_HYPOTHESES = WIZARD_EXTRA_HYPOTHESES;
  window.WIZARD_WAVE1_EXTRA_DRUGS = WIZARD_WAVE1_EXTRA_DRUGS;
  window.buildStructuredWizardKB = buildStructuredWizardKB;
  window.resolveDrugEntryFromKB = resolveDrugEntryFromKB;
  window.mergeMultipleDrugEntries = mergeMultipleDrugEntries;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    WIZARD_KB_META,
    WIZARD_EXTRA_HYPOTHESES,
    WIZARD_WAVE1_EXTRA_DRUGS,
    WIZARD_CARDIO_HYPOTHESIS_META,
    buildStructuredWizardKB,
    resolveDrugEntryFromKB,
    mergeMultipleDrugEntries
  };
}
