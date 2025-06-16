const url =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const city = [];
const search = document.querySelector(".search");
const suggestion = document.querySelector(".suggestions");

function suggestionData(cities, states, search_data) {
  console.log(cities);
  console.log(states);
  const html = `<li>City: ${cities}, State: ${states}`;
  suggestion.innerHTML = html;
  return;
  // suggestion.innerHTML = `<li>${search_data}</li>`;
}

search.addEventListener("keyup", () => {
  const search_data = search.value;
  city.forEach((data) => {
    if (
      data.city.toLowerCase().includes(search_data) ||
      data.state.toLowerCase().includes(search_data)
    ) {
      suggestionData(data.city, data.state, search_data);
    }
  });
  console.log("-------------------------------------------------");
});

fetch(url)
  .then((data) => data.json())
  .then((data) => {
    city.push(...data);
  })
  .catch((e) => {
    console.log(e);
  });
