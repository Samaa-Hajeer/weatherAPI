
//jshint esversion :6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

///var city = "";var unit = "";









const id = "16d4843b79d7d82dc992e4df4851bcfe";
var url = "";
city = "london";
unit = "standard";


app.get("/", function (req, res) {
    res.render("weather", { cityName: city, temp: "temp", description: "description", iconSrc: "iconSrc" });
});


app.post("/", function (req, res) {

    //////////////erja3elhom
    // city = req.body.city;
    // unit = req.body.unitOption;


    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${id}&units=${unit}`;
    https.get(url, function (response) {

        console.log(response.statusCode);
        response.on('data', function (data) {

            var weatherData = JSON.parse(data);

            var temp = weatherData.main.temp;
            var description = weatherData.weather[0].description;
            var name = weatherData.name;
            var icon = weatherData.weather[0].icon;
            var iconSrc = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            // res.write("<h1>" + name + "</h1>");
            // res.write("The tempteture is :" + temp);
            // res.write(" and description:" + description);
            // res.write("<img src=https://openweathermap.org/img/wn/" + icon + "@2x.png></img>");

            // res.send();

            //////////////////////////////////  res.render("weather",{cityName:name ,temp:temp ,description:description,iconSrc:iconSrc});

        })
    })


});

app.listen("5000", function () {
    console.log("the server is starting on port 5000");
});