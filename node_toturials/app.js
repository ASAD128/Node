const fs=require('fs');
const fun = require('./helper.js');
const _ = require('lodash');

console.log("Alexa Ranking!");

var alexa = require('alexarank');

alexa("http://www.google.com/", function(error, result) {
    if (!error) {
        console.log(JSON.stringify(result));
    } else {
        console.log(error);
    }
});


fun.sayHello();
console.log("Sum is "+fun.sum(2,3));
fs.appendFile('message.txt', 'data to append', (err) => {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});
console.log("Hello World");
