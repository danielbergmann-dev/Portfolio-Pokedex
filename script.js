const pokedex = document.getElementById('pokedex');
const pokemonDetails = document.getElementById('pokemon-details');
const searchInput = document.querySelector('input[type="text"]');

const fetchPokemon = async () => {
  for (let i = 1; i <= 150; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async id => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  console.log(pokemon);
  createPokemonCard(pokemon);
};

const createPokemonCard = pokemon => {
  const pokemonCard = document.createElement('div');
  pokemonCard.classList.add('pokemon-card');
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const color = getColorByType(pokemon.types[0].type.name);
  pokemonCard.style.backgroundColor = color;
  const pokeInnerHTML = `
    <img src="${pokemon.sprites.other['official-artwork'].front_default}">
    <h3>${name}</h3>
  `;
  pokemonCard.innerHTML = pokeInnerHTML;

  pokemonCard.addEventListener('click', () => {
    createPokemonDetails(pokemon);
  });

  pokedex.appendChild(pokemonCard);
};

const createPokemonDetails = pokemon => {
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const color = getColorByType(pokemon.types[0].type.name);
  const detailsInnerHTML = `
    <div class="pokemon-details-card" style="background-color: ${color}">
      <h2>${name}</h2>
      <img src="${pokemon.sprites.other['official-artwork'].front_default}">
      <ul class="pokemon-stats">
        <li>HP: <p>&nbsp;</p><span class="progress-1"></span><p>&nbsp;</p> ${pokemon.stats[0].base_stat}</li>
        <li>Attack: <p>&nbsp;</p><span class="progress-2"></span><p>&nbsp;</p> ${pokemon.stats[1].base_stat}</li>
        <li>Defense:<p>&nbsp;</p><span class="progress-3"></span><p>&nbsp;</p>  ${pokemon.stats[2].base_stat}</li>
        <li>Sp. Attack: <p>&nbsp;</p><span class="progress-4"></span><p>&nbsp;</p>  ${pokemon.stats[3].base_stat}</li>
        <li>Sp. Defense:<p>&nbsp;</p><span class="progress-5"></span><p>&nbsp;</p>  ${pokemon.stats[4].base_stat}</li>
      </ul>
    </div>
  `;
  pokemonDetails.innerHTML = detailsInnerHTML;
  pokemonDetails.style.display = 'flex';

  const closeBtn = document.createElement('div');
  closeBtn.innerHTML = '&times;';
  closeBtn.classList.add('close-btn');
  closeBtn.addEventListener('click', () => {
    pokemonDetails.style.display = 'none';
  });

  pokemonDetails.appendChild(closeBtn);
  
};

const getColorByType = type => {
  switch (type) {
    case 'normal':
      return '#a8a878';
    case 'fire':
      return '#f08030';
    case 'water':
      return '#6890f0';
    case 'electric':
      return '#f8d030';
    case 'grass':
      return '#78c850';
    case 'ice':
      return '#98d8d8';
    case 'fighting':
      return '#c03028';
    case 'poison':
      return '#a040a0';
    case 'ground':
      return '#e0c068';
    case 'flying':
      return '#a890f0';
    case 'psychic':
      return '#f85888';
    case 'bug':
      return '#a8b820';
    case 'rock':
      return '#b8a038';
    case 'ghost':
      return '#705898';
    case 'dragon':
      return '#7038f8';
    case 'dark':
      return '#705848';
    case 'steel':
      return '#b8b8d0';
    case 'fairy':
      return '#ee99ac';
    default:
      return '#000';
  }
};

const getProgressClass = statValue => {
  if (statValue >= 100) {
    return 'progress-1';
  } else if (statValue >= 80) {
    return 'progress-2';
  } else if (statValue >= 60) {
    return 'progress-3';
  } else if (statValue >= 40) {
    return 'progress-4';
  } else {
    return 'progress-5';
  }
};



window.addEventListener('click', e => {
  if (e.target === pokemonDetails) {
    pokemonDetails.style.display = 'none';
  }
});

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const pokemonCards = document.querySelectorAll('.pokemon-card');
  pokemonCards.forEach(card => {
    const name = card.querySelector('h3').innerText.toLowerCase();
    if (name.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});
