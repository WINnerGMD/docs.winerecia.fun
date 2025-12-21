# Base image
FROM node:22-alpine AS base
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm install

# Rebuild the source code only when needed
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production

# Generate Prisma Client
RUN npx prisma generate

# Build SvelteKit app
RUN npm run build
RUN npm prune --production

# Production image, copy all the files and run next
FROM base AS runner
ENV NODE_ENV=production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 sveltekit

USER sveltekit

COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

ENV PORT=3000
CMD ["node", "build/index.js"]
