const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const user = require('./routes/user.js');
const events = require('./routes/events.js');
const qrCode = require('./routes/qr-code.js');

app.use(express.json());
app.use(cookieParser());
app.use('/', express.static(__dirname + '/public/login'));
app.use('/admin', express.static(__dirname + '/public/admin'));
app.use('/user', express.static(__dirname + '/public/user'));

app.use('/api/user', user);
app.use('/api/events', events);
app.use('/api/qr-code', qrCode);

app.listen(port, () => console.log('listening on ' + port));
