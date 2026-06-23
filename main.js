/**
 * 生物基礎 4択クイズ
 * キーボード操作: ↑↓ で選択、Enter で決定
 * ※ 編集後は index.html 内の script も同じ内容に更新してください
 */

const questions = [
  {
    id: 1,
    question: 'DNAの塩基の組み合わせとして正しいものはどれか？',
    choices: ['AとT', 'AとG', 'CとT', 'GとT'],
    answer: 0,
    explanation: 'AとT、GとCが塩基対を形成する。',
  },
  {
    id: 2,
    question: '細胞内でエネルギー通貨として使われる物質はどれか？',
    choices: ['DNA', 'ATP', 'RNA', 'グルコース'],
    answer: 1,
    explanation: 'ATP（アデノシン三リン酸）は細胞内でエネルギーを運ぶ。',
  },
  {
    id: 3,
    question: '光合成が行われる細胞小器官はどれか？',
    choices: ['ミトコンドリア', 'リボソーム', '葉緑体', '液胞'],
    answer: 2,
    explanation: '葉緑体にクロロフィルがあり、光合成を行う。',
  },
  {
    id: 4,
    question: '遺伝情報をDNAからタンパク質へ伝える物質はどれか？',
    choices: ['mRNA', 'tRNA', 'rRNA', 'snRNA'],
    answer: 0,
    explanation: 'mRNA（メッセンジャーRNA）がDNAの遺伝情報をリボソームへ運ぶ。',
  },
  {
    id: 5,
    question: '細胞分裂（体細胞分裂）の最終段階で起こることはどれか？',
    choices: ['同源染色体の分離', '姉妹染色分体の分離', 'DNAの複製', '交叉の起こり'],
    answer: 1,
    explanation: '体細胞分裂の後期〜終期で姉妹染色分体が分離し、2つの細胞になる。',
  },
];

const CHOICE_LABELS = ['A', 'B', 'C', 'D'];

const state = {
  screen: 'title',
  currentIndex: 0,
  selectedChoice: 0,
  score: 0,
  lastAnswer: null,
};

let screens;
let elements;

function initApp() {
  screens = {
    title: document.getElementById('screenTitle'),
    quiz: document.getElementById('screenQuiz'),
    result: document.getElementById('screenResult'),
    score: document.getElementById('screenScore'),
  };

  elements = {
    questionCounter: document.getElementById('questionCounter'),
    scoreDisplay: document.getElementById('scoreDisplay'),
    questionText: document.getElementById('questionText'),
    choicesArea: document.getElementById('choicesArea'),
    resultLabel: document.getElementById('resultLabel'),
    resultAnswer: document.getElementById('resultAnswer'),
    explanationText: document.getElementById('explanationText'),
    finalScore: document.getElementById('finalScore'),
    scoreRank: document.getElementById('scoreRank'),
  };

  document.addEventListener('keydown', handleKeydown);
  document.body.focus();
  showScreen('title');
}

function showScreen(name) {
  Object.values(screens).forEach((el) => el.classList.add('hidden'));
  screens[name].classList.remove('hidden');
  state.screen = name;
}

function renderQuiz() {
  const q = questions[state.currentIndex];
  const total = questions.length;

  elements.questionCounter.textContent = 'Q.' + (state.currentIndex + 1) + '/' + total;
  elements.scoreDisplay.textContent = 'SCORE: ' + state.score;
  elements.questionText.textContent = q.question;

  elements.choicesArea.innerHTML = q.choices
    .map(function (choice, i) {
      var selected = i === state.selectedChoice ? ' selected' : '';
      return (
        '<p class="choice-item' + selected + '">' +
        '<span class="cursor">▶</span>' +
        '<span class="choice-label">' + CHOICE_LABELS[i] + '.</span>' +
        escapeHtml(choice) +
        '</p>'
      );
    })
    .join('');
}

function renderResult(isCorrect) {
  const q = questions[state.currentIndex];
  const correctLabel = CHOICE_LABELS[q.answer];
  const correctText = q.choices[q.answer];

  elements.resultLabel.textContent = isCorrect ? '正解！' : '不正解…';
  elements.resultLabel.className = 'result-label ' + (isCorrect ? 'correct' : 'incorrect');

  if (isCorrect) {
    elements.resultAnswer.innerHTML = correctLabel + '. ' + escapeHtml(correctText);
  } else {
    const chosen = CHOICE_LABELS[state.lastAnswer];
    const chosenText = q.choices[state.lastAnswer];
    elements.resultAnswer.innerHTML =
      'あなたの回答: ' + chosen + '. ' + escapeHtml(chosenText) +
      '<br>正解: ' + correctLabel + '. ' + escapeHtml(correctText);
  }

  elements.explanationText.textContent = q.explanation || '';
}

function renderScore() {
  const total = questions.length;
  elements.finalScore.textContent = state.score + ' / ' + total;
  elements.scoreRank.textContent = getRankMessage(state.score, total);
}

function getRankMessage(score, total) {
  const ratio = score / total;
  if (ratio === 1) return '★ パーフェクト！ ★';
  if (ratio >= 0.8) return 'よくできました！';
  if (ratio >= 0.6) return 'もう少し！';
  if (ratio >= 0.4) return '復習しよう';
  return 'がんばろう！';
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function startQuiz() {
  state.currentIndex = 0;
  state.selectedChoice = 0;
  state.score = 0;
  showScreen('quiz');
  renderQuiz();
}

function submitAnswer() {
  const q = questions[state.currentIndex];
  state.lastAnswer = state.selectedChoice;
  const isCorrect = state.selectedChoice === q.answer;

  if (isCorrect) {
    state.score += 1;
  }

  renderResult(isCorrect);
  showScreen('result');
}

function nextQuestion() {
  state.currentIndex += 1;

  if (state.currentIndex >= questions.length) {
    renderScore();
    showScreen('score');
    return;
  }

  state.selectedChoice = 0;
  showScreen('quiz');
  renderQuiz();
}

function moveSelection(delta) {
  const count = questions[state.currentIndex].choices.length;
  state.selectedChoice = (state.selectedChoice + delta + count) % count;
  renderQuiz();
}

function handleKeydown(event) {
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Enter') {
    event.preventDefault();
  }

  switch (state.screen) {
    case 'title':
      if (event.key === 'Enter') startQuiz();
      break;
    case 'quiz':
      if (event.key === 'ArrowUp') moveSelection(-1);
      else if (event.key === 'ArrowDown') moveSelection(1);
      else if (event.key === 'Enter') submitAnswer();
      break;
    case 'result':
      if (event.key === 'Enter') nextQuestion();
      break;
    case 'score':
      if (event.key === 'Enter') showScreen('title');
      break;
    default:
      break;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
