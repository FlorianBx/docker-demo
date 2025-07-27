# Symfony + PostgreSQL Development Environment

A ready-to-use Symfony development environment with PostgreSQL, set up with Docker for education.

## 🚀 Quick Start

### Requirements
- Docker and Docker Compose installed
- Ports 80, 5432 and 8080 available

### Installation and start

```bash
# Download or clone the project
cd symfony-postgre

# Build and start all services
docker-compose up --build

# Run in background (optional)
docker-compose up -d --build
```

### First time setup

```bash
# Everything is automatic! Just wait for containers to start
# The application will be available at http://localhost

# To follow the logs:
docker-compose logs -f symfony-app
```

## 🌐 Access services

- **Symfony Application**: http://localhost
- **Adminer (PostgreSQL interface)**: http://localhost:8080
- **PostgreSQL**: localhost:5432

### Database connection
- **Server**: postgresql (or localhost:5432 from host)
- **Username**: symfony
- **Password**: symfony
- **Database**: symfony_db

## 📁 Project structure

```
symfony-postgre/
├── docker-compose.yml      # Services setup
├── Dockerfile             # PHP/Symfony image
├── nginx.conf              # Nginx configuration
├── php.ini                 # PHP configuration
├── .env                    # Docker environment variables
├── dev-mode.sh             # Switch to development mode
├── prod-mode.sh            # Switch to production mode
└── symfony/                # Symfony source code
    ├── .env                # Symfony configuration
    ├── composer.json       # PHP dependencies
    ├── public/             # Web entry point
    ├── src/                # Source code
    └── config/             # Symfony configuration
```

## 🔧 Useful commands

```bash
# View logs
docker-compose logs -f

# Access Symfony container
docker-compose exec symfony-app bash

# Stop services
docker-compose down

# Remove volumes and images
docker-compose down -v --rmi all

# Restart a service
docker-compose restart symfony-app
```

## 🎓 For students

### Demo included
The application includes a working demo with:
- A `User` entity with PostgreSQL
- REST APIs (`/api/users`, `/api/users/create`)
- Interactive web interface
- Complete Symfony + Doctrine + PostgreSQL integration

### Development vs Production modes

**Easy switch between modes:**
```bash
# Development mode (templates reload automatically)
./dev-mode.sh

# Production mode (optimized, templates cached)
./prod-mode.sh
```

**Development mode:**
- Twig templates reload automatically
- Debug enabled with detailed errors
- No need to clear cache or restart

**Production mode:**
- Optimized performance
- Templates cached
- Ready for deployment

### Common Symfony commands

```bash
# Access the container
docker-compose exec symfony-app bash

# Create a controller
bin/console make:controller

# Create an entity
bin/console make:entity

# Create a migration
bin/console make:migration
bin/console doctrine:migrations:migrate

# Clear cache
bin/console cache:clear
```

## 🛠️ Configuration

### Change database settings
Edit the `.env` file in the project root.

### Add Symfony packages
```bash
docker-compose exec symfony-app composer require package-name
```

### Debugging
- PHP logs: in `symfony-app` container
- Nginx logs: `docker-compose logs nginx`
- PostgreSQL logs: `docker-compose logs postgresql`

## 📚 What you can learn

This environment is perfect for teaching:
- MVC concepts with Symfony
- Doctrine ORM and PostgreSQL
- REST APIs
- Docker and containerization
- Web development best practices

## 💡 Tips

- The demo application shows how to build a complete web app
- Use Adminer to explore the database
- All files are synced in real-time
- Switch between dev/prod modes as needed
- Ready for production deployment