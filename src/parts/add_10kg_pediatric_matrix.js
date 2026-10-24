const fs = require('fs');
const path = require('path');

console.log('=== Adding 10kg Increments Pediatric Dosing Matrix (10kg刻み体重別小児用量早見表) ===');

// 1. Update src/05_comparison.html
const compPath = path.join(__dirname, '../05_comparison.html');
let compContent = fs.readFileSync(compPath, 'utf8');

const matrix10kgHtml = `
    <!-- 🧮 【10kg刻み 体重別小児用量・製剤量 完全早見マトリクス】 -->
    <div class="sub-banner banner-within" style="margin-top:1.5rem; background:linear-gradient(135deg, #0284c7 0%, #0369a1 100%);">
      <span>🧮 【10kg刻み 体重別（10kg・20kg・30kg・40kg）】頻出薬の処方量・製剤量・成人量キャップ 完全早見表</span>
    </div>
    <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; padding:10px 14px; margin-bottom:12px; font-size:0.85rem; color:#0369a1; line-height:1.5;">
      <strong>💡 現場での使い方：</strong>処方箋の患者体重を確認し、電卓を叩く前に「この体重ならこの規格・包数が標準」と直感スクリーニングできます。<br>
      ※特に<strong>30kg〜40kg（学童期）</strong>では「成人通常量（キャップ）」に達するため、体重換算による過量投与がないかを厳重監査してください。
    </div>

    <div style="overflow-x:auto;">
      <table style="width:100%; border-collapse:collapse; font-size:0.84rem; text-align:center;">
        <thead>
          <tr style="background:#0f172a; color:white;">
            <th style="width:16%; text-align:left; padding:8px;">薬剤名（代表製剤・規格）</th>
            <th style="width:12%;">標準換算基準</th>
            <th style="width:18%; background:#0369a1;">👶 10 kg<br><span style="font-size:0.75rem; font-weight:normal;">（約1歳・幼児前期）</span></th>
            <th style="width:18%; background:#0284c7;">🧒 20 kg<br><span style="font-size:0.75rem; font-weight:normal;">（約5〜6歳・低学年）</span></th>
            <th style="width:18%; background:#0ea5e9;">👦 30 kg<br><span style="font-size:0.75rem; font-weight:normal;">（約8〜9歳・中学年）</span></th>
            <th style="width:18%; background:#38bdf8; color:#0f172a;">🧑 40 kg<br><span style="font-size:0.75rem; font-weight:normal;">（約11〜12歳・高学年）</span></th>
          </tr>
        </thead>
        <tbody>
          <!-- アセトアミノフェン -->
          <tr style="background:#fef2f2; border-bottom:1px solid #cbd5e1;">
            <td style="text-align:left; padding:8px;">
              <strong style="color:#b91c1c;">カロナール細粒20%</strong><br>
              <span style="font-size:0.75rem; color:#64748b;">（アセトアミノフェン細粒）</span>
            </td>
            <td>1回 10〜15 mg/kg<br><span style="font-size:0.74rem; color:#dc2626;">（細粒: 0.05〜0.075g/kg）</span></td>
            <td><strong>0.5 〜 0.75 g</strong><br><span style="font-size:0.75rem; color:#475569;">（成分100〜150mg）</span></td>
            <td><strong>1.0 〜 1.5 g</strong><br><span style="font-size:0.75rem; color:#475569;">（成分200〜300mg）</span></td>
            <td><strong>1.5 〜 2.25 g</strong><br><span style="font-size:0.75rem; color:#475569;">（成分300〜450mg）</span></td>
            <td><strong style="color:#b91c1c;">2.0 〜 2.5 g</strong><br><span style="font-size:0.75rem; color:#b91c1c; font-weight:bold;">【単回上限 500mg キャップ】</span></td>
          </tr>
          <!-- アンヒバ坐薬 -->
          <tr style="background:#fef2f2; border-bottom:1px solid #cbd5e1;">
            <td style="text-align:left; padding:8px;">
              <strong style="color:#b91c1c;">アンヒバ坐薬</strong><br>
              <span style="font-size:0.75rem; color:#64748b;">（100mg / 200mg）</span>
            </td>
            <td>1回 10〜15 mg/kg<br><span style="font-size:0.74rem; color:#64748b;">頓用（4〜6時間空ける）</span></td>
            <td><strong>100 mg 坐薬</strong><br><span style="font-size:0.75rem; color:#475569;">1個（10mg/kg）</span></td>
            <td><strong>200 mg 坐薬</strong><br><span style="font-size:0.75rem; color:#475569;">1個（10mg/kg）</span></td>
            <td><strong>200mg 1.5個</strong><br><span style="font-size:0.75rem; color:#475569;">または内服へ移行（300mg）</span></td>
            <td><strong>内服（錠/細粒）推奨</strong><br><span style="font-size:0.75rem; color:#b91c1c;">成人用量（400〜500mg）</span></td>
          </tr>
          <!-- ワイドシリン通常 -->
          <tr style="border-bottom:1px solid #cbd5e1;">
            <td style="text-align:left; padding:8px;">
              <strong>ワイドシリン細粒20%</strong><br>
              <span style="font-size:0.75rem; color:#64748b;">【通常感染症】分3</span>
            </td>
            <td>1日 20〜40 mg/kg<br><span style="font-size:0.74rem; color:#64748b;">（細粒: 0.1〜0.2g/kg/日）</span></td>
            <td><strong>1.0 〜 2.0 g/日</strong><br><span style="font-size:0.75rem; color:#475569;">（1回 0.33〜0.66g）</span></td>
            <td><strong>2.0 〜 4.0 g/日</strong><br><span style="font-size:0.75rem; color:#475569;">（1回 0.66〜1.33g）</span></td>
            <td><strong>3.0 〜 5.0 g/日</strong><br><span style="font-size:0.75rem; color:#475569;">（1回 1.0〜1.66g）</span></td>
            <td><strong style="color:#b91c1c;">4.0 〜 5.0 g/日</strong><br><span style="font-size:0.75rem; color:#b91c1c;">【成人通常量 1g/日キャップ】</span></td>
          </tr>
          <!-- ワイドシリン倍量（中耳炎） -->
          <tr style="background:#fff7ed; border-bottom:1px solid #cbd5e1;">
            <td style="text-align:left; padding:8px;">
              <strong style="color:#ea580c;">ワイドシリン細粒20%</strong><br>
              <span style="font-size:0.75rem; color:#c2410c; font-weight:bold;">【中耳炎・溶連菌倍量】分2〜3</span>
            </td>
            <td><strong style="color:#ea580c;">1日 70〜90 mg/kg</strong><br><span style="font-size:0.74rem; color:#c2410c;">（細粒: 0.35〜0.45g/kg/日）</span></td>
            <td><strong style="color:#ea580c;">3.5 〜 4.5 g/日</strong><br><span style="font-size:0.75rem; color:#475569;">（成分 700〜900mg）</span></td>
            <td><strong style="color:#ea580c;">7.0 〜 9.0 g/日</strong><br><span style="font-size:0.75rem; color:#475569;">（成分 1400〜1800mg）</span></td>
            <td><strong style="color:#b91c1c;">7.5 〜 10.0 g/日</strong><br><span style="font-size:0.75rem; color:#b91c1c;">【成人最大量 1500〜2000mg】</span></td>
            <td><strong style="color:#b91c1c;">10.0 g/日</strong><br><span style="font-size:0.75rem; color:#b91c1c; font-weight:bold;">【成人最大量 2000mg キャップ】</span></td>
          </tr>
          <!-- クラリスDS -->
          <tr style="border-bottom:1px solid #cbd5e1;">
            <td style="text-align:left; padding:8px;">
              <strong>クラリスDS 10% 小児用</strong><br>
              <span style="font-size:0.75rem; color:#64748b;">（マクロライド系）分2</span>
            </td>
            <td>1日 10〜15 mg/kg<br><span style="font-size:0.74rem; color:#64748b;">（DS: 0.1〜0.15g/kg/日）</span></td>
            <td><strong>1.0 〜 1.5 g/日</strong><br><span style="font-size:0.75rem; color:#475569;">（1回 0.5〜0.75g×2）</span></td>
            <td><strong>2.0 〜 3.0 g/日</strong><br><span style="font-size:0.75rem; color:#475569;">（1回 1.0〜1.5g×2）</span></td>
            <td><strong>3.0 〜 4.0 g/日</strong><br><span style="font-size:0.75rem; color:#475569;">（1回 1.5〜2.0g×2）</span></td>
            <td><strong style="color:#b91c1c;">4.0 g/日</strong><br><span style="font-size:0.75rem; color:#b91c1c; font-weight:bold;">【成人量 400mg キャップ】</span></td>
          </tr>
          <!-- メイアクト細粒 -->
          <tr style="border-bottom:1px solid #cbd5e1;">
            <td style="text-align:left; padding:8px;">
              <strong>メイアクトMS細粒10%</strong><br>
              <span style="font-size:0.75rem; color:#64748b;">（セフェム系）分3食後</span>
            </td>
            <td>1日 9〜12 mg/kg<br><span style="font-size:0.74rem; color:#64748b;">（細粒: 0.09〜0.12g/kg/日）</span></td>
            <td><strong>0.9 〜 1.2 g/日</strong><br><span style="font-size:0.75rem; color:#475569;">（1回 0.3〜0.4g×3）</span></td>
            <td><strong>1.8 〜 2.4 g/日</strong><br><span style="font-size:0.75rem; color:#475569;">（1回 0.6〜0.8g×3）</span></td>
            <td><strong>2.7 〜 3.0 g/日</strong><br><span style="font-size:0.75rem; color:#475569;">（1回 0.9〜1.0g×3）</span></td>
            <td><strong style="color:#b91c1c;">3.0 g/日</strong><br><span style="font-size:0.75rem; color:#b91c1c; font-weight:bold;">【成人通常量 300mg キャップ】</span></td>
          </tr>
          <!-- オゼックス細粒 -->
          <tr style="border-bottom:1px solid #cbd5e1;">
            <td style="text-align:left; padding:8px;">
              <strong>オゼックス小児用細粒15%</strong><br>
              <span style="font-size:0.75rem; color:#64748b;">（キノロン系・耐性菌用）分2</span>
            </td>
            <td>1回 6 mg/kg を1日2回<br><span style="font-size:0.74rem; color:#64748b;">（細粒: 0.04g/kg/回）</span></td>
            <td><strong>1回 0.4 g × 2回/日</strong><br><span style="font-size:0.75rem; color:#475569;">（計 0.8g/日：120mg）</span></td>
            <td><strong>1回 0.8 g × 2回/日</strong><br><span style="font-size:0.75rem; color:#475569;">（計 1.6g/日：240mg）</span></td>
            <td><strong>1回 1.2 g × 2回/日</strong><br><span style="font-size:0.75rem; color:#475569;">（計 2.4g/日：360mg）</span></td>
            <td><strong style="color:#b91c1c;">1回 1.0〜1.5g × 2回/日</strong><br><span style="font-size:0.75rem; color:#b91c1c; font-weight:bold;">【成人上限 300〜450mg キャップ】</span></td>
          </tr>
          <!-- ダイアップ坐薬 -->
          <tr style="background:#fef2f2; border-bottom:1px solid #cbd5e1;">
            <td style="text-align:left; padding:8px;">
              <strong style="color:#b91c1c;">ダイアップ坐薬</strong><br>
              <span style="font-size:0.75rem; color:#64748b;">（熱性けいれん予防）</span>
            </td>
            <td>1回 0.4〜0.5 mg/kg<br><span style="font-size:0.74rem; color:#64748b;">発熱初期（8h後持続時再投与）</span></td>
            <td><strong>4 mg 坐薬</strong><br><span style="font-size:0.75rem; color:#475569;">1個（0.4mg/kg）</span></td>
            <td><strong>10 mg 坐薬</strong><br><span style="font-size:0.75rem; color:#475569;">1個（または4mg×2個）</span></td>
            <td><strong style="color:#b91c1c;">10 mg 坐薬</strong><br><span style="font-size:0.75rem; color:#b91c1c;">【小児単回上限 10mg キャップ】</span></td>
            <td><strong style="color:#b91c1c;">10 mg 坐薬</strong><br><span style="font-size:0.75rem; color:#b91c1c; font-weight:bold;">【成人最大量 10mg キャップ】</span></td>
          </tr>
          <!-- ホクナリンテープ -->
          <tr style="border-bottom:1px solid #cbd5e1;">
            <td style="text-align:left; padding:8px;">
              <strong>ホクナリンテープ</strong><br>
              <span style="font-size:0.75rem; color:#64748b;">（ツロブテロール貼付剤）</span>
            </td>
            <td>年齢区分別規格<br><span style="font-size:0.74rem; color:#64748b;">1日1回（半切不可）</span></td>
            <td><strong>0.5 mg</strong><br><span style="font-size:0.75rem; color:#475569;">（6ヶ月〜3歳未満）</span></td>
            <td><strong>1 mg</strong><br><span style="font-size:0.75rem; color:#475569;">（3歳〜9歳未満）</span></td>
            <td><strong>1 mg</strong>（〜2mg）<br><span style="font-size:0.75rem; color:#475569;">（9歳以上は2mgへ移行）</span></td>
            <td><strong>2 mg</strong><br><span style="font-size:0.75rem; color:#b91c1c; font-weight:bold;">【成人規格 2mg】</span></td>
          </tr>
          <!-- ムコダイン細粒 -->
          <tr>
            <td style="text-align:left; padding:8px;">
              <strong>ムコダイン細粒50%</strong><br>
              <span style="font-size:0.75rem; color:#64748b;">（カルボシステイン細粒）分3</span>
            </td>
            <td>1日 30 mg/kg<br><span style="font-size:0.74rem; color:#64748b;">（細粒50%: 0.06g/kg/日）</span></td>
            <td><strong>0.6 g/日</strong><br><span style="font-size:0.75rem; color:#475569;">（1回 0.2g×3）</span></td>
            <td><strong>1.2 g/日</strong><br><span style="font-size:0.75rem; color:#475569;">（1回 0.4g×3）</span></td>
            <td><strong>1.8 g/日</strong><br><span style="font-size:0.75rem; color:#475569;">（1回 0.6g×3）</span></td>
            <td><strong style="color:#b91c1c;">2.0 〜 3.0 g/日</strong><br><span style="font-size:0.75rem; color:#b91c1c; font-weight:bold;">【成人通常量 1500mg(3g)キャップ】</span></td>
          </tr>
        </tbody>
      </table>
    </div>
`;

// Insert after the existing pediatricTableHtml header in 05_comparison.html
const targetText = '<!-- 👶 【小児科調剤鑑査・小児用量（mg/kg）＆ 年齢・体重換算 完全早見マトリクス】 -->';
if (compContent.includes(targetText) && !compContent.includes('10kg刻み 体重別（10kg・20kg・30kg・40kg）')) {
  compContent = compContent.replace(targetText, targetText + '\n' + matrix10kgHtml);
  fs.writeFileSync(compPath, compContent, 'utf8');
  console.log('Successfully inserted 10kg Increments Table into 05_comparison.html!');
} else {
  console.log('05_comparison.html already updated or targetText not found.');
}

console.log('=== 10kg Pediatric Matrix Complete! ===');
