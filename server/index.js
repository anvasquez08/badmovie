var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var axios = require('axios')
var helpers = require('./database.js')

var app = express();
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())


app.post('/search', function(req, res) {
    let genre = req.body.id;

    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=aa8056f9f79463ab5d880d70ca88ad4e&language=en-US&sort_by=vote_count.asc&include_adult=false&include_video=false&page=1&with_genres=${genre}`)
    .then((response) => {
    	console.log('this is the response.data', response.data.results)
    	let arr = [];
    	var data = response.data.results;

    	for (var i = 0; i < data.length; i++) {
	    	var obj = {};
	    	obj.genre_ids   = data[i].genre_ids 
	    	obj.id 				  = data[i].id
	    	obj.title			  = data[i].title
	    	obj.poster_path = data[i].poster_path
	    	obj.release_date = data[i].release_date
	    	obj.vote_average = data[i].vote_average
	    	arr.push(obj)
    	}

    	res.send(arr)
    })
    .catch((err) => console.log('search by genre err: ', err))
})


app.get('/genres', function(req, res) {
    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=aa8056f9f79463ab5d880d70ca88ad4e&language=en-US')
    .then((response) => res.send(response.data.genres))
    .catch((err) => console.log('genre get error:', err))
})

app.post('/save', function(req, res) {
	console.log(req.body)

	helpers.getAllFavorites((err, data) => {
		console.log(err)
		console.log(data)
		res.send(data)
	})

	// res.send('post for /save request')
})

app.post('/delete', function(req, res) {

})
app.listen(3000, function() {
  console.log('listening on port 3000!');
});


//GET /genres
// make an axios request to get the list of official genres
// from this endpoint https://developers.themoviedb.org/3/genres/get-movie-list which needs your api key send back
// EXAMPLE: https://api.themoviedb.org/3/movie/550?api_key=aa8056f9f79463ab5d880d70ca88ad4e
// MY API KEY: aa8056f9f79463ab5d880d70ca88ad4e


//GET /search
    // get the search genre     
    // https://www.themoviedb.org/account/signup
    // use this endpoint to search for movies by genres, you will need an API key
    // https://developers.themoviedb.org/3/discover/movie-discover
    // and sort them by horrible votes using the search parameters in the API


    // Due to express, when you load the page, it doesnt make a get request to '/', it simply serves up the dist folder