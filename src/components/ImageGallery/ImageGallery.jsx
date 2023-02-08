import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({images, onClickImage}) => { 
      return (
      <ul className={css.gallery}>
        {images.map((image) => {
          //console.log(image);
          return (
            <ImageGalleryItem key={image.id} webformatURL={image.webformatURL} largeImageURL={image.largeImageURL} onClickImage={onClickImage}/>            
          )})}
      </ul>
)};

ImageGallery.propTypes = {
  onClickImage: PropTypes.func,
  images: PropTypes.array,
};
