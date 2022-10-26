import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PotContext } from "../../context/PotContext";
import { fetchRecipesFromPot } from "../../store/recipeResults";
import RecipeResults from "../RecipeResults/RecipeResults";
import CookingPot from "./CookingPot/CookingPot";
import "./Pot.css";

const Pot = () => {
  const { potContents } = useContext(PotContext);
  const userCubberd = useSelector((state) => state.session.user.cubberd);
  const dispatch = useDispatch();
  const recipeResultsTotalArr =  useSelector((state) => state.recipeResults);
  const [displayByShoppingScore, setDisplayByShoppingScore] = useState(false);
  const [recipesObtained, setRecipesObtained] = useState(false)
  const [rotate, setRotate] = useState(false)

  const searchForRecipes = (e) => {
    e.preventDefault();
    const cubberd = [];
    const pot = [];

    userCubberd.forEach(ing => cubberd.push(ing.food))
    potContents.forEach(ing => pot.push(ing.food))
    dispatch(fetchRecipesFromPot(cubberd, pot))
  }

  const toggleRecipeScore = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    if (recipeResultsTotalArr.length > 0) {
      if (recipeResultsTotalArr[0].length > 0 && recipeResultsTotalArr[1].length > 0) {
        setRecipesObtained(true)
      }
    }
  }, [recipeResultsTotalArr])
  
  const handleKnobClick = (e) => {
    e.preventDefault();

    if (!rotate) {
      setRotate(true)
    } else {
      setRotate(false)
    }
  }

  return (
    <>
      <div className="pot-component-wrapper">
        {recipesObtained && 
          <div className="pot-recipe-results-wrapper">
            <RecipeResults displayByShoppingScore={displayByShoppingScore} recipeResultsTotalArr={recipeResultsTotalArr} />
          </div>
        }
        <div className="pot-container">
          <CookingPot />
        </div>
        <div onClick={searchForRecipes}>Adina press here</div>
        <div onClick={toggleRecipeScore}>Toggle Recipe Score</div>
        <div className="stove-container">
          <div className="stove-top">
            <div className="left-burner-platform"></div>
            <div className="center-burner-platform"></div>
            <div className="right-burner-platform"></div>
            <div className="burner-center"></div>
          </div>
          <div className="stove-button-container">
            <div className="stove-name-container">
              Recipe Cooker
            </div>
            <div className="stove-display">
              {rotate && "Cooking..."}
              {!rotate && "Turn on the stove to cook up your recipes!"}
            </div>

            <div 
              className="stove-on-btn"
              id={rotate ? "stove-is-on" : ""}
            ></div>
            <div 
              className={rotate ? "stove-knob-container rotate" : "stove-knob-container"}
              onClick={handleKnobClick}
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
