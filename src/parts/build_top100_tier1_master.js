const fs = require('fs');
const path = require('path');

console.log('=== Building Tier 1 (1-20) Master Completion ===');

// =========================================================================
// 1. Update src/03_guide.html (Add c27, c28, update c12, update guide nav)
// =========================================================================
const pGuide = path.join(__dirname, '..', '03_guide.html');
let guideHtml = fs.readFileSync(pGuide, 'utf8');

// A. Update guide nav list
const targetNav = `<li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c26', this)"><span>26. 慢性便秘症・便秘治療</span><span class="guide-nav-badge">Constipation</span></a></li>`;
const newNav = `<li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c26', this)"><span>26. 慢性便秘症・便秘治療</span><span class="guide-nav-badge">Constipation</span></a></li>
        <li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c27', this)"><span>27. かぜ症候群・インフル</span><span class="guide-nav-badge">Cold & Flu</span></a></li>
        <li class="guide-nav-item"><a class="guide-nav-link" onclick="filterGuideCard('c28', this)"><span>28. 花粉症・アレルギー鼻炎</span><span class="guide-nav-badge">Rhinitis</span></a></li>`;

if (!guideHtml.includes("filterGuideCard('c27'")) {
  if (guideHtml.includes(targetNav)) {
    guideHtml = guideHtml.replace(targetNav, newNav);
    console.log('Added c27 and c28 to guide-nav-list!');
  } else {
    console.error('Target nav not found in 03_guide.html');
  }
}

// B. Enhance c12 (Pain management, lumbago, knee OA, patches)
const c12PearlsTarget = `        <li><strong>「薬物乱用頭痛（MOH）」を見抜け！：</strong>頭痛が怖くてロキソニンや市販の鎮痛薬、トリプタンを「月に10〜15日以上」飲んでいると、脳が痛みに過敏になり、<strong>薬が切れるたびに毎日頭痛が起きる地獄のループ</strong>に入る。処方間隔が早い患者さんには予防薬の導入を提案しよう。</li>`;

const c12PearlsAdd = `        <li><strong>「薬物乱用頭痛（MOH）」を見抜け！：</strong>頭痛が怖くてロキソニンや市販の鎮痛薬、トリプタンを「月に10〜15日以上」飲んでいると、脳が痛みに過敏になり、<strong>薬が切れるたびに毎日頭痛が起きる地獄のループ</strong>に入る。処方間隔が早い患者さんには予防薬の導入を提案しよう。</li>
        <li><strong>腰痛・坐骨神経痛の鑑別とタリージェ漸増法：</strong>急性ぎっくり腰（侵害受容性疼痛）にはNSAIDs短期投与が有効だが、足にしびれ・電撃痛が走る坐骨神経痛（神経障害性疼痛）にはロキソニンは無効！タリージェは1回5mg 1日2回から開始し、眠気・ふらつきを観察しながら1週間以上あけて10mg bid（最大15mg bid）へ増量する。腎機能（eGFR）による用量調節必須！</li>
        <li><strong>外用貼付剤の地雷「モーラステープの光線過敏症」＆「ジクトルの全身性NSAIDs」：</strong>モーラステープ（ケトプロフェン）は紫外線により重篤な接触皮膚炎・水疱・色素沈着を起こすため、<strong>「貼付中および剥がした後4週間は日光に当てない」</strong>遮光指導が絶対鉄則！またジクトルテープは全身吸収型NSAIDsのため、内服NSAIDsとの併用過量投与や胃潰瘍・腎障害に厳戒注意。</li>`;

if (!guideHtml.includes('モーラステープの光線過敏症')) {
  if (guideHtml.includes(c12PearlsTarget)) {
    guideHtml = guideHtml.replace(c12PearlsTarget, c12PearlsAdd);
    console.log('Enhanced c12 Clinical Pearls!');
  }
}

