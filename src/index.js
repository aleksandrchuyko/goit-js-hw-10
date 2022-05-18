import './css/styles.css';
import debounce from "lodash.debounce";

import {fetchCountries} from "./js/fetchCountries.js";

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');



inputRef.addEventListener('input', debounce((e) => {
    const partOfCountryName = e.target.value;
    fetchCountries(partOfCountryName)
        .then(response => response.json())
        .then(countries => {
            console.table(countries);
        })
        .catch(error => {
            console.log(error);
        });
}, DEBOUNCE_DELAY));
