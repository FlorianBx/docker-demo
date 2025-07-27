const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send(`
    <h1>Node.js Demo App</h1>
    <p>Status: <strong style="color: green;">ONLINE</strong></p>
    <p>Current time: ${new Date().toLocaleString()}</p>
    <p>Uptime: ${process.uptime().toFixed(0)} seconds</p>
  `);
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'node-app',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Node app running on port ${PORT}`);
});