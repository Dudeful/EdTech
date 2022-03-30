const fs = require('fs');

const validateToken = (req, res, next) => {
	const token = req.query.token;

	const tokens = JSON.parse(
		fs.readFileSync(__dirname + '/../database/tokens.json', 'utf-8')
	);

	const userToken = tokens.find((user) => user.token === token);

	if (!userToken) {
		req.validations = false;
		next();
	}

	if (userToken.timestamp + 36 * 1000 < Date.now()) {
		req.validations = false;
		next();
	}

	req.validations = true;
	next();
};

module.exports = validateToken;
