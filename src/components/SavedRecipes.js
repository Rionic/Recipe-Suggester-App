import React, { useContext, useEffect, useState } from 'react';
import Header from './Header';
import RecipeCard from './RecipeCard';
import { AuthContext } from '../AuthContext';

function SavedRecipes() {
  const { token } = useContext(AuthContext);
  const [savedRecipeIds, setSavedRecipeIds] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    if (savedRecipeIds.length > 0) {
      fetchRecipeDetails();
    }
  }, [savedRecipeIds]);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await fetch(
          'http://localhost:3001/api/fetch-saved-recipes',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setSavedRecipeIds(data.savedRecipeIds || []);
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
  }, []);

  const fetchRecipeDetails = async () => {
    const savedIds = savedRecipeIds.map((recipe) => recipe.recipe_id);
    const joinedIds = savedIds.join(',');
    try {
      const response = await fetch(
        `http://localhost:3001/api/recipe/ingredients?recipeIds=${joinedIds}`,
      );
      if (response.ok) {
        const data = await response.json();
        const updatedSavedRecipes = savedRecipeIds.map((recipe, index) => {
          return {
            ...recipe,
            ingredients: data.ingredientsList[index],
            sourceUrl: data.urlList[index],
            title: data.titleList[index],
            imageUrl: data.imageList[index],
          };
        });
        setSavedRecipes(updatedSavedRecipes);
      } else {
        alert(
          'Server error. This is likely due the 150 requests/day limit being hit on the Spoonacular API',
        );
        console.error('Failed to fetch recipe details');
      }
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

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
                imageUrl={recipe.imageUrl}
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
