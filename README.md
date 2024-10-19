# Welcome to Recipe Suggester!

This is a full-stack web application I created in my spare time. It allows the user to find a recipe based off of paramaters received such as ingredients, recipe name, and dietary restrictions! The user is able to make an account and saved recipes that he/she likes to their account! 

*WARNING*

The API being used for this application has a small request limit of 150/day on the free version. It is very easy to hit this limit if you decide to spam requests, so please keep this in mind.

## Screenshots
[Search Page](./public/images/Screenshot_2.png)
[Saved Recipes](./public/images/Screenshot_3.png)
[Sign Up](./public/images/Screenshot_4.png)

## Steps to Run

### 1. Create your local database by following these steps: https://www.inmotionhosting.com/support/server/databases/create-a-mysql-database/

### 2. Copy and paste the following statements into the MySQL database you created on the command line
```
  CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);
CREATE TABLE IF NOT EXISTS user_recipes (
  user_recipe_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  recipe_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 3. Update the .env file with the correct info from your database setup

### 4. In the root folder, run `npm install`

### 5. After installation is complete, run `npm start`

### 6. Create another terminal window and navigate to the server directory

### 7. Once in the server directory, run `node server.js`

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
