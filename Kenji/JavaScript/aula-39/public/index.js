import register from './exports/register.js';
import login from './exports/login.js';
import classified from './exports/classified.js';

const registerButton = document.getElementById('register_button');
const loginButton = document.getElementById('login_button');
const classifiedButton = document.getElementById('classified_button');

registerButton.addEventListener('click', register);
loginButton.addEventListener('click', login);
classifiedButton.addEventListener('click', classified);
