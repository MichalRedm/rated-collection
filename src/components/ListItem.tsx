import "./ListItem.scss";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import ListItemData from "../types/ListItemData";
import DynamicTextarea from "./DynamicTextarea";
import StarRating from "./StarRating";
import NumberInput from "./NumberInput";
import EditableImage from "./EditableImage";
import Modal from "./Modal";

interface ListItemProps {
  listItem: ListItemData;
  setListItem: (value: ListItemData) => void;
  onDelete: () => void;
}

function ListItem({ listItem, setListItem, onDelete }: ListItemProps) {
  const [editable, setEditable] = useState(listItem.name === "");
  const [editState, setEditState] = useState<ListItemData>({ ...listItem });
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [shouldScrollTo, setShouldScrollTo] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (listItem.new) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (shouldScrollTo) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
      setShouldScrollTo(false);
    }
  }, [shouldScrollTo]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = e =>
    setEditState(prev => ({ ...(prev as ListItemData), [e.target.name]: e.target.value }));

  const handleStartEditing = () => {
    setEditable(true);
    setEditState({ ...listItem })
  }

  const handleSubmitChanges = () => {
    setShouldScrollTo(true);
    setEditable(false);
    setListItem({ ...editState, new: undefined });
  };

  const handleCancelChanges = () => {
    if (listItem.new) {
      onDelete();
    } else {
      setEditable(false);
      setEditState({ ...listItem });
    }
  };

  const handleImageChange = (newSrc: string) =>
    setEditState(prev => ({ ...prev, imgSrc: newSrc }));

  return (
    <div className="list__item">
      <div className="list__item__scroll-to" ref={ref}></div>
      <div className="list__item__row">
        <div className="list__item__left">
          <EditableImage
            src={editState.imgSrc}
            onChange={handleImageChange}
            editable={editable}
          />
          <div className="list__item__rating">
            <StarRating rating={editState.rating} />
            {editable &&
              <NumberInput
                className="input"
                min={0}
                max={5}
                step={0.5}
                name="rating"
                value={editState.rating}
                onChange={handleInputChange}
              />
            }
          </div>
        </div>
        <div className="list__item__right">
          <h1 className="list__item__name">
            {editable
              ? (
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="invisible-input"
                  value={editState.name}
                  onChange={handleInputChange}
                />
              )
              : listItem.name
            }
          </h1>
          <p className="list__item__description">
            {editable
              ? (
                <DynamicTextarea
                  name="description"
                  placeholder="Description"
                  className="list__item__description__textarea"
                  value={editState.description}
                  onChange={handleInputChange}
                />
              )
              : listItem.description
            }
          </p>
        </div>
      </div>
      <div className="list__item__buttons">
          {editable
            ? (
              <>
                <button className="btn-small" onClick={handleSubmitChanges}>
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button className="btn-small" onClick={handleCancelChanges}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </>
            )
            : (
              <>
                <button className="btn-small" onClick={() => setConfirmDeleteModalOpen(true)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button className="btn-small" onClick={handleStartEditing}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </>
            )
          }
        </div>
        <Modal open={confirmDeleteModalOpen} onClose={() => setConfirmDeleteModalOpen(false)}>
          <p>Are you sure you want to delete this item?</p>
          <div style={{ display: "flex", gap: "16px" }}>
            <button className="btn" onClick={onDelete}>Yes</button>
            <button className="btn" onClick={() => setConfirmDeleteModalOpen(false)}>No</button>
          </div>
        </Modal>
    </div>
  );
}

export default ListItem;
