const write_phrases = () => {
  document.getElementById('blackboard').innerHTML = '';

  let blackboardWidth = window.innerWidth * 0.74;
  let x = blackboardWidth / 245;

  console.log(x);

  let i = 0;
  const nPhrases = document.getElementById('n_phrases').value;

  while (i < nPhrases) {
    document.getElementById('blackboard').innerHTML += `
      <span class="bart_word">A verdade não está la fora</span>
    `;
    i++;
  }
};
