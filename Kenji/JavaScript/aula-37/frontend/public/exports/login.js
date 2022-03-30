const login = async () => {
	try {
		const email = document.getElementById('login_email').value;
		const password = document.getElementById('login_password').value;

		const user = { email, password };

		const options = {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ data: user }),
		};

		const response = await fetch(
			'http://localhost:5037/login',
			options
		);

		const userToken = await response.json();

		if (userToken.error) throw new Error(userToken.error);

		sessionStorage.setItem('classified_token', userToken.user.token);
	} catch (error) {
		alert(error.message);
		console.error(error);
	}
};

export default login;
