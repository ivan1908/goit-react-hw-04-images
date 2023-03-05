import PropTypes from 'prop-types';

import style from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, onImageClick }) => (
      <li className={style.imageGalleryItem}>
        <img
          src={webformatURL}
          alt=""
          className={style.imageGalleryItemImage}
          onClick={() => onImageClick(largeImageURL)}
        />
      </li>
    );

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  onImageClick: PropTypes.func,
};