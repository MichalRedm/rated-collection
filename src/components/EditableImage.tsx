import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";

interface EditableImageProps {
  editable: boolean;
  src: string;
  onChange: (newSrc: string) => void;
}

function EditableImage({ editable, src, onChange }: EditableImageProps) {
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageModalUrl, setImageModalUrl] = useState("");
  
  const handleImageClick = () => {
    if (editable) {
      setImageModalOpen(true);
    }
  };

  const handleImageChange = () => {
    setImageModalOpen(false);
    onChange(imageModalUrl);
  };

  return (
    <>
      <div onClick={handleImageClick}>
        {src !== ""
          ? (
            <img
              src={src}
              alt="Image"
              className="list__item__img"
            />
          )
          : (
            <div className="list__item__img">
              <FontAwesomeIcon icon={faImage} />
            </div>
          )
        }
      </div>
      <Modal open={imageModalOpen} onClose={() => setImageModalOpen(false)}>
        <h1>Choose an image</h1>
        <input
          type="text"
          className="input"
          placeholder="URL"
          value={imageModalUrl}
          onChange={e => setImageModalUrl(e.target.value)}
        />
        <button className="btn" onClick={handleImageChange}>OK</button>
      </Modal>
    </>
  );
}

export default EditableImage;
