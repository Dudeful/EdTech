const apiUrl = 'http://localhost:5038';

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

		const response = await fetch(apiUrl + '/login', options);

		const auth = await response.json();

		if (!auth.isAuthorized) throw new Error(auth.error);

		// sessionStorage.setItem('classified_token', userToken.user.token);
	} catch (error) {
		alert(error.message);
		console.error(error);
	}
};

export default login;
