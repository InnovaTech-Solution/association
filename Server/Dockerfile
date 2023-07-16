# Use the official Node.js image as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the app dependencies
RUN npm ci --only=production

# Copy the app source code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Clean npm cache
RUN npm cache clean --force

# Run npm install to install all dependencies (including dev dependencies)
RUN npm install

# Install multer-s3 and aws-sdk (for uploading images to AWS S3) // TODO: to remove later
RUN npm install multer-s3 aws-sdk multer

# Start the app
CMD ["npm", "start"]
