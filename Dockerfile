# Use the official Node.js image as a base image
FROM node:latest

# Create and set the working directory
WORKDIR /AUTHENTICATION/server.js

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]
