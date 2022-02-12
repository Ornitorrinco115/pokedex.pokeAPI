const pokeContent = document.getElementById('pokemonContent');
let pokeForm = document.getElementById('searchPokemon');
let generationshow = 1
const modalSearch = document.getElementById('pokemonContent')
const divGeneration = document.getElementById('textGen')
/*Ordem das gerações*/
/*Primera Gen 1-151*/
/*Segunda Gen 152-251*/
/*tercera Gen 252-386*/


const request = new XMLHttpRequest()

request.open('GET', 'https://unpkg.com/pokemons@1.1.0/pokemons.json')

request.onload = function () {
    console.log(JSON.parse(this.responseText))
}

request.send()

function showPokemonGen(Região) {
    const pokemonGen = {
        Kanto: [1, 151],
        Johto: [152, 251],
        Hoenn: [252, 386]
    };

    const pokemonGenDefault = [1, 151];
    const generacion = pokemonGen[Região] || pokemonGenDefault;
    return generacion;

}

let pokemonGeneration = showPokemonGen(generationshow)


/*Mudança de generação*/

let arrowRight = document.getElementById('arrow-right').addEventListener('click', e => {

    if (generationshow < 4) {
        modalSearch.innerHTML = '';
        generationshow += 1
        pokemonGeneration = showPokemonGen(generationshow)
        divGeneration.innerHTML = 'Kanto ' + generationshow
        drawPokemon()
    }
})


let arrowleft = document.getElementById('arrow-left').addEventListener('click', e => {

    if (generationshow > 1) {
        modalSearch.innerHTML = '';
        generationshow -= 1
        pokemonGeneration = showPokemonGen(generationshow)
        divGeneration.innerHTML = 'Kanto', 'Johto'
        console.log(generationshow)
    }
})


const drawPokemon = async () => {
    for (let i = pokemonGeneration[0]; i <= pokemonGeneration[1]; i++) {
        await getPokemon(i);
    }
}


const getPokemon = async (id, modal) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const rest = await fetch(url);
    const pokemon = await rest.json();
    createPokemon(pokemon, modal);
}

/*cor do card pokemon*/
const colors = {
    fire: '#FFA05D',
    grass: '#8FD594',
    electric: '#FFE43B',
    water: '#7E97C0',
    ground: '#CAAC4D',
    rock: '#90642D',
    poison: '#9D5B9B',
    bug: '#EAFD71',
    dragon: '#97b3e6',
    psychic: '#FF96B5',
    flying: '#CDCDCD',
    fighting: '#FF5D5D',
    normal: '#FFFFFF',
    MegaEvolução: '#000'
}

const main_types = Object.keys(colors)

function createPokemon(pokemon, modal) {
    const pokemonEl = document.createElement('div');

    pokemonEl.classList.add('pokemon');

    const poke_types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const color = colors[type];
 

    pokemonEl.style.backgroundColor = color;



    if (modal !== true) {
        const pokeInnerHTML = `
        <div class="img-container">
            <img src="${
                pokemon.sprites.back_default
            }" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
                .toString()
                .padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Tipo: <span>${type}</span></small>
        </div>
    `;
        pokemonEl.innerHTML = pokeInnerHTML;
        pokeContent.appendChild(pokemonEl);
    }

    else {
        const pokeInnerHTML = `
        <div class="modal" id="modalPokemon">
        <div class="pokemon">
        <div class="img-container">
            <img src="https://unpkg.com/pokemons@1.1.0/pokemons.json"{
							pokemon.id
						}.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
                .toString()
                .padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Tipo: <span>${type}</span></small>
        </div>
        </div>
    
    </div>`;

    if (modal !== true) {
        const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://unpkg.com/pokemons@1.1.0/pokemons.json/$
                            pokemon.id
            }.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="Tipo">#${pokemon.id
                .toString()
                .padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Tipo: <span>${type}</span></small>
        </div>
    `;
        pokemonEl.innerHTML = pokeInnerHTML;
        pokeContent.appendChild(pokemonEl);
    }


        modalSearch.innerHTML = pokeInnerHTML;

    }
}

drawPokemon()


/*Buscar por pokemon*/

pokeForm.addEventListener('submit', e => {
    e.preventDefault();
    let searchPokemon = document.getElementById('pokemon','type', 'Região').value;
    getPokemon(searchPokemon, true);
})

function exitModal() {
    const modalPokemon = document.getElementById('modalPokemon');
    modalPokemon.style.display = 'none'
    drawPokemon()
}








