import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, onClickImage}) => { 
    const onClickImageLocal = (evt) =>{
        onClickImage(evt.target.name);
    }
    return (
    <li onClick={onClickImageLocal} className={css.imageGalleryItem}>          
        <img  className={css.imageGalleryItemImage} name={largeImageURL} src={webformatURL} alt=""/>        
    </li> 
)};

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
    onClickImage: PropTypes.func,
};