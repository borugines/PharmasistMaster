const fs = require('fs');
const path = require('path');

console.log("=== Building OTC Guidance-Mandated Drugs (要指導医薬品) Master ===");

// ============================================================================
// 1. Update src/12_otc_guide.html
// ============================================================================
const otcPath = path.join(__dirname, '..', '12_otc_guide.html');
let otcHtml = fs.readFileSync(otcPath, 'utf8');

// Add button to tab-bar
const oldTabBar = `<button class="tab-btn" onclick="showOtc('o-cold', this)">🤧 ③ 総合感冒薬の「分解パズル」と漢方</button>
    </div>`;

const newTabBar = `<button class="tab-btn" onclick="showOtc('o-cold', this)">🤧 ③ 総合感冒薬の「分解パズル」と漢方</button>
      <button class="tab-btn" onclick="showOtc('o-guidance', this)">🏛️ ④ 要指導医薬品（対面必須・アライ等）</button>
    </div>`;

if (otcHtml.includes(oldTabBar) && !otcHtml.includes('o-guidance')) {
  otcHtml = otcHtml.replace(oldTabBar, newTabBar);
  console.log("Added o-guidance button to tab-bar!");
}

const section4Html = `
  <!-- ==========================================
       4. 要指導医薬品（要指導薬）マスター
       ========================================== -->
  <div class="otc-section o-guidance">
    <div class="sec-header" style="border-left:5px solid #0284c7; background:linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);">
      <span class="sec-badge" style="background:#0284c7; color:white;">セクション ④ / Guidance-Mandated OTC</span>
      <h2 class="sec-title" style="color:#0369a1;">🏛️ ④ 要指導医薬品（要指導薬）マスター：対面販売の鉄則・スイッチOTC・代表製品図鑑</h2>
      <span class="sec-subtitle">薬機法上の定義・ネット販売絶対禁止・PMS（市販後調査3年）・アライ（オルリスタット）販売要件完全攻略</span>
    </div>

    <!-- 1. OTC 4区分 完全比較早見表 -->
    <div class="otc-card" style="margin-bottom:20px;">
      <h3 style="font-size:1.1rem; color:#0f172a; margin-bottom:10px; display:flex; align-items:center; gap:8px;">
        <span>📊</span> <strong>1. OTC医薬品（要指導 ＋ 一般用3区分）完全比較早見表</strong>
      </h3>
      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; font-size:0.85rem; background:white; border-radius:8px; overflow:hidden; border:1px solid #cbd5e1;">
          <thead>
            <tr style="background:#0f172a; color:white; text-align:left;">
              <th style="padding:9px 10px; width:15%;">医薬品区分</th>
              <th style="padding:9px 10px; width:13%;">販売可能な資格</th>
              <th style="padding:9px 10px; width:18%;">販売方法（ネット可否）</th>
              <th style="padding:9px 10px; width:20%;">情報提供の法的義務</th>
              <th style="padding:9px 10px; width:16%;">陳列場所の規制</th>
              <th style="padding:9px 10px; width:18%;">代表的な製品例</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid #e2e8f0; background:#eff6ff;">
              <td style="padding:10px;"><strong style="color:#0369a1; font-size:0.95rem;">要指導医薬品</strong><br><span style="font-size:0.75rem; color:#64748b;">（2014年新設）</span></td>
              <td style="padding:10px;"><strong style="color:#0369a1;">薬剤師のみ</strong><br><span style="font-size:0.75rem; color:#dc2626;">※登録販売者は不可</span></td>
              <td style="padding:10px;"><strong style="color:#dc2626; font-size:0.95rem;">対面販売のみ！</strong><br><strong style="color:#dc2626;">ネット・通信販売は完全禁止</strong></td>
              <td style="padding:10px;"><strong style="color:#dc2626;">対面での書面交付＋指導が義務</strong><br>（購入者状況の確認・記録義務）</td>
              <td style="padding:10px;">手の届かない場所<br>（鍵付き棚・カウンター奥）</td>
              <td style="padding:10px;"><strong>アライ（オルリスタット）</strong><br>新スイッチOTC（3年間）<br>緊急避妊薬（モデル事業）</td>
            </tr>
            <tr style="border-bottom:1px solid #e2e8f0;">
              <td style="padding:10px;"><strong>第1類医薬品</strong></td>
              <td style="padding:10px;"><strong>薬剤師のみ</strong><br><span style="font-size:0.75rem; color:#dc2626;">※登録販売者は不可</span></td>
              <td style="padding:10px;"><strong>ネット販売可能</strong><br>（メール・画面での確認必須）</td>
              <td style="padding:10px;"><strong>書面交付による情報提供が義務</strong><br>（対面でなくても可）</td>
              <td style="padding:10px;">手の届かない場所<br>または陳列設備から7m以内</td>
              <td style="padding:10px;"><strong>ロキソニンS</strong><br><strong>ガスター10</strong><br><strong>リアップ5%</strong></td>
            </tr>
            <tr style="border-bottom:1px solid #e2e8f0; background:#f8fafc;">
              <td style="padding:10px;"><strong>第2類医薬品</strong><br><span style="font-size:0.75rem; color:#64748b;">（指定第2類含む）</span></td>
              <td style="padding:10px;">薬剤師 または<br><strong>登録販売者</strong></td>
              <td style="padding:10px;">ネット販売可能</td>
              <td style="padding:10px;"><strong>努力義務</strong><br>（指定第2類は禁忌確認を促す）</td>
              <td style="padding:10px;">7m以内<br>（指定第2類は1.2m以内）</td>
              <td style="padding:10px;"><strong>パブロンゴールドA</strong><br><strong>アレグラFX</strong><br><strong>イブA錠</strong></td>
            </tr>
            <tr>
              <td style="padding:10px;"><strong>第3類医薬品</strong></td>
              <td style="padding:10px;">薬剤師 または<br><strong>登録販売者</strong></td>
              <td style="padding:10px;">ネット販売可能</td>
              <td style="padding:10px;">法的義務なし（相談時のみ）</td>
              <td style="padding:10px;">特段の制限なし</td>
              <td style="padding:10px;"><strong>チョコラBB</strong><br>ビタミンC錠<br>精製水・ワセリン</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 2. 要指導医薬品の4大分類と第1類への移行メカニズム -->
    <div class="otc-card" style="margin-bottom:20px; background:#f8fafc; border:1px solid #cbd5e1;">
      <h3 style="font-size:1.05rem; color:#0f172a; margin-bottom:8px; display:flex; align-items:center; gap:8px;">
        <span>🔄</span> <strong>2. 要指導医薬品の4大分類 ＆ 第1類への移行メカニズム（市販後調査 PMS）</strong>
      </h3>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:10px; font-size:0.83rem; line-height:1.5;">
        <div style="background:white; padding:10px; border-radius:6px; border-left:3px solid #0284c7;">
          <strong style="color:#0284c7;">① スイッチOTC医薬品：</strong><br>
          医療用医薬品として使われていた有効成分を一般用として転用したもの。上市後<strong>【原則3年間】</strong>は要指導医薬品として対面で副作用を収集。
        </div>
        <div style="background:white; padding:10px; border-radius:6px; border-left:3px solid #10b981;">
          <strong style="color:#10b981;">② ダイレクトOTC医薬品：</strong><br>
          医療用としての国内実績を経ずに、直接OTCとして承認された新有効成分（例：海外で実績のある成分等）。
        </div>
        <div style="background:white; padding:10px; border-radius:6px; border-left:3px solid #f59e0b;">
          <strong style="color:#d97706;">③ 劇薬指定の医薬品：</strong><br>
          薬機法で劇薬に指定されている一般用医薬品（例：一部の殺虫剤や特殊製剤）。
        </div>
        <div style="background:white; padding:10px; border-radius:6px; border-left:3px solid #6366f1;">
          <strong style="color:#4f46e5;">④ 製造販売後調査（PMS）期間中の医薬品：</strong><br>
          安全性のデータを蓄積する期間。調査終了後に厚労省の薬事審議会で審議され、安全性が確認されると<strong>「第1類医薬品」へ移行（ネット販売解禁）</strong>される。
        </div>
      </div>
    </div>

    <!-- 3. 【超注目】アライ（オルリスタット）販売要件完全マニュアル -->
    <div class="otc-card" style="margin-bottom:20px; border:2px solid #0284c7; background:white;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
        <h3 style="font-size:1.15rem; color:#0369a1; margin:0; display:flex; align-items:center; gap:8px;">
          <span>💊</span> <strong>注目製品解剖：アライ（オルリスタット / 大正製薬）販売鑑査マニュアル</strong>
        </h3>
        <span style="background:#0284c7; color:white; font-size:0.75rem; font-weight:700; padding:3px 10px; border-radius:12px;">国内初の肥満改善薬（要指導医薬品）</span>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:12px; font-size:0.84rem; line-height:1.5;">
        <div style="background:#f0f9ff; border-radius:8px; padding:12px; border:1px solid #bae6fd;">
          <strong style="color:#0369a1; font-size:0.92rem;">【薬理作用と効果】</strong><br>
          ・<strong>胃腸管リパーゼ阻害薬：</strong>食事中の脂肪（トリグリセリド）の分解をブロックし、<strong>食事由来の脂肪の約30%を便中にそのまま排泄</strong>させる。<br>
          ・内臓脂肪・腹囲の減少を促す。内服後24〜48時間で便中に油が排出される。
        </div>

        <div style="background:#fef2f2; border-radius:8px; padding:12px; border:1px solid #fecaca;">
          <strong style="color:#b91c1c; font-size:0.92rem;">【購入必須要件（調剤鑑査チェック）】</strong><br>
          ① <strong>18歳以上</strong>の成人。<br>
          ② <strong>腹囲：男性 85cm以上、女性 90cm以上</strong>（内臓脂肪型肥満）。<br>
          ③ <strong>BMI 25以上35未満</strong>（35以上は高度肥満症として医療機関へ受診勧奨）。<br>
          ④ <strong style="color:#b91c1c;">【最重要】購入前3ヶ月以上の生活習慣改善（食事・運動）の取り組み記録の提示が必須！</strong>
        </div>
      </div>

      <!-- 服薬指導・副作用対策 -->
      <div style="margin-top:12px; background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:12px; font-size:0.84rem; line-height:1.5;">
        <strong style="color:#b45309; font-size:0.92rem;">【服薬指導の極意（患者が驚かないための必須指導）】</strong><br>
        ・<strong style="color:#b91c1c;">🔥「油漏れ（油便・便意逼迫・おならと一緒に油が出る）」対策：</strong><br>
        「吸収されなかった油がそのまま便として出ます。最初はおならをした拍子に下着を油で汚してしまうトラブルが非常に多いため、<strong>最初の数週間は生理用ナプキンや吸水パッド、おむつを当てておくこと</strong>を強くお勧めします」と恥ずかしがらず具体的に伝えるのがプロ！<br>
        ・<strong style="color:#b45309;">💊 脂溶性ビタミン（A, D, E, K）の吸収低下対策：</strong><br>
        脂肪と一緒にビタミンA・D・E・Kが排泄されるため、マルチビタミンサプリメントを併用する場合は、<strong>アライの内服から「2時間以上あけて就寝前に飲む」</strong>よう指導する。
      </div>
    </div>

    <!-- 4. 現場薬剤師の対面販売トラブルシューティング -->
    <div class="otc-card" style="background:white; border:1px solid #cbd5e1;">
      <h3 style="font-size:1.05rem; color:#0f172a; margin-bottom:8px; display:flex; align-items:center; gap:8px;">
        <span>💡</span> <strong>先輩薬剤師からの Clinical Pearls（要指導薬カウンター対応の極意）</strong>
      </h3>
      <ul style="font-size:0.84rem; color:#334155; line-height:1.6; margin:0; padding-left:20px;">
        <li><strong>「なんでネットで買えないの？めんどくさい！」と怒るお客様への神回答：</strong><br>
          <span style="color:#0369a1; font-weight:700;">「医療用から市販薬になってまだ間もない大切なお薬ですので、お客様のお身体やお薬の飲み合わせに問題がないかを、国からの法律で薬剤師が対面で安全を確認することが義務付けられているんです。お客様のお身体を最優先に守るためのルールですので、どうかご理解くださいね」</span>と笑顔で伝える。
        </li>
        <li><strong>「本人が来られないから家族が代わりに買いに来た」場合の対応：</strong><br>
          要指導医薬品は原則<strong>「使用する本人の対面購入」が法的な鉄則</strong>。代理人への販売は原則不可。どうしても本人が来局できない場合は、電話等で本人へ直接問診・説明を行い、緊急性や正当な理由があることを確認して記録に残す。
        </li>
        <li><strong>多量購入・頻回購入（乱用・転売防止）：</strong><br>
          1人1包装単位が原則。他店での購入状況や購入理由を必ず確認し、不審な場合は販売を断る勇気を持つ。
        </li>
      </ul>
    </div>
  </div>
`;

