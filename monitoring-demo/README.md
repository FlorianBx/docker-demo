# Monitoring Demo with Uptime Kuma

Learn the basics of monitoring with Docker.

## 🚀 Quick Start

```bash
cd monitoring-demo
docker-compose up -d
```

Wait 1 minute, then open http://localhost:3001

## 🌐 Services

| Service | URL | Description |
|---------|-----|-------------|
| Uptime Kuma | http://localhost:3001 | Monitoring dashboard |
| Node.js App | http://localhost:3000 | Simple web app |
| Python API | http://localhost:5000 | REST API |
| Broken App | http://localhost:8080 | App that crashes (demo) |
| PostgreSQL | localhost:5432 | Database |

## 📊 First Setup

1. Open http://localhost:3001
2. Create admin account
3. Add monitors (see below)

## ➕ Add Monitors

Click "Add New Monitor" and create these:

| Monitor Name | Type | URL/Settings | Interval |
|-------------|------|--------------|----------|
| Node.js App | HTTP(s) | `http://node-app:3000` | 60s |
| Python API | HTTP(s) | `http://python-api:5000/health` | 30s |
| Broken App | HTTP(s) | `http://broken-app:8080` | 30s |
| PostgreSQL | PostgreSQL | `postgres://monitor:monitor123@postgres:5432/monitoring_db` | 60s |

**Important**: Use `http://` not `https://` for the web apps!

## 🎯 What to Watch

- **Green** = Service is UP
- **Red** = Service is DOWN
- **Response Time** = How fast it responds
- **Uptime %** = How reliable it is

## 🎮 Try This

1. Refresh http://localhost:8080 many times (it will crash!)
2. Stop a service: `docker-compose stop node-app`
3. Watch the monitoring dashboard react

<details>
<summary>📚 Learn More</summary>

### Alternative Monitor Setup

If PostgreSQL monitor doesn't work, use TCP Port instead:
- **Type**: TCP Port
- **Hostname**: `postgres`
- **Port**: `5432`

### Service Endpoints

**Node.js App**
- `/` - Home page
- `/health` - Health check

**Python API**
- `/` - Home page
- `/api/status` - Service status
- `/api/users` - User list
- `/health` - Health check

**Broken App**
- `/` - Home (crashes after few requests)
- `/health` - Health (fails randomly)

### Monitoring Concepts

| Metric | Meaning | Good Value |
|--------|---------|------------|
| Uptime | Service availability | > 99% |
| Response Time | Speed | < 1000ms |
| Status Code | HTTP response | 200 |

### Commands

```bash
# View logs
docker-compose logs -f uptime-kuma

# Restart service
docker-compose restart node-app

# Reset everything
docker-compose down -v
```

### Next Steps

After learning Uptime Kuma:
- Try Prometheus (metrics)
- Try Grafana (dashboards)
- Try ELK Stack (logs)

</details>