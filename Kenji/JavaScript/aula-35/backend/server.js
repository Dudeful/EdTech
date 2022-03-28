const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const timeout = require('./routes/timeout.js');

app.use(cors());

app.use('/timeout', timeout);

app.listen(port, () =>
	console.log('backend listening on port ' + port)
);
