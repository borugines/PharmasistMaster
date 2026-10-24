const fs = require('fs');
const path = require('path');

console.log('=== Adding Rank 101-120 (第6弾) to Master System ===');

// 1. Update src/02_hero_nav.html
const heroPath = path.join(__dirname, '../02_hero_nav.html');
let heroContent = fs.readFileSync(heroPath, 'utf8');
if (heroContent.includes('🏆 薬局頻出TOP100')) {
  heroContent = heroContent.replace('🏆 薬局頻出TOP100', '🏆 薬局頻出TOP150');
  fs.writeFileSync(heroPath, heroContent, 'utf8');
  console.log('Successfully updated 02_hero_nav.html to TOP150!');
} else {
  console.log('02_hero_nav.html already updated or target text not found.');
}

// 2. Update src/16_top100.html
const top100Path = path.join(__dirname, '../16_top100.html');
let top100Content = fs.readFileSync(top100Path, 'utf8');

// Update Header title & subtitle
top100Content = top100Content.replace(
  '🏆 薬局対応・処方箋受付頻出疾患ランキング TOP 100 完全ナビゲーター',
  '🏆 薬局対応・処方箋受付頻出疾患ランキング TOP 150 完全ナビゲーター'
);
top100Content = top100Content.replace(
  '調剤薬局の現場で遭遇する上位100疾患をランキング順に完全網羅。「20位ごと」に実装・精査を進行中！',
  '調剤薬局の現場で遭遇する上位150疾患をランキング順に完全網羅。「20位ごと」に実装・精査を進行中！'
);
top100Content = top100Content.replace(
  '🎉 全100疾患 100% 完備完了！',
  '🚀 第6弾（101〜120位）実装完了！'
);

// Add Filter button for Range 6
const oldFilterBtn = `<button class="filter-btn" onclick="filterTop100Range('r5', this)">【第5弾】81位〜100位（小児・皮膚・泌尿器・専門領域）</button>`;
const newFilterBtn = `<button class="filter-btn" onclick="filterTop100Range('r5', this)">【第5弾】81位〜100位（小児・皮膚・泌尿器・専門領域）</button>
      <button class="filter-btn" onclick="filterTop100Range('r6', this)">【第6弾】101位〜120位（がん・難病・産科・専門疾患）</button>`;

if (top100Content.includes(oldFilterBtn) && !top100Content.includes("filterTop100Range('r6'")) {
  top100Content = top100Content.replace(oldFilterBtn, newFilterBtn);
  console.log('Successfully added Filter Button for r6 in 16_top100.html!');
}

