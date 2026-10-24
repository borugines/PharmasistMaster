const fs = require('fs');
const path = require('path');

console.log('=== Creating src/16_top100.html for Pharmacy Ranking TOP 100 ===');

const top100Data = [
  // 1-20
  { rank: 1, name: "高血圧症", cat: "循環器・生活習慣病", status: "ok", guideId: "c2", compId: "sec-ht", drugs: "アムロジピン、テルミサルタン、オルメサルタン、ビソプロロール、エンレスト", key: "家庭血圧第一主義（125/75目標）。Ca拮抗薬（浮腫/便秘）、ARB（カリウム/腎機能）、多剤併用（合剤活用）。" },
  { rank: 2, name: "脂質異常症（高コレステロール血症）", cat: "代謝・生活習慣病", status: "ok", guideId: "c10", compId: "sec-ckd", drugs: "ロスバスタチン、アトルバスタチン、ピタバスタチン、エゼチミブ、パルモディア", key: "二次予防LDL<70目標。ストロングスタチン（横紋筋融解症CK・筋肉痛）、エゼチミブ併用（NPC1L1）。" },
  { rank: 3, name: "急性上気道炎（かぜ症候群）", cat: "呼吸器・感染症", status: "new", guideId: "", compId: "", drugs: "PL配合顆粒、ピーエイ配合錠、トラネキサム酸、カルボシステイン、葛根湯、麻黄湯", key: "【要新設】総合感冒薬の抗コリン作用（緑内障・前立腺肥大注意）、漢方の証（葛根湯/麻黄湯）、不要な抗菌薬への適正使用説明。" },
  { rank: 4, name: "アレルギー性鼻炎・花粉症", cat: "耳鼻科・アレルギー", status: "new", guideId: "", compId: "", drugs: "アレグラ、クラリチン、ビラノア、デザレックス、ルパフィン、アラミスト、シダキュア", key: "【要新設】第2世代抗ヒスタミンの眠気・運転可否・インペアードパフォーマンス比較、点鼻ステロイドの継続投与、舌下免疫療法。" },
  { rank: 5, name: "2型糖尿病", cat: "代謝・生活習慣病", status: "ok", guideId: "c3", compId: "sec-dm", drugs: "メトホルミン、フォシーガ、ジャディアンス、マンジャロ、トルリシティ、ツイミーグ", key: "第一選択メトホルミン（腎機能eGFR・乳酸アシドーシス）、SGLT2阻害薬（脱水・尿路感染）、GLP-1/GIP。" },
  { rank: 6, name: "腰痛症・坐骨神経痛", cat: "整形外科・疼痛", status: "partial", guideId: "c12", compId: "sec-extra", drugs: "ロキソプロフェン、セレコキシブ、タリージェ、リリカ、ミオナール、メチコバール、モーラステープ", key: "【要拡充】侵害受容性疼痛（NSAIDs）vs 神経障害性疼痛（タリージェ/リリカ増量プロトコル）、光線過敏症（モーラス）、湿布使い分け。" },
  { rank: 7, name: "慢性便秘症", cat: "消化器", status: "ok", guideId: "c26", compId: "sec-extra", drugs: "酸化マグネシウム、モビコール、アミティーザ、リンゼス、グーフィス、ピコスルファート", key: "酸化Mg高Mg血症チェック、上皮機能変容薬（アミティーザ食直後/リンゼス食前）、胆汁酸（グーフィス食前）、大腸刺激性頓用原則。" },
  { rank: 8, name: "不眠症・睡眠障害", cat: "精神神経", status: "ok", guideId: "c20", compId: "sec-psy", drugs: "ボルズィ、デエビゴ、クービビック、ベルソムラ、ロゼレム、ルネスタ、マイスリー", key: "オレキシン受容体拮抗薬4大製剤（ボルズィ約2h〜デエビゴ約50h）半減期使い分け、CYP3A4禁忌、脱ベンゾ離脱。" },
  { rank: 9, name: "胃食道逆流症（GERD）・逆流性食道炎", cat: "消化器", status: "ok", guideId: "c11", compId: "sec-ckd", drugs: "タケキャブ（ボノプラザン）、ネキシウム、パリエット、タケプロン、六君子湯", key: "P-CAB（タケキャブ）の初回速効性とCYP非依存、PPI相互作用比較、就寝前摂食回避・頭部挙上指導。" },
  { rank: 10, name: "湿疹・接触皮膚炎（かぶれ・肌荒れ）", cat: "皮膚科", status: "ok", guideId: "c16", compId: "sec-imm", drugs: "アンテベート、デルモベート、フルメタ、ロコイド、ヒルドイド、プロペト", key: "ステロイド外用5段階ランク（部位別選択）、FTU（フィンガーチップユニット）、混合順・塗り順。" },
  { rank: 11, name: "慢性胃炎・胃潰瘍", cat: "消化器", status: "ok", guideId: "c21", compId: "sec-ckd", drugs: "ボノサップ/ボノピオン、タケキャブ、ムコスタ（レバミピド）、セルベックス", key: "ピロリ除菌7日間完遂（下痢・味覚異常でも中止回避）、NSAIDs潰瘍予防（P-CAB併用）、防御因子増強。" },
  { rank: 12, name: "変形性膝関節症・関節症", cat: "整形外科", status: "partial", guideId: "c12", compId: "sec-extra", drugs: "セレコキシブ、ロキソプロフェン、アセトアミノフェン、ヒアルロン酸関節注、外用NSAIDs", key: "【要拡充】NSAIDs胃腸・腎・心血管リスク評価、セレコックス選択的COX-2、外用貼付剤の正しい位置づけ、アセトアミノフェン併用。" },
  { rank: 13, name: "ドライアイ（角結膜上皮障害）", cat: "眼科", status: "ok", guideId: "c14", compId: "sec-extra", drugs: "ヒアレイン（ヒアルロン酸Na）、ジクアス（ジクアホソルNa）、ムコスタ点眼液", key: "水分保持（ヒアレイン）vs ムチン・水分分泌促進（ジクアス）vs ムチン増加・抗炎症（ムコスタ懸濁点眼）。" },
  { rank: 14, name: "気管支喘息・咳喘息", cat: "呼吸器", status: "ok", guideId: "c25", compId: "sec-imm", drugs: "レルベア、シムビコート、フルティフォーム、アテキュラ、モンテルカスト、スピリーバ", key: "ICS/LABA吸入デバイス特性（ドライパウダー vs エアゾール）、うがい指導、咳喘息へのステップダウン/維持。" },
  { rank: 15, name: "アトピー性皮膚炎", cat: "皮膚科", status: "ok", guideId: "c16", compId: "sec-imm", drugs: "プロトピック、コレクチム、モイゼルト、デュピクセント、ステロイド外用、保湿剤", key: "プロアクティブ療法、非ステロイド新規外用薬（外用JAKコレクチム、外用PDE4モイゼルト）、生物学的製剤（デュピクセント）。" },
  { rank: 16, name: "高尿酸血症・痛風", cat: "代謝", status: "ok", guideId: "c17", compId: "sec-ckd", drugs: "フェブリク（フェブキソスタット）、ユリス（ドチヌラド）、ザイロリック、ウラリット", key: "発作中の尿酸降下薬新規開始厳禁、フェブリク（肝腎排泄）、ユリス（URAT1選択的阻害・結石注意）、酸性尿アルカリ化。" },
  { rank: 17, name: "うつ病・抑うつ状態", cat: "精神神経", status: "ok", guideId: "c6", compId: "sec-psy", drugs: "レクサプロ、ジェイゾロフト、サインバルタ、リフレックス/レメロン、トリンテリックス", key: "主症状別選択（不安SSRI / 意欲・疼痛SNRI / 不眠・食欲不振NaSSA）、初期嘔気（ドンペリドン併用）、アクチベーション症候群。" },
  { rank: 18, name: "骨粗鬆症", cat: "代謝・整形外科", status: "ok", guideId: "c10", compId: "sec-ckd", drugs: "プラリア、ボナロン/ベネット、イベニティ、オスタバロ、フォルテオ/テリボン、エディロール", key: "プラリア（ドタキャン骨折オーバーシュート防止/デノタス併用必須）、BP（起床時水180mL絶食30分）、シーケンシャルセラピー。" },
  { rank: 19, name: "前立腺肥大症", cat: "泌尿器", status: "ok", guideId: "c9", compId: "sec-ckd", drugs: "タムスロシン（ハルナール）、シロドシン（ユリーフ）、ナフトピジル、タダラフィル（ザルティア）", key: "α1A超選択的ユリーフ（切れ味最強だが射精障害注意）、フリバス（夜間頻尿）、ザルティア（PDE5阻害）。" },
  { rank: 20, name: "インフルエンザ", cat: "感染症", status: "partial", guideId: "c8", compId: "sec-inf", drugs: "タミフル、ゾフルーザ、イナビル、リレンザ、ラピアクタ、アセトアミノフェン", key: "【要拡充】発症48時間以内投与、単回完結（ゾフルーザ/イナビル）vs 5日間内服（タミフル）、小児異常行動注意、解熱後登校基準。" },

  // 21-40
  { rank: 21, name: "緑内障・高眼圧症", cat: "眼科" },
  { rank: 22, name: "過活動膀胱（頻尿・尿失禁）", cat: "泌尿器" },
  { rank: 23, name: "不安障害・パニック障害", cat: "精神神経" },
  { rank: 24, name: "片頭痛・緊張型頭痛", cat: "神経内科" },
  { rank: 25, name: "アレルギー性結膜炎", cat: "眼科" },
  { rank: 26, name: "新型コロナウイルス感染症（COVID-19）", cat: "感染症" },
  { rank: 27, name: "認知症（アルツハイマー型など）", cat: "精神・老年" },
  { rank: 28, name: "心房細動・不整脈", cat: "循環器" },
  { rank: 29, name: "感染性胃腸炎・急性下痢症", cat: "消化器・感染症" },
  { rank: 30, name: "白癬（水虫・爪水虫）", cat: "皮膚科" },
  { rank: 31, name: "狭心症・陳旧性心筋梗塞", cat: "循環器" },
  { rank: 32, name: "蕁麻疹（じんましん）", cat: "皮膚科・アレルギー" },
  { rank: 33, name: "月経困難症・PMS（月経前症候群）", cat: "婦人科" },
  { rank: 34, name: "尋常性ざ瘡（ニキビ）", cat: "皮膚科" },
  { rank: 35, name: "白内障（術前後管理含む）", cat: "眼科" },
  { rank: 36, name: "脳梗塞後遺症（再発予防含む）", cat: "脳神経" },
  { rank: 37, name: "鉄欠乏性貧血", cat: "血液・内科" },
  { rank: 38, name: "副鼻腔炎（ちくのう症）", cat: "耳鼻科" },
  { rank: 39, name: "めまい（メニエール病・良性発作性頭位めまい症）", cat: "耳鼻科・神経" },
  { rank: 40, name: "慢性腎臓病（CKD）", cat: "腎臓内科" },

  // 41-60
  { rank: 41, name: "歯周病・抜歯後感染予防", cat: "歯科連携" },
  { rank: 42, name: "甲状腺機能低下症（橋本病など）", cat: "内分泌" },
  { rank: 43, name: "過敏性腸症候群（IBS）", cat: "消化器" },
  { rank: 44, name: "更年期障害", cat: "婦人科" },
  { rank: 45, name: "帯状疱疹・帯状疱疹後神経痛", cat: "皮膚科・疼痛" },
  { rank: 46, name: "急性中耳炎・外耳炎", cat: "耳鼻科" },
  { rank: 47, name: "慢性閉塞性肺疾患（COPD）", cat: "呼吸器" },
  { rank: 48, name: "てんかん", cat: "脳神経" },
  { rank: 49, name: "関節リウマチ", cat: "膠原病・リウマチ" },
  { rank: 50, name: "痔核（いぼ痔・切れ痔）", cat: "肛門科" },
  { rank: 51, name: "慢性心不全", cat: "循環器" },
  { rank: 52, name: "頸肩腕症候群（肩こり・首の痛み）", cat: "整形外科" },
  { rank: 53, name: "口内炎・舌炎", cat: "口腔・耳鼻科" },
  { rank: 54, name: "膀胱炎（急性・単純性）", cat: "泌尿器・感染症" },
  { rank: 55, name: "統合失調症", cat: "精神神経" },
  { rank: 56, name: "双極性障害（躁うつ病）", cat: "精神神経" },
  { rank: 57, name: "注意欠如・多動症（ADHD）", cat: "精神・小児" },
  { rank: 58, name: "急性気管支炎・肺炎", cat: "呼吸器・感染症" },
  { rank: 59, name: "扁桃炎・咽頭炎", cat: "耳鼻科・感染症" },
  { rank: 60, name: "乾燥肌（皮脂欠乏症・乾皮症）", cat: "皮膚科" },

  // 61-80
  { rank: 61, name: "脂漏性皮膚炎", cat: "皮膚科" },
  { rank: 62, name: "虫刺され（虫刺症）", cat: "皮膚科" },
  { rank: 63, name: "単純ヘルペス（口唇・性器ヘルペス）", cat: "感染症・皮膚" },
  { rank: 64, name: "麦粒腫・霰粒腫（ものもらい）", cat: "眼科" },
  { rank: 65, name: "眼精疲労（調節機能改善）", cat: "眼科" },
  { rank: 66, name: "細菌性結膜炎（はやり目など）", cat: "眼科" },
  { rank: 67, name: "機能性ディスペプシア（胃もたれ・早期満腹感）", cat: "消化器" },
  { rank: 68, name: "潰瘍性大腸炎", cat: "消化器・IBD" },
  { rank: 69, name: "胆石症・慢性胆嚢炎", cat: "肝胆膵" },
  { rank: 70, name: "脂肪肝（MASLD/NAFLD）・慢性肝炎", cat: "肝胆膵" },
  { rank: 71, name: "甲状腺機能亢進症（バセドウ病など）", cat: "内分泌" },
  { rank: 72, name: "パーキンソン病", cat: "神経内科" },
  { rank: 73, name: "むずむず脚症候群（レストレスレッグス症候群）", cat: "神経内科" },
  { rank: 74, name: "三叉神経痛・肋間神経痛", cat: "神経内科・ペイン" },
  { rank: 75, name: "閉塞性動脈硬化症（末梢動脈疾患）", cat: "循環器・血管" },
  { rank: 76, name: "下肢静脈瘤・深部静脈血栓症", cat: "血管・循環器" },
  { rank: 77, name: "腱鞘炎・ばね指・テニス肘", cat: "整形外科" },
  { rank: 78, name: "肩関節周囲炎（五十肩・四十肩）", cat: "整形外科" },
  { rank: 79, name: "椎間板ヘルニア・脊柱管狭窄症", cat: "整形外科" },
  { rank: 80, name: "捻挫・打撲・筋肉痛（外傷）", cat: "整形外科" },

  // 81-100
  { rank: 81, name: "子宮内膜症・子宮筋腫", cat: "婦人科" },
  { rank: 82, name: "膣カンジダ症・細菌性膣症", cat: "婦人科・感染症" },
  { rank: 83, name: "不妊症（排卵誘発・ホルモン補充）", cat: "産婦人科・生殖" },
  { rank: 84, name: "勃起不全（ED）・男性更年期障害", cat: "泌尿器" },
  { rank: 85, name: "男性型脱毛症（AGA）・円形脱毛症", cat: "皮膚科" },
  { rank: 86, name: "夜尿症（おねしょ）", cat: "小児科・泌尿器" },
  { rank: 87, name: "熱性けいれん（小児）", cat: "小児科" },
  { rank: 88, name: "溶連菌感染症（A群溶血性レンサ球菌咽頭炎）", cat: "小児科・感染症" },
  { rank: 89, name: "手足口病・ヘルパンギーナ", cat: "小児科・感染症" },
  { rank: 90, name: "水痘（みずぼうそう）・伝染性軟属腫（水いぼ）", cat: "小児科・皮膚科" },
  { rank: 91, name: "伝染性膿痂疹（とびひ）", cat: "皮膚科・小児科" },
  { rank: 92, name: "尋常性乾癬", cat: "皮膚科" },
  { rank: 93, name: "掌蹠膿疱症", cat: "皮膚科" },
  { rank: 94, name: "尋常性白斑・肝斑（しみ）", cat: "皮膚科・美容" },
  { rank: 95, name: "熱傷（やけど）・日焼け", cat: "皮膚科・外傷" },
  { rank: 96, name: "褥瘡（床ずれ）", cat: "皮膚科・在宅" },
  { rank: 97, name: "乗物酔い（動揺病）", cat: "耳鼻科・OTC" },
  { rank: 98, name: "ニコチン依存症（禁煙治療）", cat: "禁煙外来" },
  { rank: 99, name: "睡眠時無呼吸症候群（SAS）", cat: "呼吸器・睡眠" },
  { rank: 100, name: "がん性疼痛・化学療法の副作用対策（制吐剤・支持療法など）", cat: "腫瘍・緩和ケア" }
];

