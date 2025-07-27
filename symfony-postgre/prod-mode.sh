#!/bin/bash
echo "Switching to PRODUCTION mode..."

# Set prod mode in .env.local
cat > symfony/.env.local << EOF
# PRODUCTION MODE - Optimized for performance
APP_ENV=prod
APP_DEBUG=false

# To switch to dev mode, run: ./dev-mode.sh
EOF

# Restart container
docker-compose restart symfony-app

echo "✅ PRODUCTION mode activated!"
echo "   - Templates cached for performance"
echo "   - Debug disabled"
echo ""
echo "To switch back to development: ./dev-mode.sh"