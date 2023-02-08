import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, onClickImage}) => { 
    const onClickImageLocal = (evt) =>{
        onClickImage(evt);
    }
    return (
    <li onClick={onClickImageLocal} className={css.imageGalleryItem}>          
        <img  className={css.imageGalleryItemImage} name={largeImageURL} src={webformatURL} alt=""/>        
    </li> 
)};