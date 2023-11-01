import axios from 'axios';

const API_KEY = '39851932-ce9b346420218ff82d4578a42';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 12;

const fetchImages = (query, page) => {
  const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;
  return axios.get(url).then((response) => response.data.hits);
};

export default fetchImages;