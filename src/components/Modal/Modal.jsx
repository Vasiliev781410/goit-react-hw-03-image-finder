import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { Component } from "react";

export class Modal extends Component{  
  componentDidMount(){
    document.addEventListener("keydown", this.handleClick);     
  } 
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleClick);  
  }
  handleClick = (e) => {             
    if (e.code === "Escape") {      
        this.props.setModalOpenStatus();  
    };
  };  
  closeModalOnOverlay = (e) => {         
    if (e.target === e.currentTarget  ) {      
        this.props.setModalOpenStatus();  
    };
  };                                                                    

  render(){
    const {largeImageURL} = this.props;
    return (
        <div onClick={this.closeModalOnOverlay} className={css.overlay}>
            <div className={css.modal}>
              <img className={css.largeImage} src={largeImageURL} alt="" />
            </div>
      </div>                 
    )
  }
};

Modal.propTypes = {
  largeImageURL: PropTypes.string,
  setModalOpenStatus: PropTypes.func,
};