// Construct Range 6 Cards
const range6Html = `
    <!-- ==================== RANGE 6: 101〜120位 ==================== -->
    <div id="top100-range-r6" class="top100-range-pane" style="display:none;">
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:14px;">
        
        <!-- 101位 乳がん -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">101位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">乳がん（ホルモン療法・経口抗がん剤）</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>腫瘍・婦人科</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> タモキシフェン（ノルバデックス）、アナストロゾール（アリミデックス）、レトロゾール、ベージニオ、TS-1
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>閉経前（タモキシフェン/LH-RH）vs 閉経後（アロマターゼ阻害薬：骨密度低下・関節痛注意）。CDK4/6阻害薬ベージニオ（下痢・好中球減少・間質性肺炎：初期下痢止併用）。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c1')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-onc')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('乳がん')">🔍 検索</button>
          </div>
        </div>

        <!-- 102位 前立腺がん -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">102位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">前立腺がん（ホルモン療法・経口抗がん剤）</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>腫瘍・泌尿器</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> カソデックス（ビカルタミド）、リュープリン、イクスタンジ（エンザルタミド）、ニュベクオ、ザイティガ
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>CAB療法（抗アンドロゲン＋LH-RH）。新規ARSI（イクスタンジ：てんかん禁忌、転倒骨折注意）。ザイティガはプレドニン併用必須（低K・高血圧防止）＆空腹時服用厳守！
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c9')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-onc')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('前立腺がん')">🔍 検索</button>
          </div>
        </div>

        <!-- 103位 大腸がん・胃がん・肺がん等 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">103位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">大腸がん・胃がん・肺がん等（経口抗がん剤・分子標的薬）</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>腫瘍・消化器・呼吸器</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> TS-1（ティーエスワン）、カペシタビン（ゼローダ）、タグリッソ、ロンサーフ、スティーバーガ
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>**厳格な休薬期間管理**（TS-1休薬忘れは致死的大事故）。カペシタビン（手足症候群保湿徹底）。タグリッソ（間質性肺炎・心不全・皮疹先制治療）。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c1')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-onc')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('経口抗がん剤')">🔍 検索</button>
          </div>
        </div>

        <!-- 104位 1型糖尿病 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">104位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">1型糖尿病（インスリン療法・持続血糖測定）</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>代謝・内分泌</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> 超速効型（フィアスプ/ノボラピッド）、持効型（トレシーバ/ランタスXR）、フリースタイルリブレ、バクスミー
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>**基礎インスリン中断は絶対厳禁（即座にDKAケトアシドーシス発症）！** シックデイ時も自己判断中止禁止。CGM指導、重症低血糖時バクスミー点鼻粉末携帯。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c3')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-dm')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('1型糖尿病')">🔍 検索</button>
          </div>
        </div>

        <!-- 105位 心臓弁膜症・機械弁置換術後 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">105位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">心臓弁膜症・機械弁置換術後（ワルファリン管理）</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>循環器</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> ワルファリンカリウム、ラシックス、ジゴキシン
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>**「機械弁＝DOAC絶対禁忌！ワルファリン一択！」**。PT-INR目標域（2.0〜3.0）。納豆・青汁・クロレラ摂取絶対禁止！抗生剤・NSAIDs併用時のINR急変注意。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c5')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-cv')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('心臓弁膜症・機械弁置換術後')">🔍 検索</button>
          </div>
        </div>

        <!-- 106位 臓器移植後 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">106位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">臓器移植後（腎移植・肝移植等の免疫抑制療法）</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>移植・免疫</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> プログラフ（タクロリムス）、ネオーラル、セルセプト（MMF）、メドロール、バクタ
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>**血中濃度モニタリング（TDM）とトラフ採血直前の服用厳禁**。グレープフルーツ・セイヨウオトギリソウ相互作用。日和見感染予防（バクタ錠）の継続指導。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c9')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-imm')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('臓器移植後')">🔍 検索</button>
          </div>
        </div>

        <!-- 107位 クローン病 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">107位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">クローン病</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>消化器・難病</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> エレンタール、ペンタサ（小腸全域放出型）、ヒュミラ皮下注、レミケード、ステラーラ
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>全消化管の縦走潰瘍・狭窄。**成分栄養剤エレンタールの栄養療法（フレーバー工夫でコンプライアンス向上）**。生物学的製剤継続と感染症・結核スクリーニング。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c25')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-gi')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('クローン病')">🔍 検索</button>
          </div>
        </div>

        <!-- 108位 全身性エリテマトーデス（SLE）・膠原病 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">108位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">全身性エリテマトーデス（SLE）・膠原病</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>リウマチ・膠原病・難病</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> プラケニル（ヒドロキシクロロキン）、プレドニゾロン、ベンリスタ、セルセプト、プログラフ
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>**プラケニル投与開始前および投与中の定期的な眼科受診（網膜障害の早期発見：視力低下・色覚異常注意）**。ステロイド離脱症状・骨粗鬆症対策。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c16')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-imm')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('全身性エリテマトーデス')">🔍 検索</button>
          </div>
        </div>

        <!-- 109位 非結核性抗酸菌症（NTM症・MAC症）・結核 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">109位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">非結核性抗酸菌症（NTM症・MAC症）・結核</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>呼吸器・感染症</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> クラリス（クラリスロマイシン）、リファジン（リファンピシン）、エブトール（エタンブトール）
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>肺MAC症の**3剤併用療法（CAM＋RFP＋EB）**。リファンピシン（**尿・体液の赤橙色着色**、強力CYP誘導）。エタンブトール（**球後視神経炎・視力低下**：視覚違和感で即眼科）。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c8')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-inf')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('非結核性抗酸菌症')">🔍 検索</button>
          </div>
        </div>

        <!-- 110位 切迫早産・妊娠高血圧症候群・つわり -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">110位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">切迫早産・妊娠高血圧症候群・つわり（産科領域）</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>産婦人科</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> ウテメリン（リトドリン）、アルドメット（メチルドパ）、プリンペラン、小半夏加茯苓湯
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>リトドリン（β2刺激による**動悸・手指振戦・頻脈**、急激中止のリバウンド収縮注意）。妊婦高血圧は**メチルドパ第一選択**（ACEi/ARBは胎児毒性で絶対禁忌）。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c13')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-extra')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('切迫早産')">🔍 検索</button>
          </div>
        </div>

        <!-- 111位 加齢黄斑変性・糖尿病網膜症 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">111位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">加齢黄斑変性・糖尿病網膜症</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>眼科</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> アイリーア硝子体内注射、ルセンティス、バビースモ、オキュバイト（ルテイン配合）
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>脈絡膜新生血管への抗VEGF硝子体内注射（定期継続指導）。糖尿病網膜症は初期自覚症状ゼロのため**血糖管理＋半年ごとの散瞳眼底検査受診**の徹底。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c14')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-extra')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('加齢黄斑変性')">🔍 検索</button>
          </div>
        </div>

        <!-- 112位 突発性難聴・耳鳴症 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">112位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">突発性難聴・耳鳴症</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>耳鼻咽喉科</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> プレドニン（大量漸減療法）、アデホスコーワ、メチコバール、ストミンA
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>**「発症48時間以内のステロイド大量漸減開始が聴力予後を決定！」**。プレドニンの指示通り漸減遵守（自己判断急激中断厳禁）。耳鳴にはATP＋VB12併用。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c14')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-extra')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('突発性難聴')">🔍 検索</button>
          </div>
        </div>

        <!-- 113位 尿路結石症 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">113位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">尿路結石症（腎結石・尿管結石）</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>泌尿器</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> ウラリット、ウロカルン、タムスロシン（ハルナール）、ロキソニン
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>ウラリットで尿pH 6.2〜6.8アルカリ化維持（尿酸結石溶解）。ハルナールは**尿管平滑筋弛緩による排石促進（カメレオン処方）**。1日2L飲水励行。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c9')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-ckd')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('尿路結石症')">🔍 検索</button>
          </div>
        </div>

        <!-- 114位 慢性膵炎 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">114位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">慢性膵炎</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>消化器</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> リパクレオン（パンクレリパーゼ）、フオパン（カモスタット）、コスパノン
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>リパクレオンは**腸溶性顆粒のため「噛まずに服用」**（噛むと口内炎・胃酸失活）。蛋白分解酵素阻害薬で膵性腹痛緩和。**禁酒・低脂肪食**徹底。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c25')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-gi')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('慢性膵炎')">🔍 検索</button>
          </div>
        </div>

        <!-- 115位 肝硬変 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">115位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">肝硬変（高アンモニア血症・腹水管理など）</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>消化器・肝胆膵</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> リフキシマ（リファキシミン）、モニラック（ラクツロース）、リーバクト、サムスカ
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>肝性脳症予防（難吸収性抗菌薬リフキシマ＋排便ラクツロース）。BCAA（リーバクト）。難治性腹水には低Na血症を起こしにくいサムスカ（V2拮抗薬）併用。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c25')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-gi')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('肝硬変')">🔍 検索</button>
          </div>
        </div>

        <!-- 116位 腎性貧血・透析患者の二次性副甲状腺機能亢進症 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">116位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">腎性貧血・透析患者の二次性副甲状腺機能亢進症</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>腎臓・透析</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> エベレンゾ（HIF-PH阻害薬）、ネスプ、レグパラ、オルケディア、ピートル
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>経口HIF-PH阻害薬エベレンゾ（**Hb>12〜13g/dLでの血栓塞栓症注意**）。カルシウム受容体作動薬（レグパラ：悪心嘔吐・低Ca血症注意、オルケディアは嘔気軽減）。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c19')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-ckd')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('腎性貧血')">🔍 検索</button>
          </div>
        </div>

        <!-- 117位 強迫性障害・社交不安障害 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">117位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">強迫性障害・社交不安障害</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>精神神経科</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> ルボックス / デプロメール（フルボキサミン）、ジェイゾロフト、レクサプロ
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>強迫性障害（OCD）には**うつ病より高用量のSSRI（フルボキサミン最大200〜300mg等）が必要**。効果発現に8〜12週要するため焦らず継続。自己中断離脱症状注意。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c22')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-psy')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('強迫性障害')">🔍 検索</button>
          </div>
        </div>

        <!-- 118位 自閉スペクトラム症（ASD）に伴う易刺激性 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">118位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">自閉スペクトラム症（ASD）に伴う易刺激性</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>小児精神科・心療内科</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> エビリファイ（アリピプラゾール 1mg〜）、リスパダール（リスペリドン）
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>小児ASDのかんしゃく・攻撃性に対し**極少量（エビリファイ1mg/日〜）から開始**。体重換算用量の監査、**体重増加・食欲亢進・鎮静・アカシジア（そわそわ感）**を観察。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c23')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-psy')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('自閉スペクトラム症')">🔍 検索</button>
          </div>
        </div>

        <!-- 119位 アルコール依存症 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">119位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">アルコール依存症</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>精神科・依存症</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> レグテクト（アカンプロサート）、セリンクロ（ナルメフェン）、ノックビン、シアナマイド
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>**断酒維持＝レグテクト**（飲酒欲求抑制）。**減酒＝セリンクロ**（飲酒前1〜2時間頓服）。**抗酒薬＝ノックビン**（ALDH阻害で激しい悪酔い、アルコール含有食品・蒸気注意）。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c22')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-psy')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('アルコール依存症')">🔍 検索</button>
          </div>
        </div>

        <!-- 120位 本態性振戦 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">120位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">本態性振戦（手の震え）</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>神経内科</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> アルマール（アロチノロール）、インデラル（プロプラノロール）、リボトリール
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>パーキンソンの「安静時振戦」と異なり、**「コップを持つ・字を書くなど動作時・姿勢保持時に震える」**。第一選択アロチノロール（**気管支喘息禁忌・徐脈注意**）。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c26')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-cv')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('本態性振戦')">🔍 検索</button>
          </div>
        </div>

      </div>
    </div>
`;

