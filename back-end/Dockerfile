FROM node:18

WORKDIR /app

COPY . .

RUN npm i

ENV NODE_OPTIONS --max_old_space_size=4096 ## Increase memory limit for node

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]