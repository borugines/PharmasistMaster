const fs = require('fs');
const path = require('path');

console.log('=== Adding Amenamevir (アメナリーフ) PIT to Master System ===');

// =========================================================================
// 1. Update src/05_comparison.html
// =========================================================================
const pComp = path.join(__dirname, '..', '05_comparison.html');
let compHtml = fs.readFileSync(pComp, 'utf8');

const oldHerpesTableRegex = /<div class="sub-banner banner-class"[^>]*>\s*<span>👄 【単純ヘルペス（口唇・性器）治療薬ガチンコ比較】[\s\S]*?<\/tbody>\s*<\/table>/;

const newHerpesTable = `<div class="sub-banner banner-class" style="margin-top:20px;">
      <span>👄 【単純ヘルペス（口唇・性器）PIT治療薬ガチンコ比較】アメナリーフ（1回完結） vs ファムビル（2回内服） vs バルトレックス</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">処方形態・薬剤名</th>
          <th style="width:18%;">成分名・作用機序</th>
          <th style="width:18%;">用法・用量・服用回数</th>
          <th style="width:22%;">強み・特徴</th>
          <th style="width:26%;">現場の鑑査急所・服薬指導の鉄則</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>新世代PIT療法<br>【1回完結型】</strong><br><strong>アメナリーフ錠</strong></td>
          <td>アメナメビル<br>（ヘリカーゼ・プライマーゼ阻害薬）</td>
          <td><strong>1回1200mg（200mg 6錠）</strong><br>初期症状から6h以内に<strong>1回のみ食後内服</strong></td>
          <td><span class="char">「1回飲むだけ」で治療完了！</span><br>1回内服で服薬完了するため飲み忘れゼロ。<br><strong>糞中排泄型のため腎機能低下時でも用量調整・減量が一切不要</strong>！</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【「食後」服用が絶対鉄則！】</span> 空腹時に飲むと吸収率（AUC）が著しく低下し効果が消失する。食間や空腹時に初期症状が出た場合は、<strong>「軽食（おにぎり・パン等）を摂ってから30分以内」</strong>に服用させる。</td>
        </tr>
        <tr>
          <td><strong>従来型PIT療法<br>【2回内服型】</strong><br><strong>ファムビル錠</strong></td>
          <td>ファムシクロビル<br>（核酸アナログ・DNA合成阻害）</td>
          <td><strong>1回1000mg（計2回）</strong><br>初期症状から6h以内 ＋ <strong>12時間後に2回目</strong></td>
          <td>あらかじめ処方しておき発症直後即服用。薬価がアメナリーフより安価（3割負担で約800円前後）。食事の影響を受けにくい。</td>
          <td>12時間後の「2回目の飲み忘れ」に注意。<span style="color:#b91c1c; font-weight:bold;">100%腎排泄型のため、eGFR低下時は厳密な減量が必要</span>（アシクロビル脳症リスク）。</td>
        </tr>
        <tr>
          <td><strong>通常内服療法<br>（5日間連続）</strong><br><strong>バルトレックス錠</strong></td>
          <td>バラシクロビル塩酸塩<br>（500mg錠）</td>
          <td>1回500mg 1日2回<br><strong>5日間連続内服</strong></td>
          <td>アシクロビルのプロドラッグで高い生体利用率。初発時や水疱形成後の確実な標準治療。</td>
          <td>腎排泄型のため高齢者・腎機能低下例で**意識障害・せん妄・精神症状（アシクロビル脳症）**に注意。十分な水分摂取。</td>
        </tr>
        <tr>
          <td><strong>外用抗ウイルス薬</strong><br>・アラセナA軟膏<br>・ゾビラックス軟膏</td>
          <td>ビダラビン / アシクロビル</td>
          <td>1日1〜4回 患部に塗布</td>
          <td>局所への直接作用。全身副作用がほぼなく軽度口唇ヘルペスや妊婦にも使いやすい。</td>
          <td>チクチク・違和感の初期から塗布。患部を清潔にしてから塗布。目に入れないよう注意。</td>
        </tr>
      </tbody>
    </table>`;

if (oldHerpesTableRegex.test(compHtml)) {
  compHtml = compHtml.replace(oldHerpesTableRegex, newHerpesTable);
  fs.writeFileSync(pComp, compHtml, 'utf8');
  console.log('Successfully updated Herpes PIT table in 05_comparison.html with Amenamevir!');
} else {
  console.error('Old herpes table not found in 05_comparison.html');
}

// =========================================================================
// 2. Update src/03_guide.html (c16 pearls)
// =========================================================================
const pGuide = path.join(__dirname, '..', '03_guide.html');
let guideHtml = fs.readFileSync(pGuide, 'utf8');

const oldC16Pearl = `<li><strong>単純ヘルペス再発の切り札「PIT療法（ファムビル1回1000mg 1日完結）」：</strong>再発を繰り返す患者にあらかじめファムビルを処方しておき、<strong>「あ、ピリピリ・ムズムズしてきた」という前駆症状から6時間以内に自己判断で内服</strong>させる。12時間後に2回目を飲んで治療終了。水疱ができる前にウイルス増殖を先手必勝で叩く！</li>`;

