FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:1.29.2
COPY --from=build /app/dist/sistema-gestion/browser/* /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]