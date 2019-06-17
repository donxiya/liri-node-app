require("dotenv").config();
var moment = require('moment');
var keys = require("./key.js");
var request = require("request");
var fs = require("fs");
// take search grp
var userCommand = process.argv[2];
// take search time
var userSearch = process.argv[3];
for (var i = 4; i < process.argv.length; i++) {
    userSearch += " " + process.argv[i];
}

//spotify
var concertSearch = function () {
    var queryURL = "https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp";
    request(queryURL, function (error, response, body) {
        if (error) {
            console.log("Error occurred: " + error);
            return;
        }
        if (userSearch == null) {
            console.log("***");
            console.log("Please enter artist's name");
            console.log("***");
        } else {
            var result = JSON.parse(body);
            console.log("***");
            console.log("Artis: " + result[0].lineup);
            console.log("Venue: " + result[0].venue.name);
            var date= result[0].datetime
            date = moment(date).format("MM/DD/YYYY") 
            console.log("Date: " + date);
            console.log("***");
        }
    });

}
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var songSearch = function () {
    if (userSearch == null) {
        //when no input
        console.log("***");
        console.log("Artist: Ace of Base");
        console.log("Name: The Sign");
        console.log("Link: https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE");
        console.log("Album: The Sign");
        console.log("***");
    } else {
        spotify.search({
            type: "track",
            query: userSearch,
        },
            function (err, data) {
                if (err) {
                    console.log("Error occurred: " + err);
                    return;
                }

                else {
                    for (i = 0; i < 5; i++) {
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
        );
    }
};

var movieSearch = function () {
    //http://www.omdbapi.com/?i=tt3896198&apikey=6ec433fd
    //undefine equals null under "=="
    if (userSearch == null) {
        console.log("***");
        console.log("Title: Mr.Nobody");
        console.log("Release Year: 2009");
        console.log("Tomato: 67%");
        console.log("Country: Belgium, Germany, Canada, France, USA, UK");
        console.log("Language: en");
        console.log("Plot: Nemo Nobody leads an ordinary existence with his wife and 3 children; one day, he wakes up as a mortal centenarian in the year 2092.");
        console.log("Actors: Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham");
        console.log("***");
    } 
    else {
        var queryURL = "http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&tomatoes=true&apikey=6ec433fd";
        request(queryURL, function (error, response, body) {
            if (error) {
                console.log("Error occurred: " + error);
                return;
            }
            else {
                var result = JSON.parse(body);
                console.log("***");
                console.log("Title: " + result.Title);
                console.log("Release Year: " + result.Year);
                console.log("Tomatoes: " + result.Ratings[1].Value);
                console.log("Country: " + result.Country);
                console.log("Language: " + result.Language);
                console.log("Plot: " + result.Plot);
                console.log("Actors: " + result.Actors);
                console.log("***");
            }
        });
    }

};

var doThis = function(){
    fs.readFile("random.txt", "utf8", function(error,data){
    var content = data.split(",");
    userCommand = content[0];
    userSearch = content[1];
    decide();
})
}
var logData= function(){
    var data = "\nSearch : " + userSearch + " by "+ userCommand;
    fs.appendFile("log.txt",data, function(err){
        if (err) {
        console.log(err);
      }
      else {
        console.log("Content Added!");
      }});
}
var decide = function(){
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
        doThis();
        break;
}}
decide();