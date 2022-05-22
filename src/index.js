import './css/styles.css';
import debounce from "lodash.debounce";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import {fetchCountries} from "./js/fetchCountries.js";

const DEBOUNCE_DELAY = 3000;

const inputRef = document.querySelector('#search-box');



inputRef.addEventListener('input', debounce((e) => {
    const partOfCountryName = (e.target.value).trim();
    if (partOfCountryName) {
        fetchCountries(partOfCountryName)
        .then(countries => {
            if (countries.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            }
        })
        .catch(error => {
            console.log("!!!", error);
            Notiflix.Notify.failure('Oops, there is no country with that name');
        });
    }
    
}, DEBOUNCE_DELAY));
