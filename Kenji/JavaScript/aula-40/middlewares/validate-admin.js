const fs = require('fs');

const validateAdmin = (req, res, next) => {
	const tokens = JSON.parse(
		fs.readFileSync(__dirname + '/../database/tokens.json', 'utf-8')
	);

	const token = tokens.find(
		(user) => user.token === req.cookies.token
	);

	if (
		!token ||
		!token.isAdmin ||
		token.timestamp < Date.now() + 36000
	) {
		res.status(403).send({
			error:
				'the user does not have authorization for this request or the token has expired, please login as an administrator again!',
		});

		return;
	}

	return next();
};

module.exports = validateAdmin;
