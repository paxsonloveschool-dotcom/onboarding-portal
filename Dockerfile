FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Build the application
FROM base AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

# Set build-time env vars
ARG NEXTAUTH_SECRET
ARG ENCRYPTION_KEY
ARG NEXTAUTH_URL
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ENV ENCRYPTION_KEY=${ENCRYPTION_KEY}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets (including SOPs)
COPY --from=builder /app/public ./public

# Copy build output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Create directories for runtime data
RUN mkdir -p /app/uploads /app/data && chown -R nextjs:nodejs /app/uploads /app/data

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
