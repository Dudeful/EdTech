const fs = require('fs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateAdmin = (req, res, next) => {
	try {
		const tokens = JSON.parse(
			fs.readFileSync(__dirname + '/../database/tokens.json', 'utf-8')
		);

		const token = tokens.find(
			(user) => user.token === req.cookies.token
		);

		const decoded = jwt.verify(token.token, process.env.JWT_SECRET);
		console.log(decoded);

		if (!token || !decoded.isAdmin) {
			res.status(403).send({
				error:
					'the user does not have authorization for this request or the token has expired, please login as an administrator again!',
			});

			return;
		}

		return next();
	} catch (error) {
		console.error(error);
		res.status(error.code || 400).send({ error: error.message });
	}
};

module.exports = validateAdmin;
