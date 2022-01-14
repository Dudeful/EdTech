const matrix = [[1], [2, 3], 4, 5];

const printMatrix = (arr, n) => {
  const newArr = [];

  for (let i = 0, n = arr.length; i < n; i++) {
    if (Array.isArray(arr[i])) {
      newArr.push(printMatrix(arr[i]));
    } else {
      newArr.push(arr[i]);
    }
  }

  return newArr;
}

console.log(printMatrix(matrix));