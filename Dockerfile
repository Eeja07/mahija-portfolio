# ==========================================
# Stage 1: Install dependencies and build
# ==========================================
FROM node:20-alpine AS builder
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache libc6-compat

# Copy package descriptors
COPY package*.json ./
RUN npm ci

# Copy application code
COPY . .

# Run production build
RUN npm run build

# ==========================================
# Stage 2: Clean execution environment
# ==========================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create application execution user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy build output and module dependency paths
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src

# Set user contexts
USER nextjs

# Expose target host port
EXPOSE 3000

# Native healthcheck using node network requests
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "const http = require('http'); http.get('http://localhost:3000', (res) => { if (res.statusCode === 200) process.exit(0); else process.exit(1); })"

# Start the application server
CMD ["npm", "run", "start"]
