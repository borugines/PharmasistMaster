const fs = require('fs');
const path = require('path');

console.log('=== Adding Rank 121-140 (第7弾) to Master System ===');

// 1. Update src/16_top100.html
const top100Path = path.join(__dirname, '../16_top100.html');
let top100Content = fs.readFileSync(top100Path, 'utf8');

// Add Filter button for Range 7
const oldFilterBtn = `<button class="filter-btn" onclick="filterTop100Range('r6', this)">【第6弾】101位〜120位（がん・難病・産科・専門疾患）</button>`;
const newFilterBtn = `<button class="filter-btn" onclick="filterTop100Range('r6', this)">【第6弾】101位〜120位（がん・難病・産科・専門疾患）</button>
      <button class="filter-btn" onclick="filterTop100Range('r7', this)">【第7弾】121位〜140位（神経難病・感染症・小児専門・救急）</button>`;

if (top100Content.includes(oldFilterBtn) && !top100Content.includes("filterTop100Range('r7'")) {
  top100Content = top100Content.replace(oldFilterBtn, newFilterBtn);
  console.log('Successfully added Filter Button for r7 in 16_top100.html!');
}

// Construct Range 7 Cards
const range7Html = `
    <!-- ==================== RANGE 7: 121〜140位 ==================== -->
    <div id="top100-range-r7" class="top100-range-pane" style="display:none;">
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:14px;">
        
        <!-- 121位 重症筋無力症・多発性硬化症 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">121位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">重症筋無力症・多発性硬化症</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>神経難病・免疫</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> メスチノン（ピリドスチグミン）、プレドニン、タクロリムス、フィンゴリモド、タイサブリ
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>重症筋無力症（MG）のコリン作動性クリーゼ（唾液過多・縮瞳・下痢・筋力低下悪化）鑑別。多発性硬化症（MS）の再発予防薬と感染症・進行性多巣性白質脳症（PML）警戒。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c26')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-imm')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('重症筋無力症')">🔍 検索</button>
          </div>
        </div>

        <!-- 122位 線維筋痛症・慢性疼痛 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">122位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">線維筋痛症・慢性疼痛</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>心療内科・ペインクリニック</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> サインバルタ（デュロキセチン）、リリカ（プレガバリン）、トラマール、ノルスパンテープ
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>**NSAIDs無効（中枢感作・下行性疼痛抑制系の機能不全）**。サインバルタ（下行性抑制系を賦活：初期悪心・眠気注意）、リリカ（浮動性めまい・転倒予防）。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c6')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-pain')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('線維筋痛症')">🔍 検索</button>
          </div>
        </div>

        <!-- 123位 顔面神経麻痺 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">123位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">顔面神経麻痺（ベル麻痺・ハント症候群）</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>耳鼻咽喉科・神経内科</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> プレドニン（高用量漸減）、バルトレックス、メチコバール、アデホス
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>ベル麻痺（単純ヘルペス）vs ハント症候群（水痘帯状疱疹：耳介皮疹・難聴・めまい合併で重篤）。**発症72時間以内の「ステロイド＋抗ウイルス薬併用」**が予後の生命線！
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c14')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-inf')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('顔面神経麻痺')">🔍 検索</button>
          </div>
        </div>

        <!-- 124位 顎関節症 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">124位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">顎関節症</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>歯科口腔外科</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> ロキソニン、テルネリン（チザニジン）、ミオナール（エペリゾン）、スプリント
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>急性疼痛にはNSAIDs頓用、咀嚼筋（咬筋）過緊張には中枢性筋弛緩薬（チザニジン：眠気・ふらつき・血圧低下注意）。スプリント装着や食いしばり癖（TCH）是正指導。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c6')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-pain')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('顎関節症')">🔍 検索</button>
          </div>
        </div>

        <!-- 125位 口腔カンジダ症・口腔乾燥症 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">125位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">口腔カンジダ症・口腔乾燥症（ドライマウス）</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>口腔外科・耳鼻科</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> フロリードゲル経口用、ファンギゾン、サリベート、サラジェン
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>**吸入ステロイドうがい不足や義歯不潔**が主因。フロリードゲル（口内全体に行き渡らせてから嚥下、**ワルファリン併用で出血死リスク絶対禁忌！**）。ドライマウスに人工唾液。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c16')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-inf')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('口腔カンジダ症')">🔍 検索</button>
          </div>
        </div>

        <!-- 126位 嗅覚障害・味覚障害 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">126位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">嗅覚障害・味覚障害（亜鉛欠乏症など）</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>耳鼻咽喉科</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> ノベルジン（酢酸亜鉛）、プロマック（ポラプレジンク）、リンデロン点鼻、当帰芍薬散
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>味覚障害は**血清亜鉛欠乏（<80μg/dL）**チェック。ノベルジン内服時は血清銅（Cu）低下・貧血モニタリング。嗅覚障害の点鼻は嗅裂部へ届く「懸垂頭位手技」を指導。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c14')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-extra')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('味覚障害')">🔍 検索</button>
          </div>
        </div>

        <!-- 127位 こむら返り -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">127位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">こむら返り（有痛性筋痙攣）</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>漢方・整形外科</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> 芍薬甘草湯（ツムラ68番）、酸化マグネシウム、メチコバール
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>**芍薬甘草湯の神速即効性（服用数分で筋弛緩）**。頓用または就寝前。**「甘草含有量が方剤中トップクラス（6.0g/日処方）」のため連用時の偽アルドステロン症（低K・浮腫）厳戒！**
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c6')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-pain')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('こむら返り')">🔍 検索</button>
          </div>
        </div>

        <!-- 128位 凍瘡・あかぎれ・鶏眼 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">128位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">凍瘡（しもやけ）・あかぎれ・鶏眼（うおのめ）</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>皮膚科</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> ユベラ軟膏（トコフェロール/VitA）、ヘパリン類似物質、スピール膏（サリチル酸）
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>凍瘡（末梢血管うっ血：ビタミンE外用＋マッサージ・保温）。鶏眼・胼胝（角質肥厚：サリチル酸の角質融解作用、正常皮膚を避けて患部芯に貼るスピール膏指導）。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c16')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-imm')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('しもやけ')">🔍 検索</button>
          </div>
        </div>

        <!-- 129位 疥癬 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">129位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">疥癬（かいせん）</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>皮膚科・寄生虫</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> ストロメクトール（イベルメクチン）、スミスリンローション（フェノトリン）
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>ヒゼンダニ寄生による夜間の激烈な掻痒。**ストロメクトール（約200μg/kg、水のみで空腹時単回服用、1〜2週後に判定）**。角化型疥癬の厳重隔離と同居家族の一斉治療。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c16')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-inf')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('疥癬')">🔍 検索</button>
          </div>
        </div>

        <!-- 130位 アタマジラミ症・ケジラミ症 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">130位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">アタマジラミ症・ケジラミ症</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>皮膚科・OTC</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> スミスリンシャンプー プレミアム、スミスリンパウダー、専用すき櫛
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>卵には薬剤が無効なため、**「3日に1回（2日おき）に3〜4回繰り返す（孵化サイクル7〜10日に合わせ幼虫を順次駆除）」**。専用すき櫛での物理的除去、家族内タオルの共有禁止指導。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c16')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-inf')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('アタマジラミ')">🔍 検索</button>
          </div>
        </div>

        <!-- 131位 ぎょう虫症 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">131位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">ぎょう虫症</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>感染症・小児科</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> コンバントリン（ピランテルパモ酸塩）
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>夜間の肛門部掻痒感。**コンバントリン（10mg/kg単回服用、2〜3週後に同量を再服用）**。自家感染を防ぐため2回目服用が必須！家族全員の同時一斉駆除、手洗い爪切り徹底。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c18')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-inf')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('ぎょう虫症')">🔍 検索</button>
          </div>
        </div>

        <!-- 132位 梅毒・クラミジア等の性感染症（STI） -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">132位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">梅毒・クラミジア等の性感染症（STI）</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>泌尿器・皮膚科・性病科</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> ステルイズ筋注（ベンジルペニシリン）、サワシリン、ジスロマック、ビブラマイシン
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>梅毒（ステルイズ単回筋注またはサワシリン長期投与、初期ヘルクスハイマー反応）。クラミジア（ジスロマック1g単回内服）。**ピンポン感染防止（パートナー同時治療）**。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c8')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-inf')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('梅毒')">🔍 検索</button>
          </div>
        </div>

        <!-- 133位 HIV感染症・エイズ -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">133位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">HIV感染症・エイズ</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>感染症・免疫</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> ビクタルビ、ゲンボイヤ、デシコビ、ツルバダ、プレジコビックス
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>**アドヒアランス95%以上の厳格維持（飲み忘れは即座に変異・薬剤耐性を獲得し治療破綻）**。多剤併用相互作用（Mg/Al制酸剤キレート、CYP3A4阻害誘導チェック）。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c8')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-inf')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('HIV感染症')">🔍 検索</button>
          </div>
        </div>

        <!-- 134位 B型肝炎・C型肝炎 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">134位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">B型肝炎・C型肝炎（抗ウイルス療法）</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>消化器・肝臓内科</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> ベムリディ（TAF）、バラクルード、マヴィレット、エプクルーサ
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>B型肝炎（核酸アナログ：自己中断による劇症急性増悪リバウンド警戒）。C型肝炎（DAA製剤：マヴィレット8〜12週内服で**95%以上完全ウイルス排除SVR達成**、併用禁忌厳格チェック）。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c25')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-gi')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('B型肝炎')">🔍 検索</button>
          </div>
        </div>

        <!-- 135位 RSウイルス感染症・ヒトメタニューモウイルス感染症 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">135位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">RSウイルス感染症・ヒトメタニューモウイルス感染症</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>小児科・呼吸器</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> シナジス（パリビズマブ：抗体注射）、アレックスビー / アブリスボ（ワクチン）
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>乳幼児の急性細気管支炎（喘鳴・陥没呼吸注意）。高リスク児へのシナジス月1回筋注継続。60歳以上高齢者や妊婦（母体免疫）への新世代RSウイルスワクチン指導。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c18')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-inf')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('RSウイルス')">🔍 検索</button>
          </div>
        </div>

        <!-- 136位 マイコプラズマ肺炎・百日咳 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">136位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">マイコプラズマ肺炎・百日咳</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>小児科・呼吸器感染症</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> クラリス、ジスロマック、オゼックス（トスフロキサシン）、ミノマイシン
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>**マクロライド耐性マイコプラズマ**へのステップ（小児キノロン系トスフロキサシン、8歳以上ミノマイシン）。百日咳（マクロライド早期投与による排菌阻止・乳児重症化予防）。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c18')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-inf')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('マイコプラズマ肺炎')">🔍 検索</button>
          </div>
        </div>

        <!-- 137位 流行性耳下腺炎・風疹・麻疹 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">137位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">流行性耳下腺炎（おたふくかぜ）・風疹・麻疹</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>感染症・小児科・ワクチン</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> MR生ワクチン（麻疹風疹混合）、おたふくかぜ生ワクチン、カロナール
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>麻疹（空気感染・重篤肺炎脳炎・ワクチン2回必須）。風疹（**妊婦感染による先天性風疹症候群CRS防止**）。おたふくかぜ（ムンプス難聴・精巣炎合併防止・対症解熱）。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c18')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-inf')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('麻疹')">🔍 検索</button>
          </div>
        </div>

        <!-- 138位 クループ症候群 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">138位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">クループ症候群（急性声門下喉頭炎）</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>小児科・救急</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> デカドロンエリキシル（デキサメタゾン 0.15〜0.6mg/kg）、ボスミン吸入
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>**犬吠様咳嗽（ケンケンという咳）、吸気性喘鳴、嗄声**。デキサメタゾン単回投与（デカドロン）による声門下浮腫の速やかな消炎。重症吸気性呼吸苦へのアドレナリン吸入。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c18')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-inf')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('クループ症候群')">🔍 検索</button>
          </div>
        </div>

        <!-- 139位 アナフィラキシー -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">139位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">アナフィラキシー（エピペン処方・食物アレルギー・ハチ毒）</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>アレルギー・救急</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> エピペン（アドレナリン自己注射 0.15mg / 0.3mg）
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>**第一選択はアドレナリン筋肉注射（大腿前外側部）一択！**（ステロイド・抗ヒスタミンは補助）。「太もも外側に直角に強く押し当て5秒保持」。**注射後即座に救急車要請**。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c16')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-imm')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('アナフィラキシー')">🔍 検索</button>
          </div>
        </div>

        <!-- 140位 低身長症・思春期早発症 -->
        <div class="card" style="margin:0; padding:14px; border-left: 4px solid #16a34a; background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">140位</span>
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">低身長症（成長ホルモン治療）・思春期早発症</h3>
            </div>
            <span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>小児内分泌</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> ノルディトロピン、ジェノトロピン（ソマトロピン）、リュープリン
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>成長ホルモン（GH）分泌不全性低身長症への連日皮下自己注射（要冷蔵保存・ペン型手技）。思春期早発症（骨端早期閉鎖を防ぎ最終身長を伸ばすためGnRH誘導体で性ホルモン抑制）。
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            <button class="dict-jump-btn" onclick="jumpToGuide('c18')">📘 ガイド</button><button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-extra')">⚔️ 比較</button><button class="dict-jump-btn" onclick="quickSearch('低身長症')">🔍 検索</button>
          </div>
        </div>

      </div>
    </div>
`;

