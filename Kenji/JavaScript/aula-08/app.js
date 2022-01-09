const root = document.querySelector('#root');

///////////////////----HEADER----////////////////////
const header = document.createElement('header');
const header_img = document.createElement('img');
const header_name = document.createElement('h1');
const header_info = document.createElement('h3');

header.setAttribute('id', 'profile');
header_img.src = 'images/profile_pic.png';
header_name.innerText = 'Danubio Müller';
header_info.innerText = '28, Maringá - PR';

///////////////////----BRIEFING----////////////////////
const briefing = document.createElement('section');
const brifing_title = document.createElement('h2');
const brifing_paragraph = document.createElement('p');

briefing.setAttribute('id', 'briefing');
brifing_title.innerText = 'Chimpanzés';
brifing_paragraph.innerText = `fazem parte da família Hominidae, possuindo uma semelhança genética de cerca de 99% com os humanos. Medem entre 75 cm e 95 cm, e seu peso varia entre 30 e 55 kg. A coloração negra de seus pelos modifica-se para uma cor acinzentada conforme a idade avança.
Os chimpanzés vivem em grupos que podem variar de cinco até mais de cem indivíduos, aquando no seu estado natural. Contudo, as fêmeas possuem hábitos mais solitários, passando a maior parte do tempo sozinhas. Nestes grupos os machos são dominantes sobre as fêmeas, assim como sobre os machos mais jovens.
São animais de hábitos diurnos, terrestres e arborícolas. Costumam-se locomover pelo solo, no entanto tem o preferência a se alimentarem sobre as árvores, durante o dia. Estes são primatas quadrúpedes, ou seja, locomovem-se utilizando os pés e as mãos, simultaneamente, para andar e correr, além de serem capazes de escalar, pular e ficarem suspensos. Além disso, ocasionalmente, podem se movimentar de forma bípede, tal como os humanos. Geograficamente estão distribuídos nas florestas e matas secas de savana, e nas florestas tropicais de áreas baixas até áreas montanhosas, superiores a 3000 metros de altitude, na região central do continente africano.
Os chimpanzés possuem uma alimentação bem variada, sendo as frutas o principal alimento de sua dieta, porém também consomem folhas, flores, sementes e insetos, como formigas, cupins e larvas. Em certas ocasiões também se alimentam de carne, variando de pequenos antílopes a outras espécies de primatas, como o Colobus.
Estes animais, aparentemente, possuem culturas diferentes, dependendo da região em que vivem, assim como os humanos, e são capazes de ensiná-las de uma geração para outra. Entre tais ensinamentos estão, por exemplo, técnicas para extrair cupins de seus cupinzeiros, utilizando-se de gravetos; utilização de pedras para quebrarem sementes e frutos duros; e outros tipos de ferramentas adaptadas, usadas inclusive para caçar alguns pequenos mamíferos.`;

///////////////////----IFRAME----////////////////////
const documentary = document.createElement('iframe');
documentary.src = 'https://www.youtube.com/embed/mvS3f8SE76I';
documentary.setAttribute('allowfullscreen', null);
documentary.setAttribute('frameborder', 0);

///////////////////----GALLERY----////////////////////
const gallery = document.createElement('section');
const gallery_title = document.createElement('h3');
const gallery_container = document.createElement('div');
const photos = 2;

gallery.setAttribute('id', 'photos');
gallery_title.innerText = 'Galeria';
gallery_container.setAttribute('id', 'gallery_container');

///////////////////----POPULATING DOM----////////////////////
function fillHeader() {
  header.appendChild(header_img);
  header.appendChild(header_name);
  header.appendChild(header_info);
  root.appendChild(header);
}

function fillBriefing() {
  briefing.appendChild(brifing_title);
  briefing.appendChild(brifing_paragraph);
  root.appendChild(briefing);
}

function fillDocumentary() {
  root.appendChild(documentary);
}

function fillGallery() {
  gallery.appendChild(gallery_title);
  gallery.appendChild(gallery_container);

  for (let i = 1; i <= photos; i++) {
    let image = document.createElement('img');
    image.src = `images/pic_${i}.jpg`;
    gallery_container.appendChild(image);
  }

  root.appendChild(gallery);
}

fillHeader();
fillBriefing();
fillDocumentary();
fillGallery();
