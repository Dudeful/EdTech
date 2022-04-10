import getEvents from './exports/events.js';
import qrCode from './exports/qr-code.js';

const qrCodeButton = document.getElementById('qrcode_button');
const eventsButton = document.getElementById('events_button');

qrCodeButton.addEventListener('click', qrCode);
eventsButton.addEventListener('click', getEvents);
