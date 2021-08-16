const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const pokemonsPromises = []
const generetaPromises = () => {
    Array(149).fill().map((_, i) => {
        pokemonsPromises.push(fetch(getPokemonUrl(i + 1)).then(resp => resp.json()) )
    })
    return pokemonsPromises
}

const generateHTML = pokemon => {
    return pokemon.reduce((acc, elem) => {
        const types = elem.types.map(typeInfo => typeInfo.type.name)
        acc += 
        `<li class='card ${types[0]}'> 
            <img class='card-image 'alt='${pokemon.name}' src="${elem.sprites.front_default}" >
            <h2 class='card-title'>${elem.id} ${elem.name}</h2>
            <p class='card-subtitle'>${types.join(' | ')}</p>
        </li>`
        return acc
    }, '')
}

const insertPokemon = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}

const fetchPokemon = () => {
    Promise.all(generetaPromises())
        .then(generateHTML)
        .then(insertPokemon)
}

fetchPokemon()