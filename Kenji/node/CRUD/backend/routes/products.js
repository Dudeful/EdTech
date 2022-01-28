const express = require('express');
const router = express.Router();

const products = [];

router.get('/:id', (req, res) => {
  const { id } = req.params;
  console.log(req.params)

  if(id !== 'All'){
    const filteredProducts = products.filter(el => el.id == id);
    if(filteredProducts[0]){
      res.send({error: false, data: filteredProducts});
    }else{
      res.send({error: true, msg: 'no product has been found', data: filteredProducts});
    }
  }else{
    res.send({error: false, data: products});
  }
});

router.post('/', (req, res) => {
  const { data } = req.body;

  if(data){
    if(!Number.isInteger(Number(data.id)) && Number(data.id) < 0){
      res.send({error: true, msg: 'the id must be a positive integer!'});
      return;
    }
    products.push(data);
    res.send({error: false, msg: 'the product has been saved!'})
  }else{
    res.send({error: true, msg: 'no data provided'});
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  if(data){
    if(!Number.isInteger(Number(data.id)) && Number(data.id) < 0){
      res.send({error: true, msg: 'the id must be a positive integer!'});
      return;
    }
    const filteredProducts = products.filter(el => el.id == id);
    if(filteredProducts[0]){
      filteredProducts.forEach(el => {
        let index = products.indexOf(el);
        products[index] = data;
      })
      res.send({error: false, msg: `the products with id=${id} have been updated!`})
    }else{
      res.send({error: true, msg: `no products with id=${id} have been found!`})
    }
  }else{
    res.send({error: true, msg: 'no data provided'});
  }
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  const filteredProducts = products.filter(el => el.id == id);

  if(filteredProducts[0]){
    filteredProducts.forEach(el => {
      let index = products.indexOf(el);
      products.splice(index, 1);
    });
    res.send({error: false, msg: `the products with id=${id} have been deleted!`});
  }else{
    res.send({error: true, msg: `no product with id=${id} has been found!`});
  }
});

module.exports = router;