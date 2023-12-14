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
  const [ids, setIds] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    ingredients: '',
    dietaryPreferences: [],
    recipeName: '',
  });

  useEffect( () => {
    if (ids.length > 0) fetchIngredients(ids);
  }, [ids])

  const handleInputChange = (event) => {
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
    const fetchedRecipes = await fetchRecipes();
    const recipeIds = fetchedRecipes.map(recipe => recipe.id); 
    setIds(recipeIds);
  }

  const fetchRecipes = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchCriteria),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('data', data);
      setRecipes(data.results);
      return data.results;
    } catch(error) {
      console.error('There was a problem with the fetch operation:', error);
      return [];
    }
  }

  const fetchIngredients = async (recipeIds) => {
    try {
      const joinedIds = recipeIds.join(',');
      const response = await fetch(`http://localhost:3001/api/recipe/ingredients?recipeIds=${joinedIds}`)
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      setIngredients(data);
      console.log('Ingredients for recipes:', data);
    } catch(error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <main>
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
          {/* <RecipeList /> */}
          <div className="card-list">
            {recipes.map((recipe, index) => (
              <RecipeCard
                key={recipe.id}
                title={recipe.title}
                imageUrl={recipe.image}
                description={recipe.description}
                ingredients={ingredients[index]}
              />
            ))}
          </div>

        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;