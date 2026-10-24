// --- 新機能用ヘルパー＆ジャンプ関数 ---
function jumpToSpecialTab(tabId, secClass) {
  closeDrugModal();
  switchTab(tabId);
  if (tabId === 'tab-newdrugs') {
    filterTrend(secClass || 'all', null);
  } else if (tabId === 'tab-special') {
    showTopic(secClass || 'all', null);
  } else if (tabId === 'tab-otc') {
    showOtc(secClass || 'all', null);
  } else if (tabId === 'tab-followup') {
    showFu(secClass || 'all', null);
  }
  if (secClass && secClass !== 'all') {
    setTimeout(() => {
      const target = document.querySelector('.' + secClass);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  }
}

// 改良版 showDrugDetail（全タブジャンプ対応）
function showDrugDetail(drug) {
  const modal = document.getElementById('drugDetailModal');
  const body = document.getElementById('modalDrugBody');
  
  const isSpecialTab = drug.gId && drug.gId.startsWith('tab-');
  const guideBtnText = isSpecialTab ? '📑 該当セクションへジャンプ' : '📘 疾患ガイドへジャンプ';
  const guideAction = isSpecialTab 
    ? `jumpToSpecialTab('${drug.gId}', '${drug.cSec}')` 
    : `jumpToGuide('${drug.gId}')`;
  
  const compBtn = (!isSpecialTab && drug.cSec) 
    ? `<button onclick="jumpToComp('${drug.cSec}')" style="background:#0f766e; color:white; border:none; padding:8px 16px; border-radius:6px; font-weight:700; cursor:pointer; font-size:0.85rem;">⚔️ 同効薬比較へジャンプ</button>`
    : '';

  body.innerHTML = `
    <div style="border-bottom:2px solid #e2e8f0; padding-bottom:12px; margin-bottom:14px;">
      <span style="display:inline-block; background:#e0f2fe; color:#0369a1; font-weight:700; font-size:0.78rem; padding:3px 10px; border-radius:4px; margin-bottom:6px;">${drug.cat}</span>
      <h2 style="font-size:1.35rem; color:var(--primary); font-weight:800; margin:0;">${drug.name}</h2>
      <div style="font-size:0.88rem; color:#64748b; margin-top:2px;">一般名：${drug.gen}</div>
    </div>
    <div style="background:#eff6ff; border-left:4px solid #2563eb; padding:10px 14px; border-radius:6px; margin-bottom:14px;">
      <strong style="color:#1e3a8a; font-size:0.92rem;">🎯 キャラ・一言：</strong>
      <div style="font-size:0.88rem; color:#1e293b; margin-top:2px;">${drug.char}</div>
    </div>
    <div style="font-size:0.9rem; line-height:1.65; color:#334155; margin-bottom:20px;">
      <strong>💡 現場の勘所・ピットフォール：</strong><br>
      ${drug.desc}
    </div>
    <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:flex-end;">
      <button onclick="${guideAction}" style="background:#2563eb; color:white; border:none; padding:8px 16px; border-radius:6px; font-weight:700; cursor:pointer; font-size:0.85rem;">${guideBtnText}</button>
      ${compBtn}
      <button onclick="closeDrugModal()" style="background:#f1f5f9; color:#475569; border:1px solid #cbd5e1; padding:8px 16px; border-radius:6px; font-weight:700; cursor:pointer; font-size:0.85rem;">閉じる</button>
    </div>
  `;
  modal.style.display = 'flex';
}

// --- 8. 新薬トレンド図鑑 スクリプト ---
function filterTrend(cls, btn) {
  const btns = document.querySelectorAll('#tab-newdrugs .f-btn');
  btns.forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const secs = document.querySelectorAll('#tab-newdrugs .trend-section');
  secs.forEach(s => {
    if (cls === 'all' || s.classList.contains(cls)) {
      s.style.display = 'block';
    } else {
      s.style.display = 'none';
    }
  });
}

// --- 9. 実戦スペシャルトピック スクリプト ---
function showTopic(cls, btn) {
  const btns = document.querySelectorAll('#tab-special .t-btn');
  btns.forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const secs = document.querySelectorAll('#tab-special .topic-sec');
  secs.forEach(s => {
    if (cls === 'all' || s.classList.contains(cls)) {
      s.style.display = 'block';
    } else {
      s.style.display = 'none';
    }
  });
}

// --- 10. シンプルOTC推奨 スクリプト ---
function showOtc(cls, btn) {
  const btns = document.querySelectorAll('#tab-otc .tab-btn');
  btns.forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const secs = document.querySelectorAll('#tab-otc .otc-section');
  secs.forEach(s => {
    if (cls === 'all' || s.classList.contains(cls)) {
      s.style.display = 'block';
    } else {
      s.style.display = 'none';
    }
  });
}

// --- 11. 服薬フォロー＆TR スクリプト ---
function showFu(cls, btn) {
  const btns = document.querySelectorAll('#tab-followup .tab-btn');
  btns.forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const secs = document.querySelectorAll('#tab-followup .fu-section');
  secs.forEach(s => {
    if (cls === 'all' || s.classList.contains(cls)) {
      s.style.display = 'block';
    } else {
      s.style.display = 'none';
    }
  });
}

// --- 12. 印刷ハブ スクリプト ---
function printTab(tabId) {
  switchTab(tabId);
  setTimeout(() => window.print(), 200);
}

function printAllDiseases() {
  switchTab('tab-guide');
  filterGuideCard('all', null);
  setTimeout(() => window.print(), 200);
}

function printSingleDiseaseFromSelect() {
  const sel = document.getElementById('single-disease-select');
  if (!sel) return;
  const cardId = sel.value;
  switchTab('tab-guide');
  filterGuideCard(cardId, null);
  setTimeout(() => window.print(), 200);
}

function printMode(mode) {
  if (mode === 'all-guide') {
    printAllDiseases();
  }
}
