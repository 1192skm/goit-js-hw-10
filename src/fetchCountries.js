export function fetchCountries(name) {
  // https://restcountries.com/v3.1/name/deutschland?fields=name,capital,population,flags,languages
  const BASE_URL = 'https://restcountries.com/v3.1';
  return fetch(
    `${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error('Oops, there is no country with that name');
    }
    return resp.json();
  });
}
