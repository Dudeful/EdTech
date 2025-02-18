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
      <a id="title-${tab}" href="#${tab}">
        ${tab}
      </a>
    </li>`
	);

	//append the tabs content
	$('#tabs').append(`
    <div id="${tab}">
      ${landingVideo ? '<div id="player"></div>' : ''}
      <div class="accordion">
        <h3>Title</h3>
        <div class="video_title">
          <p>
          </p>
        </div>
        <h3>Duration</h3>
        <div class="video_duration">
          <p>
          </p>
        </div>
        <h3>URL</h3>
        <div class="video_url">
          <p>
          </p>
        </div>
        <h3>Video ID</h3>
        <div class="video_id">
          <p>
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

	$(`#title-tabs-${tab + 1}`).html(event.target.getVideoData().title);

	$(`#tabs-${tab + 1} > .accordion > .video_title > p`).html(
		event.target.getVideoData().title
	);

	$(`#tabs-${tab + 1} > .accordion > .video_duration > p`).html(
		parseInt(event.target.getDuration() / 60) +
			':' +
			(event.target.getDuration() % 60)
	);

	$(`#tabs-${tab + 1} > .accordion > .video_url > p`).html(
		`<a target='_blank' href="${event.target.getVideoUrl()}">
			${event.target.getVideoUrl()}
		</a>`
	);

	$(`#tabs-${tab + 1} > .accordion > .video_id > p`).html(
		event.target.getVideoData().video_id
	);
}
