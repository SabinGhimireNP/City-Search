const url =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const citys = [];
const search = document.querySelector(".search");
const suggestion = document.querySelector(".suggestions");

fetch(url)
  .then((data) => data.json())
  .then((data) => {
    citys.push(...data);
  })
  .catch((e) => {
    console.log(e);
  });

function findMatch(wordtomatch, citys) {
  return citys.filter((place) => {
    const regex = new RegExp(wordtomatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function displayMatch() {
  const matched = findMatch(this.value, citys);
  // console.log(matched);
  const html = matched
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityname = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const statename = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );

      return `
    <li>
    <span class="name">
    ${cityname}, ${statename}
    </span>
    <span class="population">
    ${numberWithCommas(place.population)}
    </span>
    </li> `;
    })
    .join("");
  if (this.value.trim() === "") {
    suggestion.innerHTML = `
    <li><span class="name">Filter for a city</span></li>
    <li><span class="name">or a state</span></li>`;
    return;
  }

  suggestion.innerHTML = html;
}
search.addEventListener("change", displayMatch);
search.addEventListener("keyup", displayMatch);
// function suggestionData(cities, states, search_data) {
//   console.log(cities);
//   console.log(states);
//   const html = `<li>City: ${cities}, State: ${states}`;
//   suggestion.innerHTML = html;
//   return;
//   // suggestion.innerHTML = `<li>${search_data}</li>`;
// }

// search.addEventListener("keyup", () => {
//   const search_data = search.value;
//   city.forEach((data) =>
//       data.city.toLowerCase().includes(search_data) ||
//       data.state.toLowerCase().includes(search_data)
//
//   });
//   console.log("-------------------------------------------------");
// });
