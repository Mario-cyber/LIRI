// -----------------------------file set up---------------------------------------
// import all your requirements into your file:

// allows the file to read .env files
require("dotenv").config();
// obtian spotify keys from keys.js
var keys = require("./keys.js");
// instill spotify node api to make searches using node
var Spotify = require('node-spotify-api');
//  create a new instance of spotify keys
var spotify = new Spotify(keys.spotify);
// require node file system
let fs = require("fs")
// require axios 
let axios = require("axios")
// require moment
let moment = require("moment")

// ----------------------------functionality-----------------------------------

// define your "command" as the 0'th element of your trimmed "process.arv" object
let command = process.argv.slice(2)[0];
console.log(command);
// define your query as the rest of the "process.arv" made into a string using the ".join" mehtod
let query = process.argv.slice(3).join(" ");
console.log(query)

// define a switch funtion that evaluates your commmand and uses the query to carry out
// the appropiate action given the command case
function userInstruction(command, query) {

    switch (command) {
        case "spotify-this-song":
            spotifySearch();
            break;
        case "concert-this":
            concertSearch()
            break;
        case "movie-this":
            movieSearch();
            break;
        case "do-what-it-says":
            doIt();
            break;
    }
}

// define a sptify search function which uses the user query to return
// information about a given track 
let spotifySearch = () => {
    spotify.search({
        type: 'track',
        query: query,
        limit: 5
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data);
        // view response objects and extract pertinent info 
        // let artist = // response.artist
        // let name = // response.songName
        // let sample = //sample to song link
        //  let album = // response.artist
        //console.log(artist)
        // console.log(name)
        // console.log(sample)
        // console.log(album)
    });
}
// define a funtion to search for concerts using the user query
let concertSearch = () => {

    let URL = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp"

    // request code optained from axios npm documentation: https://www.npmjs.com/package/axios 
    axios.get(URL).then(function (response) {
            // handle success
            // response reasigned to response.data to only see the result of query
            response = response.data
            console.log("numer of results: " + response.length + "\n-------------------------")
            response.forEach(element => {
                console.log("Result #" + (response.indexOf(element) + 1))
                console.log("venue: " + element.venue.name)
                console.log("location: " + element.venue.city + ", " + element.venue.region + ", " + element.venue.country)
                console.log("date: " + moment(element.datetime).format("MM/DD/YYYY"))
                console.log("\n-------------------------")
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}
// define a funtion to serach for movies 
let movieSearch = () => {
    // your moview query goes here 
}
// define 
let doIt = () => {
    // use "fs" to read contents of random.txt
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        // retrieve string info from random.txt and split into an array on the ","
        data = data.split(",")
        // 0th element of the array will be the command
        command = data[0]
        // 1st element of the array will be the query
        query = data[1]
        // use this newly defined command and query to run a new instace of "userInstrcution" function
        userInstruction(command, query)
    })
}

// run the switch function with the commmand and query parameters defined by the user 
userInstruction(command, query);