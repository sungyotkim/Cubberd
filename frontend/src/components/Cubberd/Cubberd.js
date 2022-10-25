import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  composeUserCubberdIngredient,
  fetchIngredients,
  fetchUserCubberdIngredients,
} from "../../store/ingredients";
import "./Cubberd.css";
import { BiSearchAlt, BiSave } from "react-icons/bi";
import { GiCookingPot } from "react-icons/gi";
import { MdOutlineRemoveCircle } from "react-icons/md";
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
  const [searchResults, setSearchResults] = useState([]);
  const [searchResult, setSearchResult] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [cubberdRows, setCubberdRows] = useState([]);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserCubberdIngredients(currentUser._id));
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (userCubberd && userCubberd.length > 0) {
      let cubberdArr = [];
      userCubberd.forEach((item) => cubberdArr.push(item));
      let rowArr = [];

      for (let i = 0; i < cubberdArr.length; i += 2) {
        if (cubberdArr[i + 1]) {
          rowArr.push([cubberdArr[i], cubberdArr[i + 1]]);
        } else {
          rowArr.push([cubberdArr[i]]);
        }
      }

      if (cubberdArr.length < 7) {
        let num = 7 - cubberdArr.length;
        for (let i = 0; i < num; i += 2) {
          rowArr.push([]);
        }
      }

      setCubberdRows(rowArr);
    }
  }, [userCubberd]);

  const searchItem = (query) => {
    setSearchResult();
    if (!query) {
      setSearchResults([]);
      return;
    }
    setSearchQuery(query);
    query = query.toLowerCase();

    const results = [];

    allIngredients.forEach((ing) => {
      if (ing.food.toLowerCase().indexOf(query) !== -1) {
        results.push(ing);
      }
    });

    setSearchResults(results);
  };

  const handleResultFoodClick = (e, result) => {
    e.preventDefault();
    setSearchResults([]);
    setSearchResult(result);
    setSearchQuery("");
  };

  const addToUserCubberd = () => {
    dispatch(composeUserCubberdIngredient(currentUser._id, searchResult));
    dispatch(fetchUserCubberdIngredients(currentUser._id));
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
                  value={searchQuery}
                />
                <div className="cubberd-search-btn">
                  <BiSearchAlt />
                </div>
              </div>
              <div className="search-results">
                {searchResults &&
                  searchResults.map((result) => {
                    return (
                      <div onClick={(e) => handleResultFoodClick(e, result)}>
                        {result.food}
                      </div>
                    );
                  })}
              </div>
              <div className="search-result-container">
                {searchResult && (
                  <>
                    <img src={searchResult.image} alt={searchResult.food} />
                    <div className="search-result-options">
                      <CustomToolTip title="Add to pot?" arrow placement="top">
                        <div className="add-to-pot-btn">
                          <GiCookingPot />
                        </div>
                      </CustomToolTip>
                      <CustomToolTip
                        title="Save to cubberd?"
                        arrow
                        placement="bottom"
                      >
                        <div
                          className="save-to-cubberd-btn"
                          onClick={addToUserCubberd}
                        >
                          <BiSave />
                        </div>
                      </CustomToolTip>
                    </div>
                  </>
                )}
              </div>
              <div className="cubberd-shelving"></div>
            </div>
            <div className="cubberd-ingredients-container-wrapper">
              {userCubberd && userCubberd.length > 0 && (
                <>
                  {cubberdRows.map((row) => (
                    <div className="cubberd-ingredients-container">
                      {row.map((ing) => (
                        <>
                          <CustomToolTip
                            title={ing.food}
                            arrow
                            placement="bottom"
                          >
                            <img src={ing.image} alt={ing.food} />
                          </CustomToolTip>
                          <div className="search-result-options">
                            <CustomToolTip
                              title="Add to pot?"
                              arrow
                              placement="top"
                            >
                              <div className="cubberd-shelving-option-one">
                                <GiCookingPot />
                              </div>
                            </CustomToolTip>
                            <CustomToolTip
                              title="Remove from cubberd?"
                              arrow
                              placement="bottom"
                            >
                              <div className="cubberd-shelving-option-two">
                                <MdOutlineRemoveCircle />
                              </div>
                            </CustomToolTip>
                          </div>
                        </>
                      ))}
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
