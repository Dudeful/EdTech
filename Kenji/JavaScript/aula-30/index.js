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
      case '−':
        return this.calcSub();
      case '×':
        return this.calcMult();
      case '÷':
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
// const sum = new Calculator;
// sum.operand1 = 2;
// sum.operand2 = 2;
// sum.operation = '+';

// const sub = new Calculator;
// sub.operand1 = 2;
// sub.operand2 = 2;
// sub.operation = '−';

// const mult = new Calculator;
// mult.operand1 = 2;
// mult.operand2 = 2;
// mult.operation = '×';

// const div = new Calculator;
// div.operand1 = 2;
// div.operand2 = 2;
// div.operation = '÷';

// console.log('\nclass Calculator');
// console.log('2+2=' + sum.result);
// console.log('2-2=' + sub.result);
// console.log('2*2=' + mult.result);
// console.log('2/2=' + div.result);

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
      case '−':
        return this._operand1 - this._operand2;
      case '×':
        return this._operand1 * this._operand2;
      case '÷':
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
// const sum_2 = new Calculator_2(2, 2, '+');
// const sub_2 = new Calculator_2(2, 2, '−');
// const mult_2 = new Calculator_2(2, 2, '×');
// const div_2 = new Calculator_2(2, 2, '÷');

// console.log('\nclass Calculator_2');
// console.log('2+2=' + sum_2.getResult());
// console.log('2-2=' + sub_2.getResult());
// console.log('2*2=' + mult_2.getResult());
// console.log('2/2=' + div_2.getResult());

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

/* THE ABOVE CODE IS JUST FOR TESTING PURPOSES */
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

  clearCalculator() {
    this._operand1 = undefined;
    this._operand2 = undefined; this._operation = undefined;
  }
}

const calc = new Calculator_3;
const regex = /[+|−|\-|×|*|÷|/]/;

$(document).ready(function() {
  $('.number').each(function() {
    $(this).click(function(event) {operandHandler($(event.target).html())})
  })

  $('.operation').each(function() {
    $(this).click(function(event) {operatorHandler($(event.target).html())})
  })

  $('#clear').each(function() {
    $(this).click(function() {clearCalculator()})
  })

  $('#equal').each(function() {
    $(this).click(function() {resultHandler()})
  })
})

function operandHandler(operand) {
  $('#screen').html($('#screen').html() + operand);
}

function operatorHandler(operator) {
  if (isNaN($('#screen').html().at(-1))) return;
  if ($('#screen').html().split(regex).length >= 2) return;

  $('#screen').html($('#screen').html() + operator);
  calc.setOperation(operator);
}

function resultHandler() {
  if ($('#screen').html().split(regex).length < 2) return;
  const operands = $('#screen').html().split(regex);

  calc.setOperand1(Number(operands[0]));
  calc.setOperand2(Number(operands[1]));

  //print in screen the result with 5 decimals
  $('#screen').html(Math.ceil(calc.getResult() * 100000) / 100000);
}

function clearCalculator() {
  $('#screen').html('');
  calc.clearCalculator();
}

document.onkeydown = function(event) {
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