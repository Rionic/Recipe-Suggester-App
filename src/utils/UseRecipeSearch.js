import { useState, useEffect } from 'react';

const UseRecipeSearch = (initialSearchCriteria) => {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [urls, setUrls] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState(initialSearchCriteria);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fetchedRecipes = await fetchRecipes();
    const recipeIds = fetchedRecipes.map((recipe) => recipe.id);
    setRecipes(fetchedRecipes);
    setIngredients([]);
    setUrls([]);
    if (recipeIds.length > 0) {
      await fetchIngredients(recipeIds);
    }
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
        alert('Server error. This is likely due the 150 requests/day limit being hit on the Spoonacular API');
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
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

  return {
    recipes,
    ingredients,
    urls,
    searchCriteria,
    handleInputChange,
    handlePreferenceChange,
    handleSubmit,
  };
};

export default UseRecipeSearch;
