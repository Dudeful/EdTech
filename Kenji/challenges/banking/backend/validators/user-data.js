import checkDigit from '../utils/check-digit.js';

const validateInputs = async (req, res, next) => {
  try {
    const { name, cpf, email, birthdate } = req.body.data;

    const regex = {
      name: /[a-zA-Z\xC0-\uFFFF]/,
      cpf: /^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/,
      email: /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,4})+$/,
      birthdate: /^([1-2][0-9]{3})-([0-9]{2})-([0-9]{2})$/,
    };

    if (!checkDigit.cpf(cpf)) {
      throw new Error('invalid cpf');
    }

    if (new Date(birthdate) > new Date(Date.now()) - 16 * 365 * 24 * 3600 * 1000) {
      throw new Error(
        'You must be at least 16 years old to create an account with us. Sorry kid :('
      );
    }

    if (
      !regex.name.test(name) ||
      !regex.cpf.test(cpf) ||
      !regex.email.test(email) ||
      !regex.birthdate.test(birthdate)
    ) {
      throw new Error('invalid inputs');
    }

    req.user = { name, cpf, email, birthdate };

    return next();
  } catch (error) {
    //FIXME dev only! stop sending entire error messages to the client and improve custom messages
    res.status(error.code || 400).send({ error: error.message });
  }
};

export default validateInputs;
