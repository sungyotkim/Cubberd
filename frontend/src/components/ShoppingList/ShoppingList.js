import ShoppingListItem from "../ShoppingListItem/ShoppingListItem";


function ShoppingList({items}) {


    const shoppingListItems = items.map((item) => <ShoppingListItem item={item} />);

    return (
        <div id="shoppingList">
            {shoppingListItems}
        
        </div>
    )

}

export default ShoppingList;