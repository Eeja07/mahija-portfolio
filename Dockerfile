# ==========================================
# Stage 1: Install dependencies only when needed
# ==========================================
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package lock and descriptors
COPY package*.json ./
RUN npm ci

# ==========================================
# Stage 2: Rebuild the source code
# ==========================================
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# Run build producing the standalone bundle
RUN npm run build

# ==========================================
# Stage 3: Runner runtime image
# ==========================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create low-privilege runtime group and user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy static assets and folder paths
COPY --from=builder /app/public ./public

# Setup server directories with appropriate permissions
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Leverage output traces to reduce docker image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set security context
USER nextjs

# Expose container entry port
EXPOSE 3000

# Native healthcheck using node
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "const http = require('http'); http.get('http://localhost:3000', (res) => { if (res.statusCode === 200) process.exit(0); else process.exit(1); })"

# Run server.js compiled via Next standalone
CMD ["node", "server.js"]
