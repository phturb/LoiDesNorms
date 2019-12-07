# Create image based on the official Node 6 image from the dockerhub
FROM node:10

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app/server
RUN mkdir -p /usr/src/app/common/

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app/server

# Copy dependency definitions
COPY ./server/package*.json ./

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY ./server /usr/src/app/server
COPY ./common /usr/src/app/common

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "start"]
