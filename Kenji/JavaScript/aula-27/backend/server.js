const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
const employees = require('./routes/employees');
app.use(express.json());

app.use(cors({origin: 'http://edtech.dudeful.com:5001'}));

app.use('/employees', employees);

app.listen(port);