FROM node:latest

WORKDIR /app
COPY ./package.json /app/
COPY ./package-lock.json /app/
COPY ./tsconfig.json /app/
COPY ./tsconfig.build.json /app/
COPY ./nest-cli.json /app/
COPY ./src/ /app/src/
COPY ./.env /app/

RUN npm i

ENV NODE_OPTIONS --max_old_space_size=4096 ## Increase memory limit for node

RUN npm run build

CMD npm run start:dev
