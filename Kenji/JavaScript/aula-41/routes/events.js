const router = require('express').Router();
const fs = require('fs');
const newEvent = require('../middlewares/new-event.js');
const validate = require('../middlewares/validate-inputs.js');
const validateToken = require('../middlewares/validate-token.js');
const signUp = require('../middlewares/sign-up.js');
const validateAdmin = require('../middlewares/validate-admin.js');

//FIXME validate inputs for new event
router.post(
	'/register',
	validateAdmin,
	validate.newEvent,
	newEvent,
	(req, res) => {
		try {
			if (!req.validations) {
				throw new Error(
					'the inputs provided are not valid or you do not have permission for this transaction!'
				);
			}

			res.send({ eventSaved: true });
		} catch (error) {
			console.error(error);
			res.status(error.code || 400).send({ error: error.message });
		}
	}
);

router.get('/get', (req, res) => {
	try {
		//FIXME: upgrade to postgres
		const events = JSON.parse(
			fs.readFileSync(__dirname + '/../database/events.json', 'utf-8')
		);

		if (!events[0]) throw new Error('no event has been found!');

		res.send({ data: events });
	} catch (error) {
		console.error(error);
		res.status(error.code || 400).send({ error: error.message });
	}
});

router.post('/sign-up', validateToken, signUp, (req, res) => {
	try {
		if (!req.validations) {
			throw new Error(
				req.errorMessage ||
					'you are not authenticated or the event does not exist!'
			);
		}

		res.send({ isSignedUp: true });
	} catch (error) {
		console.error(error);
		res.status(error.code || 400).send({ error: error.message });
	}
});

module.exports = router;
