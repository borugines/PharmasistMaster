const fs = require('fs');
const path = require('path');

console.log("=== Building Pregnancy & Lactation Pharmacotherapy Master ===");

// ============================================================================
// 1. Update src/11_special_topics.html (Add Section 6)
// ============================================================================
const specialPath = path.join(__dirname, '..', '11_special_topics.html');
let specialHtml = fs.readFileSync(specialPath, 'utf8');

// Update header from 5領域 to 6領域
specialHtml = specialHtml.replace('（全5領域）', '（全6領域）');

const section6Html = `
  <!-- ==========================================
       6. 妊娠中・授乳中の薬物治療 ＆ 安全性マトリクス
       ========================================== -->
  <div class="special-card" id="sec-pregnancy">
    <div class="special-card-header" style="border-left:5px solid #ec4899; background:linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);">
      <span class="special-badge" style="background:#ec4899; color:white;">領域 ⑥ / Pregnancy & Lactation</span>
      <h2 style="font-size:1.35rem; color:#831843; font-weight:800; margin-top:6px;">🤰 ⑥ 妊娠中・授乳中の薬物治療 ＆ 安全性マトリクス（催奇形性・授乳可否・第一選択完全マスター）</h2>
      <p style="font-size:0.88rem; color:#9d174d; margin:4px 0 0 0;">
        添付文書の画一的な「有益性投与・授乳中止」記載に惑わされず、最新の疫学エビデンス（国立成育医療研究センター・豪州分類等）と薬理パラメータで母子の安心を支える！
      </p>
    </div>

    <div class="special-card-body" style="padding:20px;">
      
      <!-- 1. 妊娠タイムラインと薬剤感受性 -->
      <div style="margin-bottom:25px;">
        <h3 style="font-size:1.1rem; color:#0f172a; margin-bottom:10px; display:flex; align-items:center; gap:8px;">
          <span>🗓️</span> <strong>1. 妊娠時期別の薬剤感受性タイムライン（時期ごとのリスク判定）</strong>
        </h3>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:12px;">
          <div style="background:white; border:1.5px solid #cbd5e1; border-radius:8px; padding:12px; border-top:4px solid #64748b;">
            <div style="font-weight:700; color:#334155; font-size:0.92rem; margin-bottom:4px;">① 無影響期<br><span style="font-size:0.78rem; color:#64748b;">受胎前〜妊娠3週末（妊娠0〜3週）</span></div>
            <div style="font-size:0.82rem; color:#475569; line-height:1.4;">
              <strong>「All or Noneの法則」</strong><br>
              受精卵がダメージを受ければ着床せず流産、生存すれば完全に修復されるため、<strong>形態異常（奇形）は残らない</strong>。「妊娠に気づかず薬を飲んだ」患者を最も安心させられる医学的事実。
            </div>
          </div>

          <div style="background:white; border:2px solid #ef4444; border-radius:8px; padding:12px; border-top:4px solid #dc2626; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
            <div style="font-weight:700; color:#b91c1c; font-size:0.92rem; margin-bottom:4px;">② 絶対過敏期<br><span style="font-size:0.78rem; color:#dc2626;">妊娠4週〜妊娠7週末（妊娠初頭）</span></div>
            <div style="font-size:0.82rem; color:#475569; line-height:1.4;">
              <strong style="color:#b91c1c;">催奇形性リスク最大！</strong><br>
              心臓、四肢、中枢神経、眼、耳などの主要臓器が急速に形成される時期。催奇形性薬物の曝露で大奇形（形態異常）が起こり得る最厳戒期間。
            </div>
          </div>

          <div style="background:white; border:1.5px solid #f59e0b; border-radius:8px; padding:12px; border-top:4px solid #d97706;">
            <div style="font-weight:700; color:#b45309; font-size:0.92rem; margin-bottom:4px;">③ 相対過敏期<br><span style="font-size:0.78rem; color:#b45309;">妊娠8週〜妊娠15週末</span></div>
            <div style="font-size:0.82rem; color:#475569; line-height:1.4;">
              主要臓器の形成は終了し、口蓋や外性器が完成に向かう。催奇形性リスクは激減するが、性腺分化や小奇形、機能的異常に配慮。
            </div>
          </div>

          <div style="background:white; border:2px solid #7c3aed; border-radius:8px; padding:12px; border-top:4px solid #6d28d9;">
            <div style="font-weight:700; color:#6d28d9; font-size:0.92rem; margin-bottom:4px;">④ 胎児期<br><span style="font-size:0.78rem; color:#6d28d9;">妊娠16週〜分娩まで（中期・後期）</span></div>
            <div style="font-size:0.82rem; color:#475569; line-height:1.4;">
              <strong style="color:#6d28d9;">胎児毒性（機能障害）に警戒！</strong><br>
              奇形は生じないが、胎児の臓器機能に直接影響。<br>
              ・<strong>NSAIDs：</strong>胎児動脈管早期閉鎖・羊水過少（28週以降禁忌）<br>
              ・<strong>ACE阻害/ARB：</strong>胎児腎不全・無尿
            </div>
          </div>
        </div>
      </div>

      <!-- 2. 妊娠中「絶対禁忌」の代表的危険薬剤 10選 -->
      <div style="margin-bottom:25px; background:#fef2f2; border:1.5px solid #fecaca; border-radius:8px; padding:15px;">
        <h3 style="font-size:1.05rem; color:#991b1b; margin-bottom:8px; display:flex; align-items:center; gap:8px;">
          <span>🚨</span> <strong>妊娠中「絶対禁忌」の代表的危険薬剤 10選（調剤鑑査の超重要地雷）</strong>
        </h3>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:10px; font-size:0.83rem; line-height:1.45; color:#7f1d1d;">
          <div style="background:white; padding:8px 10px; border-radius:6px; border:1px solid #fee2e2;">
            <strong>1. RAS阻害薬（ACE阻害薬 / ARB / ARNI）：</strong><br>胎児腎不全、羊水過少症、頭蓋骨低形成、胎児死亡（全期禁忌）。
          </div>
          <div style="background:white; padding:8px 10px; border-radius:6px; border:1px solid #fee2e2;">
            <strong>2. スタチン系（HMG-CoA還元酵素阻害薬）：</strong><br>胎児細胞膜・ホルモン合成に必要なコレステロール枯渇、催奇形性。
          </div>
          <div style="background:white; padding:8px 10px; border-radius:6px; border:1px solid #fee2e2;">
            <strong>3. ワルファリン：</strong><br>ワルファリン胎児症候群（鼻低形成、骨端点状化、知能障害）、胎児頭蓋内出血。
          </div>
          <div style="background:white; padding:8px 10px; border-radius:6px; border:1px solid #fee2e2;">
            <strong>4. バルプロ酸ナトリウム（デパケン）：</strong><br>神経管閉鎖障害（二分脊椎）、IQ低下、自閉スペクトラム症リスク。
          </div>
          <div style="background:white; padding:8px 10px; border-radius:6px; border:1px solid #fee2e2;">
            <strong>5. チガソン（エトレチナート）：</strong><br>重篤な催奇形性。体内に長期蓄積するため<strong>【服用中止後2年間の避妊が法的に義務】</strong>。
          </div>
          <div style="background:white; padding:8px 10px; border-radius:6px; border:1px solid #fee2e2;">
            <strong>6. メトトレキサート（MTX / リウマトレックス）：</strong><br>葉酸代謝拮抗による流産、頭蓋顔面骨奇形。
          </div>
          <div style="background:white; padding:8px 10px; border-radius:6px; border:1px solid #fee2e2;">
            <strong>7. NSAIDs（ロキソニン・ボルタレン等）：</strong><br>特に<strong>妊娠後期（28週以降）禁忌！</strong>動脈管早期閉鎖、新生児遷延性肺高血圧（PPHN）。
          </div>
          <div style="background:white; padding:8px 10px; border-radius:6px; border:1px solid #fee2e2;">
            <strong>8. テトラサイクリン系（ミノマイシン等）：</strong><br>胎児骨発育不全、乳児歯牙黄染（永久歯着色・エナメル質低形成）。
          </div>
          <div style="background:white; padding:8px 10px; border-radius:6px; border:1px solid #fee2e2;">
            <strong>9. ルビプロストン（アミティーザ）：</strong><br>プロスタグランジン様作用による子宮収縮、流早産リスク（禁忌）。
          </div>
          <div style="background:white; padding:8px 10px; border-radius:6px; border:1px solid #fee2e2;">
            <strong>10. ニューキノロン系抗菌薬（クラビット等）：</strong><br>胎児の関節軟骨障害の懸念（有益性投与だが実質避ける）。
          </div>
        </div>
      </div>

      <!-- 3. 妊娠中の症状別 第一選択薬マトリクス表 -->
      <div style="margin-bottom:25px;">
        <h3 style="font-size:1.1rem; color:#0f172a; margin-bottom:10px; display:flex; align-items:center; gap:8px;">
          <span>🛡️</span> <strong>3. 妊娠中の頻出疾患・症状別「第一選択薬 vs 避けるべき薬」完全対比表</strong>
        </h3>
        <div style="overflow-x:auto;">
          <table style="width:100%; border-collapse:collapse; font-size:0.85rem; background:white; border-radius:8px; overflow:hidden; border:1px solid #cbd5e1;">
            <thead>
              <tr style="background:#0f172a; color:white; text-align:left;">
                <th style="padding:9px 10px; width:16%;">症状・疾患</th>
                <th style="padding:9px 10px; width:26%;">妊娠中の第一選択薬（安全性が高い）</th>
                <th style="padding:9px 10px; width:22%;">避けるべき禁忌・要注意薬</th>
                <th style="padding:9px 10px; width:36%;">服薬指導・処方鑑査の勘所（Clinical Pearls）</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:10px;"><strong>頭痛・発熱・疼痛</strong></td>
                <td style="padding:10px;"><strong style="color:#0369a1;">アセトアミノフェン</strong><br>（カロナール 300〜500mg）</td>
                <td style="padding:10px;"><strong style="color:#b91c1c;">NSAIDs全般</strong><br>（ロキソニン、イブ、ボルタレン等）</td>
                <td style="padding:10px; font-size:0.82rem; color:#475569;">
                  カロナールが全期間で安全な第一選択。NSAIDsは妊娠28週以降は<strong>動脈管早期閉鎖で完全禁忌</strong>！湿布薬（モーラステープ等）も大量貼付で胎児移行するため避ける。
                </td>
              </tr>
              <tr style="border-bottom:1px solid #e2e8f0; background:#fffbeb;">
                <td style="padding:10px;"><strong>妊娠高血圧症候群</strong></td>
                <td style="padding:10px;">
                  <strong style="color:#b45309;">メチルドパ（アルドメット）</strong><br>
                  <strong style="color:#b45309;">ラベタロール（トランデート）</strong><br>
                  ヒドララジン（アプレゾリン）<br>
                  ニフェジピン徐放（アダラートCR）
                </td>
                <td style="padding:10px;"><strong style="color:#b91c1c;">ACE阻害薬 / ARB / ARNI</strong><br>（レニベース、オルメテック、エンレスト等）</td>
                <td style="padding:10px; font-size:0.82rem; color:#475569;">
                  妊娠前からRAS阻害薬を飲んでいた女性が妊娠判明した場合は<strong>直ちにメチルドパやラベタロールへ切り替え疑義照会！</strong>アダラートCRは妊娠20週以降で使用可能。
                </td>
              </tr>
              <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:10px;"><strong>糖尿病（妊娠糖尿病）</strong></td>
                <td style="padding:10px;"><strong style="color:#15803d;">インスリン製剤 自己注射</strong><br>（ヒューマログ、ノボラピッド、ランタス等）</td>
                <td style="padding:10px;"><strong style="color:#b91c1c;">経口血糖降下薬全般</strong><br>（メトホルミン、SU薬、SGLT2、DPP-4）</td>
                <td style="padding:10px; font-size:0.82rem; color:#475569;">
                  <strong>胎盤を通過しないインスリンが絶対標準</strong>。経口薬は胎児へ移行し重篤な胎児低血糖や奇形リスクがあるため妊娠中は原則不可。厳格な食前・食後血糖管理が胎児巨大化を防ぐ。
                </td>
              </tr>
              <tr style="border-bottom:1px solid #e2e8f0; background:#f0fdf4;">
                <td style="padding:10px;"><strong>つわり・妊娠悪阻</strong></td>
                <td style="padding:10px;">
                  <strong style="color:#15803d;">小半夏加茯苓湯</strong>（ツムラ11）<br>
                  <strong>ビタミンB6</strong>（ピリドキシン）<br>
                  五苓散（ツムラ17：むくみ・水毒）<br>
                  プリンペラン（メトクロプラミド）
                </td>
                <td style="padding:10px;">催奇形性懸念薬<br>自己判断での市販胃腸薬</td>
                <td style="padding:10px; font-size:0.82rem; color:#475569;">
                  <strong>小半夏加茯苓湯（しょうはんげかぶくりょうとう）</strong>がつわりの神処方！生姜と半夏が胃の逆流を抑え、茯苓が水分代謝を是正。ビタミンB6併用で吐き気が劇的改善。脱水時は点滴。
                </td>
              </tr>
              <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:10px;"><strong>便秘症</strong></td>
                <td style="padding:10px;">
                  <strong style="color:#0369a1;">酸化マグネシウム（マグミット）</strong><br>
                  <strong>ラクツロース（ラグノスNF）</strong>
                </td>
                <td style="padding:10px;"><strong style="color:#b91c1c;">アミティーザ（流早産禁忌）</strong><br>センナ・大黄（子宮収縮刺激）</td>
                <td style="padding:10px; font-size:0.82rem; color:#475569;">
                  腸管から吸収されない浸透圧性下剤が安全の基本。刺激性下剤（センノシド・大黄）は骨盤内充血・子宮収縮を誘発しやすいため頓用に限定。アミティーザ処方は直ちに差し止め。
                </td>
              </tr>
              <tr style="border-bottom:1px solid #e2e8f0; background:#f8fafc;">
                <td style="padding:10px;"><strong>気管支喘息</strong></td>
                <td style="padding:10px;">
                  <strong style="color:#0369a1;">吸入ステロイド（ブデソニド等）</strong><br>
                  発作時：メプチン / サルタノール吸入
                </td>
                <td style="padding:10px;">喘息の自己中断・放置<br>（胎児低酸素症のリスク！）</td>
                <td style="padding:10px; font-size:0.82rem; color:#475569;">
                  <span style="color:#b91c1c; font-weight:700;">「薬が怖いから吸入をやめる」妊婦への指導が最重要！</span>「お母さんが息苦しいと赤ちゃんは酸欠になります。吸入薬は肺局所に留まり胎児には届きません」と安心させる。
                </td>
              </tr>
              <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:10px;"><strong>細菌感染症</strong></td>
                <td style="padding:10px;">
                  <strong style="color:#15803d;">ペニシリン系</strong>（サワシリン等）<br>
                  <strong style="color:#15803d;">セフェム系</strong>（ケフラール等）<br>
                  マクロライド系（ジスロマック等）
                </td>
                <td style="padding:10px;">
                  <strong style="color:#b91c1c;">ニューキノロン系</strong>（関節軟骨障害）<br>
                  <strong style="color:#b91c1c;">テトラサイクリン系</strong>（歯牙着色・骨）<br>
                  アミノグリコシド（聴神経障害）
                </td>
                <td style="padding:10px; font-size:0.82rem; color:#475569;">
                  細胞壁合成阻害のβ-ラクタム系（ペニシリン・セフェム）はヒト細胞に影響せず最も安全。クラミジアにはアジスロマイシン1g単回投与が第一選択。
                </td>
              </tr>
              <tr style="background:#fff7ed;">
                <td style="padding:10px;"><strong>アレルギー性鼻炎</strong></td>
                <td style="padding:10px;">
                  <strong>点鼻ステロイド</strong>（アラミスト等）<br>
                  <strong>第2世代抗ヒスタミン内服：</strong><br>
                  セチリジン、ロラタジン、フェキソフェナジン
                </td>
                <td style="padding:10px;">プソイドエフェドリン配合剤<br>（血管収縮による子宮血流低下）</td>
                <td style="padding:10px; font-size:0.82rem; color:#475569;">
                  局所点鼻が最も安全。内服する場合は世界的に安全データの蓄積が最も多い<strong>「B・L・F（ビラノアではなくジルテック・クラリチン・アレグラ）」</strong>を選択する。
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 4. 授乳中の薬物治療 ＆ 母乳移行性の科学 -->
      <div style="background:white; border:1.5px solid #0284c7; border-radius:8px; padding:15px; margin-bottom:20px;">
        <h3 style="font-size:1.05rem; color:#0f172a; margin-bottom:8px; display:flex; align-items:center; gap:8px;">
          <span>🍼</span> <strong>4. 授乳中の母乳移行性の科学 ＆ 添付文書のウラ読み（脱・安易な断乳指導！）</strong>
        </h3>
        <p style="font-size:0.84rem; color:#475569; margin:0 0 10px 0; line-height:1.5;">
          日本の添付文書の約7割には「授乳を避けさせること」と記載されていますが、これは製薬企業の法的な防衛記載であることが多く、<strong>最新の医学基準（成育医療研究センター・LactMed）ではほとんどの日常治療薬が授乳継続可能</strong>です。安易な断乳指導は乳腺炎や母子の精神的苦痛を招きます！
        </p>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:12px; font-size:0.83rem; line-height:1.5;">
          <div style="background:#f8fafc; border-left:3px solid #0284c7; padding:8px 10px; border-radius:0 6px 6px 0;">
            <strong style="color:#0284c7;">📊 母乳移行性の国際基準「RID < 10%」：</strong><br>
            RID（Relative Infant Dose：乳児相対摂取量）が<strong>10%未満であれば、原則として授乳を継続してよい（安全）</strong>と判断されます。カロナール、ロキソニン、抗生剤、抗アレルギー薬の多くはRID 1〜2%未満であり、乳児への影響は無視できるレベルです。
          </div>
          <div style="background:#f8fafc; border-left:3px solid #10b981; padding:8px 10px; border-radius:0 6px 6px 0;">
            <strong style="color:#10b981;">⏰ 授乳と内服のタイミングの工夫：</strong><br>
            少しでも乳児への移行を減らしたい場合、<strong>「授乳の直後に薬を飲む」</strong>のが黄金律！次の授乳時間（2〜3時間後）には母親の血中濃度ピークが過ぎているため、母乳中への移行量を最小限に抑えられます。
          </div>
          <div style="background:#f8fafc; border-left:3px solid #ef4444; padding:8px 10px; border-radius:0 6px 6px 0;">
            <strong style="color:#b91c1c;">🚨 授乳中に「本当に避けるべき」絶対禁忌・高リスク薬：</strong><br>
            ・<strong>コデイン・トラマドール：</strong>母親がCYP2D6超代謝能（UM）の場合、高濃度のモルヒネが母乳へ移行し<strong>乳児が呼吸停止・死亡</strong>した事例あり（FDA警告・禁忌）。<br>
            ・<strong>ヨード製剤（イソジンうがい連用等）：</strong>母乳中にヨウ素が濃縮移行し、乳児の甲状腺機能低下症を招く。<br>
            ・<strong>抗がん薬・免疫抑制薬：</strong>細胞毒性のため禁忌。
          </div>
        </div>
      </div>

      <!-- 先輩からの現場の勘所 -->
      <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:12px 14px; font-size:0.84rem; line-height:1.5; color:#1e3a8a;">
        💡 <strong>先輩薬剤師からの Clinical Pearls（相談対応の極意）：</strong><br>
        「妊娠に気づかず薬を飲んでしまった」と青ざめて来局された患者さんには、まず<strong>「妊娠週数を正確に確認」</strong>します。受胎後2週間（妊娠3週末まで）なら「All or Noneの法則」で奇形リスクはゼロであることを説明し、不安でパニックになっているお母さんの心を優しく受け止めるのが薬剤師の最高の職能です。
      </div>

    </div>
  </div>
`;