// Insert range 6 after range 5
const r5CloseTag = '    </div>\n\n  </div>\n</div>';
if (top100Content.includes(r5CloseTag) && !top100Content.includes('id="top100-range-r6"')) {
  top100Content = top100Content.replace(r5CloseTag, '    </div>\n' + range6Html + '\n  </div>\n</div>');
  fs.writeFileSync(top100Path, top100Content, 'utf8');
  console.log('Successfully inserted Range 6 into 16_top100.html!');
} else {
  console.log('Range 6 already inserted or r5CloseTag not found.');
}

// 3. Update src/05_comparison.html (Add 3 new comparison tables)
const compPath = path.join(__dirname, '../05_comparison.html');
let compContent = fs.readFileSync(compPath, 'utf8');

const newComparisonsHtml = `
    <!-- 🎗️ 【がんホルモン療法・経口抗がん薬 ガチンコ比較】 -->
    <div class="sub-banner banner-class" style="margin-top:20px;">
      <span>🎗️ 【がんホルモン療法・経口抗がん薬 ガチンコ比較】乳がん（閉経前・後） vs 前立腺がん（CAB・ARSI） vs 経口抗がん薬（TS-1・カペシタビン）</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">薬剤名（商品名）</th>
          <th style="width:18%;">作用機序・分類</th>
          <th style="width:18%;">適応・用法</th>
          <th style="width:22%;">キャラクター立ち・強み</th>
          <th style="width:26%;">現場の鑑査急所・ピットフォール</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>タモキシフェン</strong><br>（ノルバデックス）</td>
          <td>選択的エストロゲン受容体調節薬（SERM）</td>
          <td>乳がん（主に<strong>閉経前</strong>）<br>1日1回 20mg</td>
          <td><span class="char">閉経前乳がんホルモン療法の主軸</span><br>乳腺ではER拮抗、骨・脂質ではER作動として働く。</td>
          <td>血栓塞栓症（深部静脈血栓VTEリスク）、子宮内膜肥厚・不正出血の確認。CYP2D6阻害薬（パロキセチン等）併用で効果減弱に注意！</td>
        </tr>
        <tr>
          <td><strong>アナストロゾール</strong><br>（アリミデックス）</td>
          <td>非ステロイド性アロマターゼ阻害薬（AI）</td>
          <td>乳がん（<strong>閉経後</strong>）<br>1日1回 1mg</td>
          <td><span class="char">閉経後乳がんの第一選択薬</span><br>閉経後の末梢脂肪組織でのエストロゲン産生を元から完全ブロック。</td>
          <td>体内のエストロゲンが激減するため<strong>「骨粗鬆症・骨折リスク急上昇」「関節痛・こわばり」</strong>が高率に出現。骨密度定期測定・BP製剤併用検討。</td>
        </tr>
        <tr>
          <td><strong>ベージニオ錠</strong><br>（アベマシクリブ）</td>
          <td>CDK4/6阻害薬<br>（細胞周期G1/S進行停止）</td>
          <td>HR陽性HER2陰性乳がん<br>1回150mg 1日2回 連日</td>
          <td><span class="char">ホルモン受容体陽性乳がんの救世主</span><br>内分泌療法併用で進行・再発を大幅に抑制。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【下痢のマネジメントが死活問題！】</span> 服用初期（数日〜数週）に高率で下痢発現。ロペラミド（ロペミン）処方準備。好中球減少・間質性肺炎の監視。</td>
        </tr>
        <tr>
          <td><strong>イクスタンジ</strong><br>（エンザルタミド）</td>
          <td>アンドロゲン受容体シグナル伝達阻害薬（ARSI）</td>
          <td>前立腺がん（CRPC等）<br>1日1回 160mg</td>
          <td><span class="char">前立腺がんアンドロゲン完全遮断薬</span><br>受容体結合、核内移行、DNA結合の3段階を全てブロック。</td>
          <td>血液脳関門を通過しGABA_A受容体を阻害するため<strong>「てんかん・痙攣発作の既往は禁忌」</strong>。疲労感・ふらつき・転倒骨折リスクに注意指導。</td>
        </tr>
        <tr>
          <td><strong>TS-1配合カプセル/OD</strong><br>（ティーエスワン）</td>
          <td>経口抗悪性腫瘍剤<br>（5-FU系プロドラッグ合剤）</td>
          <td>胃がん、大腸がん、肺がん等<br>体表面積別用量 1日2回</td>
          <td><span class="char">外来通院がん治療を支える経口5-FUの王様</span><br>テガフール＋ギメラシル＋オテラシルカリウムの3成分配合。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【厳格な休薬期間管理！】</span> 例：4週投与2週休薬、2週投与1週休薬。患者が勝手に連日飲み続けると致死的な骨髄抑制・劇症下痢を引き起こす！</td>
        </tr>
      </tbody>
    </table>

    <!-- 🛡️ 【免疫抑制薬・膠原病 ガチンコ比較】 -->
    <div class="sub-banner banner-class" style="margin-top:20px;">
      <span>🛡️ 【免疫抑制薬・膠原病 ガチンコ比較】臓器移植（タクロリムス vs シクロスポリン vs セルセプト） ＆ SLE特効薬（プラケニル）</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">薬剤名（商品名）</th>
          <th style="width:18%;">主成分・機序</th>
          <th style="width:18%;">適応・用法</th>
          <th style="width:22%;">強み・特徴</th>
          <th style="width:26%;">現場の鑑査急所・ピットフォール</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>プログラフ / グラセプター</strong><br>（タクロリムス）</td>
          <td>カルシニューリン阻害薬（CNI）<br>（IL-2産生抑制）</td>
          <td>腎・肝・心・肺移植、重症筋無力症、ループス腎炎等</td>
          <td><span class="char">拒絶反応を制する免疫抑制の絶対エース</span><br>シクロスポリンより数十倍強力なT細胞活性化抑制作用。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【TDM（薬物血中濃度モニタリング）必須！】</span> トラフ濃度を測定。採血当日の朝は採血終了まで服用しない！GFJ・セントジョーンズワート厳禁。腎毒性・高カリウム・高血糖に警戒。</td>
        </tr>
        <tr>
          <td><strong>セルセプト</strong><br>（ミコフェノール酸モフェチル）</td>
          <td>IMPDH阻害薬<br>（de novoプリン合成阻害）</td>
          <td>腎・心・肝・肺移植、ループス腎炎</td>
          <td><span class="char">リンパ球特異的な増殖抑制薬</span><br>CNIと異なり腎毒性がないため移植レジメンの併用標準薬。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【催奇形性リスク：妊婦・妊娠希望女性に絶対禁忌！】</span> 骨髄抑制（白血球・好中球減少）、消化器症状（激しい下痢・嘔気）。</td>
        </tr>
        <tr>
          <td><strong>プラケニル</strong><br>（ヒドロキシクロロキン）</td>
          <td>アミノキノリン系<br>（TLRシグナル・免疫複合体阻害）</td>
          <td>全身性エリテマトーデス（SLE）、皮膚エリテマトーデス</td>
          <td><span class="char">SLEの生命予後を改善する世界標準薬</span><br>ループス再燃を有意に抑制し、ステロイド減量を可能にする。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【定期的な眼科検査（網膜症予防）が絶対必須！】</span> 投与前および投与中は年1回の精密眼底検査。視野欠損・色覚異常・夜盲が出現したら即座に中止し眼科受診。</td>
        </tr>
      </tbody>
    </table>

    <!-- 🍺 【アルコール依存症治療薬 ガチンコ比較】 -->
    <div class="sub-banner banner-class" style="margin-top:20px;">
      <span>🍺 【アルコール依存症治療薬 ガチンコ比較】断酒維持（レグテクト） vs 減酒（セリンクロ） vs 抗酒薬（ノックビン・シアナマイド）</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">薬剤名（製品名）</th>
          <th style="width:18%;">作用機序・分類</th>
          <th style="width:18%;">服用タイミング・用法</th>
          <th style="width:22%;">強み・キャラクター立ち</th>
          <th style="width:26%;">現場の鑑査急所・ピットフォール</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>レグテクト錠</strong><br>（アカンプロサート）</td>
          <td>NMDA受容体調節・GABA作動促進<br>（飲酒欲求低減薬）</td>
          <td>1回333mg 1日3回 食後<br><strong>断酒継続を目的</strong></td>
          <td><span class="char">「お酒を飲みたい渇望」を脳から消す薬</span><br>断酒意志のある患者の再飲酒防止（スリップ防止）。抗酒薬のような悪酔い作用なし。</td>
          <td>お酒を完全にやめる（断酒）意志がある患者のみに使用。腎排泄型のため<strong>中等度〜重度腎機能障害（Ccr<50）には禁忌・慎重投与</strong>。下痢・軟便が出やすい。</td>
        </tr>
        <tr>
          <td><strong>セリンクロ錠</strong><br>（ナルメフェン）</td>
          <td>オピオイド受容体調節薬（μ/δ拮抗・κ部分作動）<br>（飲酒量低減薬）</td>
          <td>飲酒の<strong>1〜2時間前</strong>に10mgを1回頓服<br><strong>減酒を目的</strong></td>
          <td><span class="char">「飲み始めたら止まらない」暴飲をストップ</span><br>お酒による脳内報酬系（多幸感・快楽）を遮断し、飲む杯数を減らす画期的な減酒薬。</td>
          <td>毎日飲むのではなく<strong>「お酒を飲みそうになる日・時間」の1〜2時間前に飲む頓服薬</strong>。オピオイド鎮痛薬を服用中の患者には禁忌（離脱症状誘発）。悪心・浮動性めまい・不眠に注意。</td>
        </tr>
        <tr>
          <td><strong>ノックビン / シアナマイド</strong><br>（ジスルフィラム / シアナミド）</td>
          <td>アルデヒド脱水素酵素（ALDH）阻害薬<br>（抗酒薬）</td>
          <td>1日1回 朝食後（または就寝前）定期服用</td>
          <td><span class="char">「飲んだら地獄の悪酔い」で物理的に飲酒を断つ</span><br>アセトアルデヒドを体内に急激蓄積させ、顔面紅潮・動悸・激しい頭痛・嘔吐を誘発。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【アルコール含有食品・外用薬・蒸気にも超厳重警戒！】</span> 奈良漬け、ウイスキーボンボン、養命酒、料理酒、アルコール消毒液の吸入でもショック症状。投与前48時間は断酒確認！</td>
        </tr>
      </tbody>
    </table>
`;

