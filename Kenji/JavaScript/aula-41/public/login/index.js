// const apiUrl = 'http://localhost:8000';
const apiUrl = 'http://edtech.dudeful.com:8000';

const login = async () => {
	try {
		const email = document.getElementById('login_email');
		const password = document.getElementById('login_password');

		const user = { email: email.value, password: password.value };

		email.value = '';
		password.value = '';

		const options = {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ data: user }),
		};

		const response = await fetch(apiUrl + '/api/user/login', options);

		const auth = await response.json();

		if (!auth.isAuthorized) throw new Error(auth.error);

		if (auth.isAdmin) {
			window.location = '/admin';
			return;
		}

		window.location = '/user';
	} catch (error) {
		alert(error.message);
		console.error(error);
	}
};

const loginButton = document.getElementById('login_button');
loginButton.addEventListener('click', login);
