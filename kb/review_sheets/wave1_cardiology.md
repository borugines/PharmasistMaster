# 🩺 臨床推論知識ベース 確認レビューシート（wave1_cardiology）

- **生成日時**: 2026-11-01
- **KBバージョン**: `2026.11.1`
- **対象Wave**: `wave1_cardiology`（循環器・抗血栓・脂質・甲状腺重点領域）

> [!IMPORTANT]
> 本シートは、各起点薬における**疾患仮説（ガイドライン標準適応＋適応外使用）**・**エビデンスレベル（A/B/C）**・**初期事前確率**・**決定打となる質問/選択肢**の一覧です。内容をご確認いただき、修正が必要な箇所があればご指示ください。

## 1. スピロノラクトン / 選択的MRA (`spironolactone`)
- **カテゴリ**: MRA（ミネラルコルチコイド受容体拮抗薬）
- **登録エイリアス**: スピロノラクトン, アルダクトン, エサキセレノン, ミネブロ, エプレレノン, セララ, spironolactone

| 仮説ID | 疾患・病態名 | 承認区分 | Evidence | 頻度 | 初期事前確率 | Red-Flag | 出典ID | ステータス |
|---|---|---|---|---|---|---|---|---|
| `hf_ref` | **慢性心不全（HFrEF：左室駆出率低下心不全）** | 🟢 guideline | **A** | common | 47.7% | - | `JCS_HF_2025, PMDA_PACKAGE_INSERT` | `approved` |
| `hf_pef` | **慢性心不全（HFpEF：駆出率保持心不全）** | 🟢 guideline | **B** | occasional | 9.5% | - | `JCS_HF_2025, PMDA_PACKAGE_INSERT` | `approved` |
| `pa_adenoma` | **原発性アルドステロン症（PA）** | 🔵 label | **A** | occasional | 15.9% | 🚨 Yes | `JES_PA_2021, JSH_HTN_2019, PMDA_PACKAGE_INSERT` | `approved` |
| `resist_htn` | **治療抵抗性高血圧症** | 🟢 guideline | **A** | occasional | 11.9% | - | `JSH_HTN_2019, PMDA_PACKAGE_INSERT` | `approved` |
| `cirrhosis_ascites` | **肝硬変に伴う難治性腹水** | 🔵 label | **A** | occasional | 7.9% | - | `PMDA_PACKAGE_INSERT` | `approved` |
| `ckd_dm_nephropathy` | **糖尿病性腎症・微量アルブミン尿合併高血圧** | 🟢 guideline | **A** | occasional | 6.4% | - | `JSN_CKD_2023, JDS_DM_2024` | `approved` |
| `spiro_female_acne_offlabel` | **成人女性の難治性尋常性ざ瘡・多毛症（抗アンドロゲン療法［適応外］）** | 🟠 offlabel | **C** | rare | 0.6% | - | `JDA_ACNE_2023, PMDA_PACKAGE_INSERT` | `approved` |

### ❓ 設定されている鑑別質問と重み付け
- **Q1. 処方箋情報：以下の併用薬は含まれていますか？（最も当てはまるものを1つ選択）** *(Cost: 1)*
  - `spiro_opt_4pillars`: エンレスト（ARNI） または メインテート/アーチスト（β遮断薬） ➔ `[hf_ref: +70, hf_pef: +30, pa_adenoma: -35, cirrhosis_ascites: -30, resist_htn: +10, spiro_female_acne_offlabel: -55]`
  - `spiro_opt_loop`: ラシックス / ダイアート / ルプラック（ループ利尿薬） ➔ `[cirrhosis_ascites: +60, hf_pef: +45, hf_ref: +25, pa_adenoma: -25, resist_htn: -10, spiro_female_acne_offlabel: -55]`
  - `spiro_opt_arb_ccb`: アジルバ等のARB ＋ アムロジピン等のCCB（降圧薬2〜3剤併用） ➔ `[pa_adenoma: +70, resist_htn: +55, ckd_dm_nephropathy: +30, hf_ref: -30, cirrhosis_ascites: -30]`
  - `spiro_opt_sglt2`: フォシーガ / ジャディアンス（SGLT2阻害薬） ➔ `[hf_ref: +50, hf_pef: +40, ckd_dm_nephropathy: +45, pa_adenoma: -20]`
  - `spiro_opt_none`: 上記の薬剤は見当たらない / 単独投与 ➔ `[resist_htn: +20, pa_adenoma: +15, spiro_female_acne_offlabel: +85]`
- **Q2. 処方箋情報：スピロノラクトン（またはMRA）の投与量はどれに近いですか？** *(Cost: 1)*
  - `spiro_opt_low_dose`: 12.5mg 〜 25mg / 日（ミネブロなら1.25〜2.5mg）（低用量・心保護用量） ➔ `[hf_ref: +50, hf_pef: +30, ckd_dm_nephropathy: +35, pa_adenoma: -35, cirrhosis_ascites: -30]`
  - `spiro_opt_high_dose`: 50mg 〜 100mg / 日（ミネブロなら5mg）（高用量・利尿/過剰遮断用量） ➔ `[pa_adenoma: +65, cirrhosis_ascites: +55, resist_htn: +35, hf_ref: -40, spiro_female_acne_offlabel: +85]`
  - `spiro_opt_dose_unknown`: 用量が分からない / 処方箋を確認中 ➔ `[]`
- **Q3. 🗣️【患者への問診・主訴】患者さんの自覚症状や訴えはどれに最も近いですか？** *(Cost: 1.5)*
  - `spiro_opt_sym_dyspnea`: 「坂道や階段で息が切れる、夕方に足の甲やすねがむくむ」 ➔ `[hf_ref: +65, hf_pef: +60, pa_adenoma: -30, cirrhosis_ascites: +15, spiro_female_acne_offlabel: -55]`
  - `spiro_opt_sym_weakness`: 「手足に力が入らない・脱力感がある、夜中に足がよくつる（こむら返り）」 ➔ `[pa_adenoma: +80, resist_htn: +20, hf_ref: -25, cirrhosis_ascites: -20]`
  - `spiro_opt_sym_ascites`: 「お腹がパンパンに張って苦しい、短期間で急に体重やお腹周りが増えた」 ➔ `[cirrhosis_ascites: +85, hf_pef: +20, pa_adenoma: -25]`
  - `spiro_opt_sym_htn_only`: 「自覚症状は特にないが、何種類飲んでも血圧が下がらないと言われた」 ➔ `[resist_htn: +60, ckd_dm_nephropathy: +40, pa_adenoma: +25, hf_ref: -20]`
  - `spiro_opt_sym_acne_hirsutism`: 「若年〜成人女性で、抗菌薬や外用薬で治らない頑固な大人ニキビ（ざ瘡）や多毛・FAGAで皮膚科/美容皮膚科から処方された」 ➔ `[spiro_female_acne_offlabel: +95, hf_ref: -45, hf_pef: -45, cirrhosis_ascites: -45, pa_adenoma: -35]`
