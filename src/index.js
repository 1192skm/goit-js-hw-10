import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries'

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchInput.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));


function onSearchInput() {
    const name = searchInput.value.trim();
    fetchCountries(name)
      .then(data => {
        if (data.length === 1) {
          countryInfo.innerHTML = createMarkupCountry(data);
          list.innerHTML = '';
        } else if (data.length > 1 && data.length <= 10) {
          list.innerHTML = createMarkupList(data);
          countryInfo.innerHTML = '';
        } else if (data.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
      })
      .catch(err =>
      {
        Notify.failure('❌Oops, there is no country with that name');
        return err}
      );
    list.innerHTML = '';
    countryInfo.innerHTML = '';
}

function createMarkupCountry(arr) {
    return arr
      .map(
        ({
          flags: { svg },
          name: { official },
          capital,
          languages,
          population,
        }) =>
          `<div class= "container"><img class="flag" src="${svg}" alt="Flag of ${official}" width=30>
    <h2 class= "country-name">${official}</h2></div>
    <p class= "info"><span class= "text">Capital:</span> ${capital}</p>
    <p class= "info"><span class= "text">Population:</span> ${population} people</p>
    <p class= "info"><span class= "text">Languages:</span> ${Object.values(languages)}</p>`
      )
      .join('');
}

function createMarkupList(arr) {

  return arr
    .map(
      ({
        flags: { svg },
        name: { official },
      }) => `<li><div class= "container"><img class="flag" src="${svg}" alt="Flag of ${official}" width=24>
    <p class= "country">${official}</p></div>
    </li>`
    )
    .join('');
}

