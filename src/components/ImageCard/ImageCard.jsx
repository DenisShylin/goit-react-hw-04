import styles from "./ImageCard.module.css";

const ImageCard = ({ image, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img
        src={image.urls.small}
        alt={image.alt_description || "Unsplash image"}
        className={styles.image}
        loading="lazy"
      />
    </div>
  );
};

export default ImageCard;
