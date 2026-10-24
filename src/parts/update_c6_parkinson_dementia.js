const fs = require('fs');

let guideHtml = fs.readFileSync('src/03_guide.html', 'utf8');

// c6 のタイトルを更新
guideHtml = guideHtml.replace(
  '<h2 class="card-title">6. 精神神経疾患（うつ病・統合失調症・不眠・認知症）</h2>',
  '<h2 class="card-title">6. 精神神経疾患（うつ・不眠・認知症・パーキンソン病）</h2>'
);

guideHtml = guideHtml.replace(
  '<h3 class="algo-title">📊 6. 精神神経疾患（うつ・統合失調・不眠・認知症） 第一選択・条件分岐アルゴリズム</h3>',
  '<h3 class="algo-title">📊 6. 精神神経疾患（うつ・不眠・認知症・パーキンソン病） 第一選択・条件分岐アルゴリズム</h3>'
);

// パーキンソン病と認知症の分岐HTML
const pdAndDementiaBranches = `
      <div class="decision-branch">
        <div class="branch-condition-header">
          <span class="branch-icon">🧠</span>
          <span class="branch-cond-label">［パーキンソン病（PD）］</span>
          <span class="branch-target">発症年齢 ＆ 運動症状（振戦・固縮・無動・姿勢反射障害）</span>
        </div>
        <div class="branch-flow-steps">
          <div class="step-card first-choice">
            <div class="step-pill first">第一選択（年齢・重症度別）</div>
            <div class="step-drug">70歳未満：非麦角系ドパミンアゴニスト ／ 70歳以上：L-ドパ製剤</div>
            <div class="step-rationale">若年は運動合併症を遅らせるためD2刺激薬。高齢者や運動障害が強い場合は効果最強のL-ドパ先行。</div>
            <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ネオドパストン')">ネオドパストン</span><span class="flow-chip" onclick="quickSearch('ビ・シフロール')">プラミペキソール</span><span class="flow-chip" onclick="quickSearch('ニュープロパッチ')">ニュープロパッチ</span></div>
          </div>
          <div class="step-arrow">➔</div>
          <div class="step-card second-choice">
            <div class="step-pill second">ウェアリング・オフ現象出現時</div>
            <div class="step-drug">＋ COMT阻害薬（オンジェンティス） または MAO-B阻害薬 / ノウリアスト</div>
            <div class="step-rationale">L-ドパの末梢代謝を防ぎT1/2を延長。薬効時間の谷間（オフ時間）を劇的に短縮！</div>
            <div class="step-chips"><span class="flow-chip" onclick="quickSearch('オンジェンティス')">オンジェンティス</span><span class="flow-chip" onclick="quickSearch('エクフィナ')">エクフィナ</span><span class="flow-chip" onclick="quickSearch('ノウリアスト')">ノウリアスト</span></div>
          </div>
        </div>
      </div>

      <div class="decision-branch">
        <div class="branch-condition-header">
          <span class="branch-icon">👵</span>
          <span class="branch-cond-label">［認知症（4大病型・最新治療）］</span>
          <span class="branch-target">アルツハイマー型（AD） vs レビー小胞型（DLB） vs 早期AD新薬</span>
        </div>
        <div class="branch-flow-steps">
          <div class="step-card first-choice">
            <div class="step-pill first">第一選択（中核症状進行遅延）</div>
            <div class="step-drug">ChE阻害薬（ドネペジル / ガランタミン / リバスチグミン貼付剤）</div>
            <div class="step-rationale">脳内アセチルコリンを高める。DLB（幻視・認知変動）にもドネペジル有効。怒りっぽい例はメマリー併用。</div>
            <div class="step-chips"><span class="flow-chip" onclick="quickSearch('アリセプト')">ドネペジル</span><span class="flow-chip" onclick="quickSearch('イクセロン')">イクセロンパッチ</span><span class="flow-chip" onclick="quickSearch('メマリー')">メマンチン</span></div>
          </div>
          <div class="step-arrow">➔</div>
          <div class="step-card third-choice">
            <div class="step-pill third">早期AD・MCI新時代治療</div>
            <div class="step-drug">抗Aβ抗体 レカネマブ（レケンビ 点滴静注）</div>
            <div class="step-rationale">アミロイドPET陽性を確認の上投与。認知機能低下の進行を約27%遅延。定期MRIでARIA監視。</div>
            <div class="step-chips"><span class="flow-chip" onclick="quickSearch('レケンビ')">レケンビ</span></div>
          </div>
        </div>
      </div>
`;

// アルゴリズム決定樹の末尾に追加
const c6Idx = guideHtml.indexOf('id="c6"');
const endOfC6Tree = guideHtml.indexOf('</div>\n        <div class="algo-footer-pitfall">', c6Idx);
if (endOfC6Tree !== -1) {
  guideHtml = guideHtml.substring(0, endOfC6Tree) + pdAndDementiaBranches + guideHtml.substring(endOfC6Tree);
}

// 監査ピットフォールにパーキンソン・認知症の注意点を追記
guideHtml = guideHtml.replace(
  '高齢者不眠にベンゾジアゼピン系は転倒骨折・せん妄・認知機能低下を誘発（Beers Criteria回避対象）！ SSRI開始初期（1〜2週）のアクチベーション症候群（不安焦燥・希死念慮）に要注意！',
  '高齢者不眠にベンゾジアゼピン系は転倒骨折・せん妄を誘発！ ドパミンアゴニストの「突発性睡眠（運転厳禁）」・「病的賭博」に注意！ レビー小胞型認知症（DLB）への抗精神病薬過敏性に超警戒！ 急な抗パーキンソン薬中止による悪性症候群（高熱・固縮・CK激増）に注意！'
);

// ウラ読み・臨床パールにも追記
const pearlSearch = '<h3>💡 先輩からの現場の勘所（Clinical Pearls）</h3>';
const c6PearlIdx = guideHtml.indexOf(pearlSearch, c6Idx);
const insertPearl = `
        <li><strong>胃薬（プリンペラン・ドグマチール）による「薬剤性パーキンソニズム」：</strong>「最近急におじいちゃんの手が震えて歩けなくなった」と相談されたら、胃薬や吐き気止めをチェック！D2受容体を遮断してパーキンソン症状を作っていることが日常茶飯事。原因薬の中止で劇的に治る！</li>
        <li><strong>L-ドパと食事タンパク質（ステーキ・プロテイン）の競合：</strong>L-ドパ（レボドパ）は「中性大型アミノ酸」と同じトランスポーターで腸管吸収・脳関門通過するため、高タンパク食の直後は薬の効きが悪くなる。ウェアリングオフ対策では服用タイミングを食前や食間へ調整！</li>
        <li><strong>レビー小胞型認知症（DLB）の「抗精神病薬過敏性」：</strong>生々しい幻視（壁に虫がいる等）があっても、安易に抗精神病薬（リスパダール等）を出すと重篤な筋固縮・意識障害・悪性症候群を起こす！非薬物療法やドネペジル、抑肝散を優先。</li>`;

guideHtml = guideHtml.substring(0, c6PearlIdx + pearlSearch.length + 15) + insertPearl + guideHtml.substring(c6PearlIdx + pearlSearch.length + 15);

fs.writeFileSync('src/03_guide.html', guideHtml, 'utf8');
console.log('Successfully updated c6 with Parkinson and Dementia advancements');
