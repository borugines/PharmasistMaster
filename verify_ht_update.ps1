$h = [System.IO.File]::ReadAllText('c:\Users\borug\Antigravity\PharmasistMaster\index.html', [System.Text.Encoding]::UTF8)

$checks = [ordered]@{
    "Diastolic HT in Guide (c2)"    = $h.Contains('下の血圧（拡張期血圧）だけが高い')
    "Peripheral Resistance (TPR)"   = $h.Contains('末梢血管抵抗')
    "Alcohol as Cause for DBP"      = $h.Contains('アルコールは下を跳ね上げる最大の犯人')
    "Entresto HT Indication (2021)" = $h.Contains('2021年に本態性高血圧症に適応取得')
    "STEP Trial / Elderly Tight BP" = $h.Contains('忍容性（ふらつき等なし）があれば 130/80 未満')
    "Answer Book Q2 Enhanced"       = $h.Contains('ホースの先をつまむ指')
    "Atelec for Diastolic HT"       = $h.Contains('N型Ca遮断で交感神経を鎮め')
}

foreach ($k in $checks.Keys) {
    Write-Output ("{0,-32} : {1}" -f $k, $checks[$k])
}
