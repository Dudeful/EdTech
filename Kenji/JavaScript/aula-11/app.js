function sendOrder() {
  let order = [];
  let bill = 0;

  console.log(document.getElementById('french'));
  console.log(document.getElementById('australian'));
  console.log(document.getElementById('brio'));

  if (document.getElementById('french').value) {
    order.push('Pão Francês');
    bill += 3;
  } else if (document.getElementById('australian').value) {
    order.push('Pão Australiano');
    bill += 8;
  } else if (document.getElementById('brio').value) {
    order.push('Pão de Brioche');
    bill += 6;
  }

  if (document.getElementById('picanha').value) {
    order.push('Hambúrguer de Picanha');
    bill += 13;
  }
  if (document.getElementById('ribs').value) {
    order.push('Hambúrguer de Costela');
    bill += 10;
  }
  if (document.getElementById('vegan').value) {
    order.push('Hambúrguer Vegano');
    bill += 12;
  }

  if (document.getElementById('lettuce').value) {
    order.push('Alface');
    bill += 1.5;
  }
  if (document.getElementById('tomato').value) {
    order.push('Tomate');
    bill += 1.5;
  }
  if (document.getElementById('no_salad').value) {
    order.push('Sem Salada');
  }

  if (document.getElementById('mozzarella').value) {
    order.push('Mussarela');
    bill += 3;
  }
  if (document.getElementById('danish').value) {
    order.push('Queijo Prato');
    bill += 3;
  }
  if (document.getElementById('cheddar').value) {
    order.push('Cheddar');
    bill += 5;
  }

  const burger = document.createElement('div');
  const price = document.createElement('h3');

  burger.innerHTML = `
  <h3 class='order_items'>${order[0]}</h3> 
  <h3 class='order_items'>${order[1]} </h3>
  <h3 class='order_items'>${order[2]} </h3>
  <h3 class='order_items'>${order[3]} </h3>
  `;

  price.className = 'order_price';
  price.innerText = `R$ ${bill}`;

  const order_div = document.getElementById('order');
  order_div.style = 'display: block;';
  order_div.innerHTML = '<h4>Pedido #91</h4>';
  order_div.appendChild(burger);
  order_div.appendChild(price);
}
