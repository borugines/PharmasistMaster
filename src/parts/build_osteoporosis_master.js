const fs = require('fs');
const path = require('path');

console.log('=== Building Comprehensive Osteoporosis (骨粗鬆症・プラリア) Master ===');

// ==========================================
// 1. Update src/05_comparison.html
// ==========================================
const pComp = path.join(__dirname, '..', '05_comparison.html');
let compHtml = fs.readFileSync(pComp, 'utf8');

// Update sec-title in sec-ckd
const oldTitle = '<h2 class="sec-title">⑦ 腎・泌尿器・代謝・消化器：「スタチン」「尿酸薬」「泌尿器薬」「胃酸分泌抑制薬」の比較</h2>';
const newTitle = '<h2 class="sec-title">⑦ 骨・腎・脂質・痛風・消化器：「骨粗鬆症治療薬（プラリア/BP/イベニティ/PTH/SERM）」「スタチン」「尿酸薬」「胃酸分泌抑制薬」の比較</h2>';

if (compHtml.includes(oldTitle)) {
  compHtml = compHtml.replace(oldTitle, newTitle);
}

const osteoTablesHtml = `
    <div class="sub-banner banner-class">
      <span>🦴 【骨粗鬆症治療薬の徹底比較】「骨吸収抑制」vs「骨形成促進」vs「基盤薬」の使い分け</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:14%;">作用機序・大分類</th>
          <th style="width:20%;">薬剤名（一般名）</th>
          <th style="width:16%;">投与間隔・ルート</th>
          <th style="width:18%;">骨折抑制エビデンス<br>（椎体 / 非椎体 / 大腿骨）</th>
          <th style="width:32%;">臨床急所・鑑査地雷・服薬指導の鉄則</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowspan="3"><strong>骨吸収抑制薬</strong><br>【破骨細胞を止める】</td>
          <td><strong>プラリア皮下注</strong><br>（デノスマブ）</td>
          <td><strong>6ヶ月に1回</strong><br>皮下注射</td>
          <td><strong>椎体 ◎ / 非椎体 ◎ / 大腿骨 ◎</strong><br>（BPを上回る骨密度上昇）</td>
          <td>
            ・<span class="char" style="color:#b91c1c; font-weight:bold;">【ドタキャン骨折（リバウンド多発骨折）厳禁！】</span> 6ヶ月を過ぎて放置・中断すると破骨細胞が反跳暴走し背骨が次々折れる（オーバーシュート）。中止時は必ずBP製剤でリレー！<br>
            ・<strong>デノタスチュアブル（Ca+VitD）毎日併用必須：</strong>骨へのCa取り込みが強烈で低Ca血症（テタニー）を起こすため毎日補給。<br>
            ・腎不全でも投与可能（BP使えない高度腎障害にも第一選択）。
          </td>
        </tr>
        <tr>
          <td><strong>ビスホスホネート（BP）</strong><br>・ボナロン/フォサマック（アレンドロン酸）<br>・ベネット/アクトネル（リセドロン酸）<br>・ボンビバ（イバンドロン酸）<br>・リクラスト（ゾレドロン酸注）</td>
          <td>・連日 / 週1回<br>・月1回経口<br>・月1回静注（ボンビバ）<br>・<strong>年1回点滴（リクラスト）</strong></td>
          <td><strong>椎体 ◎ / 非椎体 ◎ / 大腿骨 ◎</strong><br>（骨粗鬆症の世界的標準薬）</td>
          <td>
            ・<strong>起床時服用の「絶対儀式」：</strong>コップ1杯（180mL以上）の水で服用、<strong>服用後30分は絶食・横にならない</strong>（食道潰瘍予防＆吸収率低下防止）。水以外（お茶・牛乳・Ca水）不可！<br>
            ・<strong>顎骨壊死（MRONJ）：</strong>抜歯等侵襲的処置時の歯科連携・口腔ケア。<br>
            ・<strong>非定型大腿骨骨折（AFF）：</strong>3〜5年以上連用時の大腿部・鼠径部痛。eGFR35未満は禁忌/慎重。
          </td>
        </tr>
        <tr>
          <td><strong>SERM（選択的受容体）</strong><br>・ビビアント（バゼドキシフェン）<br>・エビスタ（ラロキシフェン）</td>
          <td>1日1回 経口</td>
          <td>椎体 ◎ / 非椎体 △ / 大腿骨 −<br>（椎体骨折の予防に特化）</td>
          <td>
            ・<strong>閉経後早期（60代）の第一選択：</strong>女性ホルモン様作用で骨を守るが乳腺・子宮は刺激しない。<br>
            ・<span class="char" style="color:#b91c1c; font-weight:bold;">深部静脈血栓症（VTE）禁忌！</span> 長時間の飛行機移動、長期臥床、骨折後の安静時は休薬を検討。<br>
            ・更年期様症状（ほてり・のぼせ・下肢痙攣）の訴えに注意。
          </td>
        </tr>
        <tr>
          <td rowspan="3"><strong>骨形成促進薬</strong><br>【骨芽細胞を刺激し骨を新しく造る】</td>
          <td><strong>イベニティ皮下注</strong><br>（ロモソズマブ）<br><span style="color:#0284c7; font-weight:bold;">★デュアルアクション</span></td>
          <td><strong>月1回 2本</strong> 皮下注射<br><strong>（生涯12ヶ月限定）</strong></td>
          <td><strong>椎体 ◎◎ / 非椎体 ◎ / 大腿骨 ◎◎</strong><br>（1年で骨密度が爆増）</td>
          <td>
            ・<strong>「骨形成促進 ＋ 骨吸収抑制」の二刀流：</strong>抗スクレロスチン抗体。重症・既存骨折ありのファーストライン。<br>
            ・<span class="char" style="color:#b91c1c; font-weight:bold;">心血管イベント禁忌：</span>過去1年以内の虚血性心疾患・脳卒中歴は禁忌！<br>
            ・12ヶ月完了後は骨密度低下を防ぐため、<strong>直ちにプラリアまたはBPへ移行必須（シーケンシャルセラピー）</strong>。
          </td>
        </tr>
        <tr>
          <td><strong>テリパラチド製剤</strong><br>・フォルテオ（1日1回皮下注）<br>・テリボン（週1回皮下注 / 週2回オートインジェクター）</td>
          <td>・1日1回 自己注射<br>・週1回 院内/自己注<br><strong>（生涯24ヶ月限定）</strong></td>
          <td><strong>椎体 ◎◎ / 非椎体 ◎ / 大腿骨 △</strong><br>（重症椎体骨折の切り札）</td>
          <td>
            ・副甲状腺ホルモン（PTH）間歇投与で骨梁を再構築。<br>
            ・<strong>投与初期の立ちくらみ・めまい・嘔気：</strong>投与後30分は安静。一過性の血圧低下・高Ca血症に注意。<br>
            ・生涯で通算24ヶ月まで（骨肉腫リスク懸念）。終了後はBP/プラリアへリレー。
          </td>
        </tr>
        <tr>
          <td><strong>オスタバロ皮下注</strong><br>（アバロパラチド酢酸塩）<br><span style="color:#0284c7; font-weight:bold;">★新規PTH1作動薬</span></td>
          <td><strong>1日1回</strong> 自己注射<br><strong>（生涯18ヶ月限定）</strong></td>
          <td><strong>椎体 ◎◎ / 非椎体 ◎ / 大腿骨 ◎</strong><br>（骨吸収を抑え骨形成特化）</td>
          <td>
            ・PTH1受容体RG型配座を選択的刺激。骨吸収を伴わずに強力な骨形成を誘導。<br>
            ・投与期間は通算18ヶ月まで。投与初期の起立性低血圧・動悸・浮動性めまいに注意。<br>
            ・冷蔵保存。終了後はプラリアまたはBPへバトンタッチ。
          </td>
        </tr>
        <tr>
          <td rowspan="2"><strong>骨代謝基盤薬</strong><br>【骨の質・材料を整える】</td>
          <td><strong>活性型ビタミンD3</strong><br>・エディロール（エルデカルシトール）<br>・ワンアルファ（アルファカルシドール）</td>
          <td>1日1回 経口</td>
          <td>椎体 ◯ / 非椎体 ◯ / 大腿骨 −<br>（転倒予防・筋力維持効果も）</td>
          <td>
            ・小腸からのCa吸収を促進し、骨代謝回転を適正化。<br>
            ・<span class="char" style="color:#b91c1c; font-weight:bold;">夏場の脱水時「高カルシウム血症」に厳戒態勢！</span> 高齢者が夏に脱水になると血清Caが跳ね上がり意識障害・急性腎不全・悪心便秘を引き起こす。定期的なCa・Cre採血が鉄則。
          </td>
        </tr>
        <tr>
          <td><strong>ビタミンK2 / Ca製剤</strong><br>・グラケー（メナテトレノン）<br>・デノタスチュアブル</td>
          <td>・食後経口（グラケー）<br>・1日1回 咀嚼（デノタス）</td>
          <td>骨質改善・低Ca予防</td>
          <td>
            ・<strong>グラケー：</strong>オステオカルシンを活性化。<strong>ワーファリン服用中は絶対併用禁忌！</strong>（ビタミンKがワーファリンの抗凝固作用を消失させる）。脂溶性のため食後服用。<br>
            ・<strong>デノタス：</strong>プラリア投与時の低Ca血症防止。ポリファーマシー時でも自己中断させない指導。
          </td>
        </tr>
      </tbody>
    </table>

    <div class="sub-banner banner-seq" style="margin-top:20px; background:linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%); border-left:4px solid #d97706; padding:8px 14px; font-weight:700; color:#92400e;">
      <span>🔄 【骨粗鬆症シーケンシャルセラピー（治療順序戦略）＆ 2大重大副作用（MRONJ・AFF）予防プロトコル】</span>
    </div>
    <div style="background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:14px; margin-bottom:20px; line-height:1.6; font-size:0.88rem;">
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:14px;">
        <div style="background:#f8fafc; padding:12px; border-radius:6px; border:1px solid #cbd5e1;">
          <h4 style="margin:0 0 6px 0; color:#0f172a; font-size:0.92rem;">🎯 ① シーケンシャルセラピー（骨形成促進 ➔ 骨吸収抑制）</h4>
          <p style="margin:0; color:#334155;">
            重症・多発骨折例では<strong>「まず骨を作る薬（イベニティ1年 / テリパラチド2年 / オスタバロ1.5年）で一気に骨密度と骨梁を爆上げし、期間終了後に直ちにプラリアまたはBP製剤で骨量を固定・維持する」</strong>のがガイドライン最強の勝ちパターン！放置すると獲得した骨量が急激に失われる。
          </p>
        </div>
        <div style="background:#fef2f2; padding:12px; border-radius:6px; border:1px solid #fecaca;">
          <h4 style="margin:0 0 6px 0; color:#991b1b; font-size:0.92rem;">🚨 ② プラリアの「ドタキャン骨折（オーバーシュート）」対策</h4>
          <p style="margin:0; color:#7f1d1d;">
            プラリアは骨に沈着しない可逆的抗体のため、<strong>6ヶ月を過ぎて投与が遅れると破骨細胞が反跳性に激増し、数ヶ月以内に「多発性椎体骨折」を起こす</strong>。患者へ次回来院日の厳守を指導し、どうしても中止する場合は<strong>必ずビスホスホネート（経口BPまたはリクラスト点滴）へリレー（ブリッジング）</strong>する！
          </p>
        </div>
        <div style="background:#eff6ff; padding:12px; border-radius:6px; border:1px solid #bfdbfe;">
          <h4 style="margin:0 0 6px 0; color:#1e40af; font-size:0.92rem;">🦷 ③ 顎骨壊死（MRONJ / ARONJ）予防の歯科連携</h4>
          <p style="margin:0; color:#1e3a8a;">
            BP製剤やプラリア投与中の抜歯・インプラント等で発症。最新ポジションペーパーでは<strong>「原則として不要な休薬は行わず、投与開始前に口腔内清掃・抜歯を済ませる」「投与中も口腔衛生（ブラッシング・定期検診）を徹底する」</strong>ことが最重要とされる。休薬する場合は骨折リスクとの綿密な比較考量が必要。
          </p>
        </div>
        <div style="background:#fefce8; padding:12px; border-radius:6px; border:1px solid #fef08a;">
          <h4 style="margin:0 0 6px 0; color:#854d0e; font-size:0.92rem;">⚠️ ④ 非定型大腿骨骨折（AFF）とBPホリデー（休薬期間）</h4>
          <p style="margin:0; color:#713f12;">
            BP製剤を3〜5年以上漫然と連用すると骨代謝回転が極度に低下し、軽微な外力で大腿骨骨幹部がボキッと折れる（AFF）。患者が<strong>「最近太ももや足の付け根（鼠径部）が重だるい、痛む」</strong>と訴えたら即座に整形外科受診勧奨。骨折低リスク群では3〜5年でのBPホリデー（一時休薬）が検討される。
          </p>
        </div>
      </div>
    </div>
`;

