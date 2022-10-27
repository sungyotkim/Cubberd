import "./NavBar.css"
import { Link } from "react-router-dom";
import { useTour } from '@reactour/tour'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";

const NavBar = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const { setIsOpen } = useTour();
  
  const handleLogout = () => {
    dispatch(logout())
}
  return ( 
    <>
      <div className="navbar">
        <div className="info-rack-bar">
          <div className="rack-left-circle"></div>
          <div className="rack-bar"></div>
          <div className="rack-right-circle"></div>
          {/* <div className="hook"></div> */}
        </div>
        {sessionUser && 
          <span>
            Logged in as 
            <Link to="/profile">
              {sessionUser.username}
            </Link> 
            <div onClick={handleLogout}>
              Logout
            </div> 
          </span>}
      <div id="start-tour-button" onClick={() => setIsOpen(true)}>
        Open Tour
      </div>
      </div>  
    </>
  );
}

export default NavBar;