import jwtFetch from "./jwt";

const RECEIVE_SHOPPING_LIST = "shoppingList/RECEIVE_SHOPPING_LIST";

const receiveShoppingList = (shoppingList) => ({
    type: RECEIVE_SHOPPING_LIST,
    shoppingList
})

export const fetchShoppingList = (currentUserId) => async (dispatch) => {
    const res = await jwtFetch(`/api/users/${currentUserId}/shoppingList`);
    const shoppingList = await res.json();
    dispatch(receiveShoppingList(shoppingList));
}

const shoppingListReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_SHOPPING_LIST:
            return {...state, ...action.shoppingList}
        default:
            return state;
    }
};

export default shoppingListReducer;