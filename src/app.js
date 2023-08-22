const grid = document.querySelector(".grid");
const scoreDisplay = document.getElementById("score");
const startButton = document.getElementById("start-game");

let squares = Array.from(document.querySelectorAll(".grid div"));
const width = 10;

// the tetrominoes
const lTetronimo = [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2, width * 2 + 1],
  [width, width * 2, width * 2 + 1, width * 2 + 2],
];

const zTetronimo = [
  [width * 2 + 1, width * 2 + 2, width * 3, width * 3 + 1],
  [1, width, width + 1, width * 2 + 1],
  [width * 2 + 1, width * 2 + 2, width * 3, width * 3 + 1],
  [1, width, width + 1, width * 2 + 1],
];

const tTetronimo = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1],
];

const oTetronimo = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
];

const iTetronimo = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
];
