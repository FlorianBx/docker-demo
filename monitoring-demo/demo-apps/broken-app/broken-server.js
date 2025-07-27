const express = require('express');
const app = express();
const PORT = 8080;

let requestCount = 0;
let crashAfter = Math.floor(Math.random() * 10);

app.get('/', (req, res) => {
  requestCount++;
  
  if (requestCount >= crashAfter) {
    console.error('CRASH! App is going down...');
    setTimeout(() => {
      process.exit(1);
    }, 100);
    res.status(500).send('<h1>💥 APP CRASHED!</h1>');
    return;
  }

  const crashIn = crashAfter - requestCount;
  res.send(`
    <h1>Broken App Demo</h1>
    <p>Status: <strong style="color: orange;">UNSTABLE</strong></p>
    <p>Request count: ${requestCount}</p>
    <p style="color: red;">⚠️ Will crash in ${crashIn} requests!</p>
    <p><small>This app randomly crashes to demonstrate monitoring alerts</small></p>
  `);
});

app.get('/health', (req, res) => {
  if (Math.random() < 0.3) {
    res.status(503).json({
      status: 'unhealthy',
      error: 'Random failure'
    });
  } else {
    res.json({
      status: 'healthy',
      requestCount: requestCount,
      crashIn: crashAfter - requestCount
    });
  }
});

app.listen(PORT, () => {
  console.log(`Broken app running on port ${PORT}`);
  console.log(`Will crash after ${crashAfter} requests`);
});
