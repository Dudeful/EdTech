const mongoose = require('mongoose');

const dbConnection = (uri) => {
	mongoose
		.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log('MongoDB Connected Successfully');
		})
		.catch((error) => {
			console.error(error);
		});
};

module.exports = dbConnection;
