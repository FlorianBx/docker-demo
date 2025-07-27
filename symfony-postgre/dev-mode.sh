#!/bin/bash
echo "Switching to DEV mode..."

# Set dev mode in .env.local
cat > symfony/.env.local << EOF
# DEV MODE - Templates reload automatically
APP_ENV=dev
APP_DEBUG=true

# To switch to production mode, run: ./prod-mode.sh
EOF

# Restart container
docker-compose restart symfony-app

echo "✅ DEV mode activated!"
echo "   - Twig templates reload automatically"
echo "   - Debug mode enabled"
echo ""
echo "To switch back to production: ./prod-mode.sh"