// Insert osteoTablesHtml before ⚡ 【頻出4領域の同効薬ガチンコ比較】
const markerSubBanner = '<div class="sub-banner banner-within">\n      <span>⚡ 【頻出4領域の同効薬ガチンコ比較】違いを一言で言えるようにしよう！</span>';
if (!compHtml.includes('🦴 【骨粗鬆症治療薬の徹底比較】')) {
  if (compHtml.includes(markerSubBanner)) {
    compHtml = compHtml.replace(markerSubBanner, osteoTablesHtml + markerSubBanner);
    fs.writeFileSync(pComp, compHtml, 'utf8');
    console.log('Successfully inserted Osteoporosis tables into 05_comparison.html!');
  } else {
    console.error('Could not find marker in 05_comparison.html');
  }
} else {
  console.log('Osteoporosis already exists in 05_comparison.html');
}

// ==========================================
// 2. Update src/10_new_drugs.html
// ==========================================
const pNewDrugs = path.join(__dirname, '..', '10_new_drugs.html');
let newDrugsHtml = fs.readFileSync(pNewDrugs, 'utf8');

const osteoNewDrugsRows = `        <tr>
          <td>
            <span class="drug-name">プラリア皮下注</span>
            <span class="gen-name">（デノスマブ）</span>
            <span class="tag-mech">ヒト型抗RANKLモノクローナル抗体（骨吸収抑制）</span>
          </td>
          <td>
            <span class="tag-new">6ヶ月に1回の注射でビスホスホネートを超える強力な骨量増加</span><br>
            破骨細胞の形成・活性化・生存に必須のシグナル「RANKL」を完全に中和。<strong>骨代謝回転を強力に抑え、腰椎・大腿骨近位部の骨密度をグングン引き上げる</strong>。腎臓から排泄されないため、高度腎機能障害（CKDステージ4〜5）でも投与可能！
          </td>
          <td>
            ・<strong>投与間隔：</strong>6ヶ月に1回皮下注射。<br>
            <div class="pitfall-box">🚨 <strong>ドタキャン骨折（オーバーシュート）：</strong>投与が遅延・中断すると破骨細胞が反跳性に大暴走し「多発椎体骨折」を起こす！次回来院日の厳守を指導し、中止時は必ず経口BPまたはリクラスト点滴へリレー。</div>
            <div class="pitfall-box" style="margin-top:4px;">⚠️ <strong>低カルシウム血症：</strong>骨へのCa取り込みが急激なため、<strong>デノタスチュアブル配合錠（Ca+VitD）の毎日服用が必須</strong>！</div>
          </td>
        </tr>
        <tr>
          <td>
            <span class="drug-name">イベニティ皮下注</span>
            <span class="gen-name">（ロモソズマブ）</span>
            <span class="tag-mech">ヒト化抗スクレロスチン抗体（骨形成促進＋骨吸収抑制）</span>
          </td>
          <td>
            <span class="tag-new">「骨を作る」と「骨破壊を止める」を同時に行う唯一無二の二刀流</span><br>
            骨細胞から分泌され骨形成にブレーキをかける「スクレロスチン」を阻害。<strong>骨芽細胞の骨形成を爆発的にアクセルオンしながら、同時に破骨細胞の骨吸収をブレーキオンする</strong>。既存骨折のある重症骨粗鬆症の骨密度を1年で劇的に回復！
          </td>
          <td>
            ・<strong>用法：</strong>1回2本（計210mg）を月1回、腹部または大腿部に皮下注。<strong>投与期間は生涯で12ヶ月間のみ</strong>。<br>
            <div class="pitfall-box">🚨 <strong>心血管イベント禁忌：</strong><strong>過去1年以内の虚血性心疾患（心筋梗塞・狭心症）や脳血管障害歴のある患者は禁忌</strong>！</div>
            <div class="pitfall-box" style="margin-top:4px;">🔄 <strong>12ヶ月終了後のリレー：</strong>投与終了後に放置すると骨量が急激に低下するため、<strong>直ちにプラリアまたはビスホスホネートへ移行</strong>する。</div>
          </td>
        </tr>
        <tr>
          <td>
            <span class="drug-name">オスタバロ皮下注</span>
            <span class="gen-name">（アバロパラチド酢酸塩）</span>
            <span class="tag-mech">ヒト副甲状腺ホルモン関連タンパク質（PTHrP）誘導体</span>
          </td>
          <td>
            <span class="tag-new">骨吸収を刺激せず「骨形成だけを選択的に促す」新世代PTH製剤</span><br>
            従来のテリパラチドが骨吸収も同時に刺激しやすかったのに対し、PTH1受容体のRG立体配座へ選択的に結合することで、<strong>骨吸収を抑えつつ骨芽細胞の骨形成をよりピュアに促進</strong>。新規椎体骨折および非椎体骨折を有意に減少！
          </td>
          <td>
            ・<strong>用法：</strong>1日1回 80μgを腹部に自己皮下注射。<strong>通算投与期間は18ヶ月まで</strong>。<br>
            ・<strong>保存：</strong>使用開始前は冷蔵（2〜8℃）、使用開始後は30日以内であれば室温（25℃以下）保存可能。<br>
            <div class="pitfall-box">⚠️ <strong>起立性低血圧・動悸：</strong>初回投与後などに立ちくらみ・めまいが起こるため、投与後しばらくは安静にさせる。</div>
          </td>
        </tr>
`;

