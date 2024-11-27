FROM node:22-alpine

LABEL org.opencontainers.image.source=https://github.com/david-loe/band-cues
LABEL org.opencontainers.image.description="Band Cues🎧"
LABEL org.opencontainers.image.licenses=MIT

WORKDIR /npm_cache
COPY package*.json ./
RUN npm install

WORKDIR /app

ENTRYPOINT [ "/bin/sh", "-c", "cp -r /npm_cache/node_modules/. /app/node_modules && exec \"$0\" \"$@\"" ]

CMD ["npm", "run", "serve"]