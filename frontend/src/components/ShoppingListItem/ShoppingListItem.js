import { useState } from "react"
import { useDispatch } from "react-redux";
import { changeItemQuantity, deleteItem, fetchShoppingList } from "../../store/shoppingList";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function ShoppingListItem({item}) {
    const sessionUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(item.quantity);

    const handleChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        setQuantity(newQuantity);
        dispatch(changeItemQuantity(sessionUser._id, item._id, newQuantity));
    }

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteItem(sessionUser._id, item._id))
    }

    return (
        <div className="shoppingListItem">
            {item.ingredient.food}
            <input type="number" onChange={handleChange} value={quantity} />
            <div className="update-item">Update Item</div>
            <button onClick={handleDelete}>Delete item</button>
        </div>
    )

}

export default ShoppingListItem
