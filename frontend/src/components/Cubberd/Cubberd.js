import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchIngredients,
  fetchUserCubberdIngredients,
} from "../../store/ingredients";
import "./Cubberd.css";
import { BiSearchAlt } from "react-icons/bi";
import woodBackground from "../../assets/retina_wood.png";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const CustomToolTip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#2d2e2f",
    fontSize: 12,
    boxShadow: "rgb(0 0 0 / 15%) 0 0 18px",
    borderRadius: "4px",
    padding: "12px 16px",
    position: "relative",
    top: -8,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#2d2e2f",
  },
}));

const Cubberd = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const userCubberd = useSelector((state) => state.ingredients.userCubberd);
  const allIngredients = useSelector((state) => state.ingredients.all);
  const [searchResults, setSearchResults] = useState([
    "words",
    "more words",
    "lots of words",
    "lots of words",
    "lots of words",
    "lots of words",
    "lots of words",
    "lots of words",
  ]);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  console.log(userCubberd);
  console.log(allIngredients);

  useEffect(() => {
    dispatch(fetchUserCubberdIngredients(currentUser._id));
  }, [currentUser, dispatch]);

  const searchItem = (query) => {
    if (!query) {
      setSearchResults();
    }
  };

  return (
    <>
      <div className="outer-container">
        <div
          className="cubberd-container"
          style={{ backgroundImage: `url(${woodBackground})` }}
        >
          {/* <div className="cubberd-door">
            <div className="cubberd-door-pattern">
              <div className="cubberd-inner-door-pattern"></div>
            </div>
            <div className="cubberd-door-knob"></div>
          </div> */}
          <div className="cubberd-content-container">
            <div className="cubberd-search-container">
              <div className="cubberd-search-bar-container">
                <input
                  type="text"
                  className="cubberd-search-bar"
                  placeholder="Search for ingredients..."
                  onChange={(e) => searchItem(e.target.value)}
                />
                <div className="cubberd-search-btn">
                  <BiSearchAlt />
                </div>
              </div>
              <div className="search-results">
                {searchResults.map((result) => {
                  return <div>{result}</div>;
                })}
              </div>
              <div className="cubberd-shelving"></div>
            </div>
            <div className="cubberd-ingredients-container-wrapper">
              {userCubberd.length > 0 && (
                <>
                  {userCubberd.map((ing) => (
                    <div className="cubberd-ingredients-container">
                      <CustomToolTip title={ing.food} arrow placement="bottom">
                        <img src={ing.image} alt={ing.food} />
                      </CustomToolTip>
                      <div className="cubberd-shelving"></div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cubberd;
