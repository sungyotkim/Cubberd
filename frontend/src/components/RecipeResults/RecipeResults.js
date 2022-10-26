import RecipeResult from "./RecipeResult/RecipeResult";
import "./RecipeResults.css"

const RecipeResults = ({ displayByShoppingScore, recipeResultsTotalArr }) => {
  console.log(recipeResultsTotalArr)

  if (!displayByShoppingScore) {
    return ( 
      <>
        <div className="recipe-cards-container">
          {recipeResultsTotalArr[1].map(recipe => {
            return (
              <RecipeResult recipe={recipe} />
            )
          })}
        </div>
      </>
    );
  } else {
    return ( 
      <>
        <div className="recipe-cards-container">
          {recipeResultsTotalArr[0].map(recipe => {
            return (
              <RecipeResult recipe={recipe} />
            )
          })}
        </div>
      </>
    );
  }
}

export default RecipeResults;