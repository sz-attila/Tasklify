import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>BIZTOS SZERETNÉD TÖRÖLNI A FELADATOT?</h2>
        <p>
          Törlés után már nem fogod visszaállítani, és kezelni az alábbi
          teendőt.
        </p>
        <div className="modal-buttons">
          <div>
            <button onClick={onClose} className="button-undo">
              MÉGSEM
            </button>
            <button onClick={onConfirm} className="delete-button">
              TÖRLÉS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
