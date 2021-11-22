const header = `
<header id="profile">
  <img src="images/profile_pic.png" />
  <h1>Danubio Müller</h1>
  <h3>28, Maringá - PR</h3>
</header>
`;

const briefing = `
<section id="briefing">
<h2>Robert Nesta Marley,</h2>
<p>
  mais conhecido como Bob Marley (Nine Mile, 6 de fevereiro de 1945 — Miami, 11 de maio de 1981), foi um cantor, 
  guitarrista e compositor jamaicano, o mais conhecido músico de reggae de todos os tempos, famoso por popularizar 
  internacionalmente o gênero. Sua obra tratava principalmente de temas político-sociais e espirituais. Dedicado a 
  protestar contra injustiças sociais, Bob Marley é mundialmente celebrado como a voz dos pobres e oprimidos, sendo 
  considerado um símbolo de resistência negra, espiritualidade e luta por justiça social. Suas músicas denunciavam o 
  racismo, a desigualdade social, o colonialismo e a guerra.
</p>
</section>
`;

const songs = `<ul id='best_songs'>
<h3>Melhores músicas</h3>
<li>
  <a href="https://youtu.be/kOFu6b3w6c0" target="_blank">Redemption Song</a>
</li>
<li>
  <a href="https://youtu.be/uMUQMSXLlHM" target="_blank">Buffalo Soldier</a>
</li>
<li>
  <a href="https://youtu.be/HNBCVM4KbUM" target="_blank">Three Little Birds</a>
</li>
<li>
  <a href="https://youtu.be/1hwL3S3Gtzs" target="_blank">Stir It Up</a>
</li>
<li>
  <a href="https://youtu.be/5Qe23LVs2O4" target="_blank">I Shot the Sheriff</a>
</li>
<li>
  <a href="https://youtu.be/RIMxmnfDSOs" target="_blank">Jamming</a>
</li>
<li>
  <a href="https://youtu.be/mZ6VezKMoRY" target="_blank">No Woman, No Cry</a>
</li>
<li>
  <a href="https://youtu.be/vdB-8eLEW8g" target="_blank">One Love</a>
</li>
</ul>`;

const gallery = `
<section id="photos">
<h3>Galeria</h3>
<div id="gallery_container">
  <img src="images/pic_2.jpg" />
  <img src="images/pic_4.jpg" />
  <img src="images/pic_5.jpg" />
  <img src="images/pic_1.jpg" />
  <img src="images/pic_3.jpg" />
</div>
</section>
`;

const root = document.querySelector('#root');

root.innerHTML = header + briefing + songs + gallery;
