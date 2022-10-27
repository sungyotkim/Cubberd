import "./MainPage.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../../store/recipes";
import { useEffect } from "react";
import Cubberd from '../Cubberd/Cubberd';
import Pot from "../Pot/Pot";
import PotContents from "../Pot/PotContents/PotContents";
import ShoppingList from "../ShoppingList/ShoppingList";
import NavBar from "../NavBar/NavBar";

function MainPage() {
    const dispatch = useDispatch();
    const shoppingList = useSelector(state => state.session.user.shoppingList);

    useEffect(() => {
        dispatch(fetchRecipes())
    }, [])   

    return (
        <div id="main-page" className="main-display">
            <div id="main-page-left">
                <div id="cubberd-search-container" className="main-display-component">
                    <Cubberd />
                </div>
            </div>
            <div id="main-page-right">
                <div id="main-page-top">
                    <div id="main-page-top-right">
                        <div id="navbar-container" className="main-display-component">
                            <NavBar />
                        </div>
                        <div id="main-page-top-right-bottom">
                            <div id="pot-container" className="main-display-component">
                                <Pot />
                            </div>
                            <div id="shopping-list-container" className="main-display-component">
                                <h3>Shopping List</h3>
                                <ShoppingList items={shoppingList} />
                            </div>
                        </div>
                    </div>
                </div>
                <div id="main-page-bottom">
                    <div id="current-cubberd-container" className="main-display-component">
                        <PotContents />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
