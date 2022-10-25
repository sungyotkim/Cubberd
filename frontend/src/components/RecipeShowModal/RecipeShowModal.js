import { Modal } from '../../context/Modal';
import React, { useState } from 'react';
import RecipeShow from '../RecipeShow/RecipeShow';


function RecipeShowModal({recipe}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <button onClick={() => setShowModal(true)}>Show Recipe Modal</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <RecipeShow recipe={recipe}/>
            </Modal>
        )}
        </>
    )
}


export default RecipeShowModal;