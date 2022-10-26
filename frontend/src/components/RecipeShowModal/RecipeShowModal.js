import { Modal } from '../../context/Modal';
import React, { useState } from 'react';
import RecipeShow from '../RecipeShow/RecipeShow';
import './RecipeShowModal.css';
import { BsCalendarPlus } from "react-icons/bs"
import { TbTrash } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai"


function RecipeShowModal({ recipe, recipeContext }) {
    const [showModal, setShowModal] = useState(false);
    if (recipe) {

        let menuItems;
        if (recipeContext === 'favorited') {
            menuItems = 
                <div className='menu-items favorited'>
                    <BsCalendarPlus />
                    <TbTrash />
                </div>
            } else if (recipeContext === 'planned') {
                menuItems = <div className='menu-items planned'>
                    <AiOutlineHeart />
                    <TbTrash />

                </div>
            }
         

        return (
            <>
                <div className="recipe-list-item" onClick={() => setShowModal(true)}>
                    <h4>{recipe.label}</h4>
                    {menuItems}

                </div>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <RecipeShow recipe={recipe} />
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
