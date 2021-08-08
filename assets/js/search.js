var defaultURL = "https://movie-database-imdb-alternative.p.rapidapi.com/?i=tt4154796&r=json";
var fromStorage = [];
// queryTxtEl1 is a default search that searches by a name
var queryTxtEl1 = "https://movie-database-imdb-alternative.p.rapidapi.com/?s=";
// queryTxtEl1b is a search by IMDB ID
var queryTxtEl1b = "https://movie-database-imdb-alternative.p.rapidapi.com/?i=";
// queryTxtEl2 is an optional paramter that determines if the search returns movies, series, or episodes. this can be changed when the page changes from regular search to tv
var queryTxtEl2 = "&type=movie";
// queryTxtEl3 is returning the 1st page of results and as a json, and is added to the end of the URL
var queryTxtEl3 = "&page=1&r=json";
var listRecent = document.querySelector("#list-recent");
var resultCards = document.querySelector("#resultCards");
// as the Search button does only one thing, it was more efficient to add the even listener on one line than define a variable for the button
document.getElementById("btn-search").addEventListener("click", clickSearchBtn);

function searchMovie(searchQuery) {
    /* creating a search URL by adding the URL to the API + the title being searched for + adding that we want 1 page of results as JSON
    We need to use queryTxtEl1 first, to get the list of movie names and IMDB ID's
    populate an array[up to 5] of objects with the movie name and IMDB ID's
    Call a 
    */
    var searchURL = queryTxtEl1 + searchQuery + queryTxtEl2 + queryTxtEl3;
    searchURL = searchURL.replace(" ", "%20");
    console.log(searchURL);
    // this fetch part requires the headers to be used
    fetch(searchURL, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "e3ff15896amsh9db6024de9b3d2ap1a6df9jsn7a0527f74de8",
            "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
        }
    })
    .then(response => {
        //console.log(response);
        // make the returning results into a JSON object
        return response.json();
    })
    .then(data => {
        // returns the search results object
        // console.log(data);
        // all of the results are encapsulated in an array called Search
        // console.log(data.Search[0].Title);
        /* This would cycle through all search results. We want to currently limit it to 5 or less, so will use a for loop instead
        data.Search.forEach(function(movie, index) {
            // sends a single movie object to the populateResult function
            populateResult(movie);
        })*/

        /* if the data.search.length is less than 5
            for (i=0;i<=data.search.length;i++){
                fetch the movie object by data.search[i].imdbID
                .then make the return into a JSON object
                .then pass the imdbIDResult object into populateResult
            }
            else the data.search.length is 5 or more{
                for (i=0;i<=4;i++){
                    fetch the movie object by data.search[i].imdbID
                    .then make the return into a JSON object
                    .then pass the imdbIDResult object into populateResult()
                }
            }
        This doesn't work
        if (data.Search.length < 5){
            for(var i=0;i<=data.Search.length;i++){
                var searchURLbyID = queryTxtEl1b + data.Search[i].imdbID + queryTxtEl2 + queryTxtEl3;
                fetch(searchURLbyID, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": "e3ff15896amsh9db6024de9b3d2ap1a6df9jsn7a0527f74de8",
                        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
                    }
                })
                .then(response => {
                    return response.json();
                })
                .then(movieData => {
                    populateResult(movieData);
                });
            };
        } else {
            for(var i=0;i<=4;i++){
                var searchURLbyID = queryTxtEl1b + data.Search[i].imdbID + queryTxtEl2 + queryTxtEl3;
                console.log(searchURLbyID);
                fetch(searchURLbyID, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": "e3ff15896amsh9db6024de9b3d2ap1a6df9jsn7a0527f74de8",
                        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
                    }
                })
                .then(response => {
                    return response.json();
                })
                .then(movieData => {
                    populateResult(movieData);
                });
            };

        }
    
        if (data.Search.length < 5){
            // this is if the number of Search objects is less than 5
            for (var i=0;i<=data.Search.length;i++){
                populateResult(data.Search[i]);
            }} else {
                // this is if the number of Search objects is more than 5
                for (var i=0;i<=4;i++){
                    populateResult(data.Search[i]);
                }
            }*/
        fetchForIMDBID(data);
        createRecentBtn(searchQuery);
    })
    .catch(err => {
        console.error(err);
    }); 
};

async function fetchForIMDBID(allMovies){
    var searchURLbyID = " ";
    var response;
    var imdbMovie;
    if (allMovies.Search.length < 5){
            for(var i=0;i<=allMovies.Search.length;i++){
                searchURLbyID = queryTxtEl1b + allMovies.Search[i].imdbID + queryTxtEl2 + queryTxtEl3;
                response = await fetch(searchURLbyID, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": "e3ff15896amsh9db6024de9b3d2ap1a6df9jsn7a0527f74de8",
                        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
                    }
                });
                imdbMovie = await response.json();
                populateResult(imdbMovie);
                };
        } else {
            for(var i=0;i<=4;i++){
                searchURLbyID = queryTxtEl1b + allMovies.Search[i].imdbID + queryTxtEl2 + queryTxtEl3;
                console.log(searchURLbyID);
                response = await fetch(searchURLbyID, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-key": "e3ff15896amsh9db6024de9b3d2ap1a6df9jsn7a0527f74de8",
                        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
                    }
                });
                
                imdbMovie = await response.json();
                populateResult(imdbMovie);
            };
        };
}

