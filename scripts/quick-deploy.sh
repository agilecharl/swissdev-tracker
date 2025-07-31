#!/bin/bash

# Swiss Dev Tracker - Quick Deploy Script
# Run this script to quickly deploy to your Synology NAS

set -e

echo "🚀 Swiss Dev Tracker - Quick Deploy Setup"
echo "========================================"

# Check if running on Synology
if [ ! -d "/volume1" ]; then
    echo "❌ This script must be run on a Synology NAS"
    exit 1
fi

# Configuration
DEPLOY_DIR="/volume1/docker/swissdev-tracker"
REPO_URL="https://github.com/agilecharl/tools"

echo "📁 Creating deployment directory..."
sudo mkdir -p "$DEPLOY_DIR"
cd "$DEPLOY_DIR"

echo "📥 Downloading deployment files..."
curl -sSL "$REPO_URL/raw/main/monorepo/swissdev-tracker/docker-compose.synology.yml" -o docker-compose.yml
curl -sSL "$REPO_URL/raw/main/monorepo/swissdev-tracker/nginx.conf" -o nginx.conf

echo "🔧 Setting up environment..."
if [ ! -f ".env" ]; then
    cat > .env << 'EOF'
# Database passwords (CHANGE THESE!)
POSTGRES_PASSWORD=change_me_secure_password
MONGO_PASSWORD=change_me_secure_password

# Telegram Bot Token (get from @BotFather)
TELEGRAM_TOKEN=your_telegram_bot_token_here

# Optional: Redis password
REDIS_PASSWORD=change_me_redis_password
EOF
    echo "⚠️  Please edit .env file with your passwords:"
    echo "   nano $DEPLOY_DIR/.env"
    echo ""
fi

echo "🐳 Pulling Docker images..."
docker-compose pull

echo "🔄 Starting services..."
docker-compose up -d

echo "⏳ Waiting for services to start..."
sleep 30

echo "🏥 Checking service health..."
if docker-compose ps | grep -q "Up"; then
    echo "✅ Services are running!"
    echo ""
    echo "🌐 Access your applications:"
    echo "   Web Frontend: http://$(hostname -I | awk '{print $1}'):4200"
    echo "   API Backend:  http://$(hostname -I | awk '{print $1}'):3000"
    echo "   AI Agent:     http://$(hostname -I | awk '{print $1}'):8080"
    echo ""
    echo "📊 Service Status:"
    docker-compose ps
else
    echo "❌ Some services failed to start"
    echo "📋 Logs:"
    docker-compose logs --tail=20
    exit 1
fi

echo ""
echo "✅ Quick deployment completed!"
echo ""
echo "📋 Next steps:"
echo "1. Edit .env file with your secure passwords"
echo "2. Set up GitHub secrets for automatic deployment"
echo "3. Configure SSL certificates (optional)"
echo ""
echo "🔧 Management commands:"
echo "   View logs:    docker-compose logs -f"
echo "   Restart:      docker-compose restart"
echo "   Update:       docker-compose pull && docker-compose up -d"
echo "   Stop:         docker-compose down"
