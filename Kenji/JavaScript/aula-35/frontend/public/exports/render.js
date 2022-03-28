const render = (user) => {
	const hasUser = document.getElementById('render_user');
	if (hasUser) hasUser.remove();

	const loginSection = document.getElementById('login_section');
	const renderUser = document.createElement('div');
	renderUser.id = 'render_user';

	renderUser.innerHTML = `
    <p class='user_data'>${user.fName}</p>
    <p class='user_data'>${user.lName}</p>
    <p class='user_data'>${user.email}</p>
  `;

	loginSection.appendChild(renderUser);
};

export default render;
