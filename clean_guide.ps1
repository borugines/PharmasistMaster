[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$c = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\src\03_guide.html' -Encoding UTF8 -Raw

# 不要な <script>... </div></div></div> 部分を置換
$idx = $c.IndexOf('<script>')
if ($idx -gt 0) {
    # <script>の手前の最後の</div>まで取得
    $trimmed = $c.Substring(0, $idx).TrimEnd()
    # 適切に </div> を閉じる
    $clean = $trimmed + "`r`n    </div>`r`n  </div>`r`n</div>"
    [System.IO.File]::WriteAllText('c:\Users\borug\Antigravity\PharmasistMaster\src\03_guide.html', $clean, (New-Object System.Text.UTF8Encoding($true)))
    Write-Output "Cleaned up src/03_guide.html"
} else {
    Write-Output "No script tag in 03_guide.html"
}
