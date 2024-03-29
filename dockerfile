FROM node:12.16.2-alpine3.10 as builder
WORKDIR /app
COPY ./package-lock.json ./
COPY ./package.json ./
COPY . ./
RUN npm install --silent 
RUN npm install react-scripts 
RUN npm run build


FROM nginx:1.16-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]