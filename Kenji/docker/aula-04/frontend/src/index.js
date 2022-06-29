const root = document.getElementById('root');

const getImage = async () => {
	try {
		const response = await fetch('http://lab.dudeful.com:5000/');
		const data = await response.json();

		root.innerHTML += `
      <img src='${data.image}' />
    `;
	} catch (error) {
		console.error(error.message);
	}
};

document
	.getElementById('fetch_button')
	.addEventListener('click', () => getImage());

const saveFoo = async () => {
	try {
		const fooData = document.getElementById('foo_input');

		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ data: { foo: fooData.value } }),
		};

		const response = await fetch(
			'http://lab.dudeful.com:5000/foo',
			options
		);

		const data = await response.json();

		root.innerHTML = `
      <h2 id='foo_response'>
				${data.foo}: - Created At ${data.createdAt}
			<h2/>
    `;
	} catch (error) {
		console.error(error.message);
	}
};

document
	.getElementById('save_foo_button')
	.addEventListener('click', () => saveFoo());

const getFoo = async () => {
	try {
		const response = await fetch('http://lab.dudeful.com:5000/foo');
		const data = await response.json();

		root.innerHTML = `<div id='foo_div'></div>`;
		const fooDiv = document.getElementById('foo_div');

		data.forEach((foo) => {
			fooDiv.innerHTML += `
				<div class='foos'>
					<p>id: ${foo._id}<p/>
					<p>foo: ${foo.foo}<p/>
					<p>created at: ${foo.createdAt}<p/>
				</div>
				`;
		});
	} catch (error) {
		console.error(error.message);
	}
};

document
	.getElementById('get_foo_button')
	.addEventListener('click', () => getFoo());
