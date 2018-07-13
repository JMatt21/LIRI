require("dotenv").config();
const fs = require('fs');
const keys = require("./keys.js");
const request = require("request");
const Spotify = require('node-spotify-api');
const Twitter = require('twitter');
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);
const file_name = 'random.txt';
let file_text, input = [];
fs.readFile(file_name, 'utf8', (err, data) => {
  if (err) {
    console.log(err);
  }
  file_text = data.split(',');

  if (process.argv[2] !== 'do-what-it-says') {
    for (let i = 2; i < process.argv.length; i++) {
      input.push(process.argv[i])
    }
  } else {
    input = file_text;
  }
  console.log('----------------------\n' +
    'Every Input is Logged!\n' +
    '----------------------')
  fs.appendFile('log.txt', input + '\n', (err) => {
    if (err) console.log(err);
  });

  switch (input[0]) {
    case 'movie-this': {
      let movie_name = [];
      if (!input[1]) {
        movie_name = 'Mr. Nobody';
      }
      else {
        for (let i = 1; i < input.length; i++) {
          movie_name.push(input[i])
        }
        movie_name = movie_name.join('+');
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
      client.get('statuses/user_timeline', 'jimjon54025396', function (error, tweets) {
        if (!error) {
          console.log('-----------');
          for (let i = 0; i < tweets.length && i < 20; i++) {
            console.log(tweets[i].text);
            console.log(tweets[i].created_at);
            console.log('-----------');
          }
        }
      });
    };
      break;
    case 'spotify-this-song': {
      let song_name = [];
      if (!input[1]) {
        song_name = 'The Sign Ace';
      }
      else {
        for (let i = 1; i < input.length; i++) {
          song_name.push(input[i])
        }
        song_name = song_name.join(' ');
      }
      spotify.search({ type: 'track', query: song_name }, function (err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

        let first_track = data.tracks.items[0];
        first_track.artists.forEach(artist => {
          console.log(artist.name);
        });
        console.log(first_track.name);
        console.log(first_track.preview_url);
        console.log(first_track.album.name);

      });
    };
      break;
    default: console.log('error: Not a command!');
      break;
  }
});





