export const range = length => [...Array(length).keys()];
export const getRandomElement = arr =>
  arr[Math.floor(Math.random() * arr.length)];
