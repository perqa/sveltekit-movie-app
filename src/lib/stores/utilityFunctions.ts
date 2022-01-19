export const getRows = (datas, rowLength = 7) => {
  const rowsArr = [];
  while (datas.length) {
    rowsArr.push(datas.splice(0, rowLength));
  }
  return rowsArr;
};