const compTarget = '    <!-- 🧴 外用ステロイド 5段階ランク × 全身吸収率';
if (compContent.includes(compTarget) && !compContent.includes('🎗️ 【がんホルモン療法・経口抗がん薬 ガチンコ比較】')) {
  compContent = compContent.replace(compTarget, newComparisonsHtml + '\n' + compTarget);
  fs.writeFileSync(compPath, compContent, 'utf8');
  console.log('Successfully inserted 3 comparison tables into 05_comparison.html!');
} else {
  console.log('05_comparison.html already updated or target not found.');
}

// 4. Update src/14_dictionary.html (Add 12 new drug cards)
const dictPath = path.join(__dirname, '../14_dictionary.html');
let dictContent = fs.readFileSync(dictPath, 'utf8');

const newDictCardsHtml = `
    <!-- 101〜120位 新規追加医薬品カード -->
    <div class="dict-card" data-type="drug" data-kana="た" data-name="タモキシフェン錠" data-desc="選択的エストロゲン受容体調節薬（serm）。ノルバデックス。主に閉経前乳がんのホルモン療法。血栓塞栓症（vte）リスク、子宮内膜変化に注意。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">タモキシフェン錠 20mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">ノルバデックス / 抗乳がん・SERM</div>
        <div class="dict-card-desc">閉経前乳がんの標準内分泌療法。乳腺組織でエストロゲン受容体を拮抗阻害。血栓塞栓症リスク（下肢浮腫・息切れ）に注意。CYP2D6阻害薬（パロキセチン等）併用注意。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-onc')">⚔️ がん薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c1')">📘 支持療法ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('タモキシフェン')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="あ" data-name="アナストロゾール錠" data-desc="非ステロイド性アロマターゼ阻害薬。アリミデックス。閉経後乳がんホルモン療法第一選択。末梢脂肪組織のエストロゲン産生を遮断。骨粗鬆症・関節痛に注意。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">アナストロゾール錠 1mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">アリミデックス / アロマターゼ阻害薬</div>
        <div class="dict-card-desc">閉経後乳がんの第一選択ホルモン薬。エストロゲン合成を強力に阻害。骨密度低下による骨折リスクが高まるため定期的な骨塩測定指導。手指・膝の関節痛こわばり確認。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-onc')">⚔️ がん薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c1')">📘 支持療法ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('アナストロゾール')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="へ" data-name="ベージニオ錠" data-desc="cdk4/6阻害薬。アベマシクリブ。進行・再発乳がん、術後補助療法。高頻度の下痢に注意（ロペラミド早期併用）。好中球減少・間質性肺炎のモニタリング。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ベージニオ錠 50mg / 100mg / 150mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">アベマシクリブ / CDK4/6阻害薬</div>
        <div class="dict-card-desc">細胞周期を停止させ乳がん増殖を阻止。服用初期（特に1〜2週）に高頻度で下痢が発生するため、下痢止めロペラミドの事前処方と水分補給を徹底指導。倦怠感・発熱時連絡。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-onc')">⚔️ がん薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c1')">📘 支持療法ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('ベージニオ')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="い" data-name="イクスタンジカプセル / 錠" data-desc="新規アンドロゲン受容体シグナル伝達阻害薬（arsi）。エンザルタミド。前立腺がん治療薬。てんかん既往は禁忌。ふらつき・転倒骨折リスクに注意。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">イクスタンジカプセル / 錠 40mg / 80mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">エンザルタミド / 前立腺がん・ARSI</div>
        <div class="dict-card-desc">アンドロゲン受容体の核内移行・DNA結合を遮断。血液脳関門を通過しGABA受容体を阻害するため、てんかん・痙攣発作の既往は禁忌。転倒・骨折リスクに注意。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-onc')">⚔️ がん薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c9')">📘 泌尿器ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('イクスタンジ')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="て" data-name="ティーエスワン配合カプセル / OD錠" data-desc="経口抗悪性腫瘍薬。ts-1。胃がん・大腸がん・肺がん等。厳格な休薬期間管理が必須！休薬忘れによる重篤な骨髄抑制死を防止せよ。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ティーエスワン配合カプセル / OD錠（TS-1）</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">テガフール・ギメラシル・オテラシルカリウム / 経口フッ化ピリミジン系</div>
        <div class="dict-card-desc">外来がん治療の主軸経口薬。**「指示された休薬期間（例：2週服用1週休薬）」を厳格に守らせる服薬カレンダー指導が最重要**。下痢・発熱・口内炎時の即座の受診指導。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-onc')">⚔️ がん薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c1')">📘 支持療法ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('TS-1')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="ふ" data-name="プログラフカプセル / グラセプター" data-desc="カルシニューリン阻害薬（cni）。タクロリムス。臓器移植後の拒絶反応抑制。tdm（血中濃度モニタリング）必須。グレープフルーツ禁忌。トラフ採血前内服禁止。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">プログラフカプセル / グラセプター</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">タクロリムス水和物 / 免疫抑制薬</div>
        <div class="dict-card-desc">臓器移植後の生着維持。TDMが必須であり、採血日当日の朝は採血が終わるまで服用しない指導を徹底。CYP3A4阻害薬・グレープフルーツ・セントジョーンズワート厳禁。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-imm')">⚔️ 免疫薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c9')">📘 泌尿器ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('プログラフ')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="ふ" data-name="プラケニル錠" data-desc="アミノキノリン系全身性エリテマトーデス（sle）治療薬。ヒドロキシクロロキン。定期的な眼科受診（網膜症予防）が絶対必須。視野異常で即眼科受診。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">プラケニル錠 200mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">ヒドロキシクロロキン硫酸塩 / SLE治療薬</div>
        <div class="dict-card-desc">SLEの疾患活動性と再燃を有意に抑制する標準薬。**「投与前および年1回以上の定期的な眼科検査（網膜症モニタリング）」**の受診を必ず確認。視力低下や色覚異常時は直ちに受診指導。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-imm')">⚔️ 免疫薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c16')">📘 皮膚科ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('プラケニル')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="え" data-name="エブトール錠" data-desc="抗結核薬・抗酸菌薬。エタンブトール。肺mac症の3剤併用療法標準薬。球後視神経炎・視力障害・赤緑色覚異常に注意。自覚症状出現で即中止。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">エブトール錠 125mg / 250mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">エタンブトール塩酸塩 / 抗酸菌症・結核治療薬</div>
        <div class="dict-card-desc">肺MAC症（CAM＋RFP＋EB）の重要成分。特有の重篤な副作用として**「球後視神経炎による視力低下・視野狭窄・赤緑色覚異常」**があるため、目がかすむ・見えにくい時は直ちに服用中止し眼科へ。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-inf')">⚔️ 感染症比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c8')">📘 感染症ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('エブトール')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="う" data-name="ウテメリン錠" data-desc="子宮収縮抑制薬。リトドリン。切迫早産治療薬。β2受容体作動により子宮筋を弛緩。母体の動悸・手指振戦・頻脈注意。急激中止によるリバウンド注意。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ウテメリン錠 5mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">リトドリン塩酸塩 / 切迫早産治療薬</div>
        <div class="dict-card-desc">切迫早産時の子宮収縮を抑制。β2刺激作用により**母体の動悸・頻脈・手の震え（手指振戦）**が高率に出現。自己判断での急な中止は陣痛誘発のリバウンドを起こすため指示通り服用。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-extra')">⚔️ 比較表</button><button class="dict-jump-btn" onclick="jumpToGuide('c13')">📘 婦人科ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('ウテメリン')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="れ" data-name="レグテクト錠" data-desc="飲酒欲求低減薬。アカンプロサート。アルコール依存症における断酒維持。中枢神経のグルタミン酸受容体を調節。断酒意志のある患者に処方。下痢・腎機能注意。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">レグテクト錠 333mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">アカンプロサートカルシウム / アルコール依存症断酒維持薬</div>
        <div class="dict-card-desc">お酒を飲みたい渇望（craving）を抑え断酒をサポート。1回2錠を1日3回食後に服用。中等度以上の腎障害（Ccr<50）には禁忌。悪酔いさせる薬ではないため断酒意志の維持が必須。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-psy')">⚔️ 精神科比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c22')">📘 精神科ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('レグテクト')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="せ" data-name="セリンクロ錠" data-desc="飲酒量低減薬。ナルメフェン。アルコール依存症患者の減酒治療。飲酒の1〜2時間前に頓服。飲酒による報酬系をブロック。オピオイド鎮痛薬服用者は禁忌。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">セリンクロ錠 10mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">ナルメフェン塩酸塩水和物 / 飲酒量低減薬</div>
        <div class="dict-card-desc">飲酒による脳内の快楽シグナルを遮断し「飲み過ぎ」を抑制する減酒薬。**「お酒を飲む日・飲酒の1〜2時間前」に1錠頓服**。オピオイド鎮痛薬服用患者には離脱発現のため禁忌。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-psy')">⚔️ 精神科比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c22')">📘 精神科ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('セリンクロ')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="あ" data-name="アルマール錠" data-desc="αβ遮断薬。アロチノロール。高血圧症および本態性振戦治療薬。コップを持つ時などの手の震え（動作時・姿勢時振戦）に第一選択。気管支喘息禁忌・徐脈注意。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">アルマール錠 5mg / 10mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">アロチノロール塩酸塩 / 本態性振戦・αβ遮断薬</div>
        <div class="dict-card-desc">本態性振戦（物を掴む時や字を書く時の手の震え）の第一選択薬。末梢β2受容体遮断により筋紡錘の律動的興奮を抑制。**気管支喘息患者には禁忌**。徐脈・めまい・ふらつきに注意。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-cv')">⚔️ 循環器比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c26')">📘 神経ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('アルマール')">📋 詳細</button>
      </div>
    </div>
`;

