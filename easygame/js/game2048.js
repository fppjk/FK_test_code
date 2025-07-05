// 2048核心逻辑
const board = document.getElementById('game2048-board');
const scoreEl = document.getElementById('game2048-score');
const startBtn = document.getElementById('game2048-start-btn');

let grid, score, finished;

startBtn.onclick = startGame;

document.addEventListener('keydown', e => {
  if (finished) return;
  if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) {
    e.preventDefault();
    move(e.key.replace('Arrow','').toLowerCase());
  }
});

function startGame() {
  grid = Array(4).fill(0).map(()=>Array(4).fill(0));
  score = 0;
  finished = false;
  scoreEl.textContent = '分数：' + score;
  addTile(); addTile();
  render();
}

function addTile() {
  let empty = [];
  for(let i=0;i<4;i++) for(let j=0;j<4;j++) if(!grid[i][j]) empty.push([i,j]);
  if(empty.length) {
    const [i,j] = empty[Math.floor(Math.random()*empty.length)];
    grid[i][j] = Math.random()<0.9?2:4;
  }
}

function render() {
  board.innerHTML = '';
  for(let i=0;i<4;i++) for(let j=0;j<4;j++) {
    const cell = document.createElement('div');
    cell.style.background = grid[i][j] ? '#ffd54f' : '#eee';
    cell.style.display = 'flex';
    cell.style.alignItems = 'center';
    cell.style.justifyContent = 'center';
    cell.style.fontSize = '1.5rem';
    cell.style.fontWeight = 'bold';
    cell.style.borderRadius = '6px';
    cell.textContent = grid[i][j] ? grid[i][j] : '';
    board.appendChild(cell);
  }
}

function move(dir) {
  let moved = false;
  let merged = Array(4).fill(0).map(()=>Array(4).fill(false));
  function slide(i,j,di,dj) {
    if(!grid[i][j]) return false;
    let ni=i+di, nj=j+dj;
    while(ni>=0&&ni<4&&nj>=0&&nj<4) {
      if(!grid[ni][nj]) {
        grid[ni][nj]=grid[i][j]; grid[i][j]=0;
        i=ni; j=nj; ni+=di; nj+=dj; moved=true;
      } else if(grid[ni][nj]===grid[i][j]&&!merged[ni][nj]) {
        grid[ni][nj]*=2; score+=grid[ni][nj]; grid[i][j]=0; merged[ni][nj]=true; moved=true; break;
      } else break;
    }
  }
  if(dir==='up')   for(let j=0;j<4;j++) for(let i=1;i<4;i++) slide(i,j,-1,0);
  if(dir==='down') for(let j=0;j<4;j++) for(let i=2;i>=0;i--) slide(i,j,1,0);
  if(dir==='left') for(let i=0;i<4;i++) for(let j=1;j<4;j++) slide(i,j,0,-1);
  if(dir==='right')for(let i=0;i<4;i++) for(let j=2;j>=0;j--) slide(i,j,0,1);
  if(moved) {
    addTile();
    scoreEl.textContent = '分数：' + score;
    render();
    if (isGameOver()) {
      finished = true;
      setTimeout(()=>alert('游戏结束！'), 100);
    }
  }
}

function isGameOver() {
  for(let i=0;i<4;i++) for(let j=0;j<4;j++) {
    if(!grid[i][j]) return false;
    if(i<3 && grid[i][j]===grid[i+1][j]) return false;
    if(j<3 && grid[i][j]===grid[i][j+1]) return false;
  }
  return true;
}

startGame(); 