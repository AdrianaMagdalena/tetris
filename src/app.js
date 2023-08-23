const grid = document.querySelector(".grid");
const scoreDisplay = document.getElementById("score");
const startButton = document.getElementById("start-game");

let squares = Array.from(document.querySelectorAll(".grid div"));
const width = 10;
let nextRandom = 0;
let timerID;
let fallingSpeed = 500;
let score = 0;
const colors = ["#91AA88", "#ECCB83", "#90AACB", "#D996B9", "#D86F74"];

// the tetrominoes
const lTetromino = [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2, width * 2 + 1],
  [width, width * 2, width * 2 + 1, width * 2 + 2],
];

const zTetromino = [
  [1, width + 1, width + 2, width * 2 + 2],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [1, width + 1, width + 2, width * 2 + 2],
  [width + 1, width + 2, width * 2, width * 2 + 1],
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
    squares[currentPosition + index].style.backgroundColor = colors[random];
  });
}
draw();

//undraw the tetronimo
function undraw() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.remove("tetromino");
    squares[currentPosition + index].style.backgroundColor = "";
  });
}

// make the tetromino to move down every second
// timerID = setInterval(moveDown, fallingSpeed);

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
    random = nextRandom;
    nextRandom = Math.floor(Math.random() * theTetrominoes.length);
    current = theTetrominoes[random][currentRotation];
    currentPosition = 4;
    draw();
    displayShape();
    addScore();
    gameOver();
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

const displaySqaures = document.querySelectorAll(".minigrid div");
const displayWidth = 4;
let displayIndex = 0;

const upNextTetrominoes = [
  [1, displayWidth + 1, displayWidth * 2 + 1, 2],
  [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
  [1, displayWidth, displayWidth + 1, displayWidth + 2],
  [0, 1, displayWidth, displayWidth + 1],
  [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
];

function displayShape() {
  displaySqaures.forEach((square) => {
    square.classList.remove("tetromino");
    square.style.backgroundColor = "";
  });
  upNextTetrominoes[nextRandom].forEach((index) => {
    displaySqaures[displayIndex + index].classList.add("tetromino");
    displaySqaures[displayIndex + index].style.backgroundColor =
      colors[nextRandom];
  });
}

startButton.addEventListener("click", () => {
  if (timerID) {
    startButton.innerHTML = "Resume";
    clearInterval(timerID);
    timerID = null;
  } else {
    startButton.innerHTML = "Pause";
    draw();
    timerID = setInterval(moveDown, fallingSpeed);
    nextRandom = Math.floor(Math.random() * theTetrominoes.length);
    displayShape();
  }
});

function addScore() {
  for (let i = 0; i < 200; i += width) {
    const row = [
      i,
      i + 1,
      i + 2,
      i + 3,
      i + 4,
      i + 5,
      i + 6,
      i + 7,
      i + 8,
      i + 9,
    ];
    if (row.every((index) => squares[index].classList.contains("taken"))) {
      score += 10;
      scoreDisplay.innerHTML = score;
      row.forEach((index) => {
        squares[index].classList.remove("taken");
        squares[index].classList.remove("tetromino");
        squares[index].style.backgroundColor = "";
      });

      const squaresRemoved = squares.splice(i, width);
      squares = squaresRemoved.concat(squares);
      squares.forEach((cell) => grid.appendChild(cell));
    }
  }
}

function gameOver() {
  if (
    current.some((index) =>
      squares[currentPosition + index].classList.contains("taken")
    )
  ) {
    scoreDisplay.innerHTML = "GAME OVER";
    clearInterval(timerID);
  }
}
