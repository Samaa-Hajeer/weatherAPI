
//jshint esversion :6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
require("dotenv").config();

const API_ID = process.env.API_ID;
const DB_URL = process.env.DB_URL;

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(DB_URL, connectionParams)
    .then(() => {
        console.log("Connection is  Done");
    })
    .catch((e) => {
        console.log("ERROR " + e);
    })

var citySchema = mongoose.Schema({
    name: String,
    addTime:Date
});

var cityModel = mongoose.model("City", citySchema);
var city = "";
var url = "";
unit = "metric";
var citiesToShow
app.get("/", async function (req, res) {

    var dbCities = await cityModel.find({}).sort({addTime:-1}).exec();
    getWeather(dbCities).then(
        (openWeatherCities) => {
            var citiesToShow = { citiesToShow: openWeatherCities };
            res.render("weather", citiesToShow);

        })
});


app.post("/", async function (req, res) {

var query={name: req.body.city_name};
var update={addTime:new Date() }
var options={new:true ,upsert: true}
await cityModel.findOneAndUpdate(query,update,options)

    res.redirect("/");

});

async function getWeather(dbCities) {

    var openWeatherCities = [];
    for (dbCity of dbCities) {

        url = `https://api.openweathermap.org/data/2.5/weather?q=${dbCity.name}&appid=${API_ID}&units=${unit}`;
        const response = await fetch(url)
        var weatherData = await response.json();
        var cityDetails = {
            temp: weatherData.main.temp,
            description: weatherData.weather[0].description,
            name: weatherData.name,
            icon: weatherData.weather[0].icon,
        }
        openWeatherCities.push(cityDetails);


    }
    return (openWeatherCities);
}
app.listen("5000", function () {
    console.log("the server is starting on port 5000");
});