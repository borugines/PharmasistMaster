$utf8 = New-Object System.Text.UTF8Encoding($false)

$lines = [System.IO.File]::ReadAllLines('c:\Users\borug\Antigravity\PharmasistMaster\src\09_app.js', [System.Text.Encoding]::UTF8)
$extraDrugs = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\extra_app_drugs.js', [System.Text.Encoding]::UTF8)
$extraFuncs = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\parts\extra_app_funcs.js', [System.Text.Encoding]::UTF8)

$sb = New-Object System.Text.StringBuilder

# 1. DRUG_DB head (lines 1 to 94, 0-indexed: 0 to 93)
for ($i = 0; $i -lt 94; $i++) {
    [void]$sb.AppendLine($lines[$i])
}
# Line 94 in 1-indexed is $lines[93], which is the last drug object. Ensure trailing comma:
# Actually in $lines[93], let's check if it ends with comma or not
# Append comma to line 94
[void]$sb.Append(",")
[void]$sb.AppendLine("")

# Append extra drugs
[void]$sb.AppendLine($extraDrugs)

# Close DRUG_DB
[void]$sb.AppendLine("];")

# Lines 96 to 303 (0-indexed: 96 to 303, corresponding to line 97 to 304)
# Let's find index where "// --- 2. タブ切り替えロジック ---" starts
$tabLogicIdx = 0
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match "// --- 2\. タブ切り替えロジック ---") {
        $tabLogicIdx = $i
        break
    }
}

# Find index where "function showDrugDetail" starts
$showDrugDetailIdx = 0
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match "function showDrugDetail\(") {
        $showDrugDetailIdx = $i
        break
    }
}

for ($i = $tabLogicIdx; $i -lt $showDrugDetailIdx; $i++) {
    [void]$sb.AppendLine($lines[$i])
}

# Insert extra funcs (including jumpToSpecialTab, showDrugDetail, filterTrend, showTopic, showOtc, showFu, printTab etc)
[void]$sb.AppendLine($extraFuncs)

# Find index where "function closeDrugModal" starts
$closeDrugModalIdx = 0
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match "function closeDrugModal\(") {
        $closeDrugModalIdx = $i
        break
    }
}

# Find index where "// --- 8. 印刷ハブ スクリプト ---" starts
$printHubIdx = 0
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match "// --- 8\. 印刷ハブ スクリプト ---") {
        $printHubIdx = $i
        break
    }
}

for ($i = $closeDrugModalIdx; $i -lt $printHubIdx; $i++) {
    [void]$sb.AppendLine($lines[$i])
}

# Find index where "// --- 9. 初期化処理 ---" starts
$initIdx = 0
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match "// --- 9\. 初期化処理 ---") {
        $initIdx = $i
        break
    }
}

for ($i = $initIdx; $i -lt $lines.Length; $i++) {
    [void]$sb.AppendLine($lines[$i])
}

[System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\09_app.js', $sb.ToString(), $utf8)
Write-Output "Successfully updated 09_app.js"