// C. Add c27 and c28 cards before </div><!-- /#tab-guide -->
const c27Andc28Html = `
  <!-- 27. 急性上気道炎（かぜ症候群）＆ インフルエンザ完全攻略 -->
  <div class="card" id="c27">
    <div class="card-header">
      <span class="tag">Core 27 / Respiratory Infection & Flu</span>
      <h2 class="card-title">27. 急性上気道炎（かぜ症候群）＆ インフルエンザ完全攻略マスター</h2>
    </div>
    <div class="catchphrase">
      🎯 一言でいうと：「かぜは9割がウイルス！不要な抗菌薬をブロックし、症状別対症療法・漢方の証・インフル48時間ルールを極めよ！」
    </div>

    <!-- 📊 アルゴリズムフローチャート -->
    <div class="algo-flow-container">
      <div class="algo-header">
        <div class="algo-title-group">
          <span class="algo-tag">Clinical Flowchart</span>
          <h3 class="algo-title">📊 27. かぜ症候群・インフルエンザ 鑑別・第一選択アルゴリズム</h3>
        </div>
        <span class="algo-goal-badge">🎯 目標：迅速な症状軽快 ＆ 不要な抗菌薬阻止 ＆ インフル重症化・二次感染防止</span>
      </div>
      <div class="decision-tree-grid">
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［インフルエンザ］</span>
            <span class="branch-target">急激な38℃以上高熱・悪寒・全身倦怠感・関節痛（発症48h以内）</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">第一選択（抗ウイルス薬）</div>
              <div class="step-drug">ゾフルーザ（単回内服）または イナビル（単回吸入）/ タミフル（5日間）</div>
              <div class="step-rationale">発症48時間以内の投与でウイルス増殖を遮断。単回投与で服薬完結するゾフルーザ/イナビルの利便性が高い。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ゾフルーザ')">ゾフルーザ</span><span class="flow-chip" onclick="quickSearch('イナビル')">イナビル</span><span class="flow-chip" onclick="quickSearch('タミフル')">タミフル</span></div>
            </div>
          </div>
        </div>

        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［急性上気道炎・初期］</span>
            <span class="branch-target">悪寒・首筋のこり・咽頭痛・鼻汁（発熱初期）</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">第一選択（漢方・対症療法）</div>
              <div class="step-drug">葛根湯 / 麻黄湯 / 小柴胡湯加桔梗石膏 または 総合感冒薬（PL等）</div>
              <div class="step-rationale">実証・無汗なら葛根湯。高熱・激しい関節痛なら麻黄湯。喉の激痛・発赤なら小柴胡湯加桔梗石膏。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('葛根湯')">葛根湯</span><span class="flow-chip" onclick="quickSearch('PL配合顆粒')">PL配合顆粒</span><span class="flow-chip" onclick="quickSearch('ピーエイ')">ピーエイ</span></div>
            </div>
          </div>
        </div>

        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［咳・喀痰・咽頭乾燥］</span>
            <span class="branch-target">粘稠痰・頑固な咳・喉のイガイガ</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">症状別対症薬</div>
              <div class="step-drug">カルボシステイン（去痰） ＋ デキストロメトルファン / 麦門冬湯</div>
              <div class="step-rationale">気道粘液正常化で痰を排泄しやすくする。乾性咳嗽にはメジコン、激しい空咳・咽頭乾燥には麦門冬湯。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('カルボシステイン')">カルボシステイン</span><span class="flow-chip" onclick="quickSearch('メジコン')">メジコン</span><span class="flow-chip" onclick="quickSearch('麦門冬湯')">麦門冬湯</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="algo-footer-pitfall">
        <strong>⚠️ 処方監査・超重要チェック：</strong>
        <span>
          ① PL配合顆粒・ピーエイ配合錠は抗コリン成分（プロメタジン）を含むため、<strong>緑内障・前立腺肥大症（排尿困難）に絶対禁忌！</strong><br>
          ② インフルエンザ治療薬は<strong>「発症後48時間以内」の開始が原則</strong>（48h以降はウイルスピークを越えており効果乏しい）。小児の異常行動に注意。<br>
          ③ ウイルス性上気道炎に対する「とりあえず抗菌薬（ケフラール・クラリス等）」は不要！耐性菌誘発と下痢のリスクを説明せよ。
        </span>
      </div>
    </div>

    <div class="grid-2">
      <div class="box">
        <h3>🧭 かぜ漢方の「証」と使い分けの極意</h3>
        <ul>
          <li><strong>葛根湯（かっこんとう）：</strong>体力中等度以上（実証）で、<strong>「悪寒がして首の後ろや肩がこるが、まだ汗は出ていない」</strong>初期に温服して発汗させる。汗が出ている虚弱者には桂枝湯。</li>
          <li><strong>麻黄湯（まおうとう）：</strong>実証で<strong>「悪寒が激しく、高熱、全身の節々（関節）が痛む」</strong>インフル初期にも奏功。交感神経刺激（エフェドリン）があるため高齢者・高血圧・不整脈には注意。</li>
          <li><strong>小柴胡湯加桔梗石膏（しょうさいことうかききょうせっこう）：</strong>「喉が真っ赤に腫れて痛くて飲み込めない（咽頭炎・扁桃炎）」に特効。ぬるま湯に溶かして<strong>うがいしながらゆっくり飲み込む</strong>と局所消炎効果が倍増！</li>
          <li><strong>麦門冬湯（ばくもんとう）：</strong>「コンコンと激しく咳き込んで顔が赤くなる、喉がカラカラに乾く」気管支炎・かぜ回復期の空咳に最強。</li>
        </ul>
      </div>
      <div class="box">
        <h3>🦠 抗インフルエンザ薬のキャラクター立ち</h3>
        <ul>
          <li><strong>ゾフルーザ（バロキサビル）：</strong>キャップ依存性エンドヌクレアーゼ阻害薬。<strong>「1回2錠飲んで即終了」</strong>。ウイルス排出停止が極めて早いが、アミノ酸変異（耐性化）の議論あり。</li>
          <li><strong>イナビル（ラニナミビル）：</strong>吸入粉末薬。<strong>「薬局の窓口で1回吸入して完了」</strong>。吸気力がある学童〜成人で服薬遵守率100%。</li>
          <li><strong>タミフル（オセルタミビル）：</strong>1日2回5日間内服。最も歴史が長くエビデンス豊富。**乳幼児・妊婦・重症例（経鼻胃管など）**への第一選択。</li>
          <li><strong>リレンザ（ザナミビル）：</strong>1日2回5日間吸入。※気管支痙攣リスクのため気管支喘息患者には原則回避！</li>
        </ul>
      </div>
    </div>

    <div class="offlabel">
      <h3>🕵️‍♂️ 処方箋のウラ読み（適応外・意外な処方意図）</h3>
      <ul>
        <li><strong>総合感冒薬（PL・ピーエイ）と解熱鎮痛薬（カロナール）の重複処方に目を光らせよ！：</strong>PL配合顆粒1g中にはアセトアミノフェン150mgが含まれる。内科や耳鼻科でカロナール500mgが同時に出ていると、アセトアミノフェンの1日総投与量が上限（4000mg/日、小児体重換算）を超えて急性肝障害のリスクが生じる！必ず成分換算照合を行え。</li>
      </ul>
    </div>

    <div class="pearl">
      <h3>💡 先輩からの現場の勘所（Clinical Pearls）</h3>
      <ul>
        <li><strong>学校保健安全法の「出席停止期間」を暗記せよ：</strong>「発症した後5日を経過し、かつ、解熱した後2日（幼児は3日）を経過するまで」。解熱したからといって翌日登校させないよう保護者へ明確に指導すること！</li>
        <li><strong>小児・未成年者の「異常行動（飛び降り・徘徊）」防止対策：</strong>抗インフル薬の内服・吸入にかかわらず、発熱から2日間は**「高層階のベランダや窓の鍵を閉める」「一人にせず大人が見守る」**安全対策を必ず文書とともに指導する。</li>
      </ul>
    </div>

    <div class="question-box">
      <strong>🙋‍♂️ 実習生への問いかけ：</strong>「前立腺肥大症でハルナールを飲んでいる70代男性に、かぜで内科から『PL配合顆粒 1回1包 1日4回』が処方されました。鑑査上の重大な問題点は何ですか？どう医師へ疑義照会・処方提案しますか？」
    </div>

    <div class="memo-area">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <strong style="color:#0f172a; font-size:0.92rem;">📝 実習生 症例ディスカッション＆メモ欄（印刷後手書き用）：</strong>
        <span style="font-size:0.75rem; color:#64748b; border:1px solid #cbd5e1; padding:2px 10px; border-radius:4px; background:white;">指導薬剤師 印：　　　　</span>
      </div>
      <div style="font-size:0.85rem; color:#64748b; line-height:1.5;">
        ・インフル発症日時・48時間判定・抗ウイルス薬選択理由：<br>
        ・総合感冒薬禁忌チェック（緑内障/前立腺肥大/アスピリン喘息）・漢方の証：
      </div>
    </div>
  </div>


  <!-- 28. アレルギー性鼻炎・花粉症 ＆ 舌下免疫療法マスター -->
  <div class="card" id="c28">
    <div class="card-header">
      <span class="tag">Core 28 / Allergy & Rhinitis</span>
      <h2 class="card-title">28. アレルギー性鼻炎・花粉症 ＆ 舌下免疫療法（SLIT）完全マスター</h2>
    </div>
    <div class="catchphrase">
      🎯 一言でいうと：「眠気・運転可否・即効性・空腹時ルール！第2世代抗ヒスタミンのキャラ立ちと舌下免疫療法で花粉症を制圧せよ！」
    </div>

    <!-- 📊 アルゴリズムフローチャート -->
    <div class="algo-flow-container">
      <div class="algo-header">
        <div class="algo-title-group">
          <span class="algo-tag">Clinical Flowchart</span>
          <h3 class="algo-title">📊 28. アレルギー性鼻炎・花粉症 重症度・症状別アルゴリズム</h3>
        </div>
        <span class="algo-goal-badge">🎯 目標：インペアードパフォーマンスのない快適な日中覚醒 ＆ 鼻閉・くしゃみの完全鎮火</span>
      </div>
      <div class="decision-tree-grid">
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［軽症〜中等症・くしゃみ鼻汁］</span>
            <span class="branch-target">運転が必要・日中の眠気を絶対避けたい・仕事や学業に集中したい</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">第一選択（運転可能・眠気なし）</div>
              <div class="step-drug">ビラノア（ビラスチン）または デザレックス（デスロラタジン）/ アレグラ</div>
              <div class="step-rationale">脳内ヒスタミンH1受容体占拠率が極めて低くインペアードパフォーマンスなし。ビラノアは空腹時服用厳守！</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ビラノア')">ビラノア</span><span class="flow-chip" onclick="quickSearch('デザレックス')">デザレックス</span><span class="flow-chip" onclick="quickSearch('アレグラ')">アレグラ</span></div>
            </div>
          </div>
        </div>

        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［重症・鼻閉（鼻づまり）］</span>
            <span class="branch-target">鼻が詰まって口呼吸・夜眠れない・頑固な鼻閉</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">第一選択（局所ステロイド＋LTRA）</div>
              <div class="step-drug">点鼻ステロイド（アラミスト/ナゾネックス） ＋ モンテルカスト / ルパフィン</div>
              <div class="step-rationale">鼻粘膜局所の好酸球炎症を抑え鼻閉を強力に改善。ルパフィンはヒスタミンH1＋PAFのデュアルブロック。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('アラミスト')">アラミスト</span><span class="flow-chip" onclick="quickSearch('ルパフィン')">ルパフィン</span><span class="flow-chip" onclick="quickSearch('モンテルカスト')">モンテルカスト</span></div>
            </div>
          </div>
        </div>

        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［根治療法（アレルゲン免疫）］</span>
            <span class="branch-target">スギ花粉症・ダニアレルギーを根本から治したい（5歳以上）</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">舌下免疫療法（SLIT）</div>
              <div class="step-drug">シダキュア（スギ花粉）または ミティキュア（ダニ）</div>
              <div class="step-rationale">抗原を舌下投与し免疫寛容を誘導。初回院内30分観察、3〜5年間継続。スギ飛散期（1〜4月）開始厳禁！</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('シダキュア')">シダキュア</span><span class="flow-chip" onclick="quickSearch('ミティキュア')">ミティキュア</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="algo-footer-pitfall">
        <strong>⚠️ 処方監査・超重要チェック：</strong>
        <span>
          ① <strong>ビラノアの「空腹時服用」は絶対鉄則：</strong>食後に飲むと吸収率（AUC）が約40%激減し効果が消失する！「起床時」または「就寝前（夕食後2時間以上空け）」を指示せよ。<br>
          ② <strong>自動車運転制限の厳密鑑査：</strong>アレグラ、クラリチン、ビラノア、デザレックスの4剤のみ「運転注意の文言なし（運転可）」。ルパフィン、ザイザル、ジルテック、アレロック等は「運転不可」！
        </span>
      </div>
    </div>

    <div class="grid-2">
      <div class="box">
        <h3>🚗 第2世代抗ヒスタミン薬の「運転可否」完全仕分け</h3>
        <ul>
          <li><strong>【運転可能（運転注意の記載なし）】：</strong>
            <br>・<strong>ビラノア（ビラスチン）：</strong>切れ味・効果発現最強だが<strong>食後投与厳禁（空腹時就寝前または起床時）</strong>！
            <br>・<strong>デザレックス（デスロラタジン）：</strong>食事の影響なし、1日1回いつでもOK、眠気ゼロ。
            <br>・<strong>アレグラ（フェキソフェナジン）：</strong>安全性最高（妊婦・小児・高齢者）、1日2回服用。
            <br>・<strong>クラリチン（ロラタジン）：</strong>1日1回、OD錠あり、マイルドな効き目。</li>
          <li><strong>【運転禁止（従事させてはならない）】：</strong>
            <br>・<strong>ルパフィン（ルパタジン）：</strong>PAF＋H1阻害で<strong>鼻づまりに最強の切れ味</strong>だが、眠気が出るため運転禁止！
            <br>・<strong>ザイザル（レボセチリジン）/ ジルテック：</strong>効果はシャープだが傾眠リスク。運転禁止。
            <br>・<strong>アレロック（オロパタジン）：</strong>即効性・強力だが強い眠気。運転禁止。</li>
        </ul>
      </div>
      <div class="box">
        <h3>👃 点鼻ステロイド薬 ＆ 舌下免疫療法の要点</h3>
        <ul>
          <li><strong>点鼻ステロイド（アラミスト・ナゾネックス）：</strong>
            <br>・内服薬よりも<strong>鼻閉（鼻づまり）を劇的に解除</strong>する。
            <br>・アラミストは人間工学に基づいた<strong>「横押しノズル（サイドレバー）」</strong>で高齢者や小児でも押しやすい。
            <br>・血管収縮点鼻薬（市販ナザール等）と違い、毎日続けても<strong>薬剤性鼻炎（リバウンド鼻閉）を起こさない</strong>ため「毎日継続使用」を指導。</li>
          <li><strong>舌下免疫療法（シダキュア・ミティキュア）：</strong>
            <br>・<strong>スギ飛散期（1〜4月頃）の新規開始は絶対禁止！</strong>（アレルギー反応が暴走しアナフィラキシーリスク）。6〜12月の非飛散期に開始。
            <br>・舌下に錠剤を置き<strong>1分間保持した後に飲み込む。その後5分間は飲食・うがい禁止</strong>。</li>
        </ul>
      </div>
    </div>

    <div class="offlabel">
      <h3>🕵️‍♂️ 処方箋のウラ読み（適応外・意外な処方意図）</h3>
      <ul>
        <li><strong>ビラノアが「就寝前」または「起床時」に出ている理由：</strong>ビラノアは食事中の脂肪や糖分、胃酸分泌と同時に摂るとトランスポーター阻害により吸収率が半分近くまで落ちる。医師があえて「就寝前」や「起床時」と指定しているのは、<strong>「胃の中に食べ物がない空腹状態を確実に作るため」</strong>の計算し尽くされた処方設計である！夕食後すぐ飲まないよう念押しせよ。</li>
      </ul>
    </div>

    <div class="pearl">
      <h3>💡 先輩からの現場の勘所（Clinical Pearls）</h3>
      <ul>
        <li><strong>「インペアード・パフォーマンス（鈍重脳）」を警告せよ：</strong>患者自身が「眠気を感じていなくても」、脳内H1受容体がブロックされると集中力・判断力・作業効率が著しく低下する。ドライバー、高所作業員、受験生には必ず運転可能な第2世代（ビラノア、デザレックス、アレグラ）を推奨・処方提案しよう。</li>
        <li><strong>市販点鼻薬（ナファゾリン等）依存による「薬剤性鼻炎」を見抜け！：</strong>「病院の点鼻薬（アラミスト）が効かないから市販の点鼻薬を1日10回シュッシュしている」患者は典型的なリバウンド性肥厚性鼻炎。血管収縮剤を即座に中止させ、点鼻ステロイドへの一本化を指導する。</li>
      </ul>
    </div>

    <div class="question-box">
      <strong>🙋‍♂️ 実習生への問いかけ：</strong>「長距離トラック運転手の患者さんが『花粉症で鼻が詰まって夜も眠れない。一番強くてすぐ効く薬をくれ』と言って、ルパフィン錠が処方されました。鑑査上の問題点と、医師・患者への処方提案をどう組み立てますか？」
    </div>

    <div class="memo-area">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <strong style="color:#0f172a; font-size:0.92rem;">📝 実習生 症例ディスカッション＆メモ欄（印刷後手書き用）：</strong>
        <span style="font-size:0.75rem; color:#64748b; border:1px solid #cbd5e1; padding:2px 10px; border-radius:4px; background:white;">指導薬剤師 印：　　　　</span>
      </div>
      <div style="font-size:0.85rem; color:#64748b; line-height:1.5;">
        ・患者の職業・運転有無・主症状（鼻汁/鼻閉/眼症状）：<br>
        ・選択抗ヒスタミン薬の運転可否・服用タイミング（ビラノア空腹時等）：
      </div>
    </div>
  </div>
`;

