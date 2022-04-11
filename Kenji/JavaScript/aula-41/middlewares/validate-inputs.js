const newUser = (req, res, next) => {
	const regex = /^[0-9]+$/;

	if (
		!req.body.data ||
		!req.body.data.email ||
		!req.body.data.password ||
		!req.body.data.fullName ||
		!req.body.data.username ||
		!req.body.data.cpf ||
		req.body.data.cpf.length !== 11 ||
		!regex.test(req.body.data.cpf)
	) {
		req.validations = false;

		return next();
	}

	req.validations = true;
	return next();
};

const newEvent = (req, res, next) => {
	if (
		!req.body.data ||
		!req.body.data.title ||
		!req.body.data.description ||
		!req.body.data.date ||
		!req.body.data.time ||
		!req.body.data.address
	) {
		req.validations = false;

		return next();
	}

	req.validations = true;
	return next();
};

module.exports = { newUser, newEvent };
