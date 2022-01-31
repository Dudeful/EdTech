//const apiURL = 'http://edtech.dudeful.com:5006';
const apiURL = 'http://localhost:5006';

const screen = document.getElementById('screen');
const regex = /[+|−|\-|×|*|÷|/]/;
const calculatorParams = {};

const operandHandler = (operand) => {
  screen.innerHTML += operand;
}

const operatorHandler = (operator) => {
  if (isNaN(screen.innerHTML.at(-1))) return;
  if (screen.innerHTML.split(regex)[0] && screen.innerHTML.split(regex).length >= 2) return;

  screen.innerHTML += operator;
  calculatorParams.operation = operator;
}

const resultHandler = async () => {
  if (screen.innerHTML.split(regex).length < 2) return;
  const operands = screen.innerHTML.split(regex);

  //in case of the first operand being a negative number
  if (operands.length > 2) {
    calculatorParams.operand1 = Number(-operands[1]);
    calculatorParams.operand2 = Number(operands[2]);
  } else {
    calculatorParams.operand1 = Number(operands[0]);
    calculatorParams.operand2 = Number(operands[1]);
  }

  const response = await fetchResult();

  if (!response.error) {
    //print in screen the result with 5 decimals
    screen.innerHTML = Math.ceil(response.result * 100000) / 100000;
  } else {
    console.error(response.msg);
    return;
  }
}

const clearCalculator = () => {
  screen.innerHTML = '';

  fetch(`${apiURL}/calculations/result?clear=true`)
    .catch(error => console.error(error));
}

document.onkeydown = (event) => {
  if (event.key >= 0 && event.key <= 9 || event.key === '.') {
    operandHandler(event.key);
  }
  if (event.key.match(regex)) {
    operatorHandler(event.key);
  }
  if (event.key === 'Enter') {
    resultHandler();
  }
  if (event.key === 'Escape') {
    clearCalculator();
  }
}

const fetchResult = async () => {
  const result = await fetch(`${apiURL}/calculations/result?operand1=${calculatorParams.operand1}&operand2=${calculatorParams.operand2}&operation=${encodeURIComponent(calculatorParams.operation)}`
  );

  return result.json();
}