const router = require('express').Router();
const validateToken = require('../middlewares/validate-token.js');
const fs = require('fs');

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

		const event = user.events.find((e) => e.id === req.query.eventId);

		if (user && event) {
			const eventIndex = events.indexOf(event);
			const userIndex = users.indexOf(user);

			users[userIndex].events.splice(eventIndex, 1);
		} else {
			throw new Error('no user or event has been found');
		}

		//FIXME replace with postgres
		fs.writeFile(
			__dirname + '/../database/users.json',
			JSON.stringify(users),
			(err) => {
				if (err) throw err;
			}
		);

		res.send(`
		<html>
			<body>
			<div style="padding: 20px; margin-top: 30px; background-color: #f0f8ff80; box-shadow: 0 0 20px 0 #20202015" id="event_data">
				<h2 style="color: #202020; font-size: 18px">Event ID: ${event.id}</h2>
				<h2 style="color: #202020; font-size: 18px">Event Title: ${event.title}</h2>
			</div>
			<div style="padding: 20px; margin-top: 30px; background-color: #f0f8ff80; box-shadow: 0 0 20px 0 #20202015" id="event_data">
				<h2 style="color: #202020; font-size: 18px">User Name: ${user.fullName}</h2>
				<h2 style="color: #202020; font-size: 18px">User Email: ${user.email}</h2>
				<h2 style="color: #202020; font-size: 18px">User CPF: ${user.cpf}</h2>
			</div>
			</body>
		</html>
		`);
	} catch (error) {
		console.error(error);
		res.status(error.code || 400).send({ error: error.message });
	}
});

module.exports = router;
