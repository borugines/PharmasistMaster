const fs = require('fs');
const path = require('path');

console.log('=== Adding Remaining Parts of Rank 101-120 (第6弾) ===');

// 1. Update src/05_comparison.html
const compPath = path.join(__dirname, '../05_comparison.html');
let compContent = fs.readFileSync(compPath, 'utf8');

const newComparisonsHtml = `
    <!-- 🎗️ 【がんホルモン療法・経口抗がん薬 ガチンコ比較】 -->
    <div class="sub-banner banner-class" style="margin-top:20px;">
      <span>🎗️ 【がんホルモン療法・経口抗がん薬 ガチンコ比較】乳がん（閉経前・後） vs 前立腺がん（CAB・ARSI） vs 経口抗がん薬（TS-1・カペシタビン）</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">薬剤名（商品名）</th>
          <th style="width:18%;">作用機序・分類</th>
          <th style="width:18%;">適応・用法</th>
          <th style="width:22%;">キャラクター立ち・強み</th>
          <th style="width:26%;">現場の鑑査急所・ピットフォール</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>タモキシフェン</strong><br>（ノルバデックス）</td>
          <td>選択的エストロゲン受容体調節薬（SERM）</td>
          <td>乳がん（主に<strong>閉経前</strong>）<br>1日1回 20mg</td>
          <td><span class="char">閉経前乳がんホルモン療法の主軸</span><br>乳腺ではER拮抗、骨・脂質ではER作動として働く。</td>
          <td>血栓塞栓症（深部静脈血栓VTEリスク）、子宮内膜肥厚・不正出血の確認。CYP2D6阻害薬（パロキセチン等）併用で効果減弱に注意！</td>
        </tr>
        <tr>
          <td><strong>アナストロゾール</strong><br>（アリミデックス）</td>
          <td>非ステロイド性アロマターゼ阻害薬（AI）</td>
          <td>乳がん（<strong>閉経後</strong>）<br>1日1回 1mg</td>
          <td><span class="char">閉経後乳がんの第一選択薬</span><br>閉経後の末梢脂肪組織でのエストロゲン産生を元から完全ブロック。</td>
          <td>体内のエストロゲンが激減するため<strong>「骨粗鬆症・骨折リスク急上昇」「関節痛・こわばり」</strong>が高率に出現。骨密度定期測定・BP製剤併用検討。</td>
        </tr>
        <tr>
          <td><strong>ベージニオ錠</strong><br>（アベマシクリブ）</td>
          <td>CDK4/6阻害薬<br>（細胞周期G1/S進行停止）</td>
          <td>HR陽性HER2陰性乳がん<br>1回150mg 1日2回 連日</td>
          <td><span class="char">ホルモン受容体陽性乳がんの救世主</span><br>内分泌療法併用で進行・再発を大幅に抑制。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【下痢のマネジメントが死活問題！】</span> 服用初期（数日〜数週）に高率で下痢発現。ロペラミド（ロペミン）処方準備。好中球減少・間質性肺炎の監視。</td>
        </tr>
        <tr>
          <td><strong>イクスタンジ</strong><br>（エンザルタミド）</td>
          <td>アンドロゲン受容体シグナル伝達阻害薬（ARSI）</td>
          <td>前立腺がん（CRPC等）<br>1日1回 160mg</td>
          <td><span class="char">前立腺がんアンドロゲン完全遮断薬</span><br>受容体結合、核内移行、DNA結合の3段階を全てブロック。</td>
          <td>血液脳関門を通過しGABA_A受容体を阻害するため<strong>「てんかん・痙攣発作の既往は禁忌」</strong>。疲労感・ふらつき・転倒骨折リスクに注意指導。</td>
        </tr>
        <tr>
          <td><strong>TS-1配合カプセル/OD</strong><br>（ティーエスワン）</td>
          <td>経口抗悪性腫瘍剤<br>（5-FU系プロドラッグ合剤）</td>
          <td>胃がん、大腸がん、肺がん等<br>体表面積別用量 1日2回</td>
          <td><span class="char">外来通院がん治療を支える経口5-FUの王様</span><br>テガフール＋ギメラシル＋オテラシルカリウムの3成分配合。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【厳格な休薬期間管理！】</span> 例：4週投与2週休薬、2週投与1週休薬。患者が勝手に連日飲み続けると致死的な骨髄抑制・劇症下痢を引き起こす！</td>
        </tr>
      </tbody>
    </table>

    <!-- 🛡️ 【免疫抑制薬・膠原病 ガチンコ比較】 -->
    <div class="sub-banner banner-class" style="margin-top:20px;">
      <span>🛡️ 【免疫抑制薬・膠原病 ガチンコ比較】臓器移植（タクロリムス vs シクロスポリン vs セルセプト） ＆ SLE特効薬（プラケニル）</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">薬剤名（商品名）</th>
          <th style="width:18%;">主成分・機序</th>
          <th style="width:18%;">適応・用法</th>
          <th style="width:22%;">強み・特徴</th>
          <th style="width:26%;">現場の鑑査急所・ピットフォール</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>プログラフ / グラセプター</strong><br>（タクロリムス）</td>
          <td>カルシニューリン阻害薬（CNI）<br>（IL-2産生抑制）</td>
          <td>腎・肝・心・肺移植、重症筋無力症、ループス腎炎等</td>
          <td><span class="char">拒絶反応を制する免疫抑制の絶対エース</span><br>シクロスポリンより数十倍強力なT細胞活性化抑制作用。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【TDM（薬物血中濃度モニタリング）必須！】</span> トラフ濃度を測定。採血当日の朝は採血終了まで服用しない！GFJ・セントジョーンズワート厳禁。腎毒性・高カリウム・高血糖に警戒。</td>
        </tr>
        <tr>
          <td><strong>セルセプト</strong><br>（ミコフェノール酸モフェチル）</td>
          <td>IMPDH阻害薬<br>（de novoプリン合成阻害）</td>
          <td>腎・心・肝・肺移植、ループス腎炎</td>
          <td><span class="char">リンパ球特異的な増殖抑制薬</span><br>CNIと異なり腎毒性がないため移植レジメンの併用標準薬。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【催奇形性リスク：妊婦・妊娠希望女性に絶対禁忌！】</span> 骨髄抑制（白血球・好中球減少）、消化器症状（激しい下痢・嘔気）。</td>
        </tr>
        <tr>
          <td><strong>プラケニル</strong><br>（ヒドロキシクロロキン）</td>
          <td>アミノキノリン系<br>（TLRシグナル・免疫複合体阻害）</td>
          <td>全身性エリテマトーデス（SLE）、皮膚エリテマトーデス</td>
          <td><span class="char">SLEの生命予後を改善する世界標準薬</span><br>ループス再燃を有意に抑制し、ステロイド減量を可能にする。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【定期的な眼科検査（網膜症予防）が絶対必須！】</span> 投与前および投与中は年1回の精密眼底検査。視野欠損・色覚異常・夜盲が出現したら即座に中止し眼科受診。</td>
        </tr>
      </tbody>
    </table>

    <!-- 🍺 【アルコール依存症治療薬 ガチンコ比較】 -->
    <div class="sub-banner banner-class" style="margin-top:20px;">
      <span>🍺 【アルコール依存症治療薬 ガチンコ比較】断酒維持（レグテクト） vs 減酒（セリンクロ） vs 抗酒薬（ノックビン・シアナマイド）</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">薬剤名（製品名）</th>
          <th style="width:18%;">作用機序・分類</th>
          <th style="width:18%;">服用タイミング・用法</th>
          <th style="width:22%;">強み・キャラクター立ち</th>
          <th style="width:26%;">現場の鑑査急所・ピットフォール</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>レグテクト錠</strong><br>（アカンプロサート）</td>
          <td>NMDA受容体調節・GABA作動促進<br>（飲酒欲求低減薬）</td>
          <td>1回333mg 1日3回 食後<br><strong>断酒継続を目的</strong></td>
          <td><span class="char">「お酒を飲みたい渇望」を脳から消す薬</span><br>断酒意志のある患者の再飲酒防止（スリップ防止）。抗酒薬のような悪酔い作用なし。</td>
          <td>お酒を完全にやめる（断酒）意志がある患者のみに使用。腎排泄型のため<strong>中等度〜重度腎機能障害（Ccr<50）には禁忌・慎重投与</strong>。下痢・軟便が出やすい。</td>
        </tr>
        <tr>
          <td><strong>セリンクロ錠</strong><br>（ナルメフェン）</td>
          <td>オピオイド受容体調節薬（μ/δ拮抗・κ部分作動）<br>（飲酒量低減薬）</td>
          <td>飲酒の<strong>1〜2時間前</strong>に10mgを1回頓服<br><strong>減酒を目的</strong></td>
          <td><span class="char">「飲み始めたら止まらない」暴飲をストップ</span><br>お酒による脳内報酬系（多幸感・快楽）を遮断し、飲む杯数を減らす画期的な減酒薬。</td>
          <td>毎日飲むのではなく<strong>「お酒を飲みそうになる日・時間」の1〜2時間前に飲む頓服薬</strong>。オピオイド鎮痛薬を服用中の患者には禁忌（離脱症状誘発）。悪心・浮動性めまい・不眠に注意。</td>
        </tr>
        <tr>
          <td><strong>ノックビン / シアナマイド</strong><br>（ジスルフィラム / シアナミド）</td>
          <td>アルデヒド脱水素酵素（ALDH）阻害薬<br>（抗酒薬）</td>
          <td>1日1回 朝食後（または就寝前）定期服用</td>
          <td><span class="char">「飲んだら地獄の悪酔い」で物理的に飲酒を断つ</span><br>アセトアルデヒドを体内に急激蓄積させ、顔面紅潮・動悸・激しい頭痛・嘔吐を誘発。</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【アルコール含有食品・外用薬・蒸気にも超厳重警戒！】</span> 奈良漬け、ウイスキーボンボン、養命酒、料理酒、アルコール消毒液の吸入でもショック症状。投与前48時間は断酒確認！</td>
        </tr>
      </tbody>
    </table>
`;

