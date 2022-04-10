const router = require('express').Router();
const validate = require('../middlewares/validate-inputs.js');
const newUser = require('../middlewares/new-user.js');
const validateUser = require('../middlewares/validate-user.js');
const generateToken = require('../middlewares/generate-token.js');

router.post('/login', validateUser, generateToken, (req, res) => {
	try {
		if (!req.validations) {
			throw new Error('the inputs provided are not valid!');
		}

		res
			.cookie('token', req.user.token, {
				expires: new Date(Date.now() + 3600000),
				httpOnly: true,
			})
			.send({ isAuthorized: true, isAdmin: req.user.isAdmin });
	} catch (error) {
		console.error(error.code);
		res.status(error.code || 400).send({ error: error.message });
	}
});

router.post('/register', validate.newUser, newUser, (req, res) => {
	try {
		if (!req.validations) {
			throw new Error('the inputs provided are not valid!');
		}

		res.send({ userSaved: true });
	} catch (error) {
		console.error(error);
		res.status(error.code || 400).send({ error: error.message });
	}
});

module.exports = router;
