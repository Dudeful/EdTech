const express = require('express');
const app = express();
const search = require('./middlewares/search.js');
const limiters = require('./middlewares/limiters');
const validation = require('./middlewares/validation');

app.use(express.static(__dirname + '/public'));

app.get('/fetch-users', limiters.debounce(750), validation(), search.user(), (req, res, next) => {
  res.send(req.body);
});

app.listen(80);
