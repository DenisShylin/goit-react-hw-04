import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";
import { fetchImages } from "../../services/api";
import styles from "./App.module.css";

Modal.setAppElement("#root");

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchImages(query, page);
        setImages((prevImages) =>
          page === 1 ? data.results : [...prevImages, ...data.results]
        );
        setTotalPages(Math.ceil(data.total / 12));
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const handleSubmit = (newQuery) => {
    if (newQuery.trim() === "") {
      toast.error("Please enter a search query");
      return;
    }

    if (newQuery === query) {
      toast.error("Please enter a new search query");
      return;
    }

    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSubmit} />
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && page < totalPages && !isLoading && (
        <LoadMoreBtn onClick={loadMore} />
      )}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={closeModal}
          image={selectedImage}
        />
      )}
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
