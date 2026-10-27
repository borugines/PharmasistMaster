// c:\Users\borug\Antigravity\PharmasistMaster\src\parts\build_bzd_calculator.js
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..', '..');

// 全32成分のマスターデータ
const BZD_DRUGS = [
  // 抗不安薬 (15)
  { id: 'diazepam', name: 'ジアゼパム', brand: 'セルシン / ホリゾン', type: 'anx', typeName: '抗不安薬', duration: '長時間型', t_half: '20〜100h', equiv_5mg: 5.0, potency: 1.0, max_dose: 15.0, unit: 'mg', dep_risk: '中等度', notes: '【等価換算の基準薬・置換の第1選択】半減期が長く代謝物も活性。血中濃度が極めて安定しアシュトン置換の王道。2mg/5mg錠・散剤あり微調整容易。' },
  { id: 'lorazepam', name: 'ロラゼパム', brand: 'ワイパックス', type: 'anx', typeName: '抗不安薬', duration: '中間型', t_half: '12h', equiv_5mg: 1.2, potency: 4.17, max_dose: 3.0, unit: 'mg', dep_risk: '高', notes: 'グルクロン酸抱合のみで代謝（CYP非関与）。肝障害・高齢者に有利だが力価が高く常用量依存・反跳性不安に注意。' },
  { id: 'alprazolam', name: 'アルプラゾラム', brand: 'ソラナックス / コンスタン', type: 'anx', typeName: '抗不安薬', duration: '中間型', t_half: '12〜14h', equiv_5mg: 0.8, potency: 6.25, max_dose: 2.4, unit: 'mg', dep_risk: '極高', notes: 'パニック発作や強い不安に著効するが高力価。反跳性不安・常用量依存が形成されやすく急激な減薬は絶対厳禁。' },
  { id: 'etizolam', name: 'エチゾラム', brand: 'デパス', type: 'anx', typeName: '抗不安薬', duration: '短時間型 (チエノ)', t_half: '6h', equiv_5mg: 1.5, potency: 3.33, max_dose: 3.0, unit: 'mg', dep_risk: '最凶・極高', notes: '強力な抗不安・筋弛緩。血中濃度の谷で不安・首肩こりが再燃。急激中止は反跳性パニック。セルシンやメイラックスへの置換が必須。' },
  { id: 'clotiazepam', name: 'クロチアゼパム', brand: 'リーゼ', type: 'anx', typeName: '抗不安薬', duration: '短時間型 (チエノ)', t_half: '6h', equiv_5mg: 10.0, potency: 0.5, max_dose: 30.0, unit: 'mg', dep_risk: '低〜中等度', notes: '作用がマイルドで切れが良い。自律神経失調症や軽症心身症に汎用。離脱難易度は比較的低い。' },
  { id: 'bromazepam', name: 'ブロマゼパム', brand: 'レキソタン / セニラン', type: 'anx', typeName: '抗不安薬', duration: '中間型', t_half: '20h', equiv_5mg: 4.5, potency: 1.11, max_dose: 15.0, unit: 'mg', dep_risk: '高', notes: '強い抗不安・中枢性筋弛緩作用。緊張型頭痛や心気症に著効。高用量長期連用からの離脱は慎重な漸減が必要。' },
  { id: 'ethyl_loflazepate', name: 'ロフラゼプ酸エチル', brand: 'メイラックス', type: 'anx', typeName: '抗不安薬', duration: '超長時間型', t_half: '122h', equiv_5mg: 2.0, potency: 2.5, max_dose: 2.0, unit: 'mg', dep_risk: '低 (置換推奨)', notes: '【置換離脱の最有力候補】活性代謝物が約5日持続。血中濃度の谷が皆無で離脱症状が最も出にくく置換のゴール薬。' },
  { id: 'cloxazolam', name: 'クロキサゾラム', brand: 'セパゾン', type: 'anx', typeName: '抗不安薬', duration: '中間〜長時間型', t_half: '56h', equiv_5mg: 2.0, potency: 2.5, max_dose: 6.0, unit: 'mg', dep_risk: '中等度', notes: '持続的な抗不安作用。持続時間が長く1日2〜3回投与。' },
  { id: 'fludiazepam', name: 'フルジアゼパム', brand: 'エリスパン', type: 'anx', typeName: '抗不安薬', duration: '長時間型', t_half: '24h', equiv_5mg: 0.75, potency: 6.67, max_dose: 0.75, unit: 'mg', dep_risk: '高', notes: 'ジアゼパムのフッ素化誘導体。極少量で強力な作用。' },
  { id: 'oxazolam', name: 'オキサゾラム', brand: 'セレナール', type: 'anx', typeName: '抗不安薬', duration: '短〜中間型', t_half: '6〜7h', equiv_5mg: 20.0, potency: 0.25, max_dose: 60.0, unit: 'mg', dep_risk: '低', notes: '催眠・筋弛緩が弱く日中の眠気が出にくい。' },
  { id: 'prazepam', name: 'プラゼパム', brand: 'セドレスト', type: 'anx', typeName: '抗不安薬', duration: '長時間型', t_half: '60h', equiv_5mg: 10.0, potency: 0.5, max_dose: 30.0, unit: 'mg', dep_risk: '低〜中等度', notes: '脱アルキル化で活性体に。穏やかに持続。' },
  { id: 'chlordiazepoxide', name: 'クロルジアゼポキシド', brand: 'バランス / コントール', type: 'anx', typeName: '抗不安薬', duration: '長時間型', t_half: '24〜48h', equiv_5mg: 10.0, potency: 0.5, max_dose: 60.0, unit: 'mg', dep_risk: '中等度', notes: '最古のBZD。アルコール離脱せん妄予防にも汎用。' },
  { id: 'clorazepate', name: 'ロラゼプ酸二カリウム', brand: 'メンドン', type: 'anx', typeName: '抗不安薬', duration: '長時間型', t_half: '48h', equiv_5mg: 15.0, potency: 0.33, max_dose: 30.0, unit: 'mg', dep_risk: '低〜中等度', notes: '体内でジアゼパム類似代謝物に変換。徐々に安定。' },
  { id: 'flutazolam', name: 'フルタゾラム', brand: 'サンUserName / コレミナール', type: 'anx', typeName: '抗不安薬', duration: '短時間型', t_half: '3.5h', equiv_5mg: 8.0, potency: 0.625, max_dose: 12.0, unit: 'mg', dep_risk: '低', notes: '自律神経失調症、過敏性腸症候群（IBS）の消化管緊張緩和。' },
  { id: 'tandospirone', name: 'タンドスピロン', brand: 'セディール', type: 'anx_nonbzd', typeName: '非BZD抗不安薬', duration: '超短時間型 (非BZD)', t_half: '1.2h', equiv_5mg: 0, potency: 0, max_dose: 60.0, unit: 'mg', dep_risk: 'なし (0)', notes: '【非ベンゾ・5-HT1A作動薬】耐性・依存・筋弛緩・離脱ゼロ！BZD減量時の不安受け皿薬として極めて有効。' },

  // 睡眠薬 (13)
  { id: 'triazolam', name: 'トリアゾラム', brand: 'ハルシオン', type: 'hyp', typeName: '睡眠薬', duration: '超短時間型', t_half: '2.9h', equiv_5mg: 0.25, potency: 20.0, max_dose: 0.5, unit: 'mg', dep_risk: '最凶・極高', notes: '入眠障害に切れ味最高だが反跳性不眠・早朝覚醒・健忘リスク極大。急断薬厳禁。オレキシン拮抗薬併用で離脱。' },
  { id: 'zolpidem', name: 'ゾルピデム', brand: 'マイスリー', type: 'hyp', typeName: '睡眠薬 (Z-drug)', duration: '超短時間型 (Z-drug)', t_half: '2h', equiv_5mg: 5.0, potency: 1.0, max_dose: 10.0, unit: 'mg', dep_risk: '中等度〜高', notes: 'ω1選択的。筋弛緩少ないが入眠直後の健忘・もうろう状態注意。半錠（2.5mg）またはクービビック置換。' },
  { id: 'zopiclone', name: 'ゾピクロン', brand: 'アモバン', type: 'hyp', typeName: '睡眠薬 (Z-drug)', duration: '超短時間型 (Z-drug)', t_half: '4h', equiv_5mg: 7.5, potency: 0.67, max_dose: 10.0, unit: 'mg', dep_risk: '中等度', notes: '翌朝の唾液分泌苦味。入眠効果強力。ルネスタやデエビゴへの切り替え推奨。' },
  { id: 'eszopiclone', name: 'エスゾピクロン', brand: 'ルネスタ', type: 'hyp', typeName: '睡眠薬 (Z-drug)', duration: '短時間型 (Z-drug)', t_half: '5h', equiv_5mg: 2.0, potency: 2.5, max_dose: 3.0, unit: 'mg', dep_risk: '中等度', notes: 'ゾピクロンのS体。苦味軽減、中途覚醒にも有効。処方日数制限なし。' },
  { id: 'brotizolam', name: 'ブロチゾラム', brand: 'レンドルミン', type: 'hyp', typeName: '睡眠薬', duration: '短時間型 (チエノ)', t_half: '7h', equiv_5mg: 0.25, potency: 20.0, max_dose: 0.5, unit: 'mg', dep_risk: '高', notes: '日本最多処方の睡眠薬。入眠・中途覚醒カバー。半錠割（0.125mg）や隔日投与で段階的漸減。' },
  { id: 'rilmazafone', name: 'リルマザホン', brand: 'リスミー', type: 'hyp', typeName: '睡眠薬', duration: '短時間型 (開環BZD)', t_half: '10h', equiv_5mg: 2.0, potency: 2.5, max_dose: 2.0, unit: 'mg', dep_risk: '低〜中等度', notes: '開環プロドラッグ。自然な眠気で高齢者にも比較的使いやすい。' },
  { id: 'estazolam', name: 'エスタゾラム', brand: 'ユーロジン', type: 'hyp', typeName: '睡眠薬', duration: '中間型', t_half: '24h', equiv_5mg: 2.0, potency: 2.5, max_dose: 4.0, unit: 'mg', dep_risk: '高', notes: '中途覚醒・早朝覚醒に有効。翌朝の持ち越し眠気・高齢者ふらつき注意。' },
  { id: 'nitrazepam', name: 'ニトラゼパム', brand: 'ベンザリン / ネルボン', type: 'hyp', typeName: '睡眠薬', duration: '中間型', t_half: '28h', equiv_5mg: 5.0, potency: 1.0, max_dose: 10.0, unit: 'mg', dep_risk: '高', notes: '催眠・抗てんかん作用。持ち越しと筋弛緩が強く高齢者の転倒骨折注意。' },
  { id: 'flunitrazepam', name: 'フルニトラゼパム', brand: 'サイレース / ロヒプノール', type: 'hyp', typeName: '睡眠薬', duration: '中間型', t_half: '24h', equiv_5mg: 1.0, potency: 5.0, max_dose: 2.0, unit: 'mg', dep_risk: '最凶・極高', notes: '最強睡眠薬。頑固な不眠に著効するが依存・持ち越し極大。青色着色錠。減薬は超長期間かけメイラックス/セルシンへ置換。' },
  { id: 'lormetazepam', name: 'ロルメタゼパム', brand: 'ロラメット / エバミール', type: 'hyp', typeName: '睡眠薬', duration: '短〜中間型', t_half: '10h', equiv_5mg: 1.0, potency: 5.0, max_dose: 2.0, unit: 'mg', dep_risk: '中等度', notes: 'グルクロン酸抱合で排泄（CYP非関与）。肝障害や高齢者に有利。' },
  { id: 'flurazepam', name: 'フルラゼパム', brand: 'ダルメート', type: 'hyp', typeName: '睡眠薬', duration: '長時間型', t_half: '65h', equiv_5mg: 15.0, potency: 0.33, max_dose: 30.0, unit: 'mg', dep_risk: '高', notes: '長時間作用。連用で体内蓄積リスクあり。' },
  { id: 'quazepam', name: 'クアゼパム', brand: 'ドラール', type: 'hyp', typeName: '睡眠薬', duration: '長時間型', t_half: '36h', equiv_5mg: 15.0, potency: 0.33, max_dose: 30.0, unit: 'mg', dep_risk: '中等度〜高', notes: 'ω1選択性高く筋弛緩少ない。早朝覚醒・熟眠障害に有効だが蓄積注意。' },
  { id: 'haloxazolam', name: 'ハロキサゾラム', brand: 'ソメリン', type: 'hyp', typeName: '睡眠薬', duration: '長時間型', t_half: '68h', equiv_5mg: 5.0, potency: 1.0, max_dose: 15.0, unit: 'mg', dep_risk: '高', notes: '催眠・筋弛緩が強く持続時間が長い。翌朝倦怠感。' },

  // 非BZD新規作用機序睡眠薬 (4)
  { id: 'lemborexant', name: 'レンボレキサント', brand: 'デエビゴ', type: 'hyp_nonbzd', typeName: 'オレキシン拮抗薬 (DORA)', duration: '長時間 (DORA)', t_half: '47h', equiv_5mg: 0, potency: 0, max_dose: 10.0, unit: 'mg', dep_risk: 'なし (0)', notes: '【オレキシン拮抗薬】BZD離脱の最有力切り札。依存・反跳性不眠なし。悪夢・金縛りの初期説明必須。' },
  { id: 'daridorexant', name: 'ダリドレキサント', brand: 'クービビック', type: 'hyp_nonbzd', typeName: 'オレキシン拮抗薬 (DORA)', duration: '短〜中間 (DORA)', t_half: '8h', equiv_5mg: 0, potency: 0, max_dose: 50.0, unit: 'mg', dep_risk: 'なし (0)', notes: '【最新オレキシン拮抗薬】半減期約8hで翌朝の持ち越し眠気・ふらつき最小。活動性維持。' },
  { id: 'suvorexant', name: 'スボレキサント', brand: 'ベルソムラ', type: 'hyp_nonbzd', typeName: 'オレキシン拮抗薬 (DORA)', duration: '中間 (DORA)', t_half: '12h', equiv_5mg: 0, potency: 0, max_dose: 20.0, unit: 'mg', dep_risk: 'なし (0)', notes: '【オレキシン拮抗薬】CYP3A4阻害薬（クラリス等）併用禁忌。睡眠構造を壊さない。' },
  { id: 'ramelteon', name: 'ラメルテオン', brand: 'ロゼレム', type: 'hyp_nonbzd', typeName: 'メラトニン作動薬', duration: '超短時間 (メラトニン)', t_half: '1h', equiv_5mg: 0, potency: 0, max_dose: 8.0, unit: 'mg', dep_risk: 'なし (0)', notes: '【メラトニン受容体作動薬】体内時計同調。依存ゼロ。フルボキサミン併用禁忌。' }
];

