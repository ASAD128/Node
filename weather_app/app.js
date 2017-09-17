console.log("Weather App");

var geocode = require('./geocode/geocodeAddress');

var weather = require('./weather/weather');

geocode.geocodeAddress();

weather.getWeather();


