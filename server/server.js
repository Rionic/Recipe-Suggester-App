require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.use(express.json());
const axios = require('axios');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const mockData = require('./MockData');
const AuthenticateJWT = require('./AuthenticateJWT');
const { JWT_SECRET } = require('./Config');

const PORT = process.env.PORT || 3001;
const API_KEY = '2d60a10270894aaea2c880a8df71f2e3';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_NAME || 'recipe_suggester',
});

pool.query(
  `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
  );
`,
  (error) => {
    if (error) console.error('Error setting up users table:', error);
    else console.log('users table setup successful');
  },
);

pool.query(
  `
  CREATE TABLE IF NOT EXISTS user_recipes (
    user_recipe_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    recipe_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`,
  (error) => {
    if (error) console.error('Error setting up user_recipes table:', error);
    else console.log('user_recipes table setup successful');
  },
);

app.get('/api/fetch-saved-recipes', AuthenticateJWT, async (req, res) => {
  const { email } = req.user;
  try {
    pool.query(
      'SELECT recipe_id FROM user_recipes WHERE user_id = (SELECT id FROM users WHERE email = ?)',
      [email],
      (error, results) => {
        if (error) {
          console.error('Error fetching saved recipes');
          res.status(500).json({ error: 'Error fetching saved recipes' });
        } else {
          if (results && results.length > 0) {
            const savedRecipeIds = results;
            res.json({ savedRecipeIds });
          } else {
            res.status(404).json({ error: 'No saved recipes found' });
          }
        }
      },
    );
  } catch (error) {
    console.error('Error');
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/unsave-recipe', AuthenticateJWT, async (req, res) => {
  const { user_id, recipe_id } = req.body;
  try {
    pool.query(
      'DELETE FROM user_recipes WHERE user_id = ? AND recipe_id = ?',
      [user_id, recipe_id],
      (error) => {
        if (error) {
          console.error('Error unsaving recipe:', error);
          res.status(500).json({ error: 'Error unsaving recipe' });
        } else {
          console.log('Recipe unsaved successfully');
          res.status(200).json({ message: 'Recipe unsaved successfully' });
        }
      },
    );
  } catch (error) {
    console.error('Error unsaving recipe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/save-recipe', AuthenticateJWT, async (req, res) => {
  const { user_id, recipe_id } = req.body;
  try {
    pool.query(
      'INSERT INTO user_recipes (user_id, recipe_id) VALUES (?, ?)',
      [user_id, recipe_id],
      (error) => {
        if (error) {
          console.error('Error saving recipe:', error);
          res.status(500).json({ error: 'Error saving recipe' });
        } else {
          console.log('Recipe saved successfully');
          res.status(200).json({ message: 'Recipe saved successfully' });
        }
      },
    );
  } catch (error) {
    console.error('Error saving recipe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/fetch-user-info', AuthenticateJWT, async (req, res) => {
  const userEmail = req.user.email;
  try {
    pool.query(
      'SELECT id, first_name, last_name FROM users WHERE email = ?',
      [userEmail],
      (error, results) => {
        if (error) {
          console.error('Error retrieving user:', error);
          res.status(500).json({ error: 'Error fetching user data' });
        } else {
          if (results.length > 0) {
            const userInfo = results[0];
            res.json({ userInfo });
          } else {
            res.status(404).json({ error: 'User not found' });
          }
        }
      },
    );
  } catch (error) {
    console.error('Error fetching user info');
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    pool.query(
      'SELECT password FROM users WHERE email = ?',
      [email],
      async (error, results) => {
        if (error) {
          console.error('Error retrieving user:', error);
          res.status(500).json({ error: 'Error during login' });
        } else {
          if (results.length === 0) {
            res.status(401).json({ error: 'Invalid credentials' });
          } else {
            const hashedPassword = results[0].password;
            const passwordMatch = await bcrypt.compare(
              password,
              hashedPassword,
            );
            if (passwordMatch) {
              const token = jwt.sign({ email }, JWT_SECRET, {
                expiresIn: '1d',
              });
              res.json({ token });
            } else {
              res.status(401).json({ error: 'Invalid credentials' });
            }
          }
        }
      },
    );
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Error during login' });
  }
});

app.post('/api/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    pool.query(
      'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
      [firstName, lastName, email, hashedPassword],
      (error, results) => {
        if (error) {
          console.error('Error inserting user:', error);
          res.status(500).json({ error: 'Error signing up' });
        } else {
          console.log('User signed up successfully');
          const token = jwt.sign({}, JWT_SECRET, { expiresIn: '1d' });
          res.json({ token });
        }
      },
    );
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Error signing up' });
  }
});

app.post('/api/search', async (req, res) => {
  try {
    const { ingredients, dietaryPreferences, recipeName } = req.body;

    const queryParams = new URLSearchParams();

    if (ingredients) {
      queryParams.append('includeIngredients', ingredients);
    }

    if (dietaryPreferences) {
      queryParams.append('diet', dietaryPreferences.join(','));
    }

    if (recipeName) {
      queryParams.append('query', recipeName);
    }
    const queryString = queryParams.toString();
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?${queryString}&number=5&apiKey=${API_KEY}`,
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/recipe/ingredients', async (req, res) => {
  try {
    const { recipeIds } = req.query;

    if (!recipeIds) {
      throw new Error('Recipe IDs are required');
    }

    const response = await axios.get(
      `https://api.spoonacular.com/recipes/informationBulk?ids=${recipeIds.split(
        ',',
      )}&apiKey=${API_KEY}`,
    );
    if (!response || response.status !== 200) {
      throw new Error('Failed to fetch recipe details');
    }
    const recipeDetails = response.data;
    const urlList = recipeDetails.map((recipe) => recipe.sourceUrl);
    const titleList = recipeDetails.map((recipe) => recipe.title);
    const imageList = recipeDetails.map((recipe) => recipe.image);

    const ingredientsList = recipeDetails.map((recipe) => {
      let ingredients = recipe.extendedIngredients.map((ingredient) => {
        return {
          name: ingredient.name,
          amount: ingredient.amount,
          unit: ingredient.unit,
        };
      });
      return ingredients;
    });
    const sendData = {
      ingredientsList: ingredientsList,
      urlList: urlList,
      titleList: titleList,
      imageList: imageList,
    };
    res.json(sendData);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
