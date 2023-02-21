
//jshint esversion :6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

var city = "";
var id = "16d4843b79d7d82dc992e4df4851bcfe";
var unit = "";
var url="";

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")

});


app.post("/", function (req, res) {


    city = req.body.city;
    unit = req.body.unit;
    console.log(city);
    console.log(unit);
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${id}&units=${unit}`;
    https.get(url, function (response) {

        console.log(response.statusCode);
        response.on('data', function (data) {

            var weatherData = JSON.parse(data);

            var temp = weatherData.main.temp;
            var description = weatherData.weather[0].description;
            var name = weatherData.name;
            var icon = weatherData.weather[0].icon;

            res.write("<h1>" + name + "</h1>");
            res.write("The tempteture is :" + temp);
            res.write(" and description:" + description);
            res.write("<img src=https://openweathermap.org/img/wn/" + icon + "@2x.png></img>");

            res.send();
        })
    })


});

app.listen("5000", function () {
    console.log("the server is starting on port 5000");
});