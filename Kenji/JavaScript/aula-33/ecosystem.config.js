module.exports = {
	apps: [
		{
			name: 'FrontEnd:3000',
			script: './frontend/server.js',
			watch: true,
		},
		{
			name: 'BackEnd:5000',
			script: './backend/server.js',
			watch: true,
		},
	],
};
