# Docker Demo Collection

Three practical Docker examples for learning containerization.

## 🚀 Quick Start

```bash
# Clone and choose a demo
cd docker-testing

# Option 1: GitHub Dashboard
cd github-dashboard && docker-compose up

# Option 2: Service Monitoring  
cd monitoring-demo && docker-compose up -d

# Option 3: Symfony + PostgreSQL
cd symfony-postgre && docker-compose up --build
```

## 📦 Available Demos

| Demo | Description | Access URL |
|------|-------------|------------|
| **GitHub Dashboard** | Real-time GitHub repo stats | http://localhost:3000 |
| **Monitoring Demo** | Uptime Kuma monitoring multiple services | http://localhost:3001 |
| **Symfony PostgreSQL** | Full-stack PHP application with database | http://localhost |

## 🎯 What You'll Learn

- **Container basics** - Building and running Docker containers
- **Multi-service apps** - Container networking and communication  
- **Real tools** - Nginx, PostgreSQL, monitoring systems
- **Best practices** - Environment variables, volumes, health checks

## 📋 Requirements

- Docker & Docker Compose installed
- Available ports: 80, 3000, 3001, 5000, 5432, 8080

## 🛠️ Common Commands

```bash
docker-compose up        # Start services
docker-compose down      # Stop services  
docker-compose logs -f   # View logs
docker ps               # List containers
```

<details>
<summary><strong>Demo Details</strong></summary>

### GitHub Dashboard
- **Stack**: Node.js + Express
- **Setup**: Add GitHub token to `.env`
- **Learn**: Single container apps, API integration

### Monitoring Demo  
- **Stack**: Uptime Kuma + Node.js + Python + PostgreSQL
- **Setup**: Create admin account, add monitors
- **Learn**: Multi-container orchestration, health monitoring

### Symfony PostgreSQL
- **Stack**: Nginx + PHP + PostgreSQL + Adminer
- **Setup**: Automatic - just run docker-compose
- **Learn**: Production-ready setup, database integration

</details>

<details>
<summary><strong>Troubleshooting</strong></summary>

| Issue | Solution |
|-------|----------|
| Port conflict | Change port in `docker-compose.yml` |
| Container fails | Check logs: `docker-compose logs [service]` |
| Can't connect | Use container name, not localhost |

</details>

Each demo includes its own detailed README. Start with GitHub Dashboard for basics, then explore the others!