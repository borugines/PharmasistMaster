const fs = require('fs');
const path = require('path');

const dictPath = path.join(__dirname, '..', '14_dictionary.html');
let dictHtml = fs.readFileSync(dictPath, 'utf8');

const targetContainer = '<div class="dict-grid" id="dictCardsContainer">';

const newCards = `
    <!-- 心臓弁膜症 -->
    <div class="dict-card" data-type="dis" data-kana="し" data-name="心臓弁膜症（AS / MR / 機械弁置換術後）" data-desc="大動脈弁狭窄症（as）での硝酸薬ショック禁忌。機械弁置換後・中等度以上msではdoac絶対禁忌（ワルファリン一択）。抜歯前の感染性心内膜炎（ie）予防アモキシシリン。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">心臓弁膜症（AS / MR / 機械弁）</h3>
          <span class="dict-badge dict-badge-dis">🏥 疾患</span>
        </div>
        <div class="dict-card-sub">Valvular Heart Disease / 機械弁のDOAC禁忌</div>
        <div class="dict-card-desc">大動脈弁狭窄症（AS）での硝酸薬ショック禁忌。機械弁置換後・中等度以上MSではDOAC絶対禁忌（ワルファリン一択）。抜歯前の感染性心内膜炎（IE）予防アモキシシリン。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToGuide('c4')">📘 疾患ガイド</button>
      </div>
    </div>

    <!-- ニトロペン -->
    <div class="dict-card" data-type="drug" data-kana="に" data-name="ニトロペン (舌下錠)" data-desc="狭心症発作時に舌下投与。立位での失神防止のため必ず座位・臥位で服用。飲み込むと肝初回通過効果で無効。5分あけて2〜3回無効なら即救急要請。asでは原則回避。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ニトロペン (舌下錠)</h3>
          <span class="dict-badge dict-badge-drug">💊 薬剤</span>
        </div>
        <div class="dict-card-sub">一般名：ニトログリセリン</div>
        <div class="dict-card-desc">狭心症発作時に舌下投与。立位での失神防止のため必ず座位・臥位で服用。飲み込むと肝初回通過効果で無効。5分あけて2〜3回無効なら即救急要請。ASでは原則回避。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="showDrugByName('ニトロペン')">🔍 詳細モーダル</button>
        <button class="dict-jump-btn" onclick="jumpToGuide('c4')">📘 疾患ガイド</button>
      </div>
    </div>

    <!-- ワーファリン -->
    <div class="dict-card" data-type="drug" data-kana="わ" data-name="ワーファリン (ワルファリンカリウム)" data-desc="機械弁置換後・中等度以上msの絶対的標準薬（doac絶対禁忌！）。納豆・クロレラ・青汁のビタミンk厳格制限。pt-inrモニタリング。併用禁忌薬多数。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ワーファリン</h3>
          <span class="dict-badge dict-badge-drug">💊 薬剤</span>
        </div>
        <div class="dict-card-sub">一般名：ワルファリンカリウム</div>
        <div class="dict-card-desc">機械弁置換後・中等度以上MSの絶対的標準薬（DOAC絶対禁忌！）。納豆・クロレラ・青汁のビタミンK厳格制限。PT-INRモニタリング。併用禁忌薬多数（ケアラム等）。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="showDrugByName('ワーファリン')">🔍 詳細モーダル</button>
        <button class="dict-jump-btn" onclick="jumpToGuide('c4')">📘 疾患ガイド</button>
      </div>
    </div>

    <!-- アンカロン -->
    <div class="dict-card" data-type="drug" data-kana="あ" data-name="アンカロン (アミオダロン塩酸塩)" data-desc="心室細動（vf）・心室頻拍（vt）の切り札。ヨウ素を含むため甲状腺機能異常、致死的な間質性肺炎、角膜色素沈着の副作用トリプル毒性tdm監視が必須。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">アンカロン</h3>
          <span class="dict-badge dict-badge-drug">💊 薬剤</span>
        </div>
        <div class="dict-card-sub">一般名：アミオダロン塩酸塩</div>
        <div class="dict-card-desc">心室細動（Vf）・心室頻拍（VT）の切り札。ヨウ素を含むため甲状腺機能異常、致死的な間質性肺炎、角膜色素沈着の副作用トリプル毒性TDM監視が必須。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="showDrugByName('アンカロン')">🔍 詳細モーダル</button>
        <button class="dict-jump-btn" onclick="jumpToGuide('c4')">📘 疾患ガイド</button>
      </div>
    </div>
`;

if (!dictHtml.includes('ニトロペン')) {
  dictHtml = dictHtml.replace(targetContainer, targetContainer + '\n' + newCards);
  fs.writeFileSync(dictPath, dictHtml, 'utf8');
  console.log("Successfully added heart cards to 14_dictionary.html");
} else {
  console.log("Heart cards already exist in 14_dictionary.html");
}
