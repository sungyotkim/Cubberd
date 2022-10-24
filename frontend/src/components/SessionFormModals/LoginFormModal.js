import { Modal } from '../../context/Modal';
import React, { useState } from 'react';
import LoginForm from '../SessionForms/LoginForm';


function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <button onClick={setShowModal(true)}>Login</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <LoginForm />
            </Modal>
        )}
        </>
    )
}

export default LoginFormModal;