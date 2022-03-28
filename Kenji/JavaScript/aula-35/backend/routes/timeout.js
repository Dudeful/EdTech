const route = require('express').Router();

route.get('/', (req, res) => {
	try {
		const randomTimeout = Math.ceil(Math.random() * 5);
		console.log(randomTimeout * 1000);
		setTimeout(
			() =>
				res.send({
					fName: 'Dude',
					lName: 'Dudeful',
					email: 'dude@mail.com',
				}),
			randomTimeout * 1000
		);
	} catch (error) {
		console.error(error);
		res.status(error.code).send(error.message);
	}
});

module.exports = route;
