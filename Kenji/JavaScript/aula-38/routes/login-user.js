const route = require('express').Router();
const validateUser = require('../middlewares/validate-user.js');
const generateToken = require('../middlewares/generate-token.js');

route.post('/', validateUser, generateToken, (req, res) => {
	try {
		if (!req.validations) {
			throw new Error('the inputs provided are not valid!');
		}

		res
			.cookie('token', req.userToken.token, {
				expires: new Date(Date.now() + 3600000),
				httpOnly: true,
			})
			.send({ isAuthorized: true });
	} catch (error) {
		console.error(error.code);
		res.status(error.code || 400).send({ error: error.message });
	}
});

module.exports = route;
