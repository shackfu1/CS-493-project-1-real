FROM node

WORKDIR /usr/src/app

COPY ./index.js /usr/src/app

COPY ./package.json /usr/src/app

COPY ./package-lock.json /usr/src/app

RUN npm install

# Start server
CMD ["node", "index.js"]