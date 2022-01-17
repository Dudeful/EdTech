const matrix = [0, [1], [2, 3, [4, 5], [6, 7, [8, 9]]], 10, 11, [12, [13, [14], [15, 16, [17, 18], [19, 20, [21, 22]]], 23, 24, [25]]]];
// const matrix = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const aux = [];
//this approach uses a for loop in conjunction with a recursion
// aux.push() lines are just for testing
const printMatrix = (arr) => {
  for (let i = 0, n = arr.length; i < n; i++) {
    if (Array.isArray(arr[i])) {
      printMatrix(arr[i]);
    } else {
      console.log(arr[i]);
      // aux.push(arr[i]);
    }
  }
}
const aux2 = [];
// this approach uses pure recursion
// aux2.push() lines are just for testing
const printMatrix2 = (arr, n = 0) => {
  if (arr[n] === undefined) return;

  if (Array.isArray(arr[n])) {
    printMatrix2(arr[n]);
  } else if (Array.isArray(arr)) {
    if (arr[n + 1] !== undefined) {
      console.log(arr[n]);
      // aux2.push(arr[n]);
      return printMatrix2(arr, n + 1);
    } else {
      console.log(arr[n]);
      // aux2.push(arr[n]);
      return;
    }
  } else {
    // aux2.push(arr[n]);
    console.log(arr);
    return;
  }

  return printMatrix2(arr, n + 1);
}

console.log('\nHYBRID RECURSION:');
printMatrix(matrix);
console.log('\n\nPURE RECURSION:');
printMatrix2(matrix);

////////-------------- THE SECTION BELLOW IS FOR TESTS ONLY --------------////////

// calculate the computational cost of HYBRID recursion
// it is necessary to comment out the aux.push() lines on printMatrix
// obs.: performance with different algorithms may vary due to algorithm architecture, further analysis is required
const calculateHybridCost = () => {
  console.log('\nHYBRID RECURSION:');
  console.time('duration');

  for (let k = 0; k < 3000000; k++) {
    printMatrix(matrix);
  }

  logs();
}

// calculate the computational cost of PURE recursion
// it is necessary to comment out the aux2.push() lines on printMatrix2
// obs.: performance with different algorithms may vary due to algorithm architecture, further analysis is required
const calculatePureCost = () => {
  console.log('\n\nPURE RECURSION:');
  console.time('duration');

  for (let k = 0; k < 3000000; k++) {
    printMatrix2(matrix);
  }

  logs();
}

const logs = () => {
  console.timeEnd('duration');
  const scriptMemory = process.memoryUsage();

  for (let key in scriptMemory) {
    console.log(
      `${key}: ${Math.ceil(scriptMemory[key] / (1024 * 1024))} MB`
    );
  }
}

// calculatePureCost();
// calculateHybridCost();