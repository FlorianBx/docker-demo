# Docker Demo Collection

# Cheatsheet Docker & Docker Compose 2025

## Commandes Docker essentielles

### Gestion des images

| Commande | Description | Exemple |
|----------|-------------|---------|
| `docker build -t <nom> .` | Construire une image | `docker build -t myapp:v1 .` |
| `docker build --no-cache -t <nom> .` | Build sans cache | `docker build --no-cache -t myapp:latest .` |
| `docker images` | Lister les images | `docker images` |
| `docker pull <image>:<tag>` | Télécharger une image | `docker pull nginx:alpine` |
| `docker push <image>:<tag>` | Publier une image | `docker push myrepo/myapp:v1` |
| `docker rmi <image>` | Supprimer une image | `docker rmi nginx:alpine` |
| `docker image prune -a` | Nettoyer toutes les images inutilisées | `docker image prune -a` |
| `docker tag <source> <target>` | Renommer/taguer une image | `docker tag myapp:dev myapp:v1.0` |

### Gestion des conteneurs

| Commande | Description | Exemple |
|----------|-------------|---------|
| `docker run -d --name <nom> <image>` | Créer et démarrer en arrière-plan | `docker run -d --name web nginx` |
| `docker run -it <image> sh` | Mode interactif avec shell | `docker run -it ubuntu:22.04 bash` |
| `docker run -p <host>:<container> <image>` | Mapper des ports | `docker run -p 8080:80 nginx` |
| `docker run -v <host>:<container> <image>` | Monter un volume | `docker run -v /data:/app/data myapp` |
| `docker ps` | Conteneurs actifs | `docker ps` |
| `docker ps -a` | Tous les conteneurs | `docker ps -a` |
| `docker start/stop/restart <container>` | Gérer l'état | `docker stop web` |
| `docker rm <container>` | Supprimer un conteneur | `docker rm web` |
| `docker exec -it <container> <cmd>` | Exécuter une commande | `docker exec -it web bash` |
| `docker logs -f <container>` | Voir les logs en temps réel | `docker logs -f web` |
| `docker stats` | Statistiques en temps réel | `docker stats` |

### Gestion des volumes

| Commande | Description | Exemple |
|----------|-------------|---------|
| `docker volume create <nom>` | Créer un volume | `docker volume create mydata` |
| `docker volume ls` | Lister les volumes | `docker volume ls` |
| `docker volume inspect <nom>` | Détails d'un volume | `docker volume inspect mydata` |
| `docker volume rm <nom>` | Supprimer un volume | `docker volume rm mydata` |
| `docker volume prune` | Nettoyer volumes inutilisés | `docker volume prune` |

### Gestion des réseaux

| Commande | Description | Exemple |
|----------|-------------|---------|
| `docker network create <nom>` | Créer un réseau | `docker network create mynet` |
| `docker network ls` | Lister les réseaux | `docker network ls` |
| `docker network connect <net> <container>` | Connecter conteneur au réseau | `docker network connect mynet web` |
| `docker network disconnect <net> <container>` | Déconnecter du réseau | `docker network disconnect mynet web` |
| `docker network rm <nom>` | Supprimer un réseau | `docker network rm mynet` |

### Commandes système

| Commande | Description | Exemple |
|----------|-------------|---------|
| `docker system df` | Utilisation disque | `docker system df` |
| `docker system prune -a --volumes` | Nettoyage complet | `docker system prune -a --volumes` |
| `docker info` | Informations système | `docker info` |
| `docker version` | Version Docker | `docker version` |

## Commandes Docker Compose

### Commandes principales

| Commande | Description | Exemple pratique |
|----------|-------------|------------------|
| `docker-compose up -d` | Démarrer services en arrière-plan | `docker-compose up -d` |
| `docker-compose up --build` | Démarrer avec rebuild | `docker-compose up --build` |
| `docker-compose down` | Arrêter et supprimer | `docker-compose down` |
| `docker-compose down -v` | Arrêter et supprimer avec volumes | `docker-compose down -v` |
| `docker-compose ps` | État des services | `docker-compose ps` |
| `docker-compose logs -f <service>` | Logs d'un service | `docker-compose logs -f web` |
| `docker-compose exec <service> <cmd>` | Commande dans un service | `docker-compose exec db psql -U postgres` |
| `docker-compose build` | Construire les services | `docker-compose build` |
| `docker-compose pull` | Télécharger les images | `docker-compose pull` |
| `docker-compose restart <service>` | Redémarrer un service | `docker-compose restart nginx` |
| `docker-compose scale <service>=<n>` | Mise à l'échelle | `docker-compose up -d --scale web=3` |