function clickSearchBtn(){
    // getting the search text box
    var searchBox = document.querySelector("#search-input");
    // getting the value inside the search text box
    var searchQuery = searchBox.value;

    if (searchQuery != null){
        // add the search title to the fromStorage array and save it
        if (fromStorage == null){
            fromStorage = [searchQuery];
            localStorage.setItem("storedRecent", JSON.stringify(fromStorage));

            searchMovie(searchQuery);
            createRecentBtn(searchQuery);
        } else{
            fromStorage.push(searchQuery);
            localStorage.setItem("storedRecent", JSON.stringify(fromStorage));

            searchMovie(searchQuery);
            createRecentBtn(searchQuery);
        }
    } else{
        alert("Please enter a search query!")
    }
};

function createRecentBtn (searchParam) {
    // this creates a new Recent Button
    var recentLI = document.createElement("li");
    var recentBtn = document.createElement("button");
    recentBtn.innerText = searchParam;
    recentBtn.setAttribute("id", "btnSearch-recent");
    recentBtn.setAttribute("onclick", "clickRecentBtn(this)");

    // this appends the button to the list item, then the list item to the Recent List
    recentLI.appendChild(recentBtn);
    listRecent.appendChild(recentLI);
};

function clickRecentBtn(clickedBtn) {
    var searchedName = clickedBtn.innerText;
    searchMovie(searchedName);
};

function populateRecent () {
    // get the list of recent searches out of local storage
    fromStorage = JSON.parse(localStorage.getItem("storedRecent"));
    if (fromStorage !== null) {
        fromStorage.forEach(function(searchTerm, index){
            createRecentBtn(searchTerm);
        })
    } else {
        console.log("Nothing in local storage");
    };
    
};

function populateResult (movieData) {
    // populate the results, movieData is an object that contains all of the info from IMDB
    // var searchURLbyID = queryTxtEl1b + movieData.imdbID + queryTxtEl2 + queryTxtEl3;
    // resultCard is the overall card for a given movie, with a class=card
    var resultCard = document.createElement("div");
    // cardTitle is the movie name and score; has a span(spanTitle) and p(pViewScore), with a class="card-content #b71c1c red darken-4"
    var cardTitle = document.createElement("div");
    // spanTitle contains the movie name as text, appends to cardTitle, with a class="card-title white-text"
    var spanTitle = document.createElement("span");
    // pViewScore contains the RottenTomatoes score, appends to cardTitle, class="white-text", text starts with "Freshness Score: "
    var pViewScore = document.createElement("p");
    // cardAction contains the Watch Trailer and Watch Later, class="card-action"
    var cardAction = document.createElement("div");
    // watchTrailer is an anchor with a id="myBtn" data-movie="movieData.Title" href="#" onClick="watchTrailer()"
    var watchTrailer = document.createElement("a");
    // watchLater is an anchor with a href="#"
    var watchLater = document.createElement("a");


    /*
    fetch(searchURLbyID, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "e3ff15896amsh9db6024de9b3d2ap1a6df9jsn7a0527f74de8",
            "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log("searchURLbyID result: " + data);
        resultCard.setAttribute("class", "card");

        cardTitle.setAttribute("class", "card-content #b71c1c red darken-4")
    
        spanTitle.textContent = movieData.Title;
        spanTitle.setAttribute("class", "card-title white-text");
    
        pViewScore.setAttribute("class", "white-text");
        pViewScore.textContent = "Freshness Score: " + data.Ratings[1].Value;

        cardAction.setAttribute("class", "card-action");

        watchTrailer.setAttribute("id", "myBtn");
        watchTrailer.setAttribute("data-movie", movieData.Title);
        watchTrailer.setAttribute("href", "#");
        watchTrailer.setAttribute("onClick", "callYouTube()");

        watchLater.setAttribute("href", "#");

        // attach the spanTitle (movie name) and pViewScore (movie score) to the cardTitle
        cardTitle.appendChild(spanTitle);
        cardTitle.appendChild(pViewScore);
        // attach the watchTrailer and watchLater to the cardAction
        cardAction.appendChild(watchTrailer);
        cardAction.appendChild(watchLater);
        // attach all to resultCards
        resultCard.appendChild(cardTitle);
        resultCard.appendChild(cardAction);
        // attached the completed card to the hook in the HTML, resultCards
        resultCards.appendChild(resultCard);
    })
*/
        resultCard.setAttribute("class", "card");

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
        
        cardAction.setAttribute("class", "card-action");

        watchTrailer.setAttribute("id", "myBtn");
        watchTrailer.setAttribute("data-movie", movieData.Title);
        watchTrailer.setAttribute("href", "#");
        watchTrailer.setAttribute("onClick", "callYouTube()");

        watchLater.setAttribute("href", "#");

        // attach the spanTitle (movie name) and pViewScore (movie score) to the cardTitle
        cardTitle.appendChild(spanTitle);
        cardTitle.appendChild(pViewScore);
        // attach the watchTrailer and watchLater to the cardAction
        cardAction.appendChild(watchTrailer);
        cardAction.appendChild(watchLater);
        // attach all to resultCards
        resultCard.appendChild(cardTitle);
        resultCard.appendChild(cardAction);
        // attached the completed card to the hook in the HTML, resultCards
        resultCards.appendChild(resultCard);
    
}

// this has to run when the page loads in order to populate fromStorage and not accidentally clear storedRecent
populateRecent();