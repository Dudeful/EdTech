const queryParam = document.getElementById('query_param');
const queryValue = document.getElementById('query_value');

queryParam.addEventListener('change', () => selectHandler());
queryValue.addEventListener('input', () => debounce());

const selectHandler = () => {
  queryValue.setAttribute('placeholder', queryParam.value);
  queryValue.disabled = false;
}

const debounceHandler = (delay) => {
  let debouncing;
  return function () {
    clearTimeout(debouncing);
    console.log('hello')
    debouncing = setTimeout(() => fetchUsers(), delay);
  }
};

const debounce = debounceHandler(2000);

const fetchUsers = () => {
  if (queryValue.value && queryValue.value.length > 3) {
    fetch(
      `/fetch-users?${queryParam.value}=${queryValue.value}`
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
      .then((data) => renderResponse(data))
      .catch((err) => console.error(err));
  }
};

const renderResponse = (res) => {
  const fetchedData = document.getElementById('fetched_data');
  fetchedData.innerHTML = '';

  if (res.error) {
    alert(res.msg);
  } else {
    res.data.forEach(
      (el) =>
      (fetchedData.innerHTML += `
        <div class='fetched_data'>
        <ul>
          <li>User ID: ${el.id}</li>
          <li>User Name: ${el.name}</li>
          <li>User Email: ${el.email}</li>
        </ul>
        </div>
        `)
    );
  }
};
