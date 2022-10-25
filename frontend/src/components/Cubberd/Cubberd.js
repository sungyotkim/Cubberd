import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  composeUserCubberdIngredient,
  deleteUserCubberdIngredient,
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
  const [selectedLi, setSelectedLi] = useState(0);
  const [resultAdded, setResultAdded] = useState(false);
  const [openDoor, setOpenDoor] = useState(false);
  const ref = useRef();

  const handleDoorClick = () => {
    if (openDoor) {
      setOpenDoor(false);
    }
  };

  const handleDoorKnobClick = () => {
    if (openDoor) {
      setOpenDoor(false);
    } else {
      setOpenDoor(true);
    }
  };

  useEffect(() => {
    dispatch(fetchIngredients());

    let doorTimeOut = setTimeout(() => {
      if (openDoor === false) {
        setOpenDoor(true);
      } else if (openDoor === true) {
        clearTimeout(doorTimeOut);
      }
    }, 2000);

    return () => {
      clearTimeout(doorTimeOut);
    };
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

  useEffect(() => {
    setSelectedLi(0);

    return () => {
      setSelectedLi(0);
    };
  }, [searchResults]);

  const searchItem = (query) => {
    setSearchResult();
    if (!query) {
      setSearchResults([]);
      setSearchQuery("");
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

    let existingArr = userCubberd.filter((ele) => ele._id === result._id);
    if (existingArr.length === 0) {
      setResultAdded(false);
    } else {
      setResultAdded(true);
    }
  };

  const addToUserCubberd = () => {
    dispatch(composeUserCubberdIngredient(currentUser._id, searchResult));
    setSearchResult();
  };

  const removeFromUserCubberd = (e, ingredient) => {
    e.preventDefault();
    dispatch(deleteUserCubberdIngredient(currentUser._id, ingredient));
  };

  const handleKeyDown = (e) => {
    let last = searchResults.length - 1;
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (selectedLi === 0) {
        setSelectedLi(last);
      } else {
        setSelectedLi(selectedLi - 1);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (selectedLi === last) {
        setSelectedLi(0);
      } else {
        setSelectedLi(selectedLi + 1);
      }
    } else if (e.key === "Enter") {
      handleResultFoodClick(e, searchResults[selectedLi]);
    }
    let selectedEle = document.getElementsByClassName("selected")[0];
    selectedEle.scrollIntoView({
      block: "nearest",
      inline: "start",
    });
  };

  return (
    <>
      <div className="outer-container">
        <div
          className="cubberd-container"
          style={{ backgroundImage: `url(${woodBackground})` }}
        >
          <div
            className={
              openDoor ? "cubberd-door cubberd-door-open" : "cubberd-door"
            }
            onClick={handleDoorClick}
          >
            <div className="cubberd-door-pattern">
              <div className="cubberd-inner-door-pattern"></div>
            </div>
            <div
              className="cubberd-door-knob"
              onClick={handleDoorKnobClick}
            ></div>
          </div>
          <div className="cubberd-content-container">
            <div className="cubberd-search-container">
              <div className="cubberd-search-bar-container">
                <input
                  type="text"
                  className="cubberd-search-bar"
                  placeholder="Search for ingredients..."
                  onChange={(e) => searchItem(e.target.value)}
                  value={searchQuery}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
                <div className="cubberd-search-btn">
                  <BiSearchAlt />
                </div>
              </div>
              {searchResults && searchResults.length > 0 && (
                <ul className="search-results">
                  {searchResults.map((result, i) => {
                    return (
                      <li
                        onClick={(e) => handleResultFoodClick(e, result)}
                        ref={i === selectedLi ? ref : null}
                        className={i === selectedLi ? "selected" : ""}
                      >
                        {result.food}
                      </li>
                    );
                  })}
                </ul>
              )}
              {searchResult && (
                <div className="search-result-container">
                  <>
                    <img src={searchResult.image} alt={searchResult.food} />
                    <div className="search-result-options">
                      <CustomToolTip title="Add to pot?" arrow placement="top">
                        <div className="add-to-pot-btn">
                          <GiCookingPot />
                        </div>
                      </CustomToolTip>
                      {!resultAdded && (
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
                      )}
                    </div>
                  </>
                </div>
              )}
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
                              <div
                                className="cubberd-shelving-option-two"
                                onClick={(e) => removeFromUserCubberd(e, ing)}
                              >
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
