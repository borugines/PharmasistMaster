[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$html = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\index.html' -Encoding UTF8 -Raw

# 簡易的なタグ対応チェック
$openDivs = ([regex]::Matches($html, '<div\b')).Count
$closeDivs = ([regex]::Matches($html, '</div>')).Count
Write-Output "Div tags - Open: $openDivs, Close: $closeDivs"

$openTables = ([regex]::Matches($html, '<table\b')).Count
$closeTables = ([regex]::Matches($html, '</table>')).Count
Write-Output "Table tags - Open: $openTables, Close: $closeTables"

$openCards = ([regex]::Matches($html, 'class="disease-card"')).Count
Write-Output "Disease cards: $openCards"

$openQas = ([regex]::Matches($html, 'class="qa-card"')).Count
Write-Output "QA cards: $openQas"

$openProfiles = ([regex]::Matches($html, 'class="profile-card"')).Count
Write-Output "Profile cards: $openProfiles"

$openMatrices = ([regex]::Matches($html, 'class="comp-section')).Count
Write-Output "Comparison sections: $openMatrices"

# DRUG_DB のエントリ数を概算
$drugEntries = ([regex]::Matches($html, '\{\s*name:')).Count
Write-Output "DRUG_DB entries: $drugEntries"
