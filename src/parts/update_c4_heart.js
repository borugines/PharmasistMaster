const fs = require('fs');
const path = require('path');

const guidePath = path.join(__dirname, '..', '03_guide.html');
let guideHtml = fs.readFileSync(guidePath, 'utf8');

// c4 の開始と終了位置を特定
const c4StartRegex = /<!--\s*4\.\s*心疾患[\s\S]*?<div\s+class="card"\s+id="c4">/;
const c4EndRegex = /<\/div>\s*\n*\s*<!--\s*5\.\s*脳血管障害/;

const matchStart = guideHtml.search(c4StartRegex);
const matchEnd = guideHtml.search(c4EndRegex);

if (matchStart === -1 || matchEnd === -1) {
  console.error("Failed to find c4 bounds in 03_guide.html");
  process.exit(1);
}

const newC4Html = `<!-- 4. 心臓疾患（虚血性心疾患・心不全・不整脈・弁膜症・心筋症） -->
  <div class="card" id="c4">
    <div class="card-header">
      <span class="tag">Core 04 / Cardiovascular Master</span>
      <h2 class="card-title">4. 心臓疾患（虚血性心疾患・心不全・不整脈・弁膜症・心筋症）</h2>
    </div>
    <div class="catchphrase">
      🎯 一言でいうと：「心臓のトラブルは『配管（血管）・ポンプ（筋肉）・電気（リズム）・弁（ドア）』のどこが壊れたかで薬の正解が180度変わる！」
    </div>

    <!-- 🫀 心臓疾患 4大＋1区分 俯瞰ナビゲーションカード -->
    <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:10px; padding:16px 20px; margin-bottom:22px;">
      <div style="font-weight:800; color:#0f172a; font-size:1.02rem; margin-bottom:10px; display:flex; align-items:center; gap:8px;">
        <span>🗺️ 心臓疾患 4大病態区分マップ（どこにトラブルが起きているか？）</span>
      </div>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:12px;">
        <!-- 区分1: 虚血 -->
        <div style="background:white; border-left:4px solid #ef4444; border-radius:6px; padding:10px 14px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <div style="font-weight:700; color:#b91c1c; font-size:0.92rem; margin-bottom:4px;">🫀 ① 虚血性心疾患（配管の閉塞）</div>
          <div style="font-size:0.8rem; color:#475569; line-height:1.45;">
            <strong>労作性狭心症 / 冠攣縮性 / ACS</strong><br>
            冠動脈の内腔狭窄・血栓・痙攣による心筋虚血。<br>
            <span style="color:#0369a1;">Key: ニトロペン、Ca拮抗薬、β遮断薬、DAPT</span>
          </div>
        </div>
        <!-- 区分2: 心不全 -->
        <div style="background:white; border-left:4px solid #3b82f6; border-radius:6px; padding:10px 14px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <div style="font-weight:700; color:#1d4ed8; font-size:0.92rem; margin-bottom:4px;">💔 ② 心不全（ポンプのへたり）</div>
          <div style="font-size:0.8rem; color:#475569; line-height:1.45;">
            <strong>HFrEF（収縮不全） / HFpEF（拡張不全）</strong><br>
            心筋ポンプ機能低下・肺体うっ血・過労死寸前。<br>
            <span style="color:#0369a1;">Key: Fantastic 4（ARNI+β+MRA+SGLT2）、利尿薬</span>
          </div>
        </div>
        <!-- 区分3: 不整脈 -->
        <div style="background:white; border-left:4px solid #eab308; border-radius:6px; padding:10px 14px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <div style="font-weight:700; color:#a16207; font-size:0.92rem; margin-bottom:4px;">⚡ ③ 不整脈（電気信号の乱れ）</div>
          <div style="font-size:0.8rem; color:#475569; line-height:1.45;">
            <strong>心房細動（AF） / 致死性VT/Vf / 徐脈</strong><br>
            刺激伝導のショート・異常自動能・血栓形成。<br>
            <span style="color:#0369a1;">Key: DOAC（脳塞栓予防）、アミオダロン、β遮断薬</span>
          </div>
        </div>
        <!-- 区分4: 弁膜症 -->
        <div style="background:white; border-left:4px solid #10b981; border-radius:6px; padding:10px 14px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <div style="font-weight:700; color:#047857; font-size:0.92rem; margin-bottom:4px;">🚪 ④ 心臓弁膜症（弁の逆流・狭窄）</div>
          <div style="font-size:0.8rem; color:#475569; line-height:1.45;">
            <strong>大動脈弁狭窄（AS） / 僧帽弁閉鎖不全（MR）</strong><br>
            逆流防止ドアの石灰化狭窄・閉鎖不全。<br>
            <span style="color:#0369a1;">Key: 機械弁はDOAC絶対禁忌（ワルファリン一択）</span>
          </div>
        </div>
      </div>
      <div style="margin-top:10px; font-size:0.78rem; color:#64748b; background:#f1f5f9; padding:6px 12px; border-radius:4px;">
        💡 <strong>＋α 心筋症（Cardiomyopathy）：</strong>肥大型心筋症（HCM/HOCM ➔ 心筋ミオシン阻害薬マバカムテン［カムジオス］）や心アミロイドーシス（ATTR-CM ➔ タファミジス［ビンダケル］）など特異的治療薬が登場。
      </div>
    </div>

    <!-- 📊 ガイドライン第一選択・条件分岐アルゴリズムフローチャート -->
    <div class="algo-flow-container">
      <div class="algo-header">
        <div class="algo-title-group">
          <span class="algo-tag">Clinical Flowchart</span>
          <h3 class="algo-title">📊 4. 心臓疾患 4大区分別 第一選択・条件分岐アルゴリズム</h3>
        </div>
        <span class="algo-goal-badge">🎯 目標：虚血イベント阻止 ＆ 心不全生命予後改善 ＆ 心原性脳塞栓予防 ＆ 弁膜症適正管理</span>
      </div>
      <div class="decision-tree-grid">
        
        <!-- 枝1: 虚血性心疾患 -->
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［① 虚血性心疾患（IHD）］</span>
            <span class="branch-target">労作性狭心症 vs 冠攣縮性狭心症 vs 急性冠症候群（ACS）</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">労作性狭心症（器質的狭窄）</div>
              <div class="step-drug">β遮断薬 ＋ 硝酸薬 ＋ スタチン（LDL&lt;70） ＋ アスピリン</div>
              <div class="step-rationale">心拍数・酸素消費量を抑え虚血を予防。発作時はニトロペン舌下。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('メインテート')">メインテート</span><span class="flow-chip" onclick="quickSearch('ニトロペン')">ニトロペン</span><span class="flow-chip" onclick="quickSearch('クレストール')">クレストール</span></div>
            </div>
            <div class="step-arrow">➔</div>
            <div class="step-card second-choice">
              <div class="step-pill second">冠攣縮性狭心症（血管スパスム）</div>
              <div class="step-drug">Ca拮抗薬（ジルチアゼム/アムロジピン）※β遮断薬単独は禁忌！</div>
              <div class="step-rationale">冠動脈平滑筋を直接弛緩。就寝前服用が効果的。β遮断薬単独はα優位で攣縮悪化！</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ヘルベッサー')">ヘルベッサー</span><span class="flow-chip" onclick="quickSearch('ノルバスク')">ノルバスク</span><span class="flow-chip" onclick="quickSearch('フランドルテープ')">フランドルテープ</span></div>
            </div>
            <div class="step-arrow">➔</div>
            <div class="step-card third-choice">
              <div class="step-pill third">ACS / ステント留置後（PCI後）</div>
              <div class="step-drug">DAPT（アスピリン ＋ プラスグレル/クロピドグレル）</div>
              <div class="step-rationale">ステント急性血栓症を完全予防。高出血リスク例は1〜3ヶ月でSAPT（単剤）へ早期移行。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('エフィエント')">エフィエント</span><span class="flow-chip" onclick="quickSearch('バイアスピリン')">バイアスピリン</span></div>
            </div>
          </div>
        </div>

        <!-- 枝2: 心不全 -->
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［② 心不全（HF）］</span>
            <span class="branch-target">HFrEF（LVEF&le;40%：収縮不全） vs HFpEF（LVEF&ge;50%：拡張不全）</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">HFrEF 第一選択（Fantastic 4）</div>
              <div class="step-drug">ARNI ＋ β遮断薬 ＋ MRA ＋ SGLT2阻害薬 早期同時導入！</div>
              <div class="step-rationale">4系統を早期低用量から併用し心不全入院・心血管死を激減。うっ血にはループ利尿薬/サムスカ。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('エンレスト')">エンレスト</span><span class="flow-chip" onclick="quickSearch('ビソプロロール')">ビソプロロール</span><span class="flow-chip" onclick="quickSearch('スピロノラクトン')">スピロノラクトン</span><span class="flow-chip" onclick="quickSearch('フォシーガ')">フォシーガ</span></div>
            </div>
            <div class="step-arrow">➔</div>
            <div class="step-card second-choice">
              <div class="step-pill second">HFpEF 第一選択（拡張不全）</div>
              <div class="step-drug">SGLT2阻害薬（ジャディアンス/フォシーガ：唯一の予後改善薬）</div>
              <div class="step-rationale">心血管死・心不全入院を有意に抑制。過剰な体液貯留には利尿薬・MRAで左室充満圧低減。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ジャディアンス')">ジャディアンス</span><span class="flow-chip" onclick="quickSearch('アゾセミド')">アゾセミド</span></div>
            </div>
          </div>
        </div>

        <!-- 枝3: 不整脈 -->
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［③ 不整脈（Arrhythmia）］</span>
            <span class="branch-target">心房細動（AF：脳塞栓予防・レート・リズム） vs 致死性不整脈（VT/Vf）</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">非弁膜症性心房細動（塞栓予防）</div>
              <div class="step-drug">DOAC（エリキュース / リクシアナ / イグザレルト / プラザキサ）</div>
              <div class="step-rationale">CHADS2スコア&ge;1で導入。ワルファリン比で頭蓋内出血半減。腎機能別減量基準を徹底監査。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('エリキュース')">エリキュース</span><span class="flow-chip" onclick="quickSearch('リクシアナ')">リクシアナ</span><span class="flow-chip" onclick="quickSearch('イグザレルト')">イグザレルト</span></div>
            </div>
            <div class="step-arrow">➔</div>
            <div class="step-card second-choice">
              <div class="step-pill second">AFレート/リズム制御 ＆ 致死性VT</div>
              <div class="step-drug">レート：β遮断薬/ジルチアゼム ／ 致死性VT：アミオダロン（Ⅲ群）</div>
              <div class="step-rationale">レート調整で心室細動・心不全悪化を防止。アミオダロンは甲状腺・肺・角膜のTDM監視必須。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('メインテート')">メインテート</span><span class="flow-chip" onclick="quickSearch('アンカロン')">アンカロン</span><span class="flow-chip" onclick="quickSearch('サンリズム')">サンリズム</span></div>
            </div>
          </div>
        </div>

        <!-- 枝4: 弁膜症 -->
        <div class="decision-branch">
          <div class="branch-condition-header">
            <span class="branch-icon">🔀</span>
            <span class="branch-cond-label">［④ 心臓弁膜症（VHD）］</span>
            <span class="branch-target">機械弁置換術後・MS（中等度以上） vs 大動脈弁狭窄症（AS）</span>
          </div>
          <div class="branch-flow-steps">
            <div class="step-card first-choice">
              <div class="step-pill first">機械弁置換術後 / 僧帽弁狭窄（MS）</div>
              <div class="step-drug">【DOAC絶対禁忌！】ワルファリン単独（PT-INR 2.0〜3.0）</div>
              <div class="step-rationale">機械弁へのDOAC投与は血栓・出血が激増し禁忌！ワルファリン一択で納豆・青汁厳格制限。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ワーファリン')">ワーファリン</span></div>
            </div>
            <div class="step-arrow">➔</div>
            <div class="step-card second-choice">
              <div class="step-pill second">大動脈弁狭窄症（高齢AS）</div>
              <div class="step-drug">TAVI/手術優先 【血管拡張薬・ニトロペン・過度降圧はショック禁忌・注意】</div>
              <div class="step-rationale">固定狭窄のため後負荷・前負荷急減で冠血流低下・失神ショック。適応あれば早期TAVI。</div>
              <div class="step-chips"><span class="flow-chip" onclick="quickSearch('サワシリン')">サワシリン（抜歯前IE予防）</span></div>
            </div>
          </div>
        </div>

      </div>
      <div class="algo-footer-pitfall">
        <strong>⚠️ 処方監査・超重要チェック：</strong>
        <span>
          ① 冠攣縮性狭心症にβ遮断薬単独は禁忌（α優位で攣縮悪化）！<br>
          ② 機械弁置換術後や中等度以上MSの心房細動にDOACは絶対禁忌（ワルファリン一択）！<br>
          ③ 重度AS（大動脈弁狭窄）に硝酸薬（ニトロペン）やPDE5阻害薬は過度な血圧低下・失神ショックを招くため禁忌・慎重投与！
        </span>
      </div>
    </div>

    <!-- 4大区分の臨床詳細ボックス（Grid-2） -->
    <div class="grid-2">
      <div class="box">
        <h3>🧭 虚血性心疾患 ＆ 心不全の攻略ポイント</h3>
        <ul>
          <li><strong>虚血性心疾患（IHD）の型：</strong>
            労作性は「動いたら苦しい（器質的狭窄）」➔ β遮断薬＋スタチン。
            冠攣縮性は「夜間・早朝に苦しい（スパスム）」➔ <strong>Ca拮抗薬（ジルチアゼム/アムロジピン）が主役</strong>。
          </li>
          <li><strong>急性冠症候群（ACS）後のDAPTトレンド：</strong>
            ステント留置後は「アスピリン＋P2Y12阻害薬（プラスグレル/クロピドグレル）」。
            最新ガイドラインでは出血リスク（PRECISE-DAPT / ARC-HBR）を評価し、<strong>1〜3ヶ月で早期に単剤（SAPT）へステップダウン</strong>する。
          </li>
          <li><strong>心不全（HFrEF）のFantastic 4：</strong>
            ①ARNI（エンレスト）、②β遮断薬（メインテート等）、③MRA（スピロノラクトン等）、④SGLT2阻害薬（フォシーガ/ジャディアンス）。この4剤をなるべく早く揃えることが生命予後改善の最大キー。
          </li>
        </ul>
      </div>
      <div class="box">
        <h3>⚡ 不整脈 ＆ 弁膜症の攻略ポイント</h3>
        <ul>
          <li><strong>心房細動（AF）の抗凝固療法：</strong>
            CHADS2スコア1点以上ならDOAC導入（エリキュース、リクシアナ、イグザレルト、プラザキサ）。
            <strong>腎機能低下（Ccr/eGFR）や低体重による減量基準の監査</strong>を徹底。
          </li>
          <li><strong>アミオダロン（アンカロン）のトリプル毒性：</strong>
            構造にヨウ素を多量に含むため、①<strong>甲状腺機能異常（TSHモニタリング）</strong>、②<strong>間質性肺炎（乾性咳嗽・発熱・息切れ）</strong>、③<strong>角膜色素沈着</strong>が必発・頻発する。
          </li>
          <li><strong>弁膜症のDOAC禁忌とIE予防：</strong>
            「機械弁置換術後」はDOAC禁忌（ワルファリンのみ）。
            人工弁・弁膜症患者の<strong>抜歯など歯科処置前には感染性心内膜炎（IE）予防としてアモキシシリン2gを処置1時間前に単回服用</strong>する。
          </li>
        </ul>
      </div>
    </div>

    <!-- 処方箋のウラ読み -->
    <div class="offlabel">
      <h3>🕵️‍♂️ 処方箋のウラ読み（適応外・意外な処方意図・処方の地雷）</h3>
      <ul>
        <li><strong>アルダクトンA（スピロノラクトン）25mg：</strong>
          分類上は利尿薬だが、心不全で少量出ている時は利尿目的ではなく<strong>「心筋リモデリング抑制（心臓の線維化を防ぎ寿命を延ばす）」</strong>。患者さんに「おしっこを出す薬」と説明すると自己中断され心不全が悪化する！
        </li>
        <li><strong>なぜ冠攣縮性狭心症にプロプラノロール（インデラル）単独はダメなのか？：</strong>
          冠動脈には血管を広げる「β2受容体」と縮める「α1受容体」がある。非選択的β遮断薬でβ2を塞ぐと、交感神経の刺激がα1受容体に集中して<strong>冠動脈が激しく攣縮（スパズム）し、心筋梗塞を誘発してしまう</strong>！
        </li>
        <li><strong>大動脈弁狭窄症（AS）の患者にニトロペン（硝酸薬）を出してはいけない理由：</strong>
          大動脈弁がガチガチに狭くなっているため、心臓はこれ以上血液を押し出せない（固定性拍出障害）。ここでニトロペンで末梢血管を急激に広げると、血圧を保てずに<strong>冠血流急減・脳貧血を起こして失神・ショック死するリスク</strong>がある！
        </li>
        <li><strong>歯科処置前のサワシリン（アモキシシリン）カプセル 4カプセル（2000mg）一括服用：</strong>
          「1回2000mgも飲んで大丈夫？」と疑義照会したくなるが、これは<strong>「感染性心内膜炎（IE）予防ガイドライン」に準拠した国際標準処方</strong>。口腔内レンサ球菌が人工弁や変形した弁に定着して敗血症・心不全を起こすのを防ぐための先手必勝投与。
        </li>
      </ul>
    </div>

    <!-- 先輩からの現場の勘所 -->
    <div class="pearl">
      <h3>💡 先輩からの現場の勘所（Clinical Pearls）</h3>
      <ul>
        <li><strong>心不全患者の「1週間で体重＋2kg」は救急車サイン！：</strong>
          大人が1週間で脂肪を2kg増やすのは物理的に不可能。数日で増えた2kgは<strong>すべて「体に溜まった水（うっ血）」</strong>。毎朝トイレ後の体重測定と、足のスネの圧痕性浮腫（むくみ）の自己チェックを指導しよう。
        </li>
        <li><strong>ニトロペン舌下錠の指導3箇条：</strong>
          ①<strong>「立って飲まない（必ず座るか横になる）」</strong>：起立性低血圧で転倒する。<br>
          ②<strong>「絶対に飲み込まない（舌の下で溶かす）」</strong>：飲み込むと肝臓の初回通過効果でほぼ無効化される。<br>
          ③<strong>「5分あけて2〜3回使っても治まらない胸痛は即119番（救急要請）」</strong>：それは狭心症ではなく心筋梗塞（ACS）である可能性が高い！
        </li>
        <li><strong>機械弁 vs 生体弁の薬学的違い：</strong>
          「機械弁」は半永久的に壊れないが血栓ができやすいため<strong>一生涯ワルファリン（DOAC不可）</strong>。「生体弁」はウシ・ブタの心膜で15年程度で劣化するが、抗凝固療法は術後3ヶ月〜半年程度で終了できる（またはDOAC使用可能）。
        </li>
      </ul>
    </div>

    <div class="question-box">
      <strong>🙋‍♂️ 実習生への問いかけ：</strong>「心房細動の患者さんに、なぜバイアスピリン（抗血小板薬）ではなくDOAC（抗凝固薬）を使わなければならないのか？また、大動脈弁を人工弁に置換した患者さんが『納豆を食べたいからDOACに替えてほしい』と言ってきたら、あなたはどう答えますか？」
    </div>
  
    <div class="memo-area">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <strong style="color:#0f172a; font-size:0.92rem;">📝 実習生 症例ディスカッション＆メモ欄（印刷後手書き用）：</strong>
        <span style="font-size:0.75rem; color:#64748b; border:1px solid #cbd5e1; padding:2px 10px; border-radius:4px; background:white;">指導薬剤師 印：　　　　</span>
      </div>
      <div style="font-size:0.85rem; color:#64748b; line-height:1.5;">
        ・担当患者の病態区分（虚血・心不全・不整脈・弁膜症）：<br>
        ・現在の処方意図・疑義照会・服薬指導での気づき：
      </div>
    </div>

  </div>`;

guideHtml = guideHtml.substring(0, matchStart) + newC4Html + "\n\n" + guideHtml.substring(matchEnd);
fs.writeFileSync(guidePath, guideHtml, 'utf8');
console.log("Successfully updated c4 (Heart disease classifications) in src/03_guide.html");
