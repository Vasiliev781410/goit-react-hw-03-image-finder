import axios from 'axios';

const AUTH_TOKEN = '32700035-2643abb13134080679caa7410';
const baseURL = 'https://pixabay.com/api';
const instance = axios.create({
  baseURL: baseURL
});
const PER_PAGE = '&per_page=12';
const otherParams = '&image_type=photo&orientation=horizontal&safesearch=true';


export const getDataFromApi = async (searchInput,page) => {    
    const name = searchInput.trim();
    const emptyResult = {totalHits: 0, hits: []}; 
    if (searchInput.trim() === ""){  
      return emptyResult;  
   }     
    try {         
        const response = await instance.get('/?key='+AUTH_TOKEN+'&q='+name+otherParams+PER_PAGE+'&page='+page);
        return response.data;
    } catch (error) {     
        return emptyResult;
    }
  };
  
