import { Modal } from '../../context/Modal';
import React, { useState } from 'react';
import RecipeShow from '../RecipeShow/RecipeShow';


function RecipeShowModal({ recipe }) {
    const [showModal, setShowModal] = useState(false);
    if (recipe) {

        return (
            <>
                <div className="recipe-list-item" onClick={() => setShowModal(true)}>{recipe.label}</div>
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
