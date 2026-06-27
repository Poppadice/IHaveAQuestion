const body = document.body;
const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const question = document.getElementById('question');
const answers = document.getElementById('answers');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');

let noButtonOffset = { x: 0, y: 0 };
let isQuestionVisible = false;

function showElement(element) {
  element.classList.add('visible');
}

function startSequence() {
  setTimeout(() => {
    showElement(line2);
  }, 3200);

  setTimeout(() => {
    body.classList.add('white-scene');
    line1.classList.remove('visible');
    line2.classList.remove('visible');
    showElement(question);
    showElement(answers);
    isQuestionVisible = true;
  }, 7600);
}

function setNoTransform(x, y) {
  noButtonOffset = { x, y };
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

function moveNoButtonAway(mouseX, mouseY) {
  const btnRect = noBtn.getBoundingClientRect();
  const centerX = btnRect.left + btnRect.width / 2;
  const centerY = btnRect.top + btnRect.height / 2;
  const dx = centerX - mouseX;
  const dy = centerY - mouseY;
  const distance = Math.hypot(dx, dy);

  if (distance < 160) {
    const angle = Math.atan2(dy, dx);
    const moveDistance = 120 + Math.random() * 40;

    let nextX = noButtonOffset.x + Math.cos(angle) * moveDistance;
    let nextY = noButtonOffset.y + Math.sin(angle) * moveDistance;

    const answerRect = answers.getBoundingClientRect();
    const maxOffsetX = answerRect.width / 2 - btnRect.width / 2 - 10;
    const maxOffsetY = 50;

    nextX = Math.max(Math.min(nextX, maxOffsetX), -maxOffsetX);
    nextY = Math.max(Math.min(nextY, maxOffsetY), -maxOffsetY);

    setNoTransform(nextX, nextY);
  }
}

function createConfettiPiece(color) {
  const piece = document.createElement('span');
  piece.className = 'confetti-piece';
  piece.style.background = color;
  piece.style.left = `${Math.random() * 100}vw`;
  piece.style.animationDuration = `${1.8 + Math.random() * 1.2}s`;
  piece.style.animationDelay = `${Math.random() * 0.3}s`;
  piece.style.transform = `rotate(${Math.random() * 360}deg)`;
  return piece;
}

function launchConfetti() {
  const confettiContainer = document.createElement('div');
  confettiContainer.className = 'confetti-container';

  const colors = ['#ff91c5', '#ffd1f0', '#ff82a8', '#ffb0d6', '#f5a1ff'];
  for (let i = 0; i < 28; i += 1) {
    confettiContainer.appendChild(createConfettiPiece(colors[i % colors.length]));
  }

  body.appendChild(confettiContainer);
  body.classList.add('celebrate');

  setTimeout(() => {
    confettiContainer.remove();
    body.classList.remove('celebrate');
  }, 3000);
}

yesBtn.addEventListener('click', () => {
  question.textContent = '😳 Text me at (337) 303-5564';
  yesBtn.disabled = true;
  noBtn.disabled = true;
  setNoTransform(0, 0);
  yesBtn.style.transform = 'scale(1.05)';
  launchConfetti();
});

window.addEventListener('mousemove', (event) => {
  if (!isQuestionVisible || noBtn.disabled) {
    return;
  }
  moveNoButtonAway(event.clientX, event.clientY);
});

window.addEventListener('load', startSequence);

