const fs = require('fs');
const path = require('path');

console.log("=== Building OTC First-Class Drugs (第1類医薬品) Master ===");

// ============================================================================
// 1. Update src/12_otc_guide.html
// ============================================================================
const otcPath = path.join(__dirname, '..', '12_otc_guide.html');
let otcHtml = fs.readFileSync(otcPath, 'utf8');

// Add button to tab-bar
const oldTabBar = `<button class="tab-btn" onclick="showOtc('o-guidance', this)">🏛️ ④ 要指導医薬品（対面必須・アライ等）</button>
    </div>`;

const newTabBar = `<button class="tab-btn" onclick="showOtc('o-guidance', this)">🏛️ ④ 要指導医薬品（対面必須・アライ等）</button>
      <button class="tab-btn" onclick="showOtc('o-first', this)">🥇 ⑤ 第1類医薬品（ロキソニン・ガスター・リアップ等）</button>
    </div>`;

if (otcHtml.includes(oldTabBar) && !otcHtml.includes('o-first')) {
  otcHtml = otcHtml.replace(oldTabBar, newTabBar);
  console.log("Added o-first button to tab-bar!");
}

const section5Html = `
  <!-- ==========================================
       5. 第1類医薬品（第1類薬）マスター
       ========================================== -->
  <div class="otc-section o-first">
    <div class="sec-header" style="border-left:5px solid #d97706; background:linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);">
      <span class="sec-badge" style="background:#d97706; color:white;">セクション ⑤ / Class 1 OTC Master</span>
      <h2 class="sec-title" style="color:#b45309;">🥇 ⑤ 第1類医薬品マスター：代表8大製剤・鑑査の地雷・ネット販売手続き・受診勧奨基準</h2>
      <span class="sec-subtitle">薬剤師の情報提供義務（書面交付）・ロキソニンS 4兄弟の使い分け・ガスター10の2週間限界・リアップ循環器リスク完全攻略</span>
    </div>

    <!-- 1. 第1類医薬品の販売ルール ＆ ネット販売（特定販売）の仕組み -->
    <div class="otc-card" style="margin-bottom:20px; background:white; border:1.5px solid #cbd5e1;">
      <h3 style="font-size:1.1rem; color:#0f172a; margin-bottom:10px; display:flex; align-items:center; gap:8px;">
        <span>📜</span> <strong>1. 第1類医薬品の販売ルール ＆ インターネット販売（特定販売）の法定要件</strong>
      </h3>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:12px; font-size:0.84rem; line-height:1.5;">
        <div style="background:#f8fafc; border-left:3px solid #d97706; padding:10px 12px; border-radius:0 6px 6px 0;">
          <strong style="color:#b45309;">👨‍⚕️ 薬剤師による書面交付・情報提供が義務（薬機法第36条の10第1項）：</strong><br>
          登録販売者は販売できません。店頭では<strong>「書面を交付して」</strong>必要な情報提供を行うことが法的な義務です。購入者の年齢、性別、症状、持病、併用薬、アレルギー歴の確認が必須です。
        </div>
        <div style="background:#f8fafc; border-left:3px solid #0284c7; padding:10px 12px; border-radius:0 6px 6px 0;">
          <strong style="color:#0284c7;">💻 インターネット販売（特定販売）の4ステップ手順：</strong><br>
          要指導医薬品と異なり、第1類医薬品はネット販売が認められています。ただし、①購入者の状態確認（問診入力）➔ ②薬剤師による個別情報提供メール送信 ➔ ③<strong>購入者による「内容を理解した」旨の承諾手続き</strong> ➔ ④薬剤師の出荷承認、の手順を踏むことが法律で義務付けられています。
        </div>
      </div>
    </div>

    <!-- 2. 代表8大ジャンル 完全攻略図鑑 -->
    <div class="otc-card" style="margin-bottom:20px;">
      <h3 style="font-size:1.1rem; color:#0f172a; margin-bottom:10px; display:flex; align-items:center; gap:8px;">
        <span>🏆</span> <strong>2. 現場で毎日出る「第1類医薬品 代表8大ジャンル」完全攻略図鑑</strong>
      </h3>
      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; font-size:0.85rem; background:white; border-radius:8px; overflow:hidden; border:1px solid #cbd5e1;">
          <thead>
            <tr style="background:#0f172a; color:white; text-align:left;">
              <th style="padding:9px 10px; width:15%;">ジャンル・代表製品</th>
              <th style="padding:9px 10px; width:16%;">有効成分・作用機序</th>
              <th style="padding:9px 10px; width:22%;">調剤鑑査上の重大地雷（禁忌・期間制限）</th>
              <th style="padding:9px 10px; width:47%;">なぜ医師・患者はこの薬を選ぶのか？ ＆ 使い分けの結論（Clinical Pearls）</th>
            </tr>
          </thead>
          <tbody>
            <!-- ロキソニンSシリーズ -->
            <tr style="border-bottom:1px solid #e2e8f0; background:#f0f9ff;">
              <td style="padding:10px;">
                <strong style="color:#0369a1; font-size:0.95rem;">ロキソニンS シリーズ</strong><br>
                <span style="font-size:0.75rem; color:#64748b;">第一三共ヘルスケア</span>
              </td>
              <td style="padding:10px;">
                <strong>ロキソプロフェンナトリウム</strong><br>
                （68.1mg / 錠）<br>
                プロドラッグ型NSAIDs
              </td>
              <td style="padding:10px;">
                <strong style="color:#b91c1c;">アスピリン喘息（禁忌！）</strong><br>
                <strong style="color:#b91c1c;">妊娠後期28週以降（絶対禁忌！）</strong><br>
                消化性潰瘍、重篤な腎障害。1回1錠、1日2回（頓用で3回可・4時間以上間隔）。
              </td>
              <td style="padding:10px;">
                <span class="char" style="background:#e0f2fe; color:#0369a1; font-weight:700; padding:2px 6px; border-radius:4px; font-size:0.78rem;">【4兄弟の神使い分け】</span><br>
                ・<strong>ロキソニンS：</strong>基本形。小粒で飲みやすい。<br>
                ・<strong>ロキソニンSプラス：</strong>＋酸化Mgで胃粘膜を保護。胃が弱い人に。<br>
                ・<strong>ロキソニンSプレミアム：</strong>＋鎮静成分（アリルイソプロピルアセチル尿素）＋無水カフェイン＋胃薬。激しい頭痛に最強だが<strong>眠気あり・運転絶対不可！</strong><br>
                ・<strong>ロキソニンSプレミアムファイン：</strong><strong>月経痛特化型！</strong>シャクヤク＋ヘスペリジン＋酸化Mg。<strong>眠くなる成分ゼロで仕事・運転も安心！</strong>
              </td>
            </tr>

            <!-- ガスター10 -->
            <tr style="border-bottom:1px solid #e2e8f0;">
              <td style="padding:10px;">
                <strong style="color:#0f172a; font-size:0.95rem;">ガスター10</strong><br>
                <span style="font-size:0.75rem; color:#64748b;">第一三共ヘルスケア</span>
              </td>
              <td style="padding:10px;">
                <strong>ファモチジン（10mg）</strong><br>
                H2受容体拮抗薬（胃酸分泌抑制）
              </td>
              <td style="padding:10px;">
                <strong style="color:#b91c1c;">【連続服用は2週間まで！】</strong><br>
                80歳以上高齢者（せん妄・痙攣リスク）、15歳未満小児、重篤な腎障害。
              </td>
              <td style="padding:10px;">
                <span class="char" style="background:#f1f5f9; color:#475569; font-weight:700; padding:2px 6px; border-radius:4px; font-size:0.78rem;">胃酸の出すぎによる胃痛・胸やけをシャープに鎮火</span><br>
                攻撃因子（胃酸）を元から断つ。<strong>「3日間飲んでも症状が良くならない、または2週間を超えて続く場合は胃がんや胃潰瘍の疑いがあるため直ちに消化器内科へ受診勧奨」</strong>することが薬剤師の義務！
              </td>
            </tr>

            <!-- リアップX5プラスネオ -->
            <tr style="border-bottom:1px solid #e2e8f0; background:#f0fdf4;">
              <td style="padding:10px;">
                <strong style="color:#15803d; font-size:0.95rem;">リアップX5プラスネオ</strong><br>
                <span style="font-size:0.75rem; color:#64748b;">大正製薬</span>
              </td>
              <td style="padding:10px;">
                <strong>ミノキシジル（5%）</strong><br>
                毛包細胞増殖・血流改善
              </td>
              <td style="padding:10px;">
                <strong style="color:#b91c1c;">高血圧・低血圧・心疾患！</strong><br>
                <strong style="color:#b91c1c;">女性には使用不可（禁忌！）</strong><br>
                20歳未満、円形脱毛症（AGA以外には無効）。
              </td>
              <td style="padding:10px;">
                <span class="char" style="background:#dcfce7; color:#15803d; font-weight:700; padding:2px 6px; border-radius:4px; font-size:0.78rem;">国内唯一の発毛成分！効果実感には4ヶ月の継続が必須</span><br>
                元々血管拡張性降圧薬として開発されたため心血管リスクを必ず確認。女性の薄毛には「リアップリジェンヌ（ミノキシジル1%）」のみ使用可（女性の5%使用は多毛症リスク等で禁忌）。
              </td>
            </tr>

            <!-- トランシーノII -->
            <tr style="border-bottom:1px solid #e2e8f0; background:#fffbeb;">
              <td style="padding:10px;">
                <strong style="color:#d97706; font-size:0.95rem;">トランシーノII</strong><br>
                <span style="font-size:0.75rem; color:#64748b;">第一三共ヘルスケア</span>
              </td>
              <td style="padding:10px;">
                <strong>トラネキサム酸（750mg/日）</strong><br>
                ＋ L-システイン ＋ ビタミンC
              </td>
              <td style="padding:10px;">
                <strong style="color:#b91c1c;">血栓症（脳梗塞・心筋梗塞・血栓性静脈炎）禁忌！</strong><br>
                トロンビン内服中禁忌。55歳以上。<br>
                <strong style="color:#b91c1c;">【2ヶ月服用したら必ず2ヶ月休薬！】</strong>
              </td>
              <td style="padding:10px;">
                <span class="char" style="background:#fef3c7; color:#b45309; font-weight:700; padding:2px 6px; border-radius:4px; font-size:0.78rem;">頬骨に左右対称に出る「肝斑（かんぱん）」の唯一の改善薬</span><br>
                トラネキサム酸がメラノサイト活性化因子（プラスミン）を阻害。抗プラスミン作用による<strong>血栓塞栓リスクがあるため、2ヶ月を超えて漫然と連続内服させてはならない</strong>（必ず2ヶ月休薬を徹底指導）。
              </td>
            </tr>

            <!-- メディトリート -->
            <tr style="border-bottom:1px solid #e2e8f0; background:#fdf2f8;">
              <td style="padding:10px;">
                <strong style="color:#ec4899; font-size:0.95rem;">メディトリート</strong><br>
                <span style="font-size:0.75rem; color:#64748b;">大正製薬</span>
              </td>
              <td style="padding:10px;">
                <strong>ミコナゾール硝酸塩</strong><br>
                抗真菌薬（膣坐剤・軟膏）
              </td>
              <td style="padding:10px;">
                <strong style="color:#b91c1c;">【過去に医師の診断を受けた再発限定！】</strong><br>
                初発患者は受診勧奨。生理中不可。<br>
                ワルファリン併用（抗凝固増強注意）。
              </td>
              <td style="padding:10px;">
                <span class="char" style="background:#fce7f3; color:#ec4899; font-weight:700; padding:2px 6px; border-radius:4px; font-size:0.78rem;">膣カンジダの再発を自宅で治せるOTC</span><br>
                酒かす状・ポロポロしたオリモノとかゆみ。初発はトリコモナスやクラミジア等のSTIや子宮疾患との鑑別が必要なため、<strong>「以前病院で膣カンジダと言われたことがあるか」</strong>を必ず対面確認する。
              </td>
            </tr>

            <!-- アクチビア / ヘルペシア -->
            <tr style="border-bottom:1px solid #e2e8f0;">
              <td style="padding:10px;">
                <strong style="color:#0f172a; font-size:0.95rem;">アクチビア軟膏</strong><br>
                <strong style="color:#0f172a; font-size:0.95rem;">ヘルペシア軟膏</strong>
              </td>
              <td style="padding:10px;">
                <strong>アシクロビル（5%）</strong><br>
                抗ヘルペスウイルス外用薬
              </td>
              <td style="padding:10px;">
                <strong style="color:#b91c1c;">【口唇ヘルペスの再発限定！】</strong><br>
                初発・口唇以外の部位（性器・帯状疱疹等）は不可（受診勧奨）。
              </td>
              <td style="padding:10px;">
                <span class="char" style="background:#f1f5f9; color:#475569; font-weight:700; padding:2px 6px; border-radius:4px; font-size:0.78rem;">ピリピリ・チクチクの前駆症状（初期）に塗るのが命！</span><br>
                ウイルスの増殖初期を叩く薬。水疱が破れてジュクジュク・かさぶたになってからでは効果が低いため、「違和感を感じたらすぐに塗る」よう指導する。
              </td>
            </tr>

            <!-- ニコチネルパッチ -->
            <tr style="border-bottom:1px solid #e2e8f0; background:#fef2f2;">
              <td style="padding:10px;">
                <strong style="color:#b91c1c; font-size:0.95rem;">ニコチネルパッチ</strong><br>
                <span style="font-size:0.75rem; color:#64748b;">GSK</span>
              </td>
              <td style="padding:10px;">
                <strong>ニコチン（TTS製剤）</strong><br>
                経皮吸収型ニコチン補充
              </td>
              <td style="padding:10px;">
                <strong style="color:#b91c1c; font-size:0.95rem;">🚨 貼付中の喫煙は絶対禁止！</strong><br>
                重篤な心室細動・心筋梗塞死の危険。<br>
                急性心不全、重篤な不整脈、妊婦禁忌。
              </td>
              <td style="padding:10px;">
                <span class="char" style="background:#fee2e2; color:#b91c1c; font-weight:700; padding:2px 6px; border-radius:4px; font-size:0.78rem;">タバコを吸わずに禁断症状を和らげるステップダウン療法</span><br>
                最初の6週間はパッチ20（Step 1）、次の2週間はパッチ10（Step 2）へ減量して約8週間で卒煙。毎日貼る場所を変え、貼ったまま絶対にタバコを吸わないことを誓約させる。
              </td>
            </tr>

            <!-- 排卵日予測検査薬 -->
            <tr style="background:#f8fafc;">
              <td style="padding:10px;">
                <strong style="color:#7c3aed; font-size:0.95rem;">ドゥーテストLHa</strong><br>
                <strong style="color:#7c3aed; font-size:0.95rem;">ハイテスターH</strong>
              </td>
              <td style="padding:10px;">
                <strong>抗黄体形成ホルモン（LH）モノクローナル抗体</strong>
              </td>
              <td style="padding:10px;">
                判定保留時の確認。<br>
                不妊治療薬（hCG製剤等）投与中は偽陽性となるため注意。
              </td>
              <td style="padding:10px;">
                <span class="char" style="background:#ede9fe; color:#6d28d9; font-weight:700; padding:2px 6px; border-radius:4px; font-size:0.78rem;">LHサージを捉えて最も妊娠しやすい排卵日前日を予測</span><br>
                次回生理予定日の17日前から検査開始。陽性が出たら翌日までにタイミングを取る。体外診断用医薬品から第1類OTCへ移行した代表製品。
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 3. 先輩薬剤師からの Clinical Pearls -->
    <div class="otc-card" style="background:white; border:1px solid #cbd5e1;">
      <h3 style="font-size:1.05rem; color:#0f172a; margin-bottom:8px; display:flex; align-items:center; gap:8px;">
        <span>💡</span> <strong>先輩薬剤師が伝授する「第1類医薬品カウンター鑑査の極意」</strong>
      </h3>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:12px; font-size:0.83rem; line-height:1.5;">
        <div style="background:#f8fafc; border-left:3px solid #b45309; padding:8px 10px; border-radius:0 6px 6px 0;">
          <strong style="color:#b45309;">🚨 ロキソニンSの「痛くなってから飲む」落とし穴：</strong><br>
          プロスタグランジン（PG）が大量に産生されてしまってからではNSAIDsの効き目が落ちます。「生理痛や偏頭痛は、<strong>我慢せず『痛くなり始めた初期』に飲む</strong>のが一番効き、トータルの内服錠数を最も減らせます」と指導するのがプロ。
        </div>
        <div style="background:#f8fafc; border-left:3px solid #dc2626; padding:8px 10px; border-radius:0 6px 6px 0;">
          <strong style="color:#dc2626;">🚨 市販薬の「受診勧奨レッドフラッグ（見逃してはならない危険兆候）」：</strong><br>
          ①胃痛＋黒色便（タール便：胃潰瘍出血）、②突然バットで殴られたような激しい頭痛（くも膜下出血）、③胸の中央が締め付けられる圧迫痛（狭心症・心筋梗塞）、④片側のふくらはぎの腫れと激痛（深部静脈血栓症）。これらは第1類を売らず直ちに救急・受診を指示！
        </div>
      </div>
    </div>
  </div>
`;

