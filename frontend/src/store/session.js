import jwtFetch from "./jwt";

const RECEIVE_CURRENT_USER = "session/RECEIVE_CURRENT_USER";
const RECEIVE_SESSION_ERRORS = "session/RECEIVE_SESSION_ERRORS";
const CLEAR_SESSION_ERRORS = "session/CLEAR_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "session/RECEIVE_USER_LOGOUT";

const RECEIVE_USER_CUBBERD_INGREDIENTS =
  "session/RECEIVE_USER_CUBBERD_INGREDIENTS";
const RECEIVE_NEW_USER_CUBBERD_INGREDIENT =
  "session/RECEIVE_NEW_USER_CUBBERD_INGREDIENT";
const REMOVE_USER_CUBBERD_INGREDIENT =
  "session/REMOVE_USER_CUBBERD_INGREDIENT";
const CLEAR_USER_CUBBERD = "session/CLEAR_USER_CUBBERD"

const RECEIVE_SHOPPING_LIST = "shoppingList/RECEIVE_SHOPPING_LIST";
const ADD_TO_SHOPPING_LIST = "shoppingList/ADD_TO_SHOPPING_LIST";
const EDIT_SHOPPING_LIST = "shoppingList/EDIT_SHOPPING_LIST";
const DELETE_FROM_SHOPPING_LIST = "shoppingList/DELETE_FROM_SHOPPING_LIST";

// Dispatch receiveCurrentUser when a user logs in
const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
});

// Dispatch receiveErrors to show authentication errors on the frontend.
const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

// Dispatch logoutUser to clear the session user when a user logs out.
const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT,
});

// Dispatch clearSessionErrors to clear any session errors.
export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS,
});

// Handle User Cubberd actions
const receiveUserCubberdIngredients = (ingredients) => ({
  type: RECEIVE_USER_CUBBERD_INGREDIENTS,
  ingredients,
});

const receiveNewUserCubberdIngredient = (ingredients) => ({
  type: RECEIVE_NEW_USER_CUBBERD_INGREDIENT,
  ingredients,
});

const removeUserCubberdIngredient = (ingredients) => ({
  type: REMOVE_USER_CUBBERD_INGREDIENT,
  ingredients,
});

const clearUserCubberd = () => ({
  type: CLEAR_USER_CUBBERD
})

// Handle Shopping List actions
const receiveShoppingList = (shoppingList) => ({
  type: RECEIVE_SHOPPING_LIST,
  shoppingList
});

const addShoppingListItem = (shoppingList) => ({
  type: ADD_TO_SHOPPING_LIST,
  shoppingList
});


const editShoppingList = (shoppingList) => ({
  type: EDIT_SHOPPING_LIST,
  shoppingList
})

const removeFromShoppingList = (shoppingList) => ({
  type: DELETE_FROM_SHOPPING_LIST,
  shoppingList
})


//Because signup also logs in the newly created user,
// login and signup essentially differ only in their route and user information sent.
// You should accordingly be able to abstract their common elements into a helper function.

export const signup = (user) => startSession(user, "api/users/register");
export const login = (user) => startSession(user, "api/users/login");

const startSession = (userInfo, route) => async (dispatch) => {
  try {
    const res = await jwtFetch(route, {
      method: "POST",
      body: JSON.stringify(userInfo),
    });
    const { user, token } = await res.json();
    localStorage.setItem("jwtToken", token);
    return dispatch(receiveCurrentUser(user));
  } catch (err) {
    const res = await err.json();
    if (res.statusCode === 400) {
      return dispatch(receiveErrors(res.errors));
    }
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  dispatch(logoutUser());
};

export const getCurrentUser = () => async (dispatch) => {
  const res = await jwtFetch("/api/users/current");
  const user = await res.json();
  return dispatch(receiveCurrentUser(user));
};


// Cubbered backend actions
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
    const newCubberd = await res.json();
    dispatch(receiveNewUserCubberdIngredient(newCubberd));
  };

export const deleteUserCubberdIngredient =
  (userId, ingredient) => async (dispatch) => {
    const res = await jwtFetch(`/api/users/${userId}/cubberd`, {
      method: "DELETE",
      body: JSON.stringify(ingredient),
    });
    const updatedCubberd = await res.json();
    dispatch(removeUserCubberdIngredient(updatedCubberd));
  };