- **Q4. 🔬【検査値・身体所見】カルテや検査結果で該当する特徴はありますか？** *(Cost: 1.2)*
  - `spiro_opt_lab_hypok`: 血清カリウム（K）が低値（3.5 mEq/L未満）またはPAC/PRA比高値（ARR ≥ 200） ➔ `[pa_adenoma: +85, resist_htn: +15, hf_ref: -35]`
  - `spiro_opt_lab_lvef_low`: 心エコーで駆出率低下（LVEF ≤ 40%）または左室拡大・BNP著明高値 ➔ `[hf_ref: +85, hf_pef: -30, pa_adenoma: -30]`
  - `spiro_opt_lab_lvef_preserved`: 駆出率は正常（LVEF ≥ 50%）だが左室肥大・拡張障害やBNP軽度上昇がある ➔ `[hf_pef: +80, hf_ref: -20, pa_adenoma: -15]`
  - `spiro_opt_lab_proteinuria`: 微量アルブミン尿（30〜299mg/gCr）または尿蛋白陽性・糖尿病合併 ➔ `[ckd_dm_nephropathy: +85, resist_htn: +20, pa_adenoma: -20]`
  - `spiro_opt_lab_unknown`: 検査値情報は手元にない / 分からない ➔ `[]`
  - `spiro_opt_lab_essential_rhtn`: 二次性高血圧（原発性アルドステロン症）は否定済み（ARR正常・血清K正常〜軽度低下）だが、3剤併用でも血圧目標未達 ➔ `[resist_htn: +90, pa_adenoma: -35, hf_ref: -30, cirrhosis_ascites: -35]`

## 2. フォシーガ / ジャディアンス（SGLT2阻害薬） (`dapagliflozin`)
- **カテゴリ**: SGLT2阻害薬（心腎代謝連関薬）
- **登録エイリアス**: フォシーガ, ダパグリフロジン, ジャディアンス, エンパグリフロジン, カナグル, スーグラ, デベルザ, ルセフィ, sglt2

| 仮説ID | 疾患・病態名 | 承認区分 | Evidence | 頻度 | 初期事前確率 | Red-Flag | 出典ID | ステータス |
|---|---|---|---|---|---|---|---|---|
| `hf_hfs_all` | **慢性心不全（HFrEF ＆ HFpEF全般）** | 🔵 label | **A** | common | 33.8% | - | `JCS_HF_2025, JSH_HTN_2019, PMDA_PACKAGE_INSERT` | `approved` |
| `ckd_proteinuria` | **慢性腎臓病（CKD：蛋白尿・アルブミン尿陽性期）** | 🟢 guideline | **A** | common | 28.1% | - | `JSN_CKD_2023, PMDA_PACKAGE_INSERT` | `approved` |
| `dm2_obese` | **2型糖尿病（インスリン抵抗性・肥満・脂肪肝型）** | 🟢 guideline | **A** | common | 28.1% | - | `JDS_DM_2024, PMDA_PACKAGE_INSERT` | `approved` |
| `dm2_elderly` | **2型糖尿病（インスリン分泌不全・非肥満・高齢者型）** | 🟢 guideline | **A** | occasional | 8.4% | 🚨 Yes | `JDS_DM_2024, PMDA_PACKAGE_INSERT` | `approved` |
| `dm1_adjunct` | **1型糖尿病（インスリン併用下のアドオン療法）** | 🔵 label | **A** | rare | 1.5% | 🚨 Yes | `JDS_DM_2024, PMDA_PACKAGE_INSERT` | `approved` |

### ❓ 設定されている鑑別質問と重み付け
- **Q1. 処方箋情報：以下の併用薬は含まれていますか？（最も当てはまるものを選択）** *(Cost: 1)*
  - `sglt2_opt_hf`: エンレスト（ARNI） / メインテート（β遮断薬） / スピロノラクトン（MRA） ➔ `[hf_hfs_all: +75, ckd_proteinuria: +20, dm2_obese: -25, dm2_elderly: -25]`
  - `sglt2_opt_dm_metformin`: メトグルコ（メトホルミン） または DPP-4阻害薬（ジャヌビア/トラゼンタ等） ➔ `[dm2_obese: +70, dm2_elderly: +40, hf_hfs_all: -15, ckd_proteinuria: +15]`
  - `sglt2_opt_ckd_arb`: ニューロタン / オルメテック等のARB単独（血圧高値・尿蛋白陽性） ➔ `[ckd_proteinuria: +70, hf_hfs_all: +20, dm2_obese: -10, dm2_elderly: -10]`
  - `sglt2_opt_insulin`: インスリン頻回注射（ランタス、ノボラピッド等のプレフィルド製剤） ➔ `[dm1_adjunct: +80, dm2_elderly: +30, dm2_obese: +20, hf_hfs_all: -20]`
  - `sglt2_opt_mono`: 上記は見当たらず、SGLT2阻害薬単剤または軽微な処方 ➔ `[dm2_obese: +35, ckd_proteinuria: +25, hf_hfs_all: +20]`
