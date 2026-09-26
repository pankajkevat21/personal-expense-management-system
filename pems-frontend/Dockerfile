# ===== Stage 1: Build =====
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ===== Stage 2: Serve with Nginx =====
FROM nginx:alpine

# Nginx config copy karo
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Build output copy karo
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]