# Use the official Node.js 20 Alpine image as the base image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY packages/playground/package*.json ./packages/playground/
COPY packages/server/package*.json ./packages/server/
COPY packages/web-client/package*.json ./packages/web-client/

# Install dependencies
RUN npm install
RUN npm run install:packages

# Copy the rest of the application code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["npm", "run", "start"]