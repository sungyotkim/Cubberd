import "./UserPage.css";
import RecipeShowModal from "../RecipeShowModal/RecipeShowModal";


function UserPage() {
    return (
        <div id="user-page" className="main-display">
            <nav className="main-display-component"></nav>
            <div id="user-page-columns" className="main-display-component">
                <div id="user-page-saved-recipes-container"className="main-display-component user-page-column"></div>
                <div id="user-page-planned-recipes-container" className="main-display-component user-page-column"></div>
                <div id="user-page-shopping-list" className="main-display-component user-page-column"></div>
            </div>

        </div>
    )
}

export default UserPage;