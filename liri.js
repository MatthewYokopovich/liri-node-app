let dotenv = require("dotenv").config();
let keys = require("./keys.js");
let axios = require("axios");
let moment = require("moment");
let Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);
let fs = require("fs");

let inquirer = require("inquirer");
inquirer.prompt([{
    type: "list",
    name: "userChoice",
    message: `What would you like to do?`,
    choices: ["1.  Concert-this", "2.  Spotify-this-song", "3.  Movie-this", "4.  Do-what-it-says"]
}]).then(function (user) {
    switch (user.userChoice[0]) {
        case '1':
            console.log("Concert-this");
            inq1();
            break;
        case '2':
            console.log("spotify-this-song");
            inq2();
            break;
        case '3':
            console.log("movie-this");
            inq3();
            break;
        case '4':
            console.log("Do-what-it-says");
            inq4();
            break;
    }
})

function inq1() {
    inquirer.prompt([{
        type: "input",
        name: "artist",
        message: "What artist do you want to search for?"
    }]).then(function (user) {
        bandsSearch(user.artist);
    })
}

function inq2() {
    inquirer.prompt([{
        type: "input",
        name: "song",
        message: "What song do you want to search for?"
    }]).then(function (user) {
        var tempSong = "The Sign";
        if (user.song) {
            tempSong = user.song;
        }
        spotifySearch(tempSong);
    })
}

function inq3() {
    inquirer.prompt([{
        type: "input",
        name: "movie",
        message: "What movie do you want to search for?"
    }]).then(function (user) {

        omdbSearch(user.movie);
    })
}

function inq4() {
    fs.readFile("./random.txt", "utf8", function (error, data) {
        if (error) {
            console.log("ERROR");
        }
        var dwisArr = data.split(",");
        switch (dwisArr[0]) {
            case "spotify-this-song":
                spotifySearch(dwisArr[1]);
                break;
            case "concert-this":
                bandsSearch(dwisArr[1]);
                break;
            case "movie-this":
                omdbSearch(dwisArr[1]);
                break;
        }
    })
}

function spotifySearch(trackName) {
    spotify.search({
        type: 'track',
        query: trackName
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(`Artist: ${data.tracks.items[0].artists[0].name}
Song: ${data.tracks.items[0].name}
Preview: ${data.tracks.items[0].preview_url}
Album: ${data.tracks.items[0].album.name}
      `);
    });
}

function omdbSearch(movieName) {
    var movieArr = [];
    movieArr = movieName.split(" ");
    console.log(movieArr);

    var urlString = "http://www.omdbapi.com/?t=";
    for (var i = 0; i < movieArr.length; i++) {
        urlString = urlString + movieArr[i] + "+";
    }
    urlString = urlString.substring(0, urlString.length - 1);
    urlString = urlString + "&y=&plot=short&apikey=trilogy";
    console.log()
    axios.get(urlString).then(
            function (response) {
                console.log(`Title: ${response.data.Title}
Release Year: ${response.data.year}
IMDB Rating: ${response.data.Ratings[0].Value}
Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}
Country of Release: ${response.data.Country}
Native Language: ${response.data.Language}
Plot Summary: ${response.data.Plot}
Actors: ${response.data.Actors}`);
            })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function bandsSearch(bandName) {

    var tempURL = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";
    axios.get(tempURL).then(
            function (response) {
                response.data.forEach(function (element) {
                    console.log(element.lineup + " in " + element.venue.city + ", " + element.venue.region + " " + element.venue.country + " on " + moment(element.datetime).format("MM/DD/YYYY"));
                })
            })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}