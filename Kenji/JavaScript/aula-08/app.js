const header = `
<header id="profile">
  <img src="images/profile_pic.png" />
  <h1>Danubio Müller</h1>
  <h3>28, Maringá - PR</h3>
</header>
`;

const briefing = `
<section id="briefing">
  <h2>Chimpanzés</h2>
  <p>
    fazem parte da família Hominidae, possuindo uma semelhança genética de cerca de 99% com os humanos. 
    Medem entre 75 cm e 95 cm, e seu peso varia entre 30 e 55 kg. A coloração negra de seus pelos modifica-se para uma cor 
    acinzentada conforme a idade avança.
    Os chimpanzés vivem em grupos que podem variar de cinco até mais de cem indivíduos, aquando no seu estado natural. 
    Contudo, as fêmeas possuem hábitos mais solitários, passando a maior parte do tempo sozinhas. Nestes grupos os machos 
    são dominantes sobre as fêmeas, assim como sobre os machos mais jovens.
    São animais de hábitos diurnos, terrestres e arborícolas. Costumam-se locomover pelo solo, no entanto tem o preferência 
    a se alimentarem sobre as árvores, durante o dia. Estes são primatas quadrúpedes, ou seja, locomovem-se utilizando os 
    pés e as mãos, simultaneamente, para andar e correr, além de serem capazes de escalar, pular e ficarem suspensos. 
    Além disso, ocasionalmente, podem se movimentar de forma bípede, tal como os humanos. Geograficamente estão distribuídos 
    nas florestas e matas secas de savana, e nas florestas tropicais de áreas baixas até áreas montanhosas, superiores a 3000 
    metros de altitude, na região central do continente africano.
    Os chimpanzés possuem uma alimentação bem variada, sendo as frutas o principal alimento de sua dieta, porém também 
    consomem folhas, flores, sementes e insetos, como formigas, cupins e larvas. Em certas ocasiões também se alimentam de 
    carne, variando de pequenos antílopes a outras espécies de primatas, como o Colobus.
    Estes animais, aparentemente, possuem culturas diferentes, dependendo da região em que vivem, assim como os humanos, 
    e são capazes de ensiná-las de uma geração para outra. Entre tais ensinamentos estão, por exemplo, técnicas para extrair 
    cupins de seus cupinzeiros, utilizando-se de gravetos; utilização de pedras para quebrarem sementes e frutos duros; 
    e outros tipos de ferramentas adaptadas, usadas inclusive para caçar alguns pequenos mamíferos.
  </p>
</section>
`;

const documentary = document.createElement('iframe');
documentary.src = 'https://www.youtube.com/embed/mvS3f8SE76I';
documentary.setAttribute('allowfullscreen', null);
documentary.setAttribute('frameborder', 0);

const gallery = `
<section id="photos">
  <h3>Galeria</h3>
  <div id="gallery_container">
    <img src="images/pic_1.jpg" />
    <img src="images/pic_2.jpg" />
  </div>
</section>
`;

function populateDOM(header, briefing, documentary, gallery) {
  const root = document.querySelector('#root');

  root.innerHTML = header + briefing + gallery;

  const galleryElement = document.querySelector('#photos');
  galleryElement.parentNode.insertBefore(documentary, galleryElement);
}

populateDOM(header, briefing, documentary, gallery);
