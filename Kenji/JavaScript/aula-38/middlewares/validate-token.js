const fs = require('fs');

const validateToken = (req, res, next) => {
	console.log(req.cookies);
	const token = req.cookies['token'];

	const tokens = JSON.parse(
		fs.readFileSync(__dirname + '/../database/tokens.json', 'utf-8')
	);

	const userToken = tokens.find((user) => user.token === token);
	console.log(userToken);

	if (!userToken) {
		req.validations = false;
		next();
	}

	if (userToken.timestamp + 36 * 1000 < Date.now()) {
		req.validations = false;
		next();
	}

	const users = JSON.parse(
		fs.readFileSync(__dirname + '/../database/users.json', 'utf-8')
	);

	const user = users.find((user) => user.email === userToken.email);

	req.user = user;
	req.validations = true;
	next();
};

module.exports = validateToken;
