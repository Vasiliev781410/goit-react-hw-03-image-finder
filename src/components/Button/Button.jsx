export const Button = ({ title, onLoadMore}) => {  
    return (
    <button onClick={onLoadMore} type="button" className="button">          
        {title}  
    </button> 
)};