// Insert range 7 after range 6
const r6CloseTag = '    </div>\n\n  </div>\n</div>';
if (top100Content.includes(r6CloseTag) && !top100Content.includes('id="top100-range-r7"')) {
  top100Content = top100Content.replace(r6CloseTag, '    </div>\n' + range7Html + '\n  </div>\n</div>');
  fs.writeFileSync(top100Path, top100Content, 'utf8');
  console.log('Successfully inserted Range 7 into 16_top100.html!');
} else {
  console.log('Range 7 already inserted or r6CloseTag not found.');
}

// 2. Update src/05_comparison.html (Add 3 new comparison tables)
const compPath = path.join(__dirname, '../05_comparison.html');
let compContent = fs.readFileSync(compPath, 'utf8');

const newComparisonsHtml = `
    <!-- ⚡ 【アナフィラキシー救急 ＆ エピペン適正使用 ガチンコ比較】 -->
    <div class="sub-banner banner-class" style="margin-top:20px;">
      <span>⚡ 【アナフィラキシー救急 ＆ エピペン適正使用 ガチンコ比較】アドレナリン筋注（第一選択） vs ステロイド vs 抗ヒスタミンの決定的な役割分担</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">薬剤区分・製剤名</th>
          <th style="width:18%;">作用機序・標的受容体</th>
          <th style="width:18%;">投与タイミング・経路</th>
          <th style="width:22%;">強み・キャラクター立ち</th>
          <th style="width:26%;">現場の鑑査急所・ピットフォール</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>エピペン注射液</strong><br>（アドレナリン 0.15/0.3mg）</td>
          <td>α1・β1・β2受容体全面作動<br>（強力血管収縮・気管支拡張）</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【唯一の第一選択！】</span><br>大腿前外側部に筋肉注射</td>
          <td><span class="char">命を救う唯一無二の絶対的エース</span><br>血圧急降下（ショック）と気道閉塞（喉頭浮腫）を数分で解除する。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【太もも外側に直角に強く押し当て5秒間保持！】</span> 臀部や静脈内には絶対注射しない。注射後すぐに症状が良くなっても<strong>「必ず救急車を呼ぶ」</strong>（二相性反応の監視）。有効期限（約1年）の管理。</td>
        </tr>
        <tr>
          <td><strong>抗ヒスタミン薬注射/内服</strong><br>（ポララミン等）</td>
          <td>H1受容体拮抗作用<br>（血管透過性亢進・痒み抑制）</td>
          <td>第二選択（補助療法）<br>静注または筋注・内服</td>
          <td><span class="char">皮膚症状（蕁麻疹・かゆみ）の鎮火役</span><br>皮膚粘膜症状を和らげるが、血圧上昇や気道拡張作用はない。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【アナフィラキシーの主役にしてはいけない！】</span> ポララミンを打ってもショック死は防げない。アドレナリンを打った後の補助として使用。</td>
        </tr>
        <tr>
          <td><strong>全身性ステロイド</strong><br>（ソル・コーテフ/サクシゾン等）</td>
          <td>グルココルチコイド作用<br>（広範な炎症性サイトカイン抑制）</td>
          <td>第二選択（遅発反応予防）<br>点滴静注</td>
          <td><span class="char">数時間後の「二相性反応」を予防する保険</span><br>効果発現に数時間を要するため急性期のショック離脱には無力。</td>
          <td>即効性はないため急性期の第一選択には決してならない。数時間〜数日後に再びショックや呼吸困難が起きる「二相性反応（Biphasic reaction）」を防ぐ目的で併用。</td>
        </tr>
      </tbody>
    </table>

    <!-- 🦠 【性感染症（STI） ＆ 寄生虫 ガチンコ比較】 -->
    <div class="sub-banner banner-class" style="margin-top:20px;">
      <span>🦠 【性感染症（STI） ＆ 寄生虫 ガチンコ比較】梅毒（ステルイズ/ペニシリン） vs クラミジア（ジスロマック） vs 疥癬（ストロメクトール）</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">感染症・対象疾患</th>
          <th style="width:20%;">第一選択薬（一般名・規格）</th>
          <th style="width:18%;">用法・投与期間</th>
          <th style="width:20%;">強み・特徴</th>
          <th style="width:26%;">現場の鑑査急所・ピットフォール</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>梅毒</strong><br>（梅毒トレポネーマ）</td>
          <td><strong>ステルイズ水性懸濁筋注</strong><br>（ベンジルペニシリンベンザチン）</td>
          <td>早期梅毒：240万単位を<br><strong>単回臀部深部筋注</strong>で完結！</td>
          <td><span class="char">コンプライアンス革命をもたらした筋注薬</span><br>サワシリン4週内服の脱落を防ぎ、単回筋注で血中濃度を長期維持。</td>
          <td>注射後数時間で発熱・皮疹悪化が起きる<strong>「ヤーリッシュ・ヘルクスハイマー反応」</strong>を事前説明。ペニシリンアレルギー時はビブラマイシン等に変更。パートナー同時検査必須。</td>
        </tr>
        <tr>
          <td><strong>性器クラミジア</strong><br>（クラミジア・トラコマチス）</td>
          <td><strong>ジスロマックSR / 錠</strong><br>（アジスロマイシン水和物）</td>
          <td>1回 <strong>1000mg（1g）単回経口服用</strong><br>（またはSR成人2g単回）</td>
          <td><span class="char">1回の服用で治療が終了する奇跡の抗菌薬</span><br>マクロライド特有の組織移行性と超長時間半減期でクラミジアを一網打尽。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【ピンポン感染の防止！】</span> 本人だけ治してもパートナーが未治療なら即再感染。必ずパートナーも同時内服。服用後数時間の激しい下痢・嘔気に注意（吐いたら再投与要否確認）。</td>
        </tr>
        <tr>
          <td><strong>疥癬（かいせん）</strong><br>（ヒゼンダニ寄生）</td>
          <td><strong>ストロメクトール錠</strong><br>（イベルメクチン 3mg）</td>
          <td>約200μg/kgを<br><strong>水のみで空腹時単回服用</strong></td>
          <td><span class="char">ヒゼンダニ神経筋を麻痺させるノーベル賞薬</span><br>塗り薬が塗りにくい高齢者や施設クラスターで絶大な効果を発揮。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【必ず「水のみで空腹時」に服用！】</span> 食後服用だと吸収が上がり中枢神経系移行（安全性懸念）。卵には効かないため、1〜2週間後にダニ生存を確認し必要に応じ2回目投与。同居家族の一斉治療。</td>
        </tr>
      </tbody>
    </table>

    <!-- 🧠 【慢性疼痛・線維筋痛症 神経障害性疼痛治療薬 ガチンコ比較】 -->
    <div class="sub-banner banner-class" style="margin-top:20px;">
      <span>🧠 【慢性疼痛・線維筋痛症 ガチンコ比較】サインバルタ（SNRI） vs リリカ（Caチャネルα2δ） vs トラマール（弱オピオイド＋SNRI様）</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">薬剤名（商品名）</th>
          <th style="width:18%;">作用機序・標的</th>
          <th style="width:18%;">適応・用法</th>
          <th style="width:22%;">強み・キャラクター立ち</th>
          <th style="width:26%;">現場の鑑査急所・ピットフォール</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>サインバルタカプセル</strong><br>（デュロキセチン）</td>
          <td>セロトニン・ノルアドレナリン再取り込み阻害（SNRI）</td>
          <td>線維筋痛症、慢性腰痛症、変形性関節症、糖尿病性神経障害</td>
          <td><span class="char">脳から痛みを抑え込む「下行性抑制系」の特効薬</span><br>痛覚シグナルにブレーキをかける下行性経路を強化。</td>
          <td>服用初期（1〜2週）に<strong>「悪心・胃不快感・眠気」</strong>が高率に出現。朝食後服用や少量開始で対処。自己中断時の離脱症状（めまい・シャンシャン感）に注意。</td>
        </tr>
        <tr>
          <td><strong>リリカ / タリージェ</strong><br>（プレガバリン / ミロガバリン）</td>
          <td>電位依存性Caチャネルα2δリガンド<br>（興奮性神経伝達物質放出抑制）</td>
          <td>神経障害性疼痛、線維筋痛症（リリカ）<br>1日2回（タリージェは漸増）</td>
          <td><span class="char">過剰に興奮した神経の悲鳴を鎮めるブロック薬</span><br>一次求心性神経末端からのグルタミン酸やサブスタンスP放出を阻止。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【浮動性めまい・傾眠・ふらつき転倒に厳戒！】</span> 特に高齢者は就寝前少量から開始し慎重漸増。腎排泄型のためeGFRに応じた厳格な減量鑑査必須！体重増加・浮腫。</td>
        </tr>
        <tr>
          <td><strong>トラマール / トラムセット</strong><br>（トラマドール / ＋アセトアミノフェン）</td>
          <td>μオピオイド受容体作動 ＋ モノアミン再取り込み阻害の二刀流</td>
          <td>非オピオイド鎮痛薬で効果不十分な慢性疼痛・がん疼痛</td>
          <td><span class="char">麻薬に頼らない弱オピオイドの二刀流</span><br>オピオイド作用と下行性抑制賦活のダブルアタックで頑固な痛みを遮断。</td>
          <td>オピオイド特有の<strong>「悪心・嘔吐（ノバミン併用）」と「便秘（酸化Mg併用）」</strong>への先制対策が必須。痙攣閾値を下げるためてんかん既往患者には慎重投与。</td>
        </tr>
      </tbody>
    </table>
`;

