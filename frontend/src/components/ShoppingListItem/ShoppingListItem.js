import { useState } from "react"
import { useDispatch } from "react-redux";
import { editShoppingList } from "../../store/shoppingList";
import { useSelector } from "react-redux";

function ShoppingListItem({item}) {
    const sessionUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(item.quantity);

    const handleChange = (e) => {
        setQuantity(e.target.value);

        const editedItem = item.quantity = quantity;
        dispatch(editShoppingList(sessionUser._id, editedItem))
    }


    return (
        <div className="shoppingListItem">
            <form><input type="number" onChange={handleChange} value={quantity}></input></form>{item.ingredient.food}
        </div>
    )

}

export default ShoppingListItem