// Insert Section 5 before `</div><!-- /.otc-container -->`
const endOtcContainer = '</div><!-- /.otc-container -->';
const pEndOtc = otcHtml.lastIndexOf(endOtcContainer);

if (pEndOtc !== -1) {
  otcHtml = otcHtml.substring(0, pEndOtc) + section5Html + '\n\n  ' + otcHtml.substring(pEndOtc);
  fs.writeFileSync(otcPath, otcHtml, 'utf8');
  console.log("Successfully inserted Section 5 into 12_otc_guide.html!");
} else {
  console.error("Could not find end of otc-container in 12_otc_guide.html");
  process.exit(1);
}


// ============================================================================
// 2. Update src/14_dictionary.html (Add Class 1 OTC Cards)
// ============================================================================
const dictPath = path.join(__dirname, '..', '14_dictionary.html');
let dictHtml = fs.readFileSync(dictPath, 'utf8');

const firstClassDictCards = `
      <!-- 第1類医薬品制度 -->
      <div class="dict-card" data-category="special">
        <div class="dict-card-header">
          <span class="dict-tag">OTC・法規</span>
          <span class="dict-badge">書面交付義務</span>
        </div>
        <h3 class="dict-card-title">第1類医薬品（薬剤師専権・書面交付義務・ネット販売手順）</h3>
        <p class="dict-card-desc">
          <strong>【定義】</strong>副作用等により日常生活に支障を来す程度の健康被害を生ずるおそれがあり、使用に特に注意が必要な一般用医薬品。<br>
          <strong>【販売資格】</strong><strong>薬剤師のみ</strong>（登録販売者は不可）。<br>
          <strong>【販売ルール】</strong><strong>書面を交付した情報提供が法的な義務</strong>。要指導医薬品と異なり<strong>ネット販売（特定販売）が可能</strong>だが、問診確認と薬剤師による個別情報提供・購入者の承諾確認が必須。<br>
          <strong>【陳列】</strong>手の届かない場所または情報提供場所から7m以内。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">代表薬：ロキソニンS、ガスター10、リアップ、トランシーノII</span>
        </div>
      </div>

      <!-- ロキソニンS 4兄弟 -->
      <div class="dict-card" data-category="special">
        <div class="dict-card-header">
          <span class="dict-tag">第1類・解熱鎮痛</span>
          <span class="dict-badge">4兄弟使い分け</span>
        </div>
        <h3 class="dict-card-title">ロキソニンS 4兄弟（ノーマル / プラス / プレミアム / プレミアムファイン）</h3>
        <p class="dict-card-desc">
          <strong>① ロキソニンS：</strong>基本単剤。小粒で速効。<br>
          <strong>② ロキソニンSプラス：</strong>＋酸化Mgで胃粘膜保護。胃が荒れやすい人に。<br>
          <strong>③ ロキソニンSプレミアム：</strong>＋鎮静成分（アリルイソプロピルアセチル尿素）＋カフェイン＋メタケイ酸アルミン酸Mg。つらい頭痛に最強だが<strong>【眠気あり・運転絶対不可！】</strong>。<br>
          <strong>④ ロキソニンSプレミアムファイン：</strong><strong>月経痛特化型！</strong>シャクヤク＋ヘスペリジン＋酸化Mg。<strong>【眠くなる成分ゼロで仕事・運転可】</strong>。<br>
          <strong>【鑑査地雷】</strong>アスピリン喘息禁忌、妊娠28週以降禁忌。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">用法：1回1錠、1日2回（頓用3回可・4時間以上間隔）</span>
        </div>
      </div>

      <!-- ガスター10 -->
      <div class="dict-card" data-category="special">
        <div class="dict-card-header">
          <span class="dict-tag">第1類・消化器</span>
          <span class="dict-badge">2週間限界</span>
        </div>
        <h3 class="dict-card-title">ガスター10（ファモチジン / 2週間制限・高齢者せん妄・H2ブロッカー）</h3>
        <p class="dict-card-desc">
          <strong>【作用】</strong>H2受容体を遮断し過剰な胃酸分泌を抑制（胃痛・胸やけ）。<br>
          <strong>【最大鑑査急所】</strong><strong>【連続服用は2週間まで！】</strong>。3日間で効果がない場合や2週間を超えて症状が続く場合は、胃がん・胃潰瘍の可能性があるため直ちに受診勧奨。<br>
          <strong>【注意】</strong>80歳以上の高齢者は中枢移行による「せん妄・痙攣」リスクのため不可。15歳未満不可。腎機能障害時は排泄遅延に注意。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">剤形：錠剤、散剤、内服液、S錠（口腔内崩壊錠）</span>
        </div>
      </div>

      <!-- リアップX5プラスネオ -->
      <div class="dict-card" data-category="special">
        <div class="dict-card-header">
          <span class="dict-tag">第1類・発毛剤</span>
          <span class="dict-badge">心血管注意</span>
        </div>
        <h3 class="dict-card-title">リアップX5プラスネオ（外用ミノキシジル 5% / 循環器リスク・女性禁忌）</h3>
        <p class="dict-card-desc">
          <strong>【適応】</strong>男性の壮年性脱毛症（AGA）。毛包細胞の増殖と血流促進。<br>
          <strong>【鑑査地雷】</strong>高血圧・低血圧・心疾患の既往（元々降圧薬のため心血管系への影響）。20歳未満不可。円形脱毛症は無効。<br>
          <strong>【女性禁忌】</strong>女性にはミノキシジル5%製剤は多毛症リスク等のため禁忌（女性用は1%のリアップリジェンヌを使用）。最低4ヶ月の連用が必要であることを事前説明。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">用法：1日2回、1回1mLを頭皮に塗布</span>
        </div>
      </div>

      <!-- トランシーノII -->
      <div class="dict-card" data-category="special">
        <div class="dict-card-header">
          <span class="dict-tag">第1類・皮膚美白</span>
          <span class="dict-badge">血栓症リスク</span>
        </div>
        <h3 class="dict-card-title">トランシーノII（トラネキサム酸 750mg / 肝斑改善・血栓リスク・2ヶ月休薬）</h3>
        <p class="dict-card-desc">
          <strong>【適応】</strong>肝斑（かんぱん：頬骨に左右対称にできるシミ）に唯一効くOTC。<br>
          <strong>【成分】</strong>トラネキサム酸750mg/日 ＋ L-システイン ＋ ビタミンC。<br>
          <strong>【重大鑑査】</strong><strong>血栓塞栓症（脳梗塞・心筋梗塞・血栓性静脈炎）の既往患者には禁忌！</strong>55歳以上注意。<br>
          <strong>【服用期間】</strong><strong>【最大2ヶ月まで！】</strong>。2ヶ月内服後は必ず2ヶ月以上の休薬期間を設ける（漫然連用厳禁）。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">指導：ピル（経口避妊薬）内服中は血栓リスク増大のため注意</span>
        </div>
      </div>
`;

