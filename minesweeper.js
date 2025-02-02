document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
   cells: []
 } 
var reset = document.querySelector('.reset');
var explosion = new Audio('sounds/explosion.wav');
var victory = new Audio('sounds/victory.wav');
var select = new Audio('sounds/select.wav');
var flag = new Audio('sounds/flag.wav');




document.addEventListener('click', function () {
  checkForWin();
  select.play();
});
document.addEventListener('contextmenu', function () {
  checkForWin();
  flag.play();
});
reset.addEventListener('click', function () {
  location.reload();
});


function startGame () {
  // Don't remove this function call: it makes the game work!
  generateBoard(board);
  
  for (i = 0; i < board.cells.length; i++){
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }

  
  lib.initBoard()
}

//Generate Board
function generateBoard(obj) {
  for (i = 0; i < 6; i++){
    for (y = 0; y < 6; y++){
      obj.cells.push({ row: i, col: y, isMine: (Math.random() > 0.9), hidden: true });
    }
  }
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for (i = 0; i < board.cells.length; i++) {
    if (!(board.cells[i].isMine) && (board.cells[i].hidden)) {
      return
    } else if ((board.cells[i].isMine) && !(board.cells[i].isMarked)) {
      return
    }
  }
  
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  lib.displayMessage('You win!')
  victory.play();
}



// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
  var count = 0;
  var surroundingCells = getSurroundingCells(cell.row, cell.col);
  surroundingCells.forEach(element => {
    if (element.isMine) {
      count++;
    }
  });
  
  return count;
}

