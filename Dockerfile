FROM node:20-alpine AS builder

WORKDIR /app

ENV ASTRO_TELEMETRY_DISABLED=1
ARG PUBLIC_SITE_URL=https://ai.itsmartflex.com
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run check
RUN npm run build

FROM nginx:alpine AS runner

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
