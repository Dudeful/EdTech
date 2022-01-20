const express = require('express');
const app = express();
const port = 5001;

app.use(express.static(__dirname+'/public'));

app.listen(port);