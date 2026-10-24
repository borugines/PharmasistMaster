const fs = require('fs');

let js = fs.readFileSync('src/09_app.js', 'utf8');

// filterCompToKeyword と resetCompFilter を同効薬比較セクション（filterCompSec の前）に追加
const compFilterFunctions = `
// ==========================================================================
// 同効薬比較 ピンポイント単独表示フィルター（他のものは完全非表示）
// ==========================================================================
function filterCompToKeyword(keyword) {
  if (!keyword) return;
  const kw = keyword.toLowerCase().trim();

  // 1. 同効薬比較タブを開く（スクロールは後で最上部へ）
  switchTab('tab-comparison', false);

  // 2. セクションボタンのアクティブを解除
  const btns = document.querySelectorAll('#tab-comparison .tab-btn');
  btns.forEach(b => b.classList.remove('active'));

  // 3. 全ての comp-section を一旦 display: block にして子要素を走査
  const sections = document.querySelectorAll('.comp-section');
  let matchedCount = 0;

  sections.forEach(sec => {
    let secHasMatch = false;
    const children = Array.from(sec.children);
    let currentBanner = null;
    let currentGroup = [];

    const flushGroup = () => {
      if (currentGroup.length > 0) {
        const text = currentGroup.map(el => el.innerText || '').join(' ').toLowerCase();
        const match = text.includes(kw);
        currentGroup.forEach(el => {
          el.style.display = match ? '' : 'none';
        });
        if (match) {
          secHasMatch = true;
          matchedCount++;
        }
      }
      currentGroup = [];
    };

    children.forEach(child => {
      if (child.classList && (child.classList.contains('sub-banner') || child.classList.contains('sec-header'))) {
        flushGroup();
        currentBanner = child;
        currentGroup.push(child);
      } else if (currentBanner) {
        currentGroup.push(child);
      } else {
        child.style.display = 'none';
      }
    });
    flushGroup();

    sec.style.display = secHasMatch ? 'block' : 'none';
  });

  // 4. 上部に絞り込み表示バーを表示
  let notice = document.getElementById('comp-filter-notice');
  if (!notice) {
    notice = document.createElement('div');
    notice.id = 'comp-filter-notice';
    notice.style.cssText = 'background:linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border:2px solid #2563eb; border-radius:10px; padding:12px 18px; margin-bottom:20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; box-shadow:0 4px 12px rgba(37,99,235,0.15);';
    const container = document.querySelector('.comparison-container') || document.getElementById('tab-comparison');
    if (container) container.insertBefore(notice, container.firstChild);
  }

  notice.style.display = 'flex';
  notice.innerHTML = \`
    <div style="display:flex; align-items:center; gap:10px;">
      <span style="font-size:1.5rem;">🎯</span>
      <div>
        <strong style="color:#1e40af; font-size:1.05rem;">「\${keyword}」に合致する比較表のみを表示中（\${matchedCount}件）</strong>
        <div style="font-size:0.82rem; color:#475569; margin-top:2px;">※他の無関係な比較表はすべて非表示にしています。</div>
      </div>
    </div>
    <button onclick="resetCompFilter()" style="background:#2563eb; color:white; border:none; padding:8px 16px; border-radius:6px; font-weight:700; cursor:pointer; font-size:0.88rem; box-shadow:0 2px 4px rgba(0,0,0,0.1);">✕ 解除して全ての比較表を表示</button>
  \`;

  // 5. ページ最上部へスクロール
  window.scrollTo({ top: 0, behavior: 'smooth' });
  return matchedCount;
}

function resetCompFilter() {
  const notice = document.getElementById('comp-filter-notice');
  if (notice) notice.style.display = 'none';

  const sections = document.querySelectorAll('.comp-section');
  sections.forEach(sec => {
    sec.style.display = 'block';
    Array.from(sec.children).forEach(child => {
      child.style.display = '';
    });
  });

  filterCompSec('all', null);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
`;

// filterCompSec の直前に挿入
const targetStr = 'function filterCompSec(secClass, btn) {';
if (js.includes(targetStr)) {
  js = js.replace(targetStr, compFilterFunctions + '\n' + targetStr);
  console.log('Successfully added filterCompToKeyword and resetCompFilter!');
} else {
  console.error('filterCompSec target not found!');
  process.exit(1);
}

fs.writeFileSync('src/09_app.js', js, 'utf8');
