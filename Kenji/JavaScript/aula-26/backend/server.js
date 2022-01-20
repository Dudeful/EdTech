const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
const employees = require('./routes/employees');

app.use('/employees', cors({origin: 'http://edtech.dudeful.com:5001'}), employees);

app.listen(port);