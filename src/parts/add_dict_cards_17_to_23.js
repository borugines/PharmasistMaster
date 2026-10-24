const fs = require('fs');
const path = require('path');

const dictPath = path.join(__dirname, '..', '14_dictionary.html');
let dictHtml = fs.readFileSync(dictPath, 'utf8');

const targetContainer = '<div class="dict-grid" id="dictCardsContainer">';

const newCards = `
    <!-- 17. 高尿酸血症・痛風 -->
    <div class="dict-card" data-type="dis" data-kana="こ" data-name="高尿酸血症・痛風" data-desc="目標血清尿酸値6.0mg/dl以下。発作中の新規尿酸降下薬（フェブリック等）開始・増量は厳禁！アロプリノールのhla重症薬疹、排泄促進薬ユリスの結石禁忌。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">高尿酸血症・痛風</h3>
          <span class="dict-badge dict-badge-dis">🏥 疾患</span>
        </div>
        <div class="dict-card-sub">Core 17 / 痛風関節炎・尿路結石予防</div>
        <div class="dict-card-desc">目標血清尿酸値6.0mg/dL以下。発作中の新規尿酸降下薬（フェブリック等）開始・増量は厳禁！アロプリノールのHLA重症薬疹、排泄促進薬ユリスの結石禁忌。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToGuide('c17')">📘 疾患ガイド</button>
      </div>
    </div>

    <!-- フェブリック -->
    <div class="dict-card" data-type="drug" data-kana="ふ" data-name="フェブリック (フェブキソスタット)" data-desc="非プリン型尿酸生成抑制薬。腎機能低下でも使いやすい。発作中開始厳禁。アザニン・メルカプトプリンと絶対併用禁忌！">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">フェブリック</h3>
          <span class="dict-badge dict-badge-drug">💊 薬剤</span>
        </div>
        <div class="dict-card-sub">一般名：フェブキソスタット</div>
        <div class="dict-card-desc">非プリン型尿酸生成抑制薬。腎機能低下でも使いやすい。発作中開始厳禁。アザニン・メルカプトプリンと絶対併用禁忌！</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="showDrugByName('フェブリック')">🔍 詳細モーダル</button>
        <button class="dict-jump-btn" onclick="jumpToGuide('c17')">📘 疾患ガイド</button>
      </div>
    </div>

    <!-- 18. 小児科頻出疾患 -->
    <div class="dict-card" data-type="dis" data-kana="し" data-name="小児科頻出疾患・調剤監査" data-desc="体重換算用量監査（成人量キャップ）。熱性けいれん予防ダイアップ坐薬と解熱坐薬アンヒバの時間差（ダイアップ先30分）。マクロライド系細粒の苦味爆発回避。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">小児科頻出疾患・調剤監査</h3>
          <span class="dict-badge dict-badge-dis">🏥 疾患</span>
        </div>
        <div class="dict-card-sub">Core 18 / 小児用量監査・坐薬順序・味マスキング</div>
        <div class="dict-card-desc">体重換算用量監査（成人量キャップ）。熱性けいれん予防ダイアップ坐薬と解熱坐薬アンヒバの時間差（ダイアップ先30分）。マクロライド系細粒の苦味爆発回避。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToGuide('c18')">📘 疾患ガイド</button>
      </div>
    </div>

    <!-- 19. 貧血 -->
    <div class="dict-card" data-type="dis" data-kana="ひ" data-name="貧血（鉄欠乏性・大球性・腎性）" data-desc="mcvによる分類。鉄欠乏性（フェロミア、キレート相互作用）、大球性（メトホルミン長期によるvit b12欠乏）、腎性（hif-ph阻害薬エナロイ）。便の黒色化。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">貧血（鉄欠乏性・大球性・腎性）</h3>
          <span class="dict-badge dict-badge-dis">🏥 疾患</span>
        </div>
        <div class="dict-card-sub">Core 19 / MCV鑑別・キレート相互作用・HIF-PH</div>
        <div class="dict-card-desc">MCVによる分類。鉄欠乏性（フェロミア、キレート相互作用）、大球性（メトホルミン長期によるVit B12欠乏）、腎性（HIF-PH阻害薬エナロイ）。便の黒色化。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToGuide('c19')">📘 疾患ガイド</button>
      </div>
    </div>

    <!-- フェロミア -->
    <div class="dict-card" data-type="drug" data-kana="ふ" data-name="フェロミア / フェルム" data-desc="鉄欠乏性貧血治療薬。チラーヂン、キノロン、テトラサイクリンとキレート形成で吸収激減するため2時間あける。便黒色化。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">フェロミア / フェルム</h3>
          <span class="dict-badge dict-badge-drug">💊 薬剤</span>
        </div>
        <div class="dict-card-sub">一般名：クエン酸第一鉄Na / 溶性ピロリン酸第二鉄</div>
        <div class="dict-card-desc">鉄欠乏性貧血治療薬。チラーヂン、キノロン、テトラサイクリンとキレート形成で吸収激減するため2時間あける。便黒色化。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="showDrugByName('フェロミア')">🔍 詳細モーダル</button>
        <button class="dict-jump-btn" onclick="jumpToGuide('c19')">📘 疾患ガイド</button>
      </div>
    </div>

    <!-- 20. 睡眠障害・不眠症 -->
    <div class="dict-card" data-type="dis" data-kana="ふ" data-name="睡眠障害・不眠症マスター" data-desc="入眠困難・中途覚醒・早朝覚醒の病型別マッチング。オレキシン拮抗薬（デエビゴ、ベルソムラCYP3A禁忌）、メラトニン作動薬（ロゼレム・ルボックス併用禁忌）。脱ベンゾ。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">睡眠障害・不眠症マスター</h3>
          <span class="dict-badge dict-badge-dis">🏥 疾患</span>
        </div>
        <div class="dict-card-sub">Core 20 / オレキシン・メラトニン・脱ベンゾ</div>
        <div class="dict-card-desc">入眠困難・中途覚醒・早朝覚醒の病型別マッチング。オレキシン拮抗薬（デエビゴ、ベルソムラCYP3A禁忌）、メラトニン作動薬（ロゼレム・ルボックス併用禁忌）。脱ベンゾ。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToGuide('c20')">📘 疾患ガイド</button>
      </div>
    </div>

    <!-- 21. ピロリ菌除菌 -->
    <div class="dict-card" data-type="dis" data-kana="ひ" data-name="ピロリ菌除菌・急性胃腸炎" data-desc="ボノサップ一次除菌（タケキャブ+サワシリン+クラリス）。二次除菌ボノピオン（フラジール変更）はアルコール絶対禁忌（ジスルフィラム様ショック）。急性胃腸炎のロペミン禁忌。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ピロリ菌除菌・急性胃腸炎</h3>
          <span class="dict-badge dict-badge-dis">🏥 疾患</span>
        </div>
        <div class="dict-card-sub">Core 21 / P-CAB除菌・二次除菌禁酒・脱水管理</div>
        <div class="dict-card-desc">ボノサップ一次除菌（タケキャブ+サワシリン+クラリス）。二次除菌ボノピオン（フラジール変更）はアルコール絶対禁忌（ジスルフィラム様ショック）。急性胃腸炎のロペミン禁忌。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToGuide('c21')">📘 疾患ガイド</button>
      </div>
    </div>

    <!-- ボノサップパック -->
    <div class="dict-card" data-type="drug" data-kana="ほ" data-name="ボノサップパック / ボノピオンパック" data-desc="P-CAB配合ピロリ除菌パック製剤。一次除菌ボノサップ、二次除菌ボノピオン（メトロニダゾール配合・服薬中絶対禁酒！）。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ボノサップ / ボノピオン</h3>
          <span class="dict-badge dict-badge-drug">💊 薬剤</span>
        </div>
        <div class="dict-card-sub">タケキャブ・サワシリン・クラリス / フラジール</div>
        <div class="dict-card-desc">P-CAB配合ピロリ除菌パック製剤。一次除菌ボノサップ、二次除菌ボノピオン（メトロニダゾール配合・服薬中絶対禁酒！）。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="showDrugByName('ボノサップ')">🔍 詳細モーダル</button>
        <button class="dict-jump-btn" onclick="jumpToGuide('c21')">📘 疾患ガイド</button>
      </div>
    </div>

    <!-- 22. 不妊治療 -->
    <div class="dict-card" data-type="dis" data-kana="ふ" data-name="不妊治療・生殖補助医療（ART）" data-desc="2022年保険適用。黄体補充腟用製剤（ウトロゲスタン：経口誤認防止・時間厳守）、排卵誘発（レトロゾール、ゴナールエフ自己注射ペン・冷所・針回収）、ohss・血栓症管理。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">不妊治療・生殖補助医療（ART）</h3>
          <span class="dict-badge dict-badge-dis">🏥 疾患</span>
        </div>
        <div class="dict-card-sub">Core 22 / 黄体補充・自己注射・OHSS管理</div>
        <div class="dict-card-desc">2022年保険適用。黄体補充腟用製剤（ウトロゲスタン：経口誤認防止・時間厳守）、排卵誘発（レトロゾール、ゴナールエフ自己注射ペン・冷所・針回収）、OHSS・血栓症管理。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToGuide('c22')">📘 疾患ガイド</button>
      </div>
    </div>

    <!-- ウトロゲスタン -->
    <div class="dict-card" data-type="drug" data-kana="う" data-name="ウトロゲスタン / ルティナス" data-desc="胚移植後の黄体補充腟用カプセル・腟錠。絶対に口から飲まない！指定された時間間隔厳守。オリモノシート併用指導。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ウトロゲスタン / ルティナス</h3>
          <span class="dict-badge dict-badge-drug">💊 薬剤</span>
        </div>
        <div class="dict-card-sub">一般名：プロゲステロン</div>
        <div class="dict-card-desc">胚移植後の黄体補充腟用カプセル・腟錠。絶対に口から飲まない！指定された時間間隔厳守。オリモノシート併用指導。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="showDrugByName('ウトロゲスタン')">🔍 詳細モーダル</button>
        <button class="dict-jump-btn" onclick="jumpToGuide('c22')">📘 疾患ガイド</button>
      </div>
    </div>

    <!-- 23. 褥瘡・創傷外用療法 -->
    <div class="dict-card" data-type="dis" data-kana="じ" data-name="褥瘡・難治性創傷外用療法" data-desc="design-r分類と外用基剤マッチング。黒色期（ゲーベン）、黄色期（ユーパスタ・カデックス吸水）、赤色期（プロスタンディン肉芽形成）、白色期（アクトシン上皮化）。スダチ塗り。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">褥瘡・難治性創傷外用療法</h3>
          <span class="dict-badge dict-badge-dis">🏥 疾患</span>
        </div>
        <div class="dict-card-sub">Core 23 / DESIGN-R分類・外用基剤・湿潤療法</div>
        <div class="dict-card-desc">DESIGN-R分類と外用基剤マッチング。黒色期（ゲーベン）、黄色期（ユーパスタ・カデックス吸水）、赤色期（プロスタンディン肉芽形成）、白色期（アクトシン上皮化）。スダチ塗り。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToGuide('c23')">📘 疾患ガイド</button>
      </div>
    </div>

    <!-- ゲーベン軟膏 -->
    <div class="dict-card" data-type="drug" data-kana="け" data-name="ゲーベン軟膏 (スルファジアジン銀)" data-desc="黒色期・黄色期の感染壊死組織軟化・殺菌。銀イオン殺菌。白血球減少症（骨髄抑制）モニタリング。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ゲーベン軟膏</h3>
          <span class="dict-badge dict-badge-drug">💊 薬剤</span>
        </div>
        <div class="dict-card-sub">一般名：スルファジアジン銀</div>
        <div class="dict-card-desc">黒色期・黄色期の感染壊死組織軟化・殺菌。銀イオン殺菌。白血球減少症（骨髄抑制）モニタリング。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="showDrugByName('ゲーベン')">🔍 詳細モーダル</button>
        <button class="dict-jump-btn" onclick="jumpToGuide('c23')">📘 疾患ガイド</button>
      </div>
    </div>

    <!-- ユーパスタコーワ軟膏 -->
    <div class="dict-card" data-type="drug" data-kana="ゆ" data-name="ユーパスタコーワ軟膏 (精製白糖・ポビドンヨード)" data-desc="黄色期ジュクジュク創の強力吸水・殺菌。乾いた創（肉芽形成期）に塗ると浸透圧で激痛・肉芽融解を起こすため禁忌！">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ユーパスタコーワ軟膏</h3>
          <span class="dict-badge dict-badge-drug">💊 薬剤</span>
        </div>
        <div class="dict-card-sub">成分：精製白糖・ポビドンヨード</div>
        <div class="dict-card-desc">黄色期ジュクジュク創の強力吸水・殺菌。乾いた創（肉芽形成期）に塗ると浸透圧で激痛・肉芽融解を起こすため禁忌！</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="showDrugByName('ユーパスタ')">🔍 詳細モーダル</button>
        <button class="dict-jump-btn" onclick="jumpToGuide('c23')">📘 疾患ガイド</button>
      </div>
    </div>
`;

if (!dictHtml.includes('高尿酸血症・痛風')) {
  dictHtml = dictHtml.replace(targetContainer, targetContainer + '\n' + newCards);
  fs.writeFileSync(dictPath, dictHtml, 'utf8');
  console.log("Successfully added Core 17-23 cards to 14_dictionary.html");
} else {
  console.log("Cards already exist in 14_dictionary.html");
}
