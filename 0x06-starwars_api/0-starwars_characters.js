#!/usr/bin/node
const axios = require('axios');

const movieId = process.argv[2];
const apiUrl = `https://swapi.dev/api/films/${movieId}/`;

axios.get(apiUrl)
  .then(response => {
    const film = response.data;
    const characters = film.characters;

    const characterPromises = characters.map(characterUrl =>
      axios.get(characterUrl)
        .then(charResponse => charResponse.data.name)
        .catch(error => {
          console.error(`Error fetching character: ${error.message}`);
          return null;
        })
    );

    return Promise.all(characterPromises);
  })
  .then(characterNames => {
    const validCharacterNames = characterNames.filter(name => name !== null);
    validCharacterNames.forEach(name => console.log(name));
  })
  .catch(error => {
    console.error(`Error fetching movie details: ${error.message}`);
  });

// Add a newline at the end of the file
