[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$indexCss = Get-Content 'c:\Users\borug\Antigravity\PharmasistMaster\src\01_styles.css' -Encoding UTF8 -Raw

$classesToCheck = @(
    'section-block', 'chameleon-sec', 'disease-sec', 
    'flow-grid', 'flow-card', 'b-step1', 'b-step2', 'b-step3', 'b-cham',
    'insight', 'talk', 'page-break'
)

foreach ($cls in $classesToCheck) {
    if ($indexCss.Contains($cls)) {
        Write-Output "[OK] Found class in CSS: $cls"
    } else {
        Write-Output "[MISSING] Missing class in CSS: $cls"
    }
}