function generateBzdHtml() {
  return `    <!-- 睡眠薬・BZD 減量・離脱（脱ベンゾ）プロトコル ＆ ジアゼパム等価換算計算機 -->
    <div id="comp-bzd-deprescribing" class="sub-banner banner-within" style="margin-top:28px; background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%); color:#ffffff; padding: 18px 22px; border-radius: 12px; box-shadow: 0 4px 14px rgba(49, 46, 129, 0.3);">
      <div style="font-size: 1.25rem; font-weight: 800; display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
        <span style="font-size: 1.5rem;">⚡</span>
        <span>【ベンゾジアゼピン完全攻略】ジアゼパム等価換算 ＆ アシュトン漸減シミュレータ</span>
        <span style="background: rgba(255,255,255,0.22); font-size: 0.72rem; padding: 3px 9px; border-radius: 999px; font-weight: 600; letter-spacing: 0.03em;">稲垣・稲田式2021 / Ashton Manual / 厚労省指針</span>
      </div>
      <div style="font-size: 0.88rem; color: #e0e7ff; margin-top: 6px; line-height: 1.55;">
        抗不安薬・睡眠薬（非ベンゾZ-drug含む）<strong>全32成分の力価等価換算</strong>・<strong>多剤投与制限（診療報酬3剤以上減算アラート）</strong>・<strong>ジアゼパム/メイラックス置換減薬スケジュール自動生成</strong>
      </div>
    </div>

    <!-- 臨床の掟 ＆ 診療報酬多剤制限サマリー -->
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(290px, 1fr)); gap:12px; margin: 14px 0 18px 0;">
      <div style="background:#fff1f2; border:1px solid #fecdd3; border-left:4px solid #e11d48; border-radius:8px; padding:12px 14px;">
        <strong style="color:#9f1239; font-size:0.9rem; display:flex; align-items:center; gap:6px;">
          <span>🚨</span> 診療報酬上の多剤投与制限（算定不可ルール）
        </strong>
        <ul style="margin:6px 0 0 16px; padding:0; font-size:0.8rem; color:#881337; line-height:1.5;">
          <li><strong>抗不安薬：1処方3種類以上</strong> ➔ 処方料・処方箋料・調剤料が大幅減算！</li>
          <li><strong>睡眠薬：1処方3種類以上</strong> ➔ 同様に大幅減算！</li>
          <li><strong>抗不安薬＋睡眠薬：合算4種類以上</strong> ➔ 原則算定不可（精神科減算）</li>
          <li>※臨時の頓服や、減薬計画を記載した明細書（様式40）添付時等を除く。</li>
        </ul>
      </div>

      <div style="background:#eff6ff; border:1px solid #bfdbfe; border-left:4px solid #2563eb; border-radius:8px; padding:12px 14px;">
        <strong style="color:#1e40af; font-size:0.9rem; display:flex; align-items:center; gap:6px;">
          <span>🛡️</span> アシュトン・マニュアルの原則（急断薬厳禁）
        </strong>
        <ul style="margin:6px 0 0 16px; padding:0; font-size:0.8rem; color:#1e3a8a; line-height:1.5;">
          <li>短時間・高力価薬（デパス、ハルシオン、ソラナックス等）の急激中止は<strong>反跳性パニック・激的不眠・振戦・痙攣</strong>の危険！</li>
          <li>血中濃度が最もフラットな<strong>ジアゼパム（半減期20〜100h）</strong>または<strong>メイラックス（半減期122h）</strong>へ等価置換。</li>
          <li>置換後に<strong>1〜2週間ごとに10〜25%ずつ</strong>超微量漸減するのが鉄則。</li>
        </ul>
      </div>

      <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-left:4px solid #16a34a; border-radius:8px; padding:12px 14px;">
        <strong style="color:#166534; font-size:0.9rem; display:flex; align-items:center; gap:6px;">
          <span>🔄</span> 非BZD新規受容体作動薬への先行移行
        </strong>
        <ul style="margin:6px 0 0 16px; padding:0; font-size:0.8rem; color:#14532d; line-height:1.5;">
          <li><strong>オレキシン受容体拮抗薬（クービビック、デエビゴ）：</strong>依存・反跳性不眠皆無。覚醒系を抑えるため先行併用でBZDを安全に減量可能。</li>
          <li><strong>メラトニン受容体作動薬（ロゼレム）：</strong>体内時計同調。</li>
          <li><strong>5-HT1A作動薬（セディール）：</strong>GABA非作用で依存ゼロ。抗不安薬減量の受け皿に最適。</li>
        </ul>
      </div>
    </div>

    <!-- ==========================================================================
         ⚡ インタラクティブ計算機：ジアゼパム等価換算 ＆ アシュトン漸減シミュレータ
         ========================================================================== -->
    <div id="bzd-calculator-card" style="background:#ffffff; border:2px solid #6366f1; border-radius:12px; padding:18px 20px; margin-bottom:24px; box-shadow:0 8px 20px rgba(99, 102, 241, 0.12);">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:14px; border-bottom:1.5px solid #e2e8f0; padding-bottom:10px;">
        <div>
          <h3 style="margin:0; font-size:1.15rem; color:#1e1b4b; font-weight:800; display:flex; align-items:center; gap:8px;">
            <span style="font-size:1.3rem;">🧮</span> ジアゼパム等価換算 ＆ 多剤判定 ＆ 漸減スケジュール計算機
          </h3>
          <div style="font-size:0.8rem; color:#64748b; margin-top:2px;">
            服用中の薬剤と1日量を入力すると、即座に総ジアゼパム換算力価・保険適正・減薬手順をシミュレーションします
          </div>
        </div>

        <!-- 典型処方プリセットボタン -->
        <div style="display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
          <span style="font-size:0.75rem; font-weight:700; color:#475569;">処方モデル：</span>
          <button type="button" class="btn" onclick="setBzdPreset('depas')" style="padding:4px 8px; font-size:0.75rem; background:#fee2e2; color:#991b1b; border:1px solid #f87171; border-radius:6px; cursor:pointer;">
            💊 デパス依存例 (0.5mg 3T)
          </button>
          <button type="button" class="btn" onclick="setBzdPreset('hal_my')" style="padding:4px 8px; font-size:0.75rem; background:#fef3c7; color:#92400e; border:1px solid #fcd34d; border-radius:6px; cursor:pointer;">
            🛌 睡眠薬2剤重層例 (ハルシオン+マイスリー)
          </button>
          <button type="button" class="btn" onclick="setBzdPreset('poly')" style="padding:4px 8px; font-size:0.75rem; background:#fce7f3; color:#9d174d; border:1px solid #f472b6; border-radius:6px; cursor:pointer;">
            🚨 3剤多剤警告例 (ワイパ+サイレース+レンド)
          </button>
          <button type="button" class="btn" onclick="setBzdPreset('elderly')" style="padding:4px 8px; font-size:0.75rem; background:#e0e7ff; color:#3730a3; border:1px solid #818cf8; border-radius:6px; cursor:pointer;">
            👴 高齢者ふらつき例 (ベンザリン+ソラナックス)
          </button>
          <button type="button" class="btn" onclick="setBzdPreset('clear')" style="padding:4px 8px; font-size:0.75rem; background:#f1f5f9; color:#475569; border:1px solid #cbd5e1; border-radius:6px; cursor:pointer;">
            🔄 クリア
          </button>
        </div>
      </div>

      <!-- 処方入力テーブル -->
      <div style="overflow-x:auto; margin-bottom:12px;">
        <table style="width:100%; border-collapse:collapse; font-size:0.85rem;">
          <thead>
            <tr style="background:#f8fafc; border-bottom:2px solid #cbd5e1;">
              <th style="padding:8px 10px; text-align:left; width:34%;">処方薬剤（成分名 / 商品名）</th>
              <th style="padding:8px 10px; text-align:center; width:18%;">1日服用量 (mg)</th>
              <th style="padding:8px 10px; text-align:center; width:16%;">5mg等価用量</th>
              <th style="padding:8px 10px; text-align:center; width:12%;">力価比</th>
              <th style="padding:8px 10px; text-align:center; width:14%;">DZP換算量</th>
              <th style="padding:8px 10px; text-align:center; width:6%;">削除</th>
            </tr>
          </thead>
          <tbody id="bzd-calc-rows">
            <!-- JavaScriptで動的生成 -->
          </tbody>
        </table>
      </div>

      <div style="margin-bottom:16px;">
        <button type="button" class="btn" onclick="addBzdRow()" style="padding:6px 14px; font-size:0.82rem; background:#4f46e5; color:white; border:none; border-radius:6px; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:6px;">
          <span>➕</span> 処方薬剤を追加する
        </button>
      </div>

      <!-- リアルタイム計算結果ダッシュボード -->
      <div style="background:#f8fafc; border:1.5px solid #cbd5e1; border-radius:10px; padding:16px; margin-bottom:14px;">
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; align-items:center;">
          <!-- 左側：総ジアゼパム換算用量 -->
          <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; padding:14px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <div style="font-size:0.8rem; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.04em;">
              TOTAL DIAZEPAM EQUIVALENT DOSING
            </div>
            <div style="display:flex; align-items:baseline; gap:8px; margin:6px 0;">
              <span id="bzd-total-val" style="font-size:2.4rem; font-weight:900; color:#1e1b4b; line-height:1;">0.0</span>
              <span style="font-size:1.05rem; font-weight:700; color:#475569;">mg / 日</span>
            </div>
            <div id="bzd-risk-badge" style="display:inline-block; padding:4px 10px; border-radius:999px; font-size:0.78rem; font-weight:800; background:#dcfce7; color:#15803d;">
              🟢 軽度負荷（低用量）
            </div>
            <div id="bzd-risk-desc" style="font-size:0.78rem; color:#64748b; margin-top:6px; line-height:1.45;">
              ジアゼパム換算5mg以下。常用量の範囲内であり、適切な漸減で安全に離脱可能。
            </div>
          </div>

          <!-- 右側：診療報酬多剤算定判定 -->
          <div id="bzd-audit-panel" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; padding:14px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <div style="font-size:0.8rem; font-weight:700; color:#64748b; margin-bottom:6px;">
              📋 診療報酬・多剤投与チェック（2024改定対応）
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; text-align:center; margin-bottom:8px;">
              <div style="background:#f1f5f9; padding:6px; border-radius:6px;">
                <div style="font-size:0.7rem; color:#64748b;">抗不安薬</div>
                <div id="bzd-count-anx" style="font-size:1.1rem; font-weight:800; color:#1e293b;">0 剤</div>
              </div>
              <div style="background:#f1f5f9; padding:6px; border-radius:6px;">
                <div style="font-size:0.7rem; color:#64748b;">睡眠薬</div>
                <div id="bzd-count-hyp" style="font-size:1.1rem; font-weight:800; color:#1e293b;">0 剤</div>
              </div>
              <div style="background:#f1f5f9; padding:6px; border-radius:6px;">
                <div style="font-size:0.7rem; color:#64748b;">BZD系合算</div>
                <div id="bzd-count-total" style="font-size:1.1rem; font-weight:800; color:#1e293b;">0 剤</div>
              </div>
            </div>
            <div id="bzd-audit-msg" style="font-size:0.78rem; line-height:1.45; color:#16a34a; font-weight:700;">
              ✅ 3剤制限・多剤減算ルールに抵触していません。
            </div>
          </div>
        </div>

        <!-- 警告メッセージバナー（過量または多剤時） -->
        <div id="bzd-warning-banner" style="display:none; margin-top:12px; padding:10px 14px; background:#fef2f2; border:1.5px solid #ef4444; border-radius:8px; font-size:0.82rem; color:#991b1b; line-height:1.5;">
          <!-- JSで警告出力 -->
        </div>
      </div>

      <!-- アシュトン・マニュアル式 漸減スケジュール展開 -->
      <div style="background:#f0fdfa; border:1.5px solid #99f6e4; border-radius:10px; padding:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:10px;">
          <h4 style="margin:0; font-size:0.98rem; color:#0f766e; font-weight:800; display:flex; align-items:center; gap:6px;">
            <span>📅</span> アシュトン・マニュアル式 推奨置換 ＆ 漸減スケジュール（自動生成）
          </h4>
          <div style="font-size:0.78rem; color:#115e59; font-weight:600;">
            推奨置換薬：<strong>セルシン / ホリゾン（ジアゼパム）</strong> または <strong>メイラックス（ロフラゼプ酸）</strong>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:10px; margin-bottom:12px;">
          <div style="background:white; border-left:3.5px solid #0d9488; padding:8px 12px; border-radius:6px;">
            <div style="font-size:0.72rem; color:#64748b; font-weight:700;">STEP 1: 導入期 (1〜2週目)</div>
            <div id="ashton-step1-title" style="font-size:0.85rem; font-weight:800; color:#0f766e; margin:2px 0;">夜間用量の50%を置換</div>
            <div id="ashton-step1-desc" style="font-size:0.76rem; color:#334155; line-height:1.4;">
              不眠がある場合はオレキシン拮抗薬（クービビック50mg/デエビゴ5mg）を先行併用。夜間の短時間薬半分をジアゼパムに置換。
            </div>
          </div>

          <div style="background:white; border-left:3.5px solid #0284c7; padding:8px 12px; border-radius:6px;">
            <div style="font-size:0.72rem; color:#64748b; font-weight:700;">STEP 2: 完全統一期 (3〜4週目)</div>
            <div id="ashton-step2-title" style="font-size:0.85rem; font-weight:800; color:#0369a1; margin:2px 0;">全量をジアゼパムに一本化</div>
            <div id="ashton-step2-desc" style="font-size:0.76rem; color:#334155; line-height:1.4;">
              朝・昼の薬もすべてジアゼパムへ置換。短時間薬の血中濃度急降下が消え、精神状態が安定するまで2週間維持。
            </div>
          </div>

          <div style="background:white; border-left:3.5px solid #7c3aed; padding:8px 12px; border-radius:6px;">
            <div style="font-size:0.72rem; color:#64748b; font-weight:700;">STEP 3: 漸減期 (5週目〜)</div>
            <div id="ashton-step3-title" style="font-size:0.85rem; font-weight:800; color:#6d28d9; margin:2px 0;">1〜2週ごとに10〜20%減量</div>
            <div id="ashton-step3-desc" style="font-size:0.76rem; color:#334155; line-height:1.4;">
              用量に応じて1〜2mg刻みで減量。終盤（5mg以下）は散剤・錠剤半割で0.5mg単位の超微量減量を実施。
            </div>
          </div>

          <div style="background:white; border-left:3.5px solid #16a34a; padding:8px 12px; border-radius:6px;">
            <div style="font-size:0.72rem; color:#64748b; font-weight:700;">STEP 4: 離脱完了</div>
            <div id="ashton-step4-title" style="font-size:0.85rem; font-weight:800; color:#15803d; margin:2px 0;">隔日服用 ➔ 終薬</div>
            <div id="ashton-step4-desc" style="font-size:0.76rem; color:#334155; line-height:1.4;">
              1mg/0.5mgまで減らせたら2日に1回、3日に1回と間隔を空け、離脱症状がないことを確認して完全終了！
            </div>
          </div>
        </div>

        <div style="background:white; border:1px solid #ccfbf1; border-radius:6px; padding:10px 14px; font-size:0.78rem; color:#134e4a; line-height:1.5;">
          <strong>💡 薬局窓口での指導・トレーシングレポート（服薬情報提供書）のポイント：</strong><br>
          「患者さんが勝手に半分に割って失敗した」「薬が切れると不安で仕方ない」という訴えは、短時間型の反跳症状です。
          『ジアゼパム等価換算で現在○mg相当であり、半減期の長いメイラックスやセルシンへの置換、およびオレキシン拮抗薬（クービビック等）の先行併用による漸減プロトコル』を主治医へ疑義照会・処方提案することで、安全かつ確実な脱ベンゾを支援できます。
        </div>
      </div>
    </div>

    <!-- ==========================================================================
         📚 全32成分完全網羅！ジアゼパム等価換算・力価・半減期マトリクス（完全チートシート）
         ========================================================================== -->
    <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:18px 20px; box-shadow:0 2px 8px rgba(0,0,0,0.04); margin-bottom:28px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:14px;">
        <div>
          <h3 style="margin:0; font-size:1.1rem; color:#1e293b; font-weight:800; display:flex; align-items:center; gap:8px;">
            <span>📖</span> BZD受容体作動薬 全32成分 等価換算 ＆ 薬物動態完全チートシート
          </h3>
          <div style="font-size:0.78rem; color:#64748b; margin-top:2px;">
            抗不安薬15種 ＋ 睡眠薬13種 ＋ 非BZD置換受け皿薬4種（力価比・半減期・最高用量・臨床メモ網羅）
          </div>
        </div>

        <!-- 絞り込みフィルター＆検索 -->
        <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
          <div style="display:flex; gap:4px; background:#f1f5f9; padding:3px; border-radius:8px;">
            <button type="button" class="btn bzd-filter-btn active" onclick="filterBzdTable('all', this)" style="padding:4px 10px; font-size:0.75rem; border-radius:6px; font-weight:700; border:none; background:#ffffff; color:#1e293b; box-shadow:0 1px 2px rgba(0,0,0,0.1); cursor:pointer;">
              すべて (32)
            </button>
            <button type="button" class="btn bzd-filter-btn" onclick="filterBzdTable('anx', this)" style="padding:4px 10px; font-size:0.75rem; border-radius:6px; font-weight:700; border:none; background:transparent; color:#64748b; cursor:pointer;">
              抗不安薬 (15)
            </button>
            <button type="button" class="btn bzd-filter-btn" onclick="filterBzdTable('hyp', this)" style="padding:4px 10px; font-size:0.75rem; border-radius:6px; font-weight:700; border:none; background:transparent; color:#64748b; cursor:pointer;">
              睡眠薬 (13)
            </button>
            <button type="button" class="btn bzd-filter-btn" onclick="filterBzdTable('nonbzd', this)" style="padding:4px 10px; font-size:0.75rem; border-radius:6px; font-weight:700; border:none; background:transparent; color:#64748b; cursor:pointer;">
              置換受け皿 (4)
            </button>
          </div>
          <input type="text" id="bzd-search-filter" oninput="searchBzdTable(this.value)" placeholder="🔍 薬品名・一般名で検索..." style="padding:5px 10px; font-size:0.78rem; border:1px solid #cbd5e1; border-radius:6px; width:160px;">
        </div>
      </div>

      <div style="overflow-x:auto;">
        <table id="bzd-master-table" style="width:100%; border-collapse:collapse; font-size:0.82rem;">
          <thead>
            <tr style="background:#1e293b; color:white;">
              <th style="padding:8px 10px; text-align:left; width:16%;">一般名 / 代表先発品名</th>
              <th style="padding:8px 10px; text-align:center; width:12%;">分類・作用時間</th>
              <th style="padding:8px 10px; text-align:center; width:9%;">半減期 (t1/2)</th>
              <th style="padding:8px 10px; text-align:center; width:11%;">DZP 5mg<br>等価用量</th>
              <th style="padding:8px 10px; text-align:center; width:8%;">力価比</th>
              <th style="padding:8px 10px; text-align:center; width:10%;">1日常用上限</th>
              <th style="padding:8px 10px; text-align:center; width:10%;">依存・離脱リスク</th>
              <th style="padding:8px 10px; text-align:left; width:18%;">臨床の要点 ＆ 減薬置換メモ</th>
              <th style="padding:8px 10px; text-align:center; width:6%;">計算</th>
            </tr>
          </thead>
          <tbody>
${BZD_DRUGS.map((d, idx) => {
  let badgeBg = '#f1f5f9';
  let badgeCol = '#475569';
  if (d.type === 'anx') { badgeBg = '#ede9fe'; badgeCol = '#6d28d9'; }
  else if (d.type === 'hyp') { badgeBg = '#e0f2fe'; badgeCol = '#0369a1'; }
  else { badgeBg = '#dcfce7'; badgeCol = '#15803d'; }

  let riskColor = '#475569';
  if (d.dep_risk.includes('最凶')) riskColor = '#b91c1c';
  else if (d.dep_risk.includes('極高')) riskColor = '#c2410c';
  else if (d.dep_risk.includes('高')) riskColor = '#b45309';
  else if (d.dep_risk.includes('なし')) riskColor = '#15803d';

  const rowBg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
  const equivText = d.equiv_5mg > 0 ? `<strong>${d.equiv_5mg} mg</strong>` : '<span style="color:#64748b; font-size:0.75rem;">非BZD (対象外)</span>';
  const potencyText = d.potency > 0 ? `${d.potency} 倍` : '-';

  return `            <tr class="bzd-master-row" data-type="${d.type}" data-name="${d.name} ${d.brand}" style="background:${rowBg}; border-bottom:1px solid #e2e8f0;">
              <td style="padding:8px 10px;">
                <span style="display:inline-block; font-size:0.68rem; padding:1px 6px; border-radius:4px; background:${badgeBg}; color:${badgeCol}; font-weight:700; margin-bottom:2px;">${d.typeName}</span><br>
                <strong style="color:#0f172a; font-size:0.86rem;">${d.brand}</strong><br>
                <span style="color:#64748b; font-size:0.75rem;">（${d.name}）</span>
              </td>
              <td style="padding:8px 10px; text-align:center; font-size:0.78rem;">${d.duration}</td>
              <td style="padding:8px 10px; text-align:center; font-weight:700; color:#334155; font-size:0.8rem;">${d.t_half}</td>
              <td style="padding:8px 10px; text-align:center; font-size:0.85rem;">${equivText}</td>
              <td style="padding:8px 10px; text-align:center; font-weight:700; color:#475569; font-size:0.78rem;">${potencyText}</td>
              <td style="padding:8px 10px; text-align:center; font-size:0.78rem;">${d.max_dose} ${d.unit}</td>
              <td style="padding:8px 10px; text-align:center; font-weight:800; color:${riskColor}; font-size:0.78rem;">${d.dep_risk}</td>
              <td style="padding:8px 10px; font-size:0.75rem; color:#334155; line-height:1.4;">${d.notes}</td>
              <td style="padding:8px 10px; text-align:center;">
                <button type="button" class="btn" onclick="addBzdFromTable('${d.id}')" title="計算機に入力行を追加" style="padding:3px 7px; font-size:0.72rem; background:#6366f1; color:white; border:none; border-radius:4px; cursor:pointer; font-weight:700;">
                  ＋追加
                </button>
              </td>
            </tr>`;
}).join('\n')}
          </tbody>
        </table>
      </div>
    </div>`;
}

