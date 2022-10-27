import ShoppingListItem from "../ShoppingListItem/ShoppingListItem";


function ShoppingList({items, setRefresh}) {


    const shoppingListItems = items.map((item) => <ShoppingListItem item={item} setRefresh={setRefresh}/>);

    return (
        <div id="shoppingList">
            {shoppingListItems}
        
        </div>
    )

}

export default ShoppingList;