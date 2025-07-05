// 井字棋核心逻辑
const board = document.getElementById('tic-tac-toe-board');
const statusEl = document.getElementById('tic-tac-toe-status');
const restartBtn = document.getElementById('tic-tac-toe-restart-btn');

let cells, turn, finished;

function startGame() {
  cells = Array(9).fill('');
  turn = 'X';
  finished = false;
  statusEl.textContent = '当前回合：' + turn;
  render();
}

function render() {
  board.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.style.background = '#fff';
    cell.style.display = 'flex';
    cell.style.alignItems = 'center';
    cell.style.justifyContent = 'center';
    cell.style.fontSize = '2.2rem';
    cell.style.fontWeight = 'bold';
    cell.style.borderRadius = '6px';
    cell.style.cursor = cells[i] || finished ? 'default' : 'pointer';
    cell.style.userSelect = 'none';
    cell.textContent = cells[i];
    cell.onclick = () => move(i);
    board.appendChild(cell);
  }
}

function move(idx) {
  if (finished || cells[idx]) return;
  cells[idx] = turn;
  render();
  if (checkWin(turn)) {
    statusEl.textContent = turn + ' 获胜！';
    finished = true;
  } else if (cells.every(c => c)) {
    statusEl.textContent = '平局！';
    finished = true;
  } else {
    turn = turn === 'X' ? 'O' : 'X';
    statusEl.textContent = '当前回合：' + turn;
  }
}

function checkWin(t) {
  const winLines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winLines.some(line => line.every(i => cells[i] === t));
}

restartBtn.onclick = startGame;

startGame(); 