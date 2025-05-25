let boardState = 
    [['', '', ''],
    ['', '', ''],
    ['', '', '']];

const board = document.querySelector(".board");
const btn = document.querySelector(".reset");
let turn = 0;

function setup(){
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            board.appendChild(cell);
        }
    }
}

function updateBoard(){
    board.addEventListener('click', (e)=>{
        const target = e.target;
        if(!target.classList.contains('cell')) return;
        const row = target.dataset.row;
        const col = target.dataset.col;

        if(boardState[row][col] !== '') return;
        else{
            if(turn%2 == 0){
                boardState[row][col] = 'X';
                target.classList.add('x');
                target.textContent = 'X';                
                turn++;
            }
            else{
                boardState[row][col] = 'O';
                target.classList.add('o');
                target.textContent = 'O';                
                turn++;
            }
        }
        let win = checkWin();
        if(win !== null){
            winbox = document.querySelector(".winbox");
            winbox.textContent = `${win} wins!`;
        }
        turnHandler();
    })
    
}

function checkWin(){
    for(let row = 0; row < 3; row++){
        if(boardState[row][0] !== '' && boardState[row][0] === boardState[row][1] && boardState[row][1] === boardState[row][2]){
            return boardState[row][0];
        }
    }
    for(let col = 0; col < 3; col++){
        if(boardState[0][col] !== '' && boardState[0][col] === boardState[1][col] && boardState[1][col] === boardState[2][col]){
            return boardState[0][col];
        }
    }
    
    if(boardState[0][0] !== '' && boardState[0][0] === boardState[1][1] && boardState[1][1] === boardState[2][2]){
        return boardState[0][0];
    }
    if(boardState[0][2] !== '' && boardState[0][2] === boardState[1][1] && boardState[1][1] === boardState[2][0]){
        return boardState[0][2];
    }
    return null;
}

function turnHandler(){
    currentPlayer = document.querySelector(".currentPlayer");
    if(turn%2 == 0) currentPlayer.textContent = 'X';
    else currentPlayer.textContent = 'O';
}

function reset(){
    btn.addEventListener('click', () => location.reload());
}

setup();
updateBoard();
reset();