const compTarget = '    <!-- 外用ステロイド 5段階ランク × 全身吸収率マトリクス -->';
if (compContent.includes(compTarget) && !compContent.includes('🎗️ 【がんホルモン療法・経口抗がん薬 ガチンコ比較】')) {
  compContent = compContent.replace(compTarget, newComparisonsHtml + '\n' + compTarget);
  fs.writeFileSync(compPath, compContent, 'utf8');
  console.log('Successfully inserted 3 comparison tables into 05_comparison.html!');
} else {
  console.log('05_comparison.html already updated or target not found.');
}

// 2. Update src/14_dictionary.html
const dictPath = path.join(__dirname, '../14_dictionary.html');
let dictContent = fs.readFileSync(dictPath, 'utf8');

const newDictCardsHtml = `
    <!-- 101〜120位 新規追加医薬品カード -->
    <div class="dict-card" data-type="drug" data-kana="た" data-name="タモキシフェン錠" data-desc="選択的エストロゲン受容体調節薬（serm）。ノルバデックス。主に閉経前乳がんのホルモン療法。血栓塞栓症（vte）リスク、子宮内膜変化に注意。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">タモキシフェン錠 20mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">ノルバデックス / 抗乳がん・SERM</div>
        <div class="dict-card-desc">閉経前乳がんの標準内分泌療法。乳腺組織でエストロゲン受容体を拮抗阻害。血栓塞栓症リスク（下肢浮腫・息切れ）に注意。CYP2D6阻害薬（パロキセチン等）併用注意。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-onc')">⚔️ がん薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c1')">📘 支持療法ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('タモキシフェン')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="あ" data-name="アナストロゾール錠" data-desc="非ステロイド性アロマターゼ阻害薬。アリミデックス。閉経後乳がんホルモン療法第一選択。末梢脂肪組織のエストロゲン産生を遮断。骨粗鬆症・関節痛に注意。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">アナストロゾール錠 1mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">アリミデックス / アロマターゼ阻害薬</div>
        <div class="dict-card-desc">閉経後乳がんの第一選択ホルモン薬。エストロゲン合成を強力に阻害。骨密度低下による骨折リスクが高まるため定期的な骨塩測定指導。手指・膝の関節痛こわばり確認。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-onc')">⚔️ がん薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c1')">📘 支持療法ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('アナストロゾール')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="へ" data-name="ベージニオ錠" data-desc="cdk4/6阻害薬。アベマシクリブ。進行・再発乳がん、術後補助療法。高頻度の下痢に注意（ロペラミド早期併用）。好中球減少・間質性肺炎のモニタリング。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ベージニオ錠 50mg / 100mg / 150mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">アベマシクリブ / CDK4/6阻害薬</div>
        <div class="dict-card-desc">細胞周期を停止させ乳がん増殖を阻止。服用初期（特に1〜2週）に高頻度で下痢が発生するため、下痢止めロペラミドの事前処方と水分補給を徹底指導。倦怠感・発熱時連絡。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-onc')">⚔️ がん薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c1')">📘 支持療法ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('ベージニオ')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="い" data-name="イクスタンジカプセル / 錠" data-desc="新規アンドロゲン受容体シグナル伝達阻害薬（arsi）。エンザルタミド。前立腺がん治療薬。てんかん既往は禁忌。ふらつき・転倒骨折リスクに注意。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">イクスタンジカプセル / 錠 40mg / 80mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">エンザルタミド / 前立腺がん・ARSI</div>
        <div class="dict-card-desc">アンドロゲン受容体の核内移行・DNA結合を遮断。血液脳関門を通過しGABA受容体を阻害するため、てんかん・痙攣発作の既往は禁忌。転倒・骨折リスクに注意。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-onc')">⚔️ がん薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c9')">📘 泌尿器ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('イクスタンジ')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="て" data-name="ティーエスワン配合カプセル / OD錠" data-desc="経口抗悪性腫瘍薬。ts-1。胃がん・大腸がん・肺がん等。厳格な休薬期間管理が必須！休薬忘れによる重篤な骨髄抑制死を防止せよ。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ティーエスワン配合カプセル / OD錠（TS-1）</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">テガフール・ギメラシル・オテラシルカリウム / 経口フッ化ピリミジン系</div>
        <div class="dict-card-desc">外来がん治療の主軸経口薬。**「指示された休薬期間（例：2週服用1週休薬）」を厳格に守らせる服薬カレンダー指導が最重要**。下痢・発熱・口内炎時の即座の受診指導。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-onc')">⚔️ がん薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c1')">📘 支持療法ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('TS-1')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="ふ" data-name="プログラフカプセル / グラセプター" data-desc="カルシニューリン阻害薬（cni）。タクロリムス。臓器移植後の拒絶反応抑制。tdm（血中濃度モニタリング）必須。グレープフルーツ禁忌。トラフ採血前内服禁止。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">プログラフカプセル / グラセプター</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">タクロリムス水和物 / 免疫抑制薬</div>
        <div class="dict-card-desc">臓器移植後の生着維持。TDMが必須であり、採血日当日の朝は採血が終わるまで服用しない指導を徹底。CYP3A4阻害薬・グレープフルーツ・セントジョーンズワート厳禁。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-imm')">⚔️ 免疫薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c9')">📘 泌尿器ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('プログラフ')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="ふ" data-name="プラケニル錠" data-desc="アミノキノリン系全身性エリテマトーデス（sle）治療薬。ヒドロキシクロロキン。定期的な眼科受診（網膜症予防）が絶対必須。視野異常で即眼科受診。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">プラケニル錠 200mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">ヒドロキシクロロキン硫酸塩 / SLE治療薬</div>
        <div class="dict-card-desc">SLEの疾患活動性と再燃を有意に抑制する標準薬。**「投与前および年1回以上の定期的な眼科検査（網膜症モニタリング）」**の受診を必ず確認。視力低下や色覚異常時は直ちに受診指導。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-imm')">⚔️ 免疫薬比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c16')">📘 皮膚科ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('プラケニル')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="え" data-name="エブトール錠" data-desc="抗結核薬・抗酸菌薬。エタンブトール。肺mac症の3剤併用療法標準薬。球後視神経炎・視力障害・赤緑色覚異常に注意。自覚症状出現で即中止。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">エブトール錠 125mg / 250mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">エタンブトール塩酸塩 / 抗酸菌症・結核治療薬</div>
        <div class="dict-card-desc">肺MAC症（CAM＋RFP＋EB）の重要成分。特有の重篤な副作用として**「球後視神経炎による視力低下・視野狭窄・赤緑色覚異常」**があるため、目がかすむ・見えにくい時は直ちに服用中止し眼科へ。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-inf')">⚔️ 感染症比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c8')">📘 感染症ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('エブトール')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="う" data-name="ウテメリン錠" data-desc="子宮収縮抑制薬。リトドリン。切迫早産治療薬。β2受容体作動により子宮筋を弛緩。母体の動悸・手指振戦・頻脈注意。急激中止によるリバウンド注意。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">ウテメリン錠 5mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">リトドリン塩酸塩 / 切迫早産治療薬</div>
        <div class="dict-card-desc">切迫早産時の子宮収縮を抑制。β2刺激作用により**母体の動悸・頻脈・手の震え（手指振戦）**が高率に出現。自己判断での急な中止は陣痛誘発のリバウンドを起こすため指示通り服用。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-extra')">⚔️ 比較表</button><button class="dict-jump-btn" onclick="jumpToGuide('c13')">📘 婦人科ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('ウテメリン')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="れ" data-name="レグテクト錠" data-desc="飲酒欲求低減薬。アカンプロサート。アルコール依存症における断酒維持。中枢神経のグルタミン酸受容体を調節。断酒意志のある患者に処方。下痢・腎機能注意。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">レグテクト錠 333mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">アカンプロサートカルシウム / アルコール依存症断酒維持薬</div>
        <div class="dict-card-desc">お酒を飲みたい渇望（craving）を抑え断酒をサポート。1回2錠を1日3回食後に服用。中等度以上の腎障害（Ccr<50）には禁忌。悪酔いさせる薬ではないため断酒意志の維持が必須。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-psy')">⚔️ 精神科比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c22')">📘 精神科ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('レグテクト')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="せ" data-name="セリンクロ錠" data-desc="飲酒量低減薬。ナルメフェン。アルコール依存症患者の減酒治療。飲酒の1〜2時間前に頓服。飲酒による報酬系をブロック。オピオイド鎮痛薬服用者は禁忌。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">セリンクロ錠 10mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">ナルメフェン塩酸塩水和物 / 飲酒量低減薬</div>
        <div class="dict-card-desc">飲酒による脳内の快楽シグナルを遮断し「飲み過ぎ」を抑制する減酒薬。**「お酒を飲む日・飲酒の1〜2時間前」に1錠頓服**。オピオイド鎮痛薬服用患者には離脱発現のため禁忌。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-psy')">⚔️ 精神科比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c22')">📘 精神科ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('セリンクロ')">📋 詳細</button>
      </div>
    </div>

    <div class="dict-card" data-type="drug" data-kana="あ" data-name="アルマール錠" data-desc="αβ遮断薬。アロチノロール。高血圧症および本態性振戦治療薬。コップを持つ時などの手の震え（動作時・姿勢時振戦）に第一選択。気管支喘息禁忌・徐脈注意。">
      <div>
        <div class="dict-card-head">
          <h3 class="dict-card-title">アルマール錠 5mg / 10mg</h3>
          <span class="dict-badge dict-badge-drug">💊 薬品</span>
        </div>
        <div class="dict-card-sub">アロチノロール塩酸塩 / 本態性振戦・αβ遮断薬</div>
        <div class="dict-card-desc">本態性振戦（物を掴む時や字を書く時の手の震え）の第一選択薬。末梢β2受容体遮断により筋紡錘の律動的興奮を抑制。**気管支喘息患者には禁忌**。徐脈・めまい・ふらつきに注意。</div>
      </div>
      <div class="dict-card-footer">
        <button class="dict-jump-btn" onclick="jumpToSpecialTab('tab-comparison', 'sec-cv')">⚔️ 循環器比較</button><button class="dict-jump-btn" onclick="jumpToGuide('c26')">📘 神経ガイド</button><button class="dict-jump-btn" onclick="showDrugByName('アルマール')">📋 詳細</button>
      </div>
    </div>
`;

