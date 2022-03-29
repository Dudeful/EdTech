const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/hellofriend', (req, res) => {
	res.send({ msg: 'hello friend' });
});

app.listen(3036);
