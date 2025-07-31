#!/bin/bash

# Swiss Dev Synology Deployment Script
# This script sets up the deployment environment on your Synology NAS

set -e

echo "🚀 Setting up Swiss Dev deployment on Synology..."

# Configuration
DEPLOY_DIR="/volume1/docker/swissdev-tracker"
BACKUP_DIR="/volume1/docker/backups/swissdev-tracker"
LOG_DIR="/volume1/docker/logs/swissdev-tracker"

# Create directories
echo "📁 Creating directories..."
sudo mkdir -p "$DEPLOY_DIR"
sudo mkdir -p "$BACKUP_DIR"
sudo mkdir -p "$LOG_DIR"

# Set permissions
sudo chown -R admin:administrators "$DEPLOY_DIR"
sudo chown -R admin:administrators "$BACKUP_DIR"
sudo chown -R admin:administrators "$LOG_DIR"

# Create docker-compose override for Synology
cat > "$DEPLOY_DIR/docker-compose.override.yml" << EOF
version: '3.8'

services:
  postgres:
    volumes:
      - /volume1/docker/data/postgres:/var/lib/postgresql/data
    restart: unless-stopped
    
  mongodb:
    volumes:
      - /volume1/docker/data/mongodb:/data/db
    restart: unless-stopped
    
  redis:
    volumes:
      - /volume1/docker/data/redis:/data
    restart: unless-stopped
    
  ollama:
    volumes:
      - /volume1/docker/data/ollama:/root/.ollama
    restart: unless-stopped

  nginx:
    ports:
      - "8080:80"
      - "8443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - /volume1/docker/ssl:/etc/nginx/ssl:ro
    restart: unless-stopped

  api:
    volumes:
      - "$LOG_DIR:/app/logs"
    restart: unless-stopped
    
  web:
    restart: unless-stopped
    
  agent:
    volumes:
      - "$LOG_DIR:/app/logs"
    restart: unless-stopped
    
  telegram-bot:
    volumes:
      - "$LOG_DIR:/app/logs"
    restart: unless-stopped
EOF

# Create environment file template
cat > "$DEPLOY_DIR/.env.template" << EOF
# Database Configuration
POSTGRES_PASSWORD=your_postgres_password_here
MONGO_PASSWORD=your_mongo_password_here

# Telegram Bot
TELEGRAM_TOKEN=your_telegram_bot_token_here

# Redis (optional)
REDIS_PASSWORD=your_redis_password_here

# SSL Configuration (optional)
SSL_CERT_PATH=/volume1/docker/ssl/cert.pem
SSL_KEY_PATH=/volume1/docker/ssl/key.pem

# Backup Configuration
BACKUP_RETENTION_DAYS=30
EOF

# Create backup script
cat > "$DEPLOY_DIR/backup.sh" << 'EOF'
#!/bin/bash

# Swiss Dev Backup Script
BACKUP_DIR="/volume1/docker/backups/swissdev-tracker"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="swissdev_backup_$DATE"

echo "🔄 Starting backup: $BACKUP_NAME"

# Create backup directory
mkdir -p "$BACKUP_DIR/$BACKUP_NAME"

# Backup databases
echo "📦 Backing up PostgreSQL..."
docker exec swissdev-tracker_postgres_1 pg_dumpall -U postgres > "$BACKUP_DIR/$BACKUP_NAME/postgres.sql"

echo "📦 Backing up MongoDB..."
docker exec swissdev-tracker_mongodb_1 mongodump --authenticationDatabase admin -u mongo -p "$MONGO_PASSWORD" --out /tmp/mongodump
docker cp swissdev-tracker_mongodb_1:/tmp/mongodump "$BACKUP_DIR/$BACKUP_NAME/"

