var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    //Console.log("Asad");
    var body;
    req.on('data', function (data) {
        body += data;
        console.log(body);
    });
    res.render('register', { body: body });
});


module.exports = router;