import { Component } from "react";
import { Searchbar } from "components/Searchbar/Searchbar.jsx";
//import getDataFromApi  from '../../api/api.js';
import axios from 'axios';
const AUTH_TOKEN = '32700035-2643abb13134080679caa7410';
const instance = axios.create({
  baseURL: 'https://pixabay.com/api'
 });
const PER_PAGE = '&per_page=12';
const otherParams = '&image_type=photo&orientation=horizontal&safesearch=true';


const ImageList = ({ images }) => (
    <ul>
      {images.map(({ id, webformatURL, largeImageURL }) => (
        <li key={id}>          
            <img src={webformatURL} alt="cat" />         
        </li>
      ))}
    </ul>
);

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
            const {filter, page} = this.state;                
            const response = await instance.get('/?key='+AUTH_TOKEN+'&q='+filter.trim()+otherParams+PER_PAGE+'&page='+page);
            console.log(response.data.hits);
            this.setState({ images: response.data.hits });
        } 
        catch (error) { 

        };   
    }

                        
    onSubmitSearchForm = (filter) =>{                       
        this.setState({filter: filter, page: 1});      
    }
    
    render(){        
        return (
            <>
                <Searchbar onSubmit={this.onSubmitSearchForm} page={this.state.page}/>
                <ImageList images={this.state.images}/>
            </>        

        )
    }
}
