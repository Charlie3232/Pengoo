$ErrorActionPreference = "Stop"

$outPath = Join-Path $PSScriptRoot "Pengoo_配對分數邏輯規格.docx"
$tempRoot = Join-Path $PSScriptRoot "_docx_scoring_tmp"

if (Test-Path $tempRoot) { Remove-Item -LiteralPath $tempRoot -Recurse -Force }
New-Item -ItemType Directory -Path $tempRoot | Out-Null
New-Item -ItemType Directory -Path (Join-Path $tempRoot "_rels") | Out-Null
New-Item -ItemType Directory -Path (Join-Path $tempRoot "word") | Out-Null
New-Item -ItemType Directory -Path (Join-Path $tempRoot "word\_rels") | Out-Null

function X($s) {
  return [System.Security.SecurityElement]::Escape([string]$s)
}

function P($text, $style = "") {
  $styleXml = ""
  if ($style) { $styleXml = "<w:pPr><w:pStyle w:val=`"$style`"/></w:pPr>" }
  return "<w:p>$styleXml<w:r><w:t>$(X $text)</w:t></w:r></w:p>"
}

function Bullet($text) {
  return "<w:p><w:pPr><w:numPr><w:ilvl w:val=`"0`"/><w:numId w:val=`"1`"/></w:numPr></w:pPr><w:r><w:t>$(X $text)</w:t></w:r></w:p>"
}

function Table($headers, $rows) {
  $xml = "<w:tbl><w:tblPr><w:tblW w:w=`"0`" w:type=`"auto`"/><w:tblBorders><w:top w:val=`"single`" w:sz=`"4`" w:color=`"CCCCCC`"/><w:left w:val=`"single`" w:sz=`"4`" w:color=`"CCCCCC`"/><w:bottom w:val=`"single`" w:sz=`"4`" w:color=`"CCCCCC`"/><w:right w:val=`"single`" w:sz=`"4`" w:color=`"CCCCCC`"/><w:insideH w:val=`"single`" w:sz=`"4`" w:color=`"CCCCCC`"/><w:insideV w:val=`"single`" w:sz=`"4`" w:color=`"CCCCCC`"/></w:tblBorders></w:tblPr>"
  $xml += "<w:tr>"
  foreach ($h in $headers) {
    $xml += "<w:tc><w:tcPr><w:shd w:fill=`"E8B4BC`"/></w:tcPr><w:p><w:r><w:rPr><w:b/></w:rPr><w:t>$(X $h)</w:t></w:r></w:p></w:tc>"
  }
  $xml += "</w:tr>"
  foreach ($row in $rows) {
    $xml += "<w:tr>"
    foreach ($cell in $row) {
      $xml += "<w:tc><w:p><w:r><w:t>$(X $cell)</w:t></w:r></w:p></w:tc>"
    }
    $xml += "</w:tr>"
  }
  $xml += "</w:tbl>"
  return $xml
}

$body = ""
$body += P "Pengoo 配對分數邏輯規格" "Title"
$body += P "版本：v1 草案｜用途：整理目前題庫、契合度、權重、exclude / strongPenalty 規則，作為後續 match.html 與 Firebase 化依據。"

$body += P "1. 總體原則" "Heading1"
$body += Bullet "總契合度採 100 分制。"
$body += Bullet "80 分以上才進入推薦清單。"
$body += Bullet "先做硬性排除，再計算分數。"
$body += Bullet "分數採雙向計算：A 的期待是否符合 B 的自我狀態，並反過來計算 B 是否符合 A。"
$body += Bullet "最後契合度 = 雙向分數平均，必要時再加上個人檔案偏好加權。"

$body += P "2. 三層判斷" "Heading1"
$body += Table @("層級","名稱","說明","結果") @(
  @("第一層","exclude","硬性雷點或資格不符。","直接不推薦"),
  @("第二層","strongPenalty","明顯不合，但不一定完全排除。","大扣分，仍可能出現"),
  @("第三層","score","一般相容度分數。","進入 0–100 加權計算")
)

$body += P "3. 硬性排除建議" "Heading1"
$body += Bullet "性別 / lookingFor 未互相符合。"
$body += Bullet "任一方未審核通過。"
$body += Bullet "任一方未完成測驗。"
$body += Bullet "任一方封鎖對方，或 adminBlocked。"
$body += Bullet "完全不能接受抽菸，但對方固定抽紙菸、電子菸或加熱菸。"

$body += P "4. 初版權重配置" "Heading1"
$body += P "總分滿分 100 分，顯示時最高顯示 99% 契合。分數拆成：個人檔案 15 分 + 測驗契合 85 分。地區與年齡只做配對頁篩選，不進契合度；身高不計分。"
$body += Table @("來源","項目","分數") @(
  @("個人檔案","標籤重疊，每重疊 1 個 +2 分","最多 12"),
  @("個人檔案","職業相同","3"),
  @("個人檔案","地區、年齡","不計分，放配對頁篩選"),
  @("個人檔案","身高","不計分")
)

$body += P "5. 測驗題權重" "Heading1"
$body += Table @("題號","主題","權重","備註") @(
  @("Q16","外型 / 穿搭接受度","4","一般加權"),
  @("Q17","作息差異接受度","4","一般加權"),
  @("Q18","休假不同步接受度","4","一般加權"),
  @("Q19","抽菸接受度","8","含 exclude / strongPenalty"),
  @("Q20","喝酒接受度","4","多用 strongPenalty"),
  @("Q21","假日節奏接受度","4","一般加權"),
  @("Q22","飲食約會偏好","3","較低權重"),
  @("Q23","交友圈接受度","5","界線感重要"),
  @("Q24","感情目的接受度","7","目的不一致可強扣"),
  @("Q25","溝通雷點","8","含強扣或排除候選"),
  @("Q26","修復節奏","6","關係穩定性"),
  @("Q27","家庭界線期待","4","一般加權"),
  @("Q28","身體親密需求","7","重要關係維度"),
  @("Q29","婚姻與小孩想法","6","長期關係"),
  @("Q30","使用 Pengoo 目的","11","核心目的題")
)

$body += P "6. Neutral 選項規則" "Heading1"
$body += Bullet "Q16–Q30 每題都應有一個「這題對我不重要 / 不太在意」的選項。"
$body += Bullet "Neutral 選項對應目標題所有答案同分。"
$body += Bullet "Neutral 不強加分，也不強扣分，建議給 70–80 分作為中性相容。"

$body += P "7. 抽菸規則示例：Q19 對 Q4" "Heading1"
$body += Table @("Q19 期待","Q4-A 不抽","Q4-B 紙菸","Q4-C 電子/加熱","Q4-D 極少抽","Q4-E 戒菸中") @(
  @("A 完全不能接受","100","exclude","exclude","strongPenalty 20","strongPenalty 30"),
  @("B 極少抽可接受","95","strongPenalty 20","strongPenalty 25","100","80"),
  @("C 電子/加熱可接受","95","strongPenalty 20","100","60","60"),
  @("D 固定紙菸可接受","85","100","90","90","80"),
  @("E 戒菸可接受","90","strongPenalty 25","strongPenalty 30","75","100"),
  @("F 不太在意","80","80","80","80","80")
)

$body += P "8. 喝酒規則示例：Q20 對 Q5" "Heading1"
$body += Table @("Q20 期待","Q5-A 不喝","Q5-B 小酌","Q5-C 工作社交","Q5-D 頻率高","Q5-E 每天喝") @(
  @("A 希望幾乎不喝","100","80","60","strongPenalty 25","strongPenalty 10"),
  @("B 偶爾小酌可接受","95","100","80","55","strongPenalty 20"),
  @("C 工作社交可理解","80","95","100","60","strongPenalty 20"),
  @("D 頻率高可接受","60","80","90","100","55"),
  @("E 每天喝可接受","60","75","80","90","100"),
  @("F 不太在意","80","80","80","80","80")
)

$body += P "9. 後續實作" "Heading1"
$body += Bullet "quiz-bank.js 保存題庫，quiz-scoring.js 保存分數規則。"
$body += Bullet "match.html 讀取雙方 quizAnswers、profile、blocked 狀態。"
$body += Bullet "先檢查 exclude，再套用 strongPenalty，最後計算加權分數。"
$body += Bullet "未來搬到 Firebase 後，題庫與分數規則可由 admin 後台直接儲存。"

$documentXml = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    $body
    <w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="900" w:right="900" w:bottom="900" w:left="900"/></w:sectPr>
  </w:body>
</w:document>
"@

$stylesXml = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:rPr><w:rFonts w:ascii="Noto Sans TC" w:hAnsi="Noto Sans TC" w:eastAsia="Noto Sans TC"/><w:sz w:val="22"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:rPr><w:b/><w:color w:val="6B2D3E"/><w:sz w:val="40"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="Heading 1"/><w:basedOn w:val="Normal"/><w:rPr><w:b/><w:color w:val="C8545A"/><w:sz w:val="30"/></w:rPr><w:pPr><w:spacing w:before="300" w:after="120"/></w:pPr></w:style>
</w:styles>
"@

$numberingXml = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:abstractNum w:abstractNumId="0"><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="•"/><w:pPr><w:ind w:left="720" w:hanging="360"/></w:pPr></w:lvl></w:abstractNum>
  <w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num>
</w:numbering>
"@

$contentTypes = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>
</Types>
"@

$rels = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>
"@

$wordRels = @"
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>
</Relationships>
"@

[System.IO.File]::WriteAllText((Join-Path $tempRoot "[Content_Types].xml"), $contentTypes, [System.Text.UTF8Encoding]::new($false))
[System.IO.File]::WriteAllText((Join-Path $tempRoot "_rels\.rels"), $rels, [System.Text.UTF8Encoding]::new($false))
[System.IO.File]::WriteAllText((Join-Path $tempRoot "word\document.xml"), $documentXml, [System.Text.UTF8Encoding]::new($false))
[System.IO.File]::WriteAllText((Join-Path $tempRoot "word\styles.xml"), $stylesXml, [System.Text.UTF8Encoding]::new($false))
[System.IO.File]::WriteAllText((Join-Path $tempRoot "word\numbering.xml"), $numberingXml, [System.Text.UTF8Encoding]::new($false))
[System.IO.File]::WriteAllText((Join-Path $tempRoot "word\_rels\document.xml.rels"), $wordRels, [System.Text.UTF8Encoding]::new($false))

if (Test-Path $outPath) { Remove-Item -LiteralPath $outPath -Force }
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($tempRoot, $outPath)
Remove-Item -LiteralPath $tempRoot -Recurse -Force
Write-Host $outPath
