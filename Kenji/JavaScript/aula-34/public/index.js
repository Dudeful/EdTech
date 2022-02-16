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
	$('.accordion').accordion({ heightStyle: 'content' });
});

const handleTabClick = (event) => {
	//remove old iframe before adding new one.qq
	//needs to be improved in order to reuse old iframes.
	$('#player').remove();

	const video = event.target.href.slice(-1);

	//add the iframe to tab content only when user clicks on the given tab
	$(`#tabs-${video}`).prepend(`
    <iframe id="player" type="text/html" width="640" height="360" src="http://www.youtube.com/embed/${
			videosArray[video - 1]
		}?enablejsapi=1" frameborder="0"></iframe>
  `);

	createPlayer(videosArray[video - 1]);
	window.videoTab = `tabs-${video}`;
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
          <p class="video_title">
          </p>
        </div>
        <h3>Stats</h3>
        <div>
          <p class="video_duration">
          </p>
        </div>
        <h3>URL</h3>
        <div>
          <p class="video_url">
          </p>
        </div>
        <h3>Video ID</h3>
        <div>
          <p class="video_id">
          </p>
        </div>
      </div>
    </div>
  `);
};

function onYouTubeIframeAPIReady(videoId = videosArray[0]) {
	createPlayer(videoId);
}

var player;
const createPlayer = (videoId) => {
	if (player) player.destroy();

	player = new YT.Player('player', {
		height: '360',
		width: '640',
		videoId: videoId,
		events: {
			onReady: onPlayerReady,
			// onStateChange: onPlayerStateChange,
		},
	});
};

function onPlayerReady(event) {
	const tab = videosArray.indexOf(
		event.target.getVideoData().video_id
	);

	console.log(`#tabs-${tab}`);

	$(`#tabs-${tab} > .video_title`).html(
		event.target.getVideoData().title
	);

	$(`#tabs-${tab} > .video_duration`).html(
		event.target.getDuration()
	);

	$(`#tabs-${tab} > .video_url`).html(event.target.getVideoUrl());

	$(`#tabs-${tab} > .video_id`).html(
		event.target.getVideoData().video_id
	);
}
