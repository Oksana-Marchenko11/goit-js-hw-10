import axios from "axios";
import Notiflix from 'notiflix';

axios.defaults.headers.common["x-api-key"] = "ive_G3s8KlFgNd8sErSsu9txfYc6N3amBGPYVawu3NgoCxgjEubZWzrR89qkLCEDstRV";

const pLoader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

export const fetchBreeds = () => {
    Notiflix.Loading.custom(pLoader.textContent, {
        customSvgUrl: 'https://notiflix.github.io/content/media/loading/notiflix-loading-nx-light.svg',
    });
    return axios.get('https://api.thecatapi.com/v1/breeds');
};

export const fetchCatByBreed = (breedId) => {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
};