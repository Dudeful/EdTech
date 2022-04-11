import registerUser from './exports/register-user.js';
import registerEvent from './exports/register-event.js';

const registerUserButton = document.getElementById(
	'register_user_button'
);
const registerEventButton = document.getElementById(
	'register_event_button'
);

registerUserButton.addEventListener('click', registerUser);
registerEventButton.addEventListener('click', registerEvent);
