const board = document.getElementById(`arena`)

let snake = [{x: 12, y:12}];

function construct() {
  board.innerHTML = null;
  constructSnake();
}



