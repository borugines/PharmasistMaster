const fs = require('fs');

const abxMasterHtml = `
      <!-- 💊 抗菌薬の臨床選択マスターナビゲーター -->
      <div class="abx-master-container">
        <div style="border-bottom:2px solid #1e3a8a; padding-bottom:10px; margin-bottom:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <div>
            <span class="algo-tag" style="background:#047857;">Clinical Antimicrobial Stewardship</span>
            <h3 style="font-size:1.18rem; color:#0f172a; font-weight:800; margin-top:4px;">🛡️ 抗菌薬選択 臨床マスターナビゲーター</h3>
            <p style="font-size:0.83rem; color:#475569; margin:2px 0 0 0;">
              「どの臓器か？」「原因菌は何か？」「PK/PDに基づきどう飲ませるか？」「経口スイッチの罠」を完全体系化。
            </p>
          </div>
          <span class="algo-goal-badge" style="background:#ecfdf5; border-color:#a7f3d0; color:#065f46;">AMR対策 ＆ 標的適正使用</span>
        </div>

        <!-- 4大タブ切り替えナビバー -->
        <div class="abx-nav-bar">
          <button class="abx-tab-btn active" onclick="switchAbxView('abx-organ', this)">🏛️ ① 臓器・感染巣別 第一選択</button>
          <button class="abx-tab-btn" onclick="switchAbxView('abx-spectrum', this)">🧬 ② 菌種×抗菌薬 スペクトラム表</button>
          <button class="abx-tab-btn" onclick="switchAbxView('abx-pkpd', this)">⏱️ ③ PK/PD理論と投与設計の鉄則</button>
          <button class="abx-tab-btn" onclick="switchAbxView('abx-switch', this)">🔄 ④ 経口スイッチ＆アレルギー対応</button>
        </div>

        <!-- ① 臓器・感染巣別 第一選択ビュー -->
        <div id="abx-organ" class="abx-view-pane active">
          <div style="font-size:0.88rem; font-weight:700; color:#1e3a8a; margin-bottom:10px;">
            🏛️ 主要感染巣ごとの原因微生物と第一選択薬・推奨レジメン
          </div>
          <div class="decision-tree-grid">
            
            <div class="decision-branch">
              <div class="branch-condition-header">
                <span class="branch-icon">🫁</span>
                <span class="branch-cond-label">［呼吸器感染症］</span>
                <span class="branch-target">市中肺炎（CAP：外来軽症〜中等症）</span>
              </div>
              <div class="branch-flow-steps">
                <div class="step-card first-choice">
                  <div class="step-pill first">第一選択（ペニシリン系高用量）</div>
                  <div class="step-drug">アモキシシリン（サワシリン 1500〜2000mg/日 分3〜4）</div>
                  <div class="step-rationale">原因菌の首位「肺炎球菌」を十分な血中濃度でねじ伏せる。経口第3世代セフェムより圧倒的に確実！</div>
                  <div class="step-chips"><span class="flow-chip" onclick="quickSearch('サワシリン')">サワシリン</span></div>
                </div>
                <div class="step-arrow">➔</div>
                <div class="step-card second-choice">
                  <div class="step-pill second">非定型（マイコプラズマ/クラミジア）疑い</div>
                  <div class="step-drug">＋ アジスロマイシン または レスピラトリーキノロン</div>
                  <div class="step-rationale">細胞壁を持たない菌にはマクロライド（ジスロマック）またはキノロン（ラスビック/ジェニナック）。</div>
                  <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ジスロマック')">ジスロマック</span><span class="flow-chip" onclick="quickSearch('ラスビック')">ラスビック</span></div>
                </div>
              </div>
            </div>

            <div class="decision-branch">
              <div class="branch-condition-header">
                <span class="branch-icon">👴</span>
                <span class="branch-cond-label">［呼吸器感染症］</span>
                <span class="branch-target">誤嚥性肺炎（高齢者・嫌気性菌リスク）</span>
              </div>
              <div class="branch-flow-steps">
                <div class="step-card first-choice">
                  <div class="step-pill first">第一選択（嫌気性菌カバー配合薬）</div>
                  <div class="step-drug">アンピシリン/スルバクタム（ユナシン-S 点滴） / オーグメンチン配合（内服）</div>
                  <div class="step-rationale">口腔内常在菌（嫌気性菌・レンサ球菌）を漏れなく制圧。βラクタマーゼ阻害剤配合が必須。</div>
                  <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ユナシン')">ユナシン-S</span><span class="flow-chip" onclick="quickSearch('オーグメンチン')">オーグメンチン</span></div>
                </div>
                <div class="step-arrow">➔</div>
                <div class="step-card second-choice">
                  <div class="step-pill second">重症・緑膿菌ハイリスク院内発症</div>
                  <div class="step-drug">ピペラシリン/タゾバクタム（ゾシン） または メロペネム</div>
                  <div class="step-rationale">構造的肺疾患や頻回抗菌薬歴がある場合の広域Empirical。改善後はスパッと狭域へ。</div>
                  <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ゾシン')">ゾシン</span><span class="flow-chip" onclick="quickSearch('メロペン')">メロペン</span></div>
                </div>
              </div>
            </div>

            <div class="decision-branch">
              <div class="branch-condition-header">
                <span class="branch-icon">🚽</span>
                <span class="branch-cond-label">［尿路感染症］</span>
                <span class="branch-target">急性単純性膀胱炎（外来女性） vs 急性腎盂腎炎（発熱・側腹部痛）</span>
              </div>
              <div class="branch-flow-steps">
                <div class="step-card first-choice">
                  <div class="step-pill first">急性膀胱炎（尿中移行良好薬）</div>
                  <div class="step-drug">セフカペンピボキシル / セファレキシン / ST合剤 / ホスホマイシン</div>
                  <div class="step-rationale">尿中で原因菌（大腸菌）のMICを大幅に上回る。3〜5日間の短期間投与で十分治癒。</div>
                  <div class="step-chips"><span class="flow-chip" onclick="quickSearch('フロモックス')">フロモックス</span><span class="flow-chip" onclick="quickSearch('バクタ')">バクタ</span><span class="flow-chip" onclick="quickSearch('ホスミシン')">ホスミシン</span></div>
                </div>
                <div class="step-arrow">➔</div>
                <div class="step-card second-choice">
                  <div class="step-pill second">急性腎盂腎炎（組織移行必須）</div>
                  <div class="step-drug">セフトリアキソン（ロセフィン 1〜2g 点滴） / レボフロキサシン（500mg）</div>
                  <div class="step-rationale">腎実質へ高濃度移行が必要。CTRX点滴または組織移行率100%のキノロンが第一選択。</div>
                  <div class="step-chips"><span class="flow-chip" onclick="quickSearch('ロセフィン')">ロセフィン</span><span class="flow-chip" onclick="quickSearch('クラビット')">クラビット</span></div>
                </div>
              </div>
            </div>

            <div class="decision-branch">
              <div class="branch-condition-header">
                <span class="branch-icon">🩹</span>
                <span class="branch-cond-label">［皮膚軟部組織感染症］</span>
                <span class="branch-target">蜂窩織炎・丹毒（黄色ブドウ球菌・化膿レンサ球菌）</span>
              </div>
              <div class="branch-flow-steps">
                <div class="step-card first-choice">
                  <div class="step-pill first">第一選択（第1世代セフェム！）</div>
                  <div class="step-drug">セファゾリン（CEZ 点滴） / セファレキシン（ケフレックス 内服）</div>
                  <div class="step-rationale">【超重要】第3世代セフェムは選ばない！MSSAとレンサ球菌への殺菌力・血中移行率は第1世代が最強。</div>
                  <div class="step-chips"><span class="flow-chip" onclick="quickSearch('セファゾリン')">セファゾリン</span><span class="flow-chip" onclick="quickSearch('ケフレックス')">ケフレックス</span></div>
                </div>
                <div class="step-arrow">➔</div>
                <div class="step-card second-choice">
                  <div class="step-pill second">MRSA疑い（化膿性・膿瘍・耐性菌歴）</div>
                  <div class="step-drug">バンコマイシン（点滴） / ダプトマイシン / ST合剤（内服）</div>
                  <div class="step-rationale">切開排膿が基本。MRSAカバーが必要な場合は抗MRSA薬へシフト。</div>
                  <div class="step-chips"><span class="flow-chip" onclick="quickSearch('バンコマイシン')">バンコマイシン</span><span class="flow-chip" onclick="quickSearch('キュビシン')">キュビシン</span></div>
                </div>
              </div>
            </div>

            <div class="decision-branch">
              <div class="branch-condition-header">
                <span class="branch-icon">🩸</span>
                <span class="branch-cond-label">［腹腔内・消化器］</span>
                <span class="branch-target">急性胆道感染症（胆管炎・胆嚢炎） vs 偽膜性腸炎（CDI）</span>
              </div>
              <div class="branch-flow-steps">
                <div class="step-card first-choice">
                  <div class="step-pill first">急性胆管炎・胆嚢炎（腸内細菌＋嫌気性）</div>
                  <div class="step-drug">セフメタゾール（CMZ：第2世代セファマイシン） / スルバシリン</div>
                  <div class="step-rationale">胆汁移行性が極めて良好で、GNR＋嫌気性菌（B. fragilis）を単剤でカバー。</div>
                  <div class="step-chips"><span class="flow-chip" onclick="quickSearch('セフメタゾン')">セフメタゾン</span></div>
                </div>
                <div class="step-arrow">➔</div>
                <div class="step-card third-choice">
                  <div class="step-pill third">偽膜性腸炎（C. difficile関連下痢症）</div>
                  <div class="step-drug">バンコマイシン散（経口投与 125mg q6h） / フィダキソマイシン</div>
                  <div class="step-rationale">VCMは腸管から吸収されないため「経口投与」で腸管内局所のC. difficileを直接殺菌！</div>
                  <div class="step-chips"><span class="flow-chip" onclick="quickSearch('バンコマイシン')">経口バンコマイシン</span><span class="flow-chip" onclick="quickSearch('ダフクリア')">ダフクリア</span></div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- ② 菌種×抗菌薬 スペクトラム表ビュー -->
        <div id="abx-spectrum" class="abx-view-pane">
          <div style="font-size:0.88rem; font-weight:700; color:#1e3a8a; margin-bottom:6px;">
            🧬 主要抗菌薬の微生物スペクトラム直感マトリクス表
          </div>
          <p style="font-size:0.8rem; color:#64748b; margin-bottom:8px;">
            ◎：第一選択・強力 ／ ◯：有効 ／ △：一部耐性・条件付き ／ ×：自然耐性・効かない（穴）
          </p>
          <div class="abx-table-wrapper">
            <table class="abx-spec-table">
              <thead>
                <tr>
                  <th rowspan="2" style="width:22%;">系統・代表薬剤名</th>
                  <th colspan="4">グラム陽性球菌（GPC）</th>
                  <th colspan="2">グラム陰性桿菌（GNR）</th>
                  <th rowspan="2" style="width:9%;">嫌気性菌<br>(Bacteroides)</th>
                  <th rowspan="2" style="width:9%;">非定型<br>(Myco/Legio)</th>
                </tr>
                <tr>
                  <th class="sub-th">溶連菌</th>
                  <th class="sub-th">肺炎球菌</th>
                  <th class="sub-th">MSSA</th>
                  <th class="sub-th">MRSA</th>
                  <th class="sub-th">大腸菌等</th>
                  <th class="sub-th">緑膿菌</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="drug-name-cell"><strong>ペニシリンG（PCG）</strong></td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-good">◯</td>
                  <td class="spec-score-none">×</td>
                </tr>
                <tr>
                  <td class="drug-name-cell"><strong>サワシリン（アモキシシリン）</strong></td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-mod">△</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-mod">△</td>
                  <td class="spec-score-none">×</td>
                </tr>
                <tr>
                  <td class="drug-name-cell"><strong>オーグメンチン / ユナシン（β阻害配合）</strong></td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-good">◯</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-none">×</td>
                </tr>
                <tr>
                  <td class="drug-name-cell"><strong>セファゾリン（CEZ：第1世代セフェム）</strong></td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-good">◯</td>
                  <td class="spec-score-best">◎ (最強)</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-good">◯</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-none">×</td>
                </tr>
                <tr>
                  <td class="drug-name-cell"><strong>セフメタゾール（CMZ：第2世代セファマイシン）</strong></td>
                  <td class="spec-score-good">◯</td>
                  <td class="spec-score-mod">△</td>
                  <td class="spec-score-good">◯</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-best">◎ (ESBLも)</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-none">×</td>
                </tr>
                <tr>
                  <td class="drug-name-cell"><strong>セフトリアキソン（CTRX：第3世代セフェム）</strong></td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-mod">△</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-none">×</td>
                </tr>
                <tr>
                  <td class="drug-name-cell"><strong>セフェピム（CFPM：第4世代セフェム）</strong></td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-good">◯</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-none">×</td>
                </tr>
                <tr>
                  <td class="drug-name-cell"><strong>ピペラシリン/タゾバクタム（ゾシン）</strong></td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-none">×</td>
                </tr>
                <tr>
                  <td class="drug-name-cell"><strong>メロペネム（MEPM：カルバペネム系）</strong></td>
                  <td class="spec-score-good">◯</td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-best">◎ (最強)</td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-none">×</td>
                </tr>
                <tr>
                  <td class="drug-name-cell"><strong>レボフロキサシン（LVFX：キノロン系）</strong></td>
                  <td class="spec-score-mod">△</td>
                  <td class="spec-score-good">◯</td>
                  <td class="spec-score-mod">△</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-good">◯</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-best">◎</td>
                </tr>
                <tr>
                  <td class="drug-name-cell"><strong>アジスロマイシン（AZM：マクロライド系）</strong></td>
                  <td class="spec-score-good">◯</td>
                  <td class="spec-score-none">× (耐性多)</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-best">◎ (第一選択)</td>
                </tr>
                <tr>
                  <td class="drug-name-cell"><strong>バンコマイシン（VCM：抗MRSA薬）</strong></td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-best">◎</td>
                  <td class="spec-score-best">◎ (本命)</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-none">×</td>
                </tr>
                <tr>
                  <td class="drug-name-cell"><strong>メトロニダゾール（フラジール）</strong></td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-none">×</td>
                  <td class="spec-score-best">◎ (最強・専任)</td>
                  <td class="spec-score-none">×</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style="font-size:0.8rem; color:#64748b; margin-top:8px; line-height:1.5;">
            💡 <strong>覚えるべき「決定的な穴」：</strong><br>
            ・<strong>全セフェム系は「腸球菌（Enterococcus）」と「リステリア」に全滅（自然耐性）！</strong><br>
            ・<strong>セフトリアキソン（第3世代）は「緑膿菌」と「嫌気性菌」に全く効かない！</strong><br>
            ・<strong>カルバペネム系（メロペン）をもってしても「MRSA」と「非定型病原体」は倒せない！</strong>
          </div>
        </div>

        <!-- ③ PK/PD理論と投与設計の鉄則ビュー -->
        <div id="abx-pkpd" class="abx-view-pane">
          <div style="font-size:0.88rem; font-weight:700; color:#1e3a8a; margin-bottom:6px;">
            ⏱️ 抗菌薬の3大PK/PDパラメータと「正しい飲み方・点滴設計」
          </div>
          <p style="font-size:0.82rem; color:#475569; margin-bottom:12px;">
            抗菌薬は「菌種」だけでなく「抗菌薬の殺菌メカニズム（PK/PD特性）」に合致した用法で投与しないと効果が出ず耐性化します。
          </p>
          <div class="pkpd-grid">
            
            <div class="pkpd-card time-dep">
              <div class="pkpd-header">
                <strong style="color:#1e40af; font-size:0.95rem;">① Time above MIC（時間依存性）</strong>
                <span class="pkpd-badge time">%T &gt; MIC</span>
              </div>
              <div style="font-size:0.82rem; color:#334155; line-height:1.45;">
                <strong>対象薬剤：</strong>ペニシリン系、セフェム系、カルバペネム系、アズトレオナム
              </div>
              <div class="pkpd-rule">
                🎯 鉄則：血中濃度がMICを超えている「時間の長さ」が命！<br>
                ➔ 1回量を増やすより「投与回数を増やす（分3〜4）」のが正解！
              </div>
              <ul style="padding-left:18px; font-size:0.8rem; color:#475569; line-height:1.5;">
                <li>サワシリンは1日1回では無効！「1日3〜4回に均等分割」が必須。</li>
                <li>重症緑膿菌感染でのメロペネムやセフェピムは、30分点滴ではなく<strong>「3〜4時間延長点滴」</strong>により生存率が劇的向上！</li>
              </ul>
            </div>

            <div class="pkpd-card conc-dep">
              <div class="pkpd-header">
                <strong style="color:#991b1b; font-size:0.95rem;">② Cmax / MIC（濃度依存性）</strong>
                <span class="pkpd-badge conc">Peak / MIC</span>
              </div>
              <div style="font-size:0.82rem; color:#334155; line-height:1.45;">
                <strong>対象薬剤：</strong>ニューキノロン系、アミノグリコシド系（ゲンタマイシン等）
              </div>
              <div class="pkpd-rule">
                🎯 鉄則：血中最高濃度（ピーク値）の「高さ」が命！<br>
                ➔ 小分けにせず「1日1回ドカンと一括高用量投与」が正解！
              </div>
              <ul style="padding-left:18px; font-size:0.8rem; color:#475569; line-height:1.5;">
                <li>クラビットを「100mg 1日3回」で処方するのは最悪（耐性菌量産）！必ず<strong>「500mg 1日1回」</strong>で一撃殺菌。</li>
                <li>ゲンタマイシンも分3投与より「1日1回大量投与」の方が腎毒性が少なく殺菌力が強い。</li>
              </ul>
            </div>

            <div class="pkpd-card auc-dep">
              <div class="pkpd-header">
                <strong style="color:#166534; font-size:0.95rem;">③ AUC / MIC（総量依存性）</strong>
                <span class="pkpd-badge auc">AUC24 / MIC</span>
              </div>
              <div style="font-size:0.82rem; color:#334155; line-height:1.45;">
                <strong>対象薬剤：</strong>バンコマイシン、テイコプラニン、マクロライド系、テトラサイクリン系
              </div>
              <div class="pkpd-rule">
                🎯 鉄則：24時間の「総薬物曝露量（曲線下面積）」が命！<br>
                ➔ TDM（血中濃度モニタリング）で目標AUCを厳格管理！
              </div>
              <ul style="padding-left:18px; font-size:0.8rem; color:#475569; line-height:1.5;">
                <li>バンコマイシン目標AUC24/MIC: 400〜600（トラフ値 10〜15 μg/mL、重症 15〜20 μg/mL）。</li>
                <li>20μg/mLを超えると急性腎障害（AKI）が激増するためトラフ採血で投与量設計。</li>
              </ul>
            </div>

          </div>
        </div>

        <!-- ④ 経口スイッチ＆アレルギー対応ビュー -->
        <div id="abx-switch" class="abx-view-pane">
          <div style="font-size:0.88rem; font-weight:700; color:#1e3a8a; margin-bottom:6px;">
            🔄 経口スイッチ（IV to PO）の黄金律 ＆ ペニシリンアレルギー対応
          </div>
          
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:12px; margin-bottom:14px; font-size:0.84rem; line-height:1.5; color:#78350f;">
            ⚠️ <strong>現場で最も多い誤謬：</strong>「点滴のセフトリアキソン（CTRX）で治ったから、退院処方は同じ第3世代セフェムのフロモックスやメイアクトにしよう」<br>
            ➔ <strong>絶対NG！</strong>経口第3世代セフェムは吸収率が20%前後しかなく、点滴の数分の一の濃度しか出ないため感染再燃・耐性菌発生の元凶になります！
          </div>

          <div style="font-weight:700; font-size:0.85rem; color:#0f172a; margin-bottom:4px;">📊 経口抗菌薬のバイオアベイラビリティ（吸収率）一覧</div>
          <table class="switch-table">
            <thead>
              <tr>
                <th style="width:25%;">抗菌薬グループ</th>
                <th style="width:22%;">代表薬剤</th>
                <th style="width:18%;">バイオアベイラビリティ</th>
                <th style="width:35%;">経口スイッチ時の臨床判断</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>超優秀グループ<br>（点滴とほぼ等価）</strong></td>
                <td>・レボフロキサシン<br>・バクタ（ST合剤）<br>・フラジール（MNZ）<br>・ミノサイクリン</td>
                <td><span class="ba-high">90〜100%（超高吸収）</span></td>
                <td><strong>点滴と同じ用量で内服スイッチ可能！</strong>「食べられるようになったら即座に内服へ切り替え」て早期退院・カテーテル感染防止。</td>
              </tr>
              <tr>
                <td><strong>優秀グループ<br>（高用量で血中確保）</strong></td>
                <td>・アモキシシリン（高用量）<br>・ケフレックス（第1世代）<br>・オーグメンチン配合</td>
                <td><span class="ba-high">80〜90%（高吸収）</span></td>
                <td>アモキシシリンは1回500mg〜（1日1500〜2000mg）で十分な血中濃度を達成。蜂窩織炎のスイッチには第1世代のケフレックス。</td>
              </tr>
              <tr>
                <td><strong>危険グループ<br>（吸収率が極めて低い）</strong></td>
                <td>・フロモックス<br>・メイアクト<br>・セフゾン / トミロン</td>
                <td><span class="ba-low">15〜30%（極低吸収）</span></td>
                <td><strong>点滴からのスイッチには不適格！</strong>吸収されない成分が腸内細菌叢を破壊して下痢・C. difficile腸炎を誘発。小児では低カルニチン血症リスク。</td>
              </tr>
            </tbody>
          </table>

          <div style="margin-top:16px; border-top:1px dashed #cbd5e1; padding-top:12px;">
            <div style="font-weight:700; font-size:0.85rem; color:#0f172a; margin-bottom:6px;">
              🛡️ 「ペニシリンアレルギーがあります」と言われたときの臨床判断樹
            </div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:12px;">
              <div style="background:#fef2f2; border:1px solid #fecaca; border-left:4px solid #ef4444; border-radius:6px; padding:10px 12px; font-size:0.82rem; line-height:1.45;">
                <strong style="color:#991b1b;">🚨 即時型アレルギー（アナフィラキシー、喘鳴、全身性蕁麻疹、喉頭浮腫）：</strong><br>
                ・全てのペニシリン系・第1/第2世代セフェムを原則回避！<br>
                ・<strong>代替薬：</strong>ニューキノロン系、ST合剤、マクロライド系、バンコマイシン、アズトレオナム（モノバクタムは交差反応なし）。
              </div>
              <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-left:4px solid #16a34a; border-radius:6px; padding:10px 12px; font-size:0.82rem; line-height:1.45;">
                <strong style="color:#166534;">✅ 非即時型（軽微な皮疹・下痢・家族歴・幼少期のあやふやな記憶）：</strong><br>
                ・側鎖構造の異なる<strong>第3世代・第4世代セフェム（セフトリアキソン等）やカルバペネムとの交差反応率は「1%未満」！</strong><br>
                ・過度な抗菌薬制限を避け、必要に応じて第3世代セフェムを慎重投与可能。
              </div>
            </div>
          </div>

          <div style="margin-top:14px; background:#eff6ff; border:1px solid #bfdbfe; border-left:4px solid #2563eb; border-radius:6px; padding:10px 12px; font-size:0.83rem; line-height:1.5; color:#1e40af;">
            🎯 <strong>ディエスカレーション（De-escalation：広域から狭域へ）の美学：</strong><br>
            初期治療（Empirical）では広域抗菌薬（ゾシンやメロペン）で命を救い、培養結果（48〜72時間後）でMSSAが判明したら<strong>セファゾリン（CEZ）</strong>へ、肺炎球菌なら<strong>ペニシリンG（PCG）やアンピシリン</strong>へスパッと絞る。これが耐性菌を作らない真のプロ薬剤師の介入！
          </div>

        </div>

      </div>
`;

