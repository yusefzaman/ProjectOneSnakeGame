const board = document.getElementById(`arena`)

let snake = [{ x: 5, y: 5 }]

function construct() {
  board.innerHTML = ''
  constructSnake()
}

function constructSnake() {
  snake.forEach((segment) => {
    const snakeUnit = createSnakeUnit('div', 'snake')
    initiatePos(snakeUnit, segment)
    board.appendChild(snakeUnit)
  })
}

function createSnakeUnit(indentifier, className) {
  const element = document.createElement(indentifier)
  element.className = className
  return element
}

function initiatePos(element, position) {
  element.style.gridColumn = position.x
  element.style.gridRow = position.y
}

constructSnake()
