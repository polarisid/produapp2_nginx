FROM node:16

WORKDIR /app

COPY . .

RUN npm install -g npm@8.19.2
RUN npm i --force



RUN npm run build

RUN mkdir -p /var/www/html
RUN mv build/* /var/www/html 

WORKDIR /

RUN rm -rf /app