### Options utiles

| Option | Description | Exemple |
|--------|-------------|---------|
| `-f <fichier>` | Fichier compose spécifique | `docker-compose -f docker-compose.prod.yml up` |
| `-p <nom>` | Nom de projet | `docker-compose -p myproject up` |
| `--env-file <fichier>` | Fichier d'environnement | `docker-compose --env-file .env.prod up` |
| `--profile <profil>` | Activer un profil | `docker-compose --profile debug up` |

## Types de volumes Docker

### Comparaison des types

| Type | Syntaxe | Cas d'usage | Avantages |
|------|---------|-------------|-----------|
| **Named Volume** | `-v myvolume:/app/data` | Production, données persistantes | Géré par Docker, portable, performances optimales |
| **Bind Mount** | `-v /host/path:/container/path` | Développement, config | Accès direct aux fichiers hôte, modifications en temps réel |
| **Anonymous Volume** | `-v /app/cache` | Données temporaires | Créé automatiquement, isolé |

### Exemples pratiques

```bash
# Named volume (recommandé pour production)
docker volume create app_data
docker run -v app_data:/var/lib/mysql mysql:8

# Bind mount (développement)
docker run -v $(pwd)/src:/app/src:ro node:18  # Lecture seule
docker run -v $(pwd)/config:/etc/app nginx

# Anonymous volume (cache temporaire)
docker run -v /tmp/cache myapp
```

## Types de réseaux Docker

| Type | Usage | Commande | Caractéristiques |
|------|-------|----------|------------------|
| **bridge** | Par défaut, conteneurs sur même hôte | `docker network create --driver bridge mynet` | Isolation, DNS automatique (custom) |
| **host** | Performance maximale | `docker run --network=host nginx` | Partage stack réseau hôte |
| **overlay** | Multi-hôtes (Swarm) | `docker network create -d overlay myoverlay` | Communication distribuée |
| **none** | Isolation complète | `docker run --network=none myapp` | Aucun accès réseau |

### Exemples réseau

```bash
# Créer réseau custom avec subnet
docker network create --driver bridge \
  --subnet=192.168.1.0/24 \
  --gateway=192.168.1.1 \
  mynetwork

# Connecter conteneur avec IP fixe
docker run --network=mynetwork \
  --ip=192.168.1.100 \
  nginx
```

## Dockerfile - Directives essentielles

### Structure optimale multi-stage

```dockerfile
# Stage 1: Dépendances
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 3: Production
FROM node:18-alpine AS runner
WORKDIR /app

# Créer utilisateur non-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copier depuis stages précédents
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist

USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s CMD curl -f http://localhost:3000/health || exit 1
CMD ["node", "dist/server.js"]
```

### Directives principales

| Directive | Usage | Exemple |
|-----------|-------|---------|
| `FROM` | Image de base | `FROM node:18-alpine` |
| `WORKDIR` | Répertoire de travail | `WORKDIR /app` |
| `COPY` | Copier fichiers | `COPY --chown=user:group . .` |
| `RUN` | Exécuter commandes | `RUN apt-get update && apt-get install -y curl` |
| `ENV` | Variables d'environnement | `ENV NODE_ENV=production` |
| `ARG` | Arguments de build | `ARG VERSION=latest` |
| `EXPOSE` | Documenter ports | `EXPOSE 3000` |
| `USER` | Utilisateur d'exécution | `USER 1001` |
| `CMD` | Commande par défaut | `CMD ["npm", "start"]` |
| `ENTRYPOINT` | Point d'entrée | `ENTRYPOINT ["docker-entrypoint.sh"]` |
| `VOLUME` | Points de montage | `VOLUME ["/data"]` |
| `HEALTHCHECK` | Vérification santé | `HEALTHCHECK --interval=30s CMD curl -f http://localhost/health` |

## Structure docker-compose.yml

### Exemple complet production

