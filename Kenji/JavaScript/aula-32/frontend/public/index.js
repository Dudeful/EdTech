$(document).ready(() => {
	$('#root').append(`
    <form id="cep">
      <label for="zip_code">Zip Code
        <input id="zip_code" type="text" name="zip_code" placeholder="12345678" />
      </label>
      <button id="submit_zip" type="button">Submit</button>
    </form>
  `);

	$('#submit_zip').click(zipCodeHandler);
});

const zipCodeHandler = () => {
	const zip = $('#zip_code').val().trim();
	const regex = /^[0-9]{8}$/;

	if (!regex.test(zip)) {
		alert('ZIP code must have the following format: 12345678');
		return;
	}

	getZipCodeData(zip);
};

const getZipCodeData = async (zip) => {
	try {
		const data = await $.ajax(
			`https://cep.awesomeapi.com.br/json/${zip}`
		);
		renderZipCodeData(data);
	} catch (error) {
		renderZipCodeError(error.responseJSON);
	}
};

const renderZipCodeData = (data) => {
	$('#zip_data').remove();

	$('#root').append(`
    <table id="zip_data">
      <tr>
        <th>ZIP</th>
        <th>Address</th>
        <th>District</th>
        <th>State</th>
        <th>City</th>
        <th>DDD</th>
      </tr>
      <tr>
        <td>${data.cep}</td>
        <td>${data.address}</td>
        <td>${data.district}</td>
        <td>${data.state}</td>
        <td>${data.city}</td>
        <td>${data.ddd}</td>
      </tr>
    </table>
  `);
};

const renderZipCodeError = (error) => {
	$('#zip_data').remove();

	$('#root').append(`
    <table id="zip_data">
      <tr>
        <th>status</th>
        <th>error</th>
        <th>message</th>
      </tr>
      <tr>
        <td>${error.status}</td>
        <td>${error.code}</td>
        <td>${error.message}</td>
      </tr>
    </table>
  `);
};
