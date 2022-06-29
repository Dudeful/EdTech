import checkDigit from '../utils/check-digit.js';

const validateInputs = async (req, res, next) => {
  try {
    const { origin, amount } = req.body.data;

    if (!checkDigit.account(origin.account)) {
      throw new Error('invalid account number');
    }

    if (isNaN(amount) || !amount || Number(amount) > 5000) {
      throw new Error('invalid amount');
    }

    req.withdraw = { origin, amount };

    return next();
  } catch (error) {
    //FIXME dev only! stop sending entire error messages to the client and improve custom messages
    res.status(error.code || 400).send({ error: error.message });
  }
};

export default validateInputs;
