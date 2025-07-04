# Deployment Guide

This guide covers deployment strategies and configurations for the Kingnnt.org Next.js application.

## Deployment Overview

The application supports multiple deployment strategies:

1. **Docker Containerization** (Recommended)
2. **Vercel Platform** (Easiest for Next.js)
3. **Traditional Server Deployment**
4. **Static Export** (if applicable)

## Docker Deployment

### Production Docker Setup

The application includes production-ready Docker configurations:

```yaml
# docker-compose.production.yaml
version: '3.8'
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.production
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### Docker Commands

```bash
# Build and start production environment
make prod_env_up

# Restart with rebuild
make prod_env_restart

# Stop production environment
make prod_env_down

# Remove containers and images
make prod_env_rm
```

### Docker Configuration

#### Dockerfile.production

```dockerfile
# Multi-stage production build
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

## Vercel Deployment

### Automatic Deployment

1. **Connect Repository** to Vercel
2. **Configure Environment Variables**
3. **Deploy** automatically on push to main branch

### Vercel Configuration

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### Environment Variables

```bash
# Production environment variables
NEXT_PUBLIC_APP_URL=https://kingnnt.org
NODE_ENV=production
```

## Traditional Server Deployment

### Prerequisites

- **Node.js** 18.x or higher
- **PM2** for process management
- **Nginx** for reverse proxy
- **SSL Certificate** for HTTPS

### Server Setup

```bash
# Install dependencies
npm ci --only=production

# Build application
npm run build

# Install PM2 globally
npm install -g pm2

# Start application with PM2
pm2 start npm --name "kingnnt-app" -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

### PM2 Configuration

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'kingnnt-app',
    script: 'npm',
    args: 'start',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

### Nginx Configuration

```nginx
# /etc/nginx/sites-available/kingnnt.org
server {
    listen 80;
    server_name kingnnt.org www.kingnnt.org;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name kingnnt.org www.kingnnt.org;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Environment Configuration

### Environment Variables

```bash
# .env.production
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://kingnnt.org
NEXT_PUBLIC_API_URL=https://api.kingnnt.org

# Database (if applicable)
DATABASE_URL=postgresql://user:pass@localhost:5432/kingnnt

# External APIs
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

### Environment Files

```bash
# Different environments
.env.local          # Local development
.env.development    # Development environment
.env.staging        # Staging environment
.env.production     # Production environment
```

## Performance Optimization

### Build Optimization

```javascript
// next.config.ts
const nextConfig = {
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  
  experimental: {
    turbo: {
      resolveAlias: {
        canvas: './empty-module.js',
      },
    },
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};
```

### Caching Strategy

```javascript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};
```

## Monitoring and Analytics

### Application Monitoring

```bash
# PM2 monitoring
pm2 monit

# Application logs
pm2 logs kingnnt-app

# System metrics
pm2 info kingnnt-app
```

### Error Tracking

```typescript
// lib/error-tracking.ts
export function reportError(error: Error, context?: any) {
  if (process.env.NODE_ENV === 'production') {
    // Send to error tracking service
    console.error('Error:', error, context);
  }
}
```

### Performance Monitoring

```typescript
// lib/performance.ts
export function trackPerformance(metric: string, value: number) {
  if (process.env.NODE_ENV === 'production') {
    // Send to analytics service
    console.log(`Performance: ${metric} = ${value}ms`);
  }
}
```

## Security Considerations

### Security Headers

```javascript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
          },
        ],
      },
    ];
  },
};
```

### Environment Security

```bash
# Secure environment variables
chmod 600 .env.production

# Restrict file permissions
chown -R app:app /app
chmod -R 755 /app
```

## Backup and Recovery

### Database Backup (if applicable)

```bash
# PostgreSQL backup
pg_dump -h localhost -U user -d kingnnt > backup.sql

# Restore database
psql -h localhost -U user -d kingnnt < backup.sql
```

### Application Backup

```bash
# Backup application files
tar -czf kingnnt-backup-$(date +%Y%m%d).tar.gz /app

# Backup with exclusions
tar --exclude='node_modules' --exclude='.next' -czf app-backup.tar.gz /app
```

## Rollback Strategy

### Quick Rollback

```bash
# PM2 rollback
pm2 reload kingnnt-app --update-env

# Docker rollback
docker-compose down
docker-compose up -d --force-recreate
```

### Blue-Green Deployment

```bash
# Deploy to staging
make staging_env_up

# Test staging environment
curl -f https://staging.kingnnt.org

# Switch traffic to new version
# Update load balancer configuration
```

## Health Checks

### Application Health

```typescript
// app/api/health/route.ts
export async function GET() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  };

  return Response.json(health);
}
```

### Docker Health Check

```dockerfile
# Dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1
```

## Troubleshooting

### Common Issues

1. **Port conflicts**:
```bash
# Check port usage
lsof -i :3000

# Kill process using port
kill -9 $(lsof -t -i:3000)
```

2. **Memory issues**:
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm start
```

3. **Build failures**:
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Log Analysis

```bash
# Application logs
tail -f /var/log/kingnnt/app.log

# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# System logs
journalctl -u kingnnt-app -f
```