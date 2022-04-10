// const apiUrl = 'http://localhost:8000';
const apiUrl = 'http://edtech.dudeful.com:8000';

const getEvents = async () => {
	//FIXME fix event.remove() and code.remove()
	const events = document.querySelectorAll('.event');
	Array.from(events).forEach((event) => event.remove());
	const codes = document.querySelectorAll('.codes');
	Array.from(codes).forEach((code) => code.remove());

	try {
		const response = await fetch(apiUrl + '/api/events/get');

		const events = await response.json();

		if (events.error) throw new Error(events.error);

		renderEvents(events.data);
	} catch (error) {
		alert(error.message);
		console.error(error);
	}
};

const renderEvents = (eventsData) => {
	const container = document.getElementById('container');

	eventsData.map((event) => {
		container.innerHTML += `
			<div class="event">
				<small><span>id:</span> ${event.id}</small>
				<h2>${event.title}</h2>
				<img class="event_img" src="${event.img}">
				<h4><span>Description:</span> ${event.description}</h4>
				<h4><span>Date:</span> ${event.date}</h4>
				<h4><span>Time:</span> ${event.time}</h4>
				<button type="button" class="signup" id="${event.id}" style="margin: 20px 0">sign up</button>
			</div>
		`;
	});

	const signUpButton = document.querySelectorAll('.signup');
	Array.from(signUpButton).forEach(function (button) {
		button.addEventListener('click', (event) =>
			confirmSignUp(event.target.id)
		);
	});
};

const confirmSignUp = (id) => {
	const container = document.getElementById('container');

	container.innerHTML = `
		<h2>ARE YOU SURE YOU WANT TO SIGN UP FOR THIS EVENT?</h2>
		<button id="confirm_signup">CONFIRM</button>
	`;

	document
		.getElementById('confirm_signup')
		.addEventListener('click', () => signUp(id));
};

const signUp = async (id) => {
	try {
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ data: { id } }),
		};

		const response = await fetch(`/api/events/sign-up`, options);

		const status = await response.json();

		if (status.error) throw new Error(status.error);

		if (!status.isSignedUp)
			throw new Error('something went wrong, please try again!');

		alert(
			'you have signed up for the event! checkout your QR CODES section'
		);

		window.location = '/user';
	} catch (error) {
		console.error(error);
		alert(error.message);
		window.location = '/';
	}
};

export default getEvents;