if (!guideHtml.includes('id="c27"')) {
  const guideEndMarker = '</div><!-- /#tab-guide -->';
  if (guideHtml.includes(guideEndMarker)) {
    guideHtml = guideHtml.replace(guideEndMarker, c27Andc28Html + '\n' + guideEndMarker);
    fs.writeFileSync(pGuide, guideHtml, 'utf8');
    console.log('Successfully inserted c27 and c28 into 03_guide.html!');
  } else {
    console.error('guideEndMarker not found in 03_guide.html');
  }
} else {
  console.log('c27 already exists in 03_guide.html');
}

// =========================================================================
// 2. Update src/05_comparison.html (Add Antihistamines, Flu, Patches)
// =========================================================================
const pComp = path.join(__dirname, '..', '05_comparison.html');
let compHtml = fs.readFileSync(pComp, 'utf8');

const antihistamineCompHtml = `
    <div class="sub-banner banner-class" style="margin-top:20px;">
      <span>🤧 【第2世代抗ヒスタミン薬 眠気・運転可否・空腹時ガチンコ比較】「日中の眠気ゼロ」か「鼻閉への最強パンチ」か？</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">運転可否区分</th>
          <th style="width:20%;">薬剤名（一般名）</th>
          <th style="width:18%;">服用回数・タイミング</th>
          <th style="width:20%;">強み・特徴・キャラ立ち</th>
          <th style="width:26%;">現場の鑑査急所・ピットフォール</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowspan="4"><strong>【運転可能】</strong><br><span style="color:#16a34a; font-weight:bold;">運転制限なし！</span><br>（ドライバー・受験生第一選択）</td>
          <td><strong>ビラノア</strong><br>（ビラスチン 20mg）</td>
          <td><strong>1日1回 空腹時</strong><br>（就寝前または起床時）</td>
          <td><span class="char">切れ味最強 ＆ 眠気ゼロ</span><br>Tmax 1時間で即効性に優れ効果も強力。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">食後投与絶対厳禁！</span> 食後だと吸収率が40%激減。夕食後2時間以上あけた就寝前、または起床時に服用。</td>
        </tr>
        <tr>
          <td><strong>デザレックス</strong><br>（デスロラタジン 5mg）</td>
          <td>1日1回 いつでも<br>（食事の影響なし）</td>
          <td><span class="char">食事の影響なし ＆ 眠気ゼロ</span><br>クラリチンの活性代謝物で効果と持続性を向上。</td>
          <td>いつ飲んでも効果が落ちないため服薬コンプライアンス良好。肝代謝CYP影響少ない。</td>
        </tr>
        <tr>
          <td><strong>アレグラ</strong><br>（フェキソフェナジン 60mg）</td>
          <td>1日2回 朝・夕食後</td>
          <td><span class="char">安全性No.1の世界的標準薬</span><br>小児から高齢者・妊婦まで幅広く使われる。</td>
          <td>1日2回服用が必要。効果はマイルドなため重症鼻閉には点鼻ステロイド等の併用が必要。</td>
        </tr>
        <tr>
          <td><strong>クラリチン</strong><br>（ロラタジン 10mg）</td>
          <td>1日1回 朝または夕</td>
          <td><span class="char">1日1回 ＆ OD錠あり</span><br>水なしで飲めるOD錠が便利。眠気極めて低い。</td>
          <td>効果発現はややマイルド。重症例では他剤（ビラノア等）へのステップアップを考慮。</td>
        </tr>
        <tr>
          <td rowspan="4"><strong>【運転禁止】</strong><br><span style="color:#b91c1c; font-weight:bold;">運転不可！</span><br>（夜間内服や重症鼻閉）</td>
          <td><strong>ルパフィン</strong><br>（ルパタジン 10mg）</td>
          <td>1日1回 いつでも</td>
          <td><span class="char">抗ヒスタミン ＋ 抗PAFデュアル阻害</span><br>頑固な鼻づまり（鼻閉）に最強の切れ味！</td>
          <td>PAF阻害により血管透過性を抑え鼻閉を強力鎮火。眠気（傾眠）頻度が高いため<strong>運転絶対不可</strong>！</td>
        </tr>
        <tr>
          <td><strong>ザイザル</strong><br>（レボセチリジン 5mg）</td>
          <td>1日1回 就寝前</td>
          <td><span class="char">ジルテックの進化系</span><br>即効性と強力な抗アレルギー作用。夜間の痒みにも強い。</td>
          <td>眠気があるため就寝前服用。<strong>運転絶対不可</strong>。腎排泄型のため腎機能低下時は減量。</td>
        </tr>
        <tr>
          <td><strong>アレロック</strong><br>（オロパタジン 5mg）</td>
          <td>1日2回 朝・就寝前</td>
          <td><span class="char">日本発の即効・強力型</span><br>皮膚の痒み・湿疹・アレルギー症状を素早く鎮圧。</td>
          <td>眠気の頻度が比較的高いため<strong>運転絶対不可</strong>。</td>
        </tr>
        <tr>
          <td><strong>アレジオン / タリオン</strong></td>
          <td>1日1回（アレジオン）<br>1日2回（タリオン）</td>
          <td><span class="char">バランス型・速効型</span><br>タリオンは速効性に定評。</td>
          <td>「運転等危険な機械操作に従事させないよう注意」（タリオン等は運転注意/不可）。</td>
        </tr>
      </tbody>
    </table>
`;

