import render from './render.js';

const fetchUser = async () => {
	try {
		const email = document.getElementById('login_email').value;
		const password = document.getElementById('login_password').value;

		const response = await fetch(`http://localhost:5000/timeout`);
		const user = await response.json();

		return user;
	} catch (error) {
		alert(error.code + ': ' + error.message);
		console.error(error);
	}
};

const race = () => {
	const p = new Promise((resolve, reject) => {
		const user = fetchUser();
		resolve(user);
	});

	const p2 = new Promise((resolve, reject) => {
		setTimeout(resolve, 3000, null);
	});

	Promise.race([p, p2])
		.then((res) => {
			if (res) {
				render(res);
			} else {
				const hasUser = document.getElementById('render_user');
				if (hasUser) hasUser.remove();

				alert(
					'Timeout: server took longer than 3 seconds to responde.'
				);
			}
		})
		.catch((error) => console.error(error));
};

export default race;
