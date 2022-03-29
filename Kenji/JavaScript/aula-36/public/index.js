const names = [];

const getCharacterById = async () => {
	const characterId = document.getElementById('character_id').value;

	if (!Number.isInteger(Number(characterId)) || characterId < 1) {
		alert('ID must be an integer greater than 1!');
		return;
	}

	const response = await fetch(
		`https://rickandmortyapi.com/api/character/${characterId}`
	);

	const character = await response.json();

	if (character.error) {
		alert('no characters have been found for the provided id!');
		return;
	}

	console.log(character);

	names.push(character.name);

	getCharacterByName(names.pop());
};

const getCharacterByName = async (characterName) => {
	const response = await fetch(
		`https://rickandmortyapi.com/api/character/?name=${characterName}`
	);
	const charactersArray = await response.json();

	renderCharacters(charactersArray);
};

const renderCharacters = (charactersArray) => {
	const renderDiv = document.getElementById('render_character');
	renderDiv.innerHTML = '';

	charactersArray.results.forEach((character) => {
		renderDiv.innerHTML += `
    <div class="character">
      <h3>Name: <span class="character_info">${character.name}</span></h3>
      <img src="${character.image}">
      <h5>Gender: <span class="character_info">${character.gender}</span></h5>
      <h5>Origin: <span class="character_info">${character.origin.name}</span></h5>
      <h5>Location: <span class="character_info">${character.location.name}</span></h5>
      <h5>Species: <span class="character_info">${character.species}</span></h5>
      <h5>Status: <span class="character_info">${character.status}</span></h5>
    </div>
    `;
	});
};

const fetchButton = document.getElementById('fetch_character');
fetchButton.addEventListener('click', () => getCharacterById());
