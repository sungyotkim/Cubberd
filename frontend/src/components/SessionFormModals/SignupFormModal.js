import { Modal } from '../../context/Modal';
import React, { useState } from 'react';
import SignupForm from '../SessionForms/SignupForm';

function SignupFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <button onClick={() => setShowModal(true)}>Sign Up</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <SignupForm />
            </Modal>
        )}
        </>
    )
}

export default SignupFormModal;