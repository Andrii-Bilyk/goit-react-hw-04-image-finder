import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ImageGallery = ({ children }) => {
  return <StyledList>{children}</StyledList>;
};

const StyledList = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

ImageGallery.propTypes = {
  children: PropTypes.node,
};

export default ImageGallery;
