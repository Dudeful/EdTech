const fs = require('fs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (req, res, next) => {
	if (!req.validations) return next();

	var jsonwebtoken = jwt.sign(
		{
			username: req.user.username,
			isAdmin: req.user.isAdmin,
		},
		process.env.JWT_SECRET,
		{ expiresIn: 60 * 5 }
	);

	req.user.token = jsonwebtoken;

	console.log(jsonwebtoken);

	const tokens = JSON.parse(
		fs.readFileSync(__dirname + '/../database/tokens.json', 'utf-8')
	);

	const user = tokens.find((user) => user.email === req.user.email);

	if (!user) {
		tokens.push({
			email: req.user.email,
			token: req.user.token,
		});
	} else {
		const tokenIndex = tokens.indexOf(user);
		tokens[tokenIndex].token = req.user.token;
	}

	if (req.user.isAdmin) {
		const tokenIndex = tokens.indexOf(user);
		tokens[tokenIndex].isAdmin = true;
	}

	//FIXME replace with postgres
	fs.writeFile(
		__dirname + '/../database/tokens.json',
		JSON.stringify(tokens),
		(err) => {
			if (err) throw err;
		}
	);

	req.validations = true;
	return next();
};

module.exports = generateToken;
