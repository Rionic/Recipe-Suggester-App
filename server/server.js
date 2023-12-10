const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

app.use(cors());

const apiKey = '96ea7050c7574dca93f0aae38effe795';

app.get('/api/recipes', async (req, res) => {
    const query = 'pasta' //req.query.query;
    console.log('query', query)
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}&number=3`;

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data.results);
    } catch(error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});