const pLastDictDiv = dictHtml.lastIndexOf('</div>\n  </div>\n</div>');
if (pLastDictDiv !== -1) {
  dictHtml = dictHtml.substring(0, pLastDictDiv) + firstClassDictCards + '\n    ' + dictHtml.substring(pLastDictDiv);
  fs.writeFileSync(dictPath, dictHtml, 'utf8');
  console.log("Successfully inserted Class 1 OTC cards into 14_dictionary.html!");
} else {
  const pEndDiv = dictHtml.lastIndexOf('</div>');
  const pSecondLast = dictHtml.lastIndexOf('</div>', pEndDiv - 1);
  dictHtml = dictHtml.substring(0, pSecondLast) + firstClassDictCards + '\n    ' + dictHtml.substring(pSecondLast);
  fs.writeFileSync(dictPath, dictHtml, 'utf8');
  console.log("Inserted Class 1 OTC cards using alternative target in 14_dictionary.html!");
}


// ============================================================================
// 3. Update src/09_app.js (Add Class 1 OTC Drugs to DRUG_DB)
// ============================================================================
const appPath = path.join(__dirname, '..', '09_app.js');
let appJs = fs.readFileSync(appPath, 'utf8');

const newClass1Drugs = `  // 第1類医薬品（OTC 05 追加）
  { name: "ロキソニンS / プレミアム / ファイン", gen: "ロキソプロフェンナトリウム水和物", cat: "第1類医薬品（解熱鎮痛）", char: "NSAIDs市販薬の絶対王者！アスピリン喘息・妊娠後期28週以降は完全禁忌", desc: "プロドラッグ型NSAIDs。頭痛特化のプレミアム（眠気成分あり）、生理痛特化のプレミアムファイン（眠気なし）。アスピリン喘息・妊娠28週以降は禁忌。4時間以上あけて服用。", gId: "tab-otc", cSec: "o-first" },
  { name: "ガスター10", gen: "ファモチジン", cat: "第1類医薬品（H2ブロッカー）", char: "過剰な胃酸分泌を元から断つ！【連続服用は2週間まで！治らなければ受診】", desc: "H2ブロッカー。胃痛・胸やけに速効。連続服用は2週間まで（治らない胃痛は胃がん・潰瘍疑いで受診勧奨）。80歳以上高齢者（せん妄）、15歳未満不可。", gId: "tab-otc", cSec: "o-first" },
  { name: "リアップX5プラスネオ", gen: "ミノキシジル", cat: "第1類医薬品（発毛剤）", char: "国内唯一の発毛成分5%配合！高血圧・心疾患注意！女性には使用不可", desc: "男性壮年性脱毛症（AGA）治療薬。血管拡張作用があるため高血圧・低血圧・心血管疾患に注意。女性への5%使用は多毛症リスク等で禁忌（女性用は1%リジェンヌ）。最低4ヶ月連用。", gId: "tab-otc", cSec: "o-first" },
  { name: "トランシーノII", gen: "トラネキサム酸 / L-システイン等", cat: "第1類医薬品（肝斑改善薬）", char: "頬の左右対称のシミ（肝斑）に唯一効く！血栓症注意！【2ヶ月で必ず休薬】", desc: "トラネキサム酸750mg/日配合。メラニン産生を阻害。抗プラスミン作用による血栓リスクがあるため脳梗塞既往等は不可。最大2ヶ月服用後、必ず2ヶ月以上休薬する。", gId: "tab-otc", cSec: "o-first" },
`;

const insertMarker = 'cSec: "o-guidance" },';
if (appJs.includes(insertMarker)) {
  const pos = appJs.indexOf(insertMarker) + insertMarker.length;
  appJs = appJs.substring(0, pos) + '\n' + newClass1Drugs + appJs.substring(pos);
  fs.writeFileSync(appPath, appJs, 'utf8');
  console.log("Successfully inserted Class 1 OTC drugs into 09_app.js!");
}

console.log("=== OTC First-Class Master Build Complete! ===");
