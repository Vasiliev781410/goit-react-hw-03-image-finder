import { Component } from "react";
import { Searchbar } from "components/Searchbar/Searchbar.jsx";
import { ImageGallery } from "components/ImageGallery/ImageGallery.jsx";
import { Button } from "components/Button/Button.jsx";
import { Loader } from "components/Loader/Loader.jsx";
import { Modal } from "components/Modal/Modal.jsx";
import Notiflix from 'notiflix';
import {getDataFromApi}  from '../../api/api.js';

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
                
    async componentDidUpdate(_,prevState){               
        if (this.state.page === prevState.page && this.state.filter === prevState.filter){           
            return;
        }                     
        try { 
            const {filter, page, images} = this.state;

            this.setState({ isLoading: true }); 
            const response = await getDataFromApi(filter, page); 
            const {totalHits, hits} = response;
            let endSearch = false; 
            let sumLoadHits = 0;                   
            if (hits.length > 0) { 
                sumLoadHits = this.state.loadHits + hits.length;                                            
                if (sumLoadHits  === totalHits) { 
                    endSearch = true;         
                    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");   
               }                          
            } else{
                Notiflix.Notify.failure('Oops, there is no images with that name');                 
            }           
            let visibleButton = false;
            hits.length > 0 &&  endSearch === false ?  visibleButton = true : visibleButton = false;                 
            this.setState({ images: [...images, ...hits], isLoading: false, loadHits: sumLoadHits, visibleButton: visibleButton});        
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
    onClickImage = (largeImageURL) => {       
        this.setState({showModal: true, largeImageURL: largeImageURL});       
    } 
    setModalCloseOpenStatus = () => {         
        this.setState({showModal: ! this.state.showModal});        
    }                     
    onSubmitSearchForm = (filter) =>{                       
        this.setState({filter: filter, page: 1, images: [], loadHits: 0});      
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
                {showModal && <Modal largeImageURL={largeImageURL} setModalOpenStatus={this.setModalCloseOpenStatus}/>}   
            </>        

        )
    }
}

