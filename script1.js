const url =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const cities = [];
const search = document.querySelector(".search");
const suggestion = document.querySelector(".suggestions");

fetch(url)
  .then((data) => data.json())
  .then((data) => cities.push(...data));

function FindMatching(searchedCity) {
  return cities.filter((citiesNames) => {
    return (
      citiesNames.city.toLowerCase().includes(searchedCity) ||
      citiesNames.state.toLowerCase().includes(searchedCity)
    );
  });
}

function DisplayMatch() {
  const searchedCity = search.value.toLowerCase().trim();
  const matches = FindMatching(searchedCity);
  let html =
    searchedCity == ""
      ? `
    <li>Filter for a city</li>
    <li>or a state</li>
    
    `
      : matches
          .map((data) => {
            const regex = new RegExp(searchedCity, "gi");
            const cityName = data.city.replace(
              regex,
              `<span class="hl"> ${searchedCity}</span>`
            );
            const stateName = data.state.replace(
              regex,
              `<span class="hl"> ${searchedCity}</span>`
            );

            return `
    <li>
    <span class="name">
        ${cityName},
        ${stateName}
    </span>
    <span class="population">
    ${numberWithCommas(data.population)}</span>
    </li>
    `;
          })
          .join("");

  suggestion.innerHTML = html;
  console.log("--------------------------------------------------");
}

search.addEventListener("change", DisplayMatch);
search.addEventListener("keyup", DisplayMatch);