```yaml
version: '3.8'

services:
  # Application web
  web:
    build:
      context: .
      dockerfile: Dockerfile
      target: production
      args:
        - NODE_ENV=production
    image: myapp:latest
    container_name: myapp_web
    restart: unless-stopped
    ports:
      - "80:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/myapp
      - REDIS_URL=redis://redis:6379
    volumes:
      - ./uploads:/app/uploads
      - logs:/app/logs
    networks:
      - frontend
      - backend
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M

  # Base de données PostgreSQL
  db:
    image: postgres:15-alpine
    container_name: myapp_db
    restart: always
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    networks:
      - backend
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Cache Redis
  redis:
    image: redis:7-alpine
    container_name: myapp_redis
    restart: always
    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    networks:
      - backend

  # Nginx reverse proxy
  nginx:
    image: nginx:alpine
    container_name: myapp_nginx
    restart: always
    ports:
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    networks:
      - frontend
    depends_on:
      - web

volumes:
  postgres_data:
  redis_data:
  logs:

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true
```

## Exemples pratiques courants

### Stack MEAN/MERN

```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:6
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASSWORD}
    volumes:
      - mongo_data:/data/db

  backend:
    build: ./backend
    environment:
      MONGODB_URI: mongodb://admin:${MONGO_PASSWORD}@mongodb:27017
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  mongo_data:
```

### WordPress avec MySQL

```yaml
version: '3.8'
services:
  wordpress:
    image: wordpress:latest
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: ${DB_PASSWORD}
      WORDPRESS_DB_NAME: wordpress
    volumes:
      - wordpress_data:/var/www/html

  db:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: ${DB_PASSWORD}
      MYSQL_ROOT_PASSWORD: ${ROOT_PASSWORD}
    volumes:
      - db_data:/var/lib/mysql

volumes:
  wordpress_data:
  db_data:
```

## Bonnes pratiques essentielles

### 1. Optimisation des images

```dockerfile
# ✅ BON: Utiliser alpine, regrouper RUN, nettoyer cache
FROM node:18-alpine
RUN apk add --no-cache git curl && \
    rm -rf /var/cache/apk/*

# ❌ MAUVAIS: Image lourde, commandes séparées
FROM node:18
RUN apt-get update
RUN apt-get install git
RUN apt-get install curl
```

### 2. Sécurité

```dockerfile
# Toujours utiliser un utilisateur non-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001
USER nextjs

# Scanner les vulnérabilités
# docker scout cves <image>
# trivy image <image>
```

### 3. Cache efficace

```dockerfile
# Copier d'abord les dépendances (changent peu)
COPY package*.json ./
RUN npm ci

# Puis le code source (change souvent)
COPY . .
```

### 4. Fichier .dockerignore

```dockerignore
node_modules
npm-debug.log*
.git
.env
.DS_Store
*.test.js
coverage/
dist/
```

### 5. Variables d'environnement

```bash
# .env (ne pas committer)
DB_PASSWORD=secure_password_here
API_KEY=your_api_key_here

# docker-compose.yml
environment:
  - DB_PASSWORD=${DB_PASSWORD}
```

## Commandes de debug utiles

| Commande | Description |
|----------|-------------|
| `docker inspect <container>` | Toutes les infos du conteneur |
| `docker logs --tail 50 -f <container>` | Derniers logs en temps réel |
| `docker exec -it <container> sh` | Shell dans le conteneur |
| `docker stats --no-stream` | Snapshot des ressources |
| `docker system df` | Espace disque utilisé |
| `docker events` | Événements Docker en temps réel |
| `docker diff <container>` | Changements filesystem |

## Astuces productivité

### Aliases bash utiles

```bash
# Ajouter dans ~/.bashrc ou ~/.zshrc
alias dps='docker ps'
alias dpsa='docker ps -a'
alias di='docker images'
alias dex='docker exec -it'
alias dlog='docker logs -f'
alias dprune='docker system prune -a --volumes'
alias dc='docker-compose'
alias dcup='docker-compose up -d'
alias dcdown='docker-compose down'
alias dclogs='docker-compose logs -f'
```

### One-liners pratiques

```bash
# Stopper tous les conteneurs
docker stop $(docker ps -aq)

# Supprimer tous les conteneurs
docker rm $(docker ps -aq)

# Supprimer toutes les images
docker rmi $(docker images -q)

# Copier fichier depuis conteneur
docker cp mycontainer:/app/config.json ./backup/

# Sauvegarder/restaurer volume
docker run --rm -v myvolume:/source -v $(pwd):/backup alpine tar czf /backup/volume-backup.tar.gz -C /source .
docker run --rm -v myvolume:/target -v $(pwd):/backup alpine tar xzf /backup/volume-backup.tar.gz -C /target
```

Ce cheatsheet couvre l'essentiel de Docker et Docker Compose avec des exemples pratiques immédiatement utilisables. Gardez-le à portée de main pour une référence rapide!
</details>

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