if (!newDrugsHtml.includes('プラリア皮下注')) {
  // Insert before ボルズィ錠 or クービビック錠
  const targetNewDrug = '        <tr>\n          <td>\n            <span class="drug-name">ボルズィ錠</span>';
  if (newDrugsHtml.includes(targetNewDrug)) {
    newDrugsHtml = newDrugsHtml.replace(targetNewDrug, osteoNewDrugsRows + targetNewDrug);
    fs.writeFileSync(pNewDrugs, newDrugsHtml, 'utf8');
    console.log('Successfully inserted Osteoporosis drugs into 10_new_drugs.html!');
  } else {
    // try before クービビック
    const altTarget = '        <tr>\n          <td>\n            <span class="drug-name">クービビック錠</span>';
    if (newDrugsHtml.includes(altTarget)) {
      newDrugsHtml = newDrugsHtml.replace(altTarget, osteoNewDrugsRows + altTarget);
      fs.writeFileSync(pNewDrugs, newDrugsHtml, 'utf8');
      console.log('Successfully inserted Osteoporosis drugs into 10_new_drugs.html before クービビック!');
    } else {
      console.error('Could not find insertion position in 10_new_drugs.html');
    }
  }
} else {
  console.log('Osteoporosis drugs already exist in 10_new_drugs.html');
}

