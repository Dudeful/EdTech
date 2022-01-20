const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.get('/invoices', (req, res) => {
  const filters = JSON.parse(req.query.filters);

  if(filters){
    //... apply filtering before res.send(invoices)
  } else{
    fs.readFile('data/invoices.json', 'utf8', (err, data) => {
      if(err) console.log(err);
      res.send(data);
    });
  }
});

app.post('/invoices', (req, res) => {
  const newInvoice = req.body.invoice;

  // let stream = fs.createWriteStream('data/invoices.json', {flags: 'a'});
  // stream.write(JSON.stringify(newInvoice));
  // stream.end();

  let invoices = [];
  invoices = JSON.parse(fs.readFileSync('data/invoices.json', 'utf8'));
  invoices.push(newInvoice);

  fs.writeFile('data/invoices.json', JSON.stringify(invoices), (err) => {
    if(err) console.log(err);
    res.send({error: false, msg: 'the invoice has been saved'});
  })
}); 

app.listen(3000);