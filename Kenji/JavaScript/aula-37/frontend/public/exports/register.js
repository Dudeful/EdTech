const register = async () => {
	try {
		const fName = document.getElementById('f_name').value;
		const lName = document.getElementById('l_name').value;
		const email = document.getElementById('register_email').value;
		const password = document.getElementById(
			'resgister_password'
		).value;

		const user = { fName, lName, email, password };

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

		sessionStorage.setItem('classified_token', userToken.user.token);
	} catch (error) {
		alert(error.message);
		console.error(error);
	}
};

export default register;
