import { MAP_HEIGHT, MAP_WIDTH, SCREEN_HEIGHT } from "../utils/constants";
import { range } from "../utils/lib";

export function generateBlankMap() {
  const floor = Array(MAP_HEIGHT).fill(Array(MAP_WIDTH).fill("."));

  return floor.map(row => row.map(tile => (Math.random() < 0.1 ? "#" : tile)));
}

export function generateBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  range(MAP_HEIGHT).forEach(() => {
    board.innerHTML += '<p class="row"></p>';
  });

  const rows = board.querySelectorAll(".row");

  rows.forEach(row => {
    row.style.fontSize = `${(window.innerHeight * 0.9) / SCREEN_HEIGHT}px`;
    row.style.lineHeight = `${(window.innerHeight * 0.9) / SCREEN_HEIGHT}px`;
  });
}