// Insert into sec-imm (Immunity / Allergy) in 05_comparison.html
const immTarget = '<div class="comp-section sec-imm">';
if (!compHtml.includes('【第2世代抗ヒスタミン薬 眠気・運転可否・空腹時ガチンコ比較】')) {
  if (compHtml.includes(immTarget)) {
    compHtml = compHtml.replace(immTarget, immTarget + '\n' + antihistamineCompHtml);
    console.log('Successfully inserted Antihistamines table into 05_comparison.html!');
  }
}

// B. Flu comparison in sec-inf
const fluCompHtml = `
    <div class="sub-banner banner-class" style="margin-top:20px;">
      <span>🦠 【抗インフルエンザ薬 4大製剤 ガチンコ比較】「1回完結」か「5日間内服」か？</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">薬剤名（一般名）</th>
          <th style="width:16%;">作用機序・剤形</th>
          <th style="width:18%;">用法・用量・回数</th>
          <th style="width:22%;">強み・キャラクター立ち</th>
          <th style="width:28%;">現場の鑑査急所・ピットフォール</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>ゾフルーザ</strong><br>（バロキサビル マルボキシル）</td>
          <td>キャップ依存性エンドヌクレアーゼ阻害<br>（錠剤）</td>
          <td><strong>1回のみ内服で完結</strong><br>（成人40kg以上80kg未満: 40mg）</td>
          <td><span class="char">1回飲むだけで治療終了！</span><br>ウイルスのmRNA複製を直接止め、排出停止が最も早い。</td>
          <td>多剤併用時・小児でアミノ酸変異株（耐性化）が報告あり。食後投与可能。金属イオン（Ca/Mg/Fe）製剤とキレート注意。</td>
        </tr>
        <tr>
          <td><strong>イナビル</strong><br>（ラニナミビル オクタン酸エステル）</td>
          <td>ノイラミニダーゼ阻害<br>（吸入粉末剤）</td>
          <td><strong>薬局窓口で1回吸入して完了</strong><br>（成人: 40mg＝2容器吸入）</td>
          <td><span class="char">吸入1回で確実なアドヒアランス</span><br>肺組織に長時間留まり、飲み忘れゼロ。</td>
          <td>十分な吸気力（息を吸い込む力）が必要。小児や高齢者には吸入手技指導を丁寧に行う。</td>
        </tr>
        <tr>
          <td><strong>タミフル</strong><br>（オセルタミビル リン酸塩）</td>
          <td>ノイラミニダーゼ阻害<br>（カプセル / ドライシロップ）</td>
          <td>1日2回 <strong>5日間連続内服</strong><br>（成人: 1回75mg）</td>
          <td><span class="char">世界最多のエビデンスと信頼性</span><br>乳幼児・妊婦・経管投与患者にも安心。</td>
          <td>解熱しても5日間確実に飲み切らせる指導が必須。小児・未成年者の異常行動（2日間見守り）。</td>
        </tr>
        <tr>
          <td><strong>リレンザ</strong><br>（ザナミビル水和物）</td>
          <td>ノイラミニダーゼ阻害<br>（吸入粉末剤 / ディスクヘラー）</td>
          <td>1日2回 <strong>5日間吸入</strong><br>（1回10mg＝2ブリスター）</td>
          <td>気道局所に直接届き速やかに増殖阻害。耐性株が生じにくい。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">気管支喘息患者には禁忌/原則回避！</span> 吸入刺激で気管支痙攣誘発リスクあり。</td>
        </tr>
      </tbody>
    </table>
`;