// ==========================================
// 3. Update src/14_dictionary.html
// ==========================================
const pDict = path.join(__dirname, '..', '14_dictionary.html');
let dictHtml = fs.readFileSync(pDict, 'utf8');

const osteoDictCards = `    <div class="dict-card" data-type="drug" data-kana="ふ" data-name="プラリア皮下注" data-desc="骨粗鬆症治療薬。ヒト型抗rankl抗体。6ヶ月に1回皮下注。bp製剤を上回る強力な骨密度上昇。休薬・中断時の多発椎体骨折（ドタキャン骨折/オーバーシュート）厳禁。デノタスチュアブル毎日併用。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">プラリア皮下注 60mgシリンジ</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">デノスマブ（遺伝子組換え） / ヒト型抗RANKL抗体</div>
        <div class="dict-card-desc">6ヶ月に1回皮下注。破骨細胞の形成・生存を完全停止し強力に骨密度を上昇。自己中断すると反動で多発性椎体骨折（オーバーシュート）を起こすため厳禁！中止時はBP製剤へリレー。低Ca血症防止のためデノタス毎日併用。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-ckd')">⚔️ 骨粗鬆症比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c10')">📘 疾患ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('プラリア')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="て" data-name="デノタスチュアブル配合錠" data-desc="プラリア投与時の低カルシウム血症発症抑制薬。沈降炭酸カルシウム＋コレカルシフェロール（ビタミンd3）＋炭酸マグネシウム配合。毎日確実に噛み砕いて服用。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">デノタスチュアブル配合錠</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">沈降炭酸Ca・VitD3・炭酸Mg / プラリア併用Ca補給剤</div>
        <div class="dict-card-desc">プラリア投与による急激な骨吸収停止・低カルシウム血症（痙攣・テタニー）を防ぐため毎日1回2錠を噛み砕いて服用。「カルシウムのサプリだから」と自己中断しないよう厳重指導。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-ckd')">⚔️ 骨粗鬆症比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c10')">📘 疾患ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('デノタス')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="い" data-name="イベニティ皮下注" data-desc="骨粗鬆症治療薬。抗スクレロスチン抗体。骨形成促進と骨吸収抑制のデュアルアクション。月1回2本皮下注（生涯12ヶ月限定）。過去1年以内の虚血性心疾患・脳血管障害禁忌。終了後は直ちにプラリア/bpへ移行。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">イベニティ皮下注 105mgシリンジ</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">ロモソズマブ（遺伝子組換え） / ヒト化抗スクレロスチン抗体</div>
        <div class="dict-card-desc">骨形成を促進し骨吸収を抑制する二刀流。12ヶ月限定で骨密度を爆増。過去1年以内の心筋梗塞・脳卒中歴は禁忌。終了後は骨量維持のため直ちにプラリアまたはBP製剤へリレー必須。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-newdrugs', 't-meta')">🚀 新薬トレンド</button><button class="dict-jump-btn" onclick="jumpToGuide('c10')">📘 疾患ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('イベニティ')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="お" data-name="オスタバロ皮下注" data-desc="骨粗鬆症治療薬。新規pth1受容体作動薬（pthrpt誘導体）。骨吸収を抑え骨形成を選択的に促進。1日1回自己皮下注（生涯18ヶ月限定）。起立性低血圧に注意。終了後bp/プラリアへリレー。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">オスタバロ皮下注 1.5mgカートリッジ</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">アバロパラチド酢酸塩 / 選択的PTH1受容体作動薬</div>
        <div class="dict-card-desc">骨吸収を刺激せず骨形成を選択的かつ強力に促す新世代PTH製剤。1日1回自己注射（通算18ヶ月上限）。初期の立ちくらみ・めまいに注意。終了後は骨吸収抑制薬へバトンタッチ。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-newdrugs', 't-meta')">🚀 新薬トレンド</button><button class="dict-jump-btn" onclick="jumpToGuide('c10')">📘 疾患ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('オスタバロ')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="ほ" data-name="ボナロン錠 / フォサマック錠 / ベネット錠 / ボンビバ錠" data-desc="ビスホスホネート系骨粗鬆症治療薬。破骨細胞にアポトーシスを誘導し骨吸収を抑制。起床時コップ1杯の水で服用、30分横にならず絶食（食道潰瘍・吸収低下防止）。顎骨壊死（mronj）予防に口腔ケア。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ボナロン / フォサマック / ベネット / ボンビバ</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">アレンドロン酸 / リセドロン酸 / イバンドロン酸（BP製剤）</div>
        <div class="dict-card-desc">骨粗鬆症の標準治療薬。起床時コップ1杯の水で内服し30分絶食・横にならない（食道潰瘍予防）。長期連用（3〜5年）での非定型大腿骨骨折（AFF）や抜歯時顎骨壊死（MRONJ）に注意。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-ckd')">⚔️ 骨粗鬆症比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c10')">📘 疾患ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('ボナロン')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="え" data-name="エディロールカプセル" data-desc="活性型ビタミンd3骨粗鬆症治療薬。小腸カルシウム吸収促進・骨代謝回転正常化・筋力改善。夏場の脱水時「高カルシウム血症（意識障害・急性腎不全）」に厳戒態勢。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">エディロールカプセル 0.5μg / 0.75μg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">エルデカルシトール / 活性型ビタミンD3誘導体</div>
        <div class="dict-card-desc">腸管Ca吸収促進と骨代謝改善。骨粗鬆症処方の基盤薬。高齢者が夏場に脱水になると血清Caが急上昇し意識障害や急性腎不全を起こすため、口渇・便秘・倦怠感のモニタリング必須。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-ckd')">⚔️ 骨粗鬆症比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c10')">📘 疾患ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('エディロール')">📋 詳細</button>
      </div>
    </div>
  
`;

