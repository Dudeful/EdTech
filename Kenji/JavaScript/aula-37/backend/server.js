const express = require('express');
const cors = require('cors');
const app = express();
const port = 5037;
const loginUser = require('./routes/login-user.js');
const registerUser = require('./routes/register-user.js');
const classified = require('./routes/classified.js');

app.use(express.json());

app.use(cors());

app.use('/login', loginUser);
app.use('/register', registerUser);
app.use('/classified', classified);

app.listen(port, () =>
	console.log('backend listening on port ' + port)
);
