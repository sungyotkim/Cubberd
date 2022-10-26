import ShoppingListItem from "../ShoppingListItem/ShoppingListItem";


function ShoppingList({items}) {


    const shoppingListItems = items.map((item) => <ShoppingListItem item={item} />);

    return (
        <div id="shoppingList">
            <h3>shopping list item placeholder</h3>
            {shoppingListItems}
        
        </div>
    )

}

export default ShoppingList;