fetch("https://movie-database-imdb-alternative.p.rapidapi.com/?i=tt4154796&r=json", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "e3ff15896amsh9db6024de9b3d2ap1a6df9jsn7a0527f74de8",
		"x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
	}
})
.then(response => {
	//console.log(response);
    return response.json();
})
.then(data => {
    console.log(data);
})
.catch(err => {
	console.error(err);
});