const infTarget = '<div class="comp-section sec-inf">';
if (!compHtml.includes('【抗インフルエンザ薬 4大製剤 ガチンコ比較】')) {
  if (compHtml.includes(infTarget)) {
    compHtml = compHtml.replace(infTarget, infTarget + '\n' + fluCompHtml);
    console.log('Successfully inserted Flu table into 05_comparison.html!');
  }
}

// C. Patches comparison in sec-extra
const patchCompHtml = `
    <div class="sub-banner banner-class" style="margin-top:20px;">
      <span>🩹 【外用消炎鎮痛貼付剤（湿布薬）のガチンコ比較】テープ vs パップ、光線過敏症、全身吸収型</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">分類・剤形</th>
          <th style="width:20%;">代表薬剤名（一般名）</th>
          <th style="width:18%;">適したシチュエーション</th>
          <th style="width:20%;">強み・貼付感・持続性</th>
          <th style="width:26%;">現場の鑑査急所・ピットフォール</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>テープ剤</strong><br>（薄型・密着性高い）</td>
          <td><strong>ロキソニンテープ</strong><br>（ロキソプロフェンナトリウム）</td>
          <td>日常生活・仕事中・関節部<br>（剥がれにくさ重視）</td>
          <td><span class="char">抜群の安定性と速効鎮痛</span><br>薄く目立たず関節の曲げ伸ばしでも剥がれない。1日1回。</td>
          <td>皮膚刺激によるかぶれ。アスピリン喘息患者には禁忌（経皮吸収でもNSAIDs喘息を誘発）。</td>
        </tr>
        <tr>
          <td><strong>テープ剤</strong><br>（ケトプロフェン）</td>
          <td><strong>モーラステープ</strong><br>（ケトプロフェン 20mg/40mg）</td>
          <td>慢性腰痛・肩こり・腱鞘炎<br>（高い抗炎症・鎮痛力）</td>
          <td>深く浸透し強い抗炎症効果。整形外科で絶大な処方頻度。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【光線過敏症の厳重注意！】</span> 紫外線で重篤な水疱性皮膚炎・色素沈着。<strong>「貼付中および剥がした後4週間は日光を避ける（長袖・サポーター等）」</strong>。</td>
        </tr>
        <tr>
          <td><strong>パップ剤</strong><br>（白くて厚い・水分含有）</td>
          <td><strong>モーラスパップ / ロキソニンパップ</strong>等</td>
          <td>お風呂上がり・就寝時・皮膚が弱い高齢者</td>
          <td><span class="char">水分による冷感と肌への優しさ</span><br>かぶれにくく、急性の熱を持った打撲・捻挫に最適。</td>
          <td>厚みがあり端からめくれやすい（サポーターやネット包帯を活用）。1日1〜2回。</td>
        </tr>
        <tr>
          <td><strong>全身吸収型テープ</strong><br>（経皮吸収型NSAIDs）</td>
          <td><strong>ジクトルテープ</strong><br>（ジクロフェナクナトリウム 75mg）</td>
          <td>変形性関節症・腰痛症・がん性疼痛（嚥下困難例）</td>
          <td><span class="char">貼るだけで全身へ移行し24時間鎮痛</span><br>胃を通過せず血中へ移行。嚥下障害でも確実。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">内服NSAIDsと同じ副作用リスク！</span> 胃潰瘍・腎障害・心血管リスクを伴うため内服NSAIDsとの併用不可。1日2枚（最大3枚）。</td>
        </tr>
      </tbody>
    </table>
`;

