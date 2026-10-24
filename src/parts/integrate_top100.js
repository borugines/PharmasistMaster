const fs = require('fs');
const path = require('path');

console.log('=== Integrating top100 tab into nav, app.js and build script ===');

// 1. Update src/02_hero_nav.html
const pNav = path.join(__dirname, '..', '02_hero_nav.html');
let navHtml = fs.readFileSync(pNav, 'utf8');

const targetNavBtn = '<button class="tab-btn active" onclick="switchTab(\'tab-search\')">🔍 全薬剤検索</button>';
const newNavBtn = '<button class="tab-btn active" onclick="switchTab(\'tab-search\')">🔍 全薬剤検索</button>\n      <button class="tab-btn" onclick="switchTab(\'tab-top100\')">🏆 薬局頻出TOP100</button>';

if (!navHtml.includes('switchTab(\'tab-top100\')')) {
  if (navHtml.includes(targetNavBtn)) {
    navHtml = navHtml.replace(targetNavBtn, newNavBtn);
    fs.writeFileSync(pNav, navHtml, 'utf8');
    console.log('Successfully added top100 tab button to 02_hero_nav.html!');
  } else {
    console.error('Target nav btn not found in 02_hero_nav.html');
  }
} else {
  console.log('top100 button already in 02_hero_nav.html');
}

// 2. Update src/09_app.js
const pApp = path.join(__dirname, '..', '09_app.js');
let appJs = fs.readFileSync(pApp, 'utf8');

const filterTop100Js = `
// --- 🏆 薬局頻出TOP100 20位ごとレンジ切り替え ---
function filterTop100Range(rangeId, btn) {
  const panes = document.querySelectorAll('.top100-range-pane');
  panes.forEach(p => p.style.display = 'none');
  const target = document.getElementById('top100-range-' + rangeId);
  if (target) {
    target.style.display = 'block';
  }
  if (btn && btn.parentElement) {
    const btns = btn.parentElement.querySelectorAll('.filter-btn');
    btns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
}
`;

if (!appJs.includes('filterTop100Range')) {
  appJs += '\n' + filterTop100Js;
  fs.writeFileSync(pApp, appJs, 'utf8');
  console.log('Successfully added filterTop100Range to 09_app.js!');
} else {
  console.log('filterTop100Range already in 09_app.js');
}

// 3. Update build_master_clean.ps1
const pBuild = path.join(__dirname, '..', '..', 'build_master_clean.ps1');
let buildPs1 = fs.readFileSync(pBuild, 'utf8');

const targetBuildRead = "$searchTab = [System.IO.File]::ReadAllText('c:\\Users\\borug\\Antigravity\\PharmasistMaster\\src\\07_search_tab.html', [System.Text.Encoding]::UTF8)";
const newBuildRead = "$searchTab = [System.IO.File]::ReadAllText('c:\\Users\\borug\\Antigravity\\PharmasistMaster\\src\\07_search_tab.html', [System.Text.Encoding]::UTF8)\n$top100Tab = [System.IO.File]::ReadAllText('c:\\Users\\borug\\Antigravity\\PharmasistMaster\\src\\16_top100.html', [System.Text.Encoding]::UTF8)";

const targetBuildAppend = "[void]$sb.AppendLine($searchTab)";
const newBuildAppend = "[void]$sb.AppendLine($searchTab)\n[void]$sb.AppendLine($top100Tab)";

if (!buildPs1.includes('$top100Tab')) {
  if (buildPs1.includes(targetBuildRead) && buildPs1.includes(targetBuildAppend)) {
    buildPs1 = buildPs1.replace(targetBuildRead, newBuildRead);
    buildPs1 = buildPs1.replace(targetBuildAppend, newBuildAppend);
    fs.writeFileSync(pBuild, buildPs1, 'utf8');
    console.log('Successfully updated build_master_clean.ps1 to include 16_top100.html!');
  } else {
    console.error('Target markers not found in build_master_clean.ps1');
  }
} else {
  console.log('build_master_clean.ps1 already contains $top100Tab');
}

console.log('=== Update integration complete! ===');