// Generate HTML
let html = `<!-- 🏆 薬局頻出TOP100 処方箋受付ランキングナビ -->
<div id="tab-top100" class="tab-pane">
  <div class="card" style="margin-bottom:20px; background:linear-gradient(135deg, #f8fafc 0%, #fff7ed 100%); border-left:4px solid #ea580c;">
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
      <div>
        <h2 style="font-size:1.35rem; color:#9a3412; font-weight:800; margin-bottom:4px;">
          🏆 薬局対応・処方箋受付頻出疾患ランキング TOP 100 完全ナビゲーター
        </h2>
        <p style="font-size:0.88rem; color:#475569; margin:0;">
          調剤薬局の現場で遭遇する上位100疾患をランキング順に完全網羅。「20位ごと」に実装・精査を進行中！
        </p>
      </div>
      <div style="display:flex; gap:8px; align-items:center;">
        <span style="font-size:0.82rem; background:#ffedd5; color:#c2410c; padding:4px 10px; border-radius:20px; font-weight:bold; border:1px solid #fed7aa;">
          📊 第1弾（1〜20位）精査中
        </span>
      </div>
    </div>

    <!-- 20位ごとのブロック切り替えタブバー -->
    <div class="filter-bar" style="margin-top:16px; display:flex; gap:6px; flex-wrap:wrap;">
      <button class="filter-btn active" onclick="filterTop100Range('r1', this)">【第1弾】1位〜20位（超頻出・コモンディジーズ）</button>
      <button class="filter-btn" onclick="filterTop100Range('r2', this)">【第2弾】21位〜40位（感覚器・感染症・慢性疾患）</button>
      <button class="filter-btn" onclick="filterTop100Range('r3', this)">【第3弾】41位〜60位（呼吸器・精神・皮膚・局所感染）</button>
      <button class="filter-btn" onclick="filterTop100Range('r4', this)">【第4弾】61位〜80位（消化器・肝胆・整形・婦人科）</button>
      <button class="filter-btn" onclick="filterTop100Range('r5', this)">【第5弾】81位〜100位（小児・皮膚・泌尿器・専門領域）</button>
    </div>
  </div>

  <!-- 進捗ステータスサマリー（第1弾 1〜20位） -->
  <div class="top100-status-summary" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; padding:12px 16px; margin-bottom:16px; display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:12px;">
    <div style="font-size:0.9rem; font-weight:700; color:#1e293b;">
      📌 第1弾（1〜20位）作成ステータス：
      <span style="color:#16a34a; margin-left:8px;">🟢 完備（13疾患）</span>
      <span style="color:#d97706; margin-left:8px;">🟡 一部あり・要拡充（4疾患）</span>
      <span style="color:#dc2626; margin-left:8px;">🔴 未作成・要新設（3疾患）</span>
    </div>
    <div style="font-size:0.8rem; color:#64748b;">
      ※各カードのボタンから該当ガイド・同効薬比較へ直行できます
    </div>
  </div>

  <!-- ランキングコンテンツコンテナ -->
  <div class="top100-container">
`;