const extraTarget = '<div class="comp-section sec-extra">';
if (!compHtml.includes('【外用消炎鎮痛貼付剤（湿布薬）のガチンコ比較】')) {
  if (compHtml.includes(extraTarget)) {
    compHtml = compHtml.replace(extraTarget, extraTarget + '\n' + patchCompHtml);
    console.log('Successfully inserted Patches table into 05_comparison.html!');
  }
}

fs.writeFileSync(pComp, compHtml, 'utf8');

// =========================================================================
// 3. Update src/16_top100.html (Set all 1-20 to status: "ok", add links)
// =========================================================================
const pTop100 = path.join(__dirname, '..', '16_top100.html');
let top100Html = fs.readFileSync(pTop100, 'utf8');

// Rebuild 16_top100.html with all 1-20 complete
const top100UpdatedData = [
  { rank: 1, name: "高血圧症", cat: "循環器・生活習慣病", guideId: "c2", compId: "sec-ht", drugs: "アムロジピン、テルミサルタン、オルメサルタン、ビソプロロール、エンレスト", key: "家庭血圧第一主義（125/75目標）。Ca拮抗薬（浮腫/便秘）、ARB（カリウム/腎機能）、多剤併用（合剤活用）。" },
  { rank: 2, name: "脂質異常症（高コレステロール血症）", cat: "代謝・生活習慣病", guideId: "c10", compId: "sec-ckd", drugs: "ロスバスタチン、アトルバスタチン、ピタバスタチン、エゼチミブ、パルモディア", key: "二次予防LDL<70目標。ストロングスタチン（横紋筋融解症CK・筋肉痛）、エゼチミブ併用（NPC1L1）。" },
  { rank: 3, name: "急性上気道炎（かぜ症候群）", cat: "呼吸器・感染症", guideId: "c27", compId: "sec-inf", drugs: "PL配合顆粒、ピーエイ配合錠、カルボシステイン、葛根湯、麻黄湯、小柴胡湯加桔梗石膏", key: "総合感冒薬の抗コリン禁忌（緑内障/前立腺肥大）、アセトアミノフェン重複過量チェック、不要な抗菌薬の適正使用説明、漢方の証。" },
  { rank: 4, name: "アレルギー性鼻炎・花粉症", cat: "耳鼻科・アレルギー", guideId: "c28", compId: "sec-imm", drugs: "ビラノア、デザレックス、アレグラ、ルパフィン、アラミスト、モンテルカスト、シダキュア", key: "第2世代抗ヒスタミンの眠気・運転可否マトリクス（運転可能4剤）、ビラノア空腹時厳守、点鼻ステロイド継続、舌下免疫療法（SLIT）。" },
  { rank: 5, name: "2型糖尿病", cat: "代謝・生活習慣病", guideId: "c3", compId: "sec-dm", drugs: "メトホルミン、フォシーガ、ジャディアンス、マンジャロ、トルリシティ、ツイミーグ", key: "第一選択メトホルミン（腎機能eGFR・乳酸アシドーシス）、SGLT2阻害薬（脱水・尿路感染）、GLP-1/GIP。" },
  { rank: 6, name: "腰痛症・坐骨神経痛", cat: "整形外科・疼痛", guideId: "c12", compId: "sec-extra", drugs: "ロキソプロフェン、セレコキシブ、タリージェ、リリカ、ミオナール、メチコバール、モーラステープ", key: "侵害受容性疼痛（NSAIDs）vs 神経障害性疼痛（タリージェ漸増・下行性抑制系）、モーラス光線過敏症（4週間遮光）、ジクトル全身型。" },
  { rank: 7, name: "慢性便秘症", cat: "消化器", guideId: "c26", compId: "sec-extra", drugs: "酸化マグネシウム、モビコール、アミティーザ、リンゼス、グーフィス、ピコスルファート", key: "酸化Mg高Mg血症チェック、上皮機能変容薬（アミティーザ食直後/リンゼス食前）、胆汁酸（グーフィス食前）、大腸刺激性頓用原則。" },
  { rank: 8, name: "不眠症・睡眠障害", cat: "精神神経", guideId: "c20", compId: "sec-psy", drugs: "ボルズィ、デエビゴ、クービビック、ベルソムラ、ロゼレム、ルネスタ、マイスリー", key: "オレキシン受容体拮抗薬4大製剤（ボルズィ約2h〜デエビゴ約50h）半減期使い分け、CYP3A4禁忌、脱ベンゾ離脱。" },
  { rank: 9, name: "胃食道逆流症（GERD）・逆流性食道炎", cat: "消化器", guideId: "c11", compId: "sec-ckd", drugs: "タケキャブ（ボノプラザン）、ネキシウム、パリエット、タケプロン、六君子湯", key: "P-CAB（タケキャブ）の初回速効性とCYP非依存、PPI相互作用比較、就寝前摂食回避・頭部挙上指導。" },
  { rank: 10, name: "湿疹・接触皮膚炎（かぶれ・肌荒れ）", cat: "皮膚科", guideId: "c16", compId: "sec-imm", drugs: "アンテベート、デルモベート、フルメタ、ロコイド、ヒルドイド、プロペト", key: "ステロイド外用5段階ランク（部位別選択）、FTU（フィンガーチップユニット）、混合順・塗り順。" },
  { rank: 11, name: "慢性胃炎・胃潰瘍", cat: "消化器", guideId: "c21", compId: "sec-ckd", drugs: "ボノサップ/ボノピオン、タケキャブ、ムコスタ（レバミピド）、セルベックス", key: "ピロリ除菌7日間完遂（下痢・味覚異常でも中止回避）、NSAIDs潰瘍予防（P-CAB併用）、防御因子増強。" },
  { rank: 12, name: "変形性膝関節症・関節症", cat: "整形外科", guideId: "c12", compId: "sec-extra", drugs: "セレコキシブ、ロキソプロフェン、アセトアミノフェン、ヒアルロン酸関節注、外用NSAIDs", key: "セレコックス（選択的COX-2阻害・消化管保護）、アセトアミノフェン併用、外用NSAIDs併用、関節腔内ヒアルロン酸（潤滑作用）。" },
  { rank: 13, name: "ドライアイ（角結膜上皮障害）", cat: "眼科", guideId: "c14", compId: "sec-extra", drugs: "ヒアレイン（ヒアルロン酸Na）、ジクアス（ジクアホソルNa）、ムコスタ点眼液", key: "水分保持（ヒアレイン）vs ムチン・水分分泌促進（ジクアス）vs ムチン増加・抗炎症（ムコスタ懸濁点眼）。" },
  { rank: 14, name: "気管支喘息・咳喘息", cat: "呼吸器", guideId: "c25", compId: "sec-imm", drugs: "レルベア、シムビコート、フルティフォーム、アテキュラ、モンテルカスト、スピリーバ", key: "ICS/LABA吸入デバイス特性（ドライパウダー vs エアゾール）、うがい指導、咳喘息へのステップダウン/維持。" },
  { rank: 15, name: "アトピー性皮膚炎", cat: "皮膚科", guideId: "c16", compId: "sec-imm", drugs: "プロトピック、コレクチム、モイゼルト、デュピクセント、ステロイド外用、保湿剤", key: "プロアクティブ療法、非ステロイド新規外用薬（外用JAKコレクチム、外用PDE4モイゼルト）、生物学的製剤（デュピクセント）。" },
  { rank: 16, name: "高尿酸血症・痛風", cat: "代謝", guideId: "c17", compId: "sec-ckd", drugs: "フェブリク（フェブキソスタット）、ユリス（ドチヌラド）、ザイロリック、ウラリット", key: "発作中の尿酸降下薬新規開始厳禁、フェブリク（肝腎排泄）、ユリス（URAT1選択的阻害・結石注意）、酸性尿アルカリ化。" },
  { rank: 17, name: "うつ病・抑うつ状態", cat: "精神神経", guideId: "c6", compId: "sec-psy", drugs: "レクサプロ、ジェイゾロフト、サインバルタ、リフレックス/レメロン、トリンテリックス", key: "主症状別選択（不安SSRI / 意欲・疼痛SNRI / 不眠・食欲不振NaSSA）、初期嘔気（ドンペリドン併用）、アクチベーション症候群。" },
  { rank: 18, name: "骨粗鬆症", cat: "代謝・整形外科", guideId: "c10", compId: "sec-ckd", drugs: "プラリア、ボナロン/ベネット、イベニティ、オスタバロ、フォルテオ/テリボン、エディロール", key: "プラリア（ドタキャン骨折オーバーシュート防止/デノタス併用必須）、BP（起床時水180mL）、シーケンシャルセラピー。" },
  { rank: 19, name: "前立腺肥大症", cat: "泌尿器", guideId: "c9", compId: "sec-ckd", drugs: "タムスロシン（ハルナール）、シロドシン（ユリーフ）、ナフトピジル、タダラフィル（ザルティア）", key: "α1A超選択的ユリーフ（切れ味最強だが射精障害注意）、フリバス（夜間頻尿）、ザルティア（PDE5阻害）。" },
  { rank: 20, name: "インフルエンザ", cat: "感染症", guideId: "c27", compId: "sec-inf", drugs: "ゾフルーザ、イナビル、タミフル、リレンザ、ラピアクタ、アセトアミノフェン", key: "発症48時間以内投与開始、単回完結（ゾフルーザ/イナビル）vs 5日間内服（タミフル）、出席停止基準（発症後5日＋解熱後2日）、小児異常行動。" }
];

