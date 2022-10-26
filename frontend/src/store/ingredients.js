import jwtFetch from "./jwt";

const RECEIVE_INGREDIENTS = "ingredients/RECEIVE_INGREDIENTS";
const RECEIVE_INGREDIENT = "ingredients/RECEIVE_INGREDIENT";

const receiveIngredients = (ingredients) => ({
  type: RECEIVE_INGREDIENTS,
  ingredients,
});

const receiveIngredient = (ingredient) => ({
  type: RECEIVE_INGREDIENT,
  ingredient,
});



export const fetchIngredients = () => async (dispatch) => {
  const res = await jwtFetch("/api/ingredients");
  const ingredients = await res.json();
  dispatch(receiveIngredients(ingredients));
};

export const fetchIngredient = (name) => async (dispatch) => {
  const res = await jwtFetch(`/api/ingredient/${name}`);
  const ingredient = await res.json();
  dispatch(receiveIngredient(ingredient));
};

const ingredientsReducer = (state = { all: {} }, action) => {
  switch (action.type) {
    case RECEIVE_INGREDIENTS:
      return { ...state, all: action.ingredients };
    case RECEIVE_INGREDIENT:
      return { ...state, all: action.ingredient };
    default:
      return state;
  }
};

export default ingredientsReducer;
