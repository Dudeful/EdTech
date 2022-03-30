module.exports = {
	apps: [
		{
			name: 'FRONTEND-37',
			cwd: 'frontend/',
			script: 'server.js',
			watch: true,
		},
		{
			name: 'BACKEND-37',
			cwd: 'backend/',
			script: 'server.js',
			watch: false,
		},
	],
};
