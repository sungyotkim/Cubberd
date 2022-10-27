import "./NavBar.css"
import { Link } from "react-router-dom";
import { useTour } from '@reactour/tour'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import panOne from "../../assets/pan.png"
import panTwo from "../../assets/pan2.png"
import ladle from "../../assets/ladle.png"
import spatula from "../../assets/spatula.PNG"
import hook from "../../assets/hook.png"
import { useContext } from "react";
import { PotContext } from "../../context/PotContext";

const NavBar = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const { setIsOpen } = useTour();
  const { animateRack } = useContext(PotContext);
  
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
          <div 
            className={ animateRack ? "hook pan-one-animate" : "hook"} 
            id="pan-one-hook"
          >
            <img src={hook}/>
            <div id="pan-one">
              <img src={panOne}/>
            </div>
          </div>
          <div 
            className={ animateRack ? "hook pan-two-animate" : "hook"} 
            id="pan-two-hook"
          >
            <img src={hook}/>
            <div id="pan-two">
              <img src={panTwo}/>
            </div>
          </div>
          <div 
            className={ animateRack ? "hook ladle-hook-animate" : "hook"} 
            id="ladle-hook"
          >
            <img src={hook}/>
            <div id="ladle">
              <img src={ladle}/>
            </div>
          </div>
          <div 
            className={ animateRack ? "hook spatula-hook-animate" : "hook"} 
            id="spatula-hook"
          >
            <img src={hook}/>
            <div id="spatula">
              <img src={spatula}/>
            </div>
          </div>
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