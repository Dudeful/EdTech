module.exports = {
  apps: [
    {
      "script": "server.js",
      "cwd": "backend/",
      "name": "Backend:5006",
      "watch": true
    },
    {
      "script": "server.js",
      "cwd": "frontend/",
      "name": "Frontend:5007",
      "watch": true
    }
  ]
}