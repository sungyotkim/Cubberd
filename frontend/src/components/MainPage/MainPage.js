import "./MainPage.css";
import { logout } from "../../store/session";
import { useDispatch } from "react-redux";
import LoginFormModal from "../SessionFormModals/LoginFormModal";



function MainPage() {
    const dispatch = useDispatch();


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
                            <nav><LoginFormModal /><button onClick={handleLogout}>Logout</button></nav>
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