// Insert Section 6 right before `</div><!-- /.special-container -->`
const endContainerMarker = '</div><!-- /.special-container -->';
const pEndContainer = specialHtml.lastIndexOf(endContainerMarker);

if (pEndContainer !== -1) {
  specialHtml = specialHtml.substring(0, pEndContainer) + section6Html + '\n\n  ' + specialHtml.substring(pEndContainer);
  fs.writeFileSync(specialPath, specialHtml, 'utf8');
  console.log("Successfully inserted Section 6 into 11_special_topics.html!");
} else {
  console.error("Could not find end of special-container in 11_special_topics.html");
  process.exit(1);
}


// ============================================================================
// 2. Update src/05_comparison.html (Add Pregnancy & Lactation Comparison Table)
// ============================================================================
const compPath = path.join(__dirname, '..', '05_comparison.html');
let compHtml = fs.readFileSync(compPath, 'utf8');

const compPregnancyTableHtml = `
    <!-- 妊娠中・授乳中のガチンコ比較 -->
    <div class="sub-banner banner-within" style="margin-top:2rem;">
      <span>🤰 【妊娠中・授乳中の薬物治療 ガチンコ比較】症状別第一選択薬 vs 絶対禁忌薬マトリクス</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">症状・疾患領域</th>
          <th style="width:22%;">妊娠中の第一選択薬（推奨）</th>
          <th style="width:20%;">妊娠中・授乳中の絶対禁忌薬</th>
          <th style="width:42%;">なぜこの使い分けなのか？（薬理メカニズム・鑑査急所）</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>頭痛・解熱鎮痛</strong></td>
          <td><strong style="color:#0369a1;">アセトアミノフェン</strong><br>（カロナール）</td>
          <td><strong style="color:#b91c1c;">NSAIDs全般（ロキソニン等）</strong><br>※特に妊娠28週以降</td>
          <td><span class="char">アセトアミノフェンが全期間の絶対王者</span> NSAIDsはプロスタグランジン合成阻害により<strong>胎児動脈管を早期閉鎖させ、新生児遷延性肺高血圧（PPHN）や羊水過少</strong>を引き起こす。授乳中はロキソニン・カロナール共に安全に使用可能。</td>
        </tr>
        <tr>
          <td><strong>高血圧症</strong></td>
          <td><strong style="color:#b45309;">メチルドパ（アルドメット）</strong><br><strong style="color:#b45309;">ラベタロール（トランデート）</strong><br>ニフェジピンCR（20週〜）</td>
          <td><strong style="color:#b91c1c;">ACE阻害薬 / ARB / ARNI</strong><br>（レニベース、オルメテック等）</td>
          <td><span class="char">RAS阻害薬は全期間禁忌！胎児腎血流を遮断する</span> 胎児の腎機能不全・無尿・重篤な羊水過少（肺低形成）を起こす。降圧薬内服中の女性が妊娠したら即座にメチルドパかラベタロールへ切り替える。</td>
        </tr>
        <tr>
          <td><strong>咳止め・鎮痛</strong></td>
          <td>デキストロメトルファン<br>（メジコン）</td>
          <td><strong style="color:#b91c1c;">コデイン類 / トラマドール</strong><br>※特に授乳中禁忌！</td>
          <td><span class="char">授乳婦へのコデインで乳児モルヒネ中毒死！</span> 母親がCYP2D6超代謝能（UM）だと、コデインが体内で大量のモルヒネに変換され母乳へ移行、<strong>母乳を飲んだ乳児が呼吸抑制で急死</strong>した事故を受けFDA・添付文書で禁忌指定。</td>
        </tr>
        <tr>
          <td><strong>つわり・悪阻</strong></td>
          <td><strong style="color:#15803d;">小半夏加茯苓湯</strong><br>ビタミンB6（ピリドキシン）</td>
          <td>自己判断の市販薬<br>脱水の放置</td>
          <td><span class="char">漢方（小半夏加茯苓湯）＋ビタミンB6がベストパートナー</span> 胎児奇形リスクなく胃の逆流・吐き気を是正。ケトン陽性の重症悪水（妊娠悪阻）には迷わず補液点滴を医師に促す。</td>
        </tr>
      </tbody>
    </table>
`;