- **Q2. 🗣️【患者への問診・主訴】患者さんの自覚症状や健康課題はどれですか？** *(Cost: 1.5)*
  - `sglt2_opt_sym_hf`: 「坂道で胸が苦しい、動悸・息切れがある、足が夕方むくむ」 ➔ `[hf_hfs_all: +80, ckd_proteinuria: +20, dm2_obese: -25]`
  - `sglt2_opt_sym_obese`: 「体重やお腹周りを落としたいと言われている、健診で脂肪肝を指摘された」 ➔ `[dm2_obese: +80, dm2_elderly: -40, hf_hfs_all: -15]`
  - `sglt2_opt_sym_ckd`: 「自覚症状はないが、健診で尿蛋白や腎臓の数値が悪いと言われた」 ➔ `[ckd_proteinuria: +80, dm2_obese: +10, hf_hfs_all: +10]`
  - `sglt2_opt_sym_elderly`: 「最近食が細く痩せてきた、喉が渇いてトイレがとても近い」 ➔ `[dm2_elderly: +75, dm1_adjunct: +40, dm2_obese: -40]`
- **Q3. 処方箋情報：用量または保険適応上の特徴はどれですか？** *(Cost: 1)*
  - `sglt2_opt_dose_10mg`: フォシーガ 10mg / ジャディアンス 10mg（標準維持量） ➔ `[hf_hfs_all: +50, ckd_proteinuria: +50, dm2_obese: +40]`
  - `sglt2_opt_dose_5mg`: フォシーガ 5mg（開始用量または1型糖尿病適応） ➔ `[dm1_adjunct: +70, dm2_elderly: +40, hf_hfs_all: -20]`
  - `sglt2_opt_dose_skip`: 処方箋の用量詳細は不明 / スキップ ➔ `[]`

## 3. メインテート / β遮断薬 (`bisoprolol`)
- **カテゴリ**: β受容体遮断薬（交感神経抑制・心筋保護薬）
- **登録エイリアス**: メインテート, ビソプロロール, アーチスト, カルベジロール, セロケン, メトプロロール, アルマール, アロチノロール, テノーミン, アテノロール

| 仮説ID | 疾患・病態名 | 承認区分 | Evidence | 頻度 | 初期事前確率 | Red-Flag | 出典ID | ステータス |
|---|---|---|---|---|---|---|---|---|
| `hf_bisop` | **慢性心不全（HFrEF：心拍数管理 ＆ 心筋保護）** | 🟢 guideline | **A** | common | 35.6% | 🚨 Yes | `JCS_HF_2025, JSH_HTN_2019, PMDA_PACKAGE_INSERT` | `approved` |
| `af_rate` | **心房細動（Af：レートコントロール）** | 🟢 guideline | **A** | common | 29.7% | - | `JCS_ARR_2020, PMDA_PACKAGE_INSERT` | `approved` |
| `ihd_angina` | **虚血性心疾患（労作性狭心症 ＆ 心筋梗塞後）** | 🟢 guideline | **A** | common | 23.7% | - | `JCS_CAD_2022, PMDA_PACKAGE_INSERT` | `approved` |
| `hyper_htn` | **交感神経過緊張型高血圧（若年・頻脈性高血圧）** | 🟢 guideline | **B** | occasional | 5.3% | - | `JSH_HTN_2019, PMDA_PACKAGE_INSERT` | `approved` |
| `tremor` | **本態性振戦（手の震え）** | 🟠 offlabel | **B** | rare | 0.9% | - | `PMDA_PACKAGE_INSERT` | `approved` |
| `graves` | **甲状腺機能亢進症（バセドウ病・甲状腺中毒症）** | 🟢 guideline | **A** | occasional | 4.7% | 🚨 Yes | `JTA_THYROID_2023, PMDA_PACKAGE_INSERT` | `approved` |

### ❓ 設定されている鑑別質問と重み付け
- **Q1. 処方箋情報：以下の併用薬は含まれていますか？（最も当てはまるものを選択）** *(Cost: 1)*
  - `biso_opt_hf`: エンレスト（ARNI） / スピロノラクトン（MRA） / フォシーガ（SGLT2i） ➔ `[hf_bisop: +80, af_rate: +15, ihd_angina: +30, hyper_htn: -30, tremor: -40]`
  - `biso_opt_doac`: リクシアナ / エリキュース / イグザレルト（DOAC 抗凝固薬） ➔ `[af_rate: +85, hf_bisop: +25, ihd_angina: +15, hyper_htn: -30, tremor: -40]`
  - `biso_opt_angina`: ニトロペン / アイトロール（硝酸薬） または バイアスピリン＋スタチン ➔ `[ihd_angina: +80, hf_bisop: +35, af_rate: +10, hyper_htn: -10, tremor: -35]`
  - `biso_opt_htn_mono`: アムロジピン（CCB） または ARB（オルメテック等）との併用 ➔ `[hyper_htn: +70, ihd_angina: +20, af_rate: +15, tremor: -20]`
  - `biso_opt_none`: 循環器系薬剤の併用はなく、アルマール等の単剤処方 ➔ `[tremor: +75, graves: +40, hyper_htn: +30]`
- **Q2. 処方箋情報：メインテートの用量はどれですか？** *(Cost: 1)*
  - `biso_opt_low_start`: 0.625mg 〜 1.25mg / 日（極微量〜微量） ➔ `[hf_bisop: +75, af_rate: -20, hyper_htn: -40, ihd_angina: +10]`
  - `biso_opt_mid_dose`: 2.5mg 〜 5mg / 日（標準維持量） ➔ `[af_rate: +55, ihd_angina: +50, hyper_htn: +45, hf_bisop: +35]`
  - `biso_opt_high_dose`: 10mg / 日（心不全最大目標用量 または 難治性頻脈） ➔ `[hf_bisop: +60, af_rate: +45, ihd_angina: +30]`
  - `biso_opt_dose_unknown`: 用量は確認中 / 不明 ➔ `[]`
- **Q3. 🗣️【患者への問診・主訴】患者さんの自覚症状や訴えはどれに最も近いですか？** *(Cost: 1.5)*
  - `biso_opt_sym_arrhythmia`: 「脈が飛ぶ、胸が突然ドキドキしてリズムがバラバラになる感じがする」 ➔ `[af_rate: +85, hf_bisop: +20, ihd_angina: +10, tremor: -40]`
  - `biso_opt_sym_angina`: 「急ぎ足で歩いたり階段を上がると、胸が締め付けられるように痛む」 ➔ `[ihd_angina: +85, hf_bisop: +30, af_rate: +10, tremor: -40]`
  - `biso_opt_sym_tremor`: 「文字を書くときやコップを持つときに、手や指先が小刻みに震える」 ➔ `[tremor: +90, hyper_htn: -20, hf_bisop: -40, af_rate: -40]`
  - `biso_opt_sym_graves`: 「暑がりになった、首の前が腫れている、手が震えて安静時でも脈が速い」 ➔ `[graves: +85, hyper_htn: +30, tremor: +30, hf_bisop: -20]`
  - `biso_opt_sym_htn`: 「健康診断で血圧と脈拍が両方高いと言われた、自覚症状は特にない」 ➔ `[hyper_htn: +75, hf_bisop: -10, tremor: -20]`

