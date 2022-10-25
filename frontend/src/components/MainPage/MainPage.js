import "./MainPage.css";
import LoginFormModal from "../SessionFormModals/LoginFormModal";
import { getCurrentUser, logout } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SignupFormModal from "../SessionFormModals/SignupFormModal";
import RecipeShowModal from "../RecipeShowModal/RecipeShowModal";

function MainPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    // Temporary placeholder
    const sampleRecipe = {url: 'google.com', label: 'example recipe', ingredients: [{food: 'ingredient1'}, {food: 'ingredient2'}, {food: 'ingredient3'}], image: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2015/11/shakshuka-11.jpg'}



    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <div id="main-page">
            <div id="main-page-left">
                <div id="cubberd-search-container" className="main-page-component"></div>
            </div>
            <div id="main-page-right">
                <div id="main-page-top">
                    <div id="main-page-top-right">
                        <div id="navbar-container" className="main-page-component">
                           <nav>{sessionUser ? <span>Logged in as {sessionUser.username} <button onClick={handleLogout}>Logout</button> </span> : <span><LoginFormModal /> <SignupFormModal /></span>}</nav>  
                        </div>
                        <div id="main-page-top-right-bottom">
                            <div id="pot-container" className="main-page-component"></div>
                            <div id="shopping-list-container" className="main-page-component"><RecipeShowModal recipe={sampleRecipe}/></div>
                        </div>
                    </div>
                </div>
                <div id="main-page-bottom">
                    <div id="current-cubberd-container" className="main-page-component"></div>
                </div>

            </div>
        </div>
    );
}

export default MainPage;
