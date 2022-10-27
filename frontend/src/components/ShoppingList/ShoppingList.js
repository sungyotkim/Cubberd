import ShoppingListItem from "../ShoppingListItem/ShoppingListItem";
import './ShoppingList.css';


function ShoppingList({items}) {


    const shoppingListItems = items.map((item) => <ShoppingListItem item={item} />);

    return (
        <div id="shopping-list">
            {shoppingListItems}
        
        </div>
    )

}

export default ShoppingList;