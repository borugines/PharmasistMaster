const fs = require('fs');

// 1. src/02_hero_nav.html の更新
let navHtml = fs.readFileSync('src/02_hero_nav.html', 'utf8');
if (!navHtml.includes("switchTab('tab-lab')")) {
  navHtml = navHtml.replace(
    `<button class="tab-btn" onclick="switchTab('tab-dict')">📚 臨床インデックス辞書</button>`,
    `<button class="tab-btn" onclick="switchTab('tab-dict')">📚 臨床インデックス辞書</button>
      <button class="tab-btn" onclick="switchTab('tab-lab')">🧪 臨床検査値評価</button>`
  );
  fs.writeFileSync('src/02_hero_nav.html', navHtml, 'utf8');
  console.log('Updated src/02_hero_nav.html with tab-lab button');
}

// 2. src/09_app.js の更新
let appJs = fs.readFileSync('src/09_app.js', 'utf8');
if (!appJs.includes('function filterLabSection')) {
  const labJs = `
// --- 16. 臨床検査値評価タブ スクリプト ---
function filterLabSection(secClass, btn) {
  const btns = document.querySelectorAll('#tab-lab .dict-btn');
  btns.forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const secs = document.querySelectorAll('#tab-lab .lab-section');
  secs.forEach(s => {
    if (secClass === 'all' || s.classList.contains(secClass)) {
      s.style.display = 'block';
    } else {
      s.style.display = 'none';
    }
  });
}

function filterLabTables() {
  const input = document.getElementById('labSearchInput');
  if (!input) return;
  const q = input.value.trim().toLowerCase();
  const rows = document.querySelectorAll('#tab-lab table tbody tr');
  rows.forEach(r => {
    const text = r.innerText.toLowerCase();
    if (!q || text.includes(q)) {
      r.style.display = '';
    } else {
      r.style.display = 'none';
    }
  });
}
`;
  appJs = appJs + '\n' + labJs;
  fs.writeFileSync('src/09_app.js', appJs, 'utf8');
  console.log('Updated src/09_app.js with lab filter functions');
}

// 3. src/08_print_hub.html の更新
let printHubHtml = fs.readFileSync('src/08_print_hub.html', 'utf8');
if (!printHubHtml.includes("printTab('tab-lab')")) {
  const printCard = `
      <div style="border:1px solid var(--border); border-radius:10px; padding:20px; background:#f8fafc; display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <span style="background:#e0f2fe; color:#0369a1; font-size:0.75rem; font-weight:700; padding:2px 8px; border-radius:10px;">A4縦 / 白衣ポケット</span>
          <h3 style="font-size:1.15rem; color:var(--primary); font-weight:800; margin:8px 0 6px;">処方監査 臨床検査値チートシート</h3>
          <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">腎機能（eGFR/Ccr）、肝機能、電解質、心不全、リウマチ活動性マーカーの基準値・パニック値・疑義照会基準をA4複数枚で美しく印刷します。</p>
        </div>
        <button class="header-print-btn" style="width:100%; justify-content:center; margin-top:15px; background:#0284c7;" onclick="printTab('tab-lab')">🖨️ 検査値チートシートを印刷</button>
      </div>`;

  printHubHtml = printHubHtml.replace(
    '<!-- 印刷時の推奨ブラウザ設定 -->',
    printCard + '\n    </div>\n\n    <!-- 印刷時の推奨ブラウザ設定 -->'
  );
  // もし置換できなかった場合の安全策
  if (!printHubHtml.includes("printTab('tab-lab')")) {
    printHubHtml = printHubHtml.replace(
      '<!-- 印刷時の推奨ブラウザ設定 -->',
      printCard + '\r\n    </div>\r\n\r\n    <!-- 印刷時の推奨ブラウザ設定 -->'
    );
  }
  fs.writeFileSync('src/08_print_hub.html', printHubHtml, 'utf8');
  console.log('Updated src/08_print_hub.html with lab print card');
}

// 4. build_master_clean.ps1 の更新
let buildPs1 = fs.readFileSync('build_master_clean.ps1', 'utf8');
if (!buildPs1.includes('15_lab_values.html')) {
  buildPs1 = buildPs1.replace(
    `$dictTab = [System.IO.File]::ReadAllText('c:\\Users\\borug\\Antigravity\\PharmasistMaster\\src\\14_dictionary.html', [System.Text.Encoding]::UTF8)`,
    `$dictTab = [System.IO.File]::ReadAllText('c:\\Users\\borug\\Antigravity\\PharmasistMaster\\src\\14_dictionary.html', [System.Text.Encoding]::UTF8)
$labTab = [System.IO.File]::ReadAllText('c:\\Users\\borug\\Antigravity\\PharmasistMaster\\src\\15_lab_values.html', [System.Text.Encoding]::UTF8)`
  );

  buildPs1 = buildPs1.replace(
    `$dictTab + \`r\`n +`,
    `$dictTab + \`r\`n + $labTab + \`r\`n +`
  );
  fs.writeFileSync('build_master_clean.ps1', buildPs1, 'utf8');
  console.log('Updated build_master_clean.ps1 to include 15_lab_values.html');
}

console.log('Integration setup completed.');
