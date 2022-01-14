function requestProductById() {
  const id = document.getElementById('productID').value;

  const xhttp = new XMLHttpRequest();

  xhttp.onload = function () {
    const res = JSON.parse(this.response);

    if (res.error) {
      alert(res.msg);
      document.getElementById('nodeRes').innerHTML = '';
    } else {
      res.products.forEach(
        (el) =>
          (document.getElementById('nodeRes').innerHTML += `
            <h3>product: ${el.product}</h3>
          `)
      );
    }
  };

  if (id && Number(id) > 0 && Number.isInteger(Number(id))) {
    xhttp.open('GET', '/request-product/' + id, true);
    xhttp.send();
  } else {
    alert(
      'É NECESSÁRIO UM ID INTEIRO E POSITIVO PARA REALIZAR A REQUISIÇÃO! (ex.: 5)'
    );
    document.getElementById('nodeRes').innerHTML = '';
  }
}
