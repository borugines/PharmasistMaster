const fs = require('fs');

const dictData = [
  // ================= 🏥 疾患名インデックス =================
  {
    type: 'dis',
    name: '悪性腫瘍（がん全般・支持療法）',
    kana: 'あ',
    sub: 'Oncology / 緩和ケア・催吐管理',
    desc: '抗がん薬の殺細胞性・分子標的・免疫チェックポイント。高度催吐性レジメン（HEC）の4剤先手必勝制吐療法、WHO方式3段階除痛ラダー。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c1')" },
      { text: '⚔️ 同効薬比較', action: "jumpToComp('sec-onc')" },
      { text: '🎓 問いかけ', action: "jumpToAnswer('ans-q1')" }
    ]
  },
  {
    type: 'dis',
    name: 'アトピー性皮膚炎',
    kana: 'あ',
    sub: 'Dermatology / 皮膚バリア機能障害',
    desc: '急性増悪期のステロイド外用薬（5段階ランク・FTU厳守）から、ツルツル寛解後の非ステロイド外用JAK（コレクチム）/PDE4（モイゼルト）プロアクティブ維持療法へ。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c16')" },
      { text: '🚀 新薬トレンド', action: "jumpToSpecialTab('tab-newdrugs', 't-derm')" },
      { text: '🕵️ 鑑別処方', action: "jumpToProfiling('pro-d16')" }
    ]
  },
  {
    type: 'dis',
    name: 'アレルギー性鼻炎・花粉症',
    kana: 'あ',
    sub: 'Allergy / Ⅰ型アレルギー',
    desc: '第2世代抗ヒスタミン薬（非鎮静性ビラノア・デザレックス等）や点鼻ステロイド。鼻閉に抗ロイコトリエン薬（モンテルカスト）。小青竜湯の適応。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c7')" },
      { text: '🛠️ 漢方チート', action: "jumpToSpecialTab('tab-special', 'sec-kampo')" },
      { text: '🛒 OTC推奨', action: "jumpToSpecialTab('tab-otc', 'o-simple')" }
    ]
  },
  {
    type: 'dis',
    name: '胃食道逆流症（GERD）',
    kana: 'い',
    sub: 'Gastrointestinal / 消化性潰瘍',
    desc: 'P-CAB（タケキャブ 20mg）による速効粘膜治癒。維持療法10mgへのステップダウン。PPI漫然投与リスクと骨粗鬆症。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c11')" },
      { text: '⚔️ 同効薬比較', action: "jumpToComp('sec-extra')" }
    ]
  },
  {
    type: 'dis',
    name: '潰瘍性大腸炎（IBD）',
    kana: 'か',
    sub: 'Gastrointestinal / 炎症性腸疾患',
    desc: '大腸粘膜の慢性炎症。5-ASA製剤（リアルダ、ペンタサ、アサコール）の放出設計の違い。開始2週間の5-ASAアレルギー（発熱・下痢悪化）に注意。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c11')" },
      { text: '⚔️ 同効薬比較', action: "jumpToComp('sec-extra')" }
    ]
  },
  {
    type: 'dis',
    name: '関節リウマチ（RA）',
    kana: 'か',
    sub: 'Immunology / 自己免疫疾患',
    desc: '骨破壊を防ぐアンカードラッグのメトトレキサート（MTX：週1〜2日服用）。効果不十分時のバイオ製剤（TNF阻害等）やJAK阻害薬。フォリアミン救援。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c7')" },
      { text: '⚔️ 同効薬比較', action: "jumpToComp('sec-imm')" }
    ]
  },
  {
    type: 'dis',
    name: '気管支喘息',
    kana: 'き',
    sub: 'Respiratory / 気道慢性炎症',
    desc: '長期管理薬（コントローラー）としてのICS/LABA配合剤（レルベア、シムビコート）。発作時頓用SMART療法。アスピリン喘息とβ遮断薬禁忌。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c7')" },
      { text: '⚔️ 同効薬比較', action: "jumpToComp('sec-imm')" }
    ]
  },
  {
    type: 'dis',
    name: '狭心症・虚血性心疾患',
    kana: 'き',
    sub: 'Cardiology / 冠動脈狭窄',
    desc: '労作性狭心症にはβ遮断薬・硝酸薬・Ca拮抗薬。冠攣縮性（異型）狭心症にはCa拮抗薬が第一選択（β遮断薬単独は冠攣縮誘発禁忌）。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c4')" },
      { text: '⚔️ 同効薬比較', action: "jumpToComp('sec-cv')" }
    ]
  },
  {
    type: 'dis',
    name: '高血圧症（本態性・早朝・拡張期）',
    kana: 'こ',
    sub: 'Hypertension / JSH2025/2024最新',
    desc: '降圧目標130/80（75歳以上140/90）。ARB＋CCBの早期合剤戦略。若年下高血圧（シルニジピン/β遮断）、早朝高血圧（カルデナリン/エンレスト）、治療抵抗性MRA（ミネブロ）。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c2')" },
      { text: '⚔️ 同効薬比較', action: "jumpToComp('sec-ht')" },
      { text: '🎓 問いかけ', action: "jumpToAnswer('ans-q2')" }
    ]
  },
  {
    type: 'dis',
    name: '骨粗鬆症',
    kana: 'こ',
    sub: 'Bone & Metabolic / 骨折予防',
    desc: '骨折予防のBP製剤（アレンドロン酸：起床時水1杯30分横臥不可）。重症例のプラリア（半年1回＋デノタス）やテリパラチド。活性型VitD3（エディロール）。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c10')" },
      { text: '⚔️ 同効薬比較', action: "jumpToComp('sec-ckd')" },
      { text: '🎓 問いかけ', action: "jumpToAnswer('ans-q10')" }
    ]
  },
  {
    type: 'dis',
    name: '脂質異常症',
    kana: 'し',
    sub: 'Metabolic / 動脈硬化予防',
    desc: '冠動脈二次予防LDL<70目標。ストロングスタチン（ロスバスタチン/アトルバスタチン）第一選択。ゼチーア併用、高TG血症のペマフィブラート（パルモディア）。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c10')" },
      { text: '⚔️ 同効薬比較', action: "jumpToComp('sec-ckd')" }
    ]
  },
  {
    type: 'dis',
    name: '心不全（HFrEF / HFpEF）',
    kana: 'し',
    sub: 'Cardiology / 心機能不全',
    desc: 'HFrEFの生命予後改善4本柱（The Fantastic Four：ARNIエンレスト、SGLT2阻害薬、β遮断薬、MRA）。うっ血浮腫にループ利尿薬・水利尿薬サムスカ。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c4')" },
      { text: '⚔️ 同効薬比較', action: "jumpToComp('sec-cv')" },
      { text: '🎓 問いかけ', action: "jumpToAnswer('ans-q4')" }
    ]
  },
  {
    type: 'dis',
    name: '前立腺肥大症（BPH）',
    kana: 'せ',
    sub: 'Urology / 排尿障害',
    desc: '尿道狭窄（排尿困難）にα1遮断薬（タムスロシン/シロドシン）。前立腺腫大（>30mL）に5α還元酵素阻害薬（デュタステリド：PSA半減）。過活動膀胱のβ3作動薬。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c9')" },
      { text: '⚔️ 同効薬比較', action: "jumpToComp('sec-ckd')" }
    ]
  },
  {
    type: 'dis',
    name: '糖尿病（2型糖尿病・肥満症）',
    kana: 'と',
    sub: 'Endocrinology / JDS2024最新',
    desc: '心腎保護優先の新潮流。メトホルミン基幹、心不全・CKDにSGLT2阻害薬、肥満・ASCVDにマンジャロ/オゼンピック。高齢・腎不全に胆汁排泄型DPP-4。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c3')" },
      { text: '⚔️ 同効薬比較', action: "jumpToComp('sec-dm')" },
      { text: '🚀 新薬トレンド', action: "jumpToSpecialTab('tab-newdrugs', 't-meta')" }
    ]
  },
  {
    type: 'dis',
    name: '脳梗塞（急性期・再発予防）',
    kana: 'の',
    sub: 'Cerebrovascular / 脳卒中',
    desc: '心房細動による心原性脳塞栓症には抗凝固薬（DOAC）。アテローム/ラクナには抗血小板薬（バイアスピリン/クロピドグレル/シロスタゾール）。ACE阻害薬の誤嚥性肺炎予防。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c5')" },
      { text: '⚔️ 同効薬比較', action: "jumpToComp('sec-cv')" }
    ]
  },
  {
    type: 'dis',
    name: 'バセドウ病（甲状腺機能亢進症）',
    kana: 'は',
    sub: 'Endocrinology / 自己免疫',
    desc: '甲状腺ホルモン過剰分泌。メルカゾール（チアマゾール）第一選択。開始2ヶ月間の「発熱＋咽頭痛」は致死的無顆粒球症を疑い市販風邪薬禁止！',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c13')" },
      { text: '🕵️ 鑑別処方', action: "jumpToProfiling('pro-d13')" }
    ]
  },
  {
    type: 'dis',
    name: '橋本病（甲状腺機能低下症）',
    kana: 'は',
    sub: 'Endocrinology / ホルモン補充',
    desc: 'チラーヂンS（レボチロキシン）補充。高齢者・虚血性心疾患合併例は12.5〜25μgの超少量から漸増。鉄・Mg・Caとの同時服用キレート吸収阻害。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c13')" },
      { text: '🎓 問いかけ', action: "jumpToAnswer('ans-q13')" }
    ]
  },
  {
    type: 'dis',
    name: '慢性腎臓病（CKD）',
    kana: 'ま',
    sub: 'Nephrology / 腎保護',
    desc: '蛋白尿抑制のためのARB/ACE-I。SGLT2阻害薬（フォシーガ）、非ステロイド型MRA（ケレンディア）。Triple Whammy（NSAIDs併用）による急性腎不全回避。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c9')" },
      { text: '⚔️ 同効薬比較', action: "jumpToComp('sec-ckd')" }
    ]
  },
  {
    type: 'dis',
    name: '慢性便秘症',
    kana: 'ま',
    sub: 'Gastrointestinal / 排便障害',
    desc: '浸透圧性下剤（酸化Mg、モビコール）から、上皮機能変容薬（アミティーザ食後、リンゼス食前、グーフィス食前）へのステップアップ。酸化Mg漫然投与の高Mg血症警戒。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c11')" },
      { text: '⚔️ 同効薬比較', action: "jumpToComp('sec-extra')" },
      { text: '🎓 問いかけ', action: "jumpToAnswer('ans-q11')" }
    ]
  },
  {
    type: 'dis',
    name: '緑内障（開放隅角・閉塞隅角）',
    kana: 'り',
    sub: 'Ophthalmology / 視野障害',
    desc: '開放隅角第一選択：PG関連点眼薬（キサラタン、タプロス：入浴前点眼）。β遮断点眼（チモプトール）の喘息禁忌。閉塞隅角緑内障に対する抗コリン薬絶対禁忌。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c14')" },
      { text: '🕵️ 鑑別処方', action: "jumpToProfiling('pro-d14')" },
      { text: '🎓 問いかけ', action: "jumpToAnswer('ans-q14')" }
    ]
  },

  // ================= 💊 薬品名インデックス =================
  {
    type: 'drug',
    name: 'アジルバ錠',
    kana: 'あ',
    sub: 'アジルサルタン / ARB',
    desc: 'ARB 7兄弟の中で降圧パワー最強の横綱。アムロジピンとの配合剤「ザクラス」も頻出。夏場の過度な血圧低下に注意。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c2')" },
      { text: '⚔️ 同効薬比較', action: "jumpToComp('sec-ht')" },
      { text: '📋 詳細', action: "showDrugByName('アジルバ')" }
    ]
  },
  {
    type: 'drug',
    name: 'アテレック錠',
    kana: 'あ',
    sub: 'シルニジピン / L/N型Ca拮抗薬',
    desc: 'N型Caチャネル遮断で交感神経を鎮める。アムロジピンで足がむくんだ患者の切り替え先No.1！若年・下の血圧が高い拡張期高血圧にも最適。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c2')" },
      { text: '⚔️ 同効薬比較', action: "jumpToComp('sec-ht')" },
      { text: '📋 詳細', action: "showDrugByName('アテレック')" }
    ]
  },
  {
    type: 'drug',
    name: 'アンテベート軟膏',
    kana: 'あ',
    sub: 'ベタメタゾン酪酸エステルプロピオン酸 / TCS',
    desc: 'ベリーストロング（Ⅱ群）ステロイド外用薬。体幹・手足の強い皮膚炎を一気に消火。FTU（フィンガーチップユニット）を遵守。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c16')" },
      { text: '🕵️ 鑑別処方', action: "jumpToProfiling('pro-d16')" },
      { text: '📋 詳細', action: "showDrugByName('アンテベート')" }
    ]
  },
  {
    type: 'drug',
    name: 'アンヒバ坐薬 / アルピニー',
    kana: 'あ',
    sub: 'アセトアミノフェン坐薬',
    desc: '小児の発熱・痛みの第一選択坐薬（10〜15mg/kg）。水溶性基剤。ダイアップ坐薬（油性）と併用時は必ず30分以上あけて使用！',
    links: [
      { text: '🛠️ 小児チート', action: "jumpToSpecialTab('tab-special', 'sec-peds')" },
      { text: '📋 詳細', action: "showDrugByName('アンヒバ')" }
    ]
  },
  {
    type: 'drug',
    name: 'エンレスト錠',
    kana: 'え',
    sub: 'サクビトリルバルサルタン / ARNI',
    desc: '心不全4本柱筆頭 兼 本態性高血圧治療薬。ARBを超える降圧と心腎保護。ACE阻害薬からの切り替えは血管浮腫防止のため36時間休薬！',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c4')" },
      { text: '⚔️ 同効薬比較', action: "jumpToComp('sec-ht')" },
      { text: '🚀 新薬トレンド', action: "jumpToSpecialTab('tab-newdrugs', 't-meta')" }
    ]
  },
  {
    type: 'drug',
    name: 'オゼンピック / ウゴービ',
    kana: 'お',
    sub: 'セマグルチド / GLP-1受容体作動薬',
    desc: '週1回皮下注。オゼンピックは2型糖尿病、ウゴービは高用量で肥満症治療薬。中枢性食欲抑制と心血管保護。悪心・嘔吐等の消化器症状に注意。',
    links: [
      { text: '🚀 新薬トレンド', action: "jumpToSpecialTab('tab-newdrugs', 't-meta')" },
      { text: '⚔️ 同効薬比較', action: "jumpToComp('sec-dm')" },
      { text: '📋 詳細', action: "showDrugByName('ウゴービ')" }
    ]
  },
  {
    type: 'drug',
    name: 'ケレンディア錠',
    kana: 'け',
    sub: 'フィネレノン / 非ステロイド型選択的MRA',
    desc: '2型糖尿病を合併するCKDの心腎を守る新薬。アルブミン尿を有意に減少。高K血症（K≧5.5中断）、eGFR<25禁忌。CYP3A4阻害薬併用注意。',
    links: [
      { text: '🚀 新薬トレンド', action: "jumpToSpecialTab('tab-newdrugs', 't-meta')" },
      { text: '📘 疾患ガイド', action: "jumpToGuide('c9')" },
      { text: '📋 詳細', action: "showDrugByName('ケレンディア')" }
    ]
  },
  {
    type: 'drug',
    name: 'コレクチム軟膏 / モイゼルト',
    kana: 'こ',
    sub: 'デルゴシチニブ / ジファミラスト',
    desc: 'アトピー性皮膚炎の新世代非ステロイド外用薬（外用JAK / 外用PDE4）。ステロイドのような皮膚萎縮を起こさず、顔面・頸部のプロアクティブ維持に最適。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c16')" },
      { text: '🚀 新薬トレンド', action: "jumpToSpecialTab('tab-newdrugs', 't-derm')" },
      { text: '🕵️ 鑑別処方', action: "jumpToProfiling('pro-d16')" }
    ]
  },
  {
    type: 'drug',
    name: 'クービビック錠',
    kana: 'く',
    sub: 'ダリドレキサント / デュアルオレキシン拮抗薬',
    desc: '不眠症の新世代治療薬。覚醒物質オレキシンをブロック。半減期が約8時間と短めで、翌朝への持ち越し眠気・ふらつきが最も少ない。CYP3A4阻害併用注意。',
    links: [
      { text: '🚀 新薬トレンド', action: "jumpToSpecialTab('tab-newdrugs', 't-neuro')" },
      { text: '📘 疾患ガイド', action: "jumpToGuide('c6')" },
      { text: '📋 詳細', action: "showDrugByName('クービビック')" }
    ]
  },
  {
    type: 'drug',
    name: 'サムスカ錠 / 顆粒',
    kana: 'さ',
    sub: 'トルバプタン / V2受容体拮抗薬（水利尿薬）',
    desc: '電解質を捨てずに水分だけを絞り出す利尿薬。ループ利尿薬でNaが下がって引けない難治性浮腫・肝性腹水に劇的効果。急激な血清Na上昇に注意。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c4')" },
      { text: '⚔️ 同効薬比較', action: "jumpToComp('sec-ckd')" },
      { text: '📋 詳細', action: "showDrugByName('サムスカ')" }
    ]
  },
  {
    type: 'drug',
    name: 'タケキャブ錠',
    kana: 'た',
    sub: 'ボノプラザン / P-CAB',
    desc: 'カリウムイオン競合型アシッドブロッカー。初回服用から強力に胃酸を抑え、GERD・潰瘍・ピロリ除菌で圧倒的除菌率を誇る。酸性環境必要な酸化Mgと相性注意。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c11')" },
      { text: '⚔️ 同効薬比較', action: "jumpToComp('sec-extra')" }
    ]
  },
  {
    type: 'drug',
    name: 'タリージェ錠',
    kana: 'た',
    sub: 'ミロガバリン / Caチャネルα2δリガンド',
    desc: '神経障害性疼痛（坐骨神経痛・しびれ）の主力薬。α2δ-1サブユニットへの選択性が高い。100%腎排泄のためeGFRで減量。就寝前少量開始でふらつき防止。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c12')" },
      { text: '⚔️ 同効薬比較', action: "jumpToComp('sec-extra')" },
      { text: '📋 詳細', action: "showDrugByName('タリージェ')" }
    ]
  },
  {
    type: 'drug',
    name: 'ダイアップ坐薬',
    kana: 'た',
    sub: 'ジアゼパム坐薬',
    desc: '小児熱性けいれん予防坐薬。37.5℃以上の発熱時に1回目、8時間後に2回目使用。油性基剤。アンヒバ等の水性解熱坐薬とは必ず30分以上間隔をあける！',
    links: [
      { text: '🛠️ 小児チート', action: "jumpToSpecialTab('tab-special', 'sec-peds')" },
      { text: '📋 詳細', action: "showDrugByName('ダイアップ')" }
    ]
  },
  {
    type: 'drug',
    name: 'チラーヂンS錠',
    kana: 'ち',
    sub: 'レボチロキシン / 甲状腺ホルモン製剤',
    desc: '橋本病のホルモン補充。高齢者・虚血性心疾患は12.5〜25μgの超少量から開始。鉄剤・酸化Mg・カルシウム製剤と同時服用でキレートを作り吸収激減！',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c13')" },
      { text: '🎓 問いかけ', action: "jumpToAnswer('ans-q13')" },
      { text: '📋 詳細', action: "showDrugByName('チラーヂンS')" }
    ]
  },
  {
    type: 'drug',
    name: 'ツイミーグ錠',
    kana: 'つ',
    sub: 'イメグリミン / ミトコンドリア機能改善薬',
    desc: '糖尿病の全新薬。ミトコンドリア呼吸鎖複合体Ⅰを調節し、インスリン分泌と抵抗性を両面改善。メトホルミンと構造類似だが乳酸アシドーシス頻度低い。',
    links: [
      { text: '🚀 新薬トレンド', action: "jumpToSpecialTab('tab-newdrugs', 't-meta')" },
      { text: '📘 疾患ガイド', action: "jumpToGuide('c3')" },
      { text: '📋 詳細', action: "showDrugByName('ツイミーグ')" }
    ]
  },
  {
    type: 'drug',
    name: 'デュピクセント皮下注',
    kana: 'て',
    sub: 'デュピルマブ / 抗IL-4/13抗体',
    desc: 'アトピー性皮膚炎・気管支喘息のバイオ製剤。Type2炎症を元から遮断し痒み・紅斑を劇的改善。初回2本、以後2週に1回自己注射。冷蔵保存。結膜炎注意。',
    links: [
      { text: '🚀 新薬トレンド', action: "jumpToSpecialTab('tab-newdrugs', 't-derm')" },
      { text: '📘 疾患ガイド', action: "jumpToGuide('c16')" },
      { text: '📋 詳細', action: "showDrugByName('デュピクセント')" }
    ]
  },
  {
    type: 'drug',
    name: 'パキロビッドパック',
    kana: 'は',
    sub: 'ニルマトレルビル・リトナビル / COVID-19',
    desc: '重症化リスクの高いコロナ患者用抗ウイルス薬。リトナビルの超強力CYP3A阻害により数十種の日常薬（スタチン、DOAC、睡眠薬、降圧薬等）と併用禁忌！',
    links: [
      { text: '🚀 新薬トレンド', action: "jumpToSpecialTab('tab-newdrugs', 't-other')" },
      { text: '📋 詳細', action: "showDrugByName('パキロビッド')" }
    ]
  },
  {
    type: 'drug',
    name: 'フォシーガ錠 / ジャディアンス',
    kana: 'ふ',
    sub: 'ダパグリフロジン / エンパグリフロジン / SGLT2阻害薬',
    desc: '糖尿病・慢性心不全・CKDの3冠王。心腎保護目的では血糖正常でも10mg固定。正常血糖ケトアシドーシス、尿路感染症、脱水、手術前3日休薬に注意。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c3')" },
      { text: '⚔️ 同効薬比較', action: "jumpToComp('sec-dm')" },
      { text: '📋 詳細', action: "showDrugByName('フォシーガ')" }
    ]
  },
  {
    type: 'drug',
    name: 'マンジャロ皮下注',
    kana: 'ま',
    sub: 'チルゼパチド / GIP/GLP-1受容体作動薬',
    desc: '世界初の持続性GIP/GLP-1デュアルアゴニスト。圧倒的なHbA1c低下と体重減少効果。週1回2.5mgから開始し4週間後に5mgへ増量。高齢者のサルコペニア・胆石症注意。',
    links: [
      { text: '🚀 新薬トレンド', action: "jumpToSpecialTab('tab-newdrugs', 't-meta')" },
      { text: '📘 疾患ガイド', action: "jumpToGuide('c3')" },
      { text: '📋 詳細', action: "showDrugByName('マンジャロ')" }
    ]
  },
  {
    type: 'drug',
    name: 'メルカゾール錠',
    kana: 'め',
    sub: 'チアマゾール / 抗甲状腺薬',
    desc: 'バセドウ病の第一選択薬。開始2ヶ月以内の「38℃以上の発熱＋のどの痛み」は致死的な無顆粒球症のサイン！絶対に市販の風邪薬で様子見させず即血液検査！',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c13')" },
      { text: '🕵️ 鑑別処方', action: "jumpToProfiling('pro-d13')" },
      { text: '📋 詳細', action: "showDrugByName('メルカゾール')" }
    ]
  },
  {
    type: 'drug',
    name: 'メトグルコ錠',
    kana: 'め',
    sub: 'メトホルミン / ビグアナイド薬',
    desc: '肥満2型糖尿病の基幹薬。ヨード造影剤検査の前後48時間は乳酸アシドーシス予防のため休薬！eGFR<30禁忌、発熱・脱水シックデイ休薬が鉄則。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c3')" },
      { text: '⚔️ 同効薬比較', action: "jumpToComp('sec-dm')" },
      { text: '🎓 問いかけ', action: "jumpToAnswer('ans-q3')" }
    ]
  },
  {
    type: 'drug',
    name: 'レルミナ錠',
    kana: 'れ',
    sub: 'レルゴリクス / 経口GnRHアンタゴニスト',
    desc: '子宮筋腫・内膜症の出血と痛みを止める新薬。食後だと吸収率激減のため必ず「食前服用」！エストロゲン低下による更年期様症状や骨密度低下に注意（原則6ヶ月）。',
    links: [
      { text: '🚀 新薬トレンド', action: "jumpToSpecialTab('tab-newdrugs', 't-other')" },
      { text: '📘 疾患ガイド', action: "jumpToGuide('c13')" },
      { text: '📋 詳細', action: "showDrugByName('レルミナ')" }
    ]
  },

  // ================= 🎯 キーワード・ピットフォール =================
  {
    type: 'key',
    name: '足のむくみ（CCB浮腫 vs 心不全）',
    kana: 'あ',
    sub: '鑑別・処方提案',
    desc: 'Ca拮抗薬による浮腫は蛇口（動脈）拡張による漏れのため利尿薬は無効！ARB併用かシルニジピン変更が正解。心不全浮腫は体重増加と息切れを伴い利尿薬が奏効。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c2')" },
      { text: '🎓 問いかけ', action: "jumpToAnswer('ans-q2')" }
    ]
  },
  {
    type: 'key',
    name: '下の血圧が高い（拡張期高血圧）',
    kana: 'し',
    sub: '若年・中年病態',
    desc: '末梢血管抵抗（TPR）の増大が主因。交感神経を刺激しないシルニジピン（アテレック）やARB、頻脈合併ならβ遮断薬。減量・節酒・睡眠改善が特効薬。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c2')" },
      { text: '🎓 問いかけ', action: "jumpToAnswer('ans-q2')" }
    ]
  },
  {
    type: 'key',
    name: 'シックデイ（Sick Day）ルール',
    kana: 'し',
    sub: '糖尿病・救急指導',
    desc: '発熱・下痢・嘔吐・食事が摂れない時は「SGLT2阻害薬（正常血糖ケトアシドーシス）」と「メトホルミン（乳酸アシドーシス）」を直ちに休薬！水分補給の徹底。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c3')" },
      { text: '🛠️ 休薬タイムライン', action: "jumpToSpecialTab('tab-special', 'sec-surg')" }
    ]
  },
  {
    type: 'key',
    name: 'キレート形成（多価金属イオン相互作用）',
    kana: 'き',
    sub: '相互作用・服薬間隔',
    desc: 'ニューキノロン、テトラサイクリン、チラーヂンS等は、マグミット（Mg）、鉄剤（Fe）、胃薬（Al）、牛乳（Ca）と合体して吸収ゼロに。必ず2時間以上空ける！',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c8')" },
      { text: '🛠️ 相互作用NG集', action: "jumpToSpecialTab('tab-special', 'sec-ng')" }
    ]
  },
  {
    type: 'key',
    name: 'FTU（フィンガーチップユニット）',
    kana: 'ふ',
    sub: '外用薬塗布量基準',
    desc: '人差し指の先端〜第1関節（約0.5g）＝大人の手のひら2枚分。「薄く伸ばす」は効果不十分で逆効果！「ティッシュがペタッと付く程度」乗せるのが正解。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c16')" },
      { text: '🎓 問いかけ', action: "jumpToAnswer('ans-q16')" }
    ]
  },
  {
    type: 'key',
    name: 'Triple Whammy（急性腎障害トリオ）',
    kana: 'と',
    sub: '危険な処方監査',
    desc: '「ARB/ACE-I（輸出細動脈拡張） ＋ 利尿薬（脱水・循環血液量減少） ＋ NSAIDs（輸入細動脈収縮）」の3剤併用で糸球体濾過圧がゼロになり急性腎不全ショック！',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c9')" },
      { text: '🛒 地雷市販薬', action: "jumpToSpecialTab('tab-otc', 'o-disease')" }
    ]
  },
  {
    type: 'key',
    name: '36時間休薬ルール（ACE-I ➔ ARNI）',
    kana: 'さ',
    sub: '血管浮腫防止',
    desc: 'ACE阻害薬とエンレスト（サクビトリル）はどちらもブラジキニン分解を阻害するため、同時併用や直後切り替えで致死的な血管浮腫を起こす！丸1日半（36h）空ける。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c2')" },
      { text: '📘 疾患ガイド', action: "jumpToGuide('c4')" }
    ]
  },
  {
    type: 'key',
    name: 'プロアクティブ療法（アトピー）',
    kana: 'ふ',
    sub: '再燃予防維持管理',
    desc: '皮疹寛解後も「週2回定期的にコレクチムやモイゼルト、タクロリムスを塗り、普段は保湿剤で蓋をする」ことで火の粉の見張りを続け、年単位の再燃ゼロを達成する。',
    links: [
      { text: '📘 疾患ガイド', action: "jumpToGuide('c16')" },
      { text: '🎓 問いかけ', action: "jumpToAnswer('ans-q16')" }
    ]
  }
];

