require("dotenv").config();
const keys = require("./keys.js");
const request = require("request");
const Spotify = require('node-spotify-api');
const Twitter = require('twitter');
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

var params = {screen_name: 'jimjon54025396'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets[1]);
  }
});




switch (process.argv[2]) {
  case 'movie-this': {
    let movie_name;
    if (!process.argv[3]) {
      movie_name = 'Mr. Nobody';
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
    let song_name;
    if (!process.argv[3]) {
      song_name = 'The Sign Ace';
    }
    else {
      song_name = process.argv[3];
    }
    spotify.search({ type: 'track', query: song_name }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      let first_track = data.tracks.items[0];
      // console.log(first_track);
      console.log(first_track.artists[0].name);//need to loop over
      console.log(first_track.name);
      console.log(first_track.preview_url);
      console.log(first_track.album.name);

    });
  };
    break;
  case 'do-what-it-says': {

  };
    break;

}







