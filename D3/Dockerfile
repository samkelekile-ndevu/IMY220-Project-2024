# Use the official Node.js image as a base
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Expose port 3000 (for the React app)
EXPOSE 3000

# Expose port 5000 (for the API)
EXPOSE 5000

# Command to run both API and React app
CMD ["sh", "-c", "npm run run_api & npm run watch & npm start"]
