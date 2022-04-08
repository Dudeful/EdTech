const apiUrl = 'http://localhost:5039';

const getClassifiedData = async () => {
	try {
		// const token = sessionStorage.getItem('classified_token');

		const response = await fetch(`${apiUrl}/classified`, {
			credentials: 'include',
		});

		const classified_data = await response.json();

		return classified_data;
	} catch (error) {
		console.error(error);
	}
};

const classified = async () => {
	const container = document.getElementById('container');

	const classifiedData = await getClassifiedData();

	console.log(classifiedData);

	if (classifiedData.error) {
		container.innerHTML = `
		<h1 style="text-align: center">C L A S S I F I E D</h1>
		<p  style="text-align: center">${classifiedData.error}</p>
		`;

		return;
	}

	container.innerHTML = `
		<h1 style="text-align: center">C L A S S I F I E D</h1>
    <img id="classified_img" src="${classifiedData.hackerman}">
    <img style="margin-top: 5vh" id="classified_img" src="${classifiedData.data}">
  `;
};

export default classified;
