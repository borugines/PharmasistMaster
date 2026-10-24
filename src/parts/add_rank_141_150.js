const fs = require('fs');
const path = require('path');

console.log('=== Adding Rank 141-150 (第8弾・最終章) to Master System ===');

// 1. Update src/16_top100.html
const top100Path = path.join(__dirname, '../16_top100.html');
let top100Content = fs.readFileSync(top100Path, 'utf8');

// Update Status Badge to 150 Complete
top100Content = top100Content.replace(
  '🚀 第6弾（101〜120位）実装完了！',
  '🎉 祝！全150疾患 100% 完全制覇・全完備達成！'
);

// Add Filter button for Range 8
const oldFilterBtn = `<button class="filter-btn" onclick="filterTop100Range('r7', this)">【第7弾】121位〜140位（神経難病・感染症・小児専門・救急）</button>`;
const newFilterBtn = `<button class="filter-btn" onclick="filterTop100Range('r7', this)">【第7弾】121位〜140位（神経難病・感染症・小児専門・救急）</button>
      <button class="filter-btn" onclick="filterTop100Range('r8', this)">【第8弾】141位〜150位（自律神経・局所外科・トラベル・老年フレイル）</button>`;

if (top100Content.includes(oldFilterBtn) && !top100Content.includes("filterTop100Range('r8'")) {
  top100Content = top100Content.replace(oldFilterBtn, newFilterBtn);
  console.log('Successfully added Filter Button for r8 in 16_top100.html!');
}

