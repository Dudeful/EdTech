const apiUrl = 'http://localhost:5039';

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

		const response = await fetch(apiUrl + '/register', options);

		const auth = await response.json();

		if (!auth.isAuthorized) throw new Error(auth.error);

		// sessionStorage.setItem('classified_token', userToken.user.token);
	} catch (error) {
		alert(error.message);
		console.error(error);
	}
};

export default register;
