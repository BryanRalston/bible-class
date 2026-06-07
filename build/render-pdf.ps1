param(
  [Parameter(Mandatory=$true)][string]$Html,
  [string]$Pdf
)
# Render an HTML lesson to PDF using headless Chrome.
# Usage: powershell -File render-pdf.ps1 -Html "...\lost-sheep.html" [-Pdf "...\lost-sheep.pdf"]

$chrome = @(
  'C:\Program Files\Google\Chrome\Application\chrome.exe',
  'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe',
  (Join-Path $env:LOCALAPPDATA 'Google\Chrome\Application\chrome.exe')
) | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $chrome) { Write-Error 'Chrome not found'; exit 1 }

$Html = (Resolve-Path $Html).Path
if (-not $Pdf) { $Pdf = [System.IO.Path]::ChangeExtension($Html, 'pdf') }

$uri = 'file:///' + ($Html -replace '\\','/')
$profile = Join-Path $env:TEMP ('chrome-pdf-' + [System.Guid]::NewGuid().ToString('N'))

$args = @(
  '--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check',
  '--disable-extensions','--run-all-compositor-stages-before-draw','--virtual-time-budget=10000',
  "--user-data-dir=$profile",
  '--no-pdf-header-footer',
  "--print-to-pdf=$Pdf",
  $uri
)
$proc = Start-Process -FilePath $chrome -ArgumentList $args -NoNewWindow -PassThru -Wait
Write-Output ("chrome exit: " + $proc.ExitCode)
Remove-Item -Recurse -Force $profile -ErrorAction SilentlyContinue

if (Test-Path $Pdf) {
  $kb = [math]::Round((Get-Item $Pdf).Length / 1KB)
  Write-Output "PDF written: $Pdf ($kb KB)"
} else {
  Write-Error 'PDF was not created'; exit 1
}
