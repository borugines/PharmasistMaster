const fs = require('fs');
const path = require('path');

console.log("=== Building Complete Steroid & New Atopic Dermatitis Drugs Matrix ===");

// ============================================================================
// 1. Update src/03_guide.html (Core 16: 皮膚科・アレルギー疾患)
// ============================================================================
const guidePath = path.join(__dirname, '..', '03_guide.html');
let guideHtml = fs.readFileSync(guidePath, 'utf8');

const p16 = guideHtml.indexOf('id="c16"');
if (p16 === -1) {
  console.error("Could not find c16 in 03_guide.html");
  process.exit(1);
}

// Find insertion point in c16: right before `<div class="offlabel">`
const c16Snippet = guideHtml.substring(p16);
const offlabelOffset = c16Snippet.indexOf('<div class="offlabel">');
if (offlabelOffset === -1) {
  console.error("Could not find <div class=\"offlabel\"> in c16");
  process.exit(1);
}
const insertIndex = p16 + offlabelOffset;

const comprehensiveMatrixHtml = `
    <!-- 🧴 外用ステロイド 5段階ランク × 全身吸収率 × 新旧アトピー外用薬（モイゼルト・コレクチム・プロトピック）完全攻略マトリクス -->
    <div class="steroid-matrix-section" style="margin-top:1.5rem; margin-bottom:1.5rem; background:#f8fafc; border:2px solid #0284c7; border-radius:12px; padding:1.25rem; box-shadow:0 4px 10px rgba(0,0,0,0.06); break-inside:avoid;">
      <div style="display:flex; align-items:center; justify-content:space-between; border-bottom:2px solid #0284c7; padding-bottom:0.75rem; margin-bottom:1.25rem; flex-wrap:wrap; gap:8px;">
        <h3 style="margin:0; font-size:1.22rem; color:#0f172a; display:flex; align-items:center; gap:8px;">
          <span>🧴</span> <strong>外用ステロイド 5段階ランク ＆ 全身部位別吸収率マップ ＆ 新旧アトピー外用薬 徹底比較図鑑</strong>
        </h3>
        <span style="font-size:0.75rem; background:#0284c7; color:white; padding:4px 12px; border-radius:12px; font-weight:700;">皮膚科調剤監査・服薬指導 必須知識</span>
      </div>

      <!-- ① 5段階強さランク一覧表 -->
      <div style="margin-bottom:1.5rem;">
        <h4 style="font-size:1.02rem; color:#1e293b; margin:0 0 0.6rem 0; display:flex; align-items:center; gap:6px;">
          <span style="background:#0f172a; color:white; border-radius:50%; width:22px; height:22px; display:inline-flex; align-items:center; justify-content:center; font-size:0.75rem;">1</span>
          <strong>外用ステロイド 5段階強さランク一覧（日本皮膚科学会分類）</strong>
        </h4>
        <div style="overflow-x:auto;">
          <table style="width:100%; border-collapse:collapse; font-size:0.86rem; background:white; border-radius:8px; overflow:hidden; border:1px solid #cbd5e1;">
            <thead>
              <tr style="background:#0f172a; color:white; text-align:left;">
                <th style="padding:9px 12px; width:13%;">群（強さ）</th>
                <th style="padding:9px 12px; width:27%;">代表的先発品（一般名・規格）</th>
                <th style="padding:9px 12px; width:22%;">主な適応部位・病態</th>
                <th style="padding:9px 12px; width:38%;">特徴・臨床での位置づけ・監査上の急所</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid #e2e8f0; background:#fef2f2;">
                <td style="padding:10px 12px;"><strong style="color:#b91c1c; font-size:0.95rem;">Ⅰ群：最強<br><span style="font-size:0.75rem; font-weight:normal;">Strongest</span></strong></td>
                <td style="padding:10px 12px;">
                  <strong>デルモベート</strong>（クロベタゾールプロピオン酸エステル 0.05%）<br>
                  <strong>ダイアコート / ジフラール</strong>（ジフロラゾン酢酸エステル 0.05%）
                </td>
                <td style="padding:10px 12px;"><strong>手掌・足底</strong>の重症角化性病変（手湿疹・掌蹠膿疱症）、極めて頑固な苔癬化局面</td>
                <td style="padding:10px 12px;">
                  ステロイド外用薬の頂点。<strong>顔面・首・陰部には絶対禁忌！小児も原則使用不可</strong>。角質の極めて厚い手足に短期集中（2〜3週間以内）で使用し、改善後は速やかに下位ランクへ移行。
                </td>
              </tr>
              <tr style="border-bottom:1px solid #e2e8f0; background:#fff7ed;">
                <td style="padding:10px 12px;"><strong style="color:#c2410c; font-size:0.95rem;">Ⅱ群：非常に強力<br><span style="font-size:0.75rem; font-weight:normal;">Very Strong</span></strong></td>
                <td style="padding:10px 12px;">
                  <strong>アンテベート</strong>（ベタメタゾン酪酸エステルプロピオン酸エステル 0.05%）<br>
                  <strong>フルメタ</strong>（モメタゾンフランカルボン酸エステル 0.1%）<br>
                  <strong>マイザー</strong>（ジフルプレドナート 0.05%）<br>
                  <strong>トプシム</strong>（フルオシノニド 0.05%）<br>
                  <strong>リンデロンDP</strong>（ベタメタゾンジプロピオン酸エステル 0.05%）
                </td>
                <td style="padding:10px 12px;"><strong>成人の体幹・四肢</strong>の中等症〜重症湿疹・アトピー急性増悪期</td>
                <td style="padding:10px 12px;">
                  成人の体幹急性期の第一選択。「ケチらずたっぷり（FTU遵守）」塗り短期間で消火する。<strong>顔面・陰部には原則使用しない</strong>。小児は重症時の体幹に短期限定。
                </td>
              </tr>
              <tr style="border-bottom:1px solid #e2e8f0; background:#f0fdf4;">
                <td style="padding:10px 12px;"><strong style="color:#15803d; font-size:0.95rem;">Ⅲ群：強力<br><span style="font-size:0.75rem; font-weight:normal;">Strong</span></strong></td>
                <td style="padding:10px 12px;">
                  <strong>リンデロン-V / リンデロン-VG</strong>（ベタメタゾン吉草酸エステル 0.12% ※VGはゲンタマイシン配合）<br>
                  <strong>ボアラ / ザルックス</strong>（デキサメタゾン吉草酸エステル 0.12%）<br>
                  <strong>ベトネベート / ベトネベートN</strong>（ベタメタゾン吉草酸エステル 0.12%）<br>
                  <strong>エクラー</strong>（デプロドンプロピオン酸エステル 0.3%）
                </td>
                <td style="padding:10px 12px;">成人の体幹・四肢（軽症〜中等症）、<strong>小児の体幹・四肢</strong>（中等症〜重症）</td>
                <td style="padding:10px 12px;">
                  実臨床で処方頻度No.1の標準薬。リンデロンVGは化膿を伴う湿疹に有効だが、<strong>漫然連用すると耐性菌（MRSA等）の温床</strong>になるため、感染が落ち着いたらVGからV単剤へ切り替える。顔面は通常避ける（成人重症で数日限定のみ）。
                </td>
              </tr>
              <tr style="border-bottom:1px solid #e2e8f0; background:#f0f9ff;">
                <td style="padding:10px 12px;"><strong style="color:#0369a1; font-size:0.95rem;">Ⅳ群：中程度<br><span style="font-size:0.75rem; font-weight:normal;">Medium</span></strong></td>
                <td style="padding:10px 12px;">
                  <strong>ロコイド</strong>（ヒドロコルチゾン酪酸エステル 0.1%）<br>
                  <strong>キンダベート</strong>（クロベタゾン酪酸エステル 0.05%）<br>
                  <strong>アルメタ</strong>（アルクロメタゾンプロピオン酸エステル 0.1%）<br>
                  <strong>リドメックス</strong>（プレドニゾロン吉草酸エステル酢酸エステル 0.3%：<strong>PVA＝アンテドラッグ</strong>）
                </td>
                <td style="padding:10px 12px;"><strong>成人の顔面・頚部・陰部</strong>、小児の体幹・四肢、乳幼児全般</td>
                <td style="padding:10px 12px;">
                  皮膚萎縮や毛細血管拡張を起こしにくく、<strong>皮膚が薄く吸収率の高い顔面・首・陰部や小児の第一選択</strong>。リドメックスは局所で強く血中移行後に速やかに低活性化するアンテドラッグ。
                </td>
              </tr>
              <tr style="background:#f8fafc;">
                <td style="padding:10px 12px;"><strong style="color:#64748b; font-size:0.95rem;">Ⅴ群：弱い<br><span style="font-size:0.75rem; font-weight:normal;">Weak</span></strong></td>
                <td style="padding:10px 12px;">
                  <strong>プレドニゾロン軟膏</strong>（プレドニゾロン 0.5%）<br>
                  <strong>オイラックスH</strong>（ヒドロコルチゾン 0.25% ＋ クロタミトン 10%）
                </td>
                <td style="padding:10px 12px;"><strong>乳幼児の顔面・陰部</strong>（おむつ皮膚炎軽症）、軽微な皮膚炎、眼瞼周囲</td>
                <td style="padding:10px 12px;">
                  作用が最もマイルドで安全性は最高だが、成人の本格的な湿疹や苔癬化には力不足。乳児のデリケートな皮膚や眼周囲の軽度炎症に限定して用いる。
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ② 全身各部位の経皮吸収率マップ -->
      <div style="margin-bottom:1.5rem;">
        <h4 style="font-size:1.02rem; color:#1e293b; margin:0 0 0.5rem 0; display:flex; align-items:center; gap:6px;">
          <span style="background:#0284c7; color:white; border-radius:50%; width:22px; height:22px; display:inline-flex; align-items:center; justify-content:center; font-size:0.75rem;">2</span>
          <strong>全身各部位の経皮吸収率マップ（前腕屈側＝1.0 を基準とした倍率比：Feldman & Maibach）</strong>
        </h4>
        <div style="background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:10px 12px; margin-bottom:10px; font-size:0.86rem; color:#1e3a8a; line-height:1.5;">
          💡 <strong>なぜ部位によってランクを変えるのか？</strong> 皮膚の角層の厚さと毛包密度により薬の浸透率は最大300倍も異なります！「腕と同じ強さの薬を陰部に塗ると42倍、頬に塗ると13倍も強力に効いてしまう」ため、吸収率の高い部位にはマイルドな薬（Ⅳ群以下）を選びます。
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:10px;">
          <!-- 陰部 -->
          <div style="background:white; border:2px solid #ef4444; border-radius:8px; padding:10px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <span style="font-weight:700; color:#b91c1c; font-size:0.95rem;">🩲 陰部（陰嚢・外陰部）</span>
              <span style="background:#ef4444; color:white; font-size:0.8rem; font-weight:800; padding:2px 8px; border-radius:10px;">42.0倍</span>
            </div>
            <div style="font-size:0.8rem; color:#64748b; line-height:1.4;">
              身体中ダントツで最薄角質！超高吸収。<br>
              <strong style="color:#b91c1c;">推奨：Ⅳ群（ロコイド）または Ⅴ群</strong><br>
              ※強いステロイドは厳禁。真菌（カンジダ）鑑別必須！
            </div>
          </div>

          <!-- 頬・顎 -->
          <div style="background:white; border:2px solid #f97316; border-radius:8px; padding:10px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <span style="font-weight:700; color:#ea580c; font-size:0.95rem;">👦 頬（顔面）・下顎</span>
              <span style="background:#f97316; color:white; font-size:0.8rem; font-weight:800; padding:2px 8px; border-radius:10px;">13.0倍</span>
            </div>
            <div style="font-size:0.8rem; color:#64748b; line-height:1.4;">
              角層が薄く毛細血管が極めて豊富。<br>
              <strong style="color:#ea580c;">推奨：Ⅳ群（ロコイド、キンダベート）</strong><br>
              ※連用で酒さ様皮膚炎・赤ら顔。早期にコレクチムへ。
            </div>
          </div>

          <!-- 額・首 -->
          <div style="background:white; border:1px solid #f59e0b; border-radius:8px; padding:10px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <span style="font-weight:700; color:#d97706; font-size:0.95rem;">🧣 額（ひたい）・首（頚部）</span>
              <span style="background:#f59e0b; color:white; font-size:0.8rem; font-weight:800; padding:2px 8px; border-radius:10px;">6.0倍</span>
            </div>
            <div style="font-size:0.8rem; color:#64748b; line-height:1.4;">
              皮膚が薄くシワ・摩擦が多いデリケート部位。<br>
              <strong style="color:#d97706;">推奨：Ⅳ群（Medium）〜 Ⅲ群短期</strong><br>
              ※首の皮膚萎縮（ちりめんジワ）を防ぐため低ランク優先。
            </div>
          </div>

          <!-- 頭皮 -->
          <div style="background:white; border:1px solid #10b981; border-radius:8px; padding:10px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <span style="font-weight:700; color:#059669; font-size:0.95rem;">💇 頭皮（有髪部）</span>
              <span style="background:#10b981; color:white; font-size:0.8rem; font-weight:800; padding:2px 8px; border-radius:10px;">3.5倍</span>
            </div>
            <div style="font-size:0.8rem; color:#64748b; line-height:1.4;">
              毛包開口部が多く薬剤浸透性が高い。<br>
              <strong style="color:#059669;">推奨：Ⅱ群〜Ⅲ群（ローション/フォーム）</strong><br>
              ※軟膏は毛髪がベタつくため液剤（アンテベートL等）が基本。
            </div>
          </div>

          <!-- 背中・体幹 -->
          <div style="background:white; border:1px solid #0284c7; border-radius:8px; padding:10px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <span style="font-weight:700; color:#0284c7; font-size:0.95rem;">👕 背中・胸部・腹部</span>
              <span style="background:#0284c7; color:white; font-size:0.8rem; font-weight:800; padding:2px 8px; border-radius:10px;">1.7倍</span>
            </div>
            <div style="font-size:0.8rem; color:#64748b; line-height:1.4;">
              標準的な厚さ。広範囲に湿疹が出やすい。<br>
              <strong style="color:#0284c7;">推奨：Ⅱ群（成人急性） / Ⅲ群（標準）</strong><br>
              ※保湿剤を全身に塗り、皮疹部のみステロイドを置く。
            </div>
          </div>

          <!-- 前腕屈側（基準） -->
          <div style="background:white; border:1px solid #6366f1; border-radius:8px; padding:10px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <span style="font-weight:700; color:#4f46e5; font-size:0.95rem;">💪 前腕屈側（基準部位）</span>
              <span style="background:#6366f1; color:white; font-size:0.8rem; font-weight:800; padding:2px 8px; border-radius:10px;">1.0倍</span>
            </div>
            <div style="font-size:0.8rem; color:#64748b; line-height:1.4;">
              吸収率比較の国際標準ベンチマーク。<br>
              <strong style="color:#4f46e5;">推奨：Ⅱ群（成人重症） / Ⅲ群（標準）</strong><br>
              ※肘の内側はアトピー好発部位。十分な量（FTU）を塗布。
            </div>
          </div>

          <!-- 手掌 -->
          <div style="background:white; border:1px solid #8b5cf6; border-radius:8px; padding:10px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <span style="font-weight:700; color:#7c3aed; font-size:0.95rem;">✋ 手掌（手のひら）</span>
              <span style="background:#8b5cf6; color:white; font-size:0.8rem; font-weight:800; padding:2px 8px; border-radius:10px;">0.83倍</span>
            </div>
            <div style="font-size:0.8rem; color:#64748b; line-height:1.4;">
              角質層が非常に厚く薬が浸透しにくい。<br>
              <strong style="color:#7c3aed;">推奨：Ⅰ群（デルモベート）〜 Ⅱ群</strong><br>
              ※手湿疹・主婦湿疹。就寝時綿手袋着用で密封効果UP。
            </div>
          </div>

          <!-- 足底 -->
          <div style="background:white; border:2px solid #475569; border-radius:8px; padding:10px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <span style="font-weight:700; color:#334155; font-size:0.95rem;">🦶 足底（足の裏）</span>
              <span style="background:#475569; color:white; font-size:0.8rem; font-weight:800; padding:2px 8px; border-radius:10px;">0.14倍</span>
            </div>
            <div style="font-size:0.8rem; color:#64748b; line-height:1.4;">
              身体中最も角質が極厚（前腕の約1/7の浸透率）。<br>
              <strong style="color:#334155;">推奨：Ⅰ群（デルモベート、ダイアコート）</strong><br>
              ※掌蹠膿疱症や角化症。最強群で叩かないと効かない。
            </div>
          </div>
        </div>
      </div>

      <!-- ③ 部位別・年齢別 基本推奨薬剤マトリクス表 -->
      <div style="margin-bottom:1.5rem;">
        <h4 style="font-size:1.02rem; color:#1e293b; margin:0 0 0.6rem 0; display:flex; align-items:center; gap:6px;">
          <span style="background:#0f172a; color:white; border-radius:50%; width:22px; height:22px; display:inline-flex; align-items:center; justify-content:center; font-size:0.75rem;">3</span>
          <strong>部位別 ＆ 年齢別（成人 vs 小児）基本推奨薬剤・使い分け決定マトリクス</strong>
        </h4>
        <div style="overflow-x:auto;">
          <table style="width:100%; border-collapse:collapse; font-size:0.86rem; background:white; border-radius:8px; overflow:hidden; border:1px solid #cbd5e1;">
            <thead>
              <tr style="background:#0369a1; color:white; text-align:left;">
                <th style="padding:9px 12px; width:15%;">塗布部位</th>
                <th style="padding:9px 12px; width:10%;">吸収率比</th>
                <th style="padding:9px 12px; width:25%;">成人（第一選択 〜 維持）</th>
                <th style="padding:9px 12px; width:24%;">小児・乳幼児（基本選択）</th>
                <th style="padding:9px 12px; width:26%;">実務指導・処方監査の急所（Clinical Pearls）</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:10px 12px;"><strong>💇 頭皮（有髪部）</strong></td>
                <td style="padding:10px 12px; text-align:center;"><span style="background:#dcfce7; color:#15803d; font-weight:700; padding:2px 6px; border-radius:4px;">3.5倍</span></td>
                <td style="padding:10px 12px;">
                  <strong>Ⅱ群〜Ⅲ群 ローション / フォーム</strong><br>
                  ・アンテベートローション<br>
                  ・フルメタローション<br>
                  ・リンデロン-Vローション
                </td>
                <td style="padding:10px 12px;">
                  <strong>Ⅲ群〜Ⅳ群 ローション</strong><br>
                  ・リンデロン-Vローション<br>
                  ・ロコイドローション
                </td>
                <td style="padding:10px 12px; font-size:0.83rem; color:#475569;">
                  軟膏・クリームは髪がバリバリに固まりアドヒアランス低下。<strong>液剤（ローション）または泡（フォーム）が鉄則</strong>。爪を立てず「指の腹」で揉み込まず塗布。
                </td>
              </tr>
              <tr style="border-bottom:1px solid #e2e8f0; background:#fffbeb;">
                <td style="padding:10px 12px;"><strong>👦 顔面・頚部</strong></td>
                <td style="padding:10px 12px; text-align:center;"><span style="background:#fef3c7; color:#b45309; font-weight:700; padding:2px 6px; border-radius:4px;">6〜13倍</span></td>
                <td style="padding:10px 12px;">
                  <strong>Ⅳ群（Medium：第一選択）</strong><br>
                  ・ロコイド軟膏/クリーム<br>
                  ・キンダベート軟膏<br>
                  ・アルメタ軟膏<br>
                  <span style="font-size:0.8rem; color:#b91c1c;">※重症時のみⅢ群（リンデロンV）を数日限定</span><br>
                  ➔ <strong>寛解後：コレクチム / プロトピック / モイゼルト</strong>
                </td>
                <td style="padding:10px 12px;">
                  <strong>Ⅳ群〜Ⅴ群（Medium〜Weak）</strong><br>
                  ・キンダベート軟膏<br>
                  ・ロコイド軟膏<br>
                  ・アルメタ軟膏<br>
                  ・プレドニゾロン軟膏<br>
                  ➔ <strong>維持：モイゼルト / コレクチム</strong>
                </td>
                <td style="padding:10px 12px; font-size:0.83rem; color:#475569;">
                  <strong>顔面のステロイド連用は2週間が限界！</strong>皮膚萎縮・毛細血管拡張・酒さ様皮膚炎ハイリスク。皮疹が消えたら即座に非ステロイド外用（新世代薬）へステップダウン。
                </td>
              </tr>
              <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:10px 12px;"><strong>👕 体幹・四肢</strong></td>
                <td style="padding:10px 12px; text-align:center;"><span style="background:#e0f2fe; color:#0369a1; font-weight:700; padding:2px 6px; border-radius:4px;">1.0〜1.7倍</span></td>
                <td style="padding:10px 12px;">
                  <strong>Ⅱ群（急性重症）〜 Ⅲ群（標準）</strong><br>
                  ・アンテベート軟膏/クリーム<br>
                  ・フルメタ軟膏<br>
                  ・マイザー軟膏<br>
                  ・リンデロン-V軟膏
                </td>
                <td style="padding:10px 12px;">
                  <strong>Ⅲ群（中等症〜重症）〜 Ⅳ群（軽症）</strong><br>
                  ・リンデロン-V軟膏<br>
                  ・キンダベート軟膏<br>
                  ・リドメックスコーワ軟膏
                </td>
                <td style="padding:10px 12px; font-size:0.83rem; color:#475569;">
                  最も標準的な部位。<strong>小児は成人の1〜2ランク下げるのが鉄則</strong>（皮膚の厚さが成人の半分）。「入浴後5分以内に全身保湿剤 ➔ 赤み部分にステロイドをピンポイント置き」が黄金律。
                </td>
              </tr>
              <tr style="border-bottom:1px solid #e2e8f0; background:#f5f3ff;">
                <td style="padding:10px 12px;"><strong>✋ 手掌・足底</strong></td>
                <td style="padding:10px 12px; text-align:center;"><span style="background:#ede9fe; color:#6d28d9; font-weight:700; padding:2px 6px; border-radius:4px;">0.14〜0.83倍</span></td>
                <td style="padding:10px 12px;">
                  <strong>Ⅰ群（Strongest：第一選択）〜 Ⅱ群</strong><br>
                  ・デルモベート軟膏<br>
                  ・ダイアコート軟膏<br>
                  ・ジフラール軟膏
                </td>
                <td style="padding:10px 12px;">
                  <strong>Ⅱ群〜Ⅲ群</strong><br>
                  ・アンテベート軟膏<br>
                  ・リンデロン-V軟膏<br>
                  <span style="font-size:0.8rem; color:#64748b;">※小児のⅠ群は専門医の指示下に限定</span>
                </td>
                <td style="padding:10px 12px; font-size:0.83rem; color:#475569;">
                  角層が極めて分厚いため<strong>中途半端な強さ（Ⅲ群やⅣ群）では全く効果が出ない！</strong>最強のⅠ群で一気に叩く。水仕事前の保護や、就寝時の「亜鉛華単軟膏重層」や「綿手袋着用」が奏効。
                </td>
              </tr>
              <tr style="background:#fef2f2;">
                <td style="padding:10px 12px;"><strong>🩲 陰部・外陰部・肛門周囲</strong></td>
                <td style="padding:10px 12px; text-align:center;"><span style="background:#fee2e2; color:#b91c1c; font-weight:800; padding:2px 6px; border-radius:4px;">42.0倍</span></td>
                <td style="padding:10px 12px;">
                  <strong>Ⅳ群（Medium：上限）〜 Ⅴ群（Weak）</strong><br>
                  ・ロコイド軟膏<br>
                  ・キンダベート軟膏<br>
                  ・プレドニゾロン軟膏<br>
                  <span style="font-size:0.8rem; color:#b91c1c;">※Ⅰ群・Ⅱ群は全身吸収・皮膚萎縮の危険大で禁忌</span>
                </td>
                <td style="padding:10px 12px;">
                  <strong>Ⅳ群〜Ⅴ群（短期間）/ 非ステロイド</strong><br>
                  ・キンダベート軟膏<br>
                  ・アズノール軟膏（非ステロイド消炎）<br>
                  ・亜鉛華単軟膏 / プロペト（保護）
                </td>
                <td style="padding:10px 12px; font-size:0.83rem; color:#475569;">
                  <strong>【真菌感染トラップに超警戒！】</strong>陰部のかゆみ・発赤はカンジダ症や白癬（いんきんたむし）の可能性大。ステロイドを塗ると真菌が爆発的に増殖して劇悪化する！抗真菌薬（エンペシド等）の鑑別を医師・患者と確認。
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ④ 【注目！】アトピー新旧外用薬 ガチンコ比較表（モイゼルト vs コレクチム vs プロトピック vs ステロイド） -->
      <div style="margin-bottom:1.5rem; background:white; border:2px solid #6366f1; border-radius:10px; padding:1.15rem; box-shadow:0 2px 6px rgba(0,0,0,0.05);">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.75rem; flex-wrap:wrap; gap:8px;">
          <h4 style="font-size:1.05rem; color:#312e81; margin:0; display:flex; align-items:center; gap:6px;">
            <span style="background:#4f46e5; color:white; border-radius:50%; width:22px; height:22px; display:inline-flex; align-items:center; justify-content:center; font-size:0.75rem;">4</span>
            <strong>⚔️ アトピー新旧外用薬 ガチンコ比較（モイゼルト vs コレクチム vs プロトピック vs ステロイド）</strong>
          </h4>
          <span style="font-size:0.75rem; background:#4f46e5; color:white; padding:3px 10px; border-radius:10px; font-weight:700;">脱ステロイド・プロアクティブ時代の主役たち</span>
        </div>
        <p style="font-size:0.85rem; color:#475569; margin:0 0 0.75rem 0;">
          長年アトピー治療を支配してきた「ステロイド」と「プロトピック（タクロリムス）」に加え、新世代の<strong>「コレクチム（JAK阻害）」</strong>と<strong>「モイゼルト（PDE4阻害）」</strong>が登場！刺激感や適応年齢、作用機序の決定的な違いを把握し、患者の「塗れない」「再燃する」悩みを解決します。
        </p>

        <div style="overflow-x:auto;">
          <table style="width:100%; border-collapse:collapse; font-size:0.85rem; background:white; border-radius:8px; overflow:hidden; border:1px solid #c7d2fe;">
            <thead>
              <tr style="background:#3730a3; color:white; text-align:left;">
                <th style="padding:9px 10px; width:14%;">薬剤名（一般名）</th>
                <th style="padding:9px 10px; width:16%;">作用機序・分類</th>
                <th style="padding:9px 10px; width:16%;">適応年齢・規格</th>
                <th style="padding:9px 10px; width:16%;">塗布部位・用量上限</th>
                <th style="padding:9px 10px; width:18%;">刺激感・主な副作用</th>
                <th style="padding:9px 10px; width:20%;">臨床ポジショニング ＆ 使い分けの結論</th>
              </tr>
            </thead>
            <tbody>
              <!-- ステロイド -->
              <tr style="border-bottom:1px solid #e2e8f0; background:#f8fafc;">
                <td style="padding:10px;">
                  <strong style="color:#b91c1c;">ステロイド外用薬</strong><br>
                  <span style="font-size:0.78rem; color:#64748b;">アンテベート / リンデロン等</span>
                </td>
                <td style="padding:10px;">
                  <strong>広範な抗炎症・免疫抑制</strong><br>
                  <span style="font-size:0.78rem; color:#64748b;">グルココルチコイド受容体を介したサイトカイン転写抑制</span>
                </td>
                <td style="padding:10px;">
                  <strong>全年齢（新生児〜）</strong><br>
                  <span style="font-size:0.78rem; color:#64748b;">強さ5段階（Ⅰ〜Ⅴ群）を年齢・部位で選定</span>
                </td>
                <td style="padding:10px;">
                  <strong>全身（手足〜体幹）</strong><br>
                  <span style="font-size:0.78rem; color:#64748b;">顔・陰部はⅣ群以下。<br>FTU基準で塗布。</span>
                </td>
                <td style="padding:10px;">
                  <strong>長期連用で局所副作用：</strong><br>
                  皮膚萎縮、毛細血管拡張、酒さ様皮膚炎、易感染性
                </td>
                <td style="padding:10px;">
                  <span style="background:#fee2e2; color:#b91c1c; font-weight:700; padding:2px 6px; border-radius:4px; font-size:0.78rem;">急性期の火消し絶対王者</span><br>
                  皮疹の急性増悪を一気に消火する第一選択。ツルツルになったら新世代非ステロイド薬へバトンタッチ。
                </td>
              </tr>

              <!-- プロトピック -->
              <tr style="border-bottom:1px solid #e2e8f0; background:#fff7ed;">
                <td style="padding:10px;">
                  <strong style="color:#c2410c;">プロトピック軟膏</strong><br>
                  <span style="font-size:0.78rem; color:#64748b;">（タクロリムス水和物）</span>
                </td>
                <td style="padding:10px;">
                  <strong>カルシニューリン阻害</strong><br>
                  <span style="font-size:0.78rem; color:#64748b;">T細胞活性化とIL-2産生を特異的遮断</span>
                </td>
                <td style="padding:10px;">
                  ・<strong>0.1%：成人（16歳以上）</strong><br>
                  ・<strong>0.03%小児用：2〜15歳</strong><br>
                  <span style="font-size:0.75rem; color:#dc2626;">※2歳未満は使用禁忌！</span>
                </td>
                <td style="padding:10px;">
                  <strong>顔面・首に最強</strong><br>
                  <span style="font-size:0.78rem; color:#64748b;">成人：1回5g/日上限。<br>手足の厚い角質には浸透しない。</span>
                </td>
                <td style="padding:10px;">
                  <strong style="color:#dc2626;">🔥 強烈な灼熱感・ほてり</strong><br>
                  <span style="font-size:0.78rem; color:#64748b;">塗り始め数日間のピリピリ・熱感で脱落者多発。日光過敏・飲酒時紅潮。</span>
                </td>
                <td style="padding:10px;">
                  <span style="background:#ffedd5; color:#c2410c; font-weight:700; padding:2px 6px; border-radius:4px; font-size:0.78rem;">元祖・顔面の非ステロイド</span><br>
                  ストロング級の消炎力で皮膚萎縮ゼロ。ただし初期刺激感が最大の壁。耐えられない場合はコレクチムやモイゼルトへ！
                </td>
              </tr>

              <!-- コレクチム -->
              <tr style="border-bottom:1px solid #e2e8f0; background:#f0fdf4;">
                <td style="padding:10px;">
                  <strong style="color:#15803d;">コレクチム軟膏</strong><br>
                  <span style="font-size:0.78rem; color:#64748b;">（デルゴシチニブ）</span>
                </td>
                <td style="padding:10px;">
                  <strong>外用JAK阻害薬</strong><br>
                  <span style="font-size:0.78rem; color:#64748b;">JAK1/2/3/Tyk2を汎阻害し多彩な炎症シグナルを遮断</span>
                </td>
                <td style="padding:10px;">
                  ・<strong>0.5%：成人・小児</strong><br>
                  ・<strong>0.25%：小児・乳幼児</strong><br>
                  <span style="font-size:0.75rem; color:#15803d; font-weight:700;">★生後6ヶ月以上から適応拡大！</span>
                </td>
                <td style="padding:10px;">
                  <strong>全身（顔・首・体幹・四肢）</strong><br>
                  <span style="font-size:0.78rem; color:#64748b;">成人：1回5g（1日10g）上限。<br>小児：体表面積で制限。</span>
                </td>
                <td style="padding:10px;">
                  <strong>刺激感は極めて少ない！</strong><br>
                  <span style="font-size:0.78rem; color:#64748b;">プロトピックの灼熱感なし。<br>注意：毛包炎（にきび）、ヘルペス感染。</span>
                </td>
                <td style="padding:10px;">
                  <span style="background:#dcfce7; color:#15803d; font-weight:700; padding:2px 6px; border-radius:4px; font-size:0.78rem;">痒み遮断＆高い消炎力</span><br>
                  ステロイド（ミディアム〜ストロング）に匹敵する効果と強力な鎮痒作用。プロトピックが刺激で使えない患者のベスト救世主！
                </td>
              </tr>

              <!-- モイゼルト -->
              <tr style="background:#eff6ff;">
                <td style="padding:10px;">
                  <strong style="color:#1d4ed8;">モイゼルト軟膏</strong><br>
                  <span style="font-size:0.78rem; color:#64748b;">（ジファミラスト）</span>
                </td>
                <td style="padding:10px;">
                  <strong>外用PDE4阻害薬</strong><br>
                  <span style="font-size:0.78rem; color:#64748b;">細胞内cAMPを上昇させ炎症抑制＆抗炎症性IL-10促進</span>
                </td>
                <td style="padding:10px;">
                  ・<strong>1%：成人・小児</strong><br>
                  ・<strong>0.3%：小児（2歳以上）</strong><br>
                  <span style="font-size:0.78rem; color:#64748b;">※乳幼児への開発進行中</span>
                </td>
                <td style="padding:10px;">
                  <strong>全身（顔・体幹・四肢）</strong><br>
                  <span style="font-size:0.75rem; color:#1d4ed8; font-weight:700;">★1回グラム上限の制限なし！</span><br>
                  <span style="font-size:0.78rem; color:#64748b;">広範囲に塗りやすい。</span>
                </td>
                <td style="padding:10px;">
                  <strong style="color:#15803d;">刺激感が最も少ない！</strong><br>
                  <span style="font-size:0.78rem; color:#64748b;">敏感肌・荒れた肌でもしみない。<br>注意：色素沈着、接触皮膚炎。</span>
                </td>
                <td style="padding:10px;">
                  <span style="background:#dbeafe; color:#1d4ed8; font-weight:700; padding:2px 6px; border-radius:4px; font-size:0.78rem;">超低刺激 ＆ 広範囲プロアクティブ</span><br>
                  「しみるのが嫌」な小児や敏感肌、広範囲の軽症〜中等症維持期に最適。塗布量制限がなく全身のアドヒアランスが高い。
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 使い分けフロー・まとめの決定樹 -->
        <div style="margin-top:10px; background:#f1f5f9; border-radius:8px; padding:10px 12px; font-size:0.84rem; line-height:1.5;">
          <strong style="color:#1e293b;">🎯 先輩薬剤師直伝！アトピー外用薬「使い分けの黄金シナリオ」：</strong><br>
          ・<strong>【増悪期（真っ赤・ガサガサ）】：</strong>まずは<strong>ステロイド（アンテベート/リンデロン等）</strong>でためらわず一気に消火！新世代薬は火消しには力不足。<br>
          ・<strong>【鎮火後（ツルツル〜維持期）】：</strong>顔面・首は<strong>コレクチム</strong>または<strong>プロトピック</strong>へ即座にスイッチし、皮膚萎縮・赤ら顔を防ぐ。<br>
          ・<strong>【プロトピックで挫折した患者】：</strong>「ヒリヒリして熱くて塗れない」場合は、我慢させずに刺激の少ない<strong>コレクチム</strong>や<strong>モイゼルト</strong>へ変更を提案！<br>
          ・<strong>【小児・敏感肌・広範囲】：</strong>刺激感が最も少なく塗布量上限のない<strong>モイゼルト</strong>、または生後6ヶ月から使える<strong>コレクチム</strong>で週2回のプロアクティブ維持へ。
        </div>
      </div>

      <!-- ⑤ アンテドラッグ ＆ 副作用防止 ＆ 指導の極意 -->
      <div style="background:white; border:1px solid #cbd5e1; border-radius:8px; padding:12px 14px;">
        <h4 style="font-size:0.98rem; color:#0f172a; margin:0 0 0.5rem 0; display:flex; align-items:center; gap:6px;">
          <span>💡</span> <strong>先輩薬剤師が伝授する「皮膚科外用指導の臨床的知恵（Clinical Pearls）」</strong>
        </h4>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:12px; font-size:0.84rem; line-height:1.5;">
          <div style="background:#f8fafc; border-left:3px solid #0284c7; padding:8px 10px; border-radius:0 6px 6px 0;">
            <strong style="color:#0284c7;">🧬 アンテドラッグ（Antidrug）のすごさ：</strong><br>
            <strong>リドメックス（PVA）</strong>などのアンテドラッグは、患部の皮膚表面では中等度（Ⅳ群）の強い消炎作用を発揮し、毛細血管から血中に移行すると体内のエステラーゼで速やかに分解・不活性化されます。<strong>「局所ではしっかり効き、全身副作用は極小」</strong>という優れた設計のため、乳幼児や広範囲塗布で特に重宝されます。
          </div>
          <div style="background:#f8fafc; border-left:3px solid #10b981; padding:8px 10px; border-radius:0 6px 6px 0;">
            <strong style="color:#10b981;">🔄 プロアクティブ療法への移行ステップ：</strong><br>
            皮疹がツルツルに治まった直後にステロイドをパタッと急にやめると、高確率でリバウンド再燃を起こします。<strong>「1日2回 ➔ 1日1回 ➔ 2〜3日に1回（週末だけ塗るウィークエンド療法）」</strong>と段階的に減らすか、<strong>コレクチム軟膏・モイゼルト軟膏</strong>へバトンタッチするのが最新の標準治療です。
          </div>
          <div style="background:#f8fafc; border-left:3px solid #ef4444; padding:8px 10px; border-radius:0 6px 6px 0;">
            <strong style="color:#b91c1c;">⚠️ ステロイド長期連用の3大局所副作用：</strong><br>
            漫然と塗り続けると、①<strong>皮膚萎縮</strong>（皮膚が紙のように薄くなり皮下出血しやすくなる）、②<strong>毛細血管拡張・酒さ様皮膚炎</strong>（顔が常に赤くなる）、③<strong>ステロイドざ瘡・毛包炎</strong>（にきびの多発）が出現します。これらが見られたら直ちに休薬・非ステロイドへの変更を提案します。
          </div>
          <div style="background:#f8fafc; border-left:3px solid #f59e0b; padding:8px 10px; border-radius:0 6px 6px 0;">
            <strong style="color:#d97706;">🧴 塗布量FTU（フィンガーチップユニット）の目安：</strong><br>
            人差し指の先端から第1関節までチューブから押し出した量（約0.5g）＝<strong>成人の手のひら2枚分の面積</strong>に塗る量です。塗った直後にティッシュペーパーが1枚張り付き、落ちない程度の「しっとりテカリ」が適量のサイン。「すり込まずにやさしく置くように伸ばす」よう指導します。
          </div>
        </div>
      </div>
    </div>
`;