// Insert before the last closing div in 05_comparison.html
const pLastCompDiv = compHtml.lastIndexOf('</div>\n\n</div><!-- /#tab-comparison -->');
if (pLastCompDiv !== -1) {
  compHtml = compHtml.substring(0, pLastCompDiv) + compPregnancyTableHtml + '\n  ' + compHtml.substring(pLastCompDiv);
  fs.writeFileSync(compPath, compHtml, 'utf8');
  console.log("Successfully inserted Pregnancy Comparison Table into 05_comparison.html!");
} else {
  // Alternative target
  const pEndComp = compHtml.lastIndexOf('</div><!-- /#tab-comparison -->');
  if (pEndComp !== -1) {
    compHtml = compHtml.substring(0, pEndComp) + compPregnancyTableHtml + '\n</div>\n' + compHtml.substring(pEndComp);
    fs.writeFileSync(compPath, compHtml, 'utf8');
    console.log("Inserted Pregnancy Comparison Table using alternative target into 05_comparison.html!");
  }
}


// ============================================================================
// 3. Update src/14_dictionary.html (Add Pregnancy & Lactation Cards)
// ============================================================================
const dictPath = path.join(__dirname, '..', '14_dictionary.html');
let dictHtml = fs.readFileSync(dictPath, 'utf8');

