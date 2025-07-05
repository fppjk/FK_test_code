// 贪吃蛇核心逻辑
const canvas = document.getElementById('snake-canvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('snake-score');
const startBtn = document.getElementById('snake-start-btn');

const SIZE = 20; // 格子大小
const COUNT = 20; // 20x20
let snake, food, dir, nextDir, score, timer, isOver;

function resetGame() {
  snake = [
    {x: 8, y: 10},
    {x: 7, y: 10},
    {x: 6, y: 10}
  ];
  dir = {x: 1, y: 0};
  nextDir = dir;
  score = 0;
  isOver = false;
  placeFood();
  scoreEl.textContent = '分数：' + score;
  clearInterval(timer);
  timer = setInterval(gameLoop, 120);
}

function placeFood() {
  while (true) {
    food = {
      x: Math.floor(Math.random() * COUNT),
      y: Math.floor(Math.random() * COUNT)
    };
    if (!snake.some(s => s.x === food.x && s.y === food.y)) break;
  }
}

function gameLoop() {
  if (isOver) return;
  dir = nextDir;
  const head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};
  // 撞墙
  if (head.x < 0 || head.x >= COUNT || head.y < 0 || head.y >= COUNT) {
    gameOver();
    return;
  }
  // 撞自己
  if (snake.some(s => s.x === head.x && s.y === head.y)) {
    gameOver();
    return;
  }
  snake.unshift(head);
  // 吃到食物
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreEl.textContent = '分数：' + score;
    placeFood();
  } else {
    snake.pop();
  }
  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 画蛇
  ctx.fillStyle = '#4caf50';
  snake.forEach((s, i) => {
    ctx.fillRect(s.x * SIZE, s.y * SIZE, SIZE - 2, SIZE - 2);
  });
  // 画食物
  ctx.fillStyle = '#ff5722';
  ctx.fillRect(food.x * SIZE, food.y * SIZE, SIZE - 2, SIZE - 2);
}

function gameOver() {
  isOver = true;
  clearInterval(timer);
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  ctx.font = '32px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('游戏结束', canvas.width / 2, canvas.height / 2);
}

document.addEventListener('keydown', e => {
  if (isOver) return;
  if (e.key === 'ArrowUp' && dir.y !== 1) nextDir = {x: 0, y: -1};
  else if (e.key === 'ArrowDown' && dir.y !== -1) nextDir = {x: 0, y: 1};
  else if (e.key === 'ArrowLeft' && dir.x !== 1) nextDir = {x: -1, y: 0};
  else if (e.key === 'ArrowRight' && dir.x !== -1) nextDir = {x: 1, y: 0};
});

startBtn.onclick = resetGame;

// 自动开始一局
resetGame(); 