const write_phrases = () => {
  document.getElementById('blackboard').innerHTML = '';

  let blackboardWidth = window.innerWidth * 0.74;
  let phrasesPerRow = parseInt(blackboardWidth / 245);
  let totalPhrases = 11 * phrasesPerRow;

  const nPhrases = document.getElementById('n_phrases').value;

  if (nPhrases <= totalPhrases) {
    let i = 0;

    while (i < nPhrases) {
      document.getElementById('blackboard').innerHTML += `
      <span class="bart_phrase">A verdade não está la fora</span>
      `;
      i++;
    }

    document.getElementById('erased').innerHTML = `
      <h4>O quadro foi apagado 0 vezes</h4>
      <h4>Foram escritas ${Math.ceil(nPhrases / phrasesPerRow)} linhas</h4>
    `;
  } else {
    let i = 0;

    while (i < nPhrases % totalPhrases) {
      document.getElementById('blackboard').innerHTML += `
      <span class="bart_phrase">A verdade não está la fora</span>
      `;
      i++;
    }

    document.getElementById('erased').innerHTML = `
      <h4>O quadro foi apagado ${Math.floor(nPhrases / totalPhrases)} vezes</h4>
      <h4>Foram escritas ${Math.ceil((nPhrases % totalPhrases) / phrasesPerRow)} linhas</h4>
    `;
  }
};
