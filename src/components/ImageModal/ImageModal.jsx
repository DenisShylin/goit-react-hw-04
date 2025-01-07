import Modal from "react-modal";
import styles from "./ImageModal.module.css";

const ImageModal = ({ isOpen, onClose, image }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.content}>
        <img
          src={image.urls.regular}
          alt={image.alt_description || "Unsplash image"}
          className={styles.image}
        />
        <div className={styles.info}>
          <h2>Author: {image.user.name}</h2>
          <p>Likes: {image.likes}</p>
          {image.description && <p>Description: {image.description}</p>}
        </div>
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ImageModal;
