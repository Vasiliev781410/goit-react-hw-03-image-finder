//import { nanoid } from 'nanoid';

export const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {
    console.log(webformatURL);
    return (
    <li className="galleryItem">          
        <img src={webformatURL} alt=""/>        
    </li> 
)};