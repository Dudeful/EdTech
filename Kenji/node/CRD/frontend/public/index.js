const apiURL = 'http://edtech.dudeful.com:5002';
const queryParam = document.getElementById('query_param');
const queryValue = document.getElementById('query_value');
const postCustomerButton = document.getElementById('post_customer_button');
const getCustomerButton = document.getElementById('get_customers_button');

queryParam.addEventListener('change', () => selectHandler());
postCustomerButton.addEventListener('click', () => postCustomers());
getCustomerButton.addEventListener('click', () => getCustomers(queryParam.value, queryValue.value));

const selectHandler = () => {
  queryValue.setAttribute('placeholder', queryParam.value);
  queryValue.disabled = false;

  if(queryParam.value === 'All'){
    queryValue.value = 'All';
  }
}

const postCustomers = () => {
  const id = document.getElementById('customer_id').value;
  const name = document.getElementById('customer_name').value;
  const email = document.getElementById('customer_email').value;
  // const emailPattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);

  // if(!Number.isInteger(Number(id))){
  //   alert('the id must be an integer!');
  //   return;
  // }

  // if(!emailPattern.test(email)){
  //   alert('invalid email!');
  //   return;
  // }

  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({data: {id, name, email}})
  }

  fetch(`${apiURL}/customers/post-customer`, options)
  .then(res => res.json())
  .then(data => {
    if(data.error){
      alert(data.msg)
    }else{
      getCustomers('All', 'All');
    }
  })
  .catch(err => console.error(err));
}

const getCustomers = (param, query) => {
  if(param !== 'All' && param !== 'ID' && query.length < 3) {
    alert('the search value must be greater than 3 characteres');
    return;
  }

  if (query) {
    fetch(
      `${apiURL}/customers/get-customers?${param}=${query}`
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
        }else{
          renderResponse(data.data);
        }
      })
      .catch((err) => console.error(err));
  }else{
    alert('no query provided!');
  }
};

const deleteCustomer = (id) => {
  console.log(id);
  fetch(`${apiURL}/customers/delete-customer?id=${id}`, {method: 'DELETE'})
  .then(res => res.json())
  .then(data => {
    if(data.error){
      alert(data.msg)
    }else{
      getCustomers('All', 'All');
    }
  })
  .catch(err => console.error(err));
}

const renderResponse = (data) => {
  const fetchedData = document.getElementById('customers_db');
  fetchedData.innerHTML = '';

  if(data){
    data.forEach(
      (el) =>
        (fetchedData.innerHTML += `
          <div class='customers_db'>
          <button type='button' class='delete_customer_button' id='${el.id}'>X</button>
          <ul>
            <li>User ID: ${el.id}</li>
            <li>User Name: ${el.name}</li>
            <li>User Email: ${el.email}</li>
          </ul>
          </div>
        `)
    );

    const deleteCustomerButton = document.querySelectorAll('.delete_customer_button');
    Array.from(deleteCustomerButton).forEach(el => {
      el.addEventListener('click', (event) => deleteCustomer(event.target.id));
    })
  }
};