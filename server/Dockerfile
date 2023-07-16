FROM node:18
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm i yarn -g

RUN yarn install

RUN npm i --save

RUN npm i express --save

RUN npm install express-session --save

RUN npm install @prisma/client

RUN npx prisma generate

# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]