import jwtFetch from "./jwt";

const RECEIVE_RECIPES = "recipes/RECEIVE_RECIPES";
const RECEIVE_RECIPE = "recipes/RECIEVE_RECIPE";

const receiveRecipes = (recipes) => ({
    type: RECEIVE_RECIPES,
    recipes
})

const receiveRecipe = (recipe) => ({
    type: RECEIVE_RECIPE,
    recipe
})

export const fetchRecipes = () => async (dispatch) => {
    const res = await jwtFetch("/api/recipes");
    const recipes = await res.json();
    dispatch(receiveRecipes(recipes));
}

export const fetchRecipe = (id) => async (dispatch) => {
    const res = await jwtFetch(`/api/recipes/${id}`)
    const recipe = await res.json();
    dispatch(receiveRecipe(recipe));
}

const recipesReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_RECIPES:
            return {...state, ...action.recipes}
        case RECEIVE_RECIPE:
            return {...state, ...action.recipe}
        default:
            return state;
    }
};

export default recipesReducer;