FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

# ENV NODE_OPTIONS --max_old_space_size=4096 ## Increase memory limit for node
COPY . .

EXPOSE 3030

CMD ["npm", "run", "start:dev"]