// Construct Range 8 Cards
const range8Html = `
    <!-- ==================== RANGE 8: 141〜150位 ==================== -->
    <div id="top100-range-r8" class="top100-range-pane" style="display:none;">
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:14px;">
        
        <!-- 141位 起立性調節障害・低血圧症 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">141位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">起立性調節障害（OD）・低血圧症</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>小児科・心療内科</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> メドドリン（ミドドリン：α1作動）、リズミック（アメジニウム）、苓桂朮甘湯
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>思春期の朝起き不良・立ちくらみ。水分1.5〜2L・塩分摂取・弾性ストッキング指導。ミドドリン（臥位高血圧防止のため**「就寝直前の服用は避ける」**）。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c2')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-cv')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('起立性調節障害')">🔍 検索</button>
          </div>
        </div>

        <!-- 142位 摂食障害 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">142位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">摂食障害（神経性やせ症・過食症）</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>精神神経科・心療内科</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> SSRI（ジェイゾロフト/ルボックス）、ジプレキサ少量、ラコールNF
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>神経性やせ症への**リフィーディング症候群（急激な糖補給による低リン血症・心不全）**厳戒。過食・自己誘発性嘔吐による低K血症・QT延長・不整脈リスク監視。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c22')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-psy')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('摂食障害')">🔍 検索</button>
          </div>
        </div>

        <!-- 143位 自律神経失調症 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">143位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">自律神経失調症</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>心療内科</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> グランダキシン（トフィソパム）、加味逍遙散、柴胡加竜骨牡蛎湯、半夏厚朴湯
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>不定愁訴（動悸・めまい・息苦しさ）。トフィソパム（**視床下部自律神経中枢に選択的**で抗不安・筋弛緩が極めて弱く日中の眠気が出にくい）。漢方の証に合わせ併用。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c22')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-psy')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('自律神経失調症')">🔍 検索</button>
          </div>
        </div>

        <!-- 144位 リンパ浮腫・慢性静脈不全 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">144位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">リンパ浮腫・慢性静脈不全</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>血管外科・形成外科</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> 弾性ストッキング（圧迫療法）、柴苓湯、ヘパリン類似物質
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>がん術後（乳がん・子宮がん郭清後）の片側性浮腫。**「利尿薬は血管内脱水を招きリンパ液を濃縮するため原則無効！」**。弾性ストッキング圧迫排液と蜂窩織炎予防。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c2')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-cv')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('リンパ浮腫')">🔍 検索</button>
          </div>
        </div>

        <!-- 145位 肥厚性瘢痕・ケロイド -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">145位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">肥厚性瘢痕・ケロイド</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>形成外科・皮膚科</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> リザベン（トラニラスト）、エクラープラスター、ドレニゾンテープ、ケナコルト局注
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>トラニラスト（コラーゲン過剰産生抑制、膀胱炎様症状注意）。**エクラープラスター（正常皮膚を避け、患部の形に合わせて正確にハサミで切って貼付指導）**。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c16')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-imm')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('ケロイド')">🔍 検索</button>
          </div>
        </div>

        <!-- 146位 腋窩多汗症・原発性手掌多汗症 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">146位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">腋窩多汗症・原発性手掌多汗症</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>皮膚科</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> エクロックゲル（ソフピロニウム）、ラピフォート、アポハイドローション
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>外用抗コリン薬。アポハイド（**就寝前手掌塗布、起床後直ちに手洗い**）。**「薬液のついた手で目をこすると散瞳・視覚障害」**が起きるため手洗い徹底指導。閉塞隅角緑内障禁忌。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c16')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-imm')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('多汗症')">🔍 検索</button>
          </div>
        </div>

        <!-- 147位 陥入爪・爪囲炎 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">147位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">陥入爪（巻き爪）・爪囲炎（ひょう疽）</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>皮膚科・形成外科</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> ゲンタシン軟膏、フシジンレオ軟膏、セファレキシン内服、テーピング
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>深爪が主因の爪食い込み・化膿。急性期は外用・経口抗菌薬（黄色ブドウ球菌カバー）。**深爪をやめ「四角く切る（スクエアオフ）」指導**とテーピングによる除圧。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c16')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-imm')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('爪囲炎')">🔍 検索</button>
          </div>
        </div>

        <!-- 148位 しゃっくり（吃逆） -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">148位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">しゃっくり（吃逆）</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>総合内科・漢方</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> ツムラ柿蒂湯（シテイトウ 138番）、コントミン（クロルプロマジン）、芍薬甘草湯
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>**柿蒂湯（カキのヘタ：しゃっくり特効漢方、お湯に溶かして温服）**。頑固な難治性吃逆には中枢性抗ドパミン薬コントミン（吃逆適応あり：眠気・ふらつき・錐体外路症状注意）。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c11')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-gi')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('しゃっくり')">🔍 検索</button>
          </div>
        </div>

        <!-- 149位 高山病・時差ボケ・月経移動 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">149位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">高山病・時差ボケ・月経移動（予防・自費診療処方）</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>トラベルクリニック・自費</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> ダイアモックス（アセタゾラミド）、ロゼレム、プラノバール（中用量ピル）
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>高山病（ダイアモックス：**代謝性アシドーシスで過換気を促し血中酸素上昇**、登山前日〜開始、手足しびれ・多尿）。月経移動（早める/遅らせる法の服用期間・血栓症注意）。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c13')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-extra')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('高山病')">🔍 検索</button>
          </div>
        </div>

        <!-- 150位 フレイル・サルコペニア・低栄養 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">150位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">フレイル・サルコペニア・低栄養（経腸栄養剤・漢方処方）</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>老年内科・在宅医療</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> エンシュア・H、ラコールNF、人参養栄湯（ツムラ108番）、十全大補湯
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>高齢者低栄養対策。エンシュア・H（1mL=1.5kcal、高浸透圧性下痢を防ぐため**「時間をかけゆっくり飲む」**指導、フレーバー工夫）。人参養栄湯（食欲・筋肉量維持、BCAA補給併用）。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c10')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-gi')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('フレイル')">🔍 検索</button>
          </div>
        </div>

      </div>
    </div>
`;

