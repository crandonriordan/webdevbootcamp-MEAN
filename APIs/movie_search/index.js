let express = require("express");
let app = express();

let request = require("request");
// api key for omdb
const APIKEY = "44c3c00806ef604c704557eeff2452f5";
const BASEURL = "https://api.themoviedb.org/3/search/company?api_key=44c3c00806ef604c704557eeff2452f5";

let hardCoded = BASEURL + "&query="; // + search term

// input arr, output array of objects with corresponding title
function getMovieData(movieIds) {
  let movieObjs = [];
  movieIds.forEach(function(id) {
    let url = "https://api.themoviedb.org/3/movie/" + id.toString() + "?api_key=44c3c00806ef604c704557eeff2452f5";
    request(url, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        // parse the obj
        let obj = JSON.parse(body);
        movieObjs.push(obj);
      }
      else {
        console.log(error)
      }
    });

  });

  return movieObjs;
}

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("search");
});

app.get("/results", function(req, res) {
  // get data from query string
  let query = req.query.search;
  console.log(req.query);
  let url = hardCoded + query;
  // return results
  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      // let parsedData = JSON.parse(body);
      // res.render("results", {
      //   movieData: parsedData
      // });
    }
    else {
      console.log(error);
    }
  });
});



app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server started");
});
