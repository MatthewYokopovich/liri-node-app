let dotenv = require("dotenv").config();
let keys = require("./keys.js");
let axios = require("axios");
let moment = require("moment");
// let spotify = new Spotify(keys.spotify);

let inquirer = require("inquirer");
inquirer.prompt([

    {
        type: "list",
        name: "userChoice",
        message: `What would you like to do?`,
        choices: ["1.  Concert-this", "2.  Spotify-this-song", "3.  Movie-this", "4.  Do-what-it-says"]
    }
]).then(function (user) {
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


        axios.get("https://rest.bandsintown.com/artists/" + user.artist + "/events?app_id=codingbootcamp").then(
                function (response) {
                    response.data.forEach(function(element){
                        console.log(element.venue.name + " in "+element.venue.city+", "+element.venue.region+" "+element.venue.country + " on " + moment(element.venue.datetime).format("MM/DD/YYYY"));
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

    })
}

function inq2() {
    inquirer.prompt([{
        type: "input",
        name: "song",
        message: "What song do you want to search for?"
    }]).then(function (user) {

    })
}

function inq3() {
    inquirer.prompt([{
        type: "input",
        name: "movie",
        message: "What movie do you want to search for?"
    }]).then(function (user) {
        var movieArr = [];
        movieArr = user.movie.split(" ");
        console.log(movieArr);

        var urlString = "http://www.omdbapi.com/?t=";
        for (var i = 0; i < movieArr.length; i++) {
            urlString = urlString + movieArr[i] + "+";
            console.log(urlString);
        }
        // movieArr.forEach(function(element){
        //     urlString = urlString+element+"+";
        //     console.log(urlString);
        // })
        urlString = urlString.substring(0, urlString.length - 1);
        console.log(urlString);
        urlString = urlString + "&y=&plot=short&apikey=trilogy";
        console.log(urlString);
        axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
                function (response) {
                    console.log("The movie's rating is: " + JSON.stringify(response));
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
    })
}

function inq4() {
    inquirer.prompt([{
        type: "input",
        name: "song",
        message: "What song to search for?"
    }]).then(function (user) {

    })
}