const fs = require('fs');
const path = require('path');

console.log('=== Adding Vorzye (ボルズィ錠 / ボルノレキサント) to Master System ===');

// 1. Update src/10_new_drugs.html
const pNewDrugs = path.join(__dirname, '..', '10_new_drugs.html');
let newDrugsHtml = fs.readFileSync(pNewDrugs, 'utf8');

const vorzyeNewDrugRow = `        <tr>
          <td>
            <span class="drug-name">ボルズィ錠</span>
            <span class="gen-name">（ボルノレキサント水和物）</span>
            <span class="tag-mech">オレキシン受容体拮抗薬（DORA第4世代・超短時間型）</span>
          </td>
          <td>
            <span class="tag-new">半減期「約2時間」！オレキシン最短のキレ味で持ち越しゼロへ</span><br>
            デエビゴ、ベルソムラ、クービビックに続く第4のオレキシン拮抗薬。<strong>最高血中濃度到達時間（Tmax）約0.5時間、半減期（t1/2）約2.1時間</strong>という驚異的なキレの良さ！「入眠困難を速やかに解決したいが、翌朝の眠気・だるさ・悪夢を絶対に残したくない」患者にドンピシャの設計。非ベンゾ系（マイスリー等）依存からの安全な離脱にも最適。
          </td>
          <td>
            ・<strong>用法：</strong>通常1回5mgを就寝直前に服用（症状により適宜増減、最大10mg）。食事直後の服用は効果発現が遅れるため空腹時就寝直前。<br>
            <div class="pitfall-box">⚠️ <strong>併用禁忌（CYP3A4）：</strong>イトラコナゾール、クラリスロマイシン、ゾコーバ、リトナビル等の強いCYP3A阻害薬とは<strong>併用禁忌</strong>！中等度阻害薬（フルコナゾール、ベラパミル等）併用時や肝機能低下時は<strong>2.5mgへ減量</strong>。</div>
          </td>
        </tr>
`;

if (!newDrugsHtml.includes('ボルズィ')) {
  // Insert right before クービビック錠
  const target = '        <tr>\n          <td>\n            <span class="drug-name">クービビック錠</span>';
  if (newDrugsHtml.includes(target)) {
    newDrugsHtml = newDrugsHtml.replace(target, vorzyeNewDrugRow + target);
    fs.writeFileSync(pNewDrugs, newDrugsHtml, 'utf8');
    console.log('Added Vorzye to 10_new_drugs.html successfully!');
  } else {
    // Alternative replace
    const altTarget = '            <span class="drug-name">クービビック錠</span>';
    const splitIdx = newDrugsHtml.indexOf(altTarget);
    const trStartIdx = newDrugsHtml.lastIndexOf('        <tr>', splitIdx);
    if (trStartIdx !== -1) {
      newDrugsHtml = newDrugsHtml.slice(0, trStartIdx) + vorzyeNewDrugRow + newDrugsHtml.slice(trStartIdx);
      fs.writeFileSync(pNewDrugs, newDrugsHtml, 'utf8');
      console.log('Added Vorzye to 10_new_drugs.html via alternative tr position!');
    } else {
      console.error('Could not find クービビック in 10_new_drugs.html');
    }
  }
} else {
  console.log('ボルズィ already present in 10_new_drugs.html');
}

// 2. Update src/05_comparison.html
const pComp = path.join(__dirname, '..', '05_comparison.html');
let compHtml = fs.readFileSync(pComp, 'utf8');

const targetComp = `        <tr>
          <td rowspan="3"><strong>オレキシン受容体拮抗薬（DORA）</strong><br>【現在の第一選択】</td>
          <td><strong>デエビゴ</strong>（レンボレキサント）</td>
          <td><strong>入眠障害 ＆ 中途覚醒</strong>（万能型）</td>
          <td>極めて低い（筋弛緩なし）</td>
          <td><span class="char">現在の不眠症治療のトップランナー</span> 寝つきにも途中覚醒にもシャープに効く。まれに<strong>「悪夢（リアルな夢を見る）」</strong>の訴えあり。</td>
        </tr>
        <tr>
          <td><strong>ベルソムラ</strong>（スボレキサント）</td>
          <td><strong>中途覚醒・早朝覚醒</strong></td>
          <td>極めて低い</td>
          <td>夜中に何度も目が覚めるタイプに強い。クラリスロマイシン等の<strong>CYP3A阻害薬と併用禁忌</strong>な点に注意。</td>
        </tr>
        <tr>
          <td><strong>クービビック</strong>（ダリドレキサント）</td>
          <td>入眠 ＆ 睡眠維持</td>
          <td>極めて低い</td>
          <td><span class="char">半減期が約8時間と絶妙！</span> 朝までぐっすり眠れるのに<strong>翌朝の持ち越し（眠気・だるさ）が最も出にくい</strong>よう設計された最新型。</td>
        </tr>`;

