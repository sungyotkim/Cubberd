
function ShoppingListItem({item}) {



    return (
        <div className="shoppingListItem">
            {item.ingredient.food}
            {item.quantity}
            <div className="update-item">Update Item</div>
        </div>
    )

}

export default ShoppingListItem
