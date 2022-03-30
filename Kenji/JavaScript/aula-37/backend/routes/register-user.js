const route = require('express').Router();
const validateInputs = require('../middlewares/validate-inputs.js');
const generateToken = require('../middlewares/generate-token.js');
const newUser = require('../middlewares/new-user.js');

route.post(
	'/',
	validateInputs,
	newUser,
	generateToken,
	(req, res) => {
		try {
			if (!req.validations) {
				throw new Error('the inputs provided are not valid!');
			}

			res.send({ user: req.userToken });
		} catch (error) {
			console.error(error);
			res.status(error.code || 400).send({ error: error.message });
		}
	}
);

module.exports = route;
