import { useState } from "react"
import { useDispatch } from "react-redux";
import { changeItemQuantity, deleteItem, fetchShoppingList } from "../../store/shoppingList";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { TbTrash } from "react-icons/tb";

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
        <div className="shopping-list-item">
            <div>
            <input type="number" onChange={handleChange} value={quantity} />
            {item.ingredient.food}
            </div>
            <div className="trash-icon">
                <TbTrash onClick={handleDelete} />
            </div>
        </div>
    )

}

export default ShoppingListItem
