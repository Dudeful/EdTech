const express = require('express');
const app = express();
const cors = require('cors');
const port = 5006;
const employees = require('./routes/employees');
const calculations = require('./routes/calculations');
app.use(express.json());

app.use(cors({ origin: 'http://edtech.dudeful.com:5007' }));
// app.use(cors({ origin: 'http://localhost:5007' }));

app.use('/employees', employees);
app.use('/calculations', calculations);

app.listen(port);