if (!dictHtml.includes('プラリア皮下注 60mgシリンジ')) {
  // Insert before ボルズィ錠 or other card
  const targetDictCard = '<div class="dict-card" data-type="drug" data-kana="ほ" data-name="ボルズィ錠"';
  if (dictHtml.includes(targetDictCard)) {
    dictHtml = dictHtml.replace(targetDictCard, osteoDictCards + targetDictCard);
    fs.writeFileSync(pDict, dictHtml, 'utf8');
    console.log('Successfully inserted Osteoporosis cards into 14_dictionary.html!');
  } else {
    // try before end of dictionary
    const endMarker = '  </div>\n</div>';
    const lastIdx = dictHtml.lastIndexOf(endMarker);
    if (lastIdx !== -1) {
      dictHtml = dictHtml.slice(0, lastIdx) + osteoDictCards + dictHtml.slice(lastIdx);
      fs.writeFileSync(pDict, dictHtml, 'utf8');
      console.log('Successfully inserted Osteoporosis cards into 14_dictionary.html at end!');
    }
  }
} else {
  console.log('Osteoporosis cards already exist in 14_dictionary.html');
}

// ==========================================
// 4. Update src/09_app.js (DRUG_DB)
// ==========================================
const pApp = path.join(__dirname, '..', '09_app.js');
let appJs = fs.readFileSync(pApp, 'utf8');

