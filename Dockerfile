# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory to /app/client
WORKDIR /app/src

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the client code into the container at /app/client
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run npm start when the container launches
CMD ["npm", "start"]
