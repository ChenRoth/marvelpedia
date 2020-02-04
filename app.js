const API_KEY = 'xxx';
const state = {
    characters: [],
};

const ELEMENTS = {
    $searchForm: $('#search-form'),
};

main();
function main() {
    ELEMENTS.$searchForm.on('submit', onSubmitSearch);
}

function onSubmitSearch(e) {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    searchMarvelCharacters(name);
}

function searchMarvelCharacters(name) {
    $.ajax(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${name}&apikey=${API_KEY}`, {
        method: 'GET',
        success: (response) => {
            const characters = response.data.results.map(extractCharacterFromApiRespose);
            console.log({characters});
            state.characters = characters;
        }
    });
}

function extractCharacterFromApiRespose(characterData) {
    const wikiData = characterData.urls.find(url => url.type === 'wiki');
    return {
        id: characterData.id,
        name: characterData.name,
        image: [characterData.thumbnail.path, characterData.thumbnail.extension].join('.'),
        numOfComics: characterData.comics.available,
        wiki: wikiData ? wikiData.url : undefined,
    }
}
