// 拼图游戏核心逻辑
const board = document.getElementById('puzzle-board');
const stepsEl = document.getElementById('puzzle-steps');
const startBtn = document.getElementById('puzzle-start-btn');
const diffSel = document.getElementById('puzzle-difficulty');

let size = 3, tiles = [], empty, steps = 0, finished = false;

diffSel.onchange = () => {
  size = parseInt(diffSel.value);
  startGame();
};

startBtn.onclick = startGame;

function startGame() {
  size = parseInt(diffSel.value);
  steps = 0;
  finished = false;
  stepsEl.textContent = '步数：' + steps;
  // 生成拼块
  tiles = [];
  for (let i = 0; i < size * size - 1; i++) tiles.push(i + 1);
  shuffle(tiles);
  tiles.push(0); // 空白
  empty = tiles.length - 1;
  render();
}

function shuffle(arr) {
  // 保证可解性
  do {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  } while (!isSolvable(arr.concat(0), size));
}

function isSolvable(arr, n) {
  let inv = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] && arr[j] && arr[i] > arr[j]) inv++;
    }
  }
  if (n % 2 === 1) return inv % 2 === 0;
  const row = Math.floor(arr.indexOf(0) / n);
  return (inv + row) % 2 === 1;
}

function render() {
  board.innerHTML = '';
  board.style.gridTemplateColumns = `repeat(${size},1fr)`;
  board.style.gridTemplateRows = `repeat(${size},1fr)`;
  tiles.forEach((num, idx) => {
    const cell = document.createElement('div');
    cell.style.background = num ? '#90caf9' : 'transparent';
    cell.style.display = 'flex';
    cell.style.alignItems = 'center';
    cell.style.justifyContent = 'center';
    cell.style.fontSize = '1.5rem';
    cell.style.fontWeight = 'bold';
    cell.style.borderRadius = '6px';
    cell.style.cursor = num ? 'pointer' : 'default';
    cell.style.userSelect = 'none';
    cell.textContent = num ? num : '';
    cell.onclick = () => move(idx);
    board.appendChild(cell);
  });
}

function move(idx) {
  if (finished) return;
  const ex = empty % size, ey = Math.floor(empty / size);
  const cx = idx % size, cy = Math.floor(idx / size);
  if ((Math.abs(ex - cx) + Math.abs(ey - cy)) === 1) {
    [tiles[empty], tiles[idx]] = [tiles[idx], tiles[empty]];
    empty = idx;
    steps++;
    stepsEl.textContent = '步数：' + steps;
    render();
    if (checkWin()) {
      finished = true;
      setTimeout(() => alert('恭喜完成拼图！'), 100);
    }
  }
}

function checkWin() {
  for (let i = 0; i < tiles.length - 1; i++) {
    if (tiles[i] !== i + 1) return false;
  }
  return tiles[tiles.length - 1] === 0;
}

startGame(); 