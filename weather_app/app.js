console.log("Weather App");

var request= require('request');

request('http://maps.googleapis.com/maps/api/geocode/json?address=%20OUG%20Parklane%20Pouchong%20Kuala%20Lumpur',(error,response,body)=>{
console.log(body);
});

