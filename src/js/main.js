let pokemonData;
async function fetchPokemonData() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=500");
  const data = await response.json(); //turning json to javascript
  // console.log(data);
  pokemonData = data.results;

  insertOptionToSelectElement();
}
fetchPokemonData();

// ----------------------------------------------------------------------------

function insertOptionToSelectElement() {
  for (let i = 0; i < 500; i++) {
    let newOption = new Option(pokemonData[i].name, pokemonData[i].name); // new Option(text, value)
    htmlSelectElement.add(newOption, undefined);
  }
}
// ----------------------------------------------------------------------------

const htmlSelectElement = document.querySelector("#pokemon-selection");
htmlSelectElement.onchange = returnChosenPokemonData; // htmlSelectElement.addEventListener("change", <NAME OF THE FUNCTION>)

let currentPokemon;
function returnChosenPokemonData(event) {
  cardElement.classList.add("animation");

  currentPokemon = pokemonData.find(
    (pokemon) => pokemon.name === event.currentTarget.value //event.currentTarget.value or event.target.value
  );
  fetchPokemonDetailsData(currentPokemon.url);
}
// ----------------------------------------------------------------------------
let currentPokemonDetails;
async function fetchPokemonDetailsData(currentPokemonURL) {
  const response = await fetch(currentPokemonURL);
  const data = await response.json(); //turning json to javascript
  currentPokemonDetails = await data;
  displayPokemonCardDetails();
}
// ----------------------------------------------------------------------------
function displayPokemonCardDetails() {
  const index = document.querySelector(".detail-layer__id");
  const nameOne = document.querySelector(".detail-layer__name-1");
  const nameTwo = document.querySelector(".detail-layer__name-2");
  const hp = document.querySelector(".detail-layer__hp");
  const ability = document.querySelector(".detail-layer__ability");
  const damage = document.querySelector(".detail-layer__damage");
  const power = document.querySelector(".detail-layer__power");
  const image = document.querySelector(".pokemon-card__poke-img-layer");
  // -------------------------------------------------------------------------
  const backgroundLayer = document.querySelector(".pokemon-card__back");
  const cardLayer = document.querySelector(".pokemon-card__card-layer");
  // const backgroundImages = [
  //   "background-layer-01.png",
  //   "background-layer-02.png",
  //   "background-layer-03.png",
  //   "background-layer-04.png",
  //   "background-layer-05.png",
  //   "background-layer-06.png",
  //   "background-layer-07.png",
  //   "background-layer-08.png",
  // ];
  // const cardImages = [
  //   "card-layer-01.png",
  //   "card-layer-02.png",
  //   "card-layer-03.png",
  //   "card-layer-04.png",
  //   "card-layer-05.png",
  // ];
  const backgroundImages = [
    "https://res.cloudinary.com/do8r4a3sn/image/upload/v1670460020/Pokemon%20List/background-layer-01-min_so9qbd.png",
    "https://res.cloudinary.com/do8r4a3sn/image/upload/v1670460021/Pokemon%20List/background-layer-02-min_utwson.png",
    "https://res.cloudinary.com/do8r4a3sn/image/upload/v1670460021/Pokemon%20List/background-layer-03-min_odavyo.png",
    "https://res.cloudinary.com/do8r4a3sn/image/upload/v1670460024/Pokemon%20List/background-layer-04-min_ued32g.png",
    "https://res.cloudinary.com/do8r4a3sn/image/upload/v1670460023/Pokemon%20List/background-layer-05-min_hlysz9.png",
    "https://res.cloudinary.com/do8r4a3sn/image/upload/v1670460025/Pokemon%20List/background-layer-06-min_jezkdt.png",
    "https://res.cloudinary.com/do8r4a3sn/image/upload/v1670460020/Pokemon%20List/background-layer-07-min_lcnxi9.webp",
    "https://res.cloudinary.com/do8r4a3sn/image/upload/v1670460028/Pokemon%20List/background-layer-08-min_mpoeyt.png",
  ];
  const cardImages = [
    "https://res.cloudinary.com/do8r4a3sn/image/upload/v1670460022/Pokemon%20List/card-layer-01-min_fztoz5.png",
    "https://res.cloudinary.com/do8r4a3sn/image/upload/v1670460024/Pokemon%20List/card-layer-02-min_iwctf8.png",
    "https://res.cloudinary.com/do8r4a3sn/image/upload/v1670460026/Pokemon%20List/card-layer-03-min_judb1a.png",
    "https://res.cloudinary.com/do8r4a3sn/image/upload/v1670460024/Pokemon%20List/card-layer-04-min_l3iyqs.png",
    "https://res.cloudinary.com/do8r4a3sn/image/upload/v1670460023/Pokemon%20List/card-layer-05-min_hyrocv.png",
  ];

  const chosenBackgroundImage =
    backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
  // console.log(chosenBackgroundImage);

  const chosenCardImage =
    cardImages[Math.floor(Math.random() * cardImages.length)];
  // console.log(chosenCardImage);
  console.log(backgroundLayer);
  backgroundLayer.style.backgroundImage =
    "url(" + `${chosenBackgroundImage}` + ")";
  cardLayer.style.backgroundImage = "url(" + `${chosenCardImage}` + ")";

  // backgroundLayer.style.backgroundImage =
  //   "url('../img/" + `${chosenBackgroundImage}` + "')";
  // console.log(backgroundLayer);
  // cardLayer.style.backgroundImage =
  //   "url('../img/" + `${chosenCardImage}` + "')";

  // -----------------------------------------------------------------------
  image.src = `https://img.pokemondb.net/sprites/home/shiny/${currentPokemon.name}.png`;
  index.textContent = `#${currentPokemonDetails.id}`;
  nameOne.textContent = currentPokemon.name;
  nameTwo.textContent = currentPokemon.name;
  hp.textContent = currentPokemonDetails.weight;
  ability.textContent = currentPokemonDetails.moves[0].move.name;
  damage.textContent = currentPokemonDetails.weight - 27;
  power.textContent = currentPokemonDetails.weight + 55;
  console.log(currentPokemonDetails);
}
// ----------------------------------------------------------------------------
const cardElement = document.querySelector(".card");
function toggleFlipAnimation() {
  cardElement.classList.add("animation");
}

// -----------------------------------------------------------------------------
const searchPokemon = document.querySelector(".search-by-name");
searchPokemon.onchange = searchPokemonByName;
function searchPokemonByName() {
  const inputValue = searchPokemon.value.toLowerCase();
  currentPokemon = pokemonData.find((pokemon) => pokemon.name === inputValue);
  htmlSelectElement.value = currentPokemon.name;
  cardElement.classList.add("animation");
  fetchPokemonDetailsData(currentPokemon.url);
}

// -----------------------------------------------------------------------------
const cards = document.querySelector(".card");
const style = document.querySelector(".hover");
cards.addEventListener("mousemove", function (e) {
  // const $card = $(this);
  const l = e.offsetX;
  const t = e.offsetY;
  const h = this.height();
  const w = this.width();
  const lp = Math.abs(Math.floor((100 / w) * l) - 100);
  const tp = Math.abs(Math.floor((100 / h) * t) - 100);
  const bg = `background-position: ${lp}% ${tp}%;`;
  const style = `.card.active:before { ${bg} }`;
  this.classList.remove("active");
  this.classList.add("active");
  style.html(style);
});
cards.addEventListener("mouseout", function () {
  cards.classList.remove("active");
});
