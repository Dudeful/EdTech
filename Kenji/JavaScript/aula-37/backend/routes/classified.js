const route = require('express').Router();
const validateToken = require('../middlewares/validate-token.js');

route.get('/', validateToken, (req, res) => {
	try {
		if (!req.validations) {
			throw new Error(
				'the user is not authenticated or the token has already expired! please login again'
			);
		}

		res.send({
			authentication: 'ok',
			data: 'https://gonintendo.com/system/file_uploads/uploads/000/049/594/original/hackerman.jpg',
		});
	} catch (error) {
		console.error(error);
		res.status(error.code || 400).send({ error: error.message });
	}
});

module.exports = route;
