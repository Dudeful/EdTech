const write_phrases = () => {
  document.getElementById('blackboard').innerHTML = '';

  let blackboardWidth = window.innerWidth * 0.74;
  let phrasesPerRow = parseInt(blackboardWidth / 245);
  let totalPhrases = 11 * phrasesPerRow;

  console.log(phrasesPerRow);

  const nPhrases = document.getElementById('n_phrases').value;

  if (nPhrases <= totalPhrases) {
    let i = 0;

    while (i < nPhrases) {
      document.getElementById('blackboard').innerHTML += `
      <span class="bart_phrase">A verdade não está la fora</span>
      `;
      i++;
    }
  } else {
    let i = 0;

    while (i < nPhrases % totalPhrases) {
      document.getElementById('blackboard').innerHTML += `
      <span class="bart_phrase">A verdade não está la fora</span>
      `;
      i++;
    }
  }
};
