const fs = require('fs');
const path = require('path');

console.log('=== Adding Pulmonary Fibrosis / Interstitial Pneumonia (Ofev, Pirespa, Jascaid) to System ===');

// 1. Update src/05_comparison.html (Add 3-drug comparison table)
const compPath = path.join(__dirname, '../05_comparison.html');
let compContent = fs.readFileSync(compPath, 'utf8');

const newComparisonHtml = `
    <!-- 🫁 【肺線維症・間質性肺炎（IPF / PPF） 抗線維化薬 ガチンコ比較】 -->
    <div class="sub-banner banner-class" style="margin-top:20px;">
      <span>🫁 【特発性肺線維症（IPF）・進行性肺線維症（PPF） 抗線維化薬 ガチンコ比較】オフェブ vs ピレスパ vs ジャスケイド</span>
    </div>
    <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:10px 14px; margin-bottom:12px; font-size:0.86rem; color:#334155; line-height:1.5;">
      <strong>💡 肺線維化疾患の全体像（間質性肺炎 vs IPF vs PPF/PF-ILD）：</strong><br>
      ・<strong>間質性肺炎（親の傘）：</strong>肺胞の壁（間質）に炎症・線維化が起こる疾患の総称。原因特定可能なもの（膠原病、薬剤性、過敏性肺炎等）と原因不明（特発性：IIPs）がある。<br>
      ・<strong>特発性肺線維症（IPF）：</strong>原因不明の間質性肺炎の中で最多かつ最重篤。不可逆的に肺が線維化し硬化（蜂巣肺）。抗炎症薬（ステロイド）は無効で抗線維化薬が必須。<br>
      ・<strong>進行性肺線維症（PPF / PF-ILD）：</strong>IPF以外の間質性肺炎（強皮症やRA等の膠原病肺、慢性過敏性肺炎など）でも、IPFのように肺線維化が不可逆的に進行する病態。オフェブやジャスケイドの適応領域！
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">薬剤名（商品名）</th>
          <th style="width:18%;">作用機序・分類</th>
          <th style="width:18%;">適応疾患・用法用量</th>
          <th style="width:22%;">キャラクター立ち・強み</th>
          <th style="width:26%;">現場の鑑査急所・ピットフォール</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>オフェブカプセル</strong><br>（ニンテダニブ）</td>
          <td>分子標的受容体チロシンキナーゼ阻害薬<br>（PDGFR/FGFR/VEGFR）</td>
          <td>①<strong>IPF</strong><br>②<strong>SSc-ILD（強皮症肺）</strong><br>③<strong>PF-ILD（進行性線維化）</strong><br>1回150mg 1日2回 <strong>食直後</strong></td>
          <td><span class="char">間質性肺疾患の適応を最も広く持つ絶対エース</span><br>線維芽細胞の増殖・遊走シグナルを根本ブロックし努力肺活量（FVC）低下を抑制。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【最大の難敵は下痢（約60〜70%）！】</span> 服用開始早期に出現。<strong>ロペラミド（ロペミン）事前処方・早期服用指導</strong>、減量（100mg×2回へ）基準遵守。必ず<strong>「食直後」</strong>に服用（空腹時は吸収低下・消化器毒性増強）。肝機能検査定期必須。妊婦禁忌。</td>
        </tr>
        <tr>
          <td><strong>ピレスパ錠</strong><br>（ピルフェニドン）</td>
          <td>抗線維化薬<br>（TGF-β産生抑制・コラーゲン合成阻害）</td>
          <td><strong>特発性肺線維症（IPF）のみ</strong><br>初期1回200mg 1日3回から漸増、維持量1回600mg 1日3回（計1800mg/日） <strong>食後</strong></td>
          <td><span class="char">日本発・世界初の元祖抗線維化薬</span><br>TGF-βの産生やコラーゲン線維の合成を抑え、抗炎症・抗酸化作用で肺の硬化を遅らせる。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【最大の鑑査急所は光線過敏症（約50%）！】</span> 紫外線に当たると重篤な紅斑・水疱。<strong>外出時の長袖・帽子・日傘・SPF50+/PA++++日焼け止め塗布</strong>を厳格指導。必ず<strong>「食後」</strong>服用（空腹時はCmax急上昇で悪心・嘔吐多発）。食欲不振・胃不快感・肝機能チェック。</td>
        </tr>
        <tr>
          <td><strong>ジャスケイド錠</strong><br>（ネランドミラスト）</td>
          <td><strong>世界初の選択的PDE4B阻害薬</strong><br>（ホスホジエステラーゼ4B阻害）</td>
          <td>①<strong>特発性肺線維症（IPF）</strong><br>②<strong>進行性肺線維症（PPF）</strong><br>1回18mg 1日2回 経口投与<br>（忍容性により1回9mgへ減量）</td>
          <td><span class="char">国内10年以上ぶりとなる革新的新世代抗線維化薬</span><br>PDE4Bを選択的に阻害して細胞内cAMPを上昇させ、肺の線維化と炎症の両経路を遮断。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【下痢・悪心・体重減少のマネジメント！】</span> 主な副作用は下痢と食欲減退・体重減少。下痢継続時は1回9mgへの減量規準。<strong>光にやや不安定なためPTPシートから服用直前に取り出す（一包化・粉砕非推奨・割線なし）</strong>。CYP3A4阻害薬・誘導薬との相互作用注意。</td>
        </tr>
      </tbody>
    </table>
`;

