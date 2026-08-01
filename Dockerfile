# Stage 1: Build the Astro static application
FROM node:20-alpine AS builder

WORKDIR /app

# Disable Astro telemetry during build
ENV ASTRO_TELEMETRY_DISABLED=1

# Copy dependency manifests
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code and config files
COPY . .

# Quality gate: Type check with astro check before building
RUN npm run check

# Build static output to /app/dist
RUN npm run build

# Stage 2: Serve static files with lightweight production Nginx
FROM nginx:alpine AS runner

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
