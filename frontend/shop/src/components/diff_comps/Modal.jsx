import { useState, useEffect } from "react";
import "../../styles/components/Modal.css";

const Modal = ({ open, onClose, children }) => {

    useEffect(() => {
        if (!open) return;
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [open, onClose]);

    const handleClickOutside = (e) => {
        if (e.target.classList.contains("modal")) {
            onClose();
        }
    };

    if (!open) return null;

    return (
        <div className="modal" onClick={handleClickOutside}>
            <div className="modal-content">
                {children}
            </div>
        </div>
    );
};

const Header = ({ children, close }) => (
    <div className="modal-header">
        {children}
        <button className="close-btn" onClick={close}>&times;</button>
    </div>
);

const Body = ({ children }) => (
    <div className="modal-body">
        {children}
    </div>
);

const Footer = ({ children }) => (
    <div className="modal-footer">
        {children}
    </div>
);

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
