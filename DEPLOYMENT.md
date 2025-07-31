# Swiss Dev Tracker - Synology Deployment Guide

This guide will help you set up automatic deployment of the Swiss Dev Tracker applications to your Synology NAS when you commit to GitHub.

## 🏗️ Architecture Overview

The deployment consists of:

- **Web Frontend** (React/Next.js) - Port 4200
- **API Backend** (Express/Node.js) - Port 3000
- **AI Agent Service** - Port 8080
- **Telegram Bot**
- **PostgreSQL Database** - Port 5432
- **MongoDB** - Port 27017
- **Redis Cache** - Port 6379
- **Ollama AI** - Port 11434
- **Nginx Reverse Proxy** - Port 80/443

## 🔧 Prerequisites

1. **Synology NAS** with Docker package installed
2. **SSH access** enabled on your Synology
3. **GitHub repository** with admin access
4. **Domain/IP** for accessing your applications

## 📋 Setup Steps

### 1. Prepare Your Synology

First, run the setup script on your Synology NAS:

```bash
# Download and run the setup script
curl -sSL https://raw.githubusercontent.com/your-username/your-repo/main/scripts/synology-setup.sh | bash
```

Or manually copy the `synology-setup.sh` script to your Synology and run:

```bash
chmod +x synology-setup.sh
./synology-setup.sh
```

### 2. Configure Environment Variables

Copy the environment template and fill in your values:

```bash
cd /volume1/docker/swissdev-tracker
cp .env.template .env
nano .env
```

Required environment variables:

```env
POSTGRES_PASSWORD=your_secure_password
MONGO_PASSWORD=your_secure_password
TELEGRAM_TOKEN=your_telegram_bot_token
```

### 3. Setup GitHub Secrets

In your GitHub repository, go to **Settings** → **Secrets and variables** → **Actions** and add:

| Secret Name         | Description                    | Example                                 |
| ------------------- | ------------------------------ | --------------------------------------- |
| `SYNOLOGY_HOST`     | Your Synology IP/hostname      | `192.168.1.100` or `nas.yourdomain.com` |
| `SYNOLOGY_USER`     | SSH username                   | `admin`                                 |
| `SYNOLOGY_SSH_KEY`  | SSH private key                | Contents of your private key file       |
| `SYNOLOGY_PORT`     | SSH port (optional)            | `22`                                    |
| `POSTGRES_PASSWORD` | PostgreSQL password            | Same as in .env                         |
| `MONGO_PASSWORD`    | MongoDB password               | Same as in .env                         |
| `TELEGRAM_TOKEN`    | Telegram bot token             | Get from @BotFather                     |
| `SLACK_WEBHOOK_URL` | Slack notifications (optional) | Your Slack webhook URL                  |

### 4. Generate SSH Keys

On your development machine:

```bash
# Generate SSH key pair
ssh-keygen -t rsa -b 4096 -C "github-deploy"

# Copy public key to Synology
ssh-copy-id admin@your-synology-ip

# Copy private key content to GitHub secret SYNOLOGY_SSH_KEY
cat ~/.ssh/id_rsa
```

### 5. Test SSH Connection

```bash
ssh admin@your-synology-ip "docker --version"
```

## 🚀 Deployment Workflow

### Automatic Deployment

Every time you push to the `main` or `master` branch, the GitHub Action will:

1. **Build** all applications using Nx
2. **Create Docker images** and push to GitHub Container Registry
3. **Deploy to Synology** via SSH
4. **Health check** all services
5. **Send notifications** (if configured)

### Manual Deployment

You can also trigger deployment manually:

1. Go to **Actions** tab in GitHub
2. Select **Deploy to Synology** workflow
3. Click **Run workflow**

## 📊 Monitoring & Management

### Service Status

```bash
cd /volume1/docker/swissdev-tracker
./monitor.sh
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api
docker-compose logs -f web
```

### Backup Database

```bash
cd /volume1/docker/swissdev-tracker
./backup.sh
```

### Restore Database

```bash
cd /volume1/docker/swissdev-tracker
./restore.sh swissdev_backup_20250131_120000.tar.gz
```

## 🌐 Accessing Your Applications

After successful deployment:

- **Web Frontend**: `http://your-synology-ip:8080`
- **API Backend**: `http://your-synology-ip:3000`
- **AI Agent**: `http://your-synology-ip:8080/agent`
- **Database Admin**: `http://your-synology-ip:5050` (if pgAdmin enabled)

## 🔒 Security Considerations

### SSL/HTTPS Setup

1. **Generate SSL certificates**:

   ```bash
   mkdir -p /volume1/docker/ssl
   # Copy your SSL certificates to this directory
   ```

2. **Update nginx.conf** to enable HTTPS

3. **Update ports** in docker-compose.override.yml:
   ```yaml
   nginx:
     ports:
       - '80:80'
       - '443:443'
   ```

### Firewall Rules

Configure your Synology firewall to only allow:

- Port 22 (SSH) from your IP
- Port 80/443 (HTTP/HTTPS) from anywhere
- Port 8080 (Web app) from your network

## 🛠️ Troubleshooting

### Common Issues

1. **Deployment fails with permission error**:

   ```bash
   # Fix file permissions
   sudo chown -R admin:administrators /volume1/docker/swissdev-tracker
   ```

2. **Database connection fails**:

   ```bash
   # Check if PostgreSQL is running
   docker-compose exec postgres pg_isready -U postgres
   ```

3. **Out of disk space**:

   ```bash
   # Clean up old Docker images
   docker image prune -f
   docker system prune -f
   ```

4. **Service won't start**:
   ```bash
   # Check logs for specific service
   docker-compose logs service-name
   ```

### Health Checks

The deployment includes automatic health checks for:

- API endpoints responding
- Database connections
- Service availability

### Log Files

Logs are stored in `/volume1/docker/logs/swissdev-tracker/`:

- `api.log` - API service logs
- `web.log` - Web frontend logs
- `agent.log` - AI agent logs
- `telegram-bot.log` - Telegram bot logs

## 🔄 Updates & Maintenance

### Updating Applications

Simply push to your main branch - the deployment pipeline will handle updates automatically.

### Manual Update

```bash
cd /volume1/docker/swissdev-tracker
docker-compose pull
docker-compose up -d
```

### Database Migrations

If your app includes database migrations:

```bash
docker-compose exec api npm run migrate
```

## 📈 Performance Optimization

### Resource Limits

Add resource limits to docker-compose.override.yml:

```yaml
services:
  api:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          memory: 256M
```

### Monitoring

Consider adding monitoring tools:

- Portainer for Docker management
- Grafana + Prometheus for metrics
- Uptime monitoring services

## 🆘 Support

If you encounter issues:

1. Check the GitHub Actions logs
2. Review Synology Docker logs
3. Run the monitoring script
4. Check database connectivity

For additional help, create an issue in the repository with:

- Error messages
- Log outputs
- Configuration details