const pregDictCards = `
      <!-- 妊娠時期と薬剤感受性 -->
      <div class="dict-card" data-category="special">
        <div class="dict-card-header">
          <span class="dict-tag">妊娠・薬物動態</span>
          <span class="dict-badge">時期別リスク</span>
        </div>
        <h3 class="dict-card-title">妊娠時期と薬剤感受性（All or None ＆ 絶対過敏期 ＆ 胎児期）</h3>
        <p class="dict-card-desc">
          <strong>① 無影響期（0〜3週末）：</strong>「All or Noneの法則」。受精卵の修復能により、生存すれば形態異常は残らない。<br>
          <strong>② 絶対過敏期（4〜7週末）：</strong>主要臓器形成期。<strong>催奇形性リスク最大！</strong>催奇形性薬物は絶対回避。<br>
          <strong>③ 相対過敏期（8〜15週末）：</strong>外性器・口蓋形成。小奇形・機能異常に注意。<br>
          <strong>④ 胎児期（16週〜分娩）：</strong>奇形は生じないが<strong>胎児毒性（機能障害）</strong>に警戒。NSAIDs（28週以降禁忌：動脈管閉鎖）、ACE阻害/ARB（全期禁忌：腎不全）。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">指導：「気づかず飲んだ」妊婦の週数を同定し安心を提供</span>
        </div>
      </div>

      <!-- 妊娠高血圧症候群の第一選択降圧薬 -->
      <div class="dict-card" data-category="special">
        <div class="dict-card-header">
          <span class="dict-tag">妊娠・循環器</span>
          <span class="dict-badge">降圧薬選択</span>
        </div>
        <h3 class="dict-card-title">妊娠高血圧症候群の第一選択降圧薬（メチルドパ / ラベタロール）</h3>
        <p class="dict-card-desc">
          <strong>【第一選択】</strong>中枢性α2作動薬<strong>メチルドパ（アルドメット）</strong>、αβ遮断薬<strong>ラベタロール（トランデート）</strong>。長年の使用実績があり催奇形性・胎児毒性なし。<br>
          <strong>【第二選択】</strong>ヒドララジン（アプレゾリン）、ニフェジピン徐放錠（アダラートCR：妊娠20週以降）。<br>
          <strong>【絶対禁忌】</strong><strong>ACE阻害薬、ARB、ARNI</strong>（胎児腎不全・羊水過少症・頭蓋骨低形成で死亡例多数）。降圧薬内服中の女性の妊娠判明時は即座に切り替え疑義照会。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">鑑査：若年女性のARB処方時は妊娠希望・可能性の確認がプロ</span>
        </div>
      </div>

      <!-- 授乳婦の服薬指導とRID -->
      <div class="dict-card" data-category="special">
        <div class="dict-card-header">
          <span class="dict-tag">授乳・服薬指導</span>
          <span class="dict-badge">脱・安易な断乳</span>
        </div>
        <h3 class="dict-card-title">授乳婦の服薬指導とRID（乳児相対摂取量 10%未満基準）</h3>
        <p class="dict-card-desc">
          <strong>【添付文書のウラ読み】</strong>添付文書の「授乳を避けさせること」は製薬企業の防衛的記載が多く、国際基準（成育医療研究センター・LactMed）では大半が授乳継続可能。<br>
          <strong>【RID（Relative Infant Dose）】</strong>母親の体重あたり投与量に対する乳児摂取割合。<strong>RID < 10% であれば原則授乳継続可能</strong>（カロナールやロキソニンは1%未満）。<br>
          <strong>【服薬タイミング】</strong><strong>「授乳直後に服用」</strong>すれば、次回授乳時には血中濃度ピークを過ぎて母乳移行を最小限にできる。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">原則：安易な断乳指導は乳腺炎・母子不安を招くため回避</span>
        </div>
      </div>

      <!-- コデイン類の授乳期禁忌 -->
      <div class="dict-card" data-category="special">
        <div class="dict-card-header">
          <span class="dict-tag">授乳・警告事故</span>
          <span class="dict-badge">呼吸停止死亡例</span>
        </div>
        <h3 class="dict-card-title">コデイン・トラマドールの授乳期禁忌（CYP2D6代謝と乳児モルヒネ中毒）</h3>
        <p class="dict-card-desc">
          <strong>【重大事故背景】</strong>母親がCYP2D6の遺伝子重複による「超代謝能（Ultra-rapid Metabolizer：UM）」であった場合、内服したコデインが肝臓で急速かつ大量にモルヒネへと代謝され、高濃度のモルヒネが母乳中に移行。<br>
          <strong>【転帰】</strong>母乳を飲んだ乳児がモルヒネ中毒に陥り、<strong>傾眠から呼吸停止に至り死亡した事例</strong>が報告された（FDA警告）。<br>
          <strong>【対策】</strong>コデイン類、ジヒドロコデイン配合総合感冒薬、トラマドールは授乳中の服用が禁忌・回避指定。咳止めにはデキストロメトルファン（メジコン）を選択。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">鑑査：授乳中の母親への市販風邪薬・咳止め処方に最大警戒</span>
        </div>
      </div>
`;

