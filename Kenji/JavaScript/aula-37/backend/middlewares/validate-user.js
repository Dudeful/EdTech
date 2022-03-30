const fs = require('fs');

const validateUser = (req, res, next) => {
	if (
		!req.body.data ||
		!req.body.data.email ||
		!req.body.data.password
	) {
		req.validations = false;
		next();
	}

	const users = JSON.parse(
		fs.readFileSync(__dirname + '/../database/users.json', 'utf-8')
	);

	const user = users.find(
		(user) => user.email === req.body.data.email
	);

	if (!user) {
		req.validations = false;
		next();
	}

	//FIXME add bcrypt here
	if (user.password !== req.body.data.password) {
		req.validations = false;
		next();
	}

	req.user = user;
	req.validations = true;
	next();
};

module.exports = validateUser;
