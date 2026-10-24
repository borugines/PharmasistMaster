const fs = require('fs');
const path = require('path');

console.log('=== Adding Comprehensive Pediatric Dosing Matrix (小児用量早見表) ===');

// 1. Update src/05_comparison.html
const compPath = path.join(__dirname, '../05_comparison.html');
let compContent = fs.readFileSync(compPath, 'utf8');

const pediatricTableHtml = `
    <!-- 👶 【小児科調剤鑑査・小児用量（mg/kg）＆ 年齢・体重換算 完全早見マトリクス】 -->
    <div class="sub-banner banner-class" style="margin-top:20px;">
      <span>👶 【小児頻出薬 体重換算（mg/kg） ＆ 鑑査急所 完全早見マトリクス】解熱鎮痛・抗菌薬・抗アレルギー・痙攣・貼付薬</span>
    </div>
    
    <!-- 小児用量計算の3大原則 ＆ 年齢別目安BOX -->
    <div style="background:#fffbeb; border:2px solid #f59e0b; border-radius:8px; padding:12px 16px; margin-bottom:14px; font-size:0.86rem; color:#78350f; line-height:1.55;">
      <strong>⚠️ 小児処方鑑査の3大鉄則：</strong><br>
      ① <strong>「成人常用量キャップ」の絶対確認：</strong>体重換算（mg/kg）で計算した値が、成人の通常用量（上限）を超えてはならない（特に体格のいい学童期）。成人量を上限として頭打ち（キャップ）にする。<br>
      ② <strong>「力価（成分量）」と「製剤量（g）」の混同厳禁：</strong>10%細粒なら製剤量は成分量の10倍！「成分量で処方されているか製剤量か」の確認ミスは10倍過量投与事故の主因！<br>
      ③ <strong>体重不明時の年齢換算目安（von Harnack）：</strong>新生児（成人量の1/10〜1/12）／乳児（1/5）／幼児（1/3）／学童前期（1/2）／学童後期（2/3）。※Augsberger式：<code>小児用量 ＝ (4 × 年齢 ＋ 20) % × 成人量</code>
    </div>

    <table>
      <thead>
        <tr>
          <th style="width:14%;">薬効群・代表薬</th>
          <th style="width:18%;">代表的製品名・規格</th>
          <th style="width:20%;">標準小児用量（体重換算）</th>
          <th style="width:20%;">1日投与回数・タイミング</th>
          <th style="width:28%;">現場の鑑査急所・ピットフォール</th>
        </tr>
      </thead>
      <tbody>
        <tr style="background:#fef2f2;">
          <td><strong>解熱鎮痛薬</strong><br>アセトアミノフェン</td>
          <td><strong>カロナール細粒20% / 50%</strong><br>アンヒバ坐薬（100/200mg）<br>アルピニー坐薬</td>
          <td><strong>1回 10〜15 mg/kg</strong><br>（成分量換算）<br>※1日総量 60 mg/kg上限</td>
          <td>発熱時・疼痛時 頓用<br>（最低4〜6時間空ける）</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【小児唯一の安全解熱薬！】</span> NSAIDs（ロキソニン等）はライ症候群リスクで禁忌。坐薬は15分以内脱落なら再挿入、30分以上なら吸収済みで追加しない。単回成人上限（500mg）を超えない。</td>
        </tr>
        <tr>
          <td><strong>ペニシリン系抗菌薬</strong><br>アモキシシリン</td>
          <td><strong>ワイドシリン細粒20%</strong><br>パセトシン細粒20%</td>
          <td>通常：<strong>20〜40 mg/kg/日</strong><br><span style="color:#b91c1c; font-weight:bold;">中耳炎・溶連菌高用量：<br>70〜90 mg/kg/日（倍量）</span></td>
          <td>通常：1日3〜4回 分服<br>高用量：1日2〜3回 分服</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【急性中耳炎・溶連菌の「倍量投与」を見抜く！】</span> ペニシリン耐性肺炎球菌（PRSP）対策でガイドライン推奨の倍量（70〜90mg/kg/日）。過量投与の疑義照会をしないよう適応病名（中耳炎等）を確認。</td>
        </tr>
        <tr>
          <td><strong>マクロライド系抗菌薬</strong><br>クラリスロマイシン</td>
          <td><strong>クラリスDS 10% 小児用</strong><br>クラリシッドDS 10%</td>
          <td><strong>1日 10〜15 mg/kg</strong><br>（製剤量換算：0.1〜0.15g/kg）</td>
          <td>1日2回 朝・夕食後</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【酸性飲料に混ぜると苦味爆発！】</span> オレンジジュース、リンゴジュース、ヨーグルト、スポドリ等酸性飲料と混ぜるとコーティングが溶けて激しい苦味になり服薬拒否。チョコアイスや練乳を推奨。</td>
        </tr>
        <tr>
          <td><strong>セフェム系抗菌薬</strong><br>セフジトレン ピボキシル</td>
          <td><strong>メイアクトMS小児用細粒10%</strong></td>
          <td><strong>1日 9〜12 mg/kg</strong><br>（重症時：1回4mg/kg 1日3回）</td>
          <td>1日3回 毎食後</td>
          <td>ピボキシル基含有のため<strong>「小児の低カルニチン血症・重篤低血糖」</strong>に注意（長期連用厳禁）。必ず食後に服用（空腹時内服だと吸収率が半減）。</td>
        </tr>
        <tr>
          <td><strong>キノロン系抗菌薬</strong><br>トスフロキサシン</td>
          <td><strong>オゼックス小児用細粒15%</strong><br>トスキサシン</td>
          <td><strong>1回 6 mg/kg を1日2回</strong><br>（1日総量 12 mg/kg）</td>
          <td>1日2回 朝・夕食後</td>
          <td>小児へのキノロンは関節軟骨障害の懸念から<strong>「耐性マイコプラズマ肺炎やPRSP中耳炎等で他剤無効時のみ」</strong>の限定使用。厳格な体重換算チェック。牛乳・鉄剤とのキレート間隔。</td>
        </tr>
        <tr>
          <td><strong>抗ヒスタミン薬</strong><br>レボセチリジン</td>
          <td><strong>ザイザルシロップ 0.05%</strong><br>ザイザル細粒</td>
          <td>・6ヶ月〜1歳未満：1.25mg/日（1回）<br>・1〜7歳未満：1回1.25mg 1日2回<br>・7歳以上：1回2.5mg 1日2回</td>
          <td>年齢区分別用量遵守<br>（成人量：5mg就寝前）</td>
          <td>年齢区分が細かく分かれているため月齢・年齢を厳格鑑査。眠気・インペアードパフォーマンスが少なく小児アトピー・鼻炎の第一選択。</td>
        </tr>
        <tr>
          <td><strong>気管支拡張貼付薬</strong><br>ツロブテロール</td>
          <td><strong>ホクナリンテープ</strong><br>（0.5mg / 1mg / 2mg）</td>
          <td>・生後6ヶ月〜3歳未満：<strong>0.5 mg</strong><br>・3歳〜9歳未満：<strong>1 mg</strong><br>・9歳以上：<strong>2 mg</strong></td>
          <td>1日1回 胸・背中・上腕<br>（毎日貼り替える）</td>
          <td>**「切って貼る（半切）」は放出制御膜が壊れるため原則推奨されない**。年齢に応じた規格を選択。かぶれ防止のため貼付部位を毎日ローテーションする指導。</td>
        </tr>
        <tr style="background:#fef2f2;">
          <td><strong>抗けいれん坐薬</strong><br>ジアゼパム</td>
          <td><strong>ダイアップ坐薬</strong><br>（4mg / 6mg / 10mg）</td>
          <td><strong>1回 0.4〜0.5 mg/kg</strong><br>（例：10kg児なら4mg〜5mg）</td>
          <td>発熱初期（37.5℃以上）<br>8時間後持続時同量再投与</td>
          <td><span style="color:#b91c1c; font-weight:bold;">【アンヒバ坐薬との併用順序！】</span> 必ず<strong>「ダイアップ先」</strong>。油性基剤（ダイアップ）と水溶性基剤（アンヒバ）の混ざりによる吸収遅延を防ぐため、最低30分（できれば1〜2時間）あける！</td>
        </tr>
        <tr>
          <td><strong>浸透圧性便秘薬</strong><br>マクロゴール配合</td>
          <td><strong>モビコール配合内服剤</strong><br>（LD / HD）</td>
          <td>・2〜7歳未満：1包/日（最大4包）<br>・7〜12歳未満：2包/日（最大4包）<br>・12歳以上：2包/日（最大6包）</td>
          <td>1日1〜2回 分服<br>水に溶かして服用</td>
          <td>2歳以上の小児慢性便秘症のガイドライン第一選択。酸化Mgと異なり高Mg血症リスクゼロ。1包あたり約60mLの水に溶かして服用。</td>
        </tr>
      </tbody>
    </table>
`;

