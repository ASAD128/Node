const request = require('request');

var geocodeAddress = ()=>{
request({url:'http://maps.googleapis.com/maps/api/geocode/json?address=%20OUG%20Parklane%20Pouchong%20Kuala%20Lumpur',
json:true},(error,response,body)=>{
if(error){
console.log('Unable to fetch address');
}
else{
console.log(`-------------Location Data-----------`);
console.log(`Latitude : ${body.results[0].geometry.location.lat}`);
console.log(`Longitude : ${body.results[0].geometry.location.lng}`);
}
});
}

module.exports.geocodeAddress=geocodeAddress;
