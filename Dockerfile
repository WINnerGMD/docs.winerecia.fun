# Base image using Arch Linux
FROM archlinux:base AS base
WORKDIR /app

# Update system and install dependencies
# Arch is rolling, so we make sure we have latest nodejs, npm, and pnpm
RUN pacman -Syu --noconfirm nodejs npm pnpm openssl

# Install dependencies
FROM base AS deps
COPY package.json ./
# Install dependencies fresh to avoid lockfile issues
RUN pnpm install

# Rebuild the source code
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production

# Generate Prisma Client
RUN pnpm prisma generate

# Build SvelteKit app
RUN pnpm run build
RUN pnpm prune --prod

# Production image
FROM base AS runner
ENV NODE_ENV=production

# Create a non-root user
RUN useradd -m -s /bin/bash sveltekit
USER sveltekit

COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

ENV PORT=3000
CMD ["node", "build/index.js"]
