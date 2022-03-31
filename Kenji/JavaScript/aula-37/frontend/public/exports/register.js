const register = async () => {
	try {
		const fName = document.getElementById('f_name');
		const lName = document.getElementById('l_name');
		const email = document.getElementById('register_email');
		const password = document.getElementById('resgister_password');

		const user = {
			fName: fName.value,
			lName: lName.value,
			email: email.value,
			password: password.value,
		};

		fName.value = '';
		lName.value = '';
		email.value = '';
		password.value = '';

		const options = {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ data: user }),
		};

		const response = await fetch(
			'http://localhost:5037/register',
			options
		);

		const userToken = await response.json();

		if (userToken.error) throw new Error(userToken.error);

		// sessionStorage.setItem('classified_token', userToken.user.token);
		const token = document.getElementById('classified_input');
		token.value = userToken.user.token;
	} catch (error) {
		alert(error.message);
		console.error(error);
	}
};

export default register;
