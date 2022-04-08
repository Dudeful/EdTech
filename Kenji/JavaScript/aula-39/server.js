const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 5039;
const loginUser = require('./routes/login-user.js');
const registerUser = require('./routes/register-user.js');
const classified = require('./routes/classified.js');

app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

app.use('/login', loginUser);
app.use('/register', registerUser);
app.use('/classified', classified);

app.listen(port, () => console.log('listening on port ' + port));
