class Calculator {
  set operand1(_operand1) {
    this._operand1 = _operand1;
  }
  set operand2(_operand2) {
    this._operand2 = _operand2;
  }
  set operation(_operation) {
    this._operation = _operation;
  }

  get result() {
    switch (this._operation) {
      case '+':
        return this.calcSum();
      case '-':
        return this.calcSub();
      case '*':
        return this.calcMult();
      case '/':
        return this.calcDiv();
      default:
        return 'invalid operation!'
    }
  }

  calcSum() {
    return this._operand1 + this._operand2;
  }
  calcSub() {
    return this._operand1 - this._operand2;
  }
  calcMult() {
    return this._operand1 * this._operand2;
  }
  calcDiv() {
    return this._operand1 / this._operand2;
  }

  clearCalculator() {
    this._operand1 = undefined;
    this._operand2 = undefined;
    this._operation = undefined;
  }
}

const sum = new Calculator;
sum.operand1 = 2;
sum.operand2 = 2;
sum.operation = '+';

const sub = new Calculator;
sub.operand1 = 2;
sub.operand2 = 2;
sub.operation = '-';

const mult = new Calculator;
mult.operand1 = 2;
mult.operand2 = 2;
mult.operation = '*';

const div = new Calculator;
div.operand1 = 2;
div.operand2 = 2;
div.operation = '/';

console.log('\nclass Calculator');
console.log('2+2=' + sum.result);
console.log('2-2=' + sub.result);
console.log('2*2=' + mult.result);
console.log('2/2=' + div.result);

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

class Calculator_2 {
  constructor(_operand1, _operand2, _operation) {
    this._operand1 = _operand1;
    this._operand2 = _operand2;
    this._operation = _operation;
  }

  get result() {
    return this.getResult();
  }

  getResult() {
    switch (this._operation) {
      case '+':
        return this._operand1 + this._operand2;
      case '-':
        return this._operand1 - this._operand2;
      case '*':
        return this._operand1 * this._operand2;
      case '/':
        return this._operand1 / this._operand2;
      default:
        return 'invalid operation'
    }
  }

  clearCalculator() {
    this._operand1 = undefined;
    this._operand2 = undefined;
    this._operation = undefined;
  }
}

const sum_2 = new Calculator_2(2, 2, '+');
const sub_2 = new Calculator_2(2, 2, '-');
const mult_2 = new Calculator_2(2, 2, '*');
const div_2 = new Calculator_2(2, 2, '/');

console.log('\nclass Calculator_2');
console.log('2+2=' + sum_2.getResult());
console.log('2-2=' + sub_2.getResult());
console.log('2*2=' + mult_2.getResult());
console.log('2/2=' + div_2.getResult());

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

class Calculator_3 {
  setOperand1(_operand1) {
    this._operand1 = _operand1;
  };

  setOperand2(_operand2) {
    this._operand2 = _operand2;
  };

  setOperation(_operation) {
    this._operation = _operation;
  };

  getResult() {
    switch (this._operation) {
      case '+':
        return this._operand1 + this._operand2;
      case '-':
        return this._operand1 - this._operand2;
      case '*':
        return this._operand1 * this._operand2;
      case '/':
        return this._operand1 / this._operand2;
      default:
        return 'invalid operation'
    }
  }

  clearCalculator() {
    this._operand1 = undefined;
    this._operand2 = undefined;
    this._operation = undefined;
  }
}

const sum_3 = new Calculator_3;
sum_3.setOperand1(2);
sum_3.setOperand2(2);
sum_3.setOperation('+');

const sub_3 = new Calculator_3;
sub_3.setOperand1(2);
sub_3.setOperand2(2);
sub_3.setOperation('-');

const mult_3 = new Calculator_3;
mult_3.setOperand1(2);
mult_3.setOperand2(2);
mult_3.setOperation('*');

const div_3 = new Calculator_3;
div_3.setOperand1(2);
div_3.setOperand2(2);
div_3.setOperation('/');

console.log('\nclass Calculator_3');
console.log('2+2=' + sum_3.getResult());
console.log('2-2=' + sub_3.getResult());
console.log('2*2=' + mult_3.getResult());
console.log('2/2=' + div_3.getResult());