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
  [width * 2 + 1, width * 2 + 2, width * 3, width * 3 + 1],
  [1, width, width + 1, width * 2 + 1],
  [width * 2 + 1, width * 2 + 2, width * 3, width * 3 + 1],
  [1, width, width + 1, width * 2 + 1],
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
let current = theTetrominoes[0][0];
console.log(current);

// draw the first rotation in the first tetronimmo
function draw() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.add("tetromino");
  });
}
draw();
