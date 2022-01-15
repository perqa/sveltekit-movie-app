export const getRows = datas => {
  const rowsArr = [];
  while (datas.length) {
    rowsArr.push(datas.splice(0, 5));
  }
  return rowsArr;
};
