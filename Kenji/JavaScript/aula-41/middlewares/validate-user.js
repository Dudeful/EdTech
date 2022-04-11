const fs = require('fs');

const validateUser = (req, res, next) => {
	if (
		!req.body.data ||
		!req.body.data.email ||
		!req.body.data.password
	) {
		req.validations = false;
		return next();
	}

	const users = JSON.parse(
		fs.readFileSync(__dirname + '/../database/users.json', 'utf-8')
	);

	const user = users.find(
		(user) => user.email === req.body.data.email
	);

	if (!user) {
		req.validations = false;
		return next();
	}

	//FIXME use bcrypt here
	if (user.password !== req.body.data.password) {
		req.validations = false;
		return next();
	}

	req.user = user;
	req.validations = true;
	return next();
};

module.exports = validateUser;
