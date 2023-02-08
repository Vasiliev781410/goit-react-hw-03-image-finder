import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({largeImageURL, setModalOpenStatus}) => {  
    return (
        <div onClick={setModalOpenStatus} className={css.overlay}>
            <div className={css.modal}>
              <img className={css.largeImage} src={largeImageURL} alt="" />
            </div>
      </div>                 
)};

Modal.propTypes = {
  largeImageURL: PropTypes.string,
  setModalOpenStatus: PropTypes.func,
};