## 4. アムロジピン / シルニジピン（CCB） (`amlodipine`)
- **カテゴリ**: ジヒドロピリジン系カルシウム拮抗薬（強力な末梢血管拡張薬）
- **登録エイリアス**: アムロジピン, ノルバスク, アムロジン, シルニジピン, アテレック, ニフェジピン, アダラート, アジルバ配合, ccb

| 仮説ID | 疾患・病態名 | 承認区分 | Evidence | 頻度 | 初期事前確率 | Red-Flag | 出典ID | ステータス |
|---|---|---|---|---|---|---|---|---|
| `htn_elderly` | **本態性高血圧症（高齢者 ＆ 動脈硬化型・収縮期単独高血圧）** | 🟢 guideline | **A** | common | 51.2% | - | `JCS_HF_2025, JSH_HTN_2019, PMDA_PACKAGE_INSERT` | `approved` |
| `vasospastic_angina` | **冠攣縮性狭心症（異型狭心症・冠動脈スパズム）** | 🟢 guideline | **A** | occasional | 22.0% | 🚨 Yes | `JCS_CAD_2022, PMDA_PACKAGE_INSERT` | `approved` |
| `ckd_cilnidipine` | **糖尿病性腎症 ＆ 蛋白尿合併高血圧（交感神経亢進型）** | 🟢 guideline | **A** | occasional | 14.6% | - | `JSN_CKD_2023, JSH_HTN_2019` | `approved` |
| `tachy_htn` | **交感神経活性型高血圧（早朝頻脈合併高血圧）** | 🔵 label | **A** | occasional | 11.0% | - | `JCS_HF_2025, JSH_HTN_2019, PMDA_PACKAGE_INSERT` | `approved` |
| `amlodipine_raynaud_offlabel` | **レイノー症候群・全身性強皮症に伴う末梢循環障害（血管拡張療法［適応外］）** | 🟠 offlabel | **B** | rare | 1.2% | - | `PMDA_PACKAGE_INSERT` | `approved` |

### ❓ 設定されている鑑別質問と重み付け
- **Q1. 処方箋情報：処方されているカルシウム拮抗薬の種類と特徴はどれですか？** *(Cost: 1)*
  - `ccb_opt_amlo`: アムロジピン（ノルバスク/アムロジン） 2.5mg 〜 10mg / 日 ➔ `[htn_elderly: +75, vasospastic_angina: +65, ckd_cilnidipine: -30, tachy_htn: +20, amlodipine_raynaud_offlabel: +50]`
  - `ccb_opt_cilni`: シルニジピン（アテレック） 5mg 〜 20mg / 日 ➔ `[ckd_cilnidipine: +90, tachy_htn: +75, htn_elderly: +40, vasospastic_angina: +30]`
  - `ccb_opt_nife_cr`: ニフェジピンCR（アダラートCR） 20mg 〜 40mg / 日 ➔ `[vasospastic_angina: +80, htn_elderly: +60, ckd_cilnidipine: -20, amlodipine_raynaud_offlabel: +85]`
- **Q2. 処方箋情報：以下の併用薬は含まれていますか？（最も当てはまるものを選択）** *(Cost: 1)*
  - `ccb_opt_nitrate`: ニトロペン舌下錠 / フランドルテープ / アイトロール（硝酸薬） ➔ `[vasospastic_angina: +90, htn_elderly: -20, ckd_cilnidipine: -20]`
  - `ccb_opt_arb_mono`: アジルバ / オルメテック等のARBとの2剤併用（または合剤配合錠） ➔ `[htn_elderly: +75, ckd_cilnidipine: +50, vasospastic_angina: +20]`
  - `ccb_opt_none`: 降圧薬はCCB単剤のみ処方されている ➔ `[htn_elderly: +65, vasospastic_angina: +30, amlodipine_raynaud_offlabel: +85]`
- **Q3. 🗣️【患者への問診・主訴】患者さんの自覚症状や困りごとはどれですか？** *(Cost: 1.5)*
  - `ccb_opt_sym_night_chest`: 「深夜や明け方の寝ている時に、胸が締め付けられるように苦しくなって目が覚める」 ➔ `[vasospastic_angina: +95, htn_elderly: -30, ckd_cilnidipine: -30]`
  - `ccb_opt_sym_no_symptom`: 「胸の痛みは全くなく、上の血圧だけが高いと言われた」 ➔ `[htn_elderly: +80, ckd_cilnidipine: +30, vasospastic_angina: -30, amlodipine_raynaud_offlabel: +50]`
  - `ccb_opt_sym_proteinuria`: 「血圧に加えて尿に蛋白が出ていると言われ、腎臓を保護する薬と言われた」 ➔ `[ckd_cilnidipine: +90, htn_elderly: +30, vasospastic_angina: -20]`
  - `ccb_opt_sym_tachy`: 「血圧が高めなだけでなく、普段から脈が速い（動悸がしやすい）と言われた」 ➔ `[tachy_htn: +95, ckd_cilnidipine: +30, htn_elderly: -20]`
  - `ccb_opt_sym_raynaud`: 「血圧は高くないが、寒い時や冬場に指先が真っ白〜紫色に冷たくしびれる（レイノー現象・膠原病）」 ➔ `[amlodipine_raynaud_offlabel: +95, htn_elderly: -40, vasospastic_angina: -40]`

## 5. フィブラート系（フェノフィブラート / パルモディア / ベザトール） (`fibrate`)
- **カテゴリ**: PPARαアゴニスト（高TG血症改善薬・皮膚科特殊処方）
- **登録エイリアス**: フェノフィブラート, リピディル, トライコア, ペマフィブラート, パルモディア, ベザフィブラート, ベザトール, fibrate, フィブラート

