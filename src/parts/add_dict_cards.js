const fs = require('fs');

let dictHtml = fs.readFileSync('src/14_dictionary.html', 'utf8');

const newCards = `
      <!-- ゾフルーザ -->
      <div class="dict-card" data-type="drug" data-kana="そ" data-name="ゾフルーザ バロキサビル マルボキシル 抗ウイルス薬 インフルエンザ" data-desc="インフルエンザ治療薬 1回単回経口投与 キャップ依存性エンドヌクレアーゼ阻害薬 多価金属キレート注意">
        <div class="dict-card-top">
          <span class="dict-badge badge-drug">💊 薬品名</span>
          <span class="dict-kana-tag">そ行 / 抗インフルエンザ薬</span>
        </div>
        <div class="dict-name">ゾフルーザ（一般名：バロキサビル マルボキシル）</div>
        <div class="dict-desc">
          1回単回内服で治療完結するエンドヌクレアーゼ阻害薬。ウイルス排出停止が約24時間と最速。
          <br><strong style="color:#b45309;">⚠️ 指導急所：</strong>牛乳・Mg便秘薬・Ca・鉄剤とキレートを形成し吸収消失するため同時服用厳禁！
        </div>
        <div class="dict-actions">
          <button class="dict-jump-btn" onclick="jumpToDisease('c8')">📖 感染症ガイドへ</button>
          <button class="dict-jump-btn" onclick="quickSearch('ゾフルーザ')">🔍 薬剤詳細へ</button>
        </div>
      </div>

      <!-- ゾコーバ -->
      <div class="dict-card" data-type="drug" data-kana="そ" data-name="ゾコーバ エンシトレルビル 新型コロナウイルス COVID-19 3CLプロテアーゼ阻害薬" data-desc="COVID-19治療薬 発症72時間以内 症状改善 催奇形性禁忌 妊婦禁忌 CYP3A阻害">
        <div class="dict-card-top">
          <span class="dict-badge badge-drug">💊 薬品名</span>
          <span class="dict-kana-tag">そ行 / 抗COVID-19薬</span>
        </div>
        <div class="dict-name">ゾコーバ（一般名：エンシトレルビル フマル酸）</div>
        <div class="dict-desc">
          発症72時間以内に投与開始する国産経口抗ウイルス薬。重症化リスクのない軽症例でも5症状の回復を1日短縮。
          <br><strong style="color:#b45309;">⚠️ 禁忌：</strong><strong>妊婦・妊娠の可能性がある女性には催奇形性のため絶対禁忌！</strong>併用禁忌薬（CYP3A阻害）あり。
        </div>
        <div class="dict-actions">
          <button class="dict-jump-btn" onclick="jumpToDisease('c8')">📖 感染症ガイドへ</button>
          <button class="dict-jump-btn" onclick="quickSearch('ゾコーバ')">🔍 薬剤詳細へ</button>
        </div>
      </div>

      <!-- ネオドパストン -->
      <div class="dict-card" data-type="drug" data-kana="ね" data-name="ネオドパストン レボドパ カルビドパ L-ドパ パーキンソン病 ウェアリングオフ" data-desc="パーキンソン病治療の絶対的ゴールドスタンダード 運動症状改善 食事タンパク質競合 ジスキネジア">
        <div class="dict-card-top">
          <span class="dict-badge badge-drug">💊 薬品名</span>
          <span class="dict-kana-tag">ね行 / 抗パーキンソン病薬</span>
        </div>
        <div class="dict-name">ネオドパストン（一般名：レボドパ・カルビドパ水和物配合錠）</div>
        <div class="dict-desc">
          パーキンソン病治療の主軸。脳内でドパミンに変換され無動・固縮を劇的改善。
          <br><strong style="color:#b45309;">⚠️ 指導急所：</strong>高タンパク食直後はアミノ酸トランスポーター競合で吸収低下。ウェアリングオフ時はCOMT阻害薬やMAO-B阻害薬を併用。
        </div>
        <div class="dict-actions">
          <button class="dict-jump-btn" onclick="jumpToDisease('c6')">📖 精神神経ガイドへ</button>
          <button class="dict-jump-btn" onclick="quickSearch('ネオドパストン')">🔍 薬剤詳細へ</button>
        </div>
      </div>

      <!-- レケンビ -->
      <div class="dict-card" data-type="drug" data-kana="れ" data-name="レケンビ レカネマブ アルツハイマー病 抗アミロイドβ抗体 MCI ARIA" data-desc="アルツハイマー病の病態進行を遅延させる新時代抗体医薬 早期AD MCI アミロイドPET陽性 ARIA副作用">
        <div class="dict-card-top">
          <span class="dict-badge badge-drug">💊 薬品名</span>
          <span class="dict-kana-tag">れ行 / 抗アルツハイマー病抗体</span>
        </div>
        <div class="dict-name">レケンビ（一般名：レカネマブ 遺伝子組換え点滴静注）</div>
        <div class="dict-desc">
          アルツハイマー病によるMCIおよび軽度認知症が対象。脳内アミロイドβプロトフィブリルを除去し進行を約27%遅延。
          <br><strong style="color:#b45309;">⚠️ 重大副作用：</strong>ARIA（アミロイド関連画像異常：脳浮腫・微小出血）のため定期MRI検査が義務付け。
        </div>
        <div class="dict-actions">
          <button class="dict-jump-btn" onclick="jumpToDisease('c6')">📖 精神神経ガイドへ</button>
          <button class="dict-jump-btn" onclick="quickSearch('レケンビ')">🔍 薬剤詳細へ</button>
        </div>
      </div>

      <!-- リウマトレックス -->
      <div class="dict-card" data-type="drug" data-kana="り" data-name="リウマトレックス メトトレキサート MTX 関節リウマチ アンカードラッグ フォリアミン" data-desc="関節リウマチの世界的アンカードラッグ 週1〜2回服用 葉酸レスキュー 骨髄抑制 間質性肺炎">
        <div class="dict-card-top">
          <span class="dict-badge badge-drug">💊 薬品名</span>
          <span class="dict-kana-tag">り行 / 抗リウマチ薬（csDMARDs）</span>
        </div>
        <div class="dict-name">リウマトレックス（一般名：メトトレキサート：MTX）</div>
        <div class="dict-desc">
          関節リウマチの骨破壊阻止・寛解達成における絶対的アンカードラッグ。
          <br><strong style="color:#b45309;">⚠️ 服用ルール：</strong><strong>「週1〜2日投与・残りは休薬」！</strong>毎日の誤服用事故を絶対に防止。口内炎・肝障害予防に24〜48時間後にフォリアミン（葉酸）1錠内服。
        </div>
        <div class="dict-actions">
          <button class="dict-jump-btn" onclick="jumpToDisease('c7')">📖 免疫リウマチガイドへ</button>
          <button class="dict-jump-btn" onclick="quickSearch('リウマトレックス')">🔍 薬剤詳細へ</button>
        </div>
      </div>

      <!-- BNP / NT-proBNP -->
      <div class="dict-card" data-type="keyword" data-kana="ひ" data-name="BNP NT-proBNP 脳性ナトリウム利尿ペプチド 心不全 エンレスト ARNI 検査値" data-desc="心不全の重症度マーカー エンレスト服用中はBNP分解阻害で偽高値になるためNT-proBNP必須">
        <div class="dict-card-top">
          <span class="dict-badge badge-keyword">🔑 臨床検査値</span>
          <span class="dict-kana-tag">は行 / 心血管バイオマーカー</span>
        </div>
        <div class="dict-name">BNP ＆ NT-proBNP（心不全診断・治療モニタリング指標）</div>
        <div class="dict-desc">
          心室負荷で分泌されるペプチド。BNP&gt;100pg/mLで心不全治療対象、&gt;400で重症心不全。
          <br><strong style="color:#b45309;">⚠️ 処方監査トラップ：</strong><strong>エンレスト（ARNI）服用中はBNPが分解されず見かけ上跳ね上がる！</strong>効果判定には「NT-proBNP」を用いるのが鉄則。
        </div>
        <div class="dict-actions">
          <button class="dict-jump-btn" onclick="switchTab('tab-lab')">🧪 臨床検査値評価へ</button>
          <button class="dict-jump-btn" onclick="jumpToDisease('c4')">📖 心不全ガイドへ</button>
        </div>
      </div>
`;

// コンテナ末尾（</div>\n    </div>\n  </div> の前）に挿入
const containerEndIdx = dictHtml.lastIndexOf('</div>\n    </div>\n  </div>');
if (containerEndIdx !== -1) {
  dictHtml = dictHtml.substring(0, containerEndIdx) + newCards + '\n      ' + dictHtml.substring(containerEndIdx);
} else {
  const altEnd = dictHtml.lastIndexOf('</div>\r\n    </div>\r\n  </div>');
  if (altEnd !== -1) {
    dictHtml = dictHtml.substring(0, altEnd) + newCards + '\r\n      ' + dictHtml.substring(altEnd);
  }
}

fs.writeFileSync('src/14_dictionary.html', dictHtml, 'utf8');
console.log('Successfully added new cards to src/14_dictionary.html');
