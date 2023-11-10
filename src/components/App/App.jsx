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

  useEffect(() => {
    if (query === '') return;

    setIsLoading(true);

    fetchImages(query, page)
      .then((data) => {
        setImages((prevImages) => [...prevImages, ...data]);
        setPage((prevPage) => prevPage + 1);
      })
      .catch((error) => console.error('Error fetching images:', error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
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
      {visibleImagesCount < images.length && (
        <Button
          onClick={() => setVisibleImagesCount((prevCount) => prevCount + 12)}
          isVisible={!isLoading}
        />
      )}
      {isLoading && <Loader />}
      {showModal && <Modal src={modalImage} alt="Modal" onClose={handleCloseModal} />}
    </div>
  );
}

export default App;
