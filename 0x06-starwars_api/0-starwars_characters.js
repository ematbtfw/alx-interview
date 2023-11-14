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
#!/usr/bin/node
const exec = require('child_process').exec;

let child = exec("timeout 60s ./0-starwars_characters.js 3", function(error, stdout, stderr) {
  if (error) console.log(error);
  listCharacters = ["Luke Skywalker", "C-3PO", "R2-D2", "Darth Vader", "Leia Organa", "Obi-Wan Kenobi", "Chewbacca", "Han Solo", "Jabba Desilijic Tiure", "Wedge Antilles", "Yoda", "Palpatine", "Boba Fett", "Lando Calrissian", "Ackbar", "Mon Mothma", "Arvel Crynyd", "Wicket Systri Warrick", "Nien Nunb", "Bib Fortuna"];
  
  stdoutLines = stdout.split("\n");
  for (let index = 0; (index < stdoutLines.length) && (listCharacters.length > 0); index++) {
      let line = stdoutLines[index];
      if (line != listCharacters[0]) {
        console.log(line + " instead of " + listCharacters[index]);
        break;
      }
      listCharacters.splice(0, 1);
  }

  if (listCharacters.length == 0) {
    process.stdout.write("OK");
  }
  else {
    console.log("Characters not found");
    console.log(listCharacters);
  }
});