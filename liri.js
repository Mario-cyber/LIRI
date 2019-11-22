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
    switch (query) {
        case "":
            spotify.search({
                type: 'track',
                query: "The Sign",
                limit: 5
            }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                // redifine data as such in order to more easily navigate the object
                data = data.tracks.items[0]

                //extarct your info from response and place into variables  
                albumName = data.album.name;
                artist = data.artists[0].name
                songName = data.name
                songURL = data.preview_url
                // console.log info extracted
                console.log("Artist: " + artist)
                console.log("Song Name: " + songName)
                console.log("Album: " + albumName)
                console.log("Song Sample: " + songURL)
            })
            break;

        case query:
            spotify.search({
                type: 'track',
                query: query,
                limit: 5
            }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                // redifine data as such in order to more easily navigate the object
                data = data.tracks.items[0]

                //extarct your info from response and place into variables  
                albumName = data.album.name;
                artist = data.artists[0].name
                songName = data.name
                songURL = data.preview_url
                // console.log info extracted
                console.log("Artist: " + artist)
                console.log("Song Name: " + songName)
                console.log("Album: " + albumName)
                console.log("Song Sample: " + songURL)

            });
            break;
    }
}
// define a funtion to search for concerts using the user query
let concertSearch = () => {
    // define a query URL based on the "bands in town documentation" and the user query
    let bandURL = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp"

    // request code optained from axios npm documentation: https://www.npmjs.com/package/axios 
    axios.get(bandURL).then(function (response) {
            // handle success
            // response reasigned to response.data to only see the result of query
            response = response.data
            console.log("numer of results: " + response.length + "\n-------------------------")
            response.forEach(element => {
                // go to the response and store the relevant information into variables
                let resultNumber = response.indexOf(element) + 1
                let venue = element.venue.name;
                let location = element.venue.city + ", " + element.venue.region + ", " + element.venue.country
                let date = moment(element.datetime).format("MM/DD/YYYY")
                // console.log said variables 
                console.log("Result #" + resultNumber)
                console.log("Venue: " + venue)
                console.log("Location: " + location)
                console.log("Date: " + date)
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
    // define a URL varilabe that tou can use for both cases of the switch 
    let movieURL = ""
    switch (query) {
        case "":
            // generic request for Mr.Nobody in case query is empty
            movieURL = "http://www.omdbapi.com/?apikey=e69c2f14&t=Mr.Nobody"
            axios.get(movieURL).then(function (response) {
                    // rename response as response.data to only get response info
                    response = response.data
                    // extract relveant info into variables 
                    title = response.Title
                    year = response.Year
                    imdbR = response.imdbRating
                    rottR = response.Ratings[1].Value
                    country = response.Country
                    lang = response.Language
                    plot = response.Plot
                    actors = response.Actors
                    // console.log info from response 
                    console.log("Title: " + title)
                    console.log("Release year:  " + year)
                    console.log("IMDB rating: " + imdbR)
                    console.log("Rotten Tomatoes rating: " + rottR)
                    console.log("Country of prodcution: " + country)
                    console.log("Language: " + lang)
                    console.log("Plot: " + plot)
                    console.log("Cast: " + actors)
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
            break;
        case query:
            // compose a request URL with a basic URL template and the user query
            movieURL = "http://www.omdbapi.com/?apikey=e69c2f14&t=" + query
            axios.get(movieURL).then(function (response) {
                    // rename response as response.data to only get response info
                    response = response.data
                    // extract relveant info into variables 
                    let title = response.Title
                    let year = response.Year
                    let imdbR = response.imdbRating
                    let rottR = response.Ratings[1].Value
                    let country = response.Country
                    let lang = response.Language
                    let plot = response.Plot
                    let actors = response.Actors
                    // console.log info from response 
                    console.log("Title: " + title)
                    console.log("Release year:  " + year)
                    console.log("IMDB rating: " + imdbR)
                    console.log("Rotten Tomatoes rating: " + rottR)
                    console.log("Country of prodcution: " + country)
                    console.log("Language: " + lang)
                    console.log("Plot: " + plot)
                    console.log("Cast: " + actors)
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
            break;

    }
}
// define a doIt function in case the user input is do-what-it-says
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