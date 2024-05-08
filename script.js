const board = document.getElementById(`arena`)

const gridSize = 20
let snake = [{ horizontal: 5, vertical: 5 }]
let apple = generateApple()

function construct() {
  board.innerHTML = ''
  constructSnake()
  placeApple()
}

function constructSnake() {
  snake.forEach((segment) => {
    const snakeUnit = createUnit('div', 'snake')
    initiatePos(snakeUnit, segment)
    board.appendChild(snakeUnit)
  })
}

function createUnit(indentifier, className) {
  const element = document.createElement(indentifier)
  element.className = className
  return element
}

function initiatePos(element, position) {
  element.style.gridColumn = position.horizontal
  element.style.gridRow = position.vertical
}

function generateApple() {
  const horizontal = Math.floor(Math.random() * gridSize) + 1;
  const vertical = Math.floor(Math.random() * gridSize) + 1;
  return {horizontal, vertical};
}

function placeApple() {
  const appleUnit = createUnit('div', 'apple')
  initiatePos(appleUnit, apple)
  board.appendChild(appleUnit)
}
