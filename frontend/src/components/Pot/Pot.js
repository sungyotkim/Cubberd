import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PotContext } from "../../context/PotContext";
import { fetchRecipesFromPot, removeRecipeResults } from "../../store/recipeResults";
import RecipeResults from "../RecipeResults/RecipeResults";
import CookingPot from "./CookingPot/CookingPot";
import "./Pot.css";
import { CustomToolTipBottom } from "../ToolTip/ToolTip";

const Pot = () => {
  const { potContents } = useContext(PotContext);
  const userCubberd = useSelector((state) => state.session.user.cubberd);
  const dispatch = useDispatch();
  const recipeResultsTotalArr =  useSelector((state) => state.recipeResults);
  const [displayByShoppingScore, setDisplayByShoppingScore] = useState(false);
  const [recipesObtained, setRecipesObtained] = useState(false)
  const [rotate, setRotate] = useState(false)
  const [flameOne, setFlameOne] = useState(false)
  const [flameTwo, setFlameTwo] = useState(false)
  const [flameThree, setFlameThree] = useState(false)
  const [flameFour, setFlameFour] = useState(false)
  const [flameFive, setFlameFive] = useState(false)
  const [blueflameOne, setBlueFlameOne] = useState(false)
  const [blueflameTwo, setBlueFlameTwo] = useState(false)
  const [blueflameThree, setBlueFlameThree] = useState(false)
  const [blueflameFour, setBlueFlameFour] = useState(false)
  const [blueflameFive, setBlueFlameFive] = useState(false)
  const [loadingResult, setLoadingResult] = useState(true)
  const [recipeResults, setRecipeResults] = useState([[], []])
  const { setOpenDoor, setAnimateRack } = useContext(PotContext);

  const searchForRecipes = () => {
    const cubberd = [];
    const pot = [];

    userCubberd.forEach(ing => cubberd.push(ing.food))
    potContents.forEach(ing => pot.push(ing.food))
    dispatch(fetchRecipesFromPot(cubberd, pot))
  }

  useEffect(() => {
    if (recipeResultsTotalArr.length > 0 ) {
      if (recipeResultsTotalArr[0].length > 0 && recipeResultsTotalArr[1].length > 0) {
        setRecipesObtained(true)
        setRecipeResults([...recipeResultsTotalArr])
      }
    } else {
      setRecipeResults([[], []])
    }
  
    return () => {
      setRecipeResults([[], []])
    }
  }, [recipeResultsTotalArr])
  
  useEffect(() => {
    if (recipeResults && recipeResults.length > 0) {
      if (recipeResults[0].length > 0 && recipeResults[1].length > 0) {
        setAnimateRack(true)
      } else {
        setAnimateRack(false)
      }
    } else {
      setAnimateRack(false)
    }
  
    return () => {
      setAnimateRack(false)
    }
  }, [recipeResults])
  

  const toggleRecipeScore = (e) => {
    e.preventDefault();
    if (displayByShoppingScore) {
      setDisplayByShoppingScore(false)
    } else {
      setDisplayByShoppingScore(true)
    }
  }
  
  useEffect(() => {
    if (rotate) {
      let flameOneTimeout = setTimeout(() => {
        setFlameOne(true);
        if (!rotate) {
          clearTimeout(flameOneTimeout);
        }
      }, 100);
  
      let flameTwoTimeout = setTimeout(() => {
        setFlameTwo(true);
        if (!rotate) {
          clearTimeout(flameTwoTimeout);
        }
      }, 200);
  
      let flameThreeTimeout = setTimeout(() => {
        setFlameThree(true);
        setBlueFlameOne(true);
        if (!rotate) {
          clearTimeout(flameThreeTimeout);
        }
      }, 300);
  
      let flameFourTimeout = setTimeout(() => {
        setFlameFour(true);
        setBlueFlameTwo(true);
        if (!rotate) {
          clearTimeout(flameFourTimeout);
        }
      }, 400);
  
      let flameFiveTimeout = setTimeout(() => {
        setFlameFive(true);
        setBlueFlameThree(true)
        if (!rotate) {
          clearTimeout(flameFiveTimeout);
        }
      }, 500);

      let blueFlameLastTimeout = setTimeout(() => {
        setBlueFlameFour(true)
        setBlueFlameFive(true)
        if (!rotate) {
          clearTimeout(blueFlameLastTimeout);
        }
      }, 500);

      let knobTimeout = setTimeout(() => {
        setRotate(false);
        setLoadingResult(true);
        setOpenDoor(true)
        if (!rotate) {
          clearTimeout(knobTimeout)
        }
      }, 3000);
    } else {
      setFlameOne(false)
      setFlameTwo(false)
      setFlameThree(false)
      setFlameFour(false)
      setFlameFive(false)
      setBlueFlameOne(false)
      setBlueFlameTwo(false)
      setBlueFlameThree(false)
      setBlueFlameFour(false)
      setBlueFlameFive(false)
    }
  
  }, [rotate])
  

  const handleClick = (e) => {
    e.preventDefault();
    setRecipeResults([[], []])

    if (!rotate) {
      setRotate(true)
      setLoadingResult(true)
      setOpenDoor(false)
      
      let loadingResultTimeout = setTimeout(() => {
        setLoadingResult(false);
        searchForRecipes();
        if (rotate) {
          clearTimeout(loadingResultTimeout)
        }
      }, 1000);
    } 
  }

  const clearRecipes = (e) => {
    e.preventDefault();

    dispatch(removeRecipeResults());
  }

  return (
    <>
      <div className="pot-component-wrapper">
        {recipesObtained && 
          <div className="pot-recipe-results-wrapper">
            <RecipeResults displayByShoppingScore={displayByShoppingScore} recipeResultsTotalArr={recipeResults} />
          </div>
        }
        <div className="pot-container-clickable">
          <CookingPot loadingResult={loadingResult} />
        </div>
        <div className="stove-container">
          <div className="stove-top">
            <div className="left-burner-platform"></div>
            <div className="center-burner-platform"></div>
            <div className="right-burner-platform"></div>
            <div className="burner-center">
              {flameOne && !blueflameOne && 
                <div className="flame" id="flame-one"></div>
              }
              {flameTwo && !blueflameTwo && 
                <div className="flame" id="flame-two"></div>
              }
              {flameThree && !blueflameThree && 
                <div className="flame" id="flame-three"></div>
              }
              {flameFour && !blueflameFour && 
                <div className="flame" id="flame-four"></div>
              }
              {flameFive && !blueflameFive && 
                <div className="flame" id="flame-five"></div>
              }

              {flameOne && blueflameOne && 
                <div className="flame blue-flame" id="flame-one"></div>
              }
              {flameTwo && blueflameTwo && 
                <div className="flame blue-flame" id="flame-two"></div>
              }
              {flameThree && blueflameThree && 
                <div className="flame blue-flame" id="flame-three"></div>
              }
              {flameFour && blueflameFour && 
                <div className="flame blue-flame" id="flame-four"></div>
              }
              {flameFive && blueflameFive && 
                <div className="flame blue-flame" id="flame-five"></div>
              }
            </div>
          </div>
          <div className="stove-button-container">
            <div 
              className="stove-name-container" 
              onClick={clearRecipes}
            >
              Recipe Clear
            </div>
            <CustomToolTipBottom
              title="Toggle Recipe Score"
              arrow
              placement="bottom"
            >
              <div 
                onClick={toggleRecipeScore}
                // className="toggled"
                className="toggle-btn"
              >
              </div>
            </CustomToolTipBottom>
            <div className="stove-display">
              {!rotate && "Turn on the stove to search for recipes!"}
              {rotate && loadingResult && "Searching..."}
              {rotate && !loadingResult && "Done!"}
            </div>

            <div 
              className="stove-on-btn"
              id={rotate ? "stove-is-on" : ""}
            ></div>
            <div 
              className={rotate ? "stove-knob-container rotate" : "stove-knob-container"}
              onClick={handleClick}
            >
              <div className="knob-on">ON</div>
              <div className="knob-off">OFF</div>
              <div className="stove-knob"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pot;
