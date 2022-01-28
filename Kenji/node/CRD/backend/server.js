const express = require('express');
const cors = require('cors');
const customers = require('./routes/customers');
const app = express();
const port = 5002;
app.use(express.json());
app.use(cors({origin: 'http://edtech.dudeful.com:5003'}));

app.use('/customers', customers);

app.listen(port);