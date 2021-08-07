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
        console.log(data);
        // all of the results are encapsulated in an array called Search
        // console.log(data.Search[0].Title);
        /* This would cycle through all search results. We want to currently limit it to 5 or less, so will use a for loop instead
        data.Search.forEach(function(movie, index) {
            // sends a single movie object to the populateResult function
            populateResult(movie);
        })*/
        if (data.Search.length < 5){
            // this is if the number of Search objects is less than 5
            for (var i=0;i<=data.Search.length;i++){
                populateResult(data.Search[i]);
            }} else {
                // this is if the number of Search objects is more than 5
                for (var i=0;i<=4;i++){
                    populateResult(data.Search[i]);
                }
            }
    })
    .catch(err => {
        console.error(err);
    }); 
};

function clickSearchBtn(){
    // getting the search text box
    var searchBox = document.querySelector("#search-input");
    // getting the value inside the search text box
    var searchQuery = searchBox.value;
    // add the search title to the fromStorage array and save it
    fromStorage.push(searchQuery);
    localStorage.setItem("storedRecent", JSON.stringify(fromStorage));

    searchMovie(searchQuery);
    createRecentBtn(searchQuery);
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
    var searchURLbyID = queryTxtEl1b + movieData.imdbID + queryTxtEl2 + queryTxtEl3;
    var resultCard = document.createElement("div");
    var cardTitle = document.createElement("div");
    var spanTitle = document.createElement("span");
    var pViewScore = document.createElement("p");
    var cardAction = document.createElement("div");
    var watchTrailer = document.createElement("a");
    var watchLater = document.createElement("a");

    console.log(searchURLbyID);
    
    spanTitle.textContent = movieData.Title;

    
    
}

// this has to run when the page loads in order to populate fromStorage and not accidentally clear storedRecent
populateRecent();