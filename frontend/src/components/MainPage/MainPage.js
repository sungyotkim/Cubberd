import "./MainPage.css";
import { getCurrentUser, logout } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


function MainPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);



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
                           <nav>{sessionUser ? <span>Logged in as {sessionUser.username} <button onClick={handleLogout}>Logout</button> </span> : <Link to="/login">Login</Link>} </nav>  
                        </div>
                        <div id="main-page-top-right-bottom">
                            <div id="pot-container" className="main-page-component"></div>
                            <div id="shopping-list-container" className="main-page-component"></div>
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
