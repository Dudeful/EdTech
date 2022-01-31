const Calculator = () => {
  const setOperand1 = (_operand1) => {
    this._operand1 = _operand1;
  };

  const setOperand2 = (_operand2) => {
    this._operand2 = _operand2;
  };

  const setOperation = (_operation) => {
    this._operation = _operation;
  };

  const getResult = () => {
    switch (this._operation) {
      case '+':
        return this._operand1 + this._operand2;
      case '−':
        return this._operand1 - this._operand2;
      case '-':
        return this._operand1 - this._operand2;
      case '×':
        return this._operand1 * this._operand2;
      case '*':
        return this._operand1 * this._operand2;
      case '÷':
        return this._operand1 / this._operand2;
      case '/':
        return this._operand1 / this._operand2;
      default:
        return 'invalid operation'
    }
  }

  const clearCalculator = () => {
    this._operand1 = undefined;
    this._operand2 = undefined; this._operation = undefined;
  }

  return {
    setOperand1,
    setOperand2,
    setOperation,
    getResult,
    clearCalculator
  }
}

const calculator = Calculator();

module.exports = calculator;