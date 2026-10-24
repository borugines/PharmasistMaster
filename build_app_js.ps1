[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$linesIndex = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\extracted_index_portal.html' -Encoding UTF8
$startIdx = -1
$endIdx = -1
for ($i = 0; $i -lt $linesIndex.Count; $i++) {
    if ($linesIndex[$i] -match 'const DRUG_DB\s*=') {
        $startIdx = $i
    }
    if ($startIdx -ge 0 -and $linesIndex[$i] -match '^\s*\];') {
        $endIdx = $i
        break
    }
}

$coreDbLines = $linesIndex[($startIdx + 1)..($endIdx - 1)] -join "`r`n"
$extraDbLines = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\extracted_extra_suggest_11_15.js' -Encoding UTF8
$extraDb = ($extraDbLines | Where-Object { $_ -notmatch '^```' }) -join "`r`n"

$jsCode = @"
// ========================================================
// 臨床薬学マスターポータル アプリケーションロジック & 全薬剤DB
// ========================================================

const DRUG_DB = [
$coreDbLines,

$extraDb
];

// タブ切り替えロジック
function switchTab(tabId) {
  const panes = document.querySelectorAll('.tab-pane');
  panes.forEach(p => p.classList.remove('active'));

  const targetPane = document.getElementById(tabId);
  if (targetPane) {
    targetPane.classList.add('active');
  }

  const navBtns = document.querySelectorAll('.tab-nav .tab-btn');
  navBtns.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(tabId)) {
      btn.classList.add('active');
    }
  });

  const heroArea = document.getElementById('hero-area');
  if (heroArea) {
    if (tabId === 'tab-search') {
      heroArea.style.padding = '35px 20px 40px';
    } else {
      heroArea.style.padding = '20px 20px 20px';
    }
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 疾患ガイドのサイドバー絞り込み
function filterGuideCard(cardId, element) {
  const cards = document.querySelectorAll('#guide-cards-container .disease-card');
  const links = document.querySelectorAll('.guide-nav-link');
  links.forEach(l => l.classList.remove('active'));
  if (element) element.classList.add('active');

  cards.forEach(card => {
    if (cardId === 'all' || card.id === cardId) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });

  if (cardId !== 'all') {
    const target = document.getElementById(cardId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// 鑑別チャート内の表示切り替え（すべて / カメレオン / 疾患別）
function switchProfilingView(targetClass, btn) {
  const btns = document.querySelectorAll('.profiling-sub-nav .sub-filter-btn');
  btns.forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const chamSec = document.querySelector('.chameleon-sec');
  const diseaseSecs = document.querySelectorAll('.disease-sec, .content-block');

  if (targetClass === 'all') {
    if (chamSec) chamSec.style.display = 'block';
    diseaseSecs.forEach(sec => sec.style.display = 'block');
  } else if (targetClass === 'chameleon-sec') {
    if (chamSec) chamSec.style.display = 'block';
    diseaseSecs.forEach(sec => sec.style.display = 'none');
  } else if (targetClass === 'disease-sec') {
    if (chamSec) chamSec.style.display = 'none';
    diseaseSecs.forEach(sec => sec.style.display = 'block');
  }
}

// 鑑別チャート内のリアルタイム絞り込み検索
function filterProfiling(query) {
  query = (query || '').toLowerCase().trim();
  const searchables = document.querySelectorAll('#tab-profiling .searchable, #tab-profiling .profile-card');
  
  searchables.forEach(item => {
    const text = item.innerText.toLowerCase();
    if (!query || text.includes(query)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

// サジェスト検索エンジン
const searchInput = document.getElementById('drug-search-input');
const suggestDropdown = document.getElementById('suggest-dropdown');
const clearBtn = document.getElementById('search-clear-btn');

if (searchInput) {
  searchInput.addEventListener('input', function() {
    const query = this.value.trim().toLowerCase();
    if (!query) {
      suggestDropdown.style.display = 'none';
      clearBtn.style.display = 'none';
      return;
    }
    clearBtn.style.display = 'flex';
    renderSuggestResults(query);
  });

  document.addEventListener('click', function(e) {
    if (!searchInput.contains(e.target) && !suggestDropdown.contains(e.target)) {
      suggestDropdown.style.display = 'none';
    }
  });
}

function clearSearch() {
  if (searchInput) {
    searchInput.value = '';
    suggestDropdown.style.display = 'none';
    clearBtn.style.display = 'none';
    searchInput.focus();
  }
}

function quickSearch(keyword) {
  switchTab('tab-search');
  if (searchInput) {
    searchInput.value = keyword;
    searchInput.focus();
    renderSuggestResults(keyword.toLowerCase());
  }
}

function renderSuggestResults(query) {
  const matches = DRUG_DB.filter(d => {
    const name = (d.name || '').toLowerCase();
    const gen = (d.gen || '').toLowerCase();
    const cat = (d.cat || '').toLowerCase();
    const char = (d.char || '').toLowerCase();
    const desc = (d.desc || '').toLowerCase();
    return name.includes(query) || gen.includes(query) || cat.includes(query) || char.includes(query) || desc.includes(query);
  });

  if (matches.length === 0) {
    suggestDropdown.innerHTML = '<div style=\"padding:15px; color:#64748b; font-size:0.9rem; text-align:center;\">該当する薬剤・キーワードが見つかりませんでした</div>';
    suggestDropdown.style.display = 'block';
    return;
  }

  let html = '';
  matches.slice(0, 10).forEach(d => {
    html += \`
      <div class=\"suggest-item\" onclick='selectDrug(\${JSON.stringify(d)})'>
        <div class=\"suggest-item-header\">
          <div class=\"suggest-drug-names\">
            \${d.name} <span class=\"generic\">(\${d.gen})</span>
          </div>
          <span class=\"suggest-tag\">\${d.cat}</span>
        </div>
        <div class=\"suggest-pearl\">💡 \${d.char}</div>
        <div class=\"suggest-desc\" style=\"margin-top:4px;\">\${d.desc}</div>
      </div>
    \`;
  });

  suggestDropdown.innerHTML = html;
  suggestDropdown.style.display = 'block';
}

function selectDrug(drug) {
  suggestDropdown.style.display = 'none';
  showDrugDetail(drug);
}

function showDrugDetail(drug) {
  const display = document.getElementById('drug-detail-display');
  if (!display) return;

  document.getElementById('detail-badge').innerText = drug.cat || '';
  document.getElementById('detail-brand-name').innerText = drug.name || '';
  document.getElementById('detail-generic-name').innerText = drug.gen ? '一般名：' + drug.gen : '';
  document.getElementById('detail-indication').innerText = drug.desc || '';
  document.getElementById('detail-offlabel').innerText = drug.char || '';
  document.getElementById('detail-pearl').innerText = drug.desc + ' ' + (drug.char || '');

  const guideBtn = document.getElementById('detail-jump-guide-btn');
  if (guideBtn) {
    guideBtn.onclick = function() {
      jumpToGuide(drug.gId);
    };
  }

  const compBtn = document.getElementById('detail-jump-comp-btn');
  if (compBtn) {
    compBtn.onclick = function() {
      jumpToComparison(drug.cSec);
    };
  }

  display.style.display = 'block';
  display.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function closeDrugDetail() {
  const display = document.getElementById('drug-detail-display');
  if (display) display.style.display = 'none';
}

function jumpToGuide(gId) {
  switchTab('tab-guide');
  const target = document.getElementById(gId);
  if (target) {
    const cards = document.querySelectorAll('#guide-cards-container .disease-card');
    cards.forEach(c => c.style.display = 'block');
    const links = document.querySelectorAll('.guide-nav-link');
    links.forEach(l => l.classList.remove('active'));
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    target.style.outline = '3px solid #38bdf8';
    setTimeout(() => { target.style.outline = 'none'; }, 2000);
  }
}

function jumpToComparison(cSec) {
  switchTab('tab-comparison');
  if (!cSec) return;
  const target = document.querySelector('.' + cSec) || document.getElementById(cSec);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    target.style.outline = '3px solid #38bdf8';
    setTimeout(() => { target.style.outline = 'none'; }, 2000);
  }
}

// 印刷制御ロジック
function triggerQuickPrint() {
  window.print();
}

function printTab(tabId) {
  switchTab(tabId);
  setTimeout(() => {
    window.print();
  }, 250);
}

function printActiveGuideCard() {
  switchTab('tab-guide');
  window.print();
}

function printSingleDiseaseFromSelect() {
  const select = document.getElementById('single-disease-select');
  if (!select) return;
  const cardId = select.value;
  switchTab('tab-guide');
  filterGuideCard(cardId, null);
  setTimeout(() => {
    window.print();
  }, 250);
}

function printMode(mode) {
  if (mode === 'all-guide') {
    switchTab('tab-guide');
    filterGuideCard('all', null);
    setTimeout(() => {
      window.print();
    }, 250);
  }
}
"@

[System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\09_app.js', $jsCode, (New-Object System.Text.UTF8Encoding($true)))
Write-Output "Successfully updated src/09_app.js with profiling controls"
