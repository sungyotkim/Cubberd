import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PotContext } from "../../context/PotContext";
import { fetchRecipesFromPot } from "../../store/recipes";
import CookingPot from "./CookingPot/CookingPot";
import "./Pot.css";

const Pot = () => {
  const { potContents } = useContext(PotContext);
  const userCubberd = useSelector((state) => state.ingredients.userCubberd);
  const dispatch = useDispatch();

  const searchForRecipes = (e) => {
    e.preventDefault();
    dispatch(fetchRecipesFromPot(userCubberd, potContents))
  }

  const toggleRecipeScore = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <div className="pot-component-wrapper">
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
