import React, { useState, useEffect } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import fetchImages from './api';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [visibleImagesCount, setVisibleImagesCount] = useState(12);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (query === '' || !hasMore) return;

    setIsLoading(true);

    fetchImages(query, page)
      .then((data) => {
        if (data.length > 0) {
          setImages((prevImages) => [...prevImages, ...data]);
          setPage((prevPage) => prevPage + 1);
        } else {
          setHasMore(false);
        }
      })
      .catch((error) => {
        console.error('Помилка отримання зображень:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page, hasMore]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setVisibleImagesCount(12);
    setHasMore(true);
    setShowModal(false);
    setModalImage('');
  };

  const loadMoreImages = () => {
    setVisibleImagesCount((prevCount) => prevCount + 12);
  };

  const handleOpenModal = (image) => {
    setShowModal(true);
    setModalImage(image.largeImageURL);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImage('');
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery>
        {images.slice(0, visibleImagesCount).map((image) => (
          <ImageGalleryItem
            key={image.id}
            src={image.webformatURL}
            alt={image.tags}
            onClick={() => handleOpenModal(image)}
          />
        ))}
      </ImageGallery>
      {hasMore && visibleImagesCount < images.length && (
        <Button
          onClick={loadMoreImages}
          isVisible={!isLoading}
        />
      )}
      {isLoading && <Loader />}
      {showModal && <Modal src={modalImage} alt="Modal" onClose={handleCloseModal} />}
    </div>
  );
}

export default App;
