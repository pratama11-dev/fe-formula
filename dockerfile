from node:16-alpine as deps

run apk update && apk add git

run mkdir /app
workdir /app
run cd /app && git clone https://puthere@github.com/put-here.git .
run git pull
run npm i
run npm run build

cmd ["npm", "run", "start"]
