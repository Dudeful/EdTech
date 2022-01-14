const express = require('express');
const app = express();
const path = require('path');

const products = [
  { id: 1, product: 'hello1' },
  { id: 2, product: 'hello2' },
  { id: 3, product: 'hello3' },
  { id: 4, product: 'hello4' },
  { id: 5, product: 'hello5' },
  { id: 6, product: 'hello6' },
  { id: 7, product: 'hello7' },
  { id: 8, product: 'hello8' },
  { id: 3, product: 'hello3.1' },
  { id: 4, product: 'hello4.1' },
  { id: 5, product: 'hello5.1' },
  { id: 6, product: 'hello6.1' },
  { id: 8, product: 'hello8.1' },
  { id: 8, product: 'hello8.2' },
  { id: 8, product: 'hello8.3' },
  { id: 8, product: 'hello8.4' },
  { id: 5, product: 'hello5.2' },
  { id: 6, product: 'hello6.2' },
];

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/request-product/:id', function (req, res) {
  let id = Number(req.params.id);

  if (Number.isInteger(id) && id > 0) {
    const filteredProducts = products.filter((el) => el.id === id);
    if (filteredProducts.length > 0) {
      res.send({ products: filteredProducts });
    } else {
      res.send({ error: true, msg: 'NÃO EXISTEM PRODUTOS COM ESSE ID' });
    }
  } else {
    res.send({
      error: true,
      msg: 'O ID PRECISA SER UM INTEIRO POSITIVO (ex.: 5)',
    });
  }
});

app.listen(3000);
