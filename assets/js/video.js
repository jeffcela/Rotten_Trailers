
var apiKey = 'AIzaSyC46Ga2DC556_V4JYsLVaCkqzQz0D_Roaw';
//var url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&type=video&q=dune&videotype=movie&key=${apiKey}`;
var fandangoChannel = "UCi8e0iOVk1fEOogdfu4YgfA";


// GET https://www.googleapis.com/youtube/v3/search


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
//var btn = document.getElementById("btn-search");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
/*function showTrailer() {
  modal.style.display = "block";

  // replace placeholder video with trailer
}*/

function callYouTube (trailerBtn) {
  var urlEl1 = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCi8e0iOVk1fEOogdfu4YgfA&maxResults=1&q=`;
  // urlElQuery = trailerBtn.movie;
  var urlElQuery = "Dune"; //this is a variable, it has to get set when the callYouTube function gets called
  var urlEl2 = `&key=` + apiKey;
  var url = urlEl1 + urlElQuery + urlEl2;
  
  console.log("from inside callYouTube: ");
  console.log(trailerBtn.dataset.movie);

  modal.style.display = "block";
  
  fetch(url)
  .then(response => {
      //console.log(response);
      // make the returning results into a JSON object
      return response.json();
  })
  .then(data => {
      // returns the search results object
      console.log(data);
      //console.log(data.items[0].snippet.channelId); 
      var videoIdentifier;
      /*var trailerVidIndex = data.items.findIndex(function (post, index) {
        console.log(index);
        console.log(data.items[index].snippet.channelID);
      if(data.items[index].snippet.channelID == fandangoChannel){
          return true; }
        });  
      if(trailerVidIndex >=0){
          var videoIdentifier = data.items[trailerVidIndex].videoId;
          } 
      else {
        if (trailerVidIndex < 0) {
            alert("No trailer found!");
          }
      };*/
      if (data.items[0].snippet.channelId == fandangoChannel){
        videoIdentifier = data.items[0].id.videoId;
      } else {
        alert("No trailer found!");
      };
      console.log(videoIdentifier);
      player.loadVideoById(videoIdentifier);
  })
}





// Loads code for iPlayer API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Creates iFrame and YouTube player
var player;
function onYouTubeIframeAPIReady() {
  console.log("API ready, preparing iFrame");
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    playerVars: {
      'playsinline': 1
    },
    events: {
      'onReady': onPlayerReady,
      //'onStateChange': onPlayerStateChange
    }
  });
  console.log(player);
}

// API calls function when player ready
function onPlayerReady(event) {
  //event.target.playVideo();
  console.log("onReady event has fired");
}

/*
function constructVideoUrl(videoIdentifier) {
  var videoUrl; // needs to be `https://www.youtube.com/embed/${videoIdentifier}`;
}
*/
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

