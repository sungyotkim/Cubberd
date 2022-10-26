import "./RecipeResult.css"

const RecipeResult = ({ recipe }) => {
  return ( 
    <>
      <div className="recipe-card">
        {recipe.recipe.label}
      </div>
    </>
  );
}

export default RecipeResult;