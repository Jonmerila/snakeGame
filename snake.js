//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var context;
var board;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var snakeBody = [];

//food
var foodX;
var foodY;

var velocityX = 0;
var velocityY = 0;

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d"); //used for drawing the board

  placeFood();
  document.addEventListener("keyup", changeDirection);
  //update();
  setInterval(update, 1500 / 10);
};

function changeDirection(e) {
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}

function update() {
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    console.log(snakeBody);
    placeFood();
  }

  for (let i = snakeBody.length; i >= 1; i--) {
    if (i > 1) {
      snakeBody[i - 1] = snakeBody[i - 2];
    } else {
      snakeBody[0] = [snakeX, snakeY];
    }
  }

  context.fillStyle = "lime";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}