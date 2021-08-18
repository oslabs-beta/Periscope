FROM node
ENV NODE_ENV=production

WORKDIR /app

COPY ["./app/package.json", "./app/package-lock.json*", "./"]

RUN npm install --production

COPY ./app .

CMD [ "node", "server/server.js" ]