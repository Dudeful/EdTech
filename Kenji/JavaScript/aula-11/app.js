function sendOrder() {
  let order = [];
  let bill = 0;

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
  } else if (document.getElementById('ribs').value) {
    order.push('Hambúrguer de Costela');
    bill += 10;
  } else if (document.getElementById('vegan').value) {
    order.push('Hambúrguer Vegano');
    bill += 12;
  }

  if (document.getElementById('lettuce').value) {
    order.push('Alface');
    bill += 1.5;
  } else if (document.getElementById('tomato').value) {
    order.push('Tomate');
    bill += 1.5;
  } else if (document.getElementById('no_salad').value) {
    order.push('Sem Salada');
  }

  if (document.getElementById('mozzarella').value) {
    order.push('Mussarela');
    bill += 3;
  } else if (document.getElementById('danish').value) {
    order.push('Queijo Prato');
    bill += 3;
  } else if (document.getElementById('cheddar').value) {
    order.push('Cheddar');
    bill += 5;
  }

  console.log(order);
  console.log(bill);

  const burger = document.createElement('div');
  const price = document.createElement('h3');
  burger.innerHTML = `
  <h3>${order[0]}</h3> 
  <h3>${order[1]} </h3>
  <h3>${order[2]} </h3>
  <h3>${order[3]} </h3>
  `;

  price.innerText = `R$ ${bill}`;

  document.getElementById('order').appendChild(burger);
  document.getElementById('order').appendChild(price);
}
