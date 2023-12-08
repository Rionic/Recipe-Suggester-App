import React from 'react';
import './App.css';
import Header from './components/Header';
import RecipeCard from './components/RecipeCard';
import RecipeList from './components/RecipeList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField } from '@mui/material'

const theme = createTheme();

function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <main>
          <RecipeList />
          <TextField id="outlined-basic" label="Enter food here" variant="outlined"/>
          <RecipeCard
            title="Vegan Pasta"
            imageUrl="/images/vegan-pasta.jpg"
            description = "Yummy pasta"
          />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;