guideHtml = guideHtml.substring(0, insertIndex) + comprehensiveMatrixHtml + '\n\n    ' + guideHtml.substring(insertIndex);
fs.writeFileSync(guidePath, guideHtml, 'utf8');
console.log("Successfully updated 03_guide.html with complete steroid & new atopic drugs matrix!");


// ============================================================================
// 2. Update src/05_comparison.html (Section ⑤ 免疫・アレルギー・皮膚科)
// ============================================================================
const compPath = path.join(__dirname, '..', '05_comparison.html');
let compHtml = fs.readFileSync(compPath, 'utf8');

const compTablesHtml = `
    <!-- 外用ステロイド 5段階ランク × 全身吸収率マトリクス -->
    <div class="sub-banner banner-within" style="margin-top:2rem;">
      <span>🧴 【外用ステロイド 5段階ランク × 全身吸収率 × 部位別・年齢別使い分けマトリクス】</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:13%;">群（強さ）</th>
          <th style="width:23%;">代表的製剤（一般名）</th>
          <th style="width:18%;">適応部位（吸収率比）</th>
          <th style="width:18%;">成人 vs 小児 推奨</th>
          <th style="width:28%;">なぜ医師はこの強さを選んだのか？（決定的な処方意図・鑑査急所）</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong style="color:#b91c1c;">Ⅰ群<br>Strongest<br>（最強）</strong></td>
          <td><strong>デルモベート</strong><br>（クロベタゾール 0.05%）<br><strong>ダイアコート</strong><br>（ジフロラゾン 0.05%）</td>
          <td><strong>手掌・足底</strong><br>（0.14〜0.83倍）<br><span style="font-size:0.75rem; color:#b91c1c;">※顔・首・陰部厳禁</span></td>
          <td><strong>成人：</strong>手足の難治例<br><strong>小児：</strong>原則使用不可</td>
          <td><span class="char">外用ステロイドの頂点！角質極厚部位の切り札</span> 手掌・足底の厚い角質にはⅢ〜Ⅳ群では全く太刀打ちできないため最強群で一気に叩く。顔面や陰部への処方は疑義照会レベル！</td>
        </tr>
        <tr>
          <td><strong style="color:#ea580c;">Ⅱ群<br>Very Strong<br>（非常に強力）</strong></td>
          <td><strong>アンテベート</strong><br>（ベタメタゾン酪酸プロピオン酸）<br><strong>フルメタ</strong><br>（モメタゾン）<br><strong>マイザー</strong><br>（ジフルプレドナート）</td>
          <td><strong>体幹・四肢</strong><br>（1.0〜1.7倍）<br><strong>頭皮</strong>（3.5倍：液剤）</td>
          <td><strong>成人：</strong>体幹第一選択<br><strong>小児：</strong>重症時のみ体幹</td>
          <td><span class="char">成人の急性増悪・強い皮疹を一気に消火する主力軍</span> 「薄く塗る」と火種がくすぶり続けるため、FTUを守って短期で一気に寛解へ持ち込む。ツルツルになったら速やかに下位ランクやJAK/PDE4へ。</td>
        </tr>
        <tr>
          <td><strong style="color:#15803d;">Ⅲ群<br>Strong<br>（強力）</strong></td>
          <td><strong>リンデロン-V / VG</strong><br>（ベタメタゾン吉草酸エステル）<br><strong>ボアラ</strong><br>（デキサメタゾン吉草酸）<br><strong>ベトネベート</strong></td>
          <td><strong>体幹・四肢</strong><br>（1.0〜1.7倍）<br>頭皮（3.5倍）</td>
          <td><strong>成人：</strong>軽〜中等症体幹<br><strong>小児：</strong>中等〜重症体幹</td>
          <td><span class="char">最も処方される万能標準ステロイド</span> 小児の体幹の主力。リンデロンVGはゲンタマイシン（抗生剤）配合だが、漫然連用はMRSA等の耐性菌を誘発するため「とびひ等の感染が治まったらV単剤へ変更」が鉄則。</td>
        </tr>
        <tr>
          <td><strong style="color:#0284c7;">Ⅳ群<br>Medium<br>（中程度）</strong></td>
          <td><strong>ロコイド</strong><br>（ヒドロコルチゾン酪酸）<br><strong>キンダベート</strong><br>（クロベタゾン酪酸）<br><strong>リドメックス</strong>（PVA）</td>
          <td><strong>顔面・頚部</strong>（6〜13倍）<br><strong>陰部</strong>（42倍）<br>小児全身</td>
          <td><strong>成人：</strong>顔面・首・陰部<br><strong>小児：</strong>乳幼児第一選択</td>
          <td><span class="char">薄い皮膚・高吸収部位の安全弁 ＆ アンテドラッグ</span> 吸収率が腕の13倍（顔）〜42倍（陰部）もある部位には、副作用（皮膚萎縮・赤ら顔）を防ぐためMediumを選択。リドメックスは血中分解されるアンテドラッグで乳幼児に安心。</td>
        </tr>
        <tr>
          <td><strong style="color:#64748b;">Ⅴ群<br>Weak<br>（弱い）</strong></td>
          <td><strong>プレドニゾロン軟膏</strong><br>（プレドニゾロン 0.5%）<br><strong>オイラックスH</strong><br>（HC＋クロタミトン）</td>
          <td>乳幼児顔面・陰部<br>眼瞼周囲（軽微）</td>
          <td><strong>成人：</strong>効果不十分<br><strong>乳幼児：</strong>超デリケート部</td>
          <td><span class="char">最もマイルドな安全重視製剤</span> おむつ皮膚炎の軽症や眼瞼の軽度湿疹に使用。成人の苔癬化やアトピーには力不足だが、乳幼児のデリケートな肌を守る最終防衛線。</td>
        </tr>
      </tbody>
    </table>

    <!-- 新旧アトピー外用薬ガチンコ比較（モイゼルト vs コレクチム vs プロトピック vs ステロイド） -->
    <div class="sub-banner banner-within" style="margin-top:2rem;">
      <span>⚔️ 【アトピー新旧外用薬 ガチンコ比較】モイゼルト vs コレクチム vs プロトピック vs ステロイド</span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:16%;">薬剤名（商品名 / 一般名）</th>
          <th style="width:16%;">クラス・作用機序</th>
          <th style="width:16%;">適応年齢・用量制限</th>
          <th style="width:18%;">刺激感・局所副作用</th>
          <th style="width:34%;">なぜ医師はこの新薬（または従来薬）を選んだのか？（決定打・使い分け）</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>ステロイド外用薬</strong><br>（アンテベート等）</td>
          <td>ステロイド受容体<br>（広範な転写抑制）</td>
          <td>全年齢<br>（ランク選定）<br>制限なし（FTU遵守）</td>
          <td>刺激感ほぼなし<br><span style="color:#dc2626;">連用で皮膚萎縮・赤ら顔</span></td>
          <td><span class="char">急激な火消しの絶対王者！</span> アトピー急性増悪期・強い皮疹を短期間で鎮火させる力は今でも最強。ただし長期連用は副作用必発のため、寛解後は即座にコレクチムやモイゼルトへバトンタッチする。</td>
        </tr>
        <tr>
          <td><strong>プロトピック軟膏</strong><br>（タクロリムス水和物）</td>
          <td>カルシニューリン阻害<br>（NFAT阻害・IL-2遮断）</td>
          <td>0.1%：16歳以上<br>0.03%：2〜15歳<br><span style="color:#dc2626;">※2歳未満禁忌</span><br>1回5g上限</td>
          <td><span style="color:#dc2626; font-weight:700;">🔥 強烈な灼熱感・ほてり！</span><br>日光過敏・飲酒時紅潮<br>（皮膚萎縮はゼロ）</td>
          <td><span class="char">元祖・顔面の非ステロイド！</span> ストロング級の抗炎症力を持ちながら皮膚萎縮・毛細血管拡張を起こさないため、成人の顔面・首の第一選択として君臨。しかし「塗ると熱くて痛い」灼熱感でドロップアウトする患者が多いのが最大の難点。</td>
        </tr>
        <tr>
          <td><strong>コレクチム軟膏</strong><br>（デルゴシチニブ）</td>
          <td>外用JAK阻害薬<br>（JAK1/2/3/Tyk2汎阻害）</td>
          <td>0.5%：成人・小児<br>0.25%：小児<br><span style="color:#15803d; font-weight:700;">生後6ヶ月から使用可能！</span><br>1回5g上限</td>
          <td><strong style="color:#15803d;">刺激感が極めて少ない！</strong><br>（プロトピックの熱感なし）<br>毛包炎・ヘルペス注意</td>
          <td><span class="char">プロトピックの灼熱感を克服した強力JAK阻害薬！</span> 多彩な炎症サイトカインシグナルを直接遮断し、ステロイド並みの消炎力と即効性のある鎮痒効果を発揮。プロトピックの刺激に耐えられなかった患者の最有力選択肢！生後6ヶ月の乳児から使えるのも強力な強み。</td>
        </tr>
        <tr>
          <td><strong>モイゼルト軟膏</strong><br>（ジファミラスト）</td>
          <td>外用PDE4阻害薬<br>（cAMP上昇・IL-10促進）</td>
          <td>1%：成人・小児<br>0.3%：2歳以上小児<br><span style="color:#1d4ed8; font-weight:700;">1回塗布量の上限なし！</span></td>
          <td><strong style="color:#15803d;">全外用薬の中で最も低刺激！</strong><br>荒れた肌でもしみない<br>色素沈着・接触皮膚炎注意</td>
          <td><span class="char">超低刺激 ＆ 塗布量無制限のプロアクティブ維持薬！</span> 傷やただれがある過敏な皮膚でもピリピリ・熱感がほとんど出ない。さらに「1回あたりの塗布量上限がない」ため、体幹・四肢の広範囲に安心してたっぷり塗れる。小児や刺激に敏感な患者の長期寛解維持に最適！</td>
        </tr>
      </tbody>
    </table>
`;

