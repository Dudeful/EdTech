const express = require('express');
const app = express();
const port = 5007;

app.use(express.static('public'));
app.use('/calculator', express.static('public/calculator'));
app.use('/employees', express.static('public/employees'));

app.listen(port);