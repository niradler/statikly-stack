FROM niradler/statikly

WORKDIR /usr/src/app

COPY package*.json ./
COPY pnpm-* ./

RUN npm i --production

ADD . ./

EXPOSE 3000

RUN chown -R node /usr/src/app
USER node

CMD ["start", "--host", "0.0.0.0", "-a", "plugins"]
