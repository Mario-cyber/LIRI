// import all your requirements into your file:
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// define your "command" as the 0'th element of your trimmed "process.arv" object
let command = process.argv.slice(2)[0];
console.log(command);
// define your query as the rest of the "process.arv" made into a string using the ".join" mehtod
let query = process.argv.slice(3).join(" ");
console.log(query)


// $(document).ready(function () {

function userInstruction(command, query) {

    switch (command) {
        case "spotify-this-song":
            spotifySearch();
            break;
        case "concert-this":
            concertSearch()
            break;




    }
}

// define a sptify search function which uses the user query to return
// infromation about a given track 
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

    console.log("when is the concert?")
    // let queryURL = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp"
    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).then(function (response) {
    //     console.log(response)
    // })
}


userInstruction(command, query);

// })