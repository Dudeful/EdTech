const express = require('express');
const app = express();
const port = 5005;

app.use(express.static('public'));

app.listen(port);