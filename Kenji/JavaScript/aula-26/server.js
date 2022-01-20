const express = require('express');
const app = express();
const port = 5000;
const employees = require('./routes/employees');

app.use(express.static(__dirname + '/public'));

app.use('/employees', employees);

app.listen(port);