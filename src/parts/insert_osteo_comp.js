const fs = require('fs');
const path = require('path');

const pComp = path.join(__dirname, '..', '05_comparison.html');
let compHtml = fs.readFileSync(pComp, 'utf8');

// Update sec-title in sec-ckd
const oldTitle = '⑦ 腎・泌尿器・代謝・消化器：「スタチン」「尿酸薬」「泌尿器薬」「胃酸分泌抑制薬」の比較';
const newTitle = '⑦ 骨・腎・脂質・痛風・消化器：「骨粗鬆症治療薬（プラリア/BP/イベニティ/PTH/SERM）」「スタチン」「尿酸薬」「胃酸分泌抑制薬」の比較';

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

const targetRegex = /<div class="sub-banner banner-within">\s*<span>⚡ 【頻出4領域の同効薬ガチンコ比較】違いを一言で言えるようにしよう！<\/span>/;

if (!compHtml.includes('🦴 【骨粗鬆症治療薬の徹底比較】')) {
  if (targetRegex.test(compHtml)) {
    compHtml = compHtml.replace(targetRegex, osteoTablesHtml + '\r\n    <div class="sub-banner banner-within">\r\n      <span>⚡ 【頻出4領域の同効薬ガチンコ比較】違いを一言で言えるようにしよう！</span>');
    fs.writeFileSync(pComp, compHtml, 'utf8');
    console.log('Successfully inserted Osteoporosis tables into 05_comparison.html!');
  } else {
    console.error('Regex target not found in 05_comparison.html');
  }
} else {
  console.log('Already exists');
}
