var defaultURL = "https://movie-database-imdb-alternative.p.rapidapi.com/?i=tt4154796&r=json";

var queryTxtEl1 = "https://movie-database-imdb-alternative.p.rapidapi.com/?s=";
var queryTxtEl2 = "&page=1&r=json";

function searchMovie(searchQuery) {
    // creating a search URL by adding the URL to the API + the title being searched for + adding that we want 1 page of results as JSON
    var searchURL = queryTxtEl1 + searchQuery + queryTxtEl2;

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
        console.log(data.Search[0].Title);
    })
    .catch(err => {
        console.error(err);
    }); 
}

function clickSearchBtn(){
    // getting the search text box
    var searchBox = document.querySelector("#search-input");
    // getting the value inside the search text box
    var searchQuery = searchBox.value;
    searchMovie(searchQuery);
}

function createRecentBtn (searchParam) {
    var recentBtn = $("<button>");
    recentBtn.text(searchParam);
    recentBtn.attr("id", "btnSearch-recent");
    recentBtn.attr("onclick", "clickRecentBtn(this)");
    return recentBtn;
}

function clickRecentBtn(clickedBtn) {
    var searchedName = clickedBtn.text;
    searchMovie(searchedName);
}

function populateRecent () {
    // get the list of recent searches out of local storage
    var fromStorage = JSON.parse(localStorage.getItem("storedRecent"));
    if (fromStorage !== null) {
        return fromStorage;
    };
}