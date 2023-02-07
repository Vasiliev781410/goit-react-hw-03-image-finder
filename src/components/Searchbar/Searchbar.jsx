import { Component } from "react";
import Notiflix from 'notiflix';
import css from './Searchbar.module.css';

export class Searchbar extends Component{
    state = {
        filter: "",
    }
            
    onSubmitSearchForm = (evt) =>{
        evt.preventDefault(); 
        const form = evt.currentTarget;       
        const filter =  form.elements.searchQuery.value;               
        //if (this.state.filter === filter){
            //Notiflix.Notify.failure('Oops, there is no images with that name'); 
            //return;
        //}             
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