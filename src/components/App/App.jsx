import React, { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import fetchImages from './api';
import PropTypes from 'prop-types';
// import './styles.css';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    modalImage: '',
  };

  fetchImages = () => {
    const { query, page } = this.state;

    this.setState({ isLoading: true });

    fetchImages(query, page)
      .then((data) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...data],
          page: prevState.page + 1,
        }));
      })
      .catch((error) => console.error('Error fetching images:', error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
};

  handleSearch = (query) => {
    this.setState({ query, images: [], page: 1 }, this.fetchImages);
  };

  handleLoadMore = () => {
    this.fetchImages();
  };

  handleOpenModal = (image) => {
    this.setState({ showModal: true, modalImage: image.largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, modalImage: '' });
  };

  render() {
    const { images, isLoading, showModal, modalImage } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery>
          {images.map((image) => (
            <ImageGalleryItem
              key={image.id}
              src={image.webformatURL}
              alt={image.tags}
              onClick={() => this.handleOpenModal(image)}
            />
          ))}
        </ImageGallery>
        <Button onClick={this.handleLoadMore} isVisible={!isLoading && images.length > 0} />
        {isLoading && <Loader />}
        {showModal && <Modal src={modalImage} alt="Modal" onClose={this.handleCloseModal} />}
      </div>
    );
  }
}

App.propTypes = {
  images: PropTypes.array,
  query: PropTypes.string,
  page: PropTypes.number,
  isLoading: PropTypes.bool,
  showModal: PropTypes.bool,
  modalImage: PropTypes.string,
};

export default App;