| 仮説ID | 疾患・病態名 | 承認区分 | Evidence | 頻度 | 初期事前確率 | Red-Flag | 出典ID | ステータス |
|---|---|---|---|---|---|---|---|---|
| `eruptive_xanthoma` | **発疹性黄色腫（Eruptive Xanthoma）伴う重症高トリグリセリド血症** | 🔵 label | **A** | occasional | 25.8% | 🚨 Yes | `JCS_HF_2025, JSH_HTN_2019, PMDA_PACKAGE_INSERT` | `approved` |
| `cholestatic_pruritus` | **難治性胆汁うっ滞性皮膚そう痒症（Cholestatic Pruritus） / 結節性痒疹** | 🟠 offlabel | **B** | occasional | 15.5% | - | `PMDA_PACKAGE_INSERT` | `approved` |
| `hyper_tg_severe` | **重症高トリグリセリド血症（急性膵炎ハイリスク・二次予防）** | 🔵 label | **A** | occasional | 25.8% | 🚨 Yes | `JCS_HF_2025, JSH_HTN_2019, PMDA_PACKAGE_INSERT` | `approved` |
| `hyper_tg_metabolic` | **メタボリックシンドロームに伴う混合型高脂血症** | 🔵 label | **A** | occasional | 20.6% | - | `JCS_HF_2025, JSH_HTN_2019, PMDA_PACKAGE_INSERT` | `approved` |
| `pbc_cholestasis` | **原発性胆汁性胆管炎（PBC：UDCA効果不十分例へのベザフィブラート併用［適応外・GL推奨］）** | 🟠 offlabel | **B** | occasional | 12.4% | - | `JSH_PBC_2023, PMDA_PACKAGE_INSERT` | `approved` |

### ❓ 設定されている鑑別質問と重み付け
- **Q1. 処方箋情報：処方元の診療科と主訴（皮疹・症状）はどれですか？** *(Cost: 1.5)*
  - `fib_opt_skin_xanthoma`: 皮膚科処方：背中やお尻、四肢に「黄色〜橙色の小丘疹（ブツブツ）」が多発 ➔ `[eruptive_xanthoma: +95, hyper_tg_severe: +60, cholestatic_pruritus: -40, hyper_tg_metabolic: -50]`
  - `fib_opt_skin_pruritus`: 皮膚科処方：抗ヒスタミン薬が効かない「難治性の激しい全身の痒み」（ベザトール処方） ➔ `[cholestatic_pruritus: +95, pbc_cholestasis: +70, eruptive_xanthoma: -50, hyper_tg_metabolic: -50]`
  - `fib_opt_im_high_tg`: 内科処方：健康診断や生活習慣病での中性脂肪高値（TG 150〜500 mg/dL前後） ➔ `[hyper_tg_metabolic: +90, eruptive_xanthoma: -60, cholestatic_pruritus: -60]`
  - `fib_opt_im_pancreatitis_prev`: 内科処方：過去に「急性膵炎」の既往がある、またはTG > 500〜1000 mg/dL ➔ `[hyper_tg_severe: +90, eruptive_xanthoma: +40, hyper_tg_metabolic: +20]`
- **Q2. 処方箋情報：併用薬や検査値の特徴はどれですか？** *(Cost: 1.2)*
  - `fib_opt_combo_udca`: ウルソ（ウルソデオキシコール酸）が併用されている、またはALP/γ-GTPが著明高値 ➔ `[pbc_cholestasis: +95, cholestatic_pruritus: +85, eruptive_xanthoma: -40]`
  - `fib_opt_combo_dm`: メトホルミンやSGLT2阻害薬、インスリン等の糖尿病治療薬が併用されている ➔ `[eruptive_xanthoma: +65, hyper_tg_severe: +60, hyper_tg_metabolic: +40]`
  - `fib_opt_combo_statin`: スタチン（ロスバスタチン・アトルバスタチン等）が併用されている ➔ `[hyper_tg_metabolic: +60, hyper_tg_severe: +40]`
  - `fib_opt_combo_none`: 特に併用薬はなくフィブラート単剤 ➔ `[eruptive_xanthoma: +30, cholestatic_pruritus: +30, hyper_tg_metabolic: +30]`

## 6. プロパフェノン（プロノン錠） (`propafenone`)
- **カテゴリ**: クラスIc群抗不整脈薬（Naチャネル遮断 ＋ 軽度β遮断作用）
- **登録エイリアス**: プロパフェノン, プロノン, propafenone, プロパフェノン塩酸塩

| 仮説ID | 疾患・病態名 | 承認区分 | Evidence | 頻度 | 初期事前確率 | Red-Flag | 出典ID | ステータス |
|---|---|---|---|---|---|---|---|---|
| `paf_paroxysmal` | **発作性心房細動（Paf）の停止・洞調律維持（Pill-in-the-pocket療法 / 定期予防）** | 🔵 label | **A** | common | 60.0% | - | `JCS_HF_2025, JSH_HTN_2019, PMDA_PACKAGE_INSERT` | `approved` |
| `vpc_ventricular` | **心室性期外収縮（VPC） / 特発性心室頻拍（有症候性・心機能正常例）** | 🔵 label | **A** | occasional | 25.0% | - | `JCS_HF_2025, JSH_HTN_2019, PMDA_PACKAGE_INSERT` | `approved` |
| `proarrhythmia_risk` | **【🚨 処方監査アラート】器質的心疾患（心筋梗塞・低心機能）への催不整脈禁忌リスク** | 🔵 label | **A** | occasional | 15.0% | 🚨 Yes | `JCS_HF_2025, JSH_HTN_2019, PMDA_PACKAGE_INSERT` | `approved` |