const dictTarget = '  </div>\n</div>\n\n<!-- 🧪 臨床検査値評価';
if (dictContent.includes(dictTarget) && !dictContent.includes('タモキシフェン錠 20mg')) {
  dictContent = dictContent.replace(dictTarget, newDictCardsHtml + '\n' + dictTarget);
  fs.writeFileSync(dictPath, dictContent, 'utf8');
  console.log('Successfully inserted 12 drug cards into 14_dictionary.html!');
} else {
  console.log('14_dictionary.html already updated or target not found.');
}

// 5. Update src/09_app.js (Add to DRUG_DB)
const appPath = path.join(__dirname, '../09_app.js');
let appContent = fs.readFileSync(appPath, 'utf8');

const newDrugDbEntries = `  // 101〜120位 専門・がん・難病薬剤
  { name: "タモキシフェン", gen: "タモキシフェン", cat: "101. 乳がん", char: "閉経前乳がんの主軸！SERM製剤で血栓塞栓症（VTE）や子宮内膜変化に注意", desc: "乳腺組織でエストロゲン受容体をブロック。CYP2D6阻害薬（パロキセチン等）併用で活性代謝物エンドキシフェン生成が抑制され効果減弱。深部静脈血栓注意。", gId: "c1", cSec: "sec-onc" },
  { name: "アナストロゾール", gen: "アナストロゾール", cat: "101. 乳がん", char: "閉経後乳がんの第一選択！末梢アロマターゼ阻害で骨粗鬆症・関節痛に注意", desc: "閉経後のエストロゲン産生を元から絶つ。体内のエストロゲン激減により骨塩量低下・骨折リスクが高まるため定期採血・骨密度測定必須。関節のこわばり指導。", gId: "c1", cSec: "sec-onc" },
  { name: "ベージニオ", gen: "アベマシクリブ", cat: "101. 乳がん", char: "進行乳がんの救世主CDK4/6阻害薬！初期の激しい下痢にロペラミド早期対処", desc: "細胞周期G1/S期停止。服用開始数日から2週間に高率で下痢発現。ロペラミド処方準備。好中球減少・間質性肺炎の初期症状（空咳・息切れ）に警戒指導。", gId: "c1", cSec: "sec-onc" },
  { name: "イクスタンジ", gen: "エンザルタミド", cat: "102. 前立腺がん", char: "新規アンドロゲン受容体シグナル阻害薬（ARSI）！てんかん禁忌＆転倒骨折注意", desc: "アンドロゲンの受容体結合・核移行・DNA結合をトリプル遮断。中枢GABA受容体阻害による痙攣リスクからてんかん既往は禁忌。ふらつき・骨折に注意。", gId: "c9", cSec: "sec-onc" },
  { name: "TS-1", gen: "テガフール・ギメラシル・オテラシルK", cat: "103. 経口抗がん剤", char: "胃・大腸・肺がんの外来主軸！指示された休薬期間の遵守が絶対の生命線", desc: "経口フッ化ピリミジン配合剤。休薬忘れによる連日内服は致死的な重篤骨髄抑制を引き起こす。下痢・口内炎・発熱時の即座受診と休薬遵守を徹底指導。", gId: "c1", cSec: "sec-onc" },
  { name: "プログラフ / グラセプター", gen: "タクロリムス", cat: "106. 臓器移植後", char: "拒絶反応を制する免疫抑制の絶対エース！TDM必須＆採血前服用厳禁", desc: "カルシニューリンを阻害しIL-2産生抑制。血中トラフ濃度モニタリング必須。採血当日は採血終了まで飲まない。グレープフルーツ・セイヨウオトギリソウ厳禁。", gId: "c9", cSec: "sec-imm" },
  { name: "プラケニル", gen: "ヒドロキシクロロキン", cat: "108. 全身性エリテマトーデス", char: "SLEの再燃を防ぎ生命予後を延ばす世界標準薬！年1回の定期眼科検査必須", desc: "TLRシグナル阻害等で免疫活性化を抑制。網膜症による不可逆な視力障害を防ぐため、投与前および年1回の眼科精密検査（黄斑部検査）が受診必須条件。", gId: "c16", cSec: "sec-imm" },
  { name: "エブトール", gen: "エタンブトール", cat: "109. 非結核性抗酸菌症", char: "肺MAC症3剤併用の要！球後視神経炎・視力低下・赤緑色覚異常に厳重警戒", desc: "クラリス＋リファンピシンと併用。特有の副作用「球後視神経炎（目のかすみ・視力低下・赤と緑の区別がつかない）」が出たら即服用中止し眼科受診を徹底指導。", gId: "c8", cSec: "sec-inf" },
  { name: "ウテメリン", gen: "リトドリン塩酸塩", cat: "110. 切迫早産", char: "子宮平滑筋弛緩による切迫早産薬！動悸・手指振戦・急激中止のリバウンド注意", desc: "β2受容体刺激で子宮収縮を強力抑制。母体の動悸・頻脈・手の震えが出やすい。自己判断で急にやめると陣痛が急発進するリバウンドがあるため指示通り内服。", gId: "c13", cSec: "sec-extra" },
  { name: "レグテクト", gen: "アカンプロサート", cat: "119. アルコール依存症", char: "お酒を飲みたい渇望を脳から鎮める断酒維持薬！断酒意志のある患者に処方", desc: "グルタミン酸神経伝達を抑制し飲酒欲求を低減。悪酔いさせる薬ではないため断酒意志が前提。腎排泄型のためCcr<50の中等度以上腎機能障害には禁忌・慎重投与。", gId: "c22", cSec: "sec-psy" },
  { name: "セリンクロ", gen: "ナルメフェン", cat: "119. アルコール依存症", char: "飲酒の1〜2時間前に飲む減酒頓服薬！オピオイド鎮痛薬服用者は禁忌", desc: "オピオイド受容体を調節し飲酒による快楽シグナルを遮断して深酒を防ぐ。「飲酒しそうな日の1〜2時間前」に頓服。オピオイド服用者は離脱発現のため禁忌。", gId: "c22", cSec: "sec-psy" },
  { name: "アルマール", gen: "アロチノロール", cat: "120. 本態性振戦", char: "動作時・姿勢時の手の震えを止める第一選択薬！気管支喘息には絶対禁忌", desc: "パーキンソンの安静時振戦と異なり「物を掴む・字を書く」時の震えに著効。末梢β2遮断で震戦を抑制。気管支喘息禁忌・高度徐脈注意。高齢者のふらつき確認。", gId: "c26", cSec: "sec-cv" },
`;

const appTarget = '  { name: "アメナリーフ錠", gen: "アメナメビル",';
if (appContent.includes(appTarget) && !appContent.includes('タモキシフェン')) {
  appContent = appContent.replace(appTarget, newDrugDbEntries + '\n' + appTarget);
  fs.writeFileSync(appPath, appContent, 'utf8');
  console.log('Successfully inserted new drugs into 09_app.js DRUG_DB!');
} else {
  console.log('09_app.js already updated or target not found.');
}

console.log('=== Rank 101-120 Integration Complete! ===');
