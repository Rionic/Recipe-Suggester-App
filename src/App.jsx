import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import RecipeCard from './components/RecipeCard';
import RecipeList from './components/RecipeList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField } from '@mui/material'

const theme = createTheme();

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/recipes');
        if (response.ok) {
          const data = await response.json();
          setRecipes(data);
        } else {
          throw new Error('Request failed');
        }
      } catch(error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <main>
          <RecipeList />
          <TextField id="outlined-basic" label="Enter food here" variant="outlined"/>
          {console.log(recipes)}
          {recipes.map((recipe) => (
            <RecipeCard 
              key={recipe.id}
              title={recipe.title}
              imageUrl={recipe.image}
              description={recipe.description}
            />
          ))}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;