const compTarget = '    <!-- 外用ステロイド 5段階ランク × 全身吸収率マトリクス -->';
if (compContent.includes(compTarget) && !compContent.includes('⚡ 【アナフィラキシー救急 ＆ エピペン適正使用 ガチンコ比較】')) {
  compContent = compContent.replace(compTarget, newComparisonsHtml + '\n' + compTarget);
  fs.writeFileSync(compPath, compContent, 'utf8');
  console.log('Successfully inserted 3 comparison tables into 05_comparison.html!');
} else {
  console.log('05_comparison.html already updated or target not found.');
}

// 3. Update src/14_dictionary.html (Add 10 new drug cards)
const dictPath = path.join(__dirname, '../14_dictionary.html');
let dictContent = fs.readFileSync(dictPath, 'utf8');

const newDictCardsHtml = `
    <!-- 121〜140位 新規追加医薬品カード -->
    <div class="dict-card" data-type="drug" data-kana="え" data-name="エピペン注射液" data-desc="アドレナリン自己注射薬。アナフィラキシー発現時の救命第一選択。大腿前外側部に強く押し当て5秒保持。使用後は必ず救急要請。有効期限管理必須。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">エピペン注射液 0.15mg / 0.3mg</h3>
          <span class="dict-badge dict-badge-drug">💊 救急注射</span>
        </div>
        <div class="dict-card-sub">アドレナリン自己注射液 / アナフィラキシー補助治療剤</div>
        <div class="dict-card-desc">アナフィラキシーショック・喉頭浮腫を解除する唯一の第一選択。**「太ももの外側に直角に強く押し当て5秒保持」**。症状改善後も二相性反応の監視のため即座に救急車要請。有効期限（1年）の定期更新確認。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-imm')">⚔️ 救急薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c16')">📘 皮膚アレルギーガイド</button><button class="dict-jump-btn" onclick="showDrugByName('エピペン')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="さ" data-name="サインバルタカプセル" data-desc="snri。デュロキセチン。うつ病に加え、線維筋痛症、慢性腰痛症、変形性関節症、糖尿病性神経障害疼痛に第一選択。下行性疼痛抑制系を賦活。初期悪心・離脱症状注意。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">サインバルタカプセル 20mg / 30mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">デュロキセチン塩酸塩 / SNRI・慢性疼痛治療薬</div>
        <div class="dict-card-desc">セロトニン・ノルアドレナリン再取り込み阻害により下行性疼痛抑制経路を強化。NSAIDsが効かない慢性疼痛・線維筋痛症に特効。初期の悪心・胃不快感・眠気に注意。急な自己中断厳禁。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-pain')">⚔️ 疼痛薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c6')">📘 整形・疼痛ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('サインバルタ')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="し" data-name="ツムラ芍薬甘草湯エキス顆粒" data-desc="漢方薬68番。こむら返り（腓腹筋痙攣）、急激な筋痙攣痛に神速即効性。甘草高用量（6.0g/日処方）のため連用時の偽アルドステロン症（低k・浮腫）厳戒。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ツムラ芍薬甘草湯（68番）</h3>
          <span class="dict-badge dict-badge-drug">💊 漢方</span>
        </div>
        <div class="dict-card-sub">芍薬甘草湯エキス / 筋痙攣・こむら返り改善薬</div>
        <div class="dict-card-desc">服用後数分〜10分で筋痙攣を解除する驚異の即効性。足がつった時の頓用、または就寝前。**「甘草含有量が極めて多い」ため連用による低カリウム血症・偽アルドステロン症・血圧上昇に厳戒**。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-pain')">⚔️ 疼痛薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c6')">📘 整形・疼痛ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('芍薬甘草湯')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="す" data-name="ストロメクトール錠" data-desc="抗寄生虫薬。イベルメクチン。疥癬治療薬。体重換算約200μg/kgを水のみで空腹時単回服用。食後だと血中濃度過昇。1〜2週後に効果判定し必要時再投与。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ストロメクトール錠 3mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">イベルメクチン / 経口疥癬駆除薬</div>
        <div class="dict-card-desc">ヒゼンダニの神経筋接合部グルタミン酸作動性Clチャネルを遮断。**「水のみで空腹時」に単回経口服用**。食後はAUC急増のため厳禁。卵には無効なため1〜2週後にダニ生存確認し再投与。同居家族の一斉治療。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-inf')">⚔️ 感染症比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c16')">📘 皮膚科ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('ストロメクトール')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="す" data-name="ステルイズ水性懸濁筋注" data-desc="ペニシリン系筋注薬。ベンジルペニシリンベンザチン。梅毒の標準治療薬。早期梅毒は1回筋注で治療完結。臀部深部筋注。ヤーリッシュ・ヘルクスハイマー反応注意。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ステルイズ水性懸濁筋注 240万単位</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">ベンジルペニシリンベンザチン水和物 / 梅毒治療筋注薬</div>
        <div class="dict-card-desc">早期梅毒に240万単位を臀部深部に単回筋注。長期持続血中濃度でトレポネーマを完全駆除。注射後数時間で出る悪寒・発熱・皮疹悪化（ヘルクスハイマー反応）を事前告知。パートナー同時検査必須。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-inf')">⚔️ 感染症比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c8')">📘 感染症ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('ステルイズ')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="ひ" data-name="ビクタルビ配合錠" data-desc="抗hiv薬合剤。インテグラーゼ阻害薬＋nrti2剤。1日1回1錠。食事の影響なし。耐性変異を起こさないためアドヒアランス95%以上を徹底厳守指導。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ビクタルビ配合錠</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">ビクテグラビル / エムトリシタビン / テノホビル アラフェナミド</div>
        <div class="dict-card-desc">1日1回1錠のファーストラインART合剤。高い抗ウイルス効果と高バリア性。**「絶対に飲み忘れない（95%以上遵守）」**が耐性阻止の鉄則。Mg/Al制酸剤や鉄剤との2時間以上間隔空け指導。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-inf')">⚔️ 感染症比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c8')">📘 感染症ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('ビクタルビ')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="へ" data-name="ベムリディ錠" data-desc="核酸アナログ逆転写酵素阻害薬。テノホビル アラフェナミド（taf）。b型肝炎治療薬。骨・腎毒性を大幅に軽減。自己判断での休薬・急激中止は劇症肝炎リバウンド。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ベムリディ錠 25mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">テノホビル アラフェナミド（TAF） / B型肝炎治療薬</div>
        <div class="dict-card-desc">肝細胞特異的移行で低用量化（TDFの1/10量）。骨塩量低下や腎機能悪化のリスクが極めて低い新世代薬。自己判断での内服中止はB型肝炎ウイルスの急激な増殖と急性増悪を引き起こすため継続指導。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-gi')">⚔️ 肝疾患比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c25')">📘 肝胆膵ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('ベムリディ')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="ま" data-name="マヴィレット配合錠" data-desc="直接作用型抗ウイルス薬（daa）。グレカプレビル/ピブレンタスビル。c型慢性肝炎治療薬。8〜12週間内服で95%以上の高いsvrウイルス排除率。併用禁忌多数注意。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">マヴィレット配合錠</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">グレカプレビル水和物 / ピブレンタスビル / C型肝炎経口薬</div>
        <div class="dict-card-desc">全ジェノタイプ対応のC型肝炎根治薬。1日1回3錠を食後に8〜12週間服用し**95%以上のSVR（完全ウイルス陰性化）**を達成。アトルバスタチン、エチニルエストラジオール含有ピル等と併用禁忌。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-gi')">⚔️ 肝疾患比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c25')">📘 肝胆膵ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('マヴィレット')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="て" data-name="デカドロンエリキシル" data-desc="合成副腎皮質ステロイドシロップ。デキサメタゾン。小児クループ症候群、気管支喘息急性発作。声門下喉頭浮腫を速やかに消炎。単回経口投与。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">デカドロンエリキシル 0.05%</h3>
          <span class="dict-badge dict-badge-drug">💊 小児薬</span>
        </div>
        <div class="dict-card-sub">デキサメタゾン / クループ・消炎ステロイドシロップ</div>
        <div class="dict-card-desc">クループ症候群の犬吠様咳嗽・吸気性呼吸困難に0.15〜0.6mg/kg（エリキシル換算0.3〜1.2mL/kg）を単回投与。長時間作用型ステロイドの強力消炎力で夜間の窒息リスクを劇的低減。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-inf')">⚔️ 感染症比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c18')">📘 小児科ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('デカドロン')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="ふ" data-name="フロリードゲル経口用" data-desc="抗真菌薬ゲル。ミコナゾール。口腔カンジダ症・食道カンジダ症治療薬。口内に行き渡らせてから嚥下。ワルファリン併用で出血死リスク絶対禁忌！">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">フロリードゲル経口用 2%</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">ミコナゾール / 口腔カンジダ症治療ゲル</div>
        <div class="dict-card-desc">舌や粘膜の白い偽膜（カンジダ）に。**「舌で口腔内全体にまんべんなく行き渡らせ、できるだけ長く口内に留めてから嚥下」**。**ワルファリン併用でCYP2C9強烈阻害・INR急上昇による重篤出血死の危険があり絶対禁忌！**</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-inf')">⚔️ 感染症比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c16')">📘 皮膚アレルギーガイド</button><button class="dict-jump-btn" onclick="showDrugByName('フロリード')">📋 詳細</button>
      </div>
    </div>
`;

