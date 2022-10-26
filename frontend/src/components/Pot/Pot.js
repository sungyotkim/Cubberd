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
      </div>
    </>
  );
};

export default Pot;
