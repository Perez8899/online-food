export const categorizeIngredients = (ingredients) => {
    return ingredients.reduce((acc, ingredient) => {  //accomulator ingredients
      const { category } = ingredient;
      if (!acc[category.name]) {              //If the category does not exist in the accumulator...
        acc[category.name] = [];              //Create an empty array for that category
      }
      acc[category.name].push(ingredient);   // Add the ingredient to its category
      return acc;                            // Returns the updated accumulator
    }, {});              // Start with an empty object {}  
  };