const compTarget = '    <!-- 外用ステロイド 5段階ランク × 全身吸収率マトリクス -->';
if (compContent.includes(compTarget) && !compContent.includes('ジャスケイド')) {
  compContent = compContent.replace(compTarget, newComparisonHtml + '\n' + compTarget);
  fs.writeFileSync(compPath, compContent, 'utf8');
  console.log('Successfully inserted Pulmonary Fibrosis 3-drug comparison into 05_comparison.html!');
} else {
  console.log('05_comparison.html already updated or target not found.');
}

// 2. Update src/14_dictionary.html (Add 3 new drug cards)
const dictPath = path.join(__dirname, '../14_dictionary.html');
let dictContent = fs.readFileSync(dictPath, 'utf8');

const newDictCardsHtml = `
    <!-- 肺線維症 抗線維化薬 新規事典カード -->
    <div class="dict-card" data-type="drug" data-kana="お" data-name="オフェブカプセル" data-desc="分子標的チロシンキナーゼ阻害薬。ニンテダニブ。特発性肺線維症（ipf）、強皮症肺、進行性線維化間質性肺疾患（pf-ild）。高頻度の下痢にロペラミド。食直後服用厳守。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">オフェブカプセル 100mg / 150mg</h3>
          <span class="dict-badge dict-badge-drug">💊 難病特定</span>
        </div>
        <div class="dict-card-sub">ニンテダニブエタンスルホン酸塩 / 抗線維化・チロシンキナーゼ阻害薬</div>
        <div class="dict-card-desc">IPF、SSc-ILD、PF-ILDに広く適応。**「食直後服用」**（空腹時内服でAUC低下・消化器毒性増）。**高頻度（60〜70%）の下痢に早期ロペラミド併用・減量基準遵守**。定期肝機能採血必須。妊婦禁忌。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-imm')">⚔️ 肺線維症薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c11')">📘 呼吸器ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('オフェブ')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="ひ" data-name="ピレスパ錠" data-desc="抗線維化薬。ピルフェニドン。特発性肺線維症（ipf）治療薬。tgf-β産生抑制・コラーゲン合成阻害。光線過敏症に厳重警戒（遮光・日焼け止め）。食後服用厳守。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ピレスパ錠 200mg</h3>
          <span class="dict-badge dict-badge-drug">💊 難病特定</span>
        </div>
        <div class="dict-card-sub">ピルフェニドン / 特発性肺線維症治療薬</div>
        <div class="dict-card-desc">世界初のIPF抗線維化薬。**「徹底的な紫外線遮光指導（長袖・日傘・SPF50+日焼け止め）」**が最重要鑑査急所（約50%に光線過敏症）。空腹時服用はCmax急上昇で悪心・嘔吐を招くため**「必ず食後服用」**。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-imm')">⚔️ 肺線維症薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c11')">📘 呼吸器ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('ピレスパ')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="し" data-name="ジャスケイド錠" data-desc="世界初の選択的pde4b阻害薬。ネランドミラスト。特発性肺線維症（ipf）および進行性肺線維症（ppf）治療薬。国内10年以上ぶりの新規抗線維化薬。下痢・体重減少・遮光ptp。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ジャスケイド錠 9mg / 18mg</h3>
          <span class="dict-badge dict-badge-drug">💊 最新新薬</span>
        </div>
        <div class="dict-card-sub">ネランドミラスト / 選択的PDE4B阻害薬・抗線維化薬</div>
        <div class="dict-card-desc">国内10年以上ぶりの肺線維症新薬。cAMPを上昇させ線維化と炎症の両シグナルを遮断。通常1回18mg 1日2回（下痢等の忍容性低下時は9mgに減量）。**PTPシートから服用直前に取り出す（光不安定・粉砕一包化非推奨）**。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-imm')">⚔️ 肺線維症薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c11')">📘 呼吸器ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('ジャスケイド')">📋 詳細</button>
      </div>
    </div>
`;