const pSecInfHeader = compHtml.indexOf('<div class="comp-section sec-inf">');
if (pSecInfHeader === -1) {
  console.error("Could not find <div class=\"comp-section sec-inf\"> in 05_comparison.html");
  process.exit(1);
}

const beforeSecInf = compHtml.substring(0, pSecInfHeader);
const lastDivIndex = beforeSecInf.lastIndexOf('</div>');

compHtml = compHtml.substring(0, lastDivIndex) + compTablesHtml + '\n  ' + compHtml.substring(lastDivIndex);

compHtml = compHtml.replace(
  '⑤ 免疫・アレルギー：「吸入デバイス＆配合剤マトリクス」と「抗ヒスタミン薬の眠気・効果マップ」',
  '⑤ 免疫・アレルギー・皮膚科：「吸入デバイス」「抗ヒスタミン薬」＆「ステロイドランク・モイゼルト・コレクチム比較」'
);

fs.writeFileSync(compPath, compHtml, 'utf8');
console.log("Successfully updated 05_comparison.html with steroid & new atopic drugs matrix!");


// ============================================================================
// 3. Update src/14_dictionary.html (Add dictionary cards)
// ============================================================================
const dictPath = path.join(__dirname, '..', '14_dictionary.html');
let dictHtml = fs.readFileSync(dictPath, 'utf8');