// Insert Section 4 before `</div><!-- /.otc-container -->`
const endOtcContainer = '</div><!-- /.otc-container -->';
const pEndOtc = otcHtml.lastIndexOf(endOtcContainer);

if (pEndOtc !== -1) {
  otcHtml = otcHtml.substring(0, pEndOtc) + section4Html + '\n\n  ' + otcHtml.substring(pEndOtc);
  fs.writeFileSync(otcPath, otcHtml, 'utf8');
  console.log("Successfully inserted Section 4 into 12_otc_guide.html!");
} else {
  console.error("Could not find end of otc-container in 12_otc_guide.html");
  process.exit(1);
}


// ============================================================================
// 2. Update src/14_dictionary.html (Add Guidance-Mandated OTC Cards)
// ============================================================================
const dictPath = path.join(__dirname, '..', '14_dictionary.html');
let dictHtml = fs.readFileSync(dictPath, 'utf8');

const otcDictCards = `
      <!-- 要指導医薬品制度 -->
      <div class="dict-card" data-category="special">
        <div class="dict-card-header">
          <span class="dict-tag">OTC・法規</span>
          <span class="dict-badge">対面販売必須</span>
        </div>
        <h3 class="dict-card-title">要指導医薬品（薬機法上の定義・対面義務・第1類との違い）</h3>
        <p class="dict-card-desc">
          <strong>【定義】</strong>医療用から一般用に転用されて間もないスイッチOTC（原則3年間のPMS期間中）やダイレクトOTCなど、薬剤師の対面指導が必要な区分。<br>
          <strong>【販売ルール】</strong><strong>薬剤師のみが販売可能。ネット販売・郵送販売は完全禁止！</strong>書面による情報提供と指導が義務。購入者の状況確認（持病・併用薬）が法的に義務付けられている。<br>
          <strong>【陳列】</strong>手の届かない場所（調剤室、カウンター奥、鍵付き棚）に陳列。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">移行：PMS（3年）終了・部会審議を経て第1類へ移行（ネット解禁）</span>
        </div>
      </div>

      <!-- アライ（オルリスタット） -->
      <div class="dict-card" data-category="special">
        <div class="dict-card-header">
          <span class="dict-tag">要指導薬・抗肥満</span>
          <span class="dict-badge">生活習慣記録必須</span>
        </div>
        <h3 class="dict-card-title">アライ（オルリスタット / 脂肪吸収阻害・要指導医薬品）</h3>
        <p class="dict-card-desc">
          <strong>【薬理】</strong>リパーゼ阻害薬。食事中脂肪の約30%を便中にそのまま排泄。<br>
          <strong>【購入必須条件】</strong>①18歳以上、②腹囲（男性85cm、女性90cm以上）、③BMI 25以上、④<strong>購入前3ヶ月以上の生活習慣改善（食事・運動）の取り組み記録提示</strong>。<br>
          <strong>【指導の急所】</strong><strong>「油漏れ（おならと一緒に油が出る・便意逼迫）」</strong>が起こるため最初の数週間は吸水パッドや生理用ナプキンの使用を助言。脂溶性ビタミン（A/D/E/K）サプリは2時間以上あけて就寝前に内服。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">禁忌：慢性吸収不良症候群、妊婦・授乳婦</span>
        </div>
      </div>
`;

