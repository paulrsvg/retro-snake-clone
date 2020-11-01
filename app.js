/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log("hi");

var node = parent.document.createElement("DIV");                 // Create a <li> node
var grid = document.getElementById("grid");
// Append the text to <li>
for( var i=0; i <100; i++){
  grid.innerHTML+='<div></div>';
  //grid.appendChild(node); //can't make multiple elements w/ one id huh. 
}
console.log("grid is ready?");

document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div')
  const scoreDisplay = document.querySelector('span')
  const startBtn = document.querySelector('.start')
  
  const width = 10
  let currentIndex = 0 //1st div in grid is 0
  let fruitIndex = 0
  
  let currentSnake = [2,1,0] // 2= head, 0 = tail, 1 = rest of body
  let direction = 1
  let score = 0
  let speed = 0.8
  let intervalTime = 0
  let interval = 0
  
  //start game
  function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[fruitIndex].classList.remove('fruit')
    clearInterval(interval)
    score = 0
    randomFruit()
    direction=1
    scoreDisplay.innerText = score
    intervalTime = 1000
    currentSnake = [2,1,0]
    currentIndex = 0
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    interval = setInterval(moveOutcomes, intervalTime)
  }
  
  function moveOutcomes() { //deals w/ collisions, getting fruit etc
    if (
      (currentSnake[0] + width >= (width * width) && direction === width) || //hit btm
      (currentSnake[0] % width === width -1 && direction === 1) || // hit R wall
      (currentSnake[0] % width === 0 && direction === -1) || // hit L wall
      (currentSnake[0] - width < 0 && direction === -width) || // hit top
      squares[currentSnake[0] + direction].classList.contains('snake') //hit/eat itself lol
    ) {
        return clearInterval(interval)
    }
    
    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction)
    
    if(squares[currentSnake[0]].classList.contains('fruit')){
      squares[currentSnake[0]].classList.remove('fruit')
      squares[tail].classList.add('snake')
      currentSnake.push(tail)
      randomFruit()
      
      score++
      scoreDisplay.textContent = score
      clearInterval(interval)
      intervalTime = intervalTime * speed
      interval = setInterval(moveOutcomes, intervalTime)
      
    }
    squares[currentSnake[0]].classList.add('snake')
  }
  
  function randomFruit() {
    do {
      fruitIndex = Math.floor(Math.random() * squares.length)
    } while (squares[fruitIndex].classList.contains('snake'))
    squares[fruitIndex].classList.add('fruit')
  }
  
  
  //now keyboard input:
  function control(e) {
    squares[currentIndex].classList.remove('snake')
    if(e.keyCode === 38) direction = -width //up
    else if(e.keyCode === 40) direction = +width //down
    else if(e.keyCode === 37) direction = -1 //left
    else if(e.keyCode === 39) direction = 1 //right
  }
  document.addEventListener('keyup', control)
  startBtn.addEventListener('click', startGame)
  
  
  
})
 
