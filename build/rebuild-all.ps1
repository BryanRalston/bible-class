$ids = @('lost-sheep','lost-son','hidden-treasure-pearl','the-farmer','bags-of-gold','unmerciful-servant','persistent-widow')
$base = 'C:\Cortex\bible-class'
$builder = Join-Path $base 'build\build-lesson.js'
foreach ($id in $ids) {
  $dir = Join-Path $base (Join-Path 'lessons' $id)
  # 1. (re)build the HTML from story.json
  node $builder $dir | Out-Null
  # 2. pick the dated html (e.g. 05-W5_lost-sheep.html); fall back to plain
  $html = Get-ChildItem $dir -Filter "*_$id.html" | Select-Object -First 1
  if (-not $html) { $html = Get-ChildItem $dir -Filter "$id.html" | Select-Object -First 1 }
  # 3. render the PDF
  & "$base\build\render-pdf.ps1" -Html $html.FullName | Out-Null
}
Write-Output '=== final deliverables ==='
foreach ($id in $ids) {
  Get-ChildItem (Join-Path $base (Join-Path 'lessons' $id)) -File |
    Where-Object { $_.Extension -in '.pdf','.html' } |
    ForEach-Object { Write-Output ("{0}  ({1} KB)" -f $_.Name, [math]::Round($_.Length/1KB)) }
}
