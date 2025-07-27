# GitHub Dashboard

Real-time dashboard for GitHub repository statistics and contributors.

## Usage

1. Add your GitHub token to `.env`:
   ```
   GITHUB_TOKEN=your_github_token_here
   ```

2. Edit repository to track in `public/index.html` line 92:
   ```javascript
   'owner/repository-name'
   ```

3. Start:
   ```bash
   docker-compose up
   ```

4. Open → `http://localhost:3000`

## What it shows

| Metric | Description |
|--------|-------------|
| Top Contributor | User with most commits |
| Total Contributions | Sum of all commits |
| Active Developers | Number of contributors |
| Total Stars | Repository stars |

<details>
<summary><strong>Tech Stack</strong></summary>

| Component | Technology |
|-----------|------------|
| Backend | Express.js |
| Frontend | Alpine.js + PicoCSS |
| Container | Docker |

</details>

<details>
<summary><strong>API Endpoints</strong></summary>

| Endpoint | Returns |
|----------|---------|
| `/api/github/:owner/:repo` | Repository data |
| `/api/github/:owner/:repo/contributors` | Top 20 contributors |

</details>

<details>
<summary><strong>Environment Variables</strong></summary>

| Variable | Required | Default | Purpose |
|----------|----------|---------|---------|
| `GITHUB_TOKEN` | ✅ | - | GitHub API authentication |
| `PORT` | ❌ | 3000 | Server port |

</details>

<details>
<summary><strong>Multiple Repositories</strong></summary>

Add multiple repos in `public/index.html`:

```javascript
repos: [
  'microsoft/vscode',
  'facebook/react',
  'your-org/your-repo'
]
```

Dashboard aggregates all contributors and shows combined stats.

</details>

<details>
<summary><strong>Private Repositories</strong></summary>

For private repos or organization repos:

1. Token needs `repo` scope
2. For organization repos: enable SSO authorization on your token
3. Verify access: `curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/repos/owner/repo`

</details>

<details>
<summary><strong>File Structure</strong></summary>

```
├── server.js              # Express backend + GitHub API proxy
├── public/index.html      # Complete frontend app
├── docker-compose.yml     # Development setup
└── .env                   # GitHub token (create this)
```

</details>