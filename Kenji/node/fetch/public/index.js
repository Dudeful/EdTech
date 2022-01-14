const fetchUsers = () => {
  const userID = document.getElementById('userID').value;
  const userName = document.getElementById('userName').value;
  const userEmail = document.getElementById('userEmail').value;

  fetch(
    `/fetch-users?id=${userID}&name=${userName}&email=${userEmail}`
  )
    .then((res) => {
      if (res.status < 200 || res.status > 299) {
        alert(
          `Error with Status Code: ${res.status} Check the console for info about the error.`
        );
        console.log(res.status, res);
        return;
      }

      return res.json();
    })
    .then((data) => renderResponse(data))
    .catch((err) => console.error(err));
};

const renderResponse = (data) => {
  const fetchedData = document.getElementById('fetched_data');
  fetchedData.innerHTML = '';

  if (data.error) {
    alert(data.msg);
  } else {
    data.users.forEach(
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
