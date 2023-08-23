const grid = document.querySelector(".grid");
const scoreDisplay = document.getElementById("score");
const startButton = document.getElementById("start-game");

let squares = Array.from(document.querySelectorAll(".grid div"));
const width = 10;

// the tetrominoes
const lTetromino = [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2, width * 2 + 1],
  [width, width * 2, width * 2 + 1, width * 2 + 2],
];

const zTetromino = [
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [1, width + 1, width + 2, width * 2 + 2],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [1, width + 1, width + 2, width * 2 + 2],
];

const tTetromino = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1],
];

const oTetromino = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
];

const iTetromino = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
];

const theTetrominoes = [
  lTetromino,
  zTetromino,
  tTetromino,
  oTetromino,
  iTetromino,
];

let currentPosition = 4;
let currentRotation = 0;

//randomly select a tetromino and it's first rotation
let random = Math.floor(Math.random() * theTetrominoes.length);
console.log(theTetrominoes);
console.log(random);
let current = theTetrominoes[random][currentRotation];

// draw the first rotation in the first tetronimmo
function draw() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.add("tetromino");
  });
}
draw();

//undraw the tetronimo
function undraw() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.remove("tetromino");
  });
}

// make the tetromino to move down every second
timerID = setInterval(moveDown, 500);

//assign functions to keyCode:
function control(e) {
  if (e.key === "ArrowLeft") {
    moveLeft();
  } else if (e.key === "ArrowRight") {
    moveRight();
  } else if (e.key === "ArrowUp") {
    rotate();
  } else if (e.key === "ArrowDown") {
    moveDown();
  }
}

document.addEventListener("keyup", control);

function moveDown() {
  undraw();
  currentPosition += width;
  draw();
  freeze();
}
//freeze function
function freeze() {
  if (
    current.some((index) =>
      squares[currentPosition + index + width].classList.contains("taken")
    )
  ) {
    current.forEach((index) =>
      squares[currentPosition + index].classList.add("taken")
    );
    //start a new tetromino falling:
    random = Math.floor(Math.random() * theTetrominoes.length);
    current = theTetrominoes[random][currentRotation];
    currentPosition = 4;
    draw();
  }
}

//move the tetromino left until it reaches the edge:
function moveLeft() {
  undraw();
  const isAtLeftEdge = current.some(
    (index) => (currentPosition + index) % width === 0
  );
  if (!isAtLeftEdge) {
    currentPosition -= 1;
  }
  if (
    current.some((index) =>
      squares[currentPosition + index].classList.contains("taken")
    )
  ) {
    currentPosition += 1;
  }
  draw();
}

function moveRight() {
  undraw();
  const isAtRightEdge = current.some(
    (index) => (currentPosition + index) % width === width - 1
  );
  if (!isAtRightEdge) {
    currentPosition += 1;
  }
  if (
    current.some((index) =>
      squares[currentPosition + index].classList.contains("taken")
    )
  ) {
    currentPosition -= 1;
  }
  draw();
}

//rotate the teromino
function rotate() {
  undraw();
  currentRotation++;
  //if the current rotation goes to 4, make it go back to 0
  if (currentRotation === current.length) {
    currentRotation = 0;
  }
  current = theTetrominoes[random][currentRotation];
  draw();
}
