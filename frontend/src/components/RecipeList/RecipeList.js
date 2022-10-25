import RecipeListItem from '../RecipeListItem/RecipeListItem';
import './RecipeList.css';


function RecipeList({recipes}) {
    const recipeList = recipes.map((recipe) => <RecipeListItem recipe={recipe} />)

    return (
        <div className='recipe-list'>
            {recipeList}
        </div>
    )

}

export default RecipeList