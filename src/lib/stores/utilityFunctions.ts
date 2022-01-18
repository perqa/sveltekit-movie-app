export const getRows = (datas, rowLength = 7) => {
  const rowsArr = [];
  while (datas.length) {
    rowsArr.push(datas.splice(0, rowLength));
  }
  return rowsArr;
};

let lastKeyCode;

const keyMap = {
  40: 'DOWN', // Arrow Down
  37: 'LEFT', // Arrow Left
  39: 'RIGHT', // Arrow Right
  38: 'UP' // Arrow Up
};

export const setKeyCode = e => {
  lastKeyCode = e.keyCode;
};

export const getLastKey = () => {
  return keyMap[lastKeyCode];
};