export const deleteUserCubberd = (userId) => async (dispatch) => {
  await jwtFetch(`/api/users/${userId}/clearCubberd`, {
    method: "DELETE"
  })
  dispatch(clearUserCubberd())
}

// shopping list backend actions
export const fetchShoppingList = (currentUserId) => async (dispatch) => {
  const res = await jwtFetch(`/api/users/${currentUserId}/shoppingList`);
  const shoppingList = await res.json();
  dispatch(receiveShoppingList(shoppingList));
};

export const addToShoppingList = (currentUserId, shoppingListItemName) => async (dispatch) => {
  const res = await jwtFetch(`/api/users/${currentUserId}/shoppingList`, {
      method: "POST",
      body: JSON.stringify(shoppingListItemName)
  })

  const newShoppingList = await res.json();
  dispatch(addShoppingListItem(newShoppingList));
}

export const changeItemQuantity = (currentUserId, shoppingListItemId, newQuantity) => async (dispatch) => {
  const res = await jwtFetch(`/api/users/${currentUserId}/shoppingList`, {
      method: "PUT",
      body: JSON.stringify({
          newQuantity,
          shoppingListItemId
      })
  })
  const newShoppingList = await res.json();
  dispatch(editShoppingList(newShoppingList));
}

export const deleteItem = (currentUserId, shoppingListItemId) => async dispatch => {
  const res = await jwtFetch(`/api/users/${currentUserId}/shoppingList`, {
      method: "DELETE",
      body: JSON.stringify({
          shoppingListItemId
      })
  })
  const shoppingList = await res.json();
  dispatch(removeFromShoppingList(shoppingList))
}


// add recipe to planned
export const addRecipeToPlanned = (currentUserId, recipe) => async (dispatch) => {
  const res = await jwtFetch(`/api/users/${currentUserId}/savedRecipes`, {
    method: "POST",
    body: JSON.stringify({
      recipeId: recipe._id,
      collection: "planned"
    })
  })
  const user = await res.json()
  dispatch(receiveCurrentUser(user));
}

// delete recipe from favorited
export const deleteRecipeFromFavorited = (currentUserId, recipe) => async (dispatch) => {
  const res = await jwtFetch(`/api/users/${currentUserId}/savedRecipes`, {
    method: "DELETE",
    body: JSON.stringify({
      recipeId: recipe._id,
      collection: "favorited"
    })
  })
  const user = await res.json();
  dispatch(receiveCurrentUser(user));
}

export const addRecipeToFavorited = (currentUserId, recipe) => async (dispatch) => {
  const res = await jwtFetch(`/api/users/${currentUserId}/savedRecipes`, {
    method: "POST",
    body: JSON.stringify({
      recipeId: recipe._id,
      collection: "favorited"
    })
  })
  const user = await res.json()
  dispatch(receiveCurrentUser(user));
}

export const deleteRecipeFromPlanned = (currentUserId, recipe) => async (dispatch) => {
  const res = await jwtFetch(`/api/users/${currentUserId}/savedRecipes`, {
    method: "DELETE",
    body: JSON.stringify({
      recipeId: recipe._id,
      collection: "planned"
    })
  })
  const user = await res.json();
  dispatch(receiveCurrentUser(user));
}

// error reducer
const nullErrors = null;

export const sessionErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
    case CLEAR_SESSION_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

// session reducer

const initialState = {
  user: undefined,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { user: action.currentUser };
    case RECEIVE_USER_LOGOUT:
      return initialState;

    case RECEIVE_USER_CUBBERD_INGREDIENTS:
      state.user.cubberd = action.ingredients; 
      return {...state}
    case RECEIVE_NEW_USER_CUBBERD_INGREDIENT:
      state.user.cubberd = action.ingredients; 
      return {...state};
    case REMOVE_USER_CUBBERD_INGREDIENT:
      state.user.cubberd = action.ingredients; 
      return {...state};
    case CLEAR_USER_CUBBERD:
      state.user.cubberd = {};
      return {...state}

    case RECEIVE_SHOPPING_LIST:
      state.user.shoppingList = action.shoppingList
      return {...state}
    case ADD_TO_SHOPPING_LIST:
      state.user.shoppingList = action.shoppingList
      return {...state}
    case EDIT_SHOPPING_LIST:
      state.user.shoppingList = action.shoppingList
      return {...state}
    case DELETE_FROM_SHOPPING_LIST:
      state.user.shoppingList = action.shoppingList
      return {...state}
    default:
      return state;
  }
};

export default sessionReducer;
