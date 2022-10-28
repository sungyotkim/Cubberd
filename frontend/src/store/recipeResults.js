import jwtFetch from "./jwt";

const RECEIVE_RECIPE_RESULTS = "recipes/RECEIVE_RECIPE_RESULTS"
const REMOVE_RECIPE_RESULTS = "recipes/REMOVE_RECIPE_RESULTS"

const receiveRecipeResults = (recipes) => ({
  type: RECEIVE_RECIPE_RESULTS,
  recipes
})

export const removeRecipeResults = () => ({
  type: REMOVE_RECIPE_RESULTS
})

export const fetchRecipesFromPot = (cubberd, pot) => async (dispatch) => {
  const res = await jwtFetch('/api/recipes/ingredients', {
      method: "POST",
      body: JSON.stringify({ cubberd: cubberd, pot: pot })
  })
  const recipes = await res.json();
  dispatch(receiveRecipeResults(recipes))
}

const recipesReducer = (state = [], action) => {
  switch (action.type) {
      case RECEIVE_RECIPE_RESULTS:
          return action.recipes
      case REMOVE_RECIPE_RESULTS:
          return [];
      default:
          return state;
  }
};

export default recipesReducer;