const osteoDrugDb = `  { name: "プラリア", gen: "デノスマブ", cat: "10. 骨粗鬆症 / 代謝", char: "6ヶ月に1回の皮下注！BPを超える骨量増加をもたらすがドタキャン骨折（オーバーシュート）厳禁！", desc: "破骨細胞のRANKLを強力阻害。中断すると反跳性多発椎体骨折を起こすため次回来院日厳守。低Ca血症防止のためデノタスチュアブル毎日服用必須。腎不全でも投与可能。", gId: "c10", cSec: "sec-ckd" },
  { name: "デノタスチュアブル", gen: "沈降炭酸Ca・コレカルシフェロール・炭酸Mg", cat: "10. 骨粗鬆症 / 補助", char: "プラリア皮下注時の必須相棒！低カルシウム血症（テタニー・痙攣）を毎日2錠で防ぐ", desc: "プラリアによる急激な血清Ca低下を防ぐため毎日確実に噛み砕いて服用。サプリ感覚で自己中断させない指導が重要。", gId: "c10", cSec: "sec-ckd" },
  { name: "イベニティ", gen: "ロモソズマブ", cat: "新薬 / 骨粗鬆症", char: "骨形成促進＋骨吸収抑制のデュアルアクション！月1回2本皮下注（12ヶ月限定）", desc: "抗スクレロスチン抗体。過去1年以内の心筋梗塞・脳卒中歴は禁忌！12ヶ月終了後は骨量維持のため必ずプラリアまたはBPへ移行（シーケンシャルセラピー）。", gId: "tab-newdrugs", cSec: "sec-ckd" },
  { name: "オスタバロ", gen: "アバロパラチド酢酸塩", cat: "新薬 / 骨粗鬆症", char: "骨吸収を刺激せず骨形成を選択的促進！新規PTH1受容体作動薬（1日1回・18ヶ月上限）", desc: "高骨折リスク骨粗鬆症の切り札。初期の起立性低血圧・めまいに注意。通算18ヶ月まで。終了後はプラリアまたはBPへバトンタッチ。", gId: "tab-newdrugs", cSec: "sec-ckd" },
  { name: "ボナロン / フォサマック / ベネット / ボンビバ / リクラスト", gen: "アレンドロン酸 / リセドロン酸 / イバンドロン酸 / ゾレドロン酸", cat: "10. 骨粗鬆症（BP製剤）", char: "骨粗鬆症の標準治療薬！起床時コップ1杯の水・30分横にならず絶食の儀式厳守", desc: "食道潰瘍予防と吸収率確保のため起床時水180mL以上で服用。抜歯時の顎骨壊死（MRONJ）予防に口腔ケア。3〜5年連用での非定型大腿骨骨折（AFF）に注意（大腿部痛）。", gId: "c10", cSec: "sec-ckd" },
  { name: "エディロール", gen: "エルデカルシトール", cat: "10. 骨粗鬆症（VitD3）", char: "骨粗鬆症処方の基盤薬！夏場の脱水に伴う「高カルシウム血症（意識障害・急性腎不全）」に厳戒態勢！", desc: "小腸からのCa吸収促進＋骨代謝回転正常化。高齢者が夏に脱水になると血清Caが異常急上昇するため口渇・便秘・倦怠感・意識混濁に注意。定期採血。", gId: "c10", cSec: "sec-ckd" },
  { name: "ビビアント / エビスタ", gen: "バゼドキシフェン / ラロキシフェン", cat: "10. 骨粗鬆症（SERM）", char: "閉経後早期の椎体骨折を予防する選択的エストロゲン調節薬（深部静脈血栓症VTE禁忌！）", desc: "骨のエストロゲン受容体にアゴニスト、乳腺・子宮にアンタゴニストとして作用。静脈血栓塞栓症（肺塞栓・深部静脈血栓）の既往は禁忌。長期臥床時休薬。", gId: "c10", cSec: "sec-ckd" },
`;

if (!appJs.includes('"プラリア"')) {
  const targetAppMarker = '  { name: "ボルズィ",';
  if (appJs.includes(targetAppMarker)) {
    appJs = appJs.replace(targetAppMarker, osteoDrugDb + targetAppMarker);
    fs.writeFileSync(pApp, appJs, 'utf8');
    console.log('Successfully inserted Osteoporosis drugs into 09_app.js!');
  } else {
    // try before クービビック
    const altTargetApp = '  { name: "クービビック",';
    if (appJs.includes(altTargetApp)) {
      appJs = appJs.replace(altTargetApp, osteoDrugDb + altTargetApp);
      fs.writeFileSync(pApp, appJs, 'utf8');
      console.log('Successfully inserted Osteoporosis drugs into 09_app.js before クービビック!');
    }
  }
} else {
  console.log('Osteoporosis drugs already exist in 09_app.js');
}

console.log('=== Osteoporosis Master Build Complete! ===');