function generateBzdJs() {
  return `
/* ==========================================================================
   ⚡ ジアゼパム等価換算 ＆ アシュトン漸減シミュレータ MASTER ENGINE
   ========================================================================== */
const DIAZEPAM_EQUIVALENT_MASTER = ${JSON.stringify(BZD_DRUGS, null, 2)};

let bzdRowCount = 0;

function initBzdCalculator() {
  const container = document.getElementById('bzd-calc-rows');
  if (!container) return;
  // 初期プリセット：デパス 0.5mg 3錠 (1.5mg/日)
  setBzdPreset('depas');
}

function renderBzdOptions(selectedId) {
  let anxGroup = '<optgroup label="【抗不安薬】">';
  let hypGroup = '<optgroup label="【睡眠薬】">';
  let nonbzdGroup = '<optgroup label="【非BZD置換受け皿薬】">';

  DIAZEPAM_EQUIVALENT_MASTER.forEach(d => {
    const isSel = d.id === selectedId ? 'selected' : '';
    const opt = \`<option value="\${d.id}" \${isSel}>\${d.brand}（\${d.name}）[\${d.duration}]\` + (d.equiv_5mg > 0 ? \` - 5mg換算:\${d.equiv_5mg}mg\` : '') + \`</option>\`;
    if (d.type.startsWith('anx')) {
      if (d.type === 'anx_nonbzd') nonbzdGroup += opt;
      else anxGroup += opt;
    } else if (d.type.startsWith('hyp')) {
      if (d.type === 'hyp_nonbzd') nonbzdGroup += opt;
      else hypGroup += opt;
    }
  });

  anxGroup += '</optgroup>';
  hypGroup += '</optgroup>';
  nonbzdGroup += '</optgroup>';

  return anxGroup + hypGroup + nonbzdGroup;
}

function addBzdRow(drugId = 'etizolam', dose = 1.5) {
  const container = document.getElementById('bzd-calc-rows');
  if (!container) return;

  bzdRowCount++;
  const rowId = 'bzd-row-' + bzdRowCount;

  const tr = document.createElement('tr');
  tr.id = rowId;
  tr.className = 'bzd-calc-input-row';
  tr.style.borderBottom = '1px solid #e2e8f0';

  tr.innerHTML = \`
    <td style="padding:6px 8px;">
      <select class="bzd-drug-select" onchange="updateBzdCalculation()" style="width:100%; padding:5px 8px; font-size:0.82rem; border:1px solid #cbd5e1; border-radius:6px; background:#ffffff;">
        \${renderBzdOptions(drugId)}
      </select>
    </td>
    <td style="padding:6px 8px; text-align:center;">
      <input type="number" step="0.05" min="0" value="\${dose}" class="bzd-dose-input" oninput="updateBzdCalculation()" style="width:85px; padding:5px 8px; font-size:0.85rem; font-weight:700; text-align:center; border:1.5px solid #94a3b8; border-radius:6px;">
    </td>
    <td class="bzd-row-equiv" style="padding:6px 8px; text-align:center; font-size:0.82rem; color:#475569;">-</td>
    <td class="bzd-row-potency" style="padding:6px 8px; text-align:center; font-size:0.82rem; font-weight:700; color:#475569;">-</td>
    <td class="bzd-row-dzp" style="padding:6px 8px; text-align:center; font-size:0.92rem; font-weight:900; color:#1e1b4b;">-</td>
    <td style="padding:6px 8px; text-align:center;">
      <button type="button" onclick="removeBzdRow('\${rowId}')" title="この薬剤を削除" style="background:#fee2e2; color:#ef4444; border:none; border-radius:4px; width:26px; height:26px; font-weight:800; cursor:pointer;">✕</button>
    </td>
  \`;

  container.appendChild(tr);
  updateBzdCalculation();
}

function removeBzdRow(rowId) {
  const row = document.getElementById(rowId);
  if (row) {
    row.remove();
    updateBzdCalculation();
  }
}

function setBzdPreset(presetKey) {
  const container = document.getElementById('bzd-calc-rows');
  if (!container) return;
  container.innerHTML = '';

  if (presetKey === 'depas') {
    addBzdRow('etizolam', 1.5);
  } else if (presetKey === 'hal_my') {
    addBzdRow('triazolam', 0.25);
    addBzdRow('zolpidem', 10.0);
  } else if (presetKey === 'poly') {
    addBzdRow('lorazepam', 3.0);
    addBzdRow('flunitrazepam', 2.0);
    addBzdRow('brotizolam', 0.25);
  } else if (presetKey === 'elderly') {
    addBzdRow('nitrazepam', 5.0);
    addBzdRow('alprazolam', 0.8);
  } else if (presetKey === 'clear') {
    addBzdRow('diazepam', 5.0);
  }
}

function updateBzdCalculation() {
  const rows = document.querySelectorAll('.bzd-calc-input-row');
  let totalDzp = 0;
  let anxDrugs = new Set();
  let hypDrugs = new Set();
  let nonbzdCount = 0;
  let warnings = [];

  rows.forEach(r => {
    const sel = r.querySelector('.bzd-drug-select');
    const doseIn = r.querySelector('.bzd-dose-input');
    const cellEquiv = r.querySelector('.bzd-row-equiv');
    const cellPotency = r.querySelector('.bzd-row-potency');
    const cellDzp = r.querySelector('.bzd-row-dzp');

    if (!sel || !doseIn) return;
    const drugId = sel.value;
    const dose = parseFloat(doseIn.value) || 0;

    const drug = DIAZEPAM_EQUIVALENT_MASTER.find(d => d.id === drugId);
    if (!drug) return;

    if (drug.type === 'anx') anxDrugs.add(drug.id);
    else if (drug.type === 'hyp') hypDrugs.add(drug.id);
    else nonbzdCount++;

    // 1日最高用量チェック
    if (dose > drug.max_dose) {
      warnings.push(\`⚠️ <strong>\${drug.brand}（\${drug.name}）</strong>の服用量（\${dose}mg/日）が添付文書上の常用上限（\${drug.max_dose}mg/日）を超過しています。\`);
    }

    if (drug.equiv_5mg > 0) {
      const dzpEquiv = (dose * (5.0 / drug.equiv_5mg));
      totalDzp += dzpEquiv;
      cellEquiv.innerText = drug.equiv_5mg + ' mg';
      cellPotency.innerText = drug.potency + ' 倍';
      cellDzp.innerText = (Math.round(dzpEquiv * 10) / 10).toFixed(1) + ' mg';
    } else {
      cellEquiv.innerText = '非BZD';
      cellPotency.innerText = '-';
      cellDzp.innerHTML = '<span style="font-size:0.75rem; color:#16a34a; font-weight:700;">受容体作用外</span>';
    }
  });

  const totalDzpRounded = Math.round(totalDzp * 10) / 10;
  const anxCount = anxDrugs.size;
  const hypCount = hypDrugs.size;
  const totalBzdCount = anxCount + hypCount;

  // 1. 総用量表示
  const totalEl = document.getElementById('bzd-total-val');
  if (totalEl) totalEl.innerText = totalDzpRounded.toFixed(1);

  // 2. リスク判定
  const badgeEl = document.getElementById('bzd-risk-badge');
  const descEl = document.getElementById('bzd-risk-desc');
  if (badgeEl && descEl) {
    if (totalDzpRounded <= 5.0) {
      badgeEl.style.background = '#dcfce7';
      badgeEl.style.color = '#15803d';
      badgeEl.innerText = '🟢 軽度負荷（低用量）';
      descEl.innerText = 'ジアゼパム換算5mg以下。常用量の範囲内であり、1〜2ヶ月間の計画的漸減で安全に離脱可能。';
    } else if (totalDzpRounded <= 10.0) {
      badgeEl.style.background = '#fef9c3';
      badgeEl.style.color = '#854d0e';
      badgeEl.innerText = '🟡 中等度負荷（中用量）';
      descEl.innerText = 'ジアゼパム換算5〜10mg。常用量依存が形成されている可能性あり。半減期の長い薬剤（セルシン/メイラックス）への置換を推奨。';
    } else if (totalDzpRounded <= 20.0) {
      badgeEl.style.background = '#ffedd5';
      badgeEl.style.color = '#c2410c';
      badgeEl.innerText = '🟠 高力価負荷（高用量依存警戒）';
      descEl.innerText = 'ジアゼパム換算10〜20mg。急激な減薬は反跳性パニック・痙攣・せん妄の危険。数ヶ月かけたアシュトン漸減プロトコルが必須。';
    } else {
      badgeEl.style.background = '#fee2e2';
      badgeEl.style.color = '#991b1b';
      badgeEl.innerText = '🔴 極高用量負荷（最危険ゾーン）';
      descEl.innerText = 'ジアゼパム換算20mg超。重度の身体的・精神的依存。専門医（精神科・心療内科）との密接連携、場合により入院下での漸減を検討。';
    }
  }

  // 3. 診療報酬・多剤算定チェック
  const cAnx = document.getElementById('bzd-count-anx');
  const cHyp = document.getElementById('bzd-count-hyp');
  const cTot = document.getElementById('bzd-count-total');
  const auditMsg = document.getElementById('bzd-audit-msg');

  if (cAnx) cAnx.innerText = anxCount + ' 剤';
  if (cHyp) cHyp.innerText = hypCount + ' 剤';
  if (cTot) cTot.innerText = totalBzdCount + ' 剤';

  let auditAlert = false;
  if (anxCount >= 3) {
    warnings.push('🚨 <strong>【算定不可警告】</strong>抗不安薬が3種類以上処方されています！処方料・処方箋料・調剤基本料が大幅減算（原則算定不可）の対象です。');
    auditAlert = true;
  }
  if (hypCount >= 3) {
    warnings.push('🚨 <strong>【算定不可警告】</strong>睡眠薬が3種類以上処方されています！処方料・処方箋料・調剤基本料が大幅減算（原則算定不可）の対象です。');
    auditAlert = true;
  }
  if (totalBzdCount >= 4) {
    warnings.push('🚨 <strong>【多剤重複警告】</strong>抗不安薬＋睡眠薬が合計4種類以上処方されています！精神科多剤投与減算に該当します。');
    auditAlert = true;
  }

  if (auditMsg) {
    if (auditAlert) {
      auditMsg.innerHTML = '<span style="color:#dc2626; font-weight:800;">🚨 診療報酬上の多剤投与制限に抵触しています！処方見直し・疑義照会が必要です。</span>';
    } else {
      auditMsg.innerHTML = '<span style="color:#16a34a; font-weight:700;">✅ 3剤制限・多剤減算ルールに抵触していません。</span>';
    }
  }

  // 警告バナー
  const warnBanner = document.getElementById('bzd-warning-banner');
  if (warnBanner) {
    if (warnings.length > 0) {
      warnBanner.style.display = 'block';
      warnBanner.innerHTML = warnings.join('<br>');
    } else {
      warnBanner.style.display = 'none';
      warnBanner.innerHTML = '';
    }
  }

  // 4. アシュトン・漸減スケジュール動的生成
  updateAshtonSchedule(totalDzpRounded, anxCount, hypCount);
}

function updateAshtonSchedule(totalDzp, anxCount, hypCount) {
  const step1Title = document.getElementById('ashton-step1-title');
  const step1Desc = document.getElementById('ashton-step1-desc');
  const step2Title = document.getElementById('ashton-step2-title');
  const step2Desc = document.getElementById('ashton-step2-desc');
  const step3Title = document.getElementById('ashton-step3-title');
  const step3Desc = document.getElementById('ashton-step3-desc');
  const step4Title = document.getElementById('ashton-step4-title');
  const step4Desc = document.getElementById('ashton-step4-desc');

  if (!step1Title || !step2Title || !step3Title || !step4Title) return;

  const halfDzp = Math.round((totalDzp / 2) * 10) / 10;
  const meylaxEquiv = Math.round((totalDzp / 2.5) * 10) / 10;

  if (totalDzp <= 0) {
    step1Title.innerText = '処方薬を入力してください';
    step1Desc.innerText = '上記フォームに薬剤と用量を入力すると、最適な減薬スケジュールが表示されます。';
    return;
  }

  step1Title.innerText = \`夜間用量をジアゼパム \${halfDzp}mg (またはメイラックス \${Math.min(2, Math.round(meylaxEquiv/2*10)/10)}mg) へ置換\`;
  step1Desc.innerHTML = hypCount > 0
    ? \`睡眠薬依存を解除するため、<strong>オレキシン拮抗薬（クービビック50mg または デエビゴ5mg）</strong>を就寝前に追加開始。夜間のBZD半量をジアゼパムへ置換し1〜2週間様子を見る。\`
    : \`不安・焦燥が強い場合は<strong>5-HT1A作動薬（セディール 10mg×3回）</strong>を先行導入。夜間の抗不安薬半分をジアゼパムへ置き換えて2週間維持。\`;

  step2Title.innerText = \`全量をジアゼパム \${totalDzp}mg/日 (またはメイラックス \${Math.min(2, meylaxEquiv)}mg) へ完全一本化\`;
  step2Desc.innerText = \`朝・昼の残りの服用分もすべてジアゼパムへ置換（朝・夕の2回分服または夕1回）。短時間薬特有のミニ離脱（薬効切れの不安・不眠）が消失するまで2週間安定させる。\`;

  if (totalDzp > 10) {
    step3Title.innerText = '2週間ごとに 2mg ずつ減量 (計8〜16週間)';
    step3Desc.innerText = \`現在\${totalDzp}mg ➔ \${(totalDzp - 2).toFixed(1)}mg ➔ \${(totalDzp - 4).toFixed(1)}mg...と無理のないペースで漸減。離脱症状（頭痛・焦燥・不眠）が出たら直前の用量で1〜2週間ステイ。\`;
  } else if (totalDzp > 5) {
    step3Title.innerText = '2週間ごとに 1mg ずつ減量 (計6〜10週間)';
    step3Desc.innerText = \`現在\${totalDzp}mg ➔ \${(totalDzp - 1).toFixed(1)}mg ➔ \${(totalDzp - 2).toFixed(1)}mg...と漸減。後半はセルシン2mg錠の半割（1mg）や散剤で微調整。\`;
  } else {
    step3Title.innerText = '1〜2週間ごとに 0.5〜1mg ずつ減量 (計4〜6週間)';
    step3Desc.innerText = \`低用量域からの離脱。散剤またはピルカッターを用いた0.5mg単位の微量減量で反跳症状を完全に抑え込む。\`;
  }

  step4Title.innerText = '1mg / 0.5mg到達後、隔日服用 ➔ 終薬';
  step4Desc.innerText = '最低用量（ジアゼパム0.5〜1mg）を2日に1回（週3〜4日）➔ 3日に1回と間隔を空け、2〜4週間症状がなければ完全終了・脱ベンゾ達成！';
}

function filterBzdTable(cat, btn) {
  const buttons = document.querySelectorAll('.bzd-filter-btn');
  buttons.forEach(b => {
    b.style.background = 'transparent';
    b.style.color = '#64748b';
    b.style.boxShadow = 'none';
  });
  if (btn) {
    btn.style.background = '#ffffff';
    btn.style.color = '#1e293b';
    btn.style.boxShadow = '0 1px 2px rgba(0,0,0,0.1)';
  }

  const rows = document.querySelectorAll('.bzd-master-row');
  rows.forEach(r => {
    const type = r.getAttribute('data-type');
    if (cat === 'all') {
      r.style.display = '';
    } else if (cat === 'anx') {
      r.style.display = (type === 'anx') ? '' : 'none';
    } else if (cat === 'hyp') {
      r.style.display = (type === 'hyp') ? '' : 'none';
    } else if (cat === 'nonbzd') {
      r.style.display = (type === 'anx_nonbzd' || type === 'hyp_nonbzd') ? '' : 'none';
    }
  });
}

function searchBzdTable(keyword) {
  const kw = (keyword || '').toLowerCase().trim();
  const rows = document.querySelectorAll('.bzd-master-row');
  rows.forEach(r => {
    const name = (r.getAttribute('data-name') || '').toLowerCase();
    if (!kw || name.includes(kw)) {
      r.style.display = '';
    } else {
      r.style.display = 'none';
    }
  });
}

function addBzdFromTable(drugId) {
  const drug = DIAZEPAM_EQUIVALENT_MASTER.find(d => d.id === drugId);
  const defaultDose = drug ? (drug.equiv_5mg > 0 ? drug.equiv_5mg : (drug.max_dose / 2)) : 1.0;
  addBzdRow(drugId, defaultDose);

  const calcCard = document.getElementById('bzd-calculator-card');
  if (calcCard) {
    calcCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    calcCard.style.outline = '3px solid #6366f1';
    setTimeout(() => {
      calcCard.style.outline = 'none';
    }, 1500);
  }
}
`;
}

