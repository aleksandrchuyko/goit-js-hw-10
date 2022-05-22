export const fetchCountries = function(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else throw new Error('Oops, there is no country with that name');
        });
}
