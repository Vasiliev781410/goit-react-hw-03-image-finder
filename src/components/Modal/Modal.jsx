import css from './Modal.module.css';

export const Modal = ({largeImageURL, setModalOpenStatus}) => {  
    return (
        <div onClick={setModalOpenStatus} className={css.overlay}>
            <div className={css.modal}>
              <img className={css.largeImage} src={largeImageURL} alt="" />
            </div>
      </div>                 
)};
