import Notiflix from 'notiflix';

export function fetchCountries(name) {
    const url = 'https://restcountries.com/v3.1/name/';
    
    return fetch(`${url}${name}?fields=name,capital,population,flags,languages`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function error() {
    Notiflix.Notify.failure('Oops, there is no country with that name');
  }