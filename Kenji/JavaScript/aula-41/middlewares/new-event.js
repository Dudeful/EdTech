const fs = require('fs');
const crypto = require('crypto');

const newEvent = (req, res, next) => {
	if (!req.validations) return next();

	const events = JSON.parse(
		fs.readFileSync(__dirname + '/../database/events.json', 'utf-8')
	);

	const event = events.find(
		(event) => event.name === req.body.data.name
	);

	if (
		event.title === req.body.data.title &&
		event.date === req.body.data.date &&
		event.time === req.body.data.time
	) {
		req.validations = false;
		return next();
	}

	const newEventData = {
		id: crypto.randomUUID(),
		title: req.body.data.title,
		description: req.body.data.description,
		date: req.body.data.date,
		time: req.body.data.time,
		address: req.body.data.address,
		img: `https://picsum.photos/id/${Math.ceil(
			Math.random() * 1000
		)}/768`,
	};

	events.push(newEventData);

	//FIXME replace with postgres
	fs.writeFile(
		__dirname + '/../database/events.json',
		JSON.stringify(events),
		(err) => {
			if (err) throw err;
		}
	);

	req.event = {
		id: newEventData.id,
		title: newEventData.title,
		date: newEventData.date,
		time: newEventData.time,
	};

	req.validations = true;
	return next();
};

module.exports = newEvent;
