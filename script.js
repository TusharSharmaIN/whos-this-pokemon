const enterButton = document.getElementById("enter");
const reloadButton = document.getElementById("reload");

var pokemonName = "";
var pokemonImageUrl = "";

function getRandomPokemon() {
  //  considering only kanto region pokemon
  const pokeLength = 151;
  const randPokemonId = Math.floor(Math.random() * pokeLength);
  fetch(`https://pokeapi.co/api/v2/pokemon-form/${randPokemonId}/`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      pokemonName = data["pokemon"]["name"];
      pokemonImageUrl = data["sprites"]["front_default"];

      const img = document.querySelector("img");
      const audioPokemon = document.getElementById("audiopokemon");
      img.setAttribute("src", pokemonImageUrl);
      audioPokemon.play();
      console.log("POKEMON: " + pokemonName);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

onReset = () => {
  document.querySelector("span").innerHTML = " ";
  document.getElementById("imgpokemon").className = null;
  getRandomPokemon();
};

onEnter = () => {
  let response = document.querySelector("input").value.trim();
  const span = document.querySelector("span");
  const imgPokemon = document.getElementById("imgpokemon");
  const input = document.querySelector("input");

  if (response.length) {
    if (response.toLowerCase() == pokemonName.toLowerCase()) {
      span.innerHTML = "Congratulations! It's " + pokemonName;
      imgPokemon.className = "unhide";
      input.value = "";
      setTimeout(onReset, 1500);
    } else {
      span.innerHTML = "You missed! It's " + pokemonName.toLowerCase();
      imgPokemon.className = "unhide";
      input.value = "";
      setTimeout(onReset, 1500);
    }
  } else {
    span.innerHTML = "Enter the name";
  }
};

enterButton.addEventListener("click", onEnter);

reloadButton.addEventListener("click", onReset);

getRandomPokemon();
