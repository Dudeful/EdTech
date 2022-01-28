const express = require('express');
const router = express.Router();

const customers = [{id: 1, name: 'dudeful dude', email: 'dudeful@outlook.com'}];

router.get('/get-customers', (req, res) => {
  const key = Object.keys(req.query)[0].toLowerCase();
  const value = Object.values(req.query)[0].toLowerCase();

  if(value !== 'all'){
    if(key === 'id'){
      const customer = customers.find(el => el.id == value);
      if(customer){
        res.send({error: false, data: [customer]});
      }else{
        res.send({error: true, msg: 'no customer has been found'});
      }
    }else{
      const filteredCustomers = 
        customers.filter(el => el[key].toLowerCase().includes(value.toLowerCase()));
      if(filteredCustomers[0]){
        res.send({error: false, data: filteredCustomers});
      }else{
        res.send({error: true, msg: 'no customer has been found'});
      }
    }
  }else{
    res.send({error: false, data: customers});
  }
});

router.post('/post-customer', (req, res) => {
  const { data } = req.body;

  const emailPattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);

  if(data){
    if(!Number.isInteger(Number(data.id))){
      res.send({error: true, msg: 'the id must be an integer!'});
      return;
    }
    if(!emailPattern.test(data.email)){
      res.send({error: true, msg: 'invalid email!'});
      return;
    }

    const idExists = customers.find(el => el.id == data.id);
    
    if(idExists){
      res.send({error: true, msg: 'this id already exists!'});
      return;
    }

    customers.push(data);
    res.send({error: false, msg: 'the customer has been saved!'})
  }else{
    res.send({error: true, msg: 'no data provided'});
  }
});

router.delete('/delete-customer', (req, res) => {
  const customer = customers.find(el => el.id == req.query.id);

  if(customer){
    const index = customers.indexOf(customer);
    customers.splice(index, 1);
    res.send({error: false, msg: 'the customer has been deleted!'})
  }else{
    res.send({error: true, msg: 'the customer has been found!'})
  }
});

module.exports = router;