// Insert range 8 after range 7
const r7CloseTag = '    </div>\n\n  </div>\n</div>';
if (top100Content.includes(r7CloseTag) && !top100Content.includes('id="top100-range-r8"')) {
  top100Content = top100Content.replace(r7CloseTag, '    </div>\n' + range8Html + '\n  </div>\n</div>');
  fs.writeFileSync(top100Path, top100Content, 'utf8');
  console.log('Successfully inserted Range 8 into 16_top100.html!');
} else {
  console.log('Range 8 already inserted or r7CloseTag not found.');
}

// 2. Update src/05_comparison.html (Add 2 new comparison tables)
const compPath = path.join(__dirname, '../05_comparison.html');
let compContent = fs.readFileSync(compPath, 'utf8');

const newComparisonsHtml = `
    <!-- 💦 【多汗症治療薬 ガチンコ比較】 -->
    <div class="sub-banner banner-class" style="margin-top:20px;">
      <span>💦 【原発性局所多汗症 外用抗コリン薬 ガチンコ比較】腋窩多汗症（エクロック vs ラピフォート） vs 手掌多汗症（アポハイド） vs 全身（プロ・バンサイン）</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">薬剤名（商品名）</th>
          <th style="width:18%;">適応部位・剤形</th>
          <th style="width:18%;">用法・塗布タイミング</th>
          <th style="width:22%;">強み・特徴</th>
          <th style="width:26%;">現場の鑑査急所・ピットフォール</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>エクロックゲル 5%</strong><br>（ソフピロニウム臭化物）</td>
          <td>原発性<strong>腋窩多汗症</strong><br>（ゲル・ボトル容器）</td>
          <td>1日1回 両脇に塗布<br>専用アプリケーター使用</td>
          <td><span class="char">日本初の内用外用抗コリン薬</span><br>エクリン汗腺のM3受容体を遮断。専用ツイストボトルで直接脇に塗れる。</td>
          <td>アプリケーターで塗るため薬液が手につかない工夫。塗布後の脇が乾くまで衣服を着ない。閉塞隅角緑内障・前立腺肥大症には禁忌。</td>
        </tr>
        <tr>
          <td><strong>ラピフォートワイプ 2.5%</strong><br>（グリコピロニウムトシル酸塩）</td>
          <td>原発性<strong>腋窩多汗症</strong><br>（個包装不織布ワイプ）</td>
          <td>1日1回 両脇を1包で<br>1回拭き取る</td>
          <td><span class="char">1回使い捨てシートで衛生・携帯性抜群</span><br>旅行や外出先でもサッと拭くだけで1日中汗を抑制。</td>
          <td>1包で両脇を拭いた後、<strong>「直ちに手を石鹸で洗う」</strong>指導。薬液がついた手で目をこすると散瞳・調節障害（目のかすみ・羞明）を起こす！</td>
        </tr>
        <tr>
          <td><strong>アポハイドローション 20%</strong><br>（オキシブチニン塩酸塩）</td>
          <td>原発性<strong>手掌多汗症</strong><br>（手掌専用ローション）</td>
          <td><strong>就寝前</strong> 1回5プッシュを手掌全体に塗布</td>
          <td><span class="char">手汗に悩む患者待望の手のひら専用薬</span><br>試験・面接・PC操作・握手の不安を解消。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【塗布タイミングと翌朝手洗いが命！】</span> 就寝前に塗り、**翌朝起床後直ちに水と石鹸で手を洗い流す**。塗ったまま目をこすらない！口渇・羞明に注意。</td>
        </tr>
      </tbody>
    </table>

    <!-- 🥤 【経腸栄養剤 ＆ 補益漢方 ガチンコ比較】 -->
    <div class="sub-banner banner-class" style="margin-top:20px;">
      <span>🥤 【経腸栄養剤 ＆ 補益漢方 ガチンコ比較】エンシュア（高カロリー） vs ラコール（半消化態） vs エレンタール（成分栄養） ＆ 人参養栄湯</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">製品名・方剤名</th>
          <th style="width:18%;">区分・カロリー密度</th>
          <th style="width:18%;">適応・主な対象</th>
          <th style="width:22%;">強み・特徴</th>
          <th style="width:26%;">現場の鑑査急所・ピットフォール</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>エンシュア・H / リキッド</strong><br>（半消化態経腸栄養剤）</td>
          <td>エンシュア・H：<strong>1.5 kcal/mL</strong><br>（250mLで375kcal）</td>
          <td>フレイル、がん悪液質、低栄養状態、術後回復期</td>
          <td><span class="char">少量で高カロリーを稼げる絶対エース</span><br>バニラ・コーヒー・バナナ・黒糖・ストロベリー等フレーバー多彩。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【ゴクゴク一気飲みは高浸透圧性下痢の元！】</span> 1缶を30分〜1時間以上かけてゆっくりちびちび飲む指導。開封後は要冷蔵・24時間以内に消費。</td>
        </tr>
        <tr>
          <td><strong>ラコールNF配合経腸用液</strong><br>（半消化態経腸栄養剤）</td>
          <td><strong>1.0 kcal/mL</strong><br>（200mLで200kcal）</td>
          <td>一般低栄養、術後、経管栄養・経口摂取併用</td>
          <td><span class="char">生理的浸透圧に近く下痢を起こしにくい</span><br>パウチ包装で廃棄が容易。ミルク、コーヒー、ココア味。</td>
          <td>牛乳由来成分（カゼイン）を含むため<strong>牛乳アレルギー患者には絶対禁忌！</strong> 経管投与時の注入速度（初期は100mL/h以下）を遵守。</td>
        </tr>
        <tr>
          <td><strong>ツムラ人参養栄湯</strong><br>（漢方エキス 108番）</td>
          <td>気血両虚・補益剤<br>12種類の生薬配合</td>
          <td>フレイル・サルコペニア、病後・術後の体力低下、食欲不振、疲労倦怠</td>
          <td><span class="char">筋肉量低下と食欲不振を元から底上げ</span><br>十全大補湯（48番）に「遠志・五味子・陳皮」を加え、呼吸機能や健忘・食欲も包括改善。</td>
          <td>甘草含有のため長期連用時の低カリウム血症・浮腫に注意。高齢者の筋肉維持にはタンパク質・BCAA摂取と軽いレジスタンス運動の併用を指導。</td>
        </tr>
      </tbody>
    </table>
`;

