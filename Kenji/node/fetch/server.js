const express = require('express');
const app = express();
const users = require('./users.json');

app.use(express.static(__dirname + '/public'));

app.get('/fetch-users', (req, res) => {
  let { id, name, email } = req.query;

  const sendFilteredData = (filteredData) => {
    if (filteredData.length > 0) {
      res.send({ users: filteredData });
    } else {
      res.send({
        error: true,
        msg: 'NÃO EXISTEM USUÁRIOS CADASTRADOS COM ESTES DADOS',
      });
    }
  };

  if (id && !name && !email) {
    const filteredData = users.filter((el) => el.id === id);

    sendFilteredData(filteredData);
  } else if (!id && !name && email) {
    const filteredData = users.filter((el) => el.email === email);

    sendFilteredData(filteredData);
  } else if (name) {
    const filteredData = users.filter(
      (el) =>
        el.id === id ||
        el.name.toLowerCase().includes(name.toLocaleLowerCase()) ||
        el.email === email
    );

    sendFilteredData(filteredData);
  }
});

app.listen(3000);
