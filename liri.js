require("dotenv").config();
var keys = require("./keys.js");
let request = require("request");
// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

switch (process.argv[2]) {
  case 'movie-this': {
    let movie_name;
    if (!process.argv[3]) {
      movie_name = 'Mr. Nobody';
      console.log('setting movie_name to Mr.Nobody')
    }
    else {
      movie_name = process.argv[3];
    }

    request('http://www.omdbapi.com/?t=' + movie_name + '&apikey=acc558dc', function (err, resp, body) {
      if (!err && resp.statusCode === 200) {
        let data = (JSON.parse(body));
        console.log(data.Title);
        console.log(data.Year);
        console.log(data.Rated);
        for (source of data.Ratings) {
          if (source.Source === "Rotten Tomatoes") {
            console.log(source.Value)
          }
        }
        console.log(data.Country);
        console.log(data.Language);
        console.log(data.Plot);
        console.log(data.Actors);
      }
    });
  };
    break;
  case 'my-tweets': {

  };
    break;
  case 'spotify-this-song': {

  };
    break;
  case 'do-what-it-says': {

  };
    break;

}







