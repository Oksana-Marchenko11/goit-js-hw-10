import axios from "axios";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";

axios.defaults.headers.common["x-api-key"] = "live_G3s8KlFgNd8sErSsu9txfYc6N3amBGPYVawu3NgoCxgjEubZWzrR89qkLCEDstRV";

const selectCat = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const pError = document.querySelector('.error');
const pLoader = document.querySelector('.loader');

// selectCat.style.display = 'none';


fetchBreeds().then(response => response.data).then(data => {
    data.forEach(element => {
        const opt = document.createElement('option');
        opt.value = element.id;
        opt.innerHTML = element.name;
        selectCat.appendChild(opt);
        Notiflix.Loading.remove();
    });
    selectCat.style.display = 'flex';
    new SlimSelect({
        select: '.breed-select',
    });


})
    .catch(err => {
        Notiflix.Loading.remove();
        Notiflix.Notify.failure(pError.textContent);
        console.log(err); pError.style.display = 'block';
    });





const getCat = (e) => {
    Notiflix.Loading.custom(pLoader.textContent, {
        customSvgUrl: 'https://notiflix.github.io/content/media/loading/notiflix-loading-nx-light.svg',
    });
    fetchCatByBreed(e.target.value).then(element => {
        catInfo.innerHTML = '';
        catInfo.style.display = 'flex';
        catInfo.style.padding = '20px';
        console.log(element.data[0]);
        let catImg = new Image();
        catImg.src = element.data[0].url;
        catImg.alt = element.data[0].breeds[0].name;
        catImg.style.maxWidth = '320px';
        catImg.style.height = 'fit-content';
        catImg.style.borderRadius = '5px';

        const divDescr = document.createElement('div');
        divDescr.style.marginLeft = '15px';
        let h1 = document.createElement('H1');
        h1.innerHTML = element.data[0].breeds[0].name;
        h1.style.fontWeight = 'bold';

        let descr = document.createElement('p');
        descr.innerHTML = element.data[0].breeds[0].description;

        let temper = document.createElement('p');
        temper.innerHTML = '<b>Temperament: </b>' + element.data[0].breeds[0].temperament;

        let link = document.createElement('a');
        link.href = element.data[0].breeds[0].wikipedia_url;
        link.text = element.data[0].breeds[0].wikipedia_url;
        link.target = 'blankt';

        catInfo.append(catImg);
        divDescr.append(h1);
        divDescr.append(descr);
        divDescr.append(temper);
        divDescr.append(link);
        catInfo.append(divDescr);


        Notiflix.Loading.remove();

    }).catch(err => {
        Notiflix.Loading.remove();
        Notiflix.Notify.failure(pError.textContent);
    }
    );
}

selectCat.addEventListener('change', getCat);


