FROM node:20

RUN apt-get update && apt-get install -y \
    libreoffice \
    ghostscript \
    graphicsmagick \
    poppler-utils

WORKDIR /app

COPY . .

WORKDIR /app/server
RUN npm install

WORKDIR /app/client
RUN npm install
RUN npm run build

WORKDIR /app/server

EXPOSE 5000

CMD ["node", "index.js"]