FROM node:9-slim
WORKDIR /main
COPY package.json /main
RUN npm install
COPY . /main
CMD ["npm", "start"]