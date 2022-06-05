const express = require('express');
const cors = require('cors');
const foo = require('./routes/foo.js');
const dbConnection = require('./config/dbConnection.js');
const app = express();

app.use(express.json());
app.use(cors());
dbConnection('mongodb://root:edtech123@mongo:27017/');

app.get('/', (req, res) => {
	res.send({
		image:
			'https://c.tenor.com/TbTe1Nc6j34AAAAC/hacker-hackerman.gif',
	});
});

app.use('/foo', foo);

app.listen(5000);
