import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import Header from './components/Header';
import LoginSignup from './components/LoginSignup';
import RecipeCard from './components/RecipeCard';
import MyAccount from './components/MyAccount.js';
import UseRecipeSearch from './utils/UseRecipeSearch.js';
import { AuthContext } from './AuthContext.js';

const theme = createTheme();
const dietaryPreferencesList = [
  'Vegetarian',
  'Vegan',
  'Gluten Free',
  'Ketogenic',
  'Dairy Free',
];

function App() {
  const { token } = React.useContext(AuthContext);
  const {
    recipes,
    ids,
    ingredients,
    urls,
    searchCriteria,
    handleInputChange,
    handlePreferenceChange,
    handleSubmit,
  } = UseRecipeSearch({
    ingredients: '',
    dietaryPreferences: [],
    recipeName: '',
  });

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
