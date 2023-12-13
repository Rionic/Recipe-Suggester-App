const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fakeData = require('./FakeData');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
const API_KEY = '96ea7050c7574dca93f0aae38effe795';

app.use(express.json());


app.post('/api/search', async (req, res) => {
    try {
        // const { ingredients, dietaryPreferences, recipeName } = req.body;

        // const queryParams = new URLSearchParams();

        // if (ingredients) {
        //     queryParams.append('ingredients', ingredients);
        // }

        // if (dietaryPreferences) {
        //     queryParams.append('diet', dietaryPreferences.join(','));
        // }

        // if (recipeName) {
        //     queryParams.append('query', recipeName);
        // }

        // const queryString = queryParams.toString();
        // const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?${queryString}&apiKey=${API_KEY}`);
        res.json(fakeData.fakeRecipesData);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/recipe/ingredients', async (req, res) => {
    try {
        // const { recipeIds } = req.query;
        // if (!recipeIds) {
        //     throw new Error('Recipe IDs are required');
        // }

        // const response = await axios.get(`https://api.spoonacular.com/recipes/informationBulk?ids=${recipeIds}&apiKey=${API_KEY}`);
        // if (!response || response.status !== 200) {
        //     throw new Error('Failed to fetch recipe details');
        // }
        // const recipeDetails = response.data;
        // const ingredientsList = recipeDetails.map(recipe => {
        //     let ingredients = recipe.extendedIngredients.map(ingredient => {
        //         return {
        //             name: ingredient.name, 
        //             amount: ingredient.amount,
        //         }
        //     })
        //     return ingredients;
        // })
        // console.log('ingredients', ingredientsList);
        res.json(fakeData.fakeIngredientsData);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// app.get('/api/recipes', async (req, res) => {
//     const query = 'pasta' //req.query.query;
//     console.log('query', query)
//     const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}&number=3`;

//     try {
//         const response = await fetch(apiUrl);
//         res.json(response.data.results);
//     } catch(error) {
//         console.error('Error fetching recipes:', error);
//         res.status(500).json({error: 'Internal server error'});
//     }
// });