// Rebuild range 1 HTML
let newRange1Cards = '';
top100UpdatedData.forEach(item => {
  const badgeHtml = '<span style="background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:bold; border:1px solid #bbf7d0;">🟢 実装済み・完備</span>';
  const borderStyle = 'border-left: 4px solid #16a34a;';

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

  newRange1Cards += `        <div class="card" style="margin:0; padding:14px; ${borderStyle} background:#ffffff;">
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

// Replace Range 1 in 16_top100.html
const range1Regex = /<!-- ==================== RANGE 1: 1〜20位 ==================== -->[\s\S]*?<!-- ==================== 【第2弾】21位〜40位/;
const newRange1Block = `<!-- ==================== RANGE 1: 1〜20位 ==================== -->
    <div id="top100-range-r1" class="top100-range-pane active">
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:14px;">
${newRange1Cards}      </div>
    </div>

    <!-- ==================== 【第2弾】21位〜40位`;

top100Html = top100Html.replace(range1Regex, newRange1Block);

// Update status summary text in 16_top100.html
const oldSummary = `<span style="color:#16a34a; margin-left:8px;">🟢 完備（13疾患）</span>
      <span style="color:#d97706; margin-left:8px;">🟡 一部あり・要拡充（4疾患）</span>
      <span style="color:#dc2626; margin-left:8px;">🔴 未作成・要新設（3疾患）</span>`;

const newSummary = `<span style="color:#16a34a; margin-left:8px; font-weight:900;">🟢 全20疾患 100% 完備完了！（Core 01〜28 ＆ 各種同効薬比較へ完全連動）</span>`;

top100Html = top100Html.replace(oldSummary, newSummary);

fs.writeFileSync(pTop100, top100Html, 'utf8');
console.log('Successfully updated 16_top100.html with Tier 1 Complete!');

// =========================================================================
// 4. Update src/14_dictionary.html (Add cold, rhinitis, flu, patch cards)
// =========================================================================
const pDict = path.join(__dirname, '..', '14_dictionary.html');
let dictHtml = fs.readFileSync(pDict, 'utf8');

const additionalDictCards = `    <div class="dict-card" data-type="drug" data-kana="ひ" data-name="ビラノア錠 / OD錠" data-desc="第2世代抗ヒスタミン薬。ビラスチン。眠気が極めて少なく自動車運転制限なし。切れ味最強。食後服用で吸収40%低下のため「空腹時（就寝前または起床時）」厳守。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ビラノア錠 20mg / OD錠</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">ビラスチン / 第2世代抗ヒスタミン薬（運転可能）</div>
        <div class="dict-card-desc">眠気ゼロで自動車運転制限なし。即効性と高い効果を誇るが「空腹時服用（食前・就寝前・起床時）」が絶対鉄則（食後だと効果40%激減）。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-imm')">⚔️ 抗ヒスタミン比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c28')">📘 花粉症ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('ビラノア')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="る" data-name="ルパフィン錠" data-desc="第2世代抗ヒスタミン薬。ルパタジン。抗ヒスタミン作用＋抗paf作用のデュアルブロックで頑固な鼻づまり（鼻閉）に最強の切れ味。眠気があるため自動車運転不可。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ルパフィン錠 10mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">ルパタジンフマル酸塩 / 抗PAF・抗ヒスタミン薬</div>
        <div class="dict-card-desc">PAFを強力に抑え頑固な鼻閉を素早く鎮火。食事の影響なし。眠気が出るため自動車運転等の危険作業は絶対不可！</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-imm')">⚔️ 抗ヒスタミン比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c28')">📘 花粉症ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('ルパフィン')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="そ" data-name="ゾフルーザ錠" data-desc="抗インフルエンザウイルス薬。バロキサビルマルボキシル。キャップ依存性エンドヌクレアーゼ阻害薬。1回服用で治療完了。ウイルス排出停止が最も早い。発症48時間以内。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ゾフルーザ錠 20mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">バロキサビル マルボキシル / エンドヌクレアーゼ阻害薬</div>
        <div class="dict-card-desc">1回内服するだけでインフル治療終了。ウイルス排出を素早く停止。発症48時間以内に内服。多価陽イオン（鉄・Ca等）キレートに注意。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-inf')">⚔️ インフル比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c27')">📘 インフルガイド</button><button class="dict-jump-btn" onclick="showDrugByName('ゾフルーザ')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="い" data-name="イナビル吸入粉末剤" data-desc="抗インフルエンザウイルス薬。ラニナミビルオクタン酸エステル。ノイラミニダーゼ阻害薬。薬局窓口で1回吸入して終了。アドヒアランス100%。発症48時間以内。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">イナビル吸入粉末剤 20mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">ラニナミビル オクタン酸エステル / 長時間作用型NA阻害薬</div>
        <div class="dict-card-desc">薬局窓口で1回吸入するだけで治療完了（成人2容器＝40mg）。肺組織に長時間留まり増殖を阻止。十分な吸気力が必要。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-inf')">⚔️ インフル比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c27')">📘 インフルガイド</button><button class="dict-jump-btn" onclick="showDrugByName('イナビル')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="ひ" data-name="PL配合顆粒 / ピーエイ配合錠" data-desc="総合感冒薬。サリチルアミド・アセトアミノフェン・無水カフェイン・プロメタジン。抗コリン作用により緑内障・前立腺肥大症に禁忌。アスピリン喘息禁忌。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">PL配合顆粒 / ピーエイ配合錠</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">サリチルアミド・アセトアミノフェン配合 / 総合感冒剤</div>
        <div class="dict-card-desc">かぜの諸症状を緩和。プロメタジンの抗コリン作用のため緑内障・前立腺肥大症に絶対禁忌！他科のアセトアミノフェン処方との重複過量に厳重注意。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToGuide('c27')">📘 かぜ症候群ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('PL配合顆粒')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="も" data-name="モーラステープ" data-desc="経皮鎮痛消炎テープ剤。ケトプロフェン。強力な抗炎症・鎮痛作用。貼付中および剥がした後4週間は日光を避ける（光線過敏症の厳重指導必須）。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">モーラステープ 20mg / L40mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">ケトプロフェン / 経皮吸収型消炎鎮痛テープ剤</div>
        <div class="dict-card-desc">高い組織移行性と強い消炎鎮痛効果。紫外線による光線過敏症（重篤な接触皮膚炎）を防ぐため、貼付中および剥がした後4週間は直射日光を遮光！</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-extra')">⚔️ 湿布薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c12')">📘 整形外科ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('モーラス')">📋 詳細</button>
      </div>
    </div>
  
