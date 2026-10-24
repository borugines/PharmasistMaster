const fs = require('fs');

let guideHtml = fs.readFileSync('src/03_guide.html', 'utf8');

// ナビバーにタブボタンを追加
guideHtml = guideHtml.replace(
  `<button class="abx-tab-btn" onclick="switchAbxView('abx-switch', this)">🔄 ④ 経口スイッチ＆アレルギー対応</button>
        </div>`,
  `<button class="abx-tab-btn" onclick="switchAbxView('abx-switch', this)">🔄 ④ 経口スイッチ＆アレルギー対応</button>
          <button class="abx-tab-btn" onclick="switchAbxView('abx-viral', this)">🦠 ⑤ インフル・コロナ治療薬</button>
        </div>`
);

const viralHtml = `
        <!-- ⑤ インフルエンザ ＆ 新型コロナ（COVID-19）治療薬ビュー -->
        <div id="abx-viral" class="abx-view-pane">
          <div style="font-size:0.88rem; font-weight:700; color:#1e3a8a; margin-bottom:6px;">
            🦠 インフルエンザ ＆ 新型コロナ（COVID-19）抗ウイルス薬 臨床選択チャート
          </div>
          <p style="font-size:0.82rem; color:#475569; margin-bottom:12px;">
            「発症からの時間制限」「アドヒアランス（単回 vs 連日）」「併用禁忌の多寡」「腎機能・妊婦の可否」で明確に使い分ける！
          </p>

          <!-- インフルエンザ抗ウイルス薬セクション -->
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px 14px; margin-bottom:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #e2e8f0; padding-bottom:6px; margin-bottom:10px;">
              <strong style="color:#0369a1; font-size:0.92rem;">❄️ インフルエンザ治療薬（発症48時間以内の投与開始が鉄則）</strong>
              <span style="font-size:0.75rem; color:#64748b; background:#e0f2fe; padding:2px 8px; border-radius:10px;">NA阻害薬 vs エンドヌクレアーゼ阻害薬</span>
            </div>
            
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:10px;">
              
              <div style="background:white; border:1px solid #cbd5e1; border-top:3px solid #0284c7; border-radius:6px; padding:10px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <strong style="color:#0f172a; font-size:0.9rem;">タミフル（オセルタミビル）</strong>
                  <span style="font-size:0.7rem; background:#dbeafe; color:#1e40af; padding:1px 6px; border-radius:4px; font-weight:700;">世界標準・妊婦可</span>
                </div>
                <div style="font-size:0.8rem; color:#475569; margin:4px 0;">用法：75mg 1日2回 5日間経口投与</div>
                <div style="font-size:0.78rem; color:#334155; line-height:1.4;">
                  <strong>長所：</strong>最多の安全性エビデンス。<strong>妊婦・授乳婦にも第一選択</strong>。<br>
                  <strong>短所：</strong>5日間の連日服薬が必要。<br>
                  ⚠️ 腎機能（Ccr 30〜60は75mg分1、10〜30は75mg 2日に1回）減量必須！
                </div>
              </div>

              <div style="background:white; border:1px solid #cbd5e1; border-top:3px solid #10b981; border-radius:6px; padding:10px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <strong style="color:#0f172a; font-size:0.9rem;">ゾフルーザ（バロキサビル）</strong>
                  <span style="font-size:0.7rem; background:#dcfce7; color:#166534; padding:1px 6px; border-radius:4px; font-weight:700;">1回内服完結！</span>
                </div>
                <div style="font-size:0.8rem; color:#475569; margin:4px 0;">用法：体重別（40〜79kgは40mg）<strong>1回単回投与</strong></div>
                <div style="font-size:0.78rem; color:#334155; line-height:1.4;">
                  <strong>長所：</strong>1回内服で治療終了（アドヒアランス最高）。ウイルス排出停止が約24時間と最速！<br>
                  ⚠️ <strong>多価金属（Mg/Ca/Fe/牛乳/制酸剤）とキレート形成</strong>するため同時服用厳禁！12歳未満・免疫不全での耐性変異（I38T）に注意。
                </div>
              </div>

              <div style="background:white; border:1px solid #cbd5e1; border-top:3px solid #8b5cf6; border-radius:6px; padding:10px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <strong style="color:#0f172a; font-size:0.9rem;">イナビル（ラニナミビル）</strong>
                  <span style="font-size:0.7rem; background:#f3e8ff; color:#6b21a8; padding:1px 6px; border-radius:4px; font-weight:700;">その場で1回吸入</span>
                </div>
                <div style="font-size:0.8rem; color:#475569; margin:4px 0;">用法：薬局/院内で<strong>2容器（計40mg）単回吸入</strong></div>
                <div style="font-size:0.78rem; color:#334155; line-height:1.4;">
                  <strong>長所：</strong>気道局所に長時間滞留。薬局で吸わせ切ればコンプライアンス100%！腎機能減量不要。<br>
                  ⚠️ 吸気力のない乳幼児・超高齢者・重症呼吸不全には不向き（タミフルやラピアクタへ）。
                </div>
              </div>

              <div style="background:white; border:1px solid #cbd5e1; border-top:3px solid #f59e0b; border-radius:6px; padding:10px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <strong style="color:#0f172a; font-size:0.9rem;">ラピアクタ（ペラミビル点滴）</strong>
                  <span style="font-size:0.7rem; background:#fef3c7; color:#92400e; padding:1px 6px; border-radius:4px; font-weight:700;">経口不能・重症時</span>
                </div>
                <div style="font-size:0.8rem; color:#475569; margin:4px 0;">用法：300mg（重症600mg）15分点滴静注</div>
                <div style="font-size:0.78rem; color:#334155; line-height:1.4;">
                  <strong>長所：</strong>激しい嘔吐・意識障害・嚥下困難患者の唯一の静注選択肢。<br>
                  ⚠️ 腎排泄型のためCcrに応じた投与量調整（Ccr 30〜49は100mgへ減量）。
                </div>
              </div>

            </div>
          </div>

          <!-- 新型コロナウイルス（COVID-19）経口薬セクション -->
          <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:12px 14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #e2e8f0; padding-bottom:6px; margin-bottom:10px;">
              <strong style="color:#991b1b; font-size:0.92rem;">🛡️ 新型コロナウイルス（COVID-19）経口抗ウイルス薬 ガチンコ比較</strong>
              <span style="font-size:0.75rem; color:#64748b; background:#fee2e2; padding:2px 8px; border-radius:10px;">発症5日以内（ゾコーバは3日以内）</span>
            </div>

            <table class="switch-table" style="margin-top:0;">
              <thead>
                <tr>
                  <th style="width:20%;">薬剤名（分類）</th>
                  <th style="width:25%;">適応・投与タイミング</th>
                  <th style="width:25%;">最大の武器（メリット）</th>
                  <th style="width:30%;">絶対警戒ピットフォール（禁忌・併用薬）</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>パキロビッドパック</strong><br>（ニルマトレルビル/リトナビル）</td>
                  <td>発症<strong>5日以内</strong><br>重症化リスク因子あり</td>
                  <td><span class="char" style="background:#dbeafe; color:#1e40af; padding:2px 6px; border-radius:4px; font-size:0.75rem; font-weight:700;">重症化予防効果 約88%（最強）</span> 入院・死亡リスクを圧倒的に下げる世界的ゴールドスタンダード。</td>
                  <td>⚠️ <strong>併用禁忌薬が膨大（約40種類以上）！</strong> リトナビルの強烈なCYP3A不可逆阻害によりスタチン、Ca拮抗薬、睡眠薬、抗血栓薬、不整脈薬等の併用チェックに命を賭けろ！eGFR<30は禁忌。</td>
                </tr>
                <tr>
                  <td><strong>ゾコーバ</strong><br>（エンシトレルビル）</td>
                  <td>発症<strong>3日（72時間）以内</strong><br>重症化リスクの有無不問</td>
                  <td><span class="char" style="background:#dcfce7; color:#166534; padding:2px 6px; border-radius:4px; font-size:0.75rem; font-weight:700;">症状短縮・リスクなしでも可</span> 咳・喉の痛み・鼻水・倦怠感・発熱の5症状回復を1日短縮。若年〜中年軽症でも使用可能。</td>
                  <td>⚠️ <strong>妊婦・妊娠の可能性がある女性には絶対禁忌（催奇形性）！</strong> CYP3A阻害による併用禁忌薬あり（パキロビッドほどではないがイグザレルト、シンバスタチン等禁忌）。</td>
                </tr>
                <tr>
                  <td><strong>ラゲブリオ</strong><br>（モルヌピラビル）</td>
                  <td>発症<strong>5日以内</strong><br>重症化リスク因子あり</td>
                  <td><span class="char" style="background:#fef3c7; color:#92400e; padding:2px 6px; border-radius:4px; font-size:0.75rem; font-weight:700;">併用禁忌ゼロ ＆ 腎調整不要</span> ポリファーマシーの高齢者や、高度腎機能低下（透析患者含む）でも安心して使える抜群の使い勝手！</td>
                  <td>⚠️ <strong>妊婦・授乳婦禁忌（催奇形性・変異原性）</strong>。骨・軟骨成長異常リスクのため18歳未満禁忌。重症化予防効果はパキロビッド（88%）に比べ約30%とやや控えめ。</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
`;

