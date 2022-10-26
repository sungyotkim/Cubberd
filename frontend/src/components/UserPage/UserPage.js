import "./UserPage.css";
import RecipeShowModal from "../RecipeShowModal/RecipeShowModal";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { logout } from "../../store/session";
import RecipeList from "../RecipeList/RecipeList";
import { useEffect } from "react";
import { fetchShoppingList } from "../../store/shoppingList";
import ShoppingList from "../ShoppingList/ShoppingList";



function UserPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const favoritedRecipes = useSelector(state => state.session.user.savedRecipes.favorited);
    const plannedRecipes = useSelector(state => state.session.user.savedRecipes.planned);
    const shoppingList = useSelector(state => state.session.user.shoppingList);


    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <div id="user-page" className="main-display">
            <nav className="main-display-component"><div id="user-page-search-container"></div><div id="user-page-nav-items"><div className="user-page-nav-item"><Link to="/">Home</Link></div><div className="user-page-nav-item">{sessionUser ? <button onClick={handleLogout}>Log out</button> : <Redirect to="/login" />}</div></div></nav>
            <div id="user-page-columns" className="main-display-component">
                <div id="user-page-favorited-recipes-container"className="main-display-component user-page-column">
                    <h3>Favorited Recipes</h3>
                    

                    <RecipeList recipes={favoritedRecipes} recipeContext={'favorited'} />

                </div>
                <div id="user-page-planned-and-shopping" className="main-display-component user-page-column">
                    <div id="user-page-shopping-list" className="main-display-component">
                     <h3>Shopping List</h3>
                     <ShoppingList items={shoppingList} />   
                    </div>
                    <div id="user-page-planned-recipes-container" className="main-display-component">
                        <h3>Planned Recipes</h3>
                        <RecipeList recipes={plannedRecipes} recipeContext={'planned'} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserPage;