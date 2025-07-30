# Multi-stage Dockerfile for Swiss Dev Project
FROM node:20-alpine AS base

# Install dependencies needed for building
RUN apk add --no-cache libc6-compat
RUN apk update

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./

# Copy workspace configuration
COPY .npmrc .npmrc* ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Development stage
FROM base AS dev
RUN npm ci
COPY . .
EXPOSE 4200 3000 8080
CMD ["npm", "run", "dev"]

# Build stage
FROM base AS builder
RUN npm ci
COPY . .

# Build all applications
RUN npx nx run-many --target=build --all --prod

# Production API stage
FROM node:20-alpine AS api
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built API
COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/api ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

USER nextjs
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "main.js"]

# Production Web stage  
FROM node:20-alpine AS web
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built web app
COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/web ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

USER nextjs
EXPOSE 4200
ENV NODE_ENV=production
CMD ["npx", "serve", "-s", ".", "-l", "4200"]

# Production Agent stage
FROM node:20-alpine AS agent
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Install Python for Ollama integration (if needed)
RUN apk add --no-cache python3 py3-pip

# Copy built agent
COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/agent ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

USER nextjs
EXPOSE 8080
ENV NODE_ENV=production
CMD ["node", "main.js"]

# Production Telegram Bot stage
FROM node:20-alpine AS telegram-bot
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built telegram bot
COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/telegram-bot ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

USER nextjs
ENV NODE_ENV=production
CMD ["node", "main.js"]

# All-in-one production stage
FROM node:20-alpine AS production
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Install additional tools
RUN apk add --no-cache python3 py3-pip nginx supervisor

# Copy all built applications
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Copy nginx config for serving web app
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name localhost;
    
    # Serve web app
    location / {
        root /app/dist/apps/web;
        try_files \$uri \$uri/ /index.html;
    }
    
    # Proxy API requests
    location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Supervisor config to run multiple services
COPY <<EOF /etc/supervisor/conf.d/supervisord.conf
[supervisord]
nodaemon=true
user=root

[program:nginx]
command=nginx -g "daemon off;"
autostart=true
autorestart=true
stderr_logfile=/var/log/nginx.err.log
stdout_logfile=/var/log/nginx.out.log

[program:api]
command=node /app/dist/apps/api/main.js
directory=/app
user=nextjs
autostart=true
autorestart=true
stderr_logfile=/var/log/api.err.log
stdout_logfile=/var/log/api.out.log
environment=NODE_ENV=production,PORT=3000

[program:agent]
command=node /app/dist/apps/agent/main.js
directory=/app
user=nextjs
autostart=true
autorestart=true
stderr_logfile=/var/log/agent.err.log
stdout_logfile=/var/log/agent.out.log
environment=NODE_ENV=production,PORT=8080

[program:telegram-bot]
command=node /app/dist/apps/telegram-bot/main.js
directory=/app
user=nextjs
autostart=true
autorestart=true
stderr_logfile=/var/log/telegram-bot.err.log
stdout_logfile=/var/log/telegram-bot.out.log
environment=NODE_ENV=production
EOF

EXPOSE 80 3000 8080
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
