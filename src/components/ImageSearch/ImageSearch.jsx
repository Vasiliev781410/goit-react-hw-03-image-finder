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
        showModal: false,
        largeImageURL: "",

    }
    componentDidMount(){        
            
    }

    async componentDidUpdate(_,prevState){             
        if (this.state.filter.trim() === ""){
            Notiflix.Notify.failure('Oops, there is no images with that name');   
            this.setState({ page: "", filter: "", images: []});   
            return;                  
         }          
        if (this.state.page === prevState.page && this.state.filter === prevState.filter){
            return;
        }
              
      
       try { 
            const {images, filter, page} = this.state;
            this.setState({ isLoading: true }); 
            const response = await getDataFromApi(filter, page);               
            //const response = await instanceAxios.get('/?key='+AUTH_TOKEN+'&q='+filter.trim()+otherParams+PER_PAGE+'&page='+page);
            if (images.length !== 0) {
                this.setState({ images: [...images, ...response.hits], isLoading: false });
            } else {
                this.setState({ images: [...response.hits], isLoading: false });
            };              
        } 
        catch (error) {  
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');           
            this.setState({ isLoading: false });                 
        };   
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
        const {page, images, isLoading, showModal,largeImageURL} = this.state;      
                             
        return (
            <>
                <Searchbar onSubmit={this.onSubmitSearchForm} page={page}/>   
                {page > 0 ? <ImageGallery images={images} onClickImage={this.onClickImage}/>: <></>}  
                {isLoading ? <Loader/> : page >= 1 ? <Button onLoadMore={this.loadMore} title="Load more"/>: <></>}  
                {showModal && <Modal largeImageURL={largeImageURL} setModalOpenStatus={this.setModalOpenStatus}/>}   
            </>        

        )
    }
}


