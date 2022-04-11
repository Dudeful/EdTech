const router = require('express').Router();
const validate = require('../middlewares/validate-inputs.js');
const newUser = require('../middlewares/new-user.js');
const validateUser = require('../middlewares/validate-user.js');
const generateToken = require('../middlewares/generate-token.js');
const validateAdmin = require('../middlewares/validate-admin.js');

router.post('/login', validateUser, generateToken, (req, res) => {
	try {
		if (!req.validations) {
			throw new Error('the inputs provided are not valid!');
		}

		res
			.cookie('token', req.user.token, {
				httpOnly: true,
			})
			.send({ isAuthorized: true, isAdmin: req.user.isAdmin });
	} catch (error) {
		console.error(error.code);
		res.status(error.code || 400).send({ error: error.message });
	}
});

router.post(
	'/register',
	validateAdmin,
	validate.newUser,
	newUser,
	(req, res) => {
		try {
			if (!req.validations) {
				throw new Error(
					'the inputs provided are not valid or you do not have persmission for this transaction!'
				);
			}

			res.send({ userSaved: true });
		} catch (error) {
			console.error(error);
			res.status(error.code || 400).send({ error: error.message });
		}
	}
);

module.exports = router;