### ❓ 設定されている鑑別質問と重み付け
- **Q1. 処方箋情報：処方形態と心電図・不整脈の出現パターンはどれですか？** *(Cost: 1)*
  - `prop_opt_paf_pill`: 発作時に頓服（Pill-in-the-pocket）または定期内服：発作性心房細動（Paf）の動悸発作停止 ➔ `[paf_paroxysmal: +95, vpc_ventricular: -30, proarrhythmia_risk: -50]`
  - `prop_opt_vpc_regular`: 定期内服：心室性期外収縮（VPC）多発による「脈の飛び・胸の詰まり感」の自覚症状改善 ➔ `[vpc_ventricular: +95, paf_paroxysmal: -20, proarrhythmia_risk: -40]`
  - `prop_opt_ihd_history`: 【警戒】：陳旧性心筋梗塞、狭心症、または低心機能（HFrEF）の既往がある患者に処方 ➔ `[proarrhythmia_risk: +95, paf_paroxysmal: +30, vpc_ventricular: +30]`
- **Q2. 処方箋情報：併用薬や心機能の特徴はどれですか？** *(Cost: 1)*
  - `prop_opt_combo_doac`: DOAC（リクシアナ・エリキュース等）が併用されている（心房細動血栓予防） ➔ `[paf_paroxysmal: +85, proarrhythmia_risk: +10]`
  - `prop_opt_combo_cyp2d6`: CYP2D6阻害薬（パロキセチン等）併用、または肝機能障害あり ➔ `[proarrhythmia_risk: +75, paf_paroxysmal: +40]`
  - `prop_opt_combo_none`: 循環器単科での処方、心機能良好で単剤内服 ➔ `[paf_paroxysmal: +40, vpc_ventricular: +40]`

## 7. コララン（イバブラジン塩酸塩錠） (`ivabradine`)
- **カテゴリ**: HCN（If）チャネル選択的遮断薬（サイナスノード特異的純粋心拍数低下薬）
- **登録エイリアス**: コララン, イバブラジン, ivabradine, coralan, イバブラジン塩酸塩

| 仮説ID | 疾患・病態名 | 承認区分 | Evidence | 頻度 | 初期事前確率 | Red-Flag | 出典ID | ステータス |
|---|---|---|---|---|---|---|---|---|
| `hf_sinus_tachy` | **慢性心不全（HFrEF）洞調律頻脈（HR ≥ 75 bpm） / 低血圧フレイル救済レジメン** | 🔵 label | **A** | common | 66.7% | - | `JCS_HF_2025, JSH_HTN_2019, PMDA_PACKAGE_INSERT` | `approved` |
| `af_ineffective_alert` | **【🚨 処方監査アラート】心房細動（Af）への無効処方地雷（洞房結節特異的薬理）** | 🔵 label | **A** | occasional | 16.7% | 🚨 Yes | `JCS_HF_2025, JSH_HTN_2019, PMDA_PACKAGE_INSERT` | `approved` |
| `gfj_interaction_alert` | **【🚨 処方監査アラート】グレープフルーツジュース（GFJ）飲用による重篤徐脈・併用禁忌** | 🔵 label | **A** | occasional | 16.7% | 🚨 Yes | `JCS_HF_2025, JSH_HTN_2019, PMDA_PACKAGE_INSERT` | `approved` |

### ❓ 設定されている鑑別質問と重み付け
- **Q1. 処方箋情報：心電図の「調律（リズム）」と安静時心拍数はどれですか？** *(Cost: 1)*
  - `iva_opt_sinus_tachy`: 洞調律（Sinus Rhythm）かつ「安静時心拍数 ≥ 75回/分」の慢性心不全 ➔ `[hf_sinus_tachy: +95, af_ineffective_alert: -60, gfj_interaction_alert: -30]`
  - `iva_opt_low_bp_frail`: 低血圧（収縮期血圧 90〜100 mmHg）で「β遮断薬をこれ以上増量できない」低血圧フレイル心不全 ➔ `[hf_sinus_tachy: +95, af_ineffective_alert: -50]`
  - `iva_opt_af_rhythm`: 【🚨 処方地雷】：心電図が「心房細動（Af）」の患者に処方されている ➔ `[af_ineffective_alert: +100, hf_sinus_tachy: -50]`
  - `iva_opt_sinus_with_gfj_risk`: 洞調律心不全で導入・維持中だが、柑橘類（グレープフルーツ）摂取やCYP3A4阻害薬（クラリス・アゾール系等）の併用がある ➔ `[gfj_interaction_alert: +95]`
- **Q2. 処方箋情報：併用薬や食事習慣はどれですか？** *(Cost: 1)*
  - `iva_opt_combo_f4`: エンレスト、フォシーガ/ジャディアンス、スピロノラクトン、メインテート（F4）併用 ➔ `[hf_sinus_tachy: +85, gfj_interaction_alert: -20]`
  - `iva_opt_combo_gfj`: 【🚨 併用禁忌】：グレープフルーツジュースを毎日飲む習慣がある、または強力なCYP3A4阻害薬併用 ➔ `[gfj_interaction_alert: +100, hf_sinus_tachy: +20]`
  - `iva_opt_combo_normal`: 特にGFJ飲用はなく、一般的な内服レジメン ➔ `[hf_sinus_tachy: +40]`

## 8. 低用量アスピリン・潰瘍予防配合錠（キャブピリン / タケルダ） (`cabpirin_takeruda`)
- **カテゴリ**: 抗血栓薬・消化性潰瘍再発抑制配合剤（P-CAB/PPI ＋ 抗血小板薬 / 有核二層錠）
- **登録エイリアス**: キャブピリン, タケルダ, キャブピリン配合錠, タケルダ配合錠, ボノプラザン・アスピリン, アスピリン配合錠, lda配合剤, タケキャブ合剤, バイアスピリン合剤, cabpirin, takeruda