const compTarget = '    <!-- 外用ステロイド 5段階ランク × 全身吸収率マトリクス -->';
if (compContent.includes(compTarget) && !compContent.includes('💦 【原発性局所多汗症 外用抗コリン薬 ガチンコ比較】')) {
  compContent = compContent.replace(compTarget, newComparisonsHtml + '\n' + compTarget);
  fs.writeFileSync(compPath, compContent, 'utf8');
  console.log('Successfully inserted 2 comparison tables into 05_comparison.html!');
} else {
  console.log('05_comparison.html already updated or target not found.');
}

// 3. Update src/14_dictionary.html (Add 8 new drug cards)
const dictPath = path.join(__dirname, '../14_dictionary.html');
let dictContent = fs.readFileSync(dictPath, 'utf8');

const newDictCardsHtml = `
    <!-- 141〜150位 新規追加医薬品カード -->
    <div class="dict-card" data-type="drug" data-kana="め" data-name="メドドリン錠" data-desc="選択的α1受容体作動薬。ミドドリン。起立性調節障害（od）、本態性低血圧症治療薬。末梢血管を収縮させ血圧を上昇。臥位高血圧を防ぐため就寝直前の服用回避。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">メドドリン錠 2mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">ミドドリン塩酸塩 / 起立性調節障害・昇圧薬</div>
        <div class="dict-card-desc">末梢のα1受容体を選択的刺激し動脈・静脈を収縮、起立時の血圧低下と脳血流減少を防止。朝の起床困難・立ちくらみに特効。仰臥位高血圧を防ぐため**就寝直前の服用は避ける**指導。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-cv')">⚔️ 循環器比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c2')">📘 循環器ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('メドドリン')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="く" data-name="グランダキシン錠" data-desc="自律神経調整薬。トフィソパム。自律神経失調症、更年期障害の不定愁訴。視床下部に選択的作動。抗不安・筋弛緩作用が極めて弱く日中の眠気が出にくい。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">グランダキシン錠 50mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">トフィソパム / 自律神経調整薬</div>
        <div class="dict-card-desc">視床下部・自律神経中枢に作用し、交感神経と副交感神経のアンバランス（動悸・息切れ・倦怠感）を是正。通常のベンゾジアゼピンと異なり鎮静・筋弛緩作用が極小で眠気が出にくい。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-psy')">⚔️ 精神科比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c22')">📘 心療内科ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('グランダキシン')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="え" data-name="エクラープラスター" data-desc="ステロイド含有貼付剤。デプロドンプロピオン酸エステル。肥厚性瘢痕・ケロイド治療薬。患部の大きさに合わせてハサミで切って貼付指導。正常皮膚接触防止。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">エクラープラスター 20μg/cm2</h3>
          <span class="dict-badge dict-badge-drug">💊 外用貼付</span>
        </div>
        <div class="dict-card-sub">デプロドンプロピオン酸エステル / 瘢痕・ケロイド貼付剤</div>
        <div class="dict-card-desc">ステロイドの密封包帯療法（ODT）効果をテープ1枚で実現。ケロイドの赤み・盛り上がり・痛痒さを強力沈静化。**「患部の大きさに合わせ正確にハサミで切り、正常皮膚にはみ出さない」**指導。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-imm')">⚔️ 皮膚科比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c16')">📘 皮膚科ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('エクラープラスター')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="え" data-name="エクロックゲル" data-desc="外用抗コリン薬。ソフピロニウム。原発性腋窩多汗症治療薬。専用アプリケーターで両脇に塗布。薬液の手付着厳禁。閉塞隅角緑内障・前立腺肥大症禁忌。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">エクロックゲル 5%</h3>
          <span class="dict-badge dict-badge-drug">💊 外用ゲル</span>
        </div>
        <div class="dict-card-sub">ソフピロニウム臭化物 / 原発性腋窩多汗症治療薬</div>
        <div class="dict-card-desc">日本初の腋窩多汗症治療薬。エクリン汗腺M3受容体を遮断し発汗を抑制。専用アプリケーターで塗布し手で直接触らない。塗布後乾くまで衣服着用回避。閉塞隅角緑内障・排尿障害禁忌。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-imm')">⚔️ 多汗症比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c16')">📘 皮膚科ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('エクロック')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="あ" data-name="アポハイドローション" data-desc="外用抗コリン薬。オキシブチニン。原発性手掌多汗症治療薬。就寝前に手のひらに塗布し、翌朝起床後直ちに手洗い徹底。塗った手で目をこすると散瞳注意。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">アポハイドローション 20%</h3>
          <span class="dict-badge dict-badge-drug">💊 外用液</span>
        </div>
        <div class="dict-card-sub">オキシブチニン塩酸塩 / 原発性手掌多汗症治療薬</div>
        <div class="dict-card-desc">手のひらの多汗症治療薬。**「就寝前、両手掌に5プッシュ塗布し、翌朝起床後直ちに石鹸流水で手を洗う」**指導が生命線。薬液がついた手で目をこすると散瞳・目のかすみ・羞明が起きるため注意。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-imm')">⚔️ 多汗症比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c16')">📘 皮膚科ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('アポハイド')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="し" data-name="ツムラ柿蒂湯エキス顆粒" data-desc="漢方薬138番。シテイトウ。頑固なしゃっくり（吃逆）の特効薬。カキのヘタ（柿蒂）配合。お湯に溶かして温服することで横隔膜痙攣を速やかに解除。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ツムラ柿蒂湯（138番）</h3>
          <span class="dict-badge dict-badge-drug">💊 漢方</span>
        </div>
        <div class="dict-card-sub">柿蒂湯エキス / 吃逆・しゃっくり治療薬</div>
        <div class="dict-card-desc">柿蒂（カキのヘタ）、丁香、生姜を配合したしゃっくりの第一選択漢方。気の逆流を降ろして横隔膜の異常興奮を鎮静。お湯に溶かして温かいうちにゆっくり服用すると効果的。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-gi')">⚔️ 消化器比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c11')">📘 胃腸ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('柿蒂湯')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="た" data-name="ダイアモックス錠" data-desc="炭酸脱水素酵素阻害薬。アセタゾラミド。緑内障・てんかん・高山病予防。代謝性アシドーシスを誘発し過換気を促して血中酸素を上昇。登山前日から服用。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ダイアモックス錠 250mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">アセタゾラミド / 高山病予防・炭酸脱水素酵素阻害薬</div>
        <div class="dict-card-desc">重炭酸排泄による軽度アシドーシスで呼吸中枢を刺激、高地での低酸素血症を改善する高山病標準予防薬。登山前日または当日朝から内服。手足のしびれ感・多尿・炭酸飲料の味覚変化に注意。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-extra')">⚔️ トラベル比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c13')">📘 自費・産婦ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('ダイアモックス')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="え" data-name="エンシュア・H" data-desc="高カロリー経腸栄養剤。1.5kcal/ml（250mlで375kcal）。フレイル・サルコペニア・低栄養。高浸透圧性下痢を防ぐため時間をかけゆっくり内服指導。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">エンシュア・H（缶 250mL）</h3>
          <span class="dict-badge dict-badge-drug">💊 経腸栄養</span>
        </div>
        <div class="dict-card-sub">経腸栄養剤 / 1.5kcal/mL 高濃度タイプ</div>
        <div class="dict-card-desc">少量で効率的にエネルギーと必須栄養素を補給。高濃度のため、一気飲みすると浸透圧性下痢やダンピング様症状を起こす。**「1缶を30分〜1時間かけてゆっくり飲む」**指導を徹底。多彩な味の選択。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-gi')">⚔️ 栄養剤比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c10')">📘 代謝栄養ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('エンシュア')">📋 詳細</button>
      </div>
    </div>
`;

