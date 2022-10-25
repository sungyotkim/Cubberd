import jwtFetch from "./jwt";

const RECEIVE_INGREDIENTS = "ingredients/RECEIVE_INGREDIENTS";
const RECEIVE_INGREDIENT = "ingredients/RECEIVE_INGREDIENT";
const RECEIVE_USER_CUBBERD_INGREDIENTS =
  "ingredients/RECEIVE_USER_CUBBERD_INGREDIENTS";
const RECEIVE_NEW_USER_CUBBERD_INGREDIENT =
  "ingredients/RECEIVE_NEW_USER_CUBBERD_INGREDIENT";
const REMOVE_USER_CUBBERD_INGREDIENT =
  "ingredients/REMOVE_USER_CUBBERD_INGREDIENT";

const receiveIngredients = (ingredients) => ({
  type: RECEIVE_INGREDIENTS,
  ingredients,
});

const receiveIngredient = (ingredient) => ({
  type: RECEIVE_INGREDIENT,
  ingredient,
});

const receiveUserCubberdIngredients = (ingredients) => ({
  type: RECEIVE_USER_CUBBERD_INGREDIENTS,
  ingredients,
});

const receiveNewUserCubberdIngredient = (ingredient) => ({
  type: RECEIVE_NEW_USER_CUBBERD_INGREDIENT,
  ingredient,
});

const removeUserCubberdIngredient = (ingredientId) => ({
  type: REMOVE_USER_CUBBERD_INGREDIENT,
  ingredientId,
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

export const fetchUserCubberdIngredients = (userId) => async (dispatch) => {
  const res = await jwtFetch(`/api/users/${userId}/cubberd`);
  const ingredients = await res.json();
  dispatch(receiveUserCubberdIngredients(ingredients.cubberd));
};

export const composeUserCubberdIngredient =
  (userId, ingredient) => async (dispatch) => {
    const res = await jwtFetch(`/api/users/${userId}/cubberd`, {
      method: "POST",
      body: JSON.stringify(ingredient),
    });
    const savedIngredient = await res.json();
    dispatch(receiveNewUserCubberdIngredient(savedIngredient));
  };

export const deleteUserCubberdIngredient =
  (userId, ingredientId) => async (dispatch) => {
    const res = await jwtFetch(`/api/users/${userId}/cubberd`, {
      method: "DELETE",
      body: JSON.stringify(ingredientId),
    });
    const deletedIngredientId = await res.json();
    dispatch(removeUserCubberdIngredient(deletedIngredientId));
  };

const ingredientsReducer = (
  state = { all: {}, userCubberd: {}, new: undefined },
  action
) => {
  switch (action.type) {
    case RECEIVE_INGREDIENTS:
      return { ...state, all: action.ingredients, new: undefined };
    case RECEIVE_INGREDIENT:
      return { ...state, all: action.ingredient, new: undefined };
    case RECEIVE_USER_CUBBERD_INGREDIENTS:
      return { ...state, userCubberd: action.ingredients, new: undefined };
    case RECEIVE_NEW_USER_CUBBERD_INGREDIENT:
      return {
        ...state,
        userCubberd: action.ingredients,
        new: action.ingredient,
      };
    case REMOVE_USER_CUBBERD_INGREDIENT:
      return {
        ...state,
        new: undefined,
        userCubberd: state.ingredients.userCubberd.filter(
          (ing) => ing._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default ingredientsReducer;
