const fs = require('fs');
const path = require('path');

const dictPath = path.join(__dirname, '..', '14_dictionary.html');
let dictHtml = fs.readFileSync(dictPath, 'utf8');

const targetContainer = '<div class="dict-grid" id="dictCardsContainer">';

const newCards = `
    <!-- 肺高血圧症 -->
    <div class="dict-card" data-type="dis" data-kana="は" data-name="肺高血圧症（PAH / CTEPH）" data-desc="平均肺動脈圧mpap>20mmhg。肺動脈性（pah：第1群）と慢性血栓塞栓性（cteph：第4群）。era+pde5阻害薬早期併用。硝酸薬併用絶対禁忌。エポプロステノール持続静注の中断厳禁。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">肺高血圧症（PAH / CTEPH）</h3>
          <span class="dict-badge dict-badge-dis">🏥 疾患</span>
        </div>
        <div class="dict-card-sub">Pulmonary Hypertension / 難病・指定疾患</div>
        <div class="dict-card-desc">平均肺動脈圧mPAP>20mmHg。肺動脈性（PAH：第1群）と慢性血栓塞栓性（CTEPH：第4群）。ERA+PDE5阻害薬早期併用。硝酸薬併用絶対禁忌。エポプロステノール持続静注の中断厳禁。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToGuide('c4')">📘 疾患ガイド</button>
      </div>
    </div>

    <!-- アドシルカ -->
    <div class="dict-card" data-type="drug" data-kana="あ" data-name="アドシルカ / レバチオ (タダラフィル / シルデナフィル)" data-desc="肺動脈平滑筋のpde5阻害薬。硝酸薬（ニトロペン等）やsgc刺激薬（アデムパス）と絶対併用禁忌！前立腺（ザルティア）やed（シアリス）と同成分だが用量・適応が異なる。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">アドシルカ / レバチオ</h3>
          <span class="dict-badge dict-badge-drug">💊 薬剤</span>
        </div>
        <div class="dict-card-sub">一般名：タダラフィル / シルデナフィル</div>
        <div class="dict-card-desc">肺動脈平滑筋のPDE5阻害薬。硝酸薬（ニトロペン等）やsGC刺激薬（アデムパス）と絶対併用禁忌！前立腺（ザルティア）やED（シアリス）と同成分だが用量・適応が異なる。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="showDrugByName('アドシルカ')">🔍 詳細モーダル</button>
        <button class="dict-jump-btn" onclick="jumpToGuide('c4')">📘 疾患ガイド</button>
      </div>
    </div>

    <!-- アデムパス -->
    <div class="dict-card" data-type="drug" data-kana="あ" data-name="アデムパス (リオシグアト)" data-desc="可溶性グアニル酸シクラーゼ（sgc）直接刺激薬。pahだけでなくcteph（第4群）に唯一保険適用。pde5阻害薬および硝酸薬と絶対併用禁忌！喫煙で血中濃度低下。催奇形性禁忌。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">アデムパス</h3>
          <span class="dict-badge dict-badge-drug">💊 薬剤</span>
        </div>
        <div class="dict-card-sub">一般名：リオシグアト</div>
        <div class="dict-card-desc">可溶性グアニル酸シクラーゼ（sGC）直接刺激薬。PAHだけでなくCTEPH（第4群）に唯一保険適用。PDE5阻害薬および硝酸薬と絶対併用禁忌！喫煙で血中濃度低下。催奇形性禁忌。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="showDrugByName('アデムパス')">🔍 詳細モーダル</button>
        <button class="dict-jump-btn" onclick="jumpToGuide('c4')">📘 疾患ガイド</button>
      </div>
    </div>

    <!-- フローラン / ウプトラビ -->
    <div class="dict-card" data-type="drug" data-kana="ふ" data-name="フローラン / ウプトラビ (エポプロステノール / セレキシパグ)" data-desc="プロスタサイクリン（pgi2）受容体刺激薬。フローラン持続静注は最重症pahの切り札で半減期3〜5分（急な中断は致死的反跳性発作！）。ウプトラビは経口薬（下痢・頭痛・顎痛）。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">フローラン / ウプトラビ</h3>
          <span class="dict-badge dict-badge-drug">💊 薬剤</span>
        </div>
        <div class="dict-card-sub">一般名：エポプロステノール / セレキシパグ</div>
        <div class="dict-card-desc">プロスタサイクリン（PGI2）受容体刺激薬。フローラン持続静注は最重症PAHの切り札で半減期3〜5分（急な中断は致死的反跳性発作！）。ウプトラビは経口薬（下痢・頭痛・顎痛）。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="showDrugByName('ウプトラビ')">🔍 詳細モーダル</button>
        <button class="dict-jump-btn" onclick="jumpToGuide('c4')">📘 疾患ガイド</button>
      </div>
    </div>
`;

if (!dictHtml.includes('アドシルカ')) {
  dictHtml = dictHtml.replace(targetContainer, targetContainer + '\n' + newCards);
  fs.writeFileSync(dictPath, dictHtml, 'utf8');
  console.log("Successfully added PH cards to 14_dictionary.html");
} else {
  console.log("PH cards already exist in 14_dictionary.html");
}
