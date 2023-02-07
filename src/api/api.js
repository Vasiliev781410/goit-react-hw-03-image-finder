import Notiflix from 'notiflix';
import axios from 'axios';


const AUTH_TOKEN = '32700035-2643abb13134080679caa7410';
const baseURL = 'https://pixabay.com/api';
// const instance = axios.create({
  // baseURL: baseURL
//  });
const PER_PAGE = '&per_page=12';
const otherParams = '&image_type=photo&orientation=horizontal&safesearch=true';

let loadHits = 0;

export const getDataFromApi = async (searchInput,page) => {  
    const emptyResult = [{id:"", webformatURL: "", largeImageURL: "",}];
    const name = searchInput.trim();
    if (searchInput.trim() === ""){
      Notiflix.Notify.failure('Oops, there is no images with that name');     
      return;  
   }     
    try {         
        const response = await axios.get(baseURL+'/?key='+AUTH_TOKEN+'&q='+name+otherParams+PER_PAGE+'&page='+page);
        loadHits += response.data.hits.length;
        console.log('api: ',response.data);
        //console.log(response.data.hits);
        if (loadHits === response.data.totalHits && response.data.hits.length > 0) {         
          Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");   
        }
        if (response.data.hits.length === 0) {
          //Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }        

        return response.data;
    } catch (error) {    
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');   
        console.error(error);
        return emptyResult;
    }

  };
  