// abx-switch の閉じタグの直後に viralHtml を追加
guideHtml = guideHtml.replace(
  `<!-- ④ 経口スイッチ＆アレルギー対応ビュー -->
        <div id="abx-switch" class="abx-view-pane">`,
  `<!-- ④ 経口スイッチ＆アレルギー対応ビュー -->
        <div id="abx-switch" class="abx-view-pane">`
);

// abx-switch のペインの直後（</div>\n\n      </div> の手前）に viralHtml を挿入
const switchPaneIdx = guideHtml.indexOf('id="abx-switch"');
if (switchPaneIdx === -1) {
  console.error('abx-switch not found');
  process.exit(1);
}

const endOfSwitchIdx = guideHtml.indexOf('</div>\n\n      </div>', switchPaneIdx);
if (endOfSwitchIdx === -1) {
  const altEnd = guideHtml.indexOf('</div>\r\n\r\n      </div>', switchPaneIdx);
  if (altEnd === -1) {
    console.error('end of abx-master-container not found');
    process.exit(1);
  }
  guideHtml = guideHtml.substring(0, altEnd) + '</div>\r\n' + viralHtml + guideHtml.substring(altEnd);
} else {
  guideHtml = guideHtml.substring(0, endOfSwitchIdx) + '</div>\n' + viralHtml + guideHtml.substring(endOfSwitchIdx);
}

fs.writeFileSync('src/03_guide.html', guideHtml, 'utf8');
console.log('Successfully added Influenza & COVID-19 antiviral hub to c8 in src/03_guide.html');
