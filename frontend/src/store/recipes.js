import jwtFetch from "./jwt";

const RECEIVE_RECIPES = "recipes/RECEIVE_RECIPES";
const RECEIVE_RECIPE = "recipes/RECIEVE_RECIPE";


const receiveRecipes = (recipes) => ({
    type: RECEIVE_RECIPES,
    recipes
})

export const fetchRecipes = () => async (dispatch) => {
    const res = await jwtFetch("/api/recipes");
    const recipes = await res.json();
    dispatch(receiveRecipes(recipes));
}


const recipesReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_RECIPES:
            return {...state, ...action.recipes}
        default:
            return state;
    }
};

export default recipesReducer;