# Backup configuration
echo "📦 Backing up configuration..."
cp -r /volume1/docker/swissdev-tracker/*.yml "$BACKUP_DIR/$BACKUP_NAME/"
cp /volume1/docker/swissdev-tracker/.env "$BACKUP_DIR/$BACKUP_NAME/" 2>/dev/null || echo "No .env file found"

# Compress backup
echo "🗜️ Compressing backup..."
cd "$BACKUP_DIR"
tar -czf "$BACKUP_NAME.tar.gz" "$BACKUP_NAME"
rm -rf "$BACKUP_NAME"

# Clean old backups (keep last 7 days)
find "$BACKUP_DIR" -name "swissdev_backup_*.tar.gz" -mtime +7 -delete

echo "✅ Backup completed: $BACKUP_NAME.tar.gz"
EOF

chmod +x "$DEPLOY_DIR/backup.sh"

# Create restore script
cat > "$DEPLOY_DIR/restore.sh" << 'EOF'
#!/bin/bash

# Swiss Dev Restore Script
BACKUP_DIR="/volume1/docker/backups/swissdev-tracker"

if [ -z "$1" ]; then
    echo "Usage: $0 <backup_file>"
    echo "Available backups:"
    ls -la "$BACKUP_DIR"/*.tar.gz 2>/dev/null || echo "No backups found"
    exit 1
fi

BACKUP_FILE="$1"
if [ ! -f "$BACKUP_DIR/$BACKUP_FILE" ]; then
    echo "❌ Backup file not found: $BACKUP_DIR/$BACKUP_FILE"
    exit 1
fi

echo "🔄 Restoring from backup: $BACKUP_FILE"

# Extract backup
cd "$BACKUP_DIR"
tar -xzf "$BACKUP_FILE"
BACKUP_NAME=$(basename "$BACKUP_FILE" .tar.gz)

# Stop services
echo "🛑 Stopping services..."
cd /volume1/docker/swissdev-tracker
docker-compose down

# Restore PostgreSQL
if [ -f "$BACKUP_DIR/$BACKUP_NAME/postgres.sql" ]; then
    echo "📥 Restoring PostgreSQL..."
    docker-compose up -d postgres
    sleep 10
    docker exec -i swissdev-tracker_postgres_1 psql -U postgres < "$BACKUP_DIR/$BACKUP_NAME/postgres.sql"
fi

# Restore MongoDB
if [ -d "$BACKUP_DIR/$BACKUP_NAME/mongodump" ]; then
    echo "📥 Restoring MongoDB..."
    docker-compose up -d mongodb
    sleep 10
    docker cp "$BACKUP_DIR/$BACKUP_NAME/mongodump" swissdev-tracker_mongodb_1:/tmp/
    docker exec swissdev-tracker_mongodb_1 mongorestore --authenticationDatabase admin -u mongo -p "$MONGO_PASSWORD" /tmp/mongodump
fi

# Start all services
echo "🚀 Starting all services..."
docker-compose up -d

echo "✅ Restore completed successfully!"
EOF

chmod +x "$DEPLOY_DIR/restore.sh"

# Create monitoring script
cat > "$DEPLOY_DIR/monitor.sh" << 'EOF'
#!/bin/bash

# Swiss Dev Monitoring Script
DEPLOY_DIR="/volume1/docker/swissdev-tracker"
LOG_DIR="/volume1/docker/logs/swissdev-tracker"

cd "$DEPLOY_DIR"

echo "📊 Swiss Dev System Status"
echo "=========================="

# Check Docker services
echo ""
echo "🐳 Docker Services:"
docker-compose ps

# Check system resources
echo ""
echo "💾 System Resources:"
echo "Memory Usage:"
free -h

echo ""
echo "💿 Disk Usage:"
df -h /volume1

# Check logs for errors
echo ""
echo "🔍 Recent Errors (last 10):"
if [ -d "$LOG_DIR" ]; then
    find "$LOG_DIR" -name "*.log" -exec grep -l "ERROR\|FATAL" {} \; | head -5 | while read logfile; do
        echo "--- $logfile ---"
        tail -n 5 "$logfile" | grep "ERROR\|FATAL"
    done
else
    echo "No log directory found"
fi

# Check container health
echo ""
echo "🏥 Container Health:"
docker-compose exec -T api curl -f http://localhost:3000/health || echo "❌ API health check failed"
docker-compose exec -T web curl -f http://localhost:4200 || echo "❌ Web health check failed"

echo ""
echo "✅ Monitoring complete"
EOF

chmod +x "$DEPLOY_DIR/monitor.sh"

# Create systemd service for auto-start
sudo cat > /etc/systemd/system/swissdev-tracker.service << EOF
[Unit]
Description=Swiss Dev Tracker
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=$DEPLOY_DIR
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

# Enable service
sudo systemctl enable swissdev-tracker.service

echo ""
echo "✅ Synology deployment setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Copy your .env file to $DEPLOY_DIR/.env (use .env.template as reference)"
echo "2. Set up GitHub secrets in your repository:"
echo "   - SYNOLOGY_HOST: Your Synology IP/hostname"
echo "   - SYNOLOGY_USER: SSH username"
echo "   - SYNOLOGY_SSH_KEY: SSH private key"
echo "   - SYNOLOGY_PORT: SSH port (default: 22)"
echo "   - POSTGRES_PASSWORD: Database password"
echo "   - MONGO_PASSWORD: MongoDB password"
echo "   - TELEGRAM_TOKEN: Telegram bot token"
echo ""
echo "📁 Deployment directory: $DEPLOY_DIR"
echo "📁 Backup directory: $BACKUP_DIR"
echo "📁 Log directory: $LOG_DIR"
echo ""
echo "🔧 Available commands:"
echo "  - $DEPLOY_DIR/backup.sh - Create backup"
echo "  - $DEPLOY_DIR/restore.sh <backup_file> - Restore from backup"
echo "  - $DEPLOY_DIR/monitor.sh - System monitoring"
echo ""
echo "🚀 To manually deploy: cd $DEPLOY_DIR && docker-compose up -d"
