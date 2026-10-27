// c:\Users\borug\Antigravity\PharmasistMaster\src\parts\build_renal_master.js
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..', '..');

// 腎排泄型薬剤マスターデータ（薬局重要30品目）
const RENAL_DRUGS_DATA = [
  // 1. 抗ウイルス薬
  {
    cat: '抗ウイルス薬',
    name: 'バラシクロビル（バルトレックス）',
    brand: 'バルトレックス',
    rate: '約80%',
    criteria: 'Ccr >50: 通常量（1回1000mg 1日3回）<br>Ccr 30〜50: 1回1000mg 1日2回<br>Ccr 10〜30: 1回1000mg 1日1回<br>Ccr <10: 1回500mg 1日1回',
    toxic: '🚨【アシクロビル脳症】（幻覚、せん妄、意識混濁、ミオクローヌス、痙攣）。高齢・脱水で好発！',
    action: '高齢者（特に痩身女性）の帯状疱疹で通常量（6錠/日）が出たら即疑義照会！腎排泄を受けず減量不要な「アメナリーフ（1日1回2錠 食後）」への変更提案が極めて有効。'
  },
  {
    cat: '抗ウイルス薬',
    name: 'オセルタミビル（タミフル）',
    brand: 'タミフル',
    rate: '約80%',
    criteria: 'Ccr >50: 75mg 1日2回 5日間<br>Ccr 10〜50: 75mg 1日1回 5日間<br>Ccr <10: 75mg 単回投与',
    toxic: '異常行動・中枢神経症状、嘔気・消化器症状。血中濃度持続による持ち越し。',
    action: '腎機能低下時でも減量不要な吸入薬「イナビル（薬局で吸い切り）」や「ゾフルーザ（1回完結）」を代替提案。'
  },

  // 2. DOAC（抗凝固薬）
  {
    cat: '抗凝固薬（DOAC）',
    name: 'ダビガトラン（プラザキサ）',
    brand: 'プラザキサ',
    rate: '約80%（DOAC最高）',
    criteria: 'Ccr >50: 150mg 1日2回<br>Ccr 30〜50: 110mg 1日2回に減量<br>Ccr <30: 【絶対禁忌！】（致死的出血）',
    toxic: '消化管大出血、頭蓋内出血。80%腎排泄のため腎機能悪化時に急激に血中濃度高騰！中和剤プリバインドあり。',
    action: 'Ccr <30 または透析患者ではDOAC禁忌。ワルファリン（INR管理）への変更必須。カプセル粉砕・脱カプセル絶対厳禁。'
  },
  {
    cat: '抗凝固薬（DOAC）',
    name: 'エドキサバン（リクシアナ）',
    brand: 'リクシアナ',
    rate: '約50%',
    criteria: '3大減量基準（1つでも該当で60mg ➔ 30mgに減量）：<br>① 体重≦50kg、② Ccr 15〜50mL/min、③ P-gp阻害薬併用',
    toxic: '出血リスク増大。Ccr <15は禁忌。',
    action: '日本発のDOACで処方頻度No.1。体重50kg以下または推算Ccr 50以下の見落とし過量投与が薬局監査で最多！'
  },
  {
    cat: '抗凝固薬（DOAC）',
    name: 'リバーロキサバン（イグザレルト）',
    brand: 'イグザレルト',
    rate: '約33%',
    criteria: 'Ccr ≧50: 15mg 1日1回 食後<br>Ccr 15〜49: 10mg 1日1回 食後に減量<br>Ccr <15: 禁忌',
    toxic: '大出血。空腹時内服でバイオアベイラビリティ激減（食後服用厳守）。',
    action: 'Ccr 49以下の減量見落としを鑑査。食後服用ルールの遵守指導。'
  },
  {
    cat: '抗凝固薬（DOAC）',
    name: 'アピキサバン（エリキュース）',
    brand: 'エリキュース',
    rate: '約27%（DOAC最低）',
    criteria: '3大減量基準中「2つ以上」該当で5mg bid ➔ 2.5mg bidへ減量：<br>① 80歳以上、② 体重≦60kg、③ 血清Cr ≧1.5mg/dL',
    toxic: '出血。Ccr 15〜29でも慎重投与で使用可能（DOAC中最も腎不全に使いやすい）。',
    action: '減量基準が「2項目合致」である点に注意。1項目該当のみでは通常量5mg bid維持。'
  },

  // 3. 糖尿病治療薬
  {
    cat: '糖尿病治療薬',
    name: 'メトホルミン（メトグルコ）',
    brand: 'メトグルコ',
    rate: 'ほぼ100%',
    criteria: 'eGFR ≧60: 上限1500〜2250mg<br>eGFR 45〜59: 上限1500mg<br>eGFR 30〜44: 上限750mg（超慎重）<br>eGFR <30: 【絶対禁忌！】',
    toxic: '🚨【乳酸アシドーシス】（死亡率約50%！悪心、倦怠感、過呼吸、意識障害、脱水）。',
    action: 'eGFR 30未満、透析、脱水、ヨード造影剤前後（48時間休薬）の禁忌監査徹底。高齢者での腎機能低下・シックデイ時の休薬指示。'
  },
  {
    cat: '糖尿病治療薬',
    name: 'グリメピリド（アマリール）',
    brand: 'アマリール',
    rate: '約60%（活性代謝物）',
    criteria: '中等度〜高度腎機能低下では減量または中止考慮。重篤な腎不全では原則禁忌。',
    toxic: '🚨【遷延性重篤低血糖】（代謝物が体内に蓄積し、何日も低血糖が続く。意識消失・不可逆的脳障害）。',
    action: '腎機能低下時はDPP-4阻害薬（トラゼンタ等）や短時間作用型グリニド薬、インスリンへの切り替えを推奨。'
  },
  {
    cat: '糖尿病治療薬',
    name: 'シタグリプチン（ジャヌビア）',
    brand: 'ジャヌビア',
    rate: '約80%',
    criteria: 'eGFR ≧50: 50mg/日<br>eGFR 30〜49: 25mg/日（半量）<br>eGFR <30（透析含む）: 12.5mg/日（1/4量）',
    toxic: '血中濃度上昇。低血糖リスク。',
    action: 'DPP-4阻害薬の中でジャヌビア/ネシーナは腎排泄型。減量調整が面倒な場合は、胆汁排泄型で透析まで減量不要な「トラゼンタ（5mg固定）」への変更提案がスマート。'
  },
  {
    cat: '糖尿病治療薬',
    name: 'SGLT2阻害薬（フォシーガ / ジャディアンス）',
    brand: 'フォシーガ',
    rate: '約75%（代謝物）',
    criteria: '血糖降下：eGFR <30で効果ほぼ無効<br>心不全・慢性腎臓病（CKD）：eGFR ≧20まで投与開始・継続推奨（透析導入で中止）',
    toxic: '正常血糖ケトアシドーシス、尿路・性器感染症、脱水・急性腎不全（AKI）。',
    action: 'eGFR <30でも「心腎保護目的」なら継続がガイドライン推奨！血糖値が下がらないからと勝手に中止しないよう主治医意図を確認。シックデイ時は休薬。'
  },

  // 4. 神経障害性疼痛・抗てんかん薬
  {
    cat: '神経痛・抗てんかん',
    name: 'プレガバリン（リリカ）',
    brand: 'リリカ',
    rate: '>90%',
    criteria: 'Ccr ≧60: 150〜300mg/日（分2）<br>Ccr 30〜59: 75〜150mg/日（分2）<br>Ccr 15〜29: 25〜75mg/日（分1〜2）<br>Ccr <15: 25mg 1日1回',
    toxic: '重度のふらつき、転倒・骨折、傾眠、意識障害、ミオクローヌス、末梢性浮腫。',
    action: '高齢者に初期から150mg/日処方は過量事故の典型。必ず低用量（25〜75mg）から開始されているかCcrで確認。'
  },
  {
    cat: '神経痛・抗てんかん',
    name: 'ミロガバリン（タリージェ）',
    brand: 'タリージェ',
    rate: '約75%',
    criteria: 'eGFR ≧60: 10〜30mg/日（分2）<br>eGFR 30〜59: 5〜15mg/日（分2）<br>eGFR 15〜29: 2.5〜7.5mg/日（分2）<br>eGFR <15: 2.5mg 1日1回',
    toxic: '眠気、めまい、意識消失。体重増加・浮腫。',
    action: 'リリカがCcr基準に対し、タリージェはeGFR基準で添付文書が記載されている点に注意。'
  },
  {
    cat: '神経痛・抗てんかん',
    name: 'ガバペンチン（ガバペン）',
    brand: 'ガバペン',
    rate: 'ほぼ100%',
    criteria: 'Ccr ≧80: 通常量（1200〜1800mg）<br>Ccr 50〜79: 600〜1200mg<br>Ccr 30〜49: 300〜600mg<br>Ccr 15〜29: 300mg隔日<br>Ccr <15: 300mg 週2〜3回',
    toxic: '重篤な中枢抑制、呼吸抑制、昏睡。透析患者で高頻度に中毒発現！',
    action: '高齢透析患者への通常量投与による昏睡搬送事例多数。厳重なCcr確認必須。'
  },
  {
    cat: '神経痛・抗てんかん',
    name: 'レベチラセタム（イーケプラ）',
    brand: 'イーケプラ',
    rate: '約66%',
    criteria: 'Ccr ≧80: 1000〜3000mg/日<br>Ccr 50〜79: 1000〜2000mg/日<br>Ccr 30〜49: 500〜1500mg/日<br>Ccr <30: 500〜1000mg/日',
    toxic: '易怒性、攻撃性、精神症状、過鎮静。',
    action: '高齢者の脳梗塞後てんかんで汎用されるため、腎機能に応じた減量調整が頻出。'
  },

  // 5. 抗菌薬
  {
    cat: '抗菌薬',
    name: 'レボフロキサシン（クラビット）',
    brand: 'クラビット',
    rate: '約80%',
    criteria: 'Ccr ≧50: 500mg 1日1回<br>Ccr 20〜49: 初日500mg、2日目以降250mg 1日1回<br>Ccr <20: 初日500mg、3日目以降250mg 2日に1回',
    toxic: '🚨【中枢性痙攣】（NSAIDs併用で激化）、アキレス腱炎・腱断裂、低血糖、QT延長。',
    action: '高齢者に500mg連日投与は危険！Ccr 20〜49なら250mgへ減量。金属製剤（鉄・Ca・Mg・アルミニウム）とのキレート（2時間空け）も併せて鑑査。'
  },
  {
    cat: '抗菌薬',
    name: 'ST合剤（バクタ / ダイフェン）',
    brand: 'バクタ',
    rate: '約80%',
    criteria: 'Ccr >30: 通常量（PCP治療 9〜12錠/日、予防 1〜2錠/日）<br>Ccr 15〜30: 半量に減量<br>Ccr <15: 【禁忌】',
    toxic: '🚨【致死的高カリウム血症】（トリメトプリムがアミロライド様Naチャネル遮断作用を持つ）、骨髄抑制、汎血球減少、重症薬疹。',
    action: 'ACE-I/ARB、MRA服用中の高齢者にバクタが追加されたら高K血症の緊急アラート！血清K値のモニタリング必須。'
  },

  // 6. 循環器・降圧・利尿薬
  {
    cat: '循環器・不整脈',
    name: 'ジゴキシン（ジゴシン）',
    brand: 'ジゴシン',
    rate: '約80%',
    criteria: 'Ccr低下に応じて投与量を厳格削減（例: Ccr 30〜50で0.125mg隔日または0.0625mg/日）。TDM（血中濃度0.5〜0.9ng/mL）必須。',
    toxic: '🚨【ジギタリス中毒】（悪心・食欲不振、黄視症・視覚異常、徐脈・房室ブロック・心室性期外収縮・心停止）。',
    action: '高齢者の食欲不振・吐き気は「胃腸炎」ではなくジギタリス中毒を疑え！低K血症・低Mg血症で毒性が劇的に増悪。'
  },
  {
    cat: '循環器・不整脈',
    name: 'アテノロール（テノーミン）',
    brand: 'テノーミン',
    rate: '約85%',
    criteria: 'Ccr 35〜50: 50mg/日または25mg/日<br>Ccr 15〜35: 50mg隔日または25mg/日<br>Ccr <15: 50mg 週2回または25mg隔日',
    toxic: '過度な徐脈、心ブロック、心不全悪化、低血圧。',
    action: 'β遮断薬の中でアテノロールは親水性で腎排泄。肝代謝型の「ビソプロロール（メインテート）」や「カルベジロール（アーチスト）」の方がCKD患者に安全で汎用。'
  },
  {
    cat: '循環器・不整脈',
    name: 'スピロノラクトン（アルダクトンA）',
    brand: 'アルダクトンA',
    rate: '代謝物が腎排泄',
    criteria: '重篤な腎不全（eGFR <30）、無尿、高K血症では禁忌。',
    toxic: '🚨 致死的高カリウム血症。',
    action: '腎機能低下患者への高用量（50〜100mg）処方は電解質モニタリング必須。'
  },

  // 7. 消化器・便秘・制酸薬
  {
    cat: '消化器・便秘薬',
    name: '酸化マグネシウム（マグミット）',
    brand: 'マグミット',
    rate: '吸収されたMgは100%腎排泄',
    criteria: '重篤な腎障害患者には禁忌・慎重投与。定期的な血清Mg測定が厚労省から義務付け。',
    toxic: '🚨【高マグネシウム血症】（意識障害、傾眠、筋力低下、徐脈、呼吸停止、心停止）。死亡事例多数！',
    action: '「便秘薬だから安全」は最大の誤解！高齢CKD患者が漫然と長年飲んでいる場合、モビコールやグーフィスへの変更提案が強く推奨される。'
  },
  {
    cat: '消化器・制酸薬',
    name: 'ファモチジン（ガスター）',
    brand: 'ガスター',
    rate: '約70%',
    criteria: 'Ccr ≧50: 20mg 1日2回（計40mg）<br>Ccr 30〜50: 20mg 1日1回（半量）<br>Ccr <30: 10〜20mg 2〜3日に1回',
    toxic: '🚨【H2ブロッカー中枢神経症状】（せん妄、幻覚、失見当識、痙攣）。高齢者の急な認知症様症状！',
    action: '高齢者の胃炎・胃痛でファモチジン通常量が出たら、腎排泄を受けないPPI（タケキャブ/ネキシウム）への切り替え提案がスマート。'
  },

  // 8. 痛風・高尿酸血症
  {
    cat: '痛風・高尿酸血症',
    name: 'アロプリノール（ザイロリック）',
    brand: 'ザイロリック',
    rate: '活性代謝物オキシプリノールが腎排泄（t1/2が腎機能低下で急伸）',
    criteria: 'Ccr ≧50: 200〜300mg/日<br>Ccr 30〜50: 100〜200mg/日<br>Ccr 10〜30: 50〜100mg/日<br>Ccr <10: 50mg 2〜3日に1回',
    toxic: '🚨【中毒性表皮壊死症（TEN）/ スティーブンス・ジョンソン症候群（SJS）】、薬剤性過敏症症候群（DIHS）。劇症肝障害。',
    action: '腎機能低下時のアロプリノール過量投与は命に関わる重症薬疹を引き起こす！肝代謝型の「フェブキソスタット（フェブリク）」への変更が現代の実務スタンダード。'
  },
  {
    cat: '痛風・高尿酸血症',
    name: 'コルヒチン',
    brand: 'コルヒチン',
    rate: '約20〜30%（腎・肝両経路）',
    criteria: '重篤な腎機能障害（Ccr <10〜30）では禁忌または大幅減量。強いCYP3A4/P-gp阻害薬併用時は禁忌。',
    toxic: '横紋筋融解症、末梢神経障害、骨髄抑制、重度下痢。',
    action: '痛風発作予兆期（1錠頓用）にとどめ、漫然投与を厳禁。'
  },

  // 9. 骨粗鬆症薬
  {
    cat: '骨粗鬆症薬',
    name: 'アレンドロン酸（ボナロン / フォサマック）',
    brand: 'ボナロン',
    rate: '約50%（骨沈着以外は未変化体排泄）',
    criteria: 'Ccr <35mL/min では【禁忌・原則使用不可】。',
    toxic: '骨代謝回転の過度な抑制、急性腎障害増悪、低Ca血症。',
    action: 'Ccr <35の進行したCKD骨粗鬆症患者には、ビスホスホネートを避け「プラリア（デノスマブ・腎排泄なし）」や「テリパラチド」を推奨。'
  },

  // 10. 抗リウマチ薬
  {
    cat: '抗リウマチ薬',
    name: 'メトトレキサート（リウマトレックス）',
    brand: 'リウマトレックス',
    rate: '約80%',
    criteria: 'Ccr >60: 通常量（週1〜2日投与）<br>Ccr 30〜59: 慎重減量投与<br>Ccr <30: 【禁忌！】',
    toxic: '🚨【致死性骨髄抑制・汎血球減少】、口内炎、間質性肺炎、肝障害。排泄遅延により体内に滞留し大惨事に！',
    action: '週1回投与の徹底に加え、腎機能低下時の即時休薬・フォリアミン（葉酸）レスキュー体制の確認。NSAIDs併用による腎血流低下・MTX排泄遅延に最大警戒！'
  }
];

