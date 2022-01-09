const numbersNode = document.getElementById('numbers');
let numbers = [];

const renderNumbers = (number) => {
  numbersNode.innerHTML += ` ${number}`;
};

// const drawNumbers = (max, n) => {
//   let number = Math.ceil(Math.random() * max);

//   if (n == 0) {
//     return;
//   } else {
//     if (!numbers.includes(number)) {
//       numbers.push(number);
//       console.log(numbers);
//       renderNumbers(number);
//       drawNumbers(max, n - 1);
//     } else {
//       drawNumbers(max, n);
//     }
//   }
// };

const drawNumbers = (max) => {
  let number = Math.ceil(Math.random() * max);

  if (!numbers.includes(number)) {
    numbers.push(number);
    renderNumbers(number);
  } else {
    drawNumbers(max);
  }
};

const startDraw = (max) => {
  numbersNode.innerHTML = '';
  numbers = [];

  const intervalId = setInterval(() => {
    drawNumbers(max);

    if (numbers.length >= 6) {
      clearInterval(intervalId);
    }
  }, 1000);
};
