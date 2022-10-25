import RecipeShowModal from '../RecipeShowModal/RecipeShowModal';
import './RecipeList.css';


function RecipeList({ recipes }) {

    if (recipes) {

        const recipeList = recipes.map((recipe) => <RecipeShowModal recipe={recipe} />)


        return (
            <div className='recipe-list'>
                {recipeList}
            </div>
        )

    } else {
        return (
            <></>
        )
    }

}

export default RecipeList