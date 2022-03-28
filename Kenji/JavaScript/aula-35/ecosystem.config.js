module.exports = {
	apps: [
		{
			name: 'BACKEND-35',
			script: 'server.js',
			cwd: 'backend/',
			watch: true,
		},
		{
			name: 'FRONTEND-35',
			script: 'server.js',
			cwd: 'frontend/',
			watch: true,
		},
	],
};