const replacementComp = `        <tr>
          <td rowspan="4"><strong>オレキシン受容体拮抗薬（DORA）</strong><br>【現在の第一選択】<br><span style="font-size:0.75rem; color:#475569;">※半減期の違いで使い分け</span></td>
          <td><strong>ボルズィ</strong>（ボルノレキサント）</td>
          <td><strong>入眠障害</strong>（キレ味最重視・超短時間型）</td>
          <td>極めて低い（非BZD離脱に最適）</td>
          <td><span class="char">半減期約2時間で最短！</span> Tmax約30分で素早く入眠させ、朝には完全に抜ける。「デエビゴ・ベルソムラ・クービビックでも翌朝に重さ・眠気が残る」「悪夢が出る」患者やマイスリーからの置換に最適。強力なCYP3A阻害薬併用禁忌。</td>
        </tr>
        <tr>
          <td><strong>クービビック</strong>（ダリドレキサント）</td>
          <td>入眠 ＆ 睡眠維持</td>
          <td>極めて低い</td>
          <td><span class="char">半減期が約8時間と絶妙！</span> 朝までぐっすり眠れるのに<strong>翌朝の持ち越し（眠気・だるさ）が最も出にくい</strong>よう設計されたバランス型。CYP3A4阻害薬併用禁忌。</td>
        </tr>
        <tr>
          <td><strong>デエビゴ</strong>（レンボレキサント）</td>
          <td><strong>入眠障害 ＆ 中途覚醒</strong>（万能型）</td>
          <td>極めて低い（筋弛緩なし）</td>
          <td><span class="char">現在の不眠症治療のトップランナー</span> 寝つきにも途中覚醒にもシャープに効く。半減期が長め（約50h）のため睡眠維持力最強だが、まれに<strong>「悪夢」「翌朝の持ち越し」</strong>の訴えあり。</td>
        </tr>
        <tr>
          <td><strong>ベルソムラ</strong>（スボレキサント）</td>
          <td><strong>中途覚醒・早朝覚醒</strong></td>
          <td>極めて低い</td>
          <td>夜中に何度も目が覚めるタイプに強い（半減期約10〜12h）。クラリスロマイシン等の<strong>CYP3A阻害薬と併用禁忌</strong>な点に注意。</td>
        </tr>`;

if (!compHtml.includes('ボルズィ')) {
  if (compHtml.includes(targetComp)) {
    compHtml = compHtml.replace(targetComp, replacementComp);
    fs.writeFileSync(pComp, compHtml, 'utf8');
    console.log('Added Vorzye to 05_comparison.html successfully!');
  } else {
    console.error('Target comp block not found in 05_comparison.html');
  }
} else {
  console.log('ボルズィ already present in 05_comparison.html');
}

// 3. Update src/03_guide.html (Core 20)
const pGuide = path.join(__dirname, '..', '03_guide.html');
let guideHtml = fs.readFileSync(pGuide, 'utf8');

const targetGuide = `            <div class="step-card first-choice">
              <div class="step-pill first">第一選択（依存なし・安全）</div>
              <div class="step-drug">デエビゴ（レンボレキサント 2.5〜5mg）</div>
              <div class="step-rationale">オレキシン受容体拮抗薬。入眠潜時を速やかに短縮。筋弛緩・転倒リスクが極めて低い。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('デエビゴ')">デエビゴ</span><span class="flow-chip" onclick="quickSearch('ルネスタ')">ルネスタ</span></div>
            </div>`;

const replacementGuide = `            <div class="step-card first-choice">
              <div class="step-pill first">第一選択（依存なし・超短時間〜短時間）</div>
              <div class="step-drug">ボルズィ（ボルノレキサント 5mg） / デエビゴ（2.5〜5mg）</div>
              <div class="step-rationale">【最新DORA】ボルズィは半減期約2hでキレ味抜群（翌朝の持ち越し・悪夢が極小）。マイスリー等からの安全な置換に最適。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ボルズィ')">ボルズィ</span><span class="flow-chip" onclick="quickSearch('デエビゴ')">デエビゴ</span><span class="flow-chip" onclick="quickSearch('クービビック')">クービビック</span></div>
            </div>`;

