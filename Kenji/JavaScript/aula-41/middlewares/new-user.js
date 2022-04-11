const fs = require('fs');

const newUser = (req, res, next) => {
	if (!req.validations) return next();

	const users = JSON.parse(
		fs.readFileSync(__dirname + '/../database/users.json', 'utf-8')
	);

	const user = users.find(
		(user) => user.email === req.body.data.email
	);

	if (user) {
		req.validations = false;
		return next();
	}

	const newUserData = {
		fullName: req.body.data.fullName,
		username: req.body.data.username,
		email: req.body.data.email,
		cpf: req.body.data.cpf,
		//FIXME use bcrypt here
		password: req.body.data.password,
		img: `https://picsum.photos/id/${Math.ceil(
			Math.random() * 500
		)}/768`,
	};

	users.push(newUserData);

	//FIXME replace with postgres
	fs.writeFile(
		__dirname + '/../database/users.json',
		JSON.stringify(users),
		(err) => {
			if (err) throw err;
		}
	);

	req.user = {
		fullName: newUserData.fullName,
		username: newUserData.username,
		email: newUserData.email,
	};

	req.validations = true;
	return next();
};

module.exports = newUser;