// Range 1: 1-20
html += `    <!-- ==================== RANGE 1: 1〜20位 ==================== -->\n    <div id="top100-range-r1" class="top100-range-pane active">\n      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:14px;">\n`;

top100Data.slice(0, 20).forEach(item => {
  let badgeHtml = '';
  let borderStyle = '';
  if (item.status === 'ok') {
    badgeHtml = '<span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>';
    borderStyle = 'border-left: 4px solid #16a34a;';
  } else if (item.status === 'partial') {
    badgeHtml = '<span style="background:#fef3c7; color:#b45309; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #fde68a;">🟡 一部あり・要拡充</span>';
    borderStyle = 'border-left: 4px solid #d97706;';
  } else {
    badgeHtml = '<span style="background:#fee2e2; color:#b91c1c; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #fecaca;">🔴 未作成・要新設</span>';
    borderStyle = 'border-left: 4px solid #dc2626;';
  }

  let rankBadge = '';
  if (item.rank === 1) rankBadge = '<span style="background:#fbbf24; color:#78350f; font-weight:900; padding:2px 8px; border-radius:4px; font-size:0.85rem;">🥇 1位</span>';
  else if (item.rank === 2) rankBadge = '<span style="background:#94a3b8; color:#0f172a; font-weight:900; padding:2px 8px; border-radius:4px; font-size:0.85rem;">🥈 2位</span>';
  else if (item.rank === 3) rankBadge = '<span style="background:#d97706; color:#ffffff; font-weight:900; padding:2px 8px; border-radius:4px; font-size:0.85rem;">🥉 3位</span>';
  else rankBadge = `<span style="background:#f1f5f9; color:#334155; font-weight:bold; padding:2px 8px; border-radius:4px; font-size:0.82rem;">${item.rank}位</span>`;

  let jumpBtns = '';
  if (item.guideId) {
    jumpBtns += `<button class="dict-jump-btn" onclick="jumpToGuide('${item.guideId}')">📘 ガイド</button>`;
  }
  if (item.compId) {
    jumpBtns += `<button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', '${item.compId}')">⚔️ 比較</button>`;
  }
  jumpBtns += `<button class="dict-jump-btn" onclick="quickSearch('${item.name.split('（')[0]}')">🔍 検索</button>`;

  html += `        <div class="card" style="margin:0; padding:14px; ${borderStyle} background:#ffffff;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              ${rankBadge}
              <h3 style="margin:0; font-size:1.05rem; color:#0f172a; font-weight:800;">${item.name}</h3>
            </div>
            ${badgeHtml}
          </div>
          <div style="font-size:0.78rem; color:#64748b; margin-bottom:6px;">分類：<strong>${item.cat}</strong></div>
          <div style="font-size:0.84rem; color:#1e293b; background:#f8fafc; padding:6px 10px; border-radius:4px; margin-bottom:8px; line-height:1.4;">
            <strong>💊 代表薬：</strong> ${item.drugs}
          </div>
          <div style="font-size:0.82rem; color:#334155; line-height:1.45; margin-bottom:10px;">
            <strong>🎯 鑑査・服薬指導の急所：</strong><br>${item.key}
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; border-top:1px dashed #e2e8f0; padding-top:8px;">
            ${jumpBtns}
          </div>
        </div>\n`;
});