// Insert into 14_dictionary.html
const pLastDictDiv = dictHtml.lastIndexOf('</div>\n  </div>\n</div>');
if (pLastDictDiv !== -1) {
  dictHtml = dictHtml.substring(0, pLastDictDiv) + pregDictCards + '\n    ' + dictHtml.substring(pLastDictDiv);
  fs.writeFileSync(dictPath, dictHtml, 'utf8');
  console.log("Successfully inserted Pregnancy & Lactation cards into 14_dictionary.html!");
} else {
  const pEndDiv = dictHtml.lastIndexOf('</div>');
  const pSecondLast = dictHtml.lastIndexOf('</div>', pEndDiv - 1);
  dictHtml = dictHtml.substring(0, pSecondLast) + pregDictCards + '\n    ' + dictHtml.substring(pSecondLast);
  fs.writeFileSync(dictPath, dictHtml, 'utf8');
  console.log("Inserted Pregnancy cards using alternative target in 14_dictionary.html!");
}


// ============================================================================
// 4. Update src/09_app.js (Add Pregnancy/Lactation Drugs to DRUG_DB)
// ============================================================================
const appPath = path.join(__dirname, '..', '09_app.js');
let appJs = fs.readFileSync(appPath, 'utf8');

const newPregDrugs = `
  // 妊娠・授乳期マスター（Special 06 追加）
  { name: "アルドメット", gen: "メチルドパ水和物", cat: "妊娠・高血圧（第一選択）", char: "妊娠高血圧症候群の世界的ゴールドスタンダード！胎児奇形・発育不全リスクなし", desc: "中枢性α2刺激薬。長年の疫学データが豊富で妊娠全期間で安全に使用可能。妊娠判明した高血圧女性の切り替え第一選択。起立性低血圧や眠気、肝機能に注意。", gId: "tab-special", cSec: "sec-pregnancy" },
  { name: "トランデート", gen: "ラベタロール塩酸塩", cat: "妊娠・高血圧（第一選択）", char: "妊娠高血圧症候群の第一選択！血管抵抗を下げ子宮胎盤血流を維持するαβ遮断薬", desc: "α1およびβ受容体を遮断。胎児への安全性が確立されており、メチルドパと並ぶ妊娠高血圧の二大標準薬。喘息患者には気管支攣縮リスクのため禁忌。", gId: "tab-special", cSec: "sec-pregnancy" },
  { name: "小半夏加茯苓湯", gen: "ショウハンゲカブクリョウトウ（ツムラ11番）", cat: "妊娠・つわり（漢方第一選択）", char: "つわり（妊娠悪阻）の神処方！生姜・半夏・茯苓が胃逆流と水分代謝を改善", desc: "妊娠初期の激しい吐き気・つわりに第一選択。生姜と半夏が中枢性制吐・胃運動正常化、茯苓が水毒を排泄。ビタミンB6併用で劇的に改善。冷水でゆっくり服用。", gId: "tab-special", cSec: "sec-pregnancy" },
`;

const insertMarker = 'cSec: "sec-home" },';
if (appJs.includes(insertMarker)) {
  const pos = appJs.indexOf(insertMarker) + insertMarker.length;
  appJs = appJs.substring(0, pos) + '\n' + newPregDrugs + appJs.substring(pos);
  fs.writeFileSync(appPath, appJs, 'utf8');
  console.log("Successfully inserted Pregnancy drugs into 09_app.js!");
}

console.log("=== Pregnancy & Lactation Integration Complete! ===");
