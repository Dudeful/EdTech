const register = async () => {
	try {
		const fName = document.getElementById('f_name').value;
		const lName = document.getElementById('l_name').value;
		const email = document.getElementById('register_email').value;
		const password = document.getElementById(
			'resgister_password'
		).value;
		const confirmPassword = document.getElementById(
			'confirm_password'
		).value;

		const user = { fName, lName, email, password, confirmPassword };

		const options = {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ user: user }),
		};

		const response = await fetch(
			'http://192.168.237.85:3000/timeout',
			options
		);

		console.log(response);
	} catch (error) {
		alert(error.code + ':' + error.message);
		console.error(error);
	}
};

export default register;
