const API_KEY = 'xxx';
const state = {
    characters: [],
};

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
