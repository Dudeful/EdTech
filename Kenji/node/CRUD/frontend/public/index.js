const apiURL = 'http://edtech.dudeful.com:5004';
const idInput = document.getElementById('query_value');
const postProductButton = document.getElementById('post_product_button');
const updateProductButton = document.getElementById('update_product_button');
const getProductsButton = document.getElementById('get_products_button');

postProductButton.addEventListener('click', () => postProduct());
updateProductButton.addEventListener('click', () => updateProduct());
getProductsButton.addEventListener('click', () => getProducts(idInput.value));

const postProduct = () => {
  const id = document.getElementById('product_id').value;
  const name = document.getElementById('product_name').value;

  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({data: {id, name}})
  }

  fetch(`${apiURL}/products`, options)
  .then(res => res.json())
  .then(data => {
    if(data.error){
      alert(data.msg)
    }else{
      getProducts();
    }
  })
  .catch(err => console.error(err));
}

const updateProduct = () => {
  const id = document.getElementById('product_id').value;
  const name = document.getElementById('product_name').value;

  const options = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({data: {id, name}})
  }

  fetch(`${apiURL}/products/${id}`, options)
  .then(res => res.json())
  .then(data => {
    if(data.error){
      alert(data.msg)
    }else{
      getProducts();
    }
  })
  .catch(err => console.error(err));
}

const getProducts = (id) => {
  if(!id){
    id = 'All'
  }

  fetch(
    `${apiURL}/products/${id}`
  )
    .then((res) => {
      if (!res.ok) {
        alert(
          `Error ${res.status}, check the console for more information.`
        );
        console.log(res.status, res);
        return;
      }

      return res.json();
    })
    .then((data) => {
      if(data.error){
        alert(data.msg);
        renderResponse(false);
        renderResponse(data.data);
      }else{
        renderResponse(data.data);
      }
    })
    .catch((err) => console.error(err));
};

const deleteProduct = (id) => {
  console.log(id);
  fetch(`${apiURL}/products/${id}`, {method: 'DELETE'})
  .then(res => res.json())
  .then(data => {
    if(data.error){
      alert(data.msg)
    }else{
      getProducts();
    }
  })
  .catch(err => console.error(err));
}

const renderResponse = (data) => {
  const fetchedData = document.getElementById('products_db');
  fetchedData.innerHTML = '';

  if(data){
    data.forEach(
      (el) =>
        (fetchedData.innerHTML += `
          <div class='products_db'>
          <button type='button' class='delete_product_button' id='${el.id}'>X</button>
          <ul>
            <li>Product ID: ${el.id}</li>
            <li>Product Name: ${el.name}</li>
          </ul>
          </div>
        `)
    );

    const deleteProductButton = document.querySelectorAll('.delete_product_button');
    Array.from(deleteProductButton).forEach(el => {
      el.addEventListener('click', (event) => deleteProduct(event.target.id));
    })
  }
};