const dictTarget = '    </div>\n</div>';
const lastIdx = dictContent.lastIndexOf(dictTarget);
if (lastIdx !== -1 && !dictContent.includes('エピペン注射液')) {
  dictContent = dictContent.substring(0, lastIdx) + newDictCardsHtml + '\n' + dictContent.substring(lastIdx);
  fs.writeFileSync(dictPath, dictContent, 'utf8');
  console.log('Successfully inserted 10 drug cards into 14_dictionary.html!');
} else {
  console.log('14_dictionary.html already updated or target not found.');
}

// 4. Update src/09_app.js (Add to DRUG_DB)
const appPath = path.join(__dirname, '../09_app.js');
let appContent = fs.readFileSync(appPath, 'utf8');

const newDrugDbEntries = `  // 121〜140位 神経難病・感染症・救急薬剤
  { name: "エピペン注射液", gen: "アドレナリン", cat: "139. アナフィラキシー", char: "命を救う唯一無二の救命第一選択！太もも外側に押し当て5秒保持", desc: "α・β全受容体を強力作動し血圧低下と喉頭浮腫を即座に解除。大腿前外側部に直角に強く押し当て5秒保持。使用後は二相性反応の監視のため即座に救急車要請。有効期限管理。", gId: "c16", cSec: "sec-imm" },
  { name: "サインバルタ", gen: "デュロキセチン", cat: "122. 線維筋痛症・慢性疼痛", char: "下行性疼痛抑制系を脳から賦活！NSAIDs無効の慢性腰痛・線維筋痛症に特効", desc: "SNRI作用で下行性疼痛抑制経路を強化。初期の悪心・胃不快感・眠気に注意。急な自己中断による離脱症状（めまい・シャンシャン感）を警告指導。", gId: "c6", cSec: "sec-pain" },
  { name: "芍薬甘草湯", gen: "漢方エキス（ツムラ68番等）", cat: "127. こむら返り", char: "数分で足のつりを解除する神速即効性！甘草過量による偽アルドステロン注意", desc: "芍薬と甘草が筋小胞体Ca再取り込みを促し急速筋弛緩。足がつった時の頓用。甘草高用量（6.0g/日）のため連用による低K血症・浮腫・血圧上昇に厳戒。", gId: "c6", cSec: "sec-pain" },
  { name: "ストロメクトール", gen: "イベルメクチン", cat: "129. 疥癬（かいせん）", char: "ノーベル賞の経口疥癬駆除薬！水のみで空腹時に単回経口服用", desc: "ヒゼンダニの神経Clチャネル遮断。必ず「水のみ空腹時」に単回服用（食後服用は血中濃度過昇）。卵には無効なため1〜2週後にダニ生存確認し再投与。家族一斉治療。", gId: "c16", cSec: "sec-inf" },
  { name: "ステルイズ", gen: "ベンジルペニシリンベンザチン", cat: "132. 梅毒", char: "早期梅毒を単回筋注で治療完結！ヤーリッシュ・ヘルクスハイマー反応注意", desc: "サワシリン4週服用の脱落を防ぐ画期的筋注製剤。臀部深部に単回投与。注射後数時間で出る発熱・皮疹悪化（ヘルクスハイマー反応）を事前告知。パートナー同時検査。", gId: "c8", cSec: "sec-inf" },
  { name: "ビクタルビ", gen: "ビクテグラビル/TAF/FTC", cat: "133. HIV感染症", char: "1日1回1錠のファーストラインART合剤！アドヒアランス95%以上死守指導", desc: "高い抗ウイルス効果と耐性バリア。飲み忘れによる耐性変異獲得を防ぐため95%以上の厳格遵守を指導。Mg/Al制酸剤や鉄剤との2時間以上間隔空け。", gId: "c8", cSec: "sec-inf" },
  { name: "ベムリディ", gen: "テノホビル アラフェナミド（TAF）", cat: "134. B型肝炎", char: "骨・腎毒性を大幅軽減した新世代TAF！自己中断による劇症急性増悪リバウンド警戒", desc: "肝細胞特異的移行で低用量化（TDFの1/10）。自己判断での中止はB型肝炎ウイルスの急激なリバウンド増殖による重症肝炎を起こすため継続内服を徹底。", gId: "c25", cSec: "sec-gi" },
  { name: "マヴィレット", gen: "グレカプレビル/ピブレンタスビル", cat: "134. C型肝炎", char: "8〜12週間内服で95%以上の完全ウイルス排除（SVR）を達成する根治経口薬", desc: "全ジェノタイプ対応DAA製剤。1日1回3錠を食後服用。アトルバスタチンやエチニルエストラジオールピル等との併用禁忌を厳格スクリーニング。", gId: "c25", cSec: "sec-gi" },
  { name: "デカドロンエリキシル", gen: "デキサメタゾン", cat: "138. クループ症候群", char: "ケンケンと響く犬吠様咳嗽・吸気性呼吸困難を鎮火！単回投与で声門下消炎", desc: "クループ症候群に0.15〜0.6mg/kg単回経口投与。長時間作用型ステロイドの強力消炎作用で声門下浮腫を速やかに改善し夜間の窒息リスクを回避。", gId: "c18", cSec: "sec-inf" },
  { name: "フロリードゲル経口用", gen: "ミコナゾール", cat: "125. 口腔カンジダ症", char: "口内に長く含んでから嚥下！ワルファリン併用で出血死リスク絶対禁忌", desc: "吸入ステロイドうがい不足等による口腔カンジダに。口内全体に行き渡らせてから嚥下。ワルファリン併用でCYP2C9を強烈阻害し重篤出血死の危険があり禁忌！", gId: "c16", cSec: "sec-inf" },
`;

const appTarget = '\n];';
if (appContent.includes(appTarget) && !appContent.includes('エピペン注射液')) {
  appContent = appContent.replace(appTarget, '\n' + newDrugDbEntries + '\n];');
  fs.writeFileSync(appPath, appContent, 'utf8');
  console.log('Successfully inserted new drugs into 09_app.js DRUG_DB!');
} else {
  console.log('09_app.js already updated or target not found.');
}

console.log('=== Rank 121-140 Integration Complete! ===');
