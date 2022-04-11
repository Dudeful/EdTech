const fs = require('fs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateToken = (req, res, next) => {
	try {
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

		const decoded = jwt.verify(
			userToken.token,
			process.env.JWT_SECRET
		);
		console.log(decoded);

		const users = JSON.parse(
			fs.readFileSync(__dirname + '/../database/users.json', 'utf-8')
		);

		const user = users.find((user) => user.email === userToken.email);

		req.user = user;
		req.validations = true;

		return next();
	} catch (error) {
		console.error(error);
		res.status(error.code || 400).send({ error: error.message });
	}
};

module.exports = validateToken;
