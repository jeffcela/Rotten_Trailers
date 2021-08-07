
var apiKey = 'AIzaSyC46Ga2DC556_V4JYsLVaCkqzQz0D_Roaw';
var url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&type=video&q=dune&videotype=movie&key=${apiKey}`;



// GET https://www.googleapis.com/youtube/v3/search


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("btn-search");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
function showTrailer() {
  modal.style.display = "block";

  // replace placeholder video with trailer
}

function callYouTube () {
  fetch(url)
  .then(response => {
      //console.log(response);
      // make the returning results into a JSON object
      return response.json();
  })
  .then(data => {
      // returns the search results object
      console.log(data);
      console.log(data.items[0].snippet.channelId); 
      var videoIdentifier = data.items[0].videoId
      // document.getElementById("testing").setAttribute("")
  })
}

/* async function getTrailer() {
  if (data.items[0].snippet.channelId === UCi8e0iOVk1fEOogdfu4YgfA) {

  }
  if (data.items[0].snippet.channelTitle = )
} */


callYouTube();

/*

// Loads code for iPlayer API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Creates iFrame and YouTube player
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    playerVars: {
      'playsinline': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// API calls function when player ready
function onPlayerReady(event) {
  event.target.playVideo();
}
*/

function constructVideoUrl(videoIdentifier) {
  var videoUrl
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

