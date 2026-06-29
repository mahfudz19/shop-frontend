# syntax=docker/dockerfile:1

# ==========================================
# Stage 1: Dependencies
# ==========================================
FROM node:22-alpine AS deps

# Install build tools yang dibutuhkan oleh beberapa native dependency
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy file lock dan manifest terlebih dahulu untuk caching layer
COPY package.json yarn.lock* ./

# Install dependency dengan mode production (tanpa devDependencies)
RUN yarn install --frozen-lockfile --production=false

# ==========================================
# Stage 2: Builder
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

# Definisikan build arguments untuk env yang dibutuhkan saat build
ARG NEXT_PUBLIC_APP_NAME
ARG NEXT_PUBLIC_SHOW_QUICK_LOGIN
ARG NEXT_PUBLIC_SCRAPER_API_URL
ARG NEXT_PUBLIC_VNC_HOST
ARG INTERNAL_API_URL
ARG NEXT_IMAGES_HOSTNAME

# Copy node_modules dari stage deps
COPY --from=deps /app/node_modules ./node_modules

# Copy seluruh source code
COPY . .

# Build aplikasi Next.js menjadi output standalone
# Env NEXT_PUBLIC_* akan di-embed saat build time
RUN yarn build

# ==========================================
# Stage 3: Runner (production image)
# ==========================================
FROM node:22-alpine AS runner

WORKDIR /app

# Buat user non-root untuk keamanan
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy output standalone dari stage builder
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Beralih ke user non-root
USER nextjs

# Expose port default Next.js
EXPOSE 3000

# Set environment default (bisa di-override saat run)
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production

# Jalankan server standalone
CMD ["node", "server.js"]
