const fs = require('fs');

let appJs = fs.readFileSync('src/09_app.js', 'utf8');

const dictFuncs = `
// --- 15. 臨床インデックス辞書 スクリプト ---
let currentDictType = 'all';
let currentDictKana = 'all';
let currentDictQuery = '';

function applyDictFilters() {
  const cards = document.querySelectorAll('#dictCardsContainer .dict-card');
  cards.forEach(card => {
    const cType = card.getAttribute('data-type') || '';
    const cKana = card.getAttribute('data-kana') || '';
    const cName = card.getAttribute('data-name') || '';
    const cDesc = card.getAttribute('data-desc') || '';

    // タイプ判定
    const matchType = (currentDictType === 'all' || cType === currentDictType);
    
    // かな判定
    const matchKana = (currentDictKana === 'all' || cKana === currentDictKana);

    // テキスト検索判定
    const matchQuery = (!currentDictQuery || cName.includes(currentDictQuery) || cDesc.includes(currentDictQuery));

    if (matchType && matchKana && matchQuery) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

function filterDict(type, btn) {
  currentDictType = type;
  const btns = document.querySelectorAll('#tab-dict .dict-btn');
  btns.forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  applyDictFilters();
}

function filterDictSearch(query) {
  currentDictQuery = query.trim().toLowerCase();
  applyDictFilters();
}

function filterDictKana(kana) {
  currentDictKana = kana;
  applyDictFilters();
}

function showDrugByName(drugName) {
  const drug = DRUG_DB.find(d => d.name.includes(drugName) || drugName.includes(d.name.split(' ')[0]));
  if (drug) {
    jumpToDrugDirectly(drug);
  } else {
    // 汎用検索へフォールバック
    quickSearch(drugName);
  }
}

function jumpToAnswer(qId) {
  switchTab('tab-answers');
  const target = document.getElementById(qId);
  if (target) {
    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.classList.remove('target-pulse');
      void target.offsetWidth;
      target.classList.add('target-pulse');
    }, 150);
  }
}

function jumpToProfiling(proId) {
  switchTab('tab-profiling');
  const target = document.getElementById(proId);
  if (target) {
    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.classList.remove('target-pulse');
      void target.offsetWidth;
      target.classList.add('target-pulse');
    }, 150);
  }
}
`;

if (!appJs.includes("15. 臨床インデックス辞書 スクリプト")) {
  appJs = appJs.replace(
    '// --- 14. 初期化処理 ---',
    dictFuncs + '\n// --- 14. 初期化処理 ---'
  );
  fs.writeFileSync('src/09_app.js', appJs, 'utf8');
  console.log('Successfully added Dictionary functions to 09_app.js!');
} else {
  console.log('Dictionary functions already in 09_app.js');
}