const pLastDictDiv = dictHtml.lastIndexOf('</div>\n  </div>\n</div>');
if (pLastDictDiv !== -1) {
  dictHtml = dictHtml.substring(0, pLastDictDiv) + otcDictCards + '\n    ' + dictHtml.substring(pLastDictDiv);
  fs.writeFileSync(dictPath, dictHtml, 'utf8');
  console.log("Successfully inserted Guidance OTC cards into 14_dictionary.html!");
} else {
  const pEndDiv = dictHtml.lastIndexOf('</div>');
  const pSecondLast = dictHtml.lastIndexOf('</div>', pEndDiv - 1);
  dictHtml = dictHtml.substring(0, pSecondLast) + otcDictCards + '\n    ' + dictHtml.substring(pSecondLast);
  fs.writeFileSync(dictPath, dictHtml, 'utf8');
  console.log("Inserted Guidance OTC cards using alternative target in 14_dictionary.html!");
}


// ============================================================================
// 3. Update src/09_app.js (Add Alli to DRUG_DB)
// ============================================================================
const appPath = path.join(__dirname, '..', '09_app.js');
let appJs = fs.readFileSync(appPath, 'utf8');

const newAlliDrug = `  // 要指導医薬品（OTC 04 追加）
  { name: "アライ", gen: "オルリスタット", cat: "要指導医薬品（肥満改善薬）", char: "国内初の肥満改善薬！食事の脂肪の30%を便に排出！【生活習慣記録必須】", desc: "膵リパーゼ阻害薬。腹囲（男85cm、女90cm以上）かつ購入前3ヶ月の生活習慣改善記録の提示が必須。油漏れ（おならと一緒に油が出る）対策におむつ・ナプキンを指導。ビタミン剤は2時間あけて服用。", gId: "tab-otc", cSec: "o-guidance" },
`;

const insertMarker = 'cSec: "sec-pregnancy" },';
if (appJs.includes(insertMarker)) {
  const pos = appJs.indexOf(insertMarker) + insertMarker.length;
  appJs = appJs.substring(0, pos) + '\n' + newAlliDrug + appJs.substring(pos);
  fs.writeFileSync(appPath, appJs, 'utf8');
  console.log("Successfully inserted Alli into 09_app.js!");
}

console.log("=== OTC Guidance Master Build Complete! ===");
