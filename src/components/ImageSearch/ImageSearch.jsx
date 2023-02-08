import { Component } from "react";
import { Searchbar } from "components/Searchbar/Searchbar.jsx";
import { ImageGallery } from "components/ImageGallery/ImageGallery.jsx";
import { Button } from "components/Button/Button.jsx";
import { Loader } from "components/Loader/Loader.jsx";
import { Modal } from "components/Modal/Modal.jsx";
import Notiflix from 'notiflix';
import {getDataFromApi}  from '../../api/api.js';
import PropTypes from 'prop-types';

export class ImageSearch extends Component{
    state = {
        page: 0,      
        images: [],
        filter: "",
        loadHits: 0,
        isLoading: false,
        visibleButton: false,
        showModal: false,
        largeImageURL: "",
    }
    // getSnapshotBeforeUpdate(){
        // const btn = document.querySelector(".button");
        // return btn.scrollHeight;
    // }

    async componentDidUpdate(_,prevState,btnHeight){ 
       // console.log('height ',btnHeight);
        //window.scrollTo(0,btnHeight);            
        if (this.state.page === prevState.page && this.state.filter === prevState.filter){           
            return;
        }                     
        try { 
            const {filter, page} = this.state;
            let images = null;
            filter !== prevState.filter ? images = []: images = this.state.images;

            this.setState({ isLoading: true }); 
            const response = await getDataFromApi(filter, page); 
            const {totalHits, hits} = response;
            let endSearch = false;                    
            if (hits.length > 0) {               
                this.state.loadHits = prevState.loadHits + hits.length;                                 
                if (this.state.loadHits  === totalHits) { 
                    endSearch = true;         
                    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");   
               }                          
            } else{
                Notiflix.Notify.failure('Oops, there is no images with that name');  
                this.state.loadHits = 0;
            }
            hits.length > 0 &&  endSearch === false ?  this.setState.visibleButton = true : this.setState.visibleButton = false;                 
            this.setState({ images: [...images, ...hits], isLoading: false, loadHits: this.state.loadHits, visibleButton: this.setState.visibleButton});        
        } 
        catch (error) {  
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');           
            this.setState({ isLoading: false, loadHits: 0, visibleButton: false});                 
        };
        this.smoothScroll(this.state.page);       
    }
    smoothScroll(page){
        try{
            if (page > 1){
                    window.scrollBy({
                    top: window.innerHeight * page,
                    behavior: "smooth",    
                });                       
            };                 
        }
        catch (error){}
    }
    onClickImage = (evt) => {       
        this.setState({showModal: true, largeImageURL: evt.target.name}); 
        this.setModalOpenStatus(evt);
        document.addEventListener("keydown", this.handleClick); 
    } 
    setModalOpenStatus = (evt) => { 
        if (evt.target === evt.currentTarget){     
            this.setState({showModal: ! this.state.showModal});
        } 
    }  
    handleClick = (e) => {            
        if (e.code === "Escape") { 
            this.setState({showModal: ! this.state.showModal}); 
            document.removeEventListener("keydown", this.handleClick);     
        };
    };                                   
    onSubmitSearchForm = (filter) =>{                       
        this.setState({filter: filter, page: 1});      
    }
    loadMore = () => {       
        this.setState({page: this.state.page+1}); 
    }
    render(){          
        const {page, images, isLoading, showModal,largeImageURL, visibleButton} = this.state;      
                             
        return (
            <>
                <Searchbar onSubmit={this.onSubmitSearchForm} page={page}/>   
                {images.length > 0 ? <ImageGallery images={images} onClickImage={this.onClickImage}/>: <></>}  
                {isLoading ? <Loader/> : visibleButton === true ? <Button onLoadMore={this.loadMore} title="Load more"/>: <></>}  
                {showModal && <Modal largeImageURL={largeImageURL} setModalOpenStatus={this.setModalOpenStatus}/>}   
            </>        

        )
    }
}

Searchbar.propTypes = {onSubmit: PropTypes.func};