html += `      </div>\n    </div>\n\n`;

// Helper for Range 2 to 5
const ranges = [
  { id: 'r2', title: '【第2弾】21位〜40位（感覚器・感染症・慢性疾患）', start: 20, end: 40 },
  { id: 'r3', title: '【第3弾】41位〜60位（呼吸器・精神・皮膚・局所感染）', start: 40, end: 60 },
  { id: 'r4', title: '【第4弾】61位〜80位（消化器・肝胆・整形・婦人科）', start: 60, end: 80 },
  { id: 'r5', title: '【第5弾】81位〜100位（小児・皮膚・泌尿器・専門領域）', start: 80, end: 100 }
];

ranges.forEach(r => {
  html += `    <!-- ==================== ${r.title} ==================== -->\n    <div id="top100-range-${r.id}" class="top100-range-pane" style="display:none;">\n      <div style="background:#fffbeb; border:1px solid #fef3c7; border-radius:6px; padding:10px 14px; margin-bottom:14px; font-size:0.88rem; color:#92400e;">\n        ⏳ <strong>第1弾（1〜20位）完了後に順次作成・精査予定のエリアです。</strong> 各疾患のクリックで検索や関連ガイドを確認できます。\n      </div>\n      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:10px;">\n`;

  top100Data.slice(r.start, r.end).forEach(item => {
    html += `        <div class="card" style="margin:0; padding:10px 12px; border-left:3px solid #cbd5e1; background:#ffffff; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <span style="background:#f1f5f9; color:#475569; font-weight:bold; padding:2px 6px; border-radius:4px; font-size:0.75rem; margin-right:6px;">${item.rank}位</span>
            <strong style="color:#0f172a; font-size:0.92rem;">${item.name}</strong>
            <div style="font-size:0.75rem; color:#64748b; margin-top:2px;">分類：${item.cat}</div>
          </div>
          <button class="dict-jump-btn" onclick="quickSearch('${item.name.split('（')[0]}')" style="padding:4px 8px; font-size:0.75rem;">🔍 検索</button>
        </div>\n`;
  });

  html += `      </div>\n    </div>\n\n`;
});

html += `  </div>\n</div>\n`;

// Write to src/16_top100.html
const pTop100 = path.join(__dirname, '..', '16_top100.html');
fs.writeFileSync(pTop100, html, 'utf8');
console.log('Successfully wrote src/16_top100.html!');
