const validateInputs = (req, res, next) => {
	if (
		!req.body.data ||
		!req.body.data.email ||
		!req.body.data.password ||
		!req.body.data.fName ||
		!req.body.data.lName
	) {
		req.validations = false;
		next();
	}

	req.validations = true;
	next();
};

module.exports = validateInputs;