const dictTarget = '    </div>\n</div>';
const lastIdx = dictContent.lastIndexOf(dictTarget);
if (lastIdx !== -1 && !dictContent.includes('ジャスケイド錠')) {
  dictContent = dictContent.substring(0, lastIdx) + newDictCardsHtml + '\n' + dictContent.substring(lastIdx);
  fs.writeFileSync(dictPath, dictContent, 'utf8');
  console.log('Successfully inserted 3 drug cards into 14_dictionary.html!');
} else {
  console.log('14_dictionary.html already updated or target not found.');
}

// 3. Update src/09_app.js (Add to DRUG_DB)
const appPath = path.join(__dirname, '../09_app.js');
let appContent = fs.readFileSync(appPath, 'utf8');

const newDrugDbEntries = `  // 肺線維症・間質性肺炎 抗線維化薬3強
  { name: "オフェブ", gen: "ニンテダニブ", cat: "呼吸器難病（IPF・PF-ILD）", char: "3受容体キナーゼ阻害で肺線維化を阻止！食直後服用＆下痢ロペラミド管理", desc: "IPF、強皮症肺、進行性線維化間質性肺疾患（PF-ILD）に適応。空腹時服用はAUC低下・副作用増のため「食直後」厳守。高頻度の下痢に早期ロペラミド投与・減量規準。", gId: "c11", cSec: "sec-imm" },
  { name: "ピレスパ", gen: "ピルフェニドン", cat: "呼吸器難病（IPF）", char: "元祖抗線維化薬！光線過敏症の徹底遮光指導＆空腹時服用厳禁（食後遵守）", desc: "TGF-β阻害でコラーゲン合成を抑制。最大の注意点は「光線過敏症（外出時の遮光・日焼け止め徹底）」。空腹時内服はCmax急上昇で悪心・嘔吐発現のため必ず「食後」。", gId: "c11", cSec: "sec-imm" },
  { name: "ジャスケイド", gen: "ネランドミラスト", cat: "呼吸器難病（IPF・PPF）", char: "国内10年ぶり新薬！世界初の選択的PDE4B阻害薬で線維化と炎症の両方を遮断", desc: "IPFおよび進行性肺線維症（PPF）に適応。通常1回18mg 1日2回（下痢・体重減少時は9mg減量）。光不安定性のためPTP直前開封（一包化・粉砕不可）。", gId: "c11", cSec: "sec-imm" },
`;

const appTarget = '\n];';
if (appContent.includes(appTarget) && !appContent.includes('ジャスケイド')) {
  appContent = appContent.replace(appTarget, '\n' + newDrugDbEntries + '\n];');
  fs.writeFileSync(appPath, appContent, 'utf8');
  console.log('Successfully inserted new drugs into 09_app.js DRUG_DB!');
} else {
  console.log('09_app.js already updated or target not found.');
}

console.log('=== Pulmonary Fibrosis Integration Complete! ===');