// src/03_guide.html に挿入
let guideHtml = fs.readFileSync('src/03_guide.html', 'utf8');

// c8 の <div class="grid-2"> の直前に abxMasterHtml を挿入
const c8Idx = guideHtml.indexOf('id="c8"');
if (c8Idx === -1) {
  console.error('c8 not found');
  process.exit(1);
}

const grid2Idx = guideHtml.indexOf('<div class="grid-2">', c8Idx);
if (grid2Idx === -1) {
  console.error('grid-2 not found in c8');
  process.exit(1);
}

// 既存の abx-master-container があれば置換、なければ挿入
if (guideHtml.includes('class="abx-master-container"')) {
  const existingStart = guideHtml.indexOf('<div class="abx-master-container">');
  const existingEnd = guideHtml.indexOf('</div>\n\n    <div class="grid-2">', existingStart);
  guideHtml = guideHtml.substring(0, existingStart) + abxMasterHtml + '\n    ' + guideHtml.substring(grid2Idx);
} else {
  guideHtml = guideHtml.substring(0, grid2Idx) + abxMasterHtml + '\n    ' + guideHtml.substring(grid2Idx);
}

fs.writeFileSync('src/03_guide.html', guideHtml, 'utf8');
console.log('Successfully embedded Antibiotic Master Hub into c8 in src/03_guide.html');
