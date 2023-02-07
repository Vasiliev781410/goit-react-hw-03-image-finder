import css from './Button.module.css';

export const Button = ({ title, onLoadMore}) => {  
    return (
    <button onClick={onLoadMore} type="button" className={css.button}>          
        {title}  
    </button> 
)};