const fs = require('fs');

let guideHtml = fs.readFileSync('src/03_guide.html', 'utf8');

const c7Idx = guideHtml.indexOf('id="c7"');
if (c7Idx === -1) {
  console.error('c7 not found');
  process.exit(1);
}

// リウマチの決定樹をより詳細・強力に差し替え
const oldRaBranch = `<div class="decision-branch">
        <div class="branch-condition-header">
          <span class="branch-icon">🔀</span>
          <span class="branch-cond-label">［関節リウマチ（RA）］</span>
          <span class="branch-target">活動性関節リウマチ（滑膜炎・骨破壊進行例）</span>
        </div>
        <div class="branch-flow-steps">
          
        <div class="step-card first-choice">
          <div class="step-pill first">第一選択（アンカードラッグ）</div>
          <div class="step-drug">メトトレキサート（MTX：リウマトレックス 6〜16mg/週）</div>
          <div class="step-rationale">禁忌がなければ診断確定後即座に開始。関節破壊抑制の世界的ゴールドスタンダード。</div>
          <div class="step-chips"><span class="flow-chip" onclick="quickSearch('リウマトレックス')">リウマトレックス</span><span class="flow-chip" onclick="quickSearch('メトジェクト皮下注')">メトジェクト皮下注</span></div>
        </div><div class="step-arrow">➔</div>
        <div class="step-card second-choice">
          <div class="step-pill second">第二選択（効果不十分・高活動性）</div>
          <div class="step-drug">＋ 生物学的製剤（bDMARDs：TNF阻害/IL-6阻害）または JAK阻害薬</div>
          <div class="step-rationale">炎症性サイトカインを直接中和・遮断。骨破壊の進行を完全停止へ導く。</div>
          <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ヒュミラ')">ヒュミラ</span><span class="flow-chip" onclick="quickSearch('アクテムラ')">アクテムラ</span><span class="flow-chip" onclick="quickSearch('オルミエント')">オルミエント</span><span class="flow-chip" onclick="quickSearch('リンヴォック')">リンヴォック</span></div>
        </div>
        </div>
      </div>`;

const newRaBranches = `<div class="decision-branch">
        <div class="branch-condition-header">
          <span class="branch-icon">🦴</span>
          <span class="branch-cond-label">［関節リウマチ（RA：寛解目標）］</span>
          <span class="branch-target">活動性関節リウマチ（DAS28寛解・関節破壊阻止）</span>
        </div>
        <div class="branch-flow-steps">
          <div class="step-card first-choice">
            <div class="step-pill first">第一選択（アンカードラッグ）</div>
            <div class="step-drug">メトトレキサート（MTX：6〜16mg/週）＋ フォリアミン解毒</div>
            <div class="step-rationale">診断確定後直ちに導入。週1〜2日の分割服用。副作用（口内炎/肝障害）予防に葉酸を時間差投与。</div>
            <div class="step-chips"><span class="flow-chip" onclick="quickSearch('リウマトレックス')">リウマトレックス</span><span class="flow-chip" onclick="quickSearch('メトジェクト')">メトジェクト皮下注</span><span class="flow-chip" onclick="quickSearch('フォリアミン')">フォリアミン</span></div>
          </div>
          <div class="step-arrow">➔</div>
          <div class="step-card second-choice">
            <div class="step-pill second">第二選択（生物学的製剤：bDMARDs）</div>
            <div class="step-drug">＋ TNF阻害薬（ヒュミラ/エンブレル） または IL-6阻害薬（アクテムラ）</div>
            <div class="step-rationale">炎症性サイトカインを直接中和し骨びらん進行を完全停止。高齢者にはアバタセプト（オレンシア）。</div>
            <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ヒュミラ')">ヒュミラ</span><span class="flow-chip" onclick="quickSearch('アクテムラ')">アクテムラ</span><span class="flow-chip" onclick="quickSearch('オレンシア')">オレンシア</span></div>
          </div>
          <div class="step-arrow">➔</div>
          <div class="step-card third-choice">
            <div class="step-pill third">難治性・経口分子標的薬（tsDMARDs）</div>
            <div class="step-drug">経口JAK阻害薬（リンヴォック / オルミエント / ゼルヤンツ等）</div>
            <div class="step-rationale">複数サイトカインシグナルを細胞内で遮断。経口で劇的寛解を達成！帯状疱疹発症に厳重警戒。</div>
            <div class="step-chips"><span class="flow-chip" onclick="quickSearch('リンヴォック')">リンヴォック</span><span class="flow-chip" onclick="quickSearch('オルミエント')">オルミエント</span><span class="flow-chip" onclick="quickSearch('スマイラフ')">スマイラフ</span></div>
          </div>
        </div>
      </div>`;

guideHtml = guideHtml.replace(oldRaBranch, newRaBranches);

// 監査ピットフォールにリウマチの重要事項を追記
guideHtml = guideHtml.replace(
  'MTXは「週1〜2日投与・残りは休薬」！毎日の誤服用による骨髄抑制事故を患者指導で徹底防止！',
  'MTXは「週1〜2日投与・残りは休薬」！誤服用による骨髄抑制事故を患者指導で徹底防止！ アクテムラ（IL-6阻害）投与中は重症感染症でも「CRPが0.0にマスクされる」ため微熱・倦怠感の急変に厳重注意！ JAK阻害薬は帯状疱疹リスクが高いためワクチン事前接種を推奨！'
);

// 臨床パールにも追記
const pearlSearchC7 = '<h3>💡 先輩からの現場の勘所（Clinical Pearls）</h3>';
const c7PearlIdx = guideHtml.indexOf(pearlSearchC7, c7Idx);
const insertPearlC7 = `
        <li><strong>トシリズマブ（アクテムラ）の「CRPゼロ・トラップ」：</strong>IL-6のシグナルを完全にブロックするため、患者さんが<strong>重症肺炎や敗血症で倒れていても血液検査のCRPは「0.0 mg/dL」のまま</strong>になる！「CRPが上がってないから感染症じゃない」と誤診される事故を薬剤師が防ぐこと！</li>
        <li><strong>ケアラム（イグラチモド）とワーファリンの「併用禁忌」：</strong>イグラチモドがワルファリンの代謝を強力に阻害し、PT-INRが跳ね上がって重大な頭蓋内出血を起こすため<strong>絶対併用禁忌</strong>！お薬手帳で必ずチェック。</li>
        <li><strong>生物学的製剤・JAK阻害薬開始前の「結核・B型肝炎スクリーニング」：</strong>免疫を強力に抑えるため、昔かかった結核の再燃や、B型肝炎ウイルスの再活性化（劇症肝炎）が起きる。開始前にIGRA（T-スポット/QFT）やHBs抗原・HBc抗体検査が行われているか確認！</li>`;

guideHtml = guideHtml.substring(0, c7PearlIdx + pearlSearchC7.length + 15) + insertPearlC7 + guideHtml.substring(c7PearlIdx + pearlSearchC7.length + 15);

fs.writeFileSync('src/03_guide.html', guideHtml, 'utf8');
console.log('Successfully updated c7 with advanced Rheumatoid Arthritis guide');