function generatePharmacyRenalHtml() {
  return `
    <!-- ==========================================================================
         📘 【薬局実務特化】処方箋から見抜く腎機能の評価 ＆ 腎排泄型薬剤・ハイリスク薬活用マスター
         ========================================================================== -->
    <div id="pharmacy-renal-practice" class="sub-banner banner-within" style="margin-top:25px; background: linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%); color:#ffffff; padding: 18px 22px; border-radius: 12px; box-shadow: 0 4px 15px rgba(2, 132, 199, 0.25);">
      <div style="font-size: 1.25rem; font-weight: 800; display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
        <span style="font-size: 1.5rem;">📘</span>
        <span>【薬局実務特化】処方箋から見抜く腎機能評価法 ＆ 腎排泄型薬剤・ハイリスク薬活用マスター</span>
        <span style="background: rgba(255,255,255,0.22); font-size: 0.72rem; padding: 3px 9px; border-radius: 999px; font-weight: 600;">JSNPT腎不全用量設定指針 / 薬局調剤実務</span>
      </div>
      <div style="font-size: 0.88rem; color: #e0f2fe; margin-top: 6px; line-height: 1.55;">
        「eGFR vs Ccrどちらを使う？」「高齢者・痩身のCr 0.4mg/dL偽正常の罠」「検査値なしでの逆引き病態特定」「頻出腎排泄薬30品目の中毒症状」「安全な肝代謝型代替薬」を完全網羅！
      </div>
    </div>

    <!-- PART 1: 薬局での腎機能評価 3大ピットフォール -->
    <div style="background:#ffffff; border:1px solid #bae6fd; border-radius:12px; padding:18px 20px; margin-bottom:22px; box-shadow:0 2px 8px rgba(2,132,199,0.06);">
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px; border-bottom:1.5px solid #e0f2fe; padding-bottom:8px;">
        <span style="font-size:1.3rem;">⚠️</span>
        <h3 style="margin:0; font-size:1.1rem; color:#0369a1; font-weight:800;">
          薬局実務で誰もが一度はハマる「腎機能評価の3大ピットフォール（落とし穴と鉄則）」
        </h3>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:14px;">
        <!-- ピットフォール 1 -->
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-top:4px solid #0284c7; border-radius:8px; padding:14px;">
          <div style="font-size:0.9rem; font-weight:800; color:#0369a1; display:flex; align-items:center; gap:6px;">
            <span>①</span> eGFR vs Ccrの使い分け ＆ 体表面積補正の罠
          </div>
          <div style="font-size:0.8rem; color:#334155; line-height:1.6; margin-top:8px;">
            ・<strong>添付文書の基準は多くが「推算Ccr」：</strong>DOACや抗菌薬、抗ウイルス薬の治験は歴史的にCockcroft-Gault式（推算Ccr）で行われたため、添付文書の減量基準は推算Ccrが中心です。<br>
            ・<strong>標準化eGFR（mL/min/1.73m²）をそのまま使ってはいけない理由：</strong><br>
            　日本の検査会社から返ってくるeGFRは「体表面積1.73m²」に規格化されています。そのため、<strong>小柄な高齢女性（BSA 1.2〜1.3m²）では腎機能を30%以上過大評価</strong>し、過量投与事故を引き起こします！<br>
            ・<strong>実務の鉄則：</strong>体格が標準から大きく外れる患者（痩身・肥満・低身長）の薬物投与設計には、<strong>「推算Ccr」</strong>または<strong>「個別eGFR（eGFR × BSA / 1.73 mL/min）」</strong>を用います。
          </div>
        </div>

        <!-- ピットフォール 2 -->
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-top:4px solid #e11d48; border-radius:8px; padding:14px;">
          <div style="font-size:0.9rem; font-weight:800; color:#be123c; display:flex; align-items:center; gap:6px;">
            <span>②</span> 高齢・痩身者の「クレアチニン偽正常（Cr 0.4の罠）」
          </div>
          <div style="font-size:0.8rem; color:#334155; line-height:1.6; margin-top:8px;">
            ・<strong>筋肉がないとクレアチニンは作られない：</strong>血清Crは骨格筋の代謝産物です。寝たきりやサルコペニアの高齢者では筋肉量が極少なため、<strong>腎機能が高度に落ちていても血清Crが「0.3〜0.5 mg/dL」と見かけ上超正常値</strong>に出てしまいます。<br>
            ・<strong>薬局で多発する大事故実例：</strong><br>
            　「Cr 0.4だから腎臓は元気」と信じてバルトレックス通常量（6錠/日）やリリカ通常量（150mg）を交付し、3日後に<strong>アシクロビル脳症（幻覚・せん妄・意識障害）</strong>や呼吸抑制で救急搬送されるケースが後を絶ちません！<br>
            ・<strong>実務の鉄則：</strong>高齢・痩身者で<strong>「Scr &lt; 0.6 mg/dL の場合は 0.6 に切り上げて再計算する（ラウンドアップ補正）」</strong>か、筋肉量の影響を受けない「シスタチンC」で真の糸球体濾過量を評価します。
          </div>
        </div>

        <!-- ピットフォール 3 -->
        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-top:4px solid #16a34a; border-radius:8px; padding:14px;">
          <div style="font-size:0.9rem; font-weight:800; color:#15803d; display:flex; align-items:center; gap:6px;">
            <span>③</span> 検査値がない処方箋からの「逆引きプロファイリング」
          </div>
          <div style="font-size:0.8rem; color:#334155; line-height:1.6; margin-top:8px;">
            ・<strong>処方箋に検査値がない時の処方サイン：</strong><br>
            　以下の薬剤が処方箋に含まれていたら、即座に「高度CKD（G4〜G5）」を疑います：<br>
            　・<strong>クレメジン（球形吸着炭）：</strong>eGFR 10〜20（透析導入直前期・尿毒症毒素吸着）<br>
            　・<strong>ロケルマ / カリメート：</strong>重篤な高K血症合併（eGFR &lt;30）<br>
            　・<strong>炭酸水素Na（重曹）：</strong>CKD性代謝性アシドーシス是正<br>
            　・<strong>エベレンゾ / ネスプ：</strong>腎性貧血（Hb低下・エリスロポエチン産生低下）<br>
            　・<strong>オルケディア / ロカルトロール：</strong>CKD-MBD（二次性副甲状腺機能亢進）<br>
            ・<strong>窓口での問診キー：</strong>「足のすねのむくみ」「夜間頻尿から一転して尿量が減っていないか」「シャント手術の有無」を確認します。
          </div>
        </div>
      </div>
    </div>

    <!-- PART 2: 重要頻出「腎排泄型薬剤」完全マスターテーブル -->
    <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:18px 20px; margin-bottom:22px; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
        <div>
          <h3 style="margin:0; font-size:1.1rem; color:#0f172a; font-weight:800; display:flex; align-items:center; gap:8px;">
            <span>💊</span> 薬局頻出！重要「腎排泄型薬剤」完全マトリクス（減量基準・中毒症状・鑑査の急所）
          </h3>
          <div style="font-size:0.78rem; color:#64748b; margin-top:2px;">
            体内蓄積により致死的中毒（脳症・大出血・乳酸アシドーシス・低血糖・不整脈）を引き起こす要注意薬一覧
          </div>
        </div>
        <div style="font-size:0.75rem; color:#475569; background:#f1f5f9; padding:4px 10px; border-radius:6px; font-weight:700;">
          全 ${RENAL_DRUGS_DATA.length} 品目掲載
        </div>
      </div>

      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; font-size:0.8rem;">
          <thead>
            <tr style="background:#0f172a; color:white;">
              <th style="padding:9px 10px; text-align:left; width:14%;">薬効分類</th>
              <th style="padding:9px 10px; text-align:left; width:16%;">薬剤名（一般名 / 先発名）</th>
              <th style="padding:9px 10px; text-align:center; width:9%;">尿中排泄率</th>
              <th style="padding:9px 10px; text-align:left; width:23%;">腎機能別 減量・禁忌基準</th>
              <th style="padding:9px 10px; text-align:left; width:22%;">排泄遅延時の重篤中毒症状</th>
              <th style="padding:9px 10px; text-align:left; width:16%;">薬剤師の鑑査・介入ポイント</th>
            </tr>
          </thead>
          <tbody>
${RENAL_DRUGS_DATA.map((d, idx) => {
  const rowBg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
  let catBadgeBg = '#f1f5f9', catBadgeCol = '#475569';
  if (d.cat.includes('抗ウイルス')) { catBadgeBg = '#fef2f2'; catBadgeCol = '#b91c1c'; }
  else if (d.cat.includes('抗凝固')) { catBadgeBg = '#fff1f2'; catBadgeCol = '#be123c'; }
  else if (d.cat.includes('糖尿病')) { catBadgeBg = '#fefce8'; catBadgeCol = '#854d0e'; }
  else if (d.cat.includes('神経痛')) { catBadgeBg = '#ede9fe'; catBadgeCol = '#6d28d9'; }
  else if (d.cat.includes('抗菌薬')) { catBadgeBg = '#ecfdf5'; catBadgeCol = '#047857'; }
  else if (d.cat.includes('循環器')) { catBadgeBg = '#e0f2fe'; catBadgeCol = '#0369a1'; }
  else if (d.cat.includes('消化器')) { catBadgeBg = '#fff7ed'; catBadgeCol = '#c2410c'; }
  else if (d.cat.includes('痛風')) { catBadgeBg = '#f3e8ff'; catBadgeCol = '#7e22ce'; }

  return `            <tr style="background:${rowBg}; border-bottom:1px solid #e2e8f0;">
              <td style="padding:8px 10px;">
                <span style="display:inline-block; font-size:0.7rem; padding:2px 6px; border-radius:4px; background:${catBadgeBg}; color:${catBadgeCol}; font-weight:700;">
                  ${d.cat}
                </span>
              </td>
              <td style="padding:8px 10px;">
                <strong style="color:#0f172a; font-size:0.85rem;">${d.brand}</strong><br>
                <span style="font-size:0.72rem; color:#64748b;">${d.name}</span>
              </td>
              <td style="padding:8px 10px; text-align:center; font-weight:800; color:#0369a1; font-size:0.82rem;">
                ${d.rate}
              </td>
              <td style="padding:8px 10px; font-size:0.78rem; color:#334155; line-height:1.45;">
                ${d.criteria}
              </td>
              <td style="padding:8px 10px; font-size:0.76rem; color:#b91c1c; line-height:1.4; font-weight:600;">
                ${d.toxic}
              </td>
              <td style="padding:8px 10px; font-size:0.76rem; color:#1e293b; line-height:1.4;">
                ${d.action}
              </td>
            </tr>`;
}).join('\n')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- PART 3: 腎機能低下時でも安心して使える「肝代謝型代替薬」ガイド -->
    <div style="background:#f0fdf4; border:1.5px solid #86efac; border-radius:12px; padding:18px 20px; margin-bottom:22px;">
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
        <span style="font-size:1.3rem;">🛡️</span>
        <h3 style="margin:0; font-size:1.05rem; color:#166534; font-weight:800;">
          腎機能低下時でも用量調整不要！安全に使える「肝代謝（胆汁排泄）代替薬」早見表
        </h3>
      </div>
      <div style="font-size:0.8rem; color:#14532d; margin-bottom:12px;">
        腎排泄型薬剤が減量・禁忌で使いづらい場合、医師へ自信を持って代替提案できる第一選択薬リストです。
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:12px;">
        <div style="background:white; border-left:4px solid #16a34a; padding:10px 14px; border-radius:6px;">
          <strong style="color:#15803d; font-size:0.85rem;">🦠 抗ウイルス薬：アメナリーフ（アメナメビル）</strong>
          <div style="font-size:0.78rem; color:#334155; line-height:1.5; margin-top:4px;">
            ほぼ100%糞中（胆汁）排泄！透析患者を含め<strong>腎機能による減量・日数調整が一切不要</strong>。1日1回2錠（400mg）食後内服。高齢者帯状疱疹のファーストライン！
          </div>
        </div>

        <div style="background:white; border-left:4px solid #16a34a; padding:10px 14px; border-radius:6px;">
          <strong style="color:#15803d; font-size:0.85rem;">🍬 糖尿病薬：トラゼンタ（リナグリプチン）</strong>
          <div style="font-size:0.78rem; color:#334155; line-height:1.5; margin-top:4px;">
            約95%が胆汁排泄！腎障害の進行度に関わらず<strong>常に5mg 1日1回固定で減量不要</strong>（透析患者も同用量）。低血糖リスクが極めて低く安全。テネリアも肝腎両経路で使いやすい。
          </div>
        </div>

        <div style="background:white; border-left:4px solid #16a34a; padding:10px 14px; border-radius:6px;">
          <strong style="color:#15803d; font-size:0.85rem;">🦵 痛風・高尿酸血症：フェブリク（フェブキソスタット）</strong>
          <div style="font-size:0.78rem; color:#334155; line-height:1.5; margin-top:4px;">
            主たる排泄経路が肝代謝。アロプリノール（ザイロリック）のような活性代謝物の蓄積毒性（重症薬疹SJS）がなく、<strong>中等度〜高度腎機能低下例でも安全に漸増可能</strong>。
          </div>
        </div>

        <div style="background:white; border-left:4px solid #16a34a; padding:10px 14px; border-radius:6px;">
          <strong style="color:#15803d; font-size:0.85rem;">🩸 降圧薬：アムロジピン ＆ ミカルディス（テルミサルタン）</strong>
          <div style="font-size:0.78rem; color:#334155; line-height:1.5; margin-top:4px;">
            アムロジピン（CCB）は肝代謝で腎機能低下時も常用可能。テルミサルタン（ARB）は<strong>99%以上が胆汁排泄</strong>され尿中排泄率は1%未満！腎不全患者の降圧に極めて有利。
          </div>
        </div>

        <div style="background:white; border-left:4px solid #16a34a; padding:10px 14px; border-radius:6px;">
          <strong style="color:#15803d; font-size:0.85rem;">🚽 慢性便秘薬：モビコール ＆ グーフィス（エロビキシバット）</strong>
          <div style="font-size:0.78rem; color:#334155; line-height:1.5; margin-top:4px;">
            酸化マグネシウムの高Mg血症リスクを回避！モビコール（ポリエチレングリコール）は腸管から体内に吸収されず便を軟化。グーフィスは回腸局所作用で全身曝露なし。
          </div>
        </div>

        <div style="background:white; border-left:4px solid #16a34a; padding:10px 14px; border-radius:6px;">
          <strong style="color:#15803d; font-size:0.85rem;">⚡ 疼痛・解熱鎮痛：カロナール（アセトアミノフェン）</strong>
          <div style="font-size:0.78rem; color:#334155; line-height:1.5; margin-top:4px;">
            肝グルクロン酸抱合代謝。<strong>NSAIDs（ロキソニン等）はプロスタグランジン遮断により輸入細動脈を収縮させ重篤な腎虚血AKIを誘発する</strong>ため、腎機能低下者にはカロナールが第一選択！
          </div>
        </div>
      </div>
    </div>

    <!-- PART 4: シックデイ指導（SADMANS）＆ 疑義照会・トレーシングレポート定型文 -->
    <div style="background:#fffbeb; border:1.5px solid #fde68a; border-radius:12px; padding:18px 20px; margin-bottom:28px;">
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
        <span style="font-size:1.3rem;">🛑</span>
        <h3 style="margin:0; font-size:1.05rem; color:#92400e; font-weight:800;">
          薬局からのアクション：シックデイ休薬ルール「SADMANS」＆ 疑義照会テンプレート
        </h3>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:14px;">
        <!-- シックデイSADMANS -->
        <div style="background:white; border:1px solid #fef3c7; border-radius:8px; padding:12px 14px;">
          <strong style="color:#b45309; font-size:0.88rem;">🚨 脱水・発熱・下痢時の休薬原則「SADMANS」</strong>
          <p style="font-size:0.78rem; color:#475569; margin:4px 0 8px 0; line-height:1.45;">
            脱水時に飲み続けると急性腎不全（AKI）や乳酸アシドーシス・ショックを誘発する薬剤の頭文字：
          </p>
          <ul style="margin:0; padding-left:18px; font-size:0.78rem; color:#334155; line-height:1.55;">
            <li><strong>S (SGLT2阻害薬)：</strong>脱水増悪、正常血糖ケトアシドーシス</li>
            <li><strong>A (ACE-I / ARB)：</strong>輸入細動脈拡張停止による糸球体濾過圧急落・AKI</li>
            <li><strong>D (Diuretics 利尿薬)：</strong>循環血漿量急減・循環不全ショック</li>
            <li><strong>M (Metformin メトホルミン)：</strong>嫌気性代謝亢進による致死性乳酸アシドーシス</li>
            <li><strong>A (ARNI / NSAIDs)：</strong>腎血流遮断による不可逆的腎障害</li>
            <li><strong>N (Non-steroidal MRA / 新規薬)：</strong>ケレンディア、ミネブロ等（高K血症）</li>
            <li><strong>S (SU薬)：</strong>食事不能時の遷延性重篤低血糖</li>
          </ul>
        </div>

        <!-- 疑義照会・トレーシングレポート定型文 -->
        <div style="background:white; border:1px solid #fef3c7; border-radius:8px; padding:12px 14px;">
          <strong style="color:#b45309; font-size:0.88rem;">📋 コピペで使える疑義照会・処方提案定型文（実務テンプレート）</strong>
          
          <div style="margin-top:8px; font-size:0.75rem; background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px 10px; line-height:1.45; color:#1e293b;">
            <strong>【照会例①：高齢者バルトレックス過量】</strong><br>
            「患者様は82歳女性、体重38kg、血清Cr 0.5mg/dL（筋肉量考慮ラウンドアップ0.6にて推算Ccr 約34mL/min）でございます。バルトレックス通常量（1回1000mg 1日3回）ではアシクロビル脳症のリスクが懸念されます。添付文書のCcr 30〜50基準に基づき【1回1000mg 1日2回】への減量、または腎機能減量不要な【アメナリーフ錠 1日1回2錠 食後】への変更をご検討いただけませんでしょうか。」
          </div>

          <div style="margin-top:8px; font-size:0.75rem; background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px 10px; line-height:1.45; color:#1e293b;">
            <strong>【照会例②：CKD患者の酸化マグネシウム漫然投与】</strong><br>
            「直近検査値にてeGFR 28mL/min/1.73m²（CKD G4）が確認されました。長期間酸化マグネシウムをご内服中ですが、厚労省適正使用通知の通り高マグネシウム血症（心機能抑制・意識障害）のリスクが高まっております。血清Mg測定のご検討、または非吸収性の便軟化薬【モビコール配合散】への切り替えをご提案申し上げます。」
          </div>
        </div>
      </div>
    </div>
`;
}