// ファイルへの適用処理
function run() {
  console.log('--- Applying BZD Diazepam Equivalence Calculator ---');

  // 1. src/05_comparison.html の置換
  const compPath = path.join(ROOT_DIR, 'src', '05_comparison.html');
  const compHtml = fs.readFileSync(compPath, 'utf8');

  const startTag = '<div id="comp-bzd-deprescribing"';
  const sIdx = compHtml.indexOf(startTag);
  if (sIdx === -1) {
    console.error('ERROR: Could not find startTag in src/05_comparison.html');
    process.exit(1);
  }
  const endTable = compHtml.indexOf('</table>', sIdx);
  if (endTable === -1) {
    console.error('ERROR: Could not find end </table> in src/05_comparison.html');
    process.exit(1);
  }

  const oldBlock = compHtml.substring(sIdx, endTable + 8);
  const newBlock = generateBzdHtml();

  const newCompHtml = compHtml.substring(0, sIdx) + newBlock + compHtml.substring(endTable + 8);
  fs.writeFileSync(compPath, newCompHtml, 'utf8');
  console.log('Updated src/05_comparison.html successfully.');

  // 2. src/09_app.js の更新
  const appPath = path.join(ROOT_DIR, 'src', '09_app.js');
  let appJs = fs.readFileSync(appPath, 'utf8');

  // DOMContentLoaded に initBzdCalculator() を追加
  if (!appJs.includes('initBzdCalculator()')) {
    appJs = appJs.replace(
      "calcRenalDose();",
      "calcRenalDose();\n\n  // ジアゼパム等価換算計算機の初期化\n  initBzdCalculator();"
    );
  }

  // 検索サジェストのアクション強化
  if (appJs.includes("jumpToComp('sec-psy', 'デパス');")) {
    appJs = appJs.replace(
      "jumpToComp('sec-psy', 'デパス');",
      "jumpToComp('sec-psy', 'comp-bzd-deprescribing');"
    );
  }

  // 末尾に BZD Engine コードを追加（重複チェック）
  if (appJs.includes('DIAZEPAM_EQUIVALENT_MASTER')) {
    // 既存のものを置換
    const existingIdx = appJs.indexOf('/* ==========================================================================\r\n   ⚡ ジアゼパム等価換算');
    const existingIdxLf = appJs.indexOf('/* ==========================================================================\n   ⚡ ジアゼパム等価換算');
    const cutIdx = existingIdx !== -1 ? existingIdx : existingIdxLf;
    if (cutIdx !== -1) {
      appJs = appJs.substring(0, cutIdx) + generateBzdJs();
    } else {
      appJs += '\n' + generateBzdJs();
    }
  } else {
    appJs += '\n' + generateBzdJs();
  }

  fs.writeFileSync(appPath, appJs, 'utf8');
  console.log('Updated src/09_app.js successfully.');
}

run();
