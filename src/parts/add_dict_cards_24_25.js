const fs = require('fs');
const path = require('path');

const dictPath = path.join(__dirname, '..', '14_dictionary.html');
let dictHtml = fs.readFileSync(dictPath, 'utf8');

const targetContainer = '<div class="dict-grid" id="dictCardsContainer">';

const newCards = `
    <!-- 24. 肺炎・呼吸器感染症 -->
    <div class="dict-card" data-type="dis" data-kana="は" data-name="肺炎・呼吸器感染症（小児〜成人〜誤嚥性）" data-desc="小児マイコプラズマ耐性菌（オゼックス、8歳未満ミノマイシン歯牙着色禁忌）、新明石スコアによる細菌性vs非定型鑑別、高齢者誤嚥性肺炎（ユナシン、ace阻害薬予防）。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">肺炎・呼吸器感染症（小児・成人・誤嚥性）</h3>
          <span class="dict-badge dict-badge-dis">🏥 疾患</span>
        </div>
        <div class="dict-card-sub">Core 24 / 市中肺炎・小児マイコプラズマ・誤嚥性</div>
        <div class="dict-card-desc">小児マイコプラズマ耐性菌（オゼックス、8歳未満ミノマイシン歯牙着色禁忌）、新明石スコアによる細菌性vs非定型鑑別、高齢者誤嚥性肺炎（ユナシン、ACE阻害薬予防）。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToGuide('c24')">📘 疾患ガイド</button>
      </div>
    </div>

    <!-- オゼックス細粒小児用 -->
    <div class="dict-card" data-type="drug" data-kana="お" data-name="オゼックス細粒小児用 (トスフロキサシン)" data-desc="小児に適応のある数少ないキノロン系抗菌薬。マクロライド耐性マイコプラズマやprspの切り札。軟骨障害懸念のため用量厳守。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">オゼックス細粒小児用</h3>
          <span class="dict-badge dict-badge-drug">💊 薬剤</span>
        </div>
        <div class="dict-card-sub">一般名：トスフロキサシントシル酸塩水和物</div>
        <div class="dict-card-desc">小児に適応のある数少ないキノロン系抗菌薬。マクロライド耐性マイコプラズマやPRSPの切り札。軟骨障害懸念のため用量厳守。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="showDrugByName('オゼックス細粒小児用')">🔍 詳細モーダル</button>
        <button class="dict-jump-btn" onclick="jumpToGuide('c24')">📘 疾患ガイド</button>
      </div>
    </div>

    <!-- 25. 気管支喘息・咳喘息 -->
    <div class="dict-card" data-type="dis" data-kana="き" data-name="気管支喘息・咳喘息・COPD" data-desc="ics/laba配合剤による抗炎症、シムビコートのsmart療法、小児ltra・スペーサー手技、アスピリン喘息（nsaids絶対禁忌）、吸入後うがい2箇条（嗄声・カンジダ予防）。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">気管支喘息・咳喘息・COPD</h3>
          <span class="dict-badge dict-badge-dis">🏥 疾患</span>
        </div>
        <div class="dict-card-sub">Core 25 / 吸入デバイス・SMART療法・アスピリン喘息</div>
        <div class="dict-card-desc">ICS/LABA配合剤による抗炎症、シムビコートのSMART療法、小児LTRA・スペーサー手技、アスピリン喘息（NSAIDs絶対禁忌）、吸入後うがい2箇条（嗄声・カンジダ予防）。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToGuide('c25')">📘 疾患ガイド</button>
      </div>
    </div>

    <!-- シムビコート -->
    <div class="dict-card" data-type="drug" data-kana="し" data-name="シムビコート タービュヘイラー" data-desc="ics/速効性laba配合剤。定期維持吸入に加え発作時頓用追加（smart療法：1日最大8吸入）。吸入後うがい必須。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">シムビコート タービュヘイラー</h3>
          <span class="dict-badge dict-badge-drug">💊 薬剤</span>
        </div>
        <div class="dict-card-sub">ブデソニド / ホルモテロール</div>
        <div class="dict-card-desc">ICS/速効性LABA配合剤。定期維持吸入に加え発作時頓用追加（SMART療法：1日最大8吸入）。吸入後うがい必須。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="showDrugByName('シムビコート タービュヘイラー')">🔍 詳細モーダル</button>
        <button class="dict-jump-btn" onclick="jumpToGuide('c25')">📘 疾患ガイド</button>
      </div>
    </div>

    <!-- テリルジー -->
    <div class="dict-card" data-type="drug" data-kana="て" data-name="テリルジー / エナジア" data-desc="ics/laba/lama 3剤配合吸入薬。重症喘息およびcopdに1日1回吸入。抗コリン作用による緑内障・前立腺肥大症に注意。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">テリルジー / エナジア</h3>
          <span class="dict-badge dict-badge-drug">💊 薬剤</span>
        </div>
        <div class="dict-card-sub">ICS / LABA / LAMA 3剤合剤</div>
        <div class="dict-card-desc">ICS/LABA/LAMA 3剤配合吸入薬。重症喘息およびCOPDに1日1回吸入。抗コリン作用による緑内障・前立腺肥大症に注意。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="showDrugByName('テリルジー / エナジア')">🔍 詳細モーダル</button>
        <button class="dict-jump-btn" onclick="jumpToGuide('c25')">📘 疾患ガイド</button>
      </div>
    </div>
`;

if (!dictHtml.includes('肺炎・呼吸器感染症')) {
  dictHtml = dictHtml.replace(targetContainer, targetContainer + '\n' + newCards);
  fs.writeFileSync(dictPath, dictHtml, 'utf8');
  console.log("Successfully added Core 24-25 cards to 14_dictionary.html");
} else {
  console.log("Cards already exist in 14_dictionary.html");
}
