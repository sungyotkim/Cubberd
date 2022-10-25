// import { fetchRecipes } from "../../store/recipes";
// import { useSelector } from "react-redux";
import './RecipeShow.css';
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

function RecipeShow({recipe}) {
    // const dispatch = useDispatch();
    // const recipes = useSelector(state => state.recipes)
    // debugger

    // useEffect(() => {
    //     dispatch(fetchRecipes())
    // }, [])

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