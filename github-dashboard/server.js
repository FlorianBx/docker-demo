require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));

app.get('/api/github/:owner/:repo/contributors', async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors?per_page=20`, {
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'User-Agent': 'GitHub-Dashboard'
      }
    });
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'GitHub API error' });
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/github/:owner/:repo', async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'User-Agent': 'GitHub-Dashboard'
      }
    });
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'GitHub API error' });
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
