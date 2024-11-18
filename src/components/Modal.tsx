import "./Modal.scss";
import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Modal({ open, onClose, children }: ModalProps) {
  return (
    <>
      {open &&
        <div className="modal-container">
          <div className="modal">
            <div className="modal__close-btn-container">
              <button className="btn-small" onClick={onClose}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            {children}
          </div>
        </div>
      }
    </>
  );
}

export default Modal;
