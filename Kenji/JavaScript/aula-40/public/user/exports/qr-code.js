// const apiUrl = 'http://localhost:8000';
const apiUrl = 'http://edtech.dudeful.com:8000';

const getQRCodeData = async () => {
	try {
		const response = await fetch(`${apiUrl}/api/qr-code`);

		const codes = await response.json();

		return codes;
	} catch (error) {
		console.error(error);
	}
};

const qrCode = async () => {
	const container = document.getElementById('container');

	//FIXME fix event.remove() and code.remove()
	const events = document.querySelectorAll('.event');
	Array.from(events).forEach((event) => event.remove());
	const codes = document.querySelectorAll('.codes');
	Array.from(codes).forEach((code) => code.remove());

	const qrCodeData = await getQRCodeData();

	console.log(qrCodeData);

	if (qrCodeData.error) {
		container.innerHTML = `
		<h1 style="text-align: center">QR CODE</h1>
		<p  style="text-align: center">${qrCodeData.error}</p>
		<button type="button" onclick="window.location = '/'">Login Again</button>
		`;

		return;
	}

	if (!qrCodeData.events || !qrCodeData.events[0]) {
		alert('You does not have any event registered in your user');
		return;
	}

	qrCodeData.events.map((event) => {
		container.innerHTML += `
			<div class="codes">
				<small style="text-align: center">id: ${event.id}</small>
				<h1 style="text-align: center">${event.title}</h1>
				<img class="qrcode_img" src="${event.code}">
			</div>
		`;
	});
};

export default qrCode;
