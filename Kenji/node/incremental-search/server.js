const express = require('express');
const app = express();
const search = require('./middlewares/search.js');

app.use(express.static(__dirname + '/public'));

app.get('/fetch-users', search.user(), (req, res, next) => {

  res.send(req.body);

});

app.listen(80);
