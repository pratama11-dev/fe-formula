FROM node:16-alpine as deps

RUN apk update && apk add git

RUN mkdir /app
WORKDIR /app
RUN cd /app && git clone https://puthere@github.com/put-here.git .
RUN git pull
RUN npm i
RUN npm run build

CMD ["npm", "run", "start"]
