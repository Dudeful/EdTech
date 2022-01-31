const express = require('express');
const router = express.Router();
const calculator = require('../modules/calculator.js');

router.get('/result', (req, res) => {
  const { clear, operand1, operand2, operation } = req.query;
  console.log(req.query);

  if (clear) {
    calculator.clearCalculator();
    res.send({ error: false, msg: 'the calculator has been cleared!' });
    return;
  }

  try {
    calculator.setOperand1(Number(operand1));
    calculator.setOperand2(Number(operand2));
    calculator.setOperation(operation);
    const result = calculator.getResult();
    res.send({ error: false, result });
  } catch (error) {
    res.send({ error: true, error })
  }
});

module.exports = router;