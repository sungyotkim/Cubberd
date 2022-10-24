import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-node';
import './Modal.css';



const ModalContext = React.createContext();


function ModalProvider({children}) {
    const modalRed = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current)
    }, [])

    return (
        <>
        <ModalContext.Proivder value={value}>
            {children}
        </ModalContext.Proivder>
        <div ref={modalRef} />
        </>
    )
}

export function Modal({ onClose, children }) {
    const modalNode = useContext(ModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <div id="modal">
            <div id="modal-background" onClick={onClose} />
            <div id="modal-content">
                {children}
            </div>
        </div>,
        modalNode
    )
}