import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Component } from "react";
import css from './ImageGallery.module.css';


export class ImageGallery extends Component {     
  render(){
    return (
      <ul className={css.gallery}>
        {this.props.images.map((image) => {
          //console.log(image);
          return (
            <ImageGalleryItem key={image.id} webformatURL={image.webformatURL} largeImageURL={image.largeImageURL} onClickImage={this.props.onClickImage}/>            
          )})}
      </ul>
    )}
  };

