const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mockData = require("./MockData");
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
const API_KEY = "2d60a10270894aaea2c880a8df71f2e3";

app.use(express.json());

app.post("/api/search", async (req, res) => {
  try {
    const { ingredients, dietaryPreferences, recipeName } = req.body;

    const queryParams = new URLSearchParams();

    if (ingredients) {
      queryParams.append("includeIngredients", ingredients);
    }

    if (dietaryPreferences) {
      queryParams.append("diet", dietaryPreferences.join(","));
    }

    if (recipeName) {
      queryParams.append("query", recipeName);
    }

    const queryString = queryParams.toString();
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?${queryString}&number=1&apiKey=${API_KEY}`,
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/recipe/ingredients", async (req, res) => {
  try {
    const { recipeIds } = req.query;

    if (!recipeIds) {
      throw new Error("Recipe IDs are required");
    }

    const response = await axios.get(
      `https://api.spoonacular.com/recipes/informationBulk?ids=${
        recipeIds.split(",")[0]
      }&apiKey=${API_KEY}`,
    );
    if (!response || response.status !== 200) {
      throw new Error("Failed to fetch recipe details");
    }
    const recipeDetails = response.data;
    let urlList = [];
    const ingredientsList = recipeDetails.map((recipe) => {
      let ingredients = recipe.extendedIngredients.map((ingredient) => {
        return {
          name: ingredient.name,
          amount: ingredient.amount,
          unit: ingredient.unit,
        };
      });
      urlList.push(recipe.sourceUrl);
      return ingredients;
    });
    const sendData = {
      ingredientsList: ingredientsList,
      urlList: urlList,
    };
    res.json(sendData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
