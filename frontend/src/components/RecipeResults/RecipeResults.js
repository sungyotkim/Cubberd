import RecipeResult from "./RecipeResult/RecipeResult";
import "./RecipeResults.css"

const RecipeResults = ({ displayByShoppingScore, recipeResultsTotalArr }) => {
  if (!displayByShoppingScore) {
    return ( 
      <>
        <div className="recipe-cards-container">
          {recipeResultsTotalArr[1].map((recipe, i) => {
            return (
              <RecipeResult recipe={recipe} key={`${recipe._id} ${i} one`} />
            )
          })}
        </div>
      </>
    );
  } else {
    return ( 
      <>
        <div className="recipe-cards-container">
          {recipeResultsTotalArr[0].map((recipe, i) => {
            return (
              <RecipeResult recipe={recipe} key={`${recipe._id} ${i} two`}/>
            )
          })}
        </div>
      </>
    );
  }
}

export default RecipeResults;