# Build stage
FROM node:16.17 as build
ARG DEBIAN_FRONTEND=noninteractive

RUN apt update && \
    apt upgrade -y && \
    apt install -y git

WORKDIR /app
COPY package.json /app/
RUN yarn install
COPY . /app/

RUN yarn run build  

# App / Deploy stage
FROM nginx:alpine
ENV NGINX_PORT=8080
ENV API_ADDRESS=http://localhost:3000
COPY --from=build /app/dist/ /usr/share/nginx/html
COPY docker/nginx/templates/default.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 8080
CMD ["nginx","-g","daemon off;"]
