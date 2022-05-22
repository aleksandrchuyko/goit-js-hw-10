import './css/styles.css';
import debounce from "lodash.debounce";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import {fetchCountries} from "./js/fetchCountries.js";

const DEBOUNCE_DELAY = 300;

const   inputRef = document.querySelector('#search-box'),
        listRef = document.querySelector('.country-list'),
        cardRef = document.querySelector('.country-info');

function makeCard(country) {
    clearResult();

    cardRef.innerHTML = `<h2 class="card-title"><svg class="card-icon" width="30" height="30">
                <image xlink:href="${country[0].flags.svg}" width="30" height="30"/>
              </svg>${country[0].name.official}</h2>
              <ul class="card-info">
              <li><h4>Capital:</h4><span>${country[0].capital}</span></li>
              <li><h4>Population:</h4><span>${country[0].population}</span></li>
              <li><h4>Languages:</h4><span>${Object.values(country[0].languages).reduce((acc, language) => { return acc + (acc ? ", " + language : language); }, "")}</span></li>
              </ul>`;
}

function makeList(countries) {
    clearResult();
    
    const listMarkup = countries.reduce((acc, country) => {
        return acc += `<li><svg class="cards-icon" width="20" height="20">
                <image xlink:href="${country.flags.svg}" width="20" height="20"/>
              </svg><span class="cards-title">${country.name.official}</span></li>`
    }, "");
    listRef.innerHTML = listMarkup;
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
