// ============================================================================
// src/24_wizard_signatures.js
// 疾患特定システム：多剤併用シグネチャ（Co-Prescription Signatures）
// 処方箋内の複数薬剤の組み合わせから、単剤では見えない病態を強力に推論する
// ============================================================================

const WIZARD_COMBO_SIGNATURES = [
  // --- 第1弾：循環器コア・併用シグネチャ ---
  {
    id: 'sig_hfref_fantastic_four',
    name: 'HFrEF 標準治療「ファンタスティック・フォー（GDMT 4本柱）」',
    domain: 'cardiology',
    requiredClasses: ['ARNI_OR_ACEI_ARB', 'BETA_BLOCKER_HF', 'MRA', 'SGLT2I'],
    minMatchClasses: 3,
    keywords: [
      ['エンレスト', 'サクビトリルバルサルタン', 'エナラプリル', 'レニベース', 'ペリンドプリル', 'コバシル', 'カンデサルタン', 'ブロプレス'],
      ['メインテート', 'ビソプロロール', 'アーチスト', 'カルベジロール'],
      ['スピロノラクトン', 'アルダクトン', 'エプレレノン', 'セララ'],
      ['フォシーガ', 'ダパグリフロジン', 'ジャディアンス', 'エンパグリフロジン']
    ],
    boostHypotheses: {
      hf_ref: 3.8,
      hf_sinus_tachy: 2.2
    },
    dampenHypotheses: {
      pa_adenoma: 0.25,
      cirrhosis_ascites: 0.25,
      acne_offlabel: 0.05
    },
    sourceId: 'JCS_HF_2025',
    clinicalNote: '🟢 JCS/JHFS 心不全診療ガイドライン Class I 推奨：左室駆出率の低下した心不全（HFrEF）に対する予後改善4本柱（GDMT）。'
  },
  {
    id: 'sig_hf_congestion_loop_mra',
    name: 'うっ血性心不全（体液貯留是正：ループ利尿薬 ＋ MRA / トルバプタン）',
    domain: 'cardiology',
    minMatchClasses: 2,
    keywords: [
      ['ラシックス', 'フロセミド', 'ダイアート', 'アゾセミド', 'ルプラック', 'トラセミド'],
      ['スピロノラクトン', 'アルダクトン', 'エプレレノン', 'セララ', 'サムスカ', 'トルバプタン'],
      ['メインテート', 'ビソプロロール', 'アーチスト', 'カルベジロール', 'エンレスト', 'ピモベンダン', 'アカルディ']
    ],
    boostHypotheses: {
      hf_ref: 2.6,
      hf_pef: 2.8,
      hf_congestion_loop: 3.2,
      hf_refractory: 3.0
    },
    sourceId: 'JCS_HF_2025',
    clinicalNote: '🟢 ループ利尿薬によるうっ血解除と低K血症予防・抗アルドステロン作用の併用レジメン。'
  },
  {
    id: 'sig_resistant_htn_quad',
    name: '治療抵抗性高血圧 / 原発性アルドステロン症（ARB ＋ CCB ＋ 利尿薬 ＋ MRA）',
    domain: 'cardiology',
    minMatchClasses: 3,
    keywords: [
      ['アジルバ', 'アジルサルタン', 'オルメテック', 'オルメサルタン', 'ミカルディス', 'テルミサルタン', 'ニューロタン', 'ロサルタン', 'バルサルタン', 'ディオバン'],
      ['アムロジピン', 'ノルバスク', 'アダラート', 'ニフェジピン', 'アテレック', 'シルニジピン', 'カルブロック', 'アゼルニジピン'],
      ['スピロノラクトン', 'アルダクトン', 'ミネブロ', 'エサキセレノン', 'セララ', 'エプレレノン'],
      ['フルイトラン', 'トリクロルメチアジド', 'ヒドロクロロチアジド', 'ナトリックス', 'インダパミド', 'ドキサゾシン', 'カルデナリン']
    ],
    boostHypotheses: {
      resist_htn: 3.4,
      pa_adenoma: 3.2,
      severe_htn: 2.5
    },
    sourceId: 'JSH_HTN_2019',
    clinicalNote: '🟢 JSH高血圧治療ガイドライン：3剤併用でも目標未達の治療抵抗性高血圧、または原発性アルドステロン症に対するMRA上乗せ。'
  },
  {
    id: 'sig_af_rate_anticoag',
    name: '非弁膜症性心房細動（DOAC ＋ β遮断薬/ジゴキシンによる抗凝固＋レートコントロール）',
    domain: 'cardiology',
    minMatchClasses: 2,
    keywords: [
      ['エリキュース', 'アピキサバン', 'リクシアナ', 'エドキサバン', 'イグザレルト', 'リバーロキサバン', 'プラザキサ', 'ダビガトラン'],
      ['メインテート', 'ビソプロロール', 'アーチスト', 'カルベジロール', 'ワソラン', 'ベラパミル', 'ジゴシン', 'ジゴキシン']
    ],
    boostHypotheses: {
      af_rate: 3.6,
      nvaf_stroke_prev: 3.5,
      elderly_nvaf: 3.2
    },
    sourceId: 'JCS_ARR_2020',
    clinicalNote: '🟢 JCS不整脈薬物治療ガイドライン：心房細動の心原性脳塞栓予防（DOAC）＋心拍数調節療法。'
  },
  {
    id: 'sig_af_rhythm_pill_in_pocket',
    name: '発作性心房細動（DOAC ＋ Ic群抗不整脈薬によるリズムコントロール）',
    domain: 'cardiology',
    minMatchClasses: 2,
    keywords: [
      ['エリキュース', 'アピキサバン', 'リクシアナ', 'エドキサバン', 'イグザレルト', 'リバーロキサバン', 'プラザキサ', 'ダビガトラン'],
      ['プロノン', 'プロパフェノン', 'タンボコール', 'フレカイニド', 'サンリズム', 'ピルシカイニド', 'リスモダン', 'シベンゾリン']
    ],
    boostHypotheses: {
      paf_paroxysmal: 3.8,
      nvaf_stroke_prev: 3.0
    },
    sourceId: 'JCS_ARR_2020',
    clinicalNote: '🟢 器質的心疾患のない発作性心房細動（PAF）における洞調律維持＋塞栓予防。'
  },
  {
    id: 'sig_cad_pci_dapt_statin',
    name: '冠動脈ステント留置後（PCI後）・急性冠症候群二次予防（DAPT ＋ 高強度スタチン ＋ PPI）',
    domain: 'cardiology',
    minMatchClasses: 3,
    keywords: [
      ['バイアスピリン', 'アスピリン', 'キャブピリン', 'タケルダ'],
      ['エフィエント', 'プラスグレル', 'プラビックス', 'クロピドグレル', 'ブリリンタ', 'チカグレロル'],
      ['クレストール', 'ロスバスタチン', 'リピトール', 'アトルバスタチン', 'リバロ', 'ピタバスタチン', 'ゼチーア', 'エゼチミブ'],
      ['タケキャブ', 'ボノプラザン', 'ネキシウム', 'エソメプラゾール', 'パリエット', 'ラベプラゾール']
    ],
    boostHypotheses: {
      ihd_angina: 3.5,
      lda_ulcer_prev: 3.2,
      cabpirin_hx_ulcer_proper: 3.4,
      acs_post_pci: 4.0
    },
    sourceId: 'JCS_CAD_2022',
    clinicalNote: '🟢 冠動脈ステント留置後のステント血栓症予防（DAPT）＋プラーク安定化（高強度スタチン）＋消化管出血予防（P-CAB/PPI）。'
  },
  {
    id: 'sig_vasospastic_angina_ccb_nitrate',
    name: '冠攣縮性狭心症（Ca拮抗薬 ＋ 硝酸薬/ニコランジル・就寝前または早朝発作予防）',
    domain: 'cardiology',
    minMatchClasses: 2,
    keywords: [
      ['ヘルベッサー', 'ジルチアゼム', 'コニール', 'ベニジピン', 'アムロジピン', 'ノルバスク', 'アダラート', 'ニフェジピン'],
      ['シグマート', 'ニコランジル', 'フランドル', 'アイトロール', '一硝酸イソソルビド', 'ニトロペン', 'ニトログリセリン']
    ],
    boostHypotheses: {
      vasospastic_angina: 3.8,
      ihd_angina: 2.5
    },
    sourceId: 'JCS_CAD_2022',
    clinicalNote: '🟢 JCS冠攣縮性狭心症ガイドライン Class I：Ca拮抗薬を基軸とし、硝酸薬またはニコランジルを併用。'
  },
  {
    id: 'sig_dyslip_intensive_ldl',
    name: 'ハイリスク脂質異常症・家族性高コレステロール血症（スタチン ＋ エゼチミブ）',
    domain: 'cardiology',
    minMatchClasses: 2,
    keywords: [
      ['クレストール', 'ロスバスタチン', 'リピトール', 'アトルバスタチン', 'リバロ', 'ピタバスタチン', 'メバロチン', 'プラバスタチン', 'ロスーゼット', 'アトーゼット'],
      ['ゼチーア', 'エゼチミブ', 'ロスーゼット', 'アトーゼット', 'レパーサ', 'エボロクマブ']
    ],
    boostHypotheses: {
      secondary_prev_statin: 3.5,
      fh_hyperchol: 3.2
    },
    sourceId: 'JAS_DYSLIP_2022',
    clinicalNote: '🟢 動脈硬化性疾患予防ガイドライン：冠動脈疾患二次予防（LDL-C < 70 mg/dL）または高リスク一次予防における小腸コレステロール輸送体阻害薬併用。'
  },
  {
    id: 'sig_ckd_nephroprotection_trinity',
    name: '蛋白尿陽性CKD・糖尿病性腎症の腎保護レジメン（ARB/ACEi ＋ SGLT2阻害薬 ＋ N型CCB/MRA）',
    domain: 'nephrology_cardiology',
    minMatchClasses: 2,
    keywords: [
      ['ニューロタン', 'ロサルタン', 'オルメテック', 'オルメサルタン', 'ミカルディス', 'テルミサルタン', 'アジルバ', 'アジルサルタン', 'ケレンディア', 'フィネレノン'],
      ['フォシーガ', 'ダパグリフロジン', 'ジャディアンス', 'エンパグリフロジン', 'カナグル', 'カナグリフロジン'],
      ['アテレック', 'シルニジピン', 'カルブロック', 'アゼルニジピン', 'ミネブロ', 'エサキセレノン']
    ],
    boostHypotheses: {
      ckd_proteinuria: 3.4,
      ckd_dm_nephropathy: 3.5,
      ckd_cilnidipine: 3.2,
      dkd_albuminuria: 3.4
    },
    sourceId: 'JSN_CKD_2023',
    clinicalNote: '🟢 CKD診療ガイドライン：輸出細動脈拡張（RAS阻害/N型CCB）＋尿細管糸球体フィードバック正常化（SGLT2i）による糸球体高血圧是正。'
  },
  // --- 他領域の代表的シグネチャ ---
  {
    id: 'sig_cirrhosis_ascites_combo',
    name: '非代償性肝硬変・難治性腹水（スピロノラクトン ＋ フロセミド ± トルバプタン ＋ BCAA/ラクツロース）',
    domain: 'gastroenterology',
    minMatchClasses: 2,
    keywords: [
      ['スピロノラクトン', 'アルダクトン', 'サムスカ', 'トルバプタン'],
      ['ラシックス', 'フロセミド', 'ルプラック', 'トラセミド'],
      ['リーバクト', 'アミノレバン', 'モニラック', 'ラクツロース', 'リフキシマ', 'リファキシミン', 'エルカルチン']
    ],
    boostHypotheses: {
      cirrhosis_ascites: 4.0,
      cirrhosis_ascites_v2: 4.0,
      cirrhosis_ammonia: 3.5
    },
    sourceId: 'PMDA_PACKAGE_INSERT',
    clinicalNote: '🔵 肝硬変に伴う二次性アルドステロン症・門脈圧亢進性腹水に対する標準利尿・抗アンモニア療法。'
  },
  {
    id: 'sig_pbc_udca_bezafibrate',
    name: '原発性胆汁性胆管炎（PBC：ウルソデオキシコール酸 ＋ ベザフィブラート［適応外・GL推奨］）',
    domain: 'gastroenterology',
    minMatchClasses: 2,
    keywords: [
      ['ウルソ', 'ウルソデオキシコール酸'],
      ['ベザトール', 'ベザフィブラート', 'フェノフィブラート', 'リピディル']
    ],
    boostHypotheses: {
      pbc_cholestasis: 4.2,
      cholestatic_pruritus: 3.4
    },
    sourceId: 'JSH_PBC_2023',
    clinicalNote: '🟠 日本肝臓学会 PBC診療ガイドライン推奨（適応外）：UDCA効果不十分例に対するベザフィブラート併用。'
  },
  {
    id: 'sig_ra_mtx_folate_steroid',
    name: '関節リウマチ標準アンカー療法（メトトレキサート ＋ フォリアミン ± 低用量プレドニゾロン）',
    domain: 'rheumatology',
    minMatchClasses: 2,
    keywords: [
      ['リウマトレックス', 'メトトレキサート'],
      ['フォリアミン', '葉酸'],
      ['プレドニン', 'プレドニゾロン', 'ケアラム', 'イグラチモド', 'アザルフィジン', 'サラゾスルファピリジン']
    ],
    boostHypotheses: {
      ra_active: 4.2
    },
    sourceId: 'PMDA_PACKAGE_INSERT',
    clinicalNote: '🟢 関節リウマチ診療ガイドライン：MTX週1回投与＋24〜48時間後の葉酸補充＋導入期低用量PSLブリッジング。'
  }
];

/**
 * 処方薬リスト（文字列配列）から合致する併用薬シグネチャを抽出する
 */
function matchComboSignatures(drugNames = []) {
  if (!Array.isArray(drugNames) || drugNames.length < 2) return [];
  const joined = drugNames.join(' ').toLowerCase();
  const matched = [];

  for (const sig of WIZARD_COMBO_SIGNATURES) {
    let matchedClassCount = 0;
    for (const kwGroup of (sig.keywords || [])) {
      const groupHit = kwGroup.some(kw => joined.includes(String(kw).toLowerCase()));
      if (groupHit) matchedClassCount++;
    }
    const minReq = sig.minMatchClasses || 2;
    if (matchedClassCount >= minReq) {
      matched.push({
        ...sig,
        label: sig.name,
        clinicalMeaning: sig.clinicalNote
      });
    }
  }
  return matched;
}

if (typeof window !== 'undefined') {
  window.WIZARD_COMBO_SIGNATURES = WIZARD_COMBO_SIGNATURES;
  window.matchComboSignatures = matchComboSignatures;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { WIZARD_COMBO_SIGNATURES, matchComboSignatures };
}
