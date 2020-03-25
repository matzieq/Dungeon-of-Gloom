const MAP_WIDTH = 80;
const MAP_HEIGHT = 50;

const dungeonMap = [];

function generateBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  Array(MAP_HEIGHT)
    .fill(0)
    .forEach(() => {
      board.innerHTML += '<p class="row"></p>';
    });
}

generateBoard();
