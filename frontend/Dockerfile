# Use a lightweight Node.js image
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json/yarn.lock
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy local code to the container image
COPY . .

# Expose the port Vite runs on (default 3000, but can be changed via environment variable)
EXPOSE 3000

# Run Vite's development server, using an environment variable for the port
CMD ["npm", "run", "dev"]
