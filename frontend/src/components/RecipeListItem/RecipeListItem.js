import './RecipeListItem.css';
import RecipeShowModal from '../RecipeShowModal/RecipeShowModal';

function RecipeListItem({recipe}) {
    debugger
    return (

    <div className='recipe-list-item'><RecipeShowModal recipe={recipe} /></div>
    )
}

export default RecipeListItem