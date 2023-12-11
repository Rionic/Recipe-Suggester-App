import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import RecipeCard from './components/RecipeCard';
import RecipeList from './components/RecipeList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField, Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material'

const theme = createTheme();
const dietaryPreferencesList = ['Vegetarian', 'Vegan', 'Gluten Free', 'Ketogenic', 'Dairy Free']; // Example list of dietary preferences

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    ingredients: '',
    dietaryPreferences: [],
    recipeName: '',
  });

  const handleInputChange = (event) => {
    console.log('event', event);
    const { name, value } = event.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  }

  const handlePreferenceChange = (event) => {
    const { value, checked } = event.target;
    const updatedPreferences = checked
    ? [...searchCriteria.dietaryPreferences, value]
    : searchCriteria.dietaryPreferences.filter((preference) => preference !== value);
    setSearchCriteria({ ...searchCriteria, dietaryPreferences: updatedPreferences });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const queryParams = new URLSearchParams();

      if (searchCriteria.ingredients !== '') {
        queryParams.append('ingredients', searchCriteria.ingredients);
      }

      if (searchCriteria.dietaryPreferences.length > 0) {
        queryParams.append('diet', searchCriteria.dietaryPreferences);
      }

      if (searchCriteria.recipeName !== '') {
        queryParams.append('recipeName', searchCriteria.recipeName);
      }

      const queryString = queryParams.toString();
      console.log('queryString', queryString);
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?${queryString}&apiKey=96ea7050c7574dca93f0aae38effe795`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRecipes(data.results);
    } catch(error) {
      console.error('There was a problem with the fetch operation', error);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <main>
          <RecipeList />
          <form onSubmit={handleSubmit}>
            <TextField
              name="ingredients"
              label="Enter ingredients"
              variant="outlined"
              value={searchCriteria.ingredients}
              onChange={handleInputChange}
            />
            <TextField
              name="recipeName"
              label="Enter recipe"
              variant="outlined"
              value={searchCriteria.recipeName}
              onChange={handleInputChange}
            />
            <FormGroup>
              <label>Choose dietary preferences</label>
              {dietaryPreferencesList.map((preference, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={searchCriteria.dietaryPreferences.includes(preference)}
                      onChange={handlePreferenceChange}
                      value={preference}
                    />
                  }
                  label={preference}
                />
              ))}
            </FormGroup>
            <Button type="Submit" variant="contained" color="primary">
              Search Recipes
            </Button>
          </form>

          {console.log(recipes)}
          <div className="card-list">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                title={recipe.title}
                imageUrl={recipe.image}
                description={recipe.description}
              />
            ))}
          </div>

        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;