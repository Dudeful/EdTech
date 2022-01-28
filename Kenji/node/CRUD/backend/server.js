const express = require('express');
const cors = require('cors');
const products = require('./routes/products');
const app = express();
const port = 5004;
app.use(express.json());
app.use(cors({origin: 'http://edtech.dudeful.com:5005'}));

app.use('/products', products);

app.listen(port);