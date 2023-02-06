import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

//import { nanoid } from 'nanoid';

export const ImageGallery = ({ images }) => {
  console.log(images);
  return (
    <ul className='gallery'>
      {images.map((image) => {
        console.log(image);
        return (
          <ImageGalleryItem key={image.id} webformatURL={image.webformatURL} largeImageURL={image.largeImageURL}/>            
        )})}
    </ul>
)};

