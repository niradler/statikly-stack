FROM node:lts-alpine
RUN apk add --no-cache alpine-sdk python3 py3-pip make g++
RUN npm install -g statikly

ENTRYPOINT [ "statikly" ]
