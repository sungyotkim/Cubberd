import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './RecipeShow.css';

function RecipeShow({recipe}) {

    const currentUser = useSelector((state) => state.session.user);

    const ingredients = recipe.ingredients.map(
        (ingredient) => <div className='ingredient-list-item'>
            - {ingredient.text}
            </div>
    )

    let addToFavorite = <></>
    let addToPlanned = <></>
    if (!currentUser.savedRecipes.favorited.includes(recipe)) {
        addToFavorite = "favorite"
    } 

    if(!currentUser.savedRecipes.planned.includes(recipe)) {
        addToPlanned = "plan"
    }

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
            </div>
            <div id="recipe-show-links">
                <span><Link to={`/recipes/${recipe._id}`}>Printable page</Link></span>
                <span>{addToFavorite}</span>
                <span>{addToPlanned}</span>
                <span><a href={recipe.url}>Source</a></span>
            </div>

        </div>
    )

}

export default RecipeShow;