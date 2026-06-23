$ErrorActionPreference = 'Stop'
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
$css = Get-Content (Join-Path $dir 'style.css') -Raw -Encoding UTF8
$js = Get-Content (Join-Path $dir 'main.js') -Raw -Encoding UTF8

$html = @"
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>生物基礎クイズ</title>
  <style>
$css
  </style>
</head>
<body tabindex="0">
  <div class="viewport">
    <div class="game-screen" id="gameScreen">
      <section class="screen screen-title" id="screenTitle">
        <div class="box-frame">
          <div class="box-inner">
            <h1 class="game-title">生物基礎</h1>
            <p class="game-subtitle">４択クイズ</p>
            <div class="title-divider">━━━━━━━━━━━━</div>
            <p class="menu-item selected" id="startItem">
              <span class="cursor">▶</span> START
            </p>
            <p class="hint-text">Enter で開始</p>
          </div>
        </div>
        <p class="copyright">© BIO QUIZ 2026</p>
      </section>

      <section class="screen screen-quiz hidden" id="screenQuiz">
        <div class="box-frame">
          <div class="box-inner">
            <div class="status-bar">
              <span id="questionCounter">Q.1/5</span>
              <span id="scoreDisplay">SCORE: 0</span>
            </div>
            <div class="question-area">
              <p class="question-label">問題</p>
              <p class="question-text" id="questionText"></p>
            </div>
            <div class="choices-area" id="choicesArea"></div>
            <p class="hint-text">↑↓ で選択　Enter で決定</p>
          </div>
        </div>
      </section>

      <section class="screen screen-result hidden" id="screenResult">
        <div class="box-frame">
          <div class="box-inner result-inner">
            <p class="result-label" id="resultLabel">正解！</p>
            <div class="result-divider">────────────</div>
            <p class="result-answer" id="resultAnswer"></p>
            <p class="explanation-text" id="explanationText"></p>
            <p class="hint-text">Enter で次へ</p>
          </div>
        </div>
      </section>

      <section class="screen screen-score hidden" id="screenScore">
        <div class="box-frame">
          <div class="box-inner score-inner">
            <h2 class="score-title">RESULT</h2>
            <div class="score-divider">━━━━━━━━━━━━</div>
            <p class="score-value" id="finalScore">0 / 5</p>
            <p class="score-rank" id="scoreRank"></p>
            <div class="score-divider">━━━━━━━━━━━━</div>
            <p class="menu-item selected" id="retryItem">
              <span class="cursor">▶</span> RETRY
            </p>
            <p class="hint-text">Enter でリトライ</p>
          </div>
        </div>
      </section>
    </div>
  </div>
  <script>
$js
  </script>
</body>
</html>
"@

[System.IO.File]::WriteAllText((Join-Path $dir 'index.html'), $html, [System.Text.UTF8Encoding]::new($false))
