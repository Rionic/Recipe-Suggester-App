import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import Header from './components/Header';
import LoginSignup from './components/LoginSignup';
import RecipeCard from './components/RecipeCard';
import MyAccount from './components/MyAccount.js';
import { AuthContext } from './AuthContext.js';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

const theme = createTheme();
const dietaryPreferencesList = [
  'Vegetarian',
  'Vegan',
  'Gluten Free',
  'Ketogenic',
  'Dairy Free',
];

function App() {
  const [recipes, setRecipes] = useState([]);
  const [ids, setIds] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [urls, setUrls] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    ingredients: '',
    dietaryPreferences: [],
    recipeName: '',
  });
  const { token } = useContext(AuthContext);
  useEffect(() => {
    if (ids.length > 0) fetchIngredients(ids);
  }, [ids]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  const handlePreferenceChange = (event) => {
    const value = event.target.value;
    setSearchCriteria({
      ...searchCriteria,
      dietaryPreferences: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchedRecipes = await fetchRecipes();
    const recipeIds = fetchedRecipes.map((recipe) => recipe.id);
    setIds(recipeIds);
  };

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
      setRecipes(data.results);
      return data.results;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      return [];
    }
  };

  const fetchIngredients = async (recipeIds) => {
    try {
      const joinedIds = recipeIds.join(',');
      const response = await fetch(
        `http://localhost:3001/api/recipe/ingredients?recipeIds=${joinedIds}`,
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      setIngredients(data.ingredientsList);
      setUrls(data.urlList);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        {token ? <MyAccount /> : <LoginSignup />}
        <main>
          <form onSubmit={handleSubmit}>
            <div className="filters">
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
              <FormControl variant="outlined">
                <InputLabel id="dietary-preferences-label">
                  Dietary Preferences
                </InputLabel>
                <Select
                  labelId="dietary-preferences-label"
                  id="dietary-preferences"
                  multiple
                  value={searchCriteria.dietaryPreferences}
                  onChange={handlePreferenceChange}
                  label="Dietary Preferences"
                  style={{ width: '210.4px' }}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {dietaryPreferencesList.map((preference, index) => (
                    <MenuItem key={index} value={preference}>
                      {preference}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <Button type="Submit" variant="contained" color="primary">
              Search Recipes
            </Button>
          </form>
          {/* <RecipeList /> */}
          <div className="card-list">
            {recipes.map((recipe, index) => (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                imageUrl={recipe.image}
                ingredients={ingredients[index]}
                sourceUrl={urls[index]}
              />
            ))}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
