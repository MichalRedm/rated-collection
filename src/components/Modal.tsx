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
            <button onClick={onClose}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            {children}
          </div>
        </div>
      }
    </>
  );
}

export default Modal;