| 仮説ID | 疾患・病態名 | 承認区分 | Evidence | 頻度 | 初期事前確率 | Red-Flag | 出典ID | ステータス |
|---|---|---|---|---|---|---|---|---|
| `cabpirin_hx_ulcer_proper` | **キャブピリン配合錠（ボノプラザン10mg＋アスピリン100mg：低用量アスピリン潰瘍再発抑制の至適処方）** | 🔵 label | **A** | occasional | 30.3% | - | `JCS_HF_2025, JSH_HTN_2019, PMDA_PACKAGE_INSERT` | `approved` |
| `cabpirin_crush_alert` | **【🚨 疑義照会必須】：キャブピリン配合錠・タケルダ配合錠の「粉砕調剤・一包化」指示トラップ** | 🔵 label | **A** | occasional | 30.3% | 🚨 Yes | `JCS_HF_2025, JSH_HTN_2019, PMDA_PACKAGE_INSERT` | `approved` |
| `no_ulcer_hx_off_label` | **【🚨 保険査定・返戻リスク】：消化性潰瘍の既往病名なしにおけるキャブピリン・タケルダ投与** | 🟠 offlabel | **C** | occasional | 9.1% | 🚨 Yes | `JCS_HF_2025, JSH_HTN_2019, PMDA_PACKAGE_INSERT` | `approved` |
| `takeruda_ppi_combo` | **タケルダ配合錠（ランソプラザール15mg＋アスピリン100mg：低用量アスピリン＋先行PPI配合錠）** | 🔵 label | **A** | occasional | 30.3% | - | `JCS_HF_2025, JSH_HTN_2019, PMDA_PACKAGE_INSERT` | `approved` |

### ❓ 設定されている鑑別質問と重み付け
- **Q1. 処方箋情報：患者の「消化性潰瘍（胃・十二指腸潰瘍）の既往歴」と選択薬剤はどれですか？** *(Cost: 1.2)*
  - `cab_opt_cabpirin_hx_ulcer`: 胃・十二指腸潰瘍の【既往あり】：再発リスクが高く、CYP2C19に左右されない「キャブピリン配合錠」が処方 ➔ `[cabpirin_hx_ulcer_proper: +95, takeruda_ppi_combo: +40, cabpirin_crush_alert: +20, no_ulcer_hx_off_label: -60]`
  - `cab_opt_takeruda_ppi`: 胃・十二指腸潰瘍の【既往あり】：先行PPI合剤の「タケルダ配合錠（ランソプラザール15mg＋アスピリン100mg）」 ➔ `[takeruda_ppi_combo: +95, cabpirin_hx_ulcer_proper: +40, no_ulcer_hx_off_label: -60]`
  - `cab_opt_no_ulcer_hx_warning`: 【🚨 保険査定リスク】：胃・十二指腸潰瘍の「既往がない」患者への初発予防目的での処方 ➔ `[no_ulcer_hx_off_label: +100, cabpirin_hx_ulcer_proper: -50]`
  - `cab_opt_crush_request_ng`: 【🚨 調剤過誤・大出血リスク】：嚥下困難等により「粉砕調剤」または「一包化」の指示が出ている ➔ `[cabpirin_crush_alert: +100, cabpirin_hx_ulcer_proper: +30]`
- **Q2. 患者背景・臨床的意図：なぜ単剤2剤（タケキャブ10mg＋バイアスピリン）ではなく「配合錠」にするのですか？** *(Cost: 1)*
  - `cab_opt_adherence_polypharmacy`: 服薬アドヒアランス改善：多剤併用（ポリファーマシー）患者で、1日1回1錠にまとめて飲み忘れ・脱落を防止 ➔ `[cabpirin_hx_ulcer_proper: +90, takeruda_ppi_combo: +80]`
  - `cab_opt_dual_layer_release`: 特殊な放出制御（有核二層錠）：外層（胃で即溶性ボノプラザン）➔ 内核（腸溶性アスピリン）のタイムリリース ➔ `[cabpirin_hx_ulcer_proper: +90, cabpirin_crush_alert: +40]`
  - `cab_opt_dose_trap_10mg`: 【用量鑑査】：タケキャブ含有量は「10mg（維持量）」である点を確認（GERD初期治療の20mgとは異なる） ➔ `[cabpirin_hx_ulcer_proper: +85]`

## 9. 甲状腺機能低下症・橋本病（チラージンS / チラーヂンS・レボチロキシンNa補充療法） (`hypothyroidism_levothyroxine`)
- **カテゴリ**: 内分泌代謝疾患（甲状腺ホルモン産生枯渇・自己免疫性慢性甲状腺炎）
- **登録エイリアス**: チラージン, チラージンs, チラージンS, チラージンS錠, チラーヂン, チラーヂンs, チラーヂンS, チラーヂンS錠, レボチロキシン, レボチロキシンナトリウム, レボチロキシンNa, thyradin, levothyroxine, 甲状腺, 橋本病, 甲状腺機能低下症, 粘液水腫, クレチン症, tsh, ft4

| 仮説ID | 疾患・病態名 | 承認区分 | Evidence | 頻度 | 初期事前確率 | Red-Flag | 出典ID | ステータス |
|---|---|---|---|---|---|---|---|---|
| `hypo_levothyroxine_maintenance` | **原発性甲状腺機能低下症（チラーヂンS標準維持療法・橋本病）** | 🔵 label | **A** | common | 55.1% | - | `JCS_HF_2025, JSH_HTN_2019, PMDA_PACKAGE_INSERT` | `approved` |
| `hypo_cardiac_elderly_start` | **高齢者・虚血性心疾患合併甲状腺機能低下症（チラーヂンS超低用量漸増）** | 🔵 label | **A** | common | 33.0% | 🚨 Yes | `JCS_HF_2025, JSH_HTN_2019, PMDA_PACKAGE_INSERT` | `approved` |
| `hypo_interaction_chelate` | **金属イオン・樹脂吸着相互作用鑑査（チラーヂンS吸収阻害防止）** | 🔵 label | **A** | occasional | 11.0% | - | `JCS_HF_2025, JSH_HTN_2019, PMDA_PACKAGE_INSERT` | `approved` |
| `thyroid_trd_augmentation_offlabel` | **治療抵抗性うつ病・双極性うつ病に対する甲状腺ホルモン増強療法（適応外）** | 🟠 offlabel | **B** | rare | 0.9% | - | `JTA_THYROID_2023, PMDA_PACKAGE_INSERT` | `approved` |

