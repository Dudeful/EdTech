const fs = require('fs');
const QRCode = require('qrcode');

const signUp = (req, res, next) => {
	if (!req.validations) return next();

	if (!req.body.data || !req.body.data.id) {
		req.validations = false;
		return next();
	}

	const events = JSON.parse(
		fs.readFileSync(__dirname + '/../database/events.json', 'utf-8')
	);

	const event = events.find((event) => event.id === req.body.data.id);

	const users = JSON.parse(
		fs.readFileSync(__dirname + '/../database/users.json', 'utf-8')
	);

	const user = users.find((user) => user.email === req.user.email);

	if (!event && !user) {
		req.validations = false;
		return next();
	}

	QRCode.toDataURL(
		`http://edtech.dudeful.com:8000/api/qr-code/check-qrcode?eventId=${event.id}&userId=${user.cpf}`,
		function (err, url) {
			if (err) throw err;

			const userIndex = users.indexOf(user);

			if (users[userIndex].events) {
				if (user.events.find((e) => e.id === event.id)) {
					req.validations = false;
					req.errorMessage =
						'the user has already signed up for this event!';
					return next();
				}
				users[userIndex].events.push({
					title: event.title,
					id: event.id,
					code: url,
				});
			} else {
				users[userIndex].events = [
					{ title: event.title, id: event.id, code: url },
				];
			}

			req.qrCode = url;

			//FIXME replace with postgres
			fs.writeFile(
				__dirname + '/../database/users.json',
				JSON.stringify(users),
				(err) => {
					if (err) throw err;
				}
			);

			return next();
		}
	);
};

module.exports = signUp;