if (!guideHtml.includes('ボルズィ')) {
  if (guideHtml.includes(targetGuide)) {
    guideHtml = guideHtml.replace(targetGuide, replacementGuide);
    
    // Also enhance the pitfall or tip box in c20 with the 4 DORA comparison
    const targetPitfall = '          ② ベルソムラとクラリスロマイシン・イトラコナゾールなど強力なCYP3A阻害薬は「併用禁忌」！<br>';
    const addPitfall = '          ② 【オレキシン4剤の半減期と併用禁忌】ボルズィ（約2h・超短時間）・クービビック（約8h）・ベルソムラ（約12h）は強力なCYP3A阻害薬（イトラコナゾール・クラリスロマイシン・ゾコーバ等）と併用禁忌！デエビゴ（約50h）は併用注意（2.5mg制限）。<br>';
    
    if (guideHtml.includes(targetPitfall)) {
      guideHtml = guideHtml.replace(targetPitfall, addPitfall);
    }
    
    fs.writeFileSync(pGuide, guideHtml, 'utf8');
    console.log('Added Vorzye to 03_guide.html successfully!');
  } else {
    console.error('Target guide block not found in 03_guide.html');
  }
} else {
  console.log('ボルズィ already present in 03_guide.html');
}

// 4. Update src/14_dictionary.html
const pDict = path.join(__dirname, '..', '14_dictionary.html');
let dictHtml = fs.readFileSync(pDict, 'utf8');

const vorzyeDictCard = `    <div class="dict-card" data-type="drug" data-kana="ほ" data-name="ボルズィ錠" data-desc="不眠症治療薬。第4世代デュアルオレキシン受容体拮抗薬（dora）。半減期約2時間と最短でキレ味抜群。翌朝の持ち越し眠気や悪夢を極力抑え入眠を速やかに促す。強力なcyp3a4阻害薬併用禁忌。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ボルズィ錠</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">ボルノレキサント水和物 / 超短時間型オレキシン受容体拮抗薬</div>
        <div class="dict-card-desc">半減期約2時間でオレキシン受容体拮抗薬の中で最短のキレ味！入眠困難を速やかに改善し翌朝への眠気持ち越し・悪夢を最小化。非ベンゾ系（Z-drug）からの置換に最適。強いCYP3A4阻害薬併用禁忌。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-newdrugs', 't-neuro')">🚀 新薬トレンド</button><button class="dict-jump-btn" onclick="jumpToGuide('c20')">📘 不眠症ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('ボルズィ')">📋 詳細</button>
      </div>
    </div>
  
`;

if (!dictHtml.includes('ボルズィ錠')) {
  // Find a nice insertion spot in dictionary, e.g., right before ボノサップ or ボノピオン
  const targetDict = '<div class="dict-card" data-type="drug" data-kana="ほ" data-name="ボノサップパック';
  if (dictHtml.includes(targetDict)) {
    dictHtml = dictHtml.replace(targetDict, vorzyeDictCard + targetDict);
    fs.writeFileSync(pDict, dictHtml, 'utf8');
    console.log('Added Vorzye to 14_dictionary.html before ボノサップ!');
  } else {
    // Alternative: insert before </div>\n</div>\n</div> (end of dict list)
    const endMarker = '  </div>\n</div>';
    const lastIdx = dictHtml.lastIndexOf(endMarker);
    if (lastIdx !== -1) {
      dictHtml = dictHtml.slice(0, lastIdx) + vorzyeDictCard + dictHtml.slice(lastIdx);
      fs.writeFileSync(pDict, dictHtml, 'utf8');
      console.log('Added Vorzye to 14_dictionary.html at end of dictionary container!');
    } else {
      console.error('Could not find insertion position in 14_dictionary.html');
    }
  }
} else {
  console.log('ボルズィ錠 already present in 14_dictionary.html');
}

// 5. Update src/09_app.js
const pApp = path.join(__dirname, '..', '09_app.js');
let appJs = fs.readFileSync(pApp, 'utf8');

const vorzyeDrugDb = `  { name: "ボルズィ", gen: "ボルノレキサント水和物", cat: "新薬 / 不眠症", char: "半減期約2時間！オレキシン拮抗薬最短のキレ味で翌朝の持ち越し眠気を完全撃退", desc: "最高血中濃度到達時間（Tmax）約0.5h、半減期約2.1hの超短時間型デュアルオレキシン受容体拮抗薬。入眠困難に切れ味よく効き朝には完全に抜ける。イトラコナゾール、クラリスロマイシン、ゾコーバ等の強力なCYP3A4阻害薬とは併用禁忌。中等度阻害薬併用時は2.5mgへ減量。", gId: "tab-newdrugs", cSec: "t-neuro" },
`;

if (!appJs.includes('"ボルズィ"')) {
  const targetApp = '  { name: "クービビック",';
  if (appJs.includes(targetApp)) {
    appJs = appJs.replace(targetApp, vorzyeDrugDb + targetApp);
    fs.writeFileSync(pApp, appJs, 'utf8');
    console.log('Added Vorzye to 09_app.js successfully!');
  } else {
    console.error('Could not find クービビック in 09_app.js');
  }
} else {
  console.log('ボルズィ already present in 09_app.js');
}

console.log('=== All files updated successfully! ===');
