// global varaibles set at the top of the page.

// baord will get the element that i gave an 'id' of arena.
const board = document.getElementById('game-board')

const instructionText = document.getElementById('instructions')
const logo = document.getElementById('logo')
const score = document.getElementById('score')
const highScoreText = document.getElementById('highScore')

// we set the grid size that we want - so we want a 20 by 20.
const gridSize = 20
// we set the start posiiton of the snake - on the 5th unit in the x and y.
let snake = [{ x: 5, y: 5 }]
// the variable apple will be set to whatever is the output of the function created to randomise the apple coordinates.
let apple = generateApple()
let highScore = 0

// we want to set the default direciton to be left.
let direction = 'right'

// defining the interval of movement and delay.
let snakeInterval
let snakeDelay = 150

// we predefine the value of the variable that will be used in the game initiation funciton.
let initiateSnake = false

// Create a snake or apple cube/div
function createUnit(identifier, className) {
  const element = document.createElement(identifier)
  element.className = className
  return element
}

// this function sets the position of the snake or apple - in the style sheet this will define its position on the grid.
function initiatePos(element, position) {
  element.style.gridColumn = position.x
  element.style.gridRow = position.y
}

// this funciton will define the snake and how it will appear, for each segment it will create every snake element with a div and a snake class.
function constructSnake() {
  snake.forEach((segment) => {
    const snakeElement = createUnit('div', 'snake')
    initiatePos(snakeElement, segment)
    board.appendChild(snakeElement)
  })
}

// this funciton will create a div for the apple with a class of apple, and then we use the initiatePos function to set this div as the apple coordinates - this will only draw when the game is in the start state.
function constructApple() {
  if (initiateSnake) {
    const appleUnit = createUnit('div', 'apple')
    initiatePos(appleUnit, apple)
    board.appendChild(appleUnit)
  }
}

// this function is used to generate a random horozontal and y vector to place the apple on. and this is assigned to the x and y coordiante. Math.floor is used to get random intigers, and *10 allows the number returned to be between 0 and 10, and +1 is used so that the value can never be zero.
function generateApple() {
  const x = Math.floor(Math.random() * gridSize) + 1
  const y = Math.floor(Math.random() * gridSize) + 1
  return { x, y }
}

// this function is used to run the sequence of funcitons required to display the snake, apple and the score.
function draw() {
  board.innerHTML = ''
  constructSnake()
  constructApple()
  updateScore()
}

// function that will move the snake, we use the spread operator to take the coordinates of the snake and the direction of the snake.
function movement() {
  const firstPos = { ...snake[0] }
  switch (direction) {
    case 'up':
      firstPos.y--
      break
    case 'down':
      firstPos.y++
      break
    case 'left':
      firstPos.x--
      break
    case 'right':
      firstPos.x++
      break
  }
  // when we change directions we want the firstPos object sent to the front of the array, so we use the unshift function that does that and puts it in.
  snake.unshift(firstPos)
  // we want to set a condition that if the x and y positions of the snake firstPos and apple are equal, then the apple position randomiser should be run and the preset interval should be cleared.
  if (firstPos.x === apple.x && firstPos.y === apple.y) {
    apple = generateApple()
    increaseSpeed()
    clearInterval(snakeInterval) // Clear past interval
    snakeInterval = setInterval(() => {
      movement()
      checkCollision()
      draw()
    }, snakeDelay)
    // we are setting the conditions to only run the snakeDelay if it runs in to the apple, remove the last element and add it to the front of the new direciton
  } else {
    snake.pop()
  }
}
// when firstPos runs in to an apple, the snake pop is skipped, when not run in to then it will just carry on and unshift and move in the new direction.

// function created to initiate the gameplay, it sets out the sequence of funciton that will be called.
function startGame() {
  initiateSnake = true
  instructionText.style.display = 'none'
  logo.style.display = 'none'
  snakeInterval = setInterval(() => {
    movement()
    checkCollision()
    draw()
  }, snakeDelay)
}

// event listeners to detect key presses. when a key is pressed then run the function playGame and change the direction to the relevant value.
function handleKeyPress(event) {
  if (
    (!initiateSnake && event.code === 'Space') ||
    (!initiateSnake && event.key === ' ')
  ) {
    startGame()
  } else {
    switch (event.key) {
      case 'ArrowUp':
        direction = 'up'
        break
      case 'ArrowDown':
        direction = 'down'
        break
      case 'ArrowLeft':
        direction = 'left'
        break
      case 'ArrowRight':
        direction = 'right'
        break
    }
  }
}

// we add in an event listener to keep listening for a key press and if detected it will run the function created above.
document.addEventListener('keydown', handleKeyPress)

// the following funciton is used to regulate the speed, so that it isnt increating at a too high rate so that the game is still playable.
function increaseSpeed() {
  if (snakeDelay > 150) {
    snakeDelay -= 5
  } else if (snakeDelay > 100) {
    snakeDelay -= 3
  } else if (snakeDelay > 50) {
    snakeDelay -= 2
  } else if (snakeDelay > 25) {
    snakeDelay -= 1
  }
}

// the following collistion is created to check if the snake firstPos hits the wall or itself.
function checkCollision() {
  const firstPos = snake[0]
  // the logic has been added to recognise that the firstPos coordinates hits zero or hits the max grid size then it will reset the game.
  if (firstPos.x < 1 || firstPos.x > gridSize || firstPos.y < 1 || firstPos.y > gridSize) {
    resetGame()
  }
  // we are checking that if the firstPos coordinates and snake body coordinates, then we will resest the game as this means it has hit itself.
  for (let i = 1; i < snake.length; i++) {
    if (firstPos.x === snake[i].x && firstPos.y === snake[i].y) {
      resetGame()
    }
  }
}
