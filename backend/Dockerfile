# 1. Use the official Node.js base image
FROM node:20-alpine AS base

# 2. Set working directory
WORKDIR /app

# 3. Install dependencies separately (for caching)
COPY package*.json ./
RUN npm install --frozen-lockfile

# 4. Copy rest of the app
COPY . .

RUN npm run build

# 6. Use a minimal image for running the app
FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=base /app/dist/ ./
COPY --from=base /app/node_modules/ ./node_modules
COPY --from=base /app/package.json/ ./package.json

# 8. Set environment variables
ENV NODE_ENV production

# 9. Expose the app port (adjust as needed)
EXPOSE 3000

CMD ["node","server.js"]

