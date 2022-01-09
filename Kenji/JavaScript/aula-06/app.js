const header = `
<header id="profile">
  <img src="images/profile_pic.png" />
  <h1>Danubio Müller</h1>
  <h3>28, Maringá - PR</h3>
</header>
`;

const briefing = `
<section id="briefing">
<h2>Montanhismo</h2>
<p>
  A prática do montanhismo envolve uma variedade de atividades outdoor que uma pessoa pode desempenhar
  em ambientes de montanhas/serras/morros. Apesar do termo "montanhismo" definir esse gênero de
  atividades outdoor, o montanhismo hoje engloba até mesmo atividades de
  trekking/hiking/camping/bushcrafting em regiões onde montanhas podem não necessariamente estarem
  presentes.
</p>
</section>
`;

const gallery = `
<section id="photos">
<h3>Galeria</h3>
<div id="gallery_container">
  <img src="images/pic_2.jpg" />
  <img src="images/pic_4.jpg" />
  <img src="images/pic_5.jpg" />
  <img src="images/pic_6.jpg" />
  <img src="images/pic_1.jpg" />
  <img src="images/pic_3.jpg" />
</div>
</section>
`;

const root = document.getElementById('root');

root.innerHTML = header + briefing + gallery;
