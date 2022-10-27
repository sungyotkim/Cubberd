import { Modal } from '../../context/Modal';
import React, { useState } from 'react';
import RecipeShow from '../RecipeShow/RecipeShow';
import './RecipeShowModal.css';
import { BsCalendarPlus } from 'react-icons/bs';
import { TbTrash } from 'react-icons/tb';
import { AiOutlineHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipeToFavorited, addRecipeToPlanned, deleteRecipeFromFavorited, deleteRecipeFromPlanned } from '../../store/session';

function RecipeShowModal({ recipe, recipeContext }) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const currentUser = useSelector(state => state.session.user ? state.session.user : {})
    const currentUserId = currentUser._id;

    let favoritedRecipes;
    let plannedRecipes;
    let recipeAlreadyFavorited = false;
    let recipeAlreadyPlanned = false;
    if (currentUserId) {
        favoritedRecipes = currentUser.savedRecipes.favorited;
        plannedRecipes = currentUser.savedRecipes.planned;
        recipeAlreadyFavorited = favoritedRecipes.some(rec => rec.url === recipe.url);
        recipeAlreadyPlanned = plannedRecipes.some(rec => rec.url === recipe.url);
    }

    const handleClick = (e, action) => {
        e.stopPropagation();
        switch (action) {
            case "plan":
                dispatch(addRecipeToPlanned(currentUserId, recipe));
                break;
            case "unfavorite":
                dispatch(deleteRecipeFromFavorited(currentUserId, recipe));
                break;
            case "favorite":
                dispatch(addRecipeToFavorited(currentUserId, recipe));
                break;
            case "unplan":
                dispatch(deleteRecipeFromPlanned(currentUserId, recipe));
                break;
        }
    }

    if (recipe) {
        let title;
        let menuItems;
        if (recipeContext === 'favorited') {
            title = <h4>{recipe.label}</h4>
            menuItems = 
                <div className='menu-items favorited'>
                    <BsCalendarPlus className={recipeAlreadyPlanned ? "recipe-menu-button active" : "recipe-menu-button"} onClick={e => handleClick(e, "plan")} />
                    <TbTrash className="recipe-menu-button" onClick={e => handleClick(e, "unfavorite")} />
                </div>
            } else if (recipeContext === 'planned') {
                title = <h4>{recipe.label}</h4>
                menuItems = <div className='menu-items planned'>
                    <AiOutlineHeart className={recipeAlreadyFavorited ? "recipe-menu-button active" : "recipe-menu-button"} onClick={e => handleClick(e, "favorite")} />
                    <TbTrash className="recipe-menu-button" onClick={e => handleClick(e, "unplan")} />
                </div>
            } else if (recipeContext === 'searchResult') {
                title = <h4>{recipe.recipe.label}</h4>
                menuItems = <div className='menu-items-search-result'>
                    <div className='recipe-score'>
                         Ingredient score:
                        <span>{recipe.ingredientsScore}%</span>
                    </div>
                    <div className='recipe-score'>
                        Shopping score: <span>{recipe.shoppingScore}%</span>
                    </div>

                </div>
            }
        return (
            <>
                <div className={recipeContext === 'searchResult' ? '' :"recipe-list-item"} onClick={() => setShowModal(true)}>
                    {title}
                    {menuItems}
                </div>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <RecipeShow recipe={recipeContext === 'searchResult' ? recipe.recipe : recipe} />
                    </Modal>
                )}
            </>
        )
    }

    return (
        <></>
    )
}


export default RecipeShowModal;
