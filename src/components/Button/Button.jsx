import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ title, onLoadMore}) => {  
    return (
    <button onClick={onLoadMore} type="button" className={css.button}>          
        {title}  
    </button> 
)};

Button.propTypes = {
    title: PropTypes.string,
    onLoadMore: PropTypes.func,
};