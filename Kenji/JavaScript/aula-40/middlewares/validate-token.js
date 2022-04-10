const fs = require('fs');

const validateToken = (req, res, next) => {
	const tokens = JSON.parse(
		fs.readFileSync(__dirname + '/../database/tokens.json', 'utf-8')
	);

	const userToken = tokens.find(
		(user) => user.token === req.cookies.token
	);

	if (!userToken) {
		req.validations = false;
		return next();
	}

	if (userToken.timestamp + 180 * 1000 < Date.now()) {
		req.validations = false;
		return next();
	}

	const users = JSON.parse(
		fs.readFileSync(__dirname + '/../database/users.json', 'utf-8')
	);

	const user = users.find((user) => user.email === userToken.email);

	req.user = user;
	req.validations = true;
	return next();
};

module.exports = validateToken;