// カードHTMLの生成
function renderCard(item) {
  let badgeClass = 'dict-badge-dis';
  let badgeText = '🏥 疾患';
  if (item.type === 'drug') {
    badgeClass = 'dict-badge-drug';
    badgeText = '💊 薬品';
  } else if (item.type === 'key') {
    badgeClass = 'dict-badge-key';
    badgeText = '🎯 用語・注意';
  }

  const linkBtns = item.links.map(l => 
    `<button class="dict-jump-btn" onclick="${l.action}">${l.text}</button>`
  ).join('');

  return `
    <div class="dict-card" data-type="${item.type}" data-kana="${item.kana}" data-name="${item.name.toLowerCase()}" data-desc="${item.desc.toLowerCase()}">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">${item.name}</h3>
          <span class="dict-badge ${badgeClass}">${badgeText}</span>
        </div>
        <div class="dict-card-sub">${item.sub}</div>
        <div class="dict-card-desc">${item.desc}</div>
      </div>
      <div class="dict-card-footer">
        ${linkBtns}
      </div>
    </div>
  `;
}

const cardsHtml = dictData.map(renderCard).join('\n');

const tabHtml = `<!-- 臨床インデックス辞書 タブペイン -->
<div id="tab-dict" class="tab-pane">
  <div class="dict-layout">
    
    <div class="card" style="margin-bottom:0; background:linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); color:white; border-left:4px solid #38bdf8;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <div>
          <h2 style="font-size:1.35rem; color:#7dd3fc; font-weight:800; margin-bottom:4px;">📚 疾患名・薬品名・重要キーワード 臨床総合インデックス辞書</h2>
          <p style="font-size:0.88rem; color:#cbd5e1; margin:0;">
            「気になる疾患や薬からダイレクトに解説へ飛びたい」「現場用語の定義と注意点を即座に引く」ための高速クロスリファレンス辞書です。
          </p>
        </div>
        <div>
          <button class="header-print-btn" onclick="window.print()" style="padding:7px 14px; font-size:0.85rem; background:#10b981;">🖨️ A4で印刷</button>
        </div>
      </div>

      <!-- 絞り込みコントロール -->
      <div style="margin-top:16px;">
        <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
          <input type="text" id="dictSearchInput" class="search-input" placeholder="🔍 疾患名・薬品名・キーワードでリアルタイム検索 (例: 高血圧, アムロジピン, むくみ, FTU)" oninput="filterDictSearch(this.value)" style="padding:9px 14px; border:1px solid #cbd5e1; border-radius:6px; font-size:0.9rem; flex:1; min-width:260px; color:#1e293b; background:white;">
          <button class="dict-btn active" onclick="filterDict('all', this)">すべて表示</button>
          <button class="dict-btn" onclick="filterDict('dis', this)">🏥 疾患名</button>
          <button class="dict-btn" onclick="filterDict('drug', this)">💊 薬品名</button>
          <button class="dict-btn" onclick="filterDict('key', this)">🎯 用語・注意</button>
        </div>

        <!-- 五十音クイックバー -->
        <div class="dict-kana-bar" style="border-top-color:rgba(255,255,255,0.2);">
          <span style="font-size:0.75rem; color:#94a3b8; align-self:center; margin-right:4px;">五十音：</span>
          <button class="kana-btn" onclick="filterDictKana('all')">全</button>
          <button class="kana-btn" onclick="filterDictKana('あ')">あ行</button>
          <button class="kana-btn" onclick="filterDictKana('か')">か行</button>
          <button class="kana-btn" onclick="filterDictKana('さ')">さ行</button>
          <button class="kana-btn" onclick="filterDictKana('た')">た行</button>
          <button class="kana-btn" onclick="filterDictKana('な')">な行</button>
          <button class="kana-btn" onclick="filterDictKana('は')">は行</button>
          <button class="kana-btn" onclick="filterDictKana('ま')">ま行</button>
          <button class="kana-btn" onclick="filterDictKana('や')">や行</button>
          <button class="kana-btn" onclick="filterDictKana('ら')">ら行</button>
          <button class="kana-btn" onclick="filterDictKana('わ')">わ・他</button>
        </div>
      </div>
    </div>

    <!-- 辞書カード一覧グリッド -->
    <div class="dict-grid" id="dictCardsContainer">
      ${cardsHtml}
    </div>

  </div>
</div>
`;

fs.writeFileSync('src/14_dictionary.html', tabHtml, 'utf8');
console.log('Successfully generated src/14_dictionary.html with ' + dictData.length + ' comprehensive index entries!');
