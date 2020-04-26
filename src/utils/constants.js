export const MAP_WIDTH = 80;
export const MAP_HEIGHT = 50;
export const SCREEN_HEIGHT = 50;
export const FOG_UNEXPLORED = 0;
export const FOG_VISIBLE = 1;
export const FOG_EXPLORED = 2;

export const directions = [
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
];

export const directionsWithDiagonals = [
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: 1, y: -1 },
  { x: 1, y: 1 },
  { x: -1, y: 1 },
  { x: -1, y: -1 },
];