### ❓ 設定されている鑑別質問と重み付け
- **Q1. チラージンS / チラーヂンSの処方用量と患者背景：処方されている用量はどれですか？** *(Cost: 1)*
  - `thy_opt_maintenance`: チラージンS / チラーヂンS錠 50〜100μg/日 1日1回（成人の標準的維持量・生涯補充） ➔ `[hypo_levothyroxine_maintenance: +95, hypo_cardiac_elderly_start: -20, thyroid_trd_augmentation_offlabel: +50]`
  - `thy_opt_elderly_low`: チラージンS / チラーヂンS錠 12.5〜25μg/日 1日1回（高齢者・虚血性心疾患合併時の超低用量開始） ➔ `[hypo_cardiac_elderly_start: +95, hypo_levothyroxine_maintenance: -20]`
  - `thy_opt_psych_trd`: 心療内科・精神科処方：抗うつ薬（SSRI/SNRI等）や炭酸リチウム（リーマス）と併用されている ➔ `[thyroid_trd_augmentation_offlabel: +95, hypo_levothyroxine_maintenance: -20]`
  - `thy_opt_chelate_combo_q1`: チラージンSとともに「鉄剤（フェロミア）・酸化マグネシウム・Ca剤・コレバイン」が同時処方されている ➔ `[hypo_interaction_chelate: +95]`
- **Q2. 🚨【重大相互作用・服薬タイミング】併用薬・服薬指導で最優先すべき事項はどれですか？** *(Cost: 1)*
  - `thy_opt_metal_chelate`: 「鉄剤（フェロミア）・カルシウム剤・制酸剤（酸化Mg/アルミ）・コレバインとの併用」 ➔ `[hypo_interaction_chelate: +95, hypo_levothyroxine_maintenance: +50]`
  - `thy_opt_timing_fasting`: 「毎朝、朝食前の空腹時（または起床時）にコップ1杯の水で内服する」 ➔ `[hypo_levothyroxine_maintenance: +90, hypo_cardiac_elderly_start: +90, thyroid_trd_augmentation_offlabel: +85]`
  - `thy_opt_hypo_symptoms`: 「寒がり、皮膚の乾燥、便秘、むくみ、体重増加、だるさ・物忘れなどの低下症状チェック」 ➔ `[hypo_levothyroxine_maintenance: +90]`

## 10. ロサルタン / アジルバ / テルミサルタン（ARB：アンジオテンシンII受容体拮抗薬） (`arb_sartan`)
- **カテゴリ**: 循環器・腎臓・代謝（Wave 1 重点領域）
- **登録エイリアス**: ロサルタン, ニューロタン, アジルバ, アジルサルタン, テルミサルタン, ミカルディス, カンデサルタン, ブロプレス, オルメサルタン, オルメテック, バルサルタン, ディオバン, イルベサルタン, アバプロ, イルベタン

| 仮説ID | 疾患・病態名 | 承認区分 | Evidence | 頻度 | 初期事前確率 | Red-Flag | 出典ID | ステータス |
|---|---|---|---|---|---|---|---|---|
| `arb_htn_standard` | **本態性高血圧症（早朝高血圧・厳格降圧管理）** | 🟢 guideline | **A** | common | 47.0% | - | `JSH_HTN_2019, PMDA_PACKAGE_INSERT` | `approved` |
| `arb_ckd_dkd_proteinuria` | **蛋白尿を伴う慢性腎臓病（CKD）・糖尿病性腎症** | 🟢 guideline | **A** | common | 31.3% | - | `JSN_CKD_2023, JDS_DM_2024, JSH_HTN_2019` | `approved` |
| `arb_htn_hyperuricemia_losartan` | **高尿酸血症・痛風を合併した高血圧症（ロサルタン特異的URAT1阻害）** | 🟢 guideline | **A** | occasional | 10.4% | - | `JSH_HTN_2019, PMDA_PACKAGE_INSERT` | `approved` |
| `arb_hf_chronic` | **慢性心不全（ACE阻害薬忍容性不良・空咳出現例での心筋リモデリング抑制）** | 🟢 guideline | **A** | occasional | 10.4% | - | `JCS_HF_2025, PMDA_PACKAGE_INSERT` | `approved` |
| `losartan_marfan_offlabel` | **マルファン症候群における大動脈基部拡張抑制（TGF-βシグナル阻害［適応外］）** | 🟠 offlabel | **B** | rare | 0.8% | 🚨 Yes | `JCS_CAD_2022, PMDA_PACKAGE_INSERT` | `approved` |

### ❓ 設定されている鑑別質問と重み付け
- **Q1. 処方されているARBの分子（銘柄）と特徴はどれですか？** *(Cost: 1)*
  - `arb_opt_azilsartan`: アジルバ（アジルサルタン）または オルメテック：24時間強力降圧型 ➔ `[arb_htn_standard: +85, arb_ckd_dkd_proteinuria: +35]`
  - `arb_opt_losartan_urat1`: ロサルタン（ニューロタン）：尿酸排泄促進（URAT1阻害）併用・高尿酸合併 ➔ `[arb_htn_hyperuricemia_losartan: +90, arb_ckd_dkd_proteinuria: +40]`
  - `arb_opt_losartan_young_beta`: ロサルタン ＋ β遮断薬（ビソプロロール等）：若年・高身長・正常血圧 ➔ `[losartan_marfan_offlabel: +95]`
  - `arb_opt_candesartan_hf`: カンデサルタン（ブロプレス）等 ＋ β遮断薬 / SGLT2阻害薬 / 利尿薬 ➔ `[arb_hf_chronic: +90, arb_ckd_dkd_proteinuria: +55]`
- **Q2. 🗣️【患者への問診・確認】合併症や検査値の特徴はどれですか？** *(Cost: 1.5)*
  - `arb_opt_pat_proteinuria`: 健診や病院で「尿蛋白が出ている」「腎機能（eGFR）を守るため」と言われている ➔ `[arb_ckd_dkd_proteinuria: +92]`
  - `arb_opt_pat_uric`: 「尿酸値が高い」「痛風の気がある」と言われている（またはフェブリク等併用） ➔ `[arb_htn_hyperuricemia_losartan: +92]`
  - `arb_opt_pat_hf`: 「心臓の筋肉を休ませる薬」「以前別の血圧の薬（ACE阻害薬）で空咳が出た」と言われている ➔ `[arb_hf_chronic: +95]`
  - `arb_opt_pat_htn_morning`: 「朝の血圧が高い」「しっかり血圧を下げましょう」と言われている ➔ `[arb_htn_standard: +90]`
  - `arb_opt_pat_marfan`: 血圧は高くないが「大動脈（心臓の出口の血管）が広がらないように守る薬」と言われている ➔ `[losartan_marfan_offlabel: +95]`
