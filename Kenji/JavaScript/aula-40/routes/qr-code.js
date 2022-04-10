const router = require('express').Router();
const validateToken = require('../middlewares/validate-token.js');

router.get('/', validateToken, (req, res) => {
	try {
		if (!req.validations) {
			throw new Error(
				'the user is not authenticated or the token has already expired! please login again'
			);
		}

		res.send({ events: req.user.events });
	} catch (error) {
		console.error(error);
		res.status(error.code || 400).send({ error: error.message });
	}
});

router.get('/check-qrcode', (req, res) => {
	try {
		const users = JSON.parse(
			fs.readFileSync(__dirname + '/../database/users.json', 'utf-8')
		);

		const user = users.find((user) => user.cpf === req.query.userId);

		const events = JSON.parse(
			fs.readFileSync(__dirname + '/../database/events.json', 'utf-8')
		);

		const event = events.find((e) => e.id === req.query.eventId);

		if (user) {
			const eventIndex = events.indexOf(event);
			const userIndex = users.indexOf(user);

			users[userIndex].events[eventIndex] = undefined;
		} else {
			throw new Error(
				'the user is not authenticated or the token has already expired! please login again'
			);
		}

		//FIXME replace with postgres
		fs.writeFile(
			__dirname + '/../database/users.json',
			JSON.stringify(users),
			(err) => {
				if (err) throw err;
			}
		);

		res.send({
			event,
			user: {
				fullName: user.fullName,
				email: user.email,
				cpf: user.cpf,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(error.code || 400).send({ error: error.message });
	}
});

module.exports = router;