const dictCardsHtml = `
      <!-- 外用ステロイド 5段階強さランク -->
      <div class="dict-card" data-category="derm">
        <div class="dict-card-header">
          <span class="dict-tag">皮膚科・ステロイド</span>
          <span class="dict-badge">必須知識</span>
        </div>
        <h3 class="dict-card-title">外用ステロイド 5段階強さランク（日本皮膚科学会基準）</h3>
        <p class="dict-card-desc">
          ステロイド外用薬は血管収縮試験等の力価に基づき5段階に厳密に分類される：<br>
          <strong>① Ⅰ群（Strongest：最強）：</strong>デルモベート、ダイアコート（手掌・足底の重症角化性病変限定。顔面・陰部・小児は原則禁忌）<br>
          <strong>② Ⅱ群（Very Strong：非常に強力）：</strong>アンテベート、フルメタ、マイザー、トプシム（成人の体幹・四肢の急性増悪の主力）<br>
          <strong>③ Ⅲ群（Strong：強力）：</strong>リンデロン-V/VG、ボアラ、ベトネベート（成人軽〜中等症、小児中等〜重症。処方頻度No.1）<br>
          <strong>④ Ⅳ群（Medium：中程度）：</strong>ロコイド、キンダベート、アルメタ、リドメックス（顔面・首・陰部・乳幼児の安全な第一選択）<br>
          <strong>⑤ Ⅴ群（Weak：弱い）：</strong>プレドニゾロン、オイラックスH（乳幼児の顔面・陰部・眼瞼周囲の軽微な皮膚炎）
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">関連疾患：アトピー性皮膚炎 / 接触皮膚炎 / 湿疹</span>
        </div>
      </div>

      <!-- 全身各部位の経皮吸収率マップ -->
      <div class="dict-card" data-category="derm">
        <div class="dict-card-header">
          <span class="dict-tag">皮膚科・薬物動態</span>
          <span class="dict-badge">鑑査急所</span>
        </div>
        <h3 class="dict-card-title">外用薬の経皮吸収率マップ（前腕屈側＝1.0基準の倍率比）</h3>
        <p class="dict-card-desc">
          皮膚の角層の厚さと毛包密度による吸収率倍率（Feldman & Maibachデータ）：<br>
          ・<strong>陰部（陰嚢）：42倍</strong>（身体中突出して最薄角質。超ハイリスク ➔ Ⅳ群以下限定）<br>
          ・<strong>頬（顔面）：13倍</strong>（角層薄く毛細血管豊富。酒さ様皮膚炎リスク ➔ Ⅳ群以下限定）<br>
          ・<strong>額・首：6.0倍</strong>（薄く皮膚萎縮を起こしやすいデリケート部位）<br>
          ・<strong>頭皮：3.5倍</strong>（毛包開口部多く浸透大 ➔ ローション/フォーム剤選択）<br>
          ・<strong>背中・体幹：1.7倍</strong>（標準的な体幹 ➔ Ⅱ〜Ⅲ群）<br>
          ・<strong>前腕屈側（基準）：1.0倍</strong>（四肢 ➔ Ⅱ〜Ⅲ群）<br>
          ・<strong>手掌（手のひら）：0.83倍</strong>（角質厚い ➔ Ⅰ〜Ⅱ群）<br>
          ・<strong>足底（足の裏）：0.14倍</strong>（前腕の約1/7しか浸透しない極厚角質 ➔ Ⅰ群必須）
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">原則：高吸収部位（顔・陰部）にはMedium以下、難浸透部位（手足）にはStrongest</span>
        </div>
      </div>

      <!-- コレクチム軟膏（デルゴシチニブ） -->
      <div class="dict-card" data-category="derm">
        <div class="dict-card-header">
          <span class="dict-tag">アトピー・JAK阻害</span>
          <span class="dict-badge">新世代外用薬</span>
        </div>
        <h3 class="dict-card-title">コレクチム軟膏（デルゴシチニブ / 外用JAK阻害薬）</h3>
        <p class="dict-card-desc">
          <strong>【作用機序】</strong>JAK1/2/3/Tyk2のすべてを阻害し、IL-4/13/31等の炎症・痒みシグナル（STAT活性化）を遮断。<br>
          <strong>【適応・規格】</strong>0.5%（成人・小児）、0.25%（小児・生後6ヶ月以上）。生後6ヶ月から使える！<br>
          <strong>【特徴・使い分け】</strong>プロトピックのような「激しい熱感・ヒリヒリ感」が極めて少なく、ステロイドに匹敵する消炎力と鎮痒効果を発揮。プロトピックの刺激感に耐えられなかった患者や、顔面・首のプロアクティブ維持療法の第一選択。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">注意点：毛包炎（にきび）、単純ヘルペス等の皮膚感染症に注意</span>
        </div>
      </div>

      <!-- モイゼルト軟膏（ジファミラスト） -->
      <div class="dict-card" data-category="derm">
        <div class="dict-card-header">
          <span class="dict-tag">アトピー・PDE4阻害</span>
          <span class="dict-badge">新世代外用薬</span>
        </div>
        <h3 class="dict-card-title">モイゼルト軟膏（ジファミラスト / 外用PDE4阻害薬）</h3>
        <p class="dict-card-desc">
          <strong>【作用機序】</strong>ホスホジエステラーゼ4（PDE4）を選択的に阻害。細胞内cAMP濃度を上昇させ、炎症性サイトカイン産生を抑制し抗炎症性IL-10を増加。<br>
          <strong>【適応・規格】</strong>1%（成人・小児）、0.3%（2歳以上の小児）。<br>
          <strong>【最大の特徴】</strong>全外用薬の中で「最も刺激感が少ない」！荒れた敏感肌や小児でもピリピリ・熱感がほぼ出ない。さらに「1回あたりの塗布量上限がない」ため、体幹・四肢の広範囲にたっぷり塗布できる。プロアクティブ長期維持に最適。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">注意点：色素沈着、接触皮膚炎。急激な火消しにはステロイドを先行</span>
        </div>
      </div>

      <!-- プロトピック軟膏（タクロリムス） -->
      <div class="dict-card" data-category="derm">
        <div class="dict-card-header">
          <span class="dict-tag">アトピー・免疫抑制</span>
          <span class="dict-badge">元祖非ステロイド</span>
        </div>
        <h3 class="dict-card-title">プロトピック軟膏（タクロリムス水和物 / カルシニューリン阻害薬）</h3>
        <p class="dict-card-desc">
          <strong>【分類】</strong>カルシニューリン阻害外用薬。T細胞活性化を阻害しIL-2産生を特異的抑制。<br>
          <strong>【規格・適応】</strong>0.1%（成人：16歳以上）、0.03%小児用（2〜15歳）。※2歳未満禁忌！<br>
          <strong>【長所と短所】</strong>ストロング級の消炎力を持ちながら皮膚萎縮・毛細血管拡張を起こさないため顔面・首の維持に最適。しかし「塗布初期の強烈な灼熱感・ヒリヒリ感（熱感）」で自己中断する患者が多い。事前に「数日で慣れる」ことを予告指導し、耐えられない場合はコレクチムやモイゼルトへ切り替える。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">指導：塗布後の日光暴露・飲酒（顔面紅潮増強）を避ける</span>
        </div>
      </div>

      <!-- デルモベート -->
      <div class="dict-card" data-category="derm">
        <div class="dict-card-header">
          <span class="dict-tag">ステロイド・Ⅰ群</span>
          <span class="dict-badge">Strongest</span>
        </div>
        <h3 class="dict-card-title">デルモベート軟膏/クリーム（クロベタゾールプロピオン酸エステル 0.05%）</h3>
        <p class="dict-card-desc">
          <strong>【分類】</strong>外用ステロイド Ⅰ群（最強：Strongest）<br>
          <strong>【特徴】</strong>ステロイド外用薬の頂点。分厚い角質に覆われた「手掌・足底」の手湿疹・掌蹠膿疱症や、極めて頑固な苔癬化局面の切り札。<br>
          <strong>【鑑査の急所】</strong>顔面・頚部・陰部には絶対禁忌！小児も原則使用不可。長期連用により皮膚萎縮や副腎皮質機能抑制のリスクがあるため、2〜3週間の短期集中で皮疹を鎮火させ、改善後は下位ランクへ切り替える。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">同効薬：ダイアコート / ジフラール</span>
        </div>
      </div>

      <!-- アンテベート -->
      <div class="dict-card" data-category="derm">
        <div class="dict-card-header">
          <span class="dict-tag">ステロイド・Ⅱ群</span>
          <span class="dict-badge">Very Strong</span>
        </div>
        <h3 class="dict-card-title">アンテベート軟膏/クリーム/ローション（ベタメタゾン酪酸エステルプロピオン酸エステル 0.05%）</h3>
        <p class="dict-card-desc">
          <strong>【分類】</strong>外用ステロイド Ⅱ群（非常に強力：Very Strong）<br>
          <strong>【特徴】</strong>成人の体幹・四肢における急性増悪期・中等症〜重症皮疹の第一選択薬。力価が高く速やかな消火効果を発揮する。<br>
          <strong>【服薬指導】</strong>ケチって薄く伸ばすと火種が残るため、FTU（手のひら2枚に1FTU＝0.5g）を守ってたっぷり塗布。顔面・陰部には原則使用しない。頭皮病変にはローション剤を選択。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">同効薬：フルメタ / マイザー / トプシム / リンデロンDP</span>
        </div>
      </div>

      <!-- リンデロン-V / VG -->
      <div class="dict-card" data-category="derm">
        <div class="dict-card-header">
          <span class="dict-tag">ステロイド・Ⅲ群</span>
          <span class="dict-badge">Strong</span>
        </div>
        <h3 class="dict-card-title">リンデロン-V / リンデロン-VG（ベタメタゾン吉草酸エステル 0.12%）</h3>
        <p class="dict-card-desc">
          <strong>【分類】</strong>外用ステロイド Ⅲ群（強力：Strong）<br>
          <strong>【特徴】</strong>実臨床で最も頻繁に処方される標準ステロイド。成人の体幹（軽〜中等症）や小児の体幹（中等〜重症）に幅広く用いられる。<br>
          <strong>【VGの鑑査急所】</strong>VGはアミノグリコシド系抗菌薬ゲンタマイシン硫酸塩を配合。二次感染を伴う湿疹に奏効するが、感染が治まった後も漫然と連用するとMRSAや耐性菌を誘発する！感染消失後はV単剤へ速やかにステップダウンする。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">同効薬：ボアラ / ベトネベート / エクラー</span>
        </div>
      </div>

      <!-- ロコイド / キンダベート -->
      <div class="dict-card" data-category="derm">
        <div class="dict-card-header">
          <span class="dict-tag">ステロイド・Ⅳ群</span>
          <span class="dict-badge">Medium</span>
        </div>
        <h3 class="dict-card-title">ロコイド / キンダベート（ヒドロコルチゾン酪酸エステル / クロベタゾン酪酸エステル）</h3>
        <p class="dict-card-desc">
          <strong>【分類】</strong>外用ステロイド Ⅳ群（中程度：Medium）<br>
          <strong>【特徴】</strong>吸収率の高い成人の顔面（13倍）・頚部（6倍）・陰部（42倍）や、皮膚が薄い小児・乳幼児の安全な第一選択薬。<br>
          <strong>【指導の勘所】</strong>皮膚萎縮や毛細血管拡張を起こしにくい安全設計。ただし顔面に数週間以上連用すると酒さ様皮膚炎（赤ら顔）の原因となるため、寛解後はコレクチム（JAK阻害）やモイゼルト（PDE4阻害）、プロトピックへ移行する。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">同効薬：アルメタ / リドメックス（PVA）</span>
        </div>
      </div>

      <!-- リドメックス（アンテドラッグ） -->
      <div class="dict-card" data-category="derm">
        <div class="dict-card-header">
          <span class="dict-tag">アンテドラッグ</span>
          <span class="dict-badge">安全設計</span>
        </div>
        <h3 class="dict-card-title">リドメックスコーワ（プレドニゾロン吉草酸エステル酢酸エステル：PVA）</h3>
        <p class="dict-card-desc">
          <strong>【分類】</strong>外用ステロイド Ⅳ群（中程度：Medium） / アンテドラッグ（Antidrug）<br>
          <strong>【特徴】</strong>皮膚表面の患部では高い局所抗炎症作用を発揮し、毛細血管から血中に移行すると体内のエステラーゼにより速やかに加水分解されて低活性の代謝物に変換される。<br>
          <strong>【メリット】</strong>全身循環に入った後のステロイド作用（副腎抑制等）が極小化されているため、乳幼児や広範囲塗布を要する患者に安心して処方できる。
        </p>
        <div class="dict-card-footer">
          <span class="dict-badge-sub">同効アンテドラッグ：アンテベート（Ⅱ群）、マイザー（Ⅱ群）等もアンテドラッグ構造</span>
        </div>
      </div>
`;

