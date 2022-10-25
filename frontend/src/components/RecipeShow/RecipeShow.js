import './RecipeShow.css';

function RecipeShow({recipe}) {


    const ingredients = recipe.ingredients.map(
        (ingredient) => <div className='ingredient-list-item'>{ingredient.food}</div>
    )

    return (
        <div id="recipe">
            <div id="recipe-title-container">
                <h3><a href={recipe.url}>{recipe.label}</a></h3>
            </div>
            <div id="recipe-middle-third">
                <div id="recipe-ingredients-list">
                    <h3>Ingredients</h3>
                    {ingredients}
                </div>
                <div id="recipe-image">
                    <img src={recipe.image} />
                </div>
            </div>
            <div id="recipe-scores">
                <div id='recipe-usage-score' className='recipe-score'>use score 75%</div>
                <div id='recipe-no-buy-score' className='recipe-score'>no buy score 60%</div>
            </div>

        </div>
    )

}

export default RecipeShow;