// 適用処理
function run() {
  console.log('--- Applying Pharmacy Renal Practice & Master ---');
  const labPath = path.join(ROOT_DIR, 'src', '15_lab_values.html');
  let labHtml = fs.readFileSync(labPath, 'utf8');

  // 1. ピルボタンの破損修復と新ボタン追加
  const targetOldPills = `<div class="dict-category-pills" style="margin-bottom:18px;">
      <button class="dict-btn active" onclick="filterLabSection('all', this)">すべて表示</button>
      <button class="dict-btn" onclick="document.getElementById('renal-simulator').scrollIntoView({behavior:'smooth'})" style="background:#e0f2fe; color:#0369a1; font-weight:700; border-color:#38bdf8;">⚡ 腎機能・減量シミュレーター</button>
      <button class="dict-btn" onclick="filterLabSection('lab-sec-renal', this)">🩺 ① 腎機能（eGFR/Ccr/ACR）</button>
      <button class="dict-btn" onclick="filterLabSection('lab-sec-hepatic', this)">🥩 ② 肝機能・胆道（AST/ALT/Alb）</button>
      <button class="dict-btn" onclick="filterLabSection('lab-sec-electrolyte', this)">⚡ ③ 電解質（K/Na/Ca/Mg）</button>
      <button class="dict-btn" onclick="filterLabSection('lab-sec-cardiac', this)">❤️ ④ 心不全・心筋（BNP/NT-proBNP）</button>
      <button class="dict-btn" onclick="filterLabSection('lab-sec-inflam', this)">🔥 ⑤ 炎症・感染・自己免疫</button>
      <b`;

  const newPills = `<div class="dict-category-pills" style="margin-bottom:18px;">
      <button class="dict-btn active" onclick="filterLabSection('all', this)">すべて表示</button>
      <button class="dict-btn" onclick="document.getElementById('renal-simulator').scrollIntoView({behavior:'smooth'})" style="background:#e0f2fe; color:#0369a1; font-weight:700; border-color:#38bdf8;">⚡ 腎機能シミュレーター</button>
      <button class="dict-btn" onclick="document.getElementById('pharmacy-renal-practice').scrollIntoView({behavior:'smooth'})" style="background:#0284c7; color:white; font-weight:800; border-color:#0369a1; box-shadow:0 1px 3px rgba(2,132,199,0.3);">📘 薬局での腎機能評価＆腎排泄薬</button>
      <button class="dict-btn" onclick="filterLabSection('lab-sec-renal', this)">🩺 ① 腎機能（eGFR/Ccr）</button>
      <button class="dict-btn" onclick="filterLabSection('lab-sec-hepatic', this)">🥩 ② 肝機能・胆道</button>
      <button class="dict-btn" onclick="filterLabSection('lab-sec-electrolyte', this)">⚡ ③ 電解質（K/Na/Ca/Mg）</button>
      <button class="dict-btn" onclick="filterLabSection('lab-sec-cardiac', this)">❤️ ④ 心不全・心筋</button>
      <button class="dict-btn" onclick="filterLabSection('lab-sec-inflam', this)">🔥 ⑤ 炎症・感染・自己免疫</button>
      <button class="dict-btn" onclick="filterLabSection('lab-sec-metabolic', this)">🍬 ⑥ 血糖・代謝・脂質</button>
      <button class="dict-btn" onclick="filterLabSection('lab-sec-heme', this)">🩸 ⑦ 血液・凝固</button>
    </div>`;

  const oldPillFragment = `    utton class="dict-btn" onclick="filterLabSection('lab-sec-metabolic', this)">🍬 ⑥ 血糖・代謝・脂質</button>
      <button class="dict-btn" onclick="filterLabSection('lab-sec-heme', this)">🩸 ⑦ 血液・凝固（貧血/PT-INR）</button>
    </div>`;

  let labNorm = labHtml.replace(/\r\n/g, '\n');

  if (labNorm.includes(targetOldPills)) {
    labNorm = labNorm.replace(targetOldPills, newPills);
    console.log('1. Fixed and upgraded pill buttons.');
  } else {
    console.error('Failed to find targetOldPills');
  }

  if (labNorm.includes(oldPillFragment)) {
    labNorm = labNorm.replace(oldPillFragment, '');
    console.log('2. Removed fragmented pill buttons.');
  } else {
    console.error('Failed to find oldPillFragment');
  }

  // 2. renal-simulator の直後に新セクションを挿入
  const renalSimEnd = `      <!-- 判定結果グリッド -->
      <div id="renalResultsGrid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(320px, 1fr)); gap:12px;">
        <!-- JS動的レンダリング -->
      </div>
    </div>`;

  const newSectionHtml = generatePharmacyRenalHtml();

  if (labNorm.includes(renalSimEnd)) {
    labNorm = labNorm.replace(renalSimEnd, renalSimEnd + '\n' + newSectionHtml);
    console.log('3. Inserted pharmacy-renal-practice section.');
  } else {
    console.error('Failed to find renalSimEnd');
  }

  fs.writeFileSync(labPath, labNorm.replace(/\n/g, '\r\n'), 'utf8');
  console.log('src/15_lab_values.html updated successfully.');
}

run();
