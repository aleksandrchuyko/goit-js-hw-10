import './css/styles.css';
import debounce from "lodash.debounce";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import {fetchCountries} from "./js/fetchCountries.js";

const DEBOUNCE_DELAY = 2000;

const   inputRef = document.querySelector('#search-box'),
        listRef = document.querySelector('.country-list'),
        cardRef = document.querySelector('.country-info');

function makeCard(country) {
    clearResult();
    cardRef.innerHTML = `<svg class="card-icon" width="50" height="50">
                <image xlink:href="${country[0].flags.svg}" width="50" height="50"/>
              </svg>`;
}

function makeList(countries) {
    clearResult();
}

function clearResult() {
    listRef.innerHTML = "";
    cardRef.innerHTML = "";
}

inputRef.addEventListener('input', debounce((e) => {
    const partOfCountryName = (e.target.value).trim();
    if (partOfCountryName) {
        fetchCountries(partOfCountryName)
        .then(countries => {
            if (countries.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            } else if (countries.length === 1) {
                makeCard(countries);
            } else {
                makeList(countries);
            }
        })
        .catch(error => {
            console.log("!!!", error);
            Notiflix.Notify.failure('Oops, there is no country with that name');
        });
    }
}, DEBOUNCE_DELAY));
