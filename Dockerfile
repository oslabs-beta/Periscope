FROM node

RUN mkdir -p /home/app

COPY ./app /home/app

CMD ["node", "/home/app/server/server.js"]