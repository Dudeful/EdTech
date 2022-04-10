const apiUrl = 'http://localhost:8000';

const registerUser = async () => {
	try {
		const fullName = document.getElementById('full_name');
		const username = document.getElementById('username');
		const email = document.getElementById('register_email');
		const password = document.getElementById('resgister_password');
		const cpf = document.getElementById('cpf');

		const user = {
			fullName: fullName.value,
			username: username.value,
			email: email.value,
			password: password.value,
			cpf: cpf.value,
		};

		fullName.value = '';
		username.value = '';
		email.value = '';
		password.value = '';
		cpf.value = '';

		const options = {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ data: user }),
		};

		const response = await fetch(
			apiUrl + '/api/user/register',
			options
		);

		const status = await response.json();

		if (!status.userSaved) throw new Error(status.error);
	} catch (error) {
		alert(error.message);
		console.error(error);
	}
};

export default registerUser;
