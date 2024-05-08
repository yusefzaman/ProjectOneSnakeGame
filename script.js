// global varaibles set at the top of the page.

// baord will get the element that i gave an 'id' of arena.
const board = document.getElementById(`arena`)

// we set the grid size that we want - so we want a 20 by 20.
const gridSize = 20

// we set the start posiiton of the snake - on the 5th unit in the x and y.
let snake = [{ x: 5, y: 5 }]
// the variable apple will be set to whatever is the output of the function created to randomise the apple coordinates.
let apple = generateApple()

// we want to set the default direciton to be left.
let direction = 'left'

// defining the interval of movement and delay.
let snakeInterval
let snakeDelay = 150

// we predefine the value of the variable that will be used in the game initiation funciton.
let snakeInitiate = false

// this function is used to create an new element with the class name that is set - this will be used for either apple or snake.
function createUnit(indentifier, className) {
  const element = document.createElement(indentifier)
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
    const snakeUnit = createUnit('div', 'snake')
    initiatePos(snakeUnit, segment)
    board.appendChild(snakeUnit)
  })
}

// this funciton will create a div for the apple with a class of apple, and then we use the initiatePos function to set this div as the apple coordinates.
function constructApple() {
  const appleUnit = createUnit('div', 'apple')
  initiatePos(appleUnit, apple)
  board.appendChild(appleUnit)
}

// this function is used to generate a random horozontal and y vector to place the apple on. and this is assigned to the x and y coordiante. Math.floor is used to get random intigers, and *10 allows the number returned to be between 0 and 10, and +1 is used so that the value can never be zero.
function generateApple() {
  const x = Math.floor(Math.random() * gridSize) + 1
  const y = Math.floor(Math.random() * gridSize) + 1
  return { x, y }
}

// function that has been created to create snake, apple and grid.
function construct() {
  board.innerHTML = ''
  constructSnake()
  constructApple()
}

// function that will move the snake, we use the spread operator to take the coordinates of the snake and the direction of the snake.
// when we change directions we want the firstPos object sent to the front of the array, so we use the unshift function that does that and puts it in.
// we want to set a condition that if the x and y positions of the snake head and apple are equal, then the apple position randomiser should be run and the preset interval should be cleared.
// we are setting the conditions to only run the snakeDelay if it runs in to the apple, remove the last element and add it to the front of the new direciton
function movement() {
  const firstPos = { ...snake[0] }
  switch (direction) {
    case 'left':
      firstPos.x--
      break
    case 'right':
      firstPos.x++
      break
    case 'up':
      firstPos.y--
      break
    case 'down':
      firstPos.y++
      break
  }
  snake.unshift(firstPos)
  
  if (firstPos.x === apple.x && firstPos.y === apple.y) {
    apple = generateApple()
    increaseSpeed()
    clearInterval(snakeInterval)
    snakeInterval = setInterval(() => {
      movement()
      collisionCheck()
      construct()
    }, snakeDelay)
  } else {
    snake.pop()
  }
}
// when head runs in to an apple, the snake pop is skipped, when not run in to then it will just carry on and unshift and move in the new direction.

// function created to initiate the gameplay, it sets out the sequence of funciton that will be called.
function playGame() {
  snakeInitiate = true
  snakeInterval = setInterval(() => {
    movement()
    collisionCheck()
    construct()
  }, snakeDelay)
}

// event listeners to detect key presses. when a key is pressed then run the function playGame and change the direction to the relevant value.
function keyPressDetector(event) {
  if (
    (!snakeInitiate && event.code === 'Space') ||
    (!snakeInitiate && event.key === '')
  ) {
    playGame()
  } else {
    switch (event.key) {
      case 'UpArrow':
        direction = 'up'
        break
      case 'DownArrow':
        direction = 'down'
        break
      case 'LeftArrow':
        direction = 'left'
        break
      case 'RightArrow':
        direction = 'right'
        break
    }
  }
}

// i add in an event listener to keep listening for a key press and if detected it will run the function created above.
document.addEventListener('keyDown', keyPressDetector)

function increaseSpeed() {
  console.log(snakeDelay)
}