const compTarget = '    <!-- 外用ステロイド 5段階ランク × 全身吸収率マトリクス -->';
if (compContent.includes(compTarget) && !compContent.includes('小児頻出薬 体重換算（mg/kg）')) {
  compContent = compContent.replace(compTarget, pediatricTableHtml + '\n' + compTarget);
  fs.writeFileSync(compPath, compContent, 'utf8');
  console.log('Successfully inserted Pediatric Dosing Matrix into 05_comparison.html!');
} else {
  console.log('05_comparison.html already updated or target not found.');
}

// 2. Update src/03_guide.html (Link to Pediatric Dosing Matrix from Core 18)
const guidePath = path.join(__dirname, '../03_guide.html');
let guideContent = fs.readFileSync(guidePath, 'utf8');

const oldC18Box = `        <h3>🧭 体重換算監査の鉄則（mg/kg/日）</h3>`;
const newC18Box = `        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h3 style="margin:0;">🧭 体重換算監査の鉄則（mg/kg/日）</h3>
          <button class="dict-jump-btn" style="padding:2px 8px; font-size:0.75rem;" onclick="jumpToSpecialTab('tab-comparison', 'sec-imm')">⚔️ 小児用量早見マトリクス</button>
        </div>`;

if (guideContent.includes(oldC18Box) && !guideContent.includes('小児用量早見マトリクス')) {
  guideContent = guideContent.replace(oldC18Box, newC18Box);
  fs.writeFileSync(guidePath, guideContent, 'utf8');
  console.log('Successfully added quick jump button to Core 18 in 03_guide.html!');
} else {
  console.log('03_guide.html already updated or target not found.');
}

console.log('=== Pediatric Integration Complete! ===');
