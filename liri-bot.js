require("dotenv").config();

var logFile = './random.txt';
var keys = require("./keys.js");
var BinT = require("band in town");
var spotify = require("spotify");
var OMDB = require("OMDB");
var request = require("request");
var fs = require("fs");
// take search grp
var userCommand = process.argv[2];
// take search time
var userSearch = process.argv[3];
for (var i = 4; i < process.argv.length; i++) {
    userSearch += "+" + process.argv[i];
}

//spotify



var concertSearch = function () { }
var songSearch = function () {
    spotify.search({
        type: "track",
        query: userSearch,
        function(err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            if (usersearch === "") {
                //when no input
                console.log("***");
                console.log("Artist: Ace of Base");
                console.log("Name: The Sign");
                console.log("Link: https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE");
                console.log("Album: The Sign");
                console.log("***");
            }else{
                //provide 3 songs
                for (i=0; i<3;i++){
                    var results = data.tracks.items[i];
                    var artist = results.artists[0].name;
                    var songName = results.name;
                    var songLink = results.external_urls.spotify;
                    var album = results.album.name;
                    //log the info
                    console.log("***");
                    console.log("Artist: " + artist);
                    console.log("Name: " + songName);
                    console.log("Link: " + songLink);
                    console.log("Album: " + album);
                    console.log("***");
                }
            }
        }
    });
}

var movieSearch = function(){

}


switch (userCommand) {
    case "concert-this":
        concertSearch();
        logData();
        break;
    case "spotify-this-song":
        songSearch();
        logData();
        break;
    case "movie-this":
        movieSearch();
        logData();
        break;
    case "do-what-it-says":
        dotThis();
        logData();
        break;
}