

const request = require('request');


var getWeather = ()=>{
request({
url:'https://api.darksky.net/forecast/b6196d3e53761fb3a8d3f8d80ad4ea76/37.8267,-122.4233',
json:true},(error,response,body)=>{
if(error){
console.log('Unable to fetch address');
}
else{
console.log(`-------------Weather Data-----------`);
console.log(`Temperature : ${body.currently.temperature}`);

}
});
}

module.exports.getWeather=getWeather;
