import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');

const refs = { 
      search: document.querySelector('#search-box'),
      countryList: document.querySelector('.country-list'),
      countryInfo: document.querySelector('.country-info'),
}

refs.search.addEventListener('input', debounce(handleSearch, DEBOUNCE_DELAY));

function handleSearch(e) {
    e.preventDefault();

    const inputValue = e.target.value.trim();

    if(inputValue === ""){
      clearData();
      return;
    }
    fetchCountries(inputValue).then(fetchResponse).catch(error => Notiflix.Notify.failure(`Something went wrong - ${error}`));
}

function clearData() {
  refs.countryList.innerHTML = "";
  refs.countryInfo.innerHTML = "";
}

function insertList(countryList) {
  refs.countryList.insertAdjacentHTML('beforeend', countryList);
}

function insertInfo(countryInfo) {
  refs.countryInfo.insertAdjacentHTML('beforeend', countryInfo);
}

function fetchResponse(countries) {

  clearData(); 

  if((countries.length > 1) & (countries.length <= 10)) {
    const countryList = countries.map(country => {
      return `<li class = "country-item"><img src='${country.flags.svg}', width=4%, height=4%, alt='flag'>
      <p>${country.name.official}</p></li>`;
    }).join("");

    insertList(countryList);

  } else if(countries.length === 1){
    const countryInfo = countries.map(country => {
      return `<li class = "country-item-info"><div class="top"><img src='${country.flags.svg}', width=4%, height=4%, alt='flag'>
      <p class="country">${country.name.official}</p></div>
      <p class="header">Capital: <span class="text">${country.capital}</span></p>
      <p class="header">Population: <span class="text">${country.population}</span></p>
      <p class="header">Languages: <span class="text">${Object.values(country.languages)}</span></p></li>`;
    }).join("");

    insertInfo(countryInfo);

  } else {
     Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
  }
}

