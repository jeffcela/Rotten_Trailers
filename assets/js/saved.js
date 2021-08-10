var fromStorageMovie = [];
// queryTxtEl1 is a default search that searches by a name
//var queryTxtEl1 = "https://movie-database-imdb-alternative.p.rapidapi.com/?s=";
// queryTxtEl1b is a search by IMDB ID
//var queryTxtEl1b = "https://movie-database-imdb-alternative.p.rapidapi.com/?i=";
// queryTxtEl2 is an optional paramter that determines if the search returns movies, series, or episodes. this can be changed when the page changes from regular search to tv
//var queryTxtEl2 = "&type=movie";
// queryTxtEl3 is returning the 1st page of results and as a json, and is added to the end of the URL
//var queryTxtEl3 = "&page=1&r=json";
var watchCards = document.querySelector("#watchCards");

function createWatchCard (movieData) {
    // populate the Watch Later Cards, movieData is an object that contains all of the info from IMDB
    // watchCard is the overall card for a given movie, with a class=card
    var watchCard = document.createElement("div");
    // cardTitle is the movie name and score; has a span(spanTitle) and p(pViewScore), with a class="card-content #b71c1c red darken-4"
    var cardTitle = document.createElement("div");
    // spanTitle contains the movie name as text, appends to cardTitle, with a class="card-title white-text"
    var spanTitle = document.createElement("span");
    // pViewScore contains the RottenTomatoes score, appends to cardTitle, class="white-text", text starts with "Freshness Score: "
    var pViewScore = document.createElement("p");
    // pDirector contains the director information, appends to cardTitle, class="white-text", text starts with "Director: "
    var pDirector = document.createElement("p");
    // cardAction contains the Watch Trailer and Remove, class="card-action"
    var cardAction = document.createElement("div");
    // watchTrailer is an anchor with a id="myBtn" data-movie="movieData.Title" href="#" onClick="callYouTube(this)"
    var watchTrailer = document.createElement("a");
    // remCard is an anchor with a data-movie="movieData.Title" href="#" onClick="removeCard(this)"
    var remCard = document.createElement("a");

    watchCard.setAttribute("class", "card");

    cardTitle.setAttribute("class", "card-content #b71c1c red darken-4")
    
    spanTitle.textContent = movieData.Title;
    spanTitle.setAttribute("class", "card-title white-text");
    pViewScore.setAttribute("class", "white-text");
    // error catching has to happen here in case there are no Ratings
    if (movieData.Ratings == null){
        pViewScore.textContent = "No Score"
    } else if (movieData.Ratings.length == 1){
        pViewScore.textContent = "IMDB Score: " + movieData.Ratings[0].Value;
    } else {
    pViewScore.textContent = "Freshness Score: " + movieData.Ratings[1].Value;
    };
    pDirector.setAttribute("class", "white-text");
    pDirector.textContent = "Director: " + movieData.Director;
        
    cardAction.setAttribute("class", "card-action");

    watchTrailer.setAttribute("id", "myBtn");
    watchTrailer.setAttribute("data-movie", movieData.Title);
    watchTrailer.setAttribute("href", "#");
    watchTrailer.setAttribute("onClick", "callYouTube(this)");
    watchTrailer.textContent = "Watch Trailer";

    remCard.setAttribute("href", "#");
    remCard.setAttribute("data-movie", movieData.Title);
    remCard.setAttribute("onClick", "removeCard(this)");
    remCard.textContent = "Remove";

    // attach the spanTitle (movie name) and pViewScore (movie score) to the cardTitle
    cardTitle.appendChild(spanTitle);
    cardTitle.appendChild(pViewScore);
    cardTitle.appendChild(pDirector);
    // attach the watchTrailer and watchLater to the cardAction
    cardAction.appendChild(watchTrailer);
    cardAction.appendChild(remCard);
    // attach all to resultCards
    watchCard.appendChild(cardTitle);
    watchCard.appendChild(cardAction);
    // attached the completed card to the hook in the HTML, watchCards
    watchCards.appendChild(watchCard);
    
}

function populateWatchLater () {
    // get the list of recent searches out of local storage
    fromStorageMovie = JSON.parse(localStorage.getItem("storedRecent"));
    if (fromStorageMovie !== null) {
        fromStorageMovie.forEach(function(searchTerm, index){
            createWatchCard(searchTerm);
        })
    } else {
        console.log("Nothing in local storage");
    };
};

populateWatchLater();