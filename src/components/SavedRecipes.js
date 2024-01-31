import React, { useContext, useEffect, useState } from 'react';
import Header from './Header';
import RecipeCard from './RecipeCard';
import { AuthContext } from '../AuthContext';

function SavedRecipes() {
  const { token } = useContext(AuthContext);
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/fetch-saved-recipes', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSavedRecipes(data.savedRecipeIds || []);
        } else {
          console.error('Failed to fetch saved recipes');
        }
      } catch (error) {
        console.error('Error fetching saved recipes:', error);
      }
    };

    if (token) {
      fetchSavedRecipes();
    }
  }, [token]);

  // Fetch additional details for saved recipes from Spoonacular
  const fetchRecipeDetails = async () => {
    const savedRecipeIds = savedRecipes.map((recipe) => recipe.recipe_id);
    const joinedIds = savedRecipeIds.join(',');
    console.log(joinedIds);
    try {
      const response = await fetch(`http://localhost:3001/api/recipe/ingredients?recipeIds=${joinedIds}`);
      if (response.ok) {
        const data = await response.json();

        // Update saved recipes with additional details
        const updatedSavedRecipes = savedRecipes.map((recipe, index) => {
          return {
            ...recipe,
            ingredients: data.ingredientsList[index],
            sourceUrl: data.urlList[index],
          };
        });

        setSavedRecipes(updatedSavedRecipes);
      } else {
        console.error('Failed to fetch recipe details');
      }
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  useEffect(() => {
      console.log('Saved recipes:', savedRecipes);

    if (savedRecipes.length > 0) {
      console.log('Fetching recipe details...');
      fetchRecipeDetails();
    }
  }, [savedRecipes]);

  return (
    <div>
      <Header />
      {token && (
        <main>
          <div className="card-list">
            {savedRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.recipe_id}
                id={recipe.recipe_id}
                title={recipe.title}
                imageUrl={recipe.image}
                ingredients={recipe.ingredients}
                sourceUrl={recipe.sourceUrl}
              />
            ))}
          </div>
        </main>
      )}
    </div>
  );
}

export default SavedRecipes;
