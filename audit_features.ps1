[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$indexHtml = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\index.html' -Encoding UTF8 -Raw
$origMd = Get-Content 'c:\Users\borug\Downloads\Google-Gemini.md' -Encoding UTF8 -Raw

Write-Output "=== CHECKING KEY SECTIONS FROM Google-Gemini.md ==="

# 1. 薬学的管理の5ステップ
Write-Output "1. 薬学的管理の5ステップ: $($indexHtml.Contains('薬学的管理の5ステップ'))"

# 2. 実習フェーズ（ステップアップ方式 / 11週間ルーブリック）
Write-Output "2. 実習フェーズ（ステップアップ方式）: $($indexHtml.Contains('実習フェーズ') -or $indexHtml.Contains('ステップアップ方式'))"

# 3. 手書きメモ欄 (memo-area)
Write-Output "3. 手書きメモ欄 (memo-area): $($indexHtml.Contains('memo-area') -or $indexHtml.Contains('手書き用'))"

# 4. 解答表示/非表示（学生用ワークシート切替）
Write-Output "4. 解答表示/非表示切替: $($indexHtml.Contains('toggleAnswer') -or $indexHtml.Contains('解答表示'))"

# 5. カメレオン薬剤
Write-Output "5. カメレオン薬剤マトリクス: $($indexHtml.Contains('カメレオン薬剤'))"

# 6. 同効薬比較 11〜15
Write-Output "6. 同効薬比較 追加領域: $($indexHtml.Contains('新世代便秘薬 4銃士'))"