const dictTarget = '    </div>\n</div>';
const lastIdx = dictContent.lastIndexOf(dictTarget);
if (lastIdx !== -1 && !dictContent.includes('タモキシフェン錠 20mg')) {
  dictContent = dictContent.substring(0, lastIdx) + newDictCardsHtml + '\n' + dictContent.substring(lastIdx);
  fs.writeFileSync(dictPath, dictContent, 'utf8');
  console.log('Successfully inserted 12 drug cards into 14_dictionary.html!');
} else {
  console.log('14_dictionary.html already updated or target not found.');
}

// 3. Update src/09_app.js
const appPath = path.join(__dirname, '../09_app.js');
let appContent = fs.readFileSync(appPath, 'utf8');

const newDrugDbEntries = `  // 101〜120位 専門・がん・難病薬剤
  { name: "タモキシフェン", gen: "タモキシフェン", cat: "101. 乳がん", char: "閉経前乳がんの主軸！SERM製剤で血栓塞栓症（VTE）や子宮内膜変化に注意", desc: "乳腺組織でエストロゲン受容体をブロック。CYP2D6阻害薬（パロキセチン等）併用で活性代謝物エンドキシフェン生成が抑制され効果減弱。深部静脈血栓注意。", gId: "c1", cSec: "sec-onc" },
  { name: "アナストロゾール", gen: "アナストロゾール", cat: "101. 乳がん", char: "閉経後乳がんの第一選択！末梢アロマターゼ阻害で骨粗鬆症・関節痛に注意", desc: "閉経後のエストロゲン産生を元から絶つ。体内のエストロゲン激減により骨塩量低下・骨折リスクが高まるため定期採血・骨密度測定必須。関節のこわばり指導。", gId: "c1", cSec: "sec-onc" },
  { name: "ベージニオ", gen: "アベマシクリブ", cat: "101. 乳がん", char: "進行乳がんの救世主CDK4/6阻害薬！初期の激しい下痢にロペラミド早期対処", desc: "細胞周期G1/S期停止。服用開始数日から2週間に高率で下痢発現。ロペラミド処方準備。好中球減少・間質性肺炎の初期症状（空咳・息切れ）に警戒指導。", gId: "c1", cSec: "sec-onc" },
  { name: "イクスタンジ", gen: "エンザルタミド", cat: "102. 前立腺がん", char: "新規アンドロゲン受容体シグナル阻害薬（ARSI）！てんかん禁忌＆転倒骨折注意", desc: "アンドロゲンの受容体結合・核移行・DNA結合をトリプル遮断。中枢GABA受容体阻害による痙攣リスクからてんかん既往は禁忌。ふらつき・骨折に注意。", gId: "c9", cSec: "sec-onc" },
  { name: "TS-1", gen: "テガフール・ギメラシル・オテラシルK", cat: "103. 経口抗がん剤", char: "胃・大腸・肺がんの外来主軸！指示された休薬期間の遵守が絶対の生命線", desc: "経口フッ化ピリミジン配合剤。休薬忘れによる連日内服は致死的な重篤骨髄抑制を引き起こす。下痢・口内炎・発熱時の即座受診と休薬遵守を徹底指導。", gId: "c1", cSec: "sec-onc" },
  { name: "プログラフ / グラセプター", gen: "タクロリムス", cat: "106. 臓器移植後", char: "拒絶反応を制する免疫抑制の絶対エース！TDM必須＆採血前服用厳禁", desc: "カルシニューリンを阻害しIL-2産生抑制。血中トラフ濃度モニタリング必須。採血当日は採血終了まで飲まない。グレープフルーツ・セイヨウオトギリソウ厳禁。", gId: "c9", cSec: "sec-imm" },
  { name: "プラケニル", gen: "ヒドロキシクロロキン", cat: "108. 全身性エリテマトーデス", char: "SLEの再燃を防ぎ生命予後を延ばす世界標準薬！年1回の定期眼科検査必須", desc: "TLRシグナル阻害等で免疫活性化を抑制。網膜症による不可逆な視力障害を防ぐため、投与前および年1回の眼科精密検査（黄斑部検査）が受診必須条件。", gId: "c16", cSec: "sec-imm" },
  { name: "エブトール", gen: "エタンブトール", cat: "109. 非結核性抗酸菌症", char: "肺MAC症3剤併用の要！球後視神経炎・視力低下・赤緑色覚異常に厳重警戒", desc: "クラリス＋リファンピシンと併用。特有の副作用「球後視神経炎（目のかすみ・視力低下・赤と緑の区別がつかない）」が出たら即服用中止し眼科受診を徹底指導。", gId: "c8", cSec: "sec-inf" },
  { name: "ウテメリン", gen: "リトドリン塩酸塩", cat: "110. 切迫早産", char: "子宮平滑筋弛緩による切迫早産薬！動悸・手指振戦・急激中止のリバウンド注意", desc: "β2受容体刺激で子宮収縮を強力抑制。母体の動悸・頻脈・手の震えが出やすい。自己判断で急にやめると陣痛が急発進するリバウンドがあるため指示通り内服。", gId: "c13", cSec: "sec-extra" },
  { name: "レグテクト", gen: "アカンプロサート", cat: "119. アルコール依存症", char: "お酒を飲みたい渇望を脳から鎮める断酒維持薬！断酒意志のある患者に処方", desc: "グルタミン酸神経伝達を抑制し飲酒欲求を低減。悪酔いさせる薬ではないため断酒意志が前提。腎排泄型のためCcr<50の中等度以上腎機能障害には禁忌・慎重投与。", gId: "c22", cSec: "sec-psy" },
  { name: "セリンクロ", gen: "ナルメフェン", cat: "119. アルコール依存症", char: "飲酒の1〜2時間前に飲む減酒頓服薬！オピオイド鎮痛薬服用者は禁忌", desc: "オピオイド受容体を調節し飲酒による快楽シグナルを遮断して深酒を防ぐ。「飲酒しそうな日の1〜2時間前」に頓服。オピオイド服用者は離脱発現のため禁忌。", gId: "c22", cSec: "sec-psy" },
  { name: "アルマール", gen: "アロチノロール", cat: "120. 本態性振戦", char: "動作時・姿勢時の手の震えを止める第一選択薬！気管支喘息には絶対禁忌", desc: "パーキンソンの安静時振戦と異なり「物を掴む・字を書く」時の震えに著効。末梢β2遮断で震戦を抑制。気管支喘息禁忌・高度徐脈注意。高齢者のふらつき確認。", gId: "c26", cSec: "sec-cv" },
`;

const appTarget = '\n];';
if (appContent.includes(appTarget) && !appContent.includes('タモキシフェン')) {
  appContent = appContent.replace(appTarget, '\n' + newDrugDbEntries + '\n];');
  fs.writeFileSync(appPath, appContent, 'utf8');
  console.log('Successfully inserted new drugs into 09_app.js DRUG_DB!');
} else {
  console.log('09_app.js already updated or target not found.');
}

console.log('=== All Remaining Parts Completed! ===');
