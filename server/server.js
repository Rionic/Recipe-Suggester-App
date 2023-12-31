const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mysql = require('mysql2');
const mockData = require('./MockData');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthenticateJWT = require('./AuthenticateJWT');
const { JWT_SECRET } = require('./Config');

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const API_KEY = '2d60a10270894aaea2c880a8df71f2e3';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'secret',
  database: 'recipe_suggester',
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'secret',
  database: 'recipe_suggester'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
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
            const passwordMatch = await bcrypt.compare(password, hashedPassword);
            if (passwordMatch) {
              const token = jwt.sign({ email }, JWT_SECRET , { expiresIn: '1d'});
              res.json({ token });
            } else {
              res.status(401).json({ error: 'Invalid credentials' });
            }
          }
        }
      }
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
          const token = jwt.sign({ email }, JWT_SECRET , { expiresIn: '1d'});
          res.json({ token });
        }
      }
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
