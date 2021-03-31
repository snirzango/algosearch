# pull official base image
FROM node:14.4.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm run build --silent
RUN nodemon server.js
# add app
COPY . ./

# start app
CMD ["npm", "start"]

