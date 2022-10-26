import { useState } from "react"
import { useDispatch } from "react-redux";
import { changeItemQuantity } from "../../store/shoppingList";
import { useSelector } from "react-redux";

function ShoppingListItem({item}) {
    const sessionUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(item.quantity);

    const handleChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        setQuantity(newQuantity);
        dispatch(changeItemQuantity(sessionUser._id, item._id, newQuantity));
    }

    const handleDelete = () => {

    }


    return (
        <div className="shoppingListItem">
            <form>
                {item.ingredient.food}
                <input type="number" onChange={handleChange} value={quantity} />
            </form>
        </div>
    )

}

export default ShoppingListItem
