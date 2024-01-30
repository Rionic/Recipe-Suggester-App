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
  host: 'localhost',
  user: 'root',
  password: 'secret',
  database: 'recipe_suggester',
});

app.post('/api/unsave-recipe', AuthenticateJWT, async (req, res) => {
  console.log(req.body);
  const { user_id, recipe_id} = req.body;
  try {
    pool.query('DELETE FROM user_recipes WHERE user_id = ? AND recipe_id = ?',
    [user_id, recipe_id],
    (error) => {
      if (error) {
        console.error('Error unsaving recipe:', error);
        res.status(500).json({ error: 'Error unsaving recipe' });
      } else {
        console.log('Recipe unsaved successfully');
        res.status(200).json({ message: 'Recipe unsaved successfully'})
      }
    })
  } catch (error) {
    console.error('Error unsaving recipe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/save-recipe', AuthenticateJWT, async (req, res) => {
  console.log(req.body);
  const { user_id, recipe_id} = req.body;
  try {
    pool.query('INSERT INTO user_recipes (user_id, recipe_id) VALUES (?, ?)',
    [user_id, recipe_id],
    (error) => {
      if (error) {
        console.error('Error saving recipe:', error);
        res.status(500).json({ error: 'Error saving recipe' });
      } else {
        console.log('Recipe saved successfully');
        res.status(200).json({ message: 'Recipe saved successfully'})
      }
    })
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
              console.log('secret', JWT_SECRET);
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
      `https://api.spoonacular.com/recipes/complexSearch?${queryString}&number=1&apiKey=${API_KEY}`,
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
      `https://api.spoonacular.com/recipes/informationBulk?ids=${
        recipeIds.split(',')[0]
      }&apiKey=${API_KEY}`,
    );
    if (!response || response.status !== 200) {
      throw new Error('Failed to fetch recipe details');
    }
    const recipeDetails = response.data;
    let urlList = [];
    const ingredientsList = recipeDetails.map((recipe) => {
      let ingredients = recipe.extendedIngredients.map((ingredient) => {
        return {
          name: ingredient.name,
          amount: ingredient.amount,
          unit: ingredient.unit,
        };
      });
      urlList.push(recipe.sourceUrl);
      return ingredients;
    });
    const sendData = {
      ingredientsList: ingredientsList,
      urlList: urlList,
    };
    res.json(sendData);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
