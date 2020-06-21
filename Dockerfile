FROM node:12.18.1-alpine3.12

ENV PROJECT_ROOTDIR /app/

WORKDIR $PROJECT_ROOTDIR

COPY package.json package-lock.json $PROJECT_ROOTDIR

RUN npm install

COPY . $PROJECT_ROOTDIR

EXPOSE 8888
ENV HOST 0.0.0.0

CMD ["npm", "run", "serve"]
