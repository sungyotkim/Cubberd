import jwtFetch from "./jwt";

const RECEIVE_SHOPPING_LIST = "shoppingList/RECEIVE_SHOPPING_LIST";
const ADD_TO_SHOPPING_LIST = "shoppingList/ADD_TO_SHOPPING_LIST";
const SET_SHOPPING_LIST = "shoppingList/SET_SHOPPING_LIST";
const DELETE_FROM_SHOPPING_LIST = "shoppingList/DELETE_FROM_SHOPPING_LIST";

const receiveShoppingList = (shoppingList) => ({
    type: RECEIVE_SHOPPING_LIST,
    shoppingList
});

const addShoppingListItem = (shoppingListItem) => ({
    type: ADD_TO_SHOPPING_LIST,
    shoppingListItem
});

const removeFromShoppingList = (shoppingListItem) => ({
    type: DELETE_FROM_SHOPPING_LIST,
    shoppingListItem
})

const setShoppingList = (newShoppingList) => ({
    type: SET_SHOPPING_LIST,
    newShoppingList
})


export const fetchShoppingList = (currentUserId) => async (dispatch) => {
    const res = await jwtFetch(`/api/users/${currentUserId}/shoppingList`);
    const shoppingList = await res.json();
    dispatch(receiveShoppingList(shoppingList));
};

export const addToShoppingList = (currentUserId, shoppingListItem) => async (dispatch) => {
    const res = await jwtFetch(`/api/users/${currentUserId}/shoppingList`, {
        method: "POST",
        body: JSON.stringify(shoppingListItem)
    })

    const newShoppingListItem = await res.json();
    dispatch(addShoppingListItem(newShoppingListItem));
}

// Changing quantity through the HTML form
export const changeItemQuantity = (currentUserId, shoppingListItemId, newQuantity) => async (dispatch) => {
    const res = await jwtFetch(`/api/users/${currentUserId}/shoppingList`, {
        method: "PUT",
        body: JSON.stringify({
            newQuantity,
            shoppingListItemId
        })
    })
    const newShoppingListItem = await res.json();
    console.log(newShoppingListItem)
    dispatch(setShoppingList(newShoppingListItem));
}

const shoppingListReducer = (state = {}, action) => {
    const nextState = {...state}
    switch (action.type) {
        case RECEIVE_SHOPPING_LIST:
            return {...state, ...action.shoppingList};
        case ADD_TO_SHOPPING_LIST:
            return {...state, ...action.shoppingListItem};
        case SET_SHOPPING_LIST:
            return action.newShoppingList;
        default:
            return state;
    };
};

export default shoppingListReducer;