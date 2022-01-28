module.exports = {
  apps : [
    {
      name   : "Frontend:5003",
      script : "server.js",
      cwd: "frontend/",
      watch: true
    },
    {
      name   : "Backend:5002",
      script : "server.js",
      cwd: "backend/",
      watch: true
    }
  ]
}
