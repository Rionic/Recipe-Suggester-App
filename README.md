# Welcome to Recipe Suggester!

This is a full-stack web application I created in my spare time. It allows the user to find a recipe based off of paramaters received such as ingredients, recipe name, and dietary restrictions! The user is able to make an account and saved recipes that he/she likes to their account! 

*WARNING*

The API being used for this application has a small request limit of 150/day on the free version, so it is very easy to hit this limit if you decide to spam requests, so please keep this in mind!

## Steps to Run

### 1. Create your local database by following these steps: https://www.inmotionhosting.com/support/server/databases/create-a-mysql-database/

### 2. Update the .env file with the correct info from your database setup

### 3. In the root folder, run `npm install`

### 4. After installation is complete, run `npm start`

### 5. Create another terminal window and run `cd server`

### 6. Once in the server directory, run `node server.js`

### You're good to go!

Current features

- React as framework
- Material UI for crisp and clean interface
- Spoonacular API to fetch recipe data
- CSS for styling
- Prettified code
- Login system
- Save recipes to account
- Database

Potential Future features

- Dockerization
- Cloud DB
- Deployment
- More detailed profile page
- Nicer UI
- Test cases
