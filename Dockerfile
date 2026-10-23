FROM node:22-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --omit=dev

FROM node:22-slim
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package*.json ./
# schema.gql se regenera en src/ al arrancar; uploads se monta como volumen
RUN mkdir -p src uploads && chown -R node:node /app
USER node
EXPOSE 3000
CMD ["node", "dist/main"]
