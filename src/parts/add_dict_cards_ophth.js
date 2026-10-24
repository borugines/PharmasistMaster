const fs = require('fs');
const path = require('path');

const dictPath = path.join(__dirname, '..', '14_dictionary.html');
let dictHtml = fs.readFileSync(dictPath, 'utf8');

const targetContainer = '<div class="dict-grid" id="dictCardsContainer">';

const newCards = `
    <!-- 白内障・術前術後管理 -->
    <div class="dict-card" data-type="dis" data-kana="は" data-name="白内障・術前術後管理（CME予防）" data-desc="初期白内障進行遅延（カリーユニ）。白内障術後3本柱：抗菌点眼（眼内炎予防）＋ステロイド＋nsaids点眼（術後黄斑浮腫cme予防）。痛くなくてもnsaids継続必須。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">白内障・術前術後管理（CME予防）</h3>
          <span class="dict-badge dict-badge-dis">🏥 疾患</span>
        </div>
        <div class="dict-card-sub">Core 14 / 白内障手術・術後黄斑浮腫予防</div>
        <div class="dict-card-desc">初期白内障進行遅延（カリーユニ）。白内障術後3本柱：抗菌点眼（眼内炎予防）＋ステロイド＋NSAIDs点眼（術後黄斑浮腫CME予防）。痛くなくてもNSAIDs継続必須。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToGuide('c14')">📘 疾患ガイド</button>
      </div>
    </div>

    <!-- 点眼手技・日数計算・コンタクト -->
    <div class="dict-card" data-type="dis" data-kana="て" data-name="点眼手技・点眼日数計算・コンタクト装用ルール" data-desc="点眼1滴（40〜50μl）と結膜嚢容量（20〜30μl）。1瓶5ml＝約100滴。まばたき禁止・目頭押さえ。5分間隔ルール。ソフトコンタクトレンズの防腐剤bak吸着角膜障害。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">点眼手技・点眼日数計算・コンタクト</h3>
          <span class="dict-badge dict-badge-dis">🏥 疾患</span>
        </div>
        <div class="dict-card-sub">Core 14 / 1滴の科学・点眼順序・防腐剤BAK</div>
        <div class="dict-card-desc">点眼1滴（40〜50μL）と結膜嚢容量（20〜30μL）。1瓶5mL＝約100滴。まばたき禁止・目頭押さえ。5分間隔ルール。ソフトコンタクトレンズの防腐剤BAK吸着角膜障害。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToGuide('c14')">📘 疾患ガイド</button>
      </div>
    </div>

    <!-- カリーユニ点眼用 -->
    <div class="dict-card" data-type="drug" data-kana="か" data-name="カリーユニ点眼用 (ピレノキシン)" data-desc="初期老人性白内障進行遅延薬。キノイド物質結合阻止。混濁を透明に戻す薬ではなく進行予防。よく振ってから点眼する懸濁性点眼液。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">カリーユニ点眼用</h3>
          <span class="dict-badge dict-badge-drug">💊 薬剤</span>
        </div>
        <div class="dict-card-sub">一般名：ピレノキシン</div>
        <div class="dict-card-desc">初期老人性白内障進行遅延薬。キノイド物質結合阻止。混濁を透明に戻す薬ではなく進行予防。よく振ってから点眼する懸濁性点眼液。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="showDrugByName('カリーユニ点眼用')">🔍 詳細モーダル</button>
        <button class="dict-jump-btn" onclick="jumpToGuide('c14')">📘 疾患ガイド</button>
      </div>
    </div>

    <!-- ブロムフェナク点眼液 -->
    <div class="dict-card" data-type="drug" data-kana="ふ" data-name="ブロムフェナク点眼液 / ネバナック" data-desc="白内障術後抗炎症点眼薬（nsaids点眼）。プロスタグランジン産生を抑制し術後黄斑浮腫（cme）による視力低下を防止。痛みがなくても完遂指導。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ブロムフェナク点眼液</h3>
          <span class="dict-badge dict-badge-drug">💊 薬剤</span>
        </div>
        <div class="dict-card-sub">一般名：ブロムフェナクナトリウム水和物</div>
        <div class="dict-card-desc">白内障術後抗炎症点眼薬（NSAIDs点眼）。プロスタグランジン産生を抑制し術後黄斑浮腫（CME）による視力低下を防止。痛みがなくても完遂指導。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="showDrugByName('ブロムフェナク点眼液 / ネバナック')">🔍 詳細モーダル</button>
        <button class="dict-jump-btn" onclick="jumpToGuide('c14')">📘 疾患ガイド</button>
      </div>
    </div>
`;

if (!dictHtml.includes('白内障・術前術後管理')) {
  dictHtml = dictHtml.replace(targetContainer, targetContainer + '\n' + newCards);
  fs.writeFileSync(dictPath, dictHtml, 'utf8');
  console.log("Successfully added Ophthalmology cards to 14_dictionary.html");
} else {
  console.log("Cards already exist in 14_dictionary.html");
}