const newC16Pearl = `<li><strong>単純ヘルペス再発の切り札「PIT療法（アメナリーフ vs ファムビル）」：</strong>
          <br>・<strong>アメナリーフ（アメナメビル）：</strong>前駆症状（ピリピリ・違和感）から6時間以内に<strong>「1回1200mg（200mg 6錠）を食後（または軽食後）に1回飲むだけ」</strong>で治療終了！腎機能低下時でも減量不要。※空腹時だと吸収激減するため必ず何か食べてから内服させる！
          <br>・<strong>ファムビル（ファムシクロビル）：</strong>6時間以内に1回1000mg、12時間後に2回目を服用（計2回）。食事の影響を受けにくいが腎機能減量が必要。</li>`;

if (guideHtml.includes(oldC16Pearl)) {
  guideHtml = guideHtml.replace(oldC16Pearl, newC16Pearl);
  fs.writeFileSync(pGuide, guideHtml, 'utf8');
  console.log('Successfully updated c16 pearls in 03_guide.html with Amenamevir PIT!');
} else {
  console.log('Target oldC16Pearl not found in 03_guide.html');
}

// =========================================================================
// 3. Update src/16_top100.html (63rd item)
// =========================================================================
const pTop100 = path.join(__dirname, '..', '16_top100.html');
let top100Html = fs.readFileSync(pTop100, 'utf8');

const oldTop100Item63 = `          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> ファムビル（PIT療法）、バルトレックス、アラセナA軟膏、ゾビラックス
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>PIT療法（ファムビル1回1000mg計2回・前駆症状から6時間以内服用）、外用薬（初期ピリピリ塗布）、アシクロビル脳症注意。
          </div>`;

const newTop100Item63 = `          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> アメナリーフ（PIT 1回1200mg）、ファムビル（PIT 2回内服）、バルトレックス、アラセナA
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>アメナリーフPIT（前駆症状6h以内に1回1200mg・食後/軽食必須・腎減量不要で1回完結） vs ファムビルPIT（1000mg×2回）、外用薬（初期ピリピリ塗布）。
          </div>`;

if (top100Html.includes(oldTop100Item63)) {
  top100Html = top100Html.replace(oldTop100Item63, newTop100Item63);
  fs.writeFileSync(pTop100, top100Html, 'utf8');
  console.log('Successfully updated Item 63 in 16_top100.html with Amenamevir!');
} else {
  console.log('oldTop100Item63 not found in 16_top100.html');
}

// =========================================================================
// 4. Update src/14_dictionary.html (Add Amenalief card)
// =========================================================================
const pDict = path.join(__dirname, '..', '14_dictionary.html');
let dictHtml = fs.readFileSync(pDict, 'utf8');

const amenaliefCard = `    <div class="dict-card" data-type="drug" data-kana="あ" data-name="アメナリーフ錠" data-desc="抗ヘルペスウイルス薬。アメナメビル。帯状疱疹（1日1回400mg食後7日間）および再発性単純疱疹pit療法（初期症状6時間以内1回1200mg食後単回）。腎機能用量調節不要。空腹時吸収低下。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">アメナリーフ錠 200mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">アメナメビル / ヘリカーゼ・プライマーゼ阻害薬</div>
        <div class="dict-card-desc">帯状疱疹は1日1回400mg食後。単純ヘルペス再発PITは「初期症状6h以内に1回1200mg（6錠）食後単回投与」で1回完結！糞中排泄型のため腎障害でも減量不要。空腹時だと吸収激減するため軽食後服用必須。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-extra')">⚔️ PIT比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c16')">📘 皮膚科ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('アメナリーフ')">📋 詳細</button>
      </div>
    </div>
  
`;

if (!dictHtml.includes('アメナリーフ錠 200mg')) {
  const dictTarget = '<div class="dict-card" data-type="drug" data-kana="ほ" data-name="ボルズィ錠"';
  if (dictHtml.includes(dictTarget)) {
    dictHtml = dictHtml.replace(dictTarget, amenaliefCard + dictTarget);
    fs.writeFileSync(pDict, dictHtml, 'utf8');
    console.log('Successfully inserted Amenalief card into 14_dictionary.html!');
  }
}

// =========================================================================
// 5. Update src/09_app.js (DRUG_DB)
// =========================================================================
const pApp = path.join(__dirname, '..', '09_app.js');
let appJs = fs.readFileSync(pApp, 'utf8');

const amenaliefAppDb = `  { name: "アメナリーフ", gen: "アメナメビル", cat: "63. 単純ヘルペス（PIT） / 45. 帯状疱疹", char: "ヘルペスPITの最新主役！1回1200mg食後内服で1回完結（腎機能減量不要・軽食必須）", desc: "初期症状6時間以内に1回1200mg（200mg 6錠）食後単回服用。1回飲むだけでPIT完了。腎排泄でないため腎障害でも減量不要。空腹時服用は吸収が落ちるため軽食を摂らせる。帯状疱疹は1日1回400mg食後。", gId: "c16", cSec: "sec-extra" },
`;

if (!appJs.includes('"アメナリーフ"')) {
  const appTarget = '  { name: "ファムビル",';
  if (appJs.includes(appTarget)) {
    appJs = appJs.replace(appTarget, amenaliefAppDb + appTarget);
    fs.writeFileSync(pApp, appJs, 'utf8');
    console.log('Successfully inserted Amenalief into 09_app.js!');
  }
}

console.log('=== Amenalief PIT Integration Complete! ===');