// Insert into dict-grid
if (dictHtml.includes('id="dict-grid"')) {
  const lastGridIdx = dictHtml.lastIndexOf('</div>');
  const secondLastGridIdx = dictHtml.lastIndexOf('</div>', lastGridIdx - 1);
  dictHtml = dictHtml.substring(0, secondLastGridIdx) + dictCardsHtml + '\n    ' + dictHtml.substring(secondLastGridIdx);
} else {
  const lastCardIdx = dictHtml.lastIndexOf('</div>\n      </div>');
  dictHtml = dictHtml.substring(0, lastCardIdx + 6) + dictCardsHtml + dictHtml.substring(lastCardIdx + 6);
}

fs.writeFileSync(dictPath, dictHtml, 'utf8');
console.log("Successfully updated 14_dictionary.html with steroid & atopic cards!");


// ============================================================================
// 4. Update src/09_app.js (DRUG_DB entries)
// ============================================================================
const appPath = path.join(__dirname, '..', '09_app.js');
let appJs = fs.readFileSync(appPath, 'utf8');

const newDrugsEntries = `  { name: "リンデロン-V / リンデロン-VG", gen: "ベタメタゾン吉草酸エステル / ゲンタマイシン硫酸塩配合", cat: "16. 皮膚科（ストロング）", char: "実臨床で処方頻度No.1の標準ステロイド（Ⅲ群）！VGの漫然連用は耐性菌に注意", desc: "成人の体幹（軽〜中等症）や小児の体幹（中等〜重症）の主力。VGは二次感染を伴う湿疹に有効だが、感染治癒後はMRSA等の耐性菌予防のため速やかにV単剤へ切り替える。", gId: "c16", cSec: "sec-imm" },
  { name: "リドメックスコーワ", gen: "プレドニゾロン吉草酸エステル酢酸エステル（PVA）", cat: "16. 皮膚科（ミディアム・アンテドラッグ）", char: "局所で強く効いて血中で速やかに低活性化する安全設計のアンテドラッグ（Ⅳ群）", desc: "患部の皮膚表面では中等度の強い抗炎症作用を発揮し、吸収されて血管に入るとエステラーゼで速やかに分解。全身副作用が極めて少なく乳幼児や広範囲塗布に最適。", gId: "c16", cSec: "sec-imm" },
  { name: "ダイアコート / ジフラール", gen: "ジフロラゾン酢酸エステル", cat: "16. 皮膚科（ストロンゲスト）", char: "ステロイド外用薬の頂点（Ⅰ群）！手掌・足底の重症角化性皮膚疾患に", desc: "デルモベートと並ぶ最強群。角質の極めて厚い手のひら・足の裏、苔癬化病変に短期集中で使用。顔面・陰部・小児には原則使用しない。", gId: "c16", cSec: "sec-imm" },
  { name: "プレドニゾロン軟膏 / オイラックスH", gen: "プレドニゾロン / ヒドロコルチゾン＋クロタミトン", cat: "16. 皮膚科（ウィーク）", char: "最も作用がマイルドで安全重視のステロイド（Ⅴ群）！乳幼児デリケート部位に", desc: "作用が最も弱く安全性が高い。成人の苔癬化には力不足だが、乳幼児の顔面・陰部・おむつかぶれ軽症や眼瞼周囲の軽度炎症に限定して用いる。", gId: "c16", cSec: "sec-imm" },
`;

const dermDbMarker = '// 19. 皮膚科・アレルギー外用薬（Core 16）';
const pDermDb = appJs.indexOf(dermDbMarker);

if (pDermDb !== -1) {
  const insertPos = pDermDb + dermDbMarker.length;
  appJs = appJs.substring(0, insertPos) + '\n' + newDrugsEntries + appJs.substring(insertPos);
  fs.writeFileSync(appPath, appJs, 'utf8');
  console.log("Successfully updated 09_app.js with steroid drugs!");
}

console.log("=== Steroid & New Atopic Dermatitis Drugs integration complete! ===");
