const videosArray = [
	'ak3ma7wtE_0',
	'K1R4hHq8yr4',
	'ZYZsJYZVt5g',
	'pIWh28WPyxQ',
	'-U_IRXhodds',
	'78VWWyPDmss',
];

$(document).ready(() => {
	$('#root').html(`
    <h1 id="title">can you name it?</h1>
    <div id="tabs">
      <ul></ul>
    </div>
  `);

	//render landing tab
	renderTabContents('tabs-1', true);
	//render the other tabs
	renderTabs();

	$('.tabs').click(() => handleTabClick(event));
	$('#tabs').tabs();
	$('.accordion').accordion();
});

const handleTabClick = (event) => {
	//remove old iframe before adding new one.
	//needs to be improved in order to reuse old iframes.
	$('#player').remove();

	const video = event.target.href.split('-').at(-1);

	//add the iframe to tab content only when user clicks on the given tab
	$(`#tabs-${video}`).prepend(`
    <iframe id="player" rel=0 controls=0 modestbranding=1 loop=1 autoplay=1 type="text/html" width="640" height="360" src="http://www.youtube.com/embed/${
			videosArray[video - 1]
		}?enablejsapi=1" frameborder="0"></iframe>
  `);
};

const renderTabs = () => {
	//render a new tab for each video in the videosArray
	videosArray.forEach((video, index) => {
		//skip the first tab because it has already been rendered on page load
		if (index === 0) return;
		renderTabContents(`tabs-${index + 1}`);
	});
};

//populate the tabs with its specific content
const renderTabContents = (tab, landingVideo) => {
	const title = 'xpto';
	const description = 'hellofriend';
	const stats = '123 views';

	//append the tab marker
	$('#tabs > ul').append(
		`<li class='tabs'>
      <a href="#${tab}">
        ${tab}
      </a>
    </li>`
	);

	//append the tabs content
	$('#tabs').append(`
    <div id="${tab}">
      ${landingVideo ? '<div id="player"></div>' : ''}
      <div class="accordion">
        <h3>Description</h3>
        <div>
          <p>
            ${description}
          </p>
        </div>
        <h3>Stats</h3>
        <div>
          <p>
            ${stats}
          </p>
        </div>
      </div>
    </div>
  `);
};

var player;
function onYouTubeIframeAPIReady(videoId = videosArray[0]) {
	player = new YT.Player('player', {
		height: '360',
		width: '640',
		videoId: videoId,
	});
	console.log(player);
}