const dictTarget = '    </div>\n</div>';
const lastIdx = dictContent.lastIndexOf(dictTarget);
if (lastIdx !== -1 && !dictContent.includes('メドドリン錠')) {
  dictContent = dictContent.substring(0, lastIdx) + newDictCardsHtml + '\n' + dictContent.substring(lastIdx);
  fs.writeFileSync(dictPath, dictContent, 'utf8');
  console.log('Successfully inserted 8 drug cards into 14_dictionary.html!');
} else {
  console.log('14_dictionary.html already updated or target not found.');
}

// 4. Update src/09_app.js (Add to DRUG_DB)
const appPath = path.join(__dirname, '../09_app.js');
let appContent = fs.readFileSync(appPath, 'utf8');

const newDrugDbEntries = `  // 141〜150位 自律神経・多汗症・トラベル・フレイル薬剤
  { name: "メドドリン", gen: "ミドドリン塩酸塩", cat: "141. 起立性調節障害", char: "末梢α1作動で立ちくらみ・朝の起き上がれなさを解消！就寝直前服用回避", desc: "選択的α1刺激により末梢血管を収縮させ起立時血圧低下を防止。朝起きられない思春期ODに特効。仰臥位高血圧を防ぐため就寝直前の内服は避けるよう指導。", gId: "c2", cSec: "sec-cv" },
  { name: "グランダキシン", gen: "トフィソパム", cat: "143. 自律神経失調症", char: "視床下部自律神経中枢に選択的作動！抗不安・眠気が極めて少ない調整薬", desc: "交感・副交感のアンバランスを是正。通常のベンゾジアゼピン系と異なり鎮静・筋弛緩作用がほぼ無いため日中眠気が出にくく仕事や学業に支障が出ない。", gId: "c22", cSec: "sec-psy" },
  { name: "エクラープラスター", gen: "デプロドンプロピオン酸エステル", cat: "145. ケロイド・瘢痕", char: "ステロイド密封貼付でケロイドを平坦化！患部の形に正確にハサミで切る", desc: "強力な抗炎症力を持つステロイド貼付テープ。正常皮膚を巻き込まないよう「患部の形にハサミで切って貼る」指導。皮膚菲薄化や毛細血管拡張に注意。", gId: "c16", cSec: "sec-imm" },
  { name: "エクロックゲル", gen: "ソフピロニウム臭化物", cat: "146. 原発性腋窩多汗症", char: "日本初の脇汗外用抗コリン薬！専用アプリケーターで直接塗布し手洗い徹底", desc: "エクリン汗腺M3受容体をブロックし発汗をストップ。アプリケーター使用で手に薬液を付けない。薬液がついた手で目を触ると散瞳・羞明。閉塞隅角緑内障禁忌。", gId: "c16", cSec: "sec-imm" },
  { name: "アポハイドローション", gen: "オキシブチニン塩酸塩", cat: "146. 原発性手掌多汗症", char: "手のひらの汗を止める手掌専用薬！就寝前塗布＆起床後直ちに手洗い徹底", desc: "手掌多汗症に就寝前5プッシュ塗布。起床後直ちに石鹸流水で手を洗う指導が必須。塗布後に目を触ると散瞳・調節障害（目のかすみ）。閉塞隅角緑内障禁忌。", gId: "c16", cSec: "sec-imm" },
  { name: "柿蒂湯", gen: "漢方エキス（ツムラ138番等）", cat: "148. しゃっくり（吃逆）", char: "カキのヘタが横隔膜の痙攣を鎮める吃逆特効薬！温服で速やかな効果発現", desc: "気の逆流を降ろしてしゃっくりを止める。お湯に溶かして温かいうちにゆっくり飲むと即効性が高まる。胃寒・胃腸虚弱にも安全に使用可能。", gId: "c11", cSec: "sec-gi" },
  { name: "ダイアモックス", gen: "アセタゾラミド", cat: "149. 高山病予防", char: "軽度アシドーシスで呼吸を刺激し血中酸素を底上げ！登山前日から服用", desc: "炭酸脱水素酵素阻害により過換気を促し高地低酸素血症を改善。登山前日または当日朝から服用。多尿・手足末梢のピリピリしびれ・炭酸味覚異常に注意指導。", gId: "c13", cSec: "sec-extra" },
  { name: "エンシュア・H", gen: "経腸栄養剤", cat: "150. フレイル・サルコペニア", char: "1mL=1.5kcalの高濃度栄養缶！浸透圧下痢を防ぐため時間をかけゆっくり飲む", desc: "フレイル・低栄養の栄養サポート。一気飲みすると浸透圧下痢や嘔気を起こすため「1缶を30分〜1時間かけてゆっくり飲む」指導。開缶後要冷蔵・24時間以内。", gId: "c10", cSec: "sec-gi" },
`;

const appTarget = '\n];';
if (appContent.includes(appTarget) && !appContent.includes('メドドリン')) {
  appContent = appContent.replace(appTarget, '\n' + newDrugDbEntries + '\n];');
  fs.writeFileSync(appPath, appContent, 'utf8');
  console.log('Successfully inserted new drugs into 09_app.js DRUG_DB!');
} else {
  console.log('09_app.js already updated or target not found.');
}

console.log('=== Rank 141-150 Integration Complete! ===');
