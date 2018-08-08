# Docker image for node version 8
FROM node:8

# The working directory
WORKDIR /usr/src/app

# Copy dependencies files
COPY package*.json ./

# Install required nodejs dependencies
RUN npm install --only=production

# Bundle app source code
COPY . .

# Bind the app to the port 3000
EXPOSE 3000

# The command that will be used to run the app
CMD [ "npm", "start" ]