`;

if (!dictHtml.includes('ビラノア錠 20mg')) {
  const dictTarget = '<div class="dict-card" data-type="drug" data-kana="ほ" data-name="ボルズィ錠"';
  if (dictHtml.includes(dictTarget)) {
    dictHtml = dictHtml.replace(dictTarget, additionalDictCards + dictTarget);
    fs.writeFileSync(pDict, dictHtml, 'utf8');
    console.log('Successfully added cards to 14_dictionary.html!');
  }
}

// =========================================================================
// 5. Update src/09_app.js (DRUG_DB)
// =========================================================================
const pApp = path.join(__dirname, '..', '09_app.js');
let appJs = fs.readFileSync(pApp, 'utf8');

const additionalDb = `  { name: "ビラノア", gen: "ビラスチン", cat: "28. 花粉症・鼻炎", char: "眠気ゼロで自動車運転OK！空腹時（就寝前または起床時）服用が絶対鉄則の最強キレ味", desc: "脳内H1受容体占拠率ほぼゼロ。食後だと吸収率が40%激減するため空腹時厳守。1日1回服用で即効性と持続性に優れる。", gId: "c28", cSec: "sec-imm" },
  { name: "ルパフィン", gen: "ルパタジン", cat: "28. 花粉症・鼻炎", char: "ヒスタミンH1＋PAFのデュアルブロック！頑固な鼻づまりに最強だが運転絶対不可", desc: "血小板活性化因子PAFを叩き鼻粘膜浮腫を劇的解除。食事の影響なし。眠気が出るため自動車運転等危険作業は終日禁止。", gId: "c28", cSec: "sec-imm" },
  { name: "デザレックス", gen: "デスロラタジン", cat: "28. 花粉症・鼻炎", char: "眠気ゼロで自動車運転OK！食事の影響を受けずいつでも飲める快適な第2世代", desc: "クラリチンの活性代謝物。1日1回いつでも内服可能。肝代謝影響が少なく多剤併用でも使いやすい。", gId: "c28", cSec: "sec-imm" },
  { name: "ゾフルーザ", gen: "バロキサビルマルボキシル", cat: "27. インフルエンザ", char: "1回飲むだけで治療完了！ウイルス排出停止が最速の新規エンドヌクレアーゼ阻害薬", desc: "発症48時間以内に単回経口投与。ウイルス増殖を瞬時に停止。耐性アミノ酸変異に留意。多価金属イオン併用時キレート注意。", gId: "c27", cSec: "sec-inf" },
  { name: "イナビル", gen: "ラニナミビルオクタン酸エステル", cat: "27. インフルエンザ", char: "薬局で1回吸入して治療完了！肺局所に留まり飲み忘れゼロの長時間型NA阻害薬", desc: "発症48時間以内に1回吸入（成人40mg）。十分な吸気力が必要。解熱しても発症後5日＋解熱後2日の出席停止基準を指導。", gId: "c27", cSec: "sec-inf" },
  { name: "PL配合顆粒 / ピーエイ", gen: "サリチルアミド・アセトアミノフェン等", cat: "27. かぜ症候群", char: "総合感冒薬の王道！抗コリン作用により「緑内障・前立腺肥大症に禁忌！」", desc: "プロメタジンの抗コリン作用で口渇・尿閉・眼圧上昇。アスピリン喘息禁忌。他科アセトアミノフェンとの重複過量投与を厳戒チェック。", gId: "c27", cSec: "sec-inf" },
  { name: "モーラステープ", gen: "ケトプロフェン", cat: "12. 整形外科 / 湿布", char: "整形外科の主役湿布！「貼付中および剥がした後4週間は日光遮断（光線過敏症厳禁！）」", desc: "強力な消炎鎮痛。紫外線暴露による光線過敏症（重篤な水疱・色素沈着）を防ぐため剥がした後も約1ヶ月は遮光するよう厳重指導。", gId: "c12", cSec: "sec-extra" },
  { name: "ジクトルテープ", gen: "ジクロフェナクNa", cat: "12. 整形外科 / 全身型湿布", char: "貼るだけで全身へ移行する全身吸収型NSAIDs！内服NSAIDsとの併用厳禁", desc: "変形性関節症やがん性疼痛に1日1回貼付。経口NSAIDsと同様に胃潰瘍・腎障害リスクがあるため内服NSAIDs併用不可。", gId: "c12", cSec: "sec-extra" },
`;

if (!appJs.includes('"ビラノア"')) {
  const appTarget = '  { name: "イベニティ",';
  if (appJs.includes(appTarget)) {
    appJs = appJs.replace(appTarget, additionalDb + appTarget);
    fs.writeFileSync(pApp, appJs, 'utf8');
    console.log('Successfully inserted into 09_app.js!');
  }
}

console.log('=== Tier 1 Master Complete! ===');
