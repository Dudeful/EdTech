import register from './exports/register.js';
import race from './exports/fetch-user.js';

const registerButton = document.getElementById('register_button');
const fetchButton = document.getElementById('fetch_user');

registerButton.addEventListener('click', register);
fetchButton.addEventListener('click', race);
