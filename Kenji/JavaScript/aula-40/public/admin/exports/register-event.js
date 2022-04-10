const apiUrl = 'http://localhost:8000';

const registerEvent = async () => {
	try {
		const title = document.getElementById('event_title');
		const description = document.getElementById('event_description');
		const date = document.getElementById('event_date');
		const time = document.getElementById('event_time');
		const address = document.getElementById('event_address');

		const event = {
			title: title.value,
			description: description.value,
			date: date.value,
			time: time.value,
			address: address.value,
		};

		title.value = '';
		description.value = '';
		date.value = '';
		time.value = '';
		address.value = '';

		const options = {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ data: event }),
		};

		const response = await fetch(
			apiUrl + '/api/events/register',
			options
		);

		const status = await response.json();

		if (!status.eventSaved) throw new Error(status.error);
	} catch (error) {
		alert(error.message);
		console.error(error);
	}
};

export default registerEvent;
