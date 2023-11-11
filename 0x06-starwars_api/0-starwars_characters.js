#!/usr/bin/node
const axios = require('axios');

const movieId = process.argv[2];
const apiUrl = `https://swapi-api.hbtn.io/api/films/${movieId}/`;

axios.get(apiUrl)
  .then(response => {
    const film = response.data;
    const characters = film.characters;

    const characterPromises = characters.map(characterUrl =>
      axios.get(characterUrl)
        .then(charResponse => charResponse.data.name)
    );

    return Promise.all(characterPromises);
  })
  .then(characterNames => {
    characterNames.forEach(name => console.log(name));
  })
  .catch(error => {
    console.error(error.message);
  });