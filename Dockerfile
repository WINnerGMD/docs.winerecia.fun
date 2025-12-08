# Базовый образ с Bun
FROM oven/bun:1 as base
WORKDIR /app

# Устанавливаем зависимости (отдельно, чтобы кэшировалось)
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Ставим только продакшн зависимости
RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# Собираем проект
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# Генерируем клиент базы и билдим SvelteKit
ENV NODE_ENV=production
RUN bunx prisma generate
RUN bun run build

# Финальный легкий образ
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /app/build build
COPY --from=prerelease /app/package.json .
COPY --from=prerelease /app/prisma prisma

# Запускаем
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "build/index.js" ]
