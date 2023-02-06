import { Component } from "react";
import { Searchbar } from "components/Searchbar/Searchbar.jsx";
import { ImageGallery } from "components/ImageGallery/ImageGallery.jsx";
import { Button } from "components/Button/Button.jsx";
//import getDataFromApi  from '../../api/api.js';
import axios from 'axios';
const AUTH_TOKEN = '32700035-2643abb13134080679caa7410';
const instance = axios.create({
  baseURL: 'https://pixabay.com/api'
 });
const PER_PAGE = '&per_page=12';
const otherParams = '&image_type=photo&orientation=horizontal&safesearch=true';

export class ImageSearch extends Component{
    state = {
        page: 0,      
        images: [],
        filter: "",
        loadHits: 0,
    }
    componentDidMount(){        
        console.log("did mount");      
    }
    async componentDidUpdate(_,prevState){      
        if (this.state.page === prevState.page && this.state.filter === prevState.filter){
            return;
        }
        if (this.state.filter.trim()  === ""){
            //Notiflix.Notify.failure('Oops, there is no images with that name');     
            return;  
         }     
        console.log("update");  
        //const response = await getDataFromApi(this.state.filter,this.state.page);
        //this.setState({ images: response.data.hits });
        try { 
            const {images, filter, page} = this.state;                
            const response = await instance.get('/?key='+AUTH_TOKEN+'&q='+filter.trim()+otherParams+PER_PAGE+'&page='+page);
            //console.log(response.data.hits);
            if (images.length !== 0) {
                this.setState({ images: [...images, ...response.data.hits]});
            } else {
                this.setState({ images: [...response.data.hits]});
            };
        } 
        catch (error) { 

        };   
    }

                        
    onSubmitSearchForm = (filter) =>{                       
        this.setState({filter: filter, page: 1});      
    }
    loadMore = () => {
        console.log('page',this.state.page);
        this.setState({page: this.state.page+1}); 
    }
    render(){  
        //console.log(this.state.image);

        return (
            <>
                <Searchbar onSubmit={this.onSubmitSearchForm} page={this.state.page}/>
                <ImageGallery images={this.state.images}/>
                <Button onLoadMore={this.loadMore} title="Load more"/>
            </>        

        )
    }
}
