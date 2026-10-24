[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$c = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\src\06_answers.html' -Encoding UTF8 -Raw
$blank = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\src\student_blank.html' -Encoding UTF8 -Raw

# トグルボタンの追加
$btn = '<div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;"><button id="toggle-ans-btn" class="sub-filter-btn active" style="background:#0f766e; color:white; border-color:#0d9488;" onclick="toggleAnswerVisibility()">👁️ 解答：表示中（指導者モード）</button><button class="header-print-btn" onclick="printTab(''tab-answers'')">🖨️ Answer Book印刷</button></div>'
$c = $c.Replace('<button class="header-print-btn" onclick="printTab(''tab-answers'')">🖨️ Answer Book印刷</button>', $btn)

# ans-sectionの前にstudent-answer-blankを挿入
$c = $c.Replace('<div class="ans-section">', "$blank`r`n    <div class=`"ans-section`">")

[System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\06_answers.html', $c, (New-Object System.Text.UTF8Encoding($true)))
Write-Output "Successfully updated 06_answers.html"
