// ============================================================================
// src/21_wizard_questions.js
// 疾患特定システム（アキネーター型ベイズ推論）：共通特徴量質問バンク
// 処方箋から即座に分かる質問（cost: 1.0）を優先し、NSIPS/QR連携時は autoFrom で自動回答
// ============================================================================

const WIZARD_LIKELIHOOD_LEVELS = {
  typical: 0.90,   // 典型：その病態ならほぼ必ずそうなる
  often:   0.65,   // 多い：よくある
  neutral: 0.50,   // 中立：関係ない（未指定時の既定値）
  rare:    0.20,   // 少ない：あまりない
  contra:  0.03    // 否定的：ほぼありえない（0にはせず下限0.03で保護）
};

const WIZARD_COST_TIERS = {
  auto: 0.0,   // NSIPS・QRで自動入力済み（質問しない）
  low:  1.0,   // 処方箋を見ればすぐ分かる（用量・日数・診療科・併用薬・年齢・性別）
  mid:  1.4,   // お薬手帳・検査値シールで分かる（前回変更・eGFR・K・HbA1c等）
  high: 1.9    // 患者本人への問診が必要（自覚症状・手術歴・家族歴等）
};

const WIZARD_SHARED_QUESTIONS = [
  {
    id: 'shared_q_dept',
    feature: 'dept',
    kind: 'choice',
    costTier: 'low',
    cost: 1.0,
    autoFrom: 'dept',
    title: '処方元の診療科（標榜科）はどこですか？',
    subtitle: '処方箋の医療機関名・診療科から、対象疾患の事前確率を大きく絞り込みます',
    whyAsk: '同じ薬剤でも「循環器内科」「腎臓内科」「皮膚科」「精神科」のどこから処方されたかによって、ガイドライン標準適応か適応外特殊処方かが明確に分かれます。',
    options: [
      { id: 'dept_cardio', value: 'cardio', label: '🫀 循環器内科・心臓血管外科', badge: '循環器', desc: '心不全、高血圧、心房細動、虚血性心疾患（狭心症・心筋梗塞後）など' },
      { id: 'dept_dm', value: 'dm', label: '🍬 糖尿病・代謝・内分泌内科', badge: '内分泌・代謝', desc: '2型/1型糖尿病、甲状腺疾患、副腎疾患（PA）、脂質異常症など' },
      { id: 'dept_renal', value: 'renal', label: '🧪 腎臓内科・人工透析科', badge: '腎臓・透析', desc: '慢性腎臓病（CKD）、糖尿病性腎症、ネフローゼ症候群、腎性貧血など' },
      { id: 'dept_gi', value: 'gi', label: '🍽️ 消化器内科・肝臓内科・胃腸科', badge: '消化器・肝胆膵', desc: 'GERD、消化性潰瘍、ピロリ除菌、肝硬変腹水、PBC、IBD、慢性便秘など' },
      { id: 'dept_resp', value: 'resp', label: '🫁 呼吸器内科・アレルギー科', badge: '呼吸器', desc: '気管支喘息、COPD、間質性肺炎（IPF）、慢性咳嗽、MAC症など' },
      { id: 'dept_neuro', value: 'neuro', label: '🧠 脳神経内科・脳神経外科', badge: '脳神経', desc: '脳梗塞再発予防、てんかん、パーキンソン病、片頭痛、本態性振戦、MGなど' },
      { id: 'dept_psych', value: 'psych', label: '🌙 心療内科・精神科', badge: '精神・心療', desc: 'うつ病、双極性障害、不安障害、不眠症、ADHD、BPSDなど' },
      { id: 'dept_ortho', value: 'ortho', label: '🦴 整形外科・ペインクリニック', badge: '整形・疼痛', desc: '慢性腰痛症、変形性関節症、坐骨神経痛、骨粗鬆症、痛風関節炎など' },
      { id: 'dept_rheuma', value: 'rheuma', label: '🧬 リウマチ・膠原病内科', badge: '膠原病', desc: '関節リウマチ（RA）、リウマチ性多発筋痛症（PMR）、SLE、血管炎など' },
      { id: 'dept_uro_derm', value: 'uro_derm', label: '🚽 泌尿器科 ／ 🧴 皮膚科・形成外科', badge: '泌尿器・皮膚', desc: '前立腺肥大症、過活動膀胱、尿路結石、難治性ざ瘡（ニキビ）、乾癬、白癬など' },
      { id: 'dept_ent_dent', value: 'ent_dent', label: '👃 耳鼻咽喉科・頭頸部外科 ／ 🦷 歯科口腔外科', badge: '耳鼻・歯科', desc: 'アレルギー性鼻炎、副鼻腔炎、めまい、甲状腺腫瘍術後、味覚障害、口内炎など' },
      { id: 'dept_eye', value: 'eye', label: '👁️ 眼科', badge: '眼科', desc: '緑内障、ドライアイ、アレルギー性結膜炎、網膜色素変性症、加齢黄斑変性など' },
      { id: 'dept_hema', value: 'hema', label: '🩸 血液内科・腫瘍内科', badge: '血液・腫瘍', desc: '再生不良性貧血、骨髄増殖性腫瘍（ET/PV）、悪性リンパ腫、固形がん化学療法など' }
    ]
  },
  {
    id: 'shared_q_days',
    feature: 'days',
    kind: 'choice',
    costTier: 'low',
    cost: 1.0,
    autoFrom: 'daysCategory',
    title: '今回の処方日数（または投与区分）はどれですか？',
    subtitle: '処方日数から「急性期レスキュー・除菌」か「慢性疾患の長期維持」かを判定します',
    whyAsk: '3〜7日分なら急性感染症・ピロリ除菌・喘息バースト、14日分なら新薬期間制限や初期タイトレーション、28日以上なら慢性疾患維持療法の可能性が高まります。',
    options: [
      { id: 'days_short7', value: 'short7', label: '⚡ 7日以内の短期処方（3〜7日分）', badge: '短期・急性期', desc: 'ピロリ除菌、喘息急性増悪ステロイドバースト、急性感染症など' },
      { id: 'days_14', value: '14', label: '🗓️ 14日分（2週間処方）', badge: '14日・初期評価', desc: '新薬投薬期間制限、導入初期の用量調整・副作用確認フェーズ' },
      { id: 'days_long28', value: 'long28', label: '⏳ 28日以上の長期処方（28日・30日・56日・90日など）', badge: '長期維持', desc: '高血圧・心不全・糖尿病・CKD・甲状腺機能低下症などの安定維持療法' },
      { id: 'days_as_needed', value: 'as_needed', label: '🎯 頓服処方（発作時・症状出現時のみ服用）', badge: '頓服・発作時', desc: '狭心症発作、痛風発作予兆（コルヒチン）、発作性上室性頻拍（Pill-in-the-pocket）、片頭痛など' }
    ]
  },
  {
    id: 'shared_q_change',
    feature: 'change',
    kind: 'choice',
    costTier: 'mid',
    cost: 1.3,
    autoFrom: 'changeStatus',
    title: '前回処方と比較して、今回の処方変更状況はどれですか？',
    subtitle: 'NSIPS履歴またはお薬手帳から、新規開始・Do継続・増量・減量を確認します',
    whyAsk: '初回導入時か、目標未達による増量か、安定維持（Do処方）かによって、重点的に確認すべき初期副作用と服薬指導の優先順位が決まります。',
    options: [
      { id: 'change_new', value: 'new', label: '🆕 初処方（今回から新規に開始・他剤から切替）', badge: '新規開始', desc: '新規診断、または既存治療で効果不十分・副作用による新規追加' },
      { id: 'change_do', value: 'do', label: '🔄 Do処方（前回と同用量で継続・安定維持）', badge: 'Do継続', desc: '治療目標を達成し忍容性も良好な慢性維持フェーズ' },
      { id: 'change_increase', value: 'increase', label: '📈 増量処方（前回より用量を増やした・段階的漸増）', badge: '増量・強化', desc: '心不全GDMTの目標用量へのアップタイトレーション、または効果不十分による増量' },
      { id: 'change_decrease', value: 'decrease', label: '📉 減量処方（前回より用量を減らした・漸減中）', badge: '減量・漸減', desc: '寛解に伴うステロイド漸減、腎機能低下・低血圧・高K等による減量調整' }
    ]
  },
  {
    id: 'shared_q_sex_age',
    feature: 'sex_age',
    kind: 'choice',
    costTier: 'low',
    cost: 1.0,
    autoFrom: 'sexAgeBand',
    title: '患者さんの性別・年代はどれに当てはまりますか？',
    subtitle: '処方箋またはNSIPSの患者基本情報から、性差・年齢特異的疾患を絞り込みます',
    whyAsk: '若年女性の適応外処方（ざ瘡へのスピロノラクトン、妊娠希望の潜在性甲状腺機能低下症）や、高齢者のHFpEF・PMR・前立腺肥大症などを区別できます。',
    options: [
      { id: 'sa_female_repro', value: 'female_repro', label: '👩 10代〜40代女性（妊娠可能年齢・若年〜中年女性）', badge: '若年〜中年女性', desc: '妊娠関連（潜在性甲状腺機能低下症）、月経困難症、難治性ざ瘡（適応外MRA）など' },
      { id: 'sa_female_senior', value: 'female_senior', label: '👵 50代以上の女性（更年期〜高齢女性）', badge: '中高年〜高齢女性', desc: '更年期障害（HRT）、骨粗鬆症、HFpEF、PMR、PBC、橋本病など' },
      { id: 'sa_male_adult', value: 'male_adult', label: '👨 10代〜50代男性（若年〜中年男性）', badge: '若年〜中年男性', desc: '痛風・高尿酸血症、メタボリックシンドローム、本態性高血圧など' },
      { id: 'sa_male_senior', value: 'male_senior', label: '👴 60代以上の男性（高齢男性）', badge: '高齢男性', desc: '前立腺肥大症、心房細動、虚血性心疾患、HFrEF、COPD、CKDなど' }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.WIZARD_LIKELIHOOD_LEVELS = WIZARD_LIKELIHOOD_LEVELS;
  window.WIZARD_COST_TIERS = WIZARD_COST_TIERS;
  window.WIZARD_SHARED_QUESTIONS = WIZARD_SHARED_QUESTIONS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    WIZARD_LIKELIHOOD_LEVELS,
    WIZARD_COST_TIERS,
    WIZARD_SHARED_QUESTIONS
  };
}
