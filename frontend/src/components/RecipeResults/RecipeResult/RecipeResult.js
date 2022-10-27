import "./RecipeResult.css"
import RecipeShowModal from "../../RecipeShowModal/RecipeShowModal";

const RecipeResult = ({ recipe }) => {
  return ( 
    <>
      <div className="recipe-card">
        <RecipeShowModal recipe={recipe} recipeContext="searchResult" scores={recipe} />
      </div>
    </>
  );
}

export default RecipeResult;