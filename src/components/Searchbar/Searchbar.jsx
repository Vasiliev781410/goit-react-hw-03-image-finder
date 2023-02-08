import { Component } from "react";
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';


export class Searchbar extends Component{
    state = {
        filter: "",
    }
            
    onSubmitSearchForm = (evt) =>{
        evt.preventDefault(); 
        const form = evt.currentTarget;       
        const filter =  form.elements.searchQuery.value;               
        this.props.onSubmit(filter);
     }

    render(){
        return (
            <header className={css.searchbar}>
                <form onSubmit={this.onSubmitSearchForm} className={css.searchForm}>
                  <button type="submit" className={css.searchFormButton}>
                    <span className={css.searchFormButtonLabel}>Search</span>
                  </button>

                  <input                  
                    name="searchQuery"
                    className={css.searchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                  />
                </form>
            </header>
        ) 
    }
}

Searchbar.propTypes = {onSubmit: PropTypes.func};