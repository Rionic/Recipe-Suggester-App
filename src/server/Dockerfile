# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory to /server
WORKDIR /server

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Make port 3001 available to the world outside this container
EXPOSE 3001

# Define environment variable for database connection
ENV DB_HOST=localhost
ENV DB_USER=root
ENV DB_PASSWORD=secret
ENV DB_NAME=recipe_suggester

# Run server.js when the container launches
CMD ["node", "server.js"]
