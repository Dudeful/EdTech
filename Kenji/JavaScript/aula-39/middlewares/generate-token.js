const crypto = require('crypto');
const fs = require('fs');
const bcrypt = require('bcrypt');
const saltRounds = 12;

const generateToken = (req, res, next) => {
	if (!req.validations) next();

	// const token = crypto
	// 	.createHash('sha256')
	// 	.update('just a random string' + req.user.email)
	// 	.digest('hex');

	const token = bcrypt.hashSync(
		'just a random string' + req.user.email,
		saltRounds
	);

	console.log(req.user.email, token);

	req.user.token = token;

	const tokens = JSON.parse(
		fs.readFileSync(__dirname + '/../database/tokens.json', 'utf-8')
	);

	const user = tokens.find((user) => user.email === req.user.email);

	if (!user) {
		tokens.push({
			email: req.user.email,
			token: req.user.token,
			timestamp: Date.now(),
		});
	} else {
		const tokenIndex = tokens.indexOf(user);
		tokens[tokenIndex].token = req.user.token;
		tokens[tokenIndex].timestamp = Date.now();
	}

	//FIXME replace with postgres
	fs.writeFile(
		__dirname + '/../database/tokens.json',
		JSON.stringify(tokens),
		(err) => {
			if (err) throw err;
		}
	);

	req.userToken = {
		email: req.user.email,
		token: req.user.token,
	};

	req.validations = true;
	next();
};

module.exports = generateToken;
