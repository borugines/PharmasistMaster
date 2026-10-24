[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$c = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\src\09_app.js' -Encoding UTF8 -Raw

$extraFunctions = @'

// Answer Book 解答表示/非表示トグル（学生用ワークシート切替）
function toggleAnswerVisibility() {
  const container = document.querySelector('.answers-container');
  const btn = document.getElementById('toggle-ans-btn');
  if (!container || !btn) return;

  const isHidden = container.classList.toggle('hide-answers');
  if (isHidden) {
    btn.innerHTML = '🙈 解答：非表示（学生ワークシートモード）';
    btn.style.background = '#64748b';
    btn.style.borderColor = '#475569';
  } else {
    btn.innerHTML = '👁️ 解答：表示中（指導者モード）';
    btn.style.background = '#0f766e';
    btn.style.borderColor = '#0d9488';
  }
}

// 学生用ワークシート印刷（解答を一時的に隠して印刷）
function printStudentWorksheet() {
  switchTab('tab-answers');
  const container = document.querySelector('.answers-container');
  const btn = document.getElementById('toggle-ans-btn');
  if (container) {
    container.classList.add('hide-answers');
    if (btn) {
      btn.innerHTML = '🙈 解答：非表示（学生ワークシートモード）';
      btn.style.background = '#64748b';
    }
  }
  setTimeout(() => {
    window.print();
  }, 250);
}

// 指導フレームワーク アコーディオン開閉
function toggleFrameworkDetails(btn) {
  const details = document.getElementById('framework-details');
  if (!details) return;
  if (details.style.display === 'none') {
    details.style.display = 'block';
    if (btn) btn.innerText = '▼ 閉じる';
  } else {
    details.style.display = 'none';
    if (btn) btn.innerText = '▶ 開く';
  }
}
'@

$c = $c.TrimEnd() + "`r`n" + $extraFunctions
[System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\09_app.js', $c, (New-Object System.Text.UTF8Encoding($true)))
Write-Output "Appended extra functions to src/09_app.js"
