const router = require('express').Router();
const Foo = require('../models/foo.js');

router.get('/', async (req, res) => {
	try {
		const fooData = await Foo.find({});

		res.send(fooData);
	} catch (error) {
		console.error(error);
	}
});

router.post('/', async (req, res) => {
	try {
		const { data } = req.body;
		console.log(data);
		console.log(data.foo);
		const fooData = await Foo.create(data);

		res.send(fooData);
	} catch (error) {
		console.error(error);
	}
});

module.exports = router;
