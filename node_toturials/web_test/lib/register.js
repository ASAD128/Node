var fetchJSON = require('./fetch-json');
var screenshots = require('./screenshots.js')('register');

function deleteTestUser (callback) {
    var query = [
        {delete: [
            'tc_users_b2b.name'
        ]},
        {from: ['tc_users_b2b']},

        {where:[
            'tc_users_b2b.id',27
        ]}
    ];

  /*  return fetchJSON('http://localhost:56565/db', {
        method: 'post',
        encoding: 'utf8',
        data: JSON.stringify(query),
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        }
    }, callback);*/
    return fetchJSON('http://localhost:56565/db', {
        method: 'post',
        encoding: 'utf8',
        data: JSON.stringify(query),
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        }
    }, function (result) {
        this.echo(result);
    });


}

var casper = require('casper').create();
casper.options.viewportSize = {width: 1200, height: 800};

console.log('started');
casper.start('http://trustedcompany.com/register')
    .then(function(){
        this.echo(this.getTitle())
    });
casper.then(function () {
    casper.fill('form#customer_form', {
        'email' : 'santa-123@google.com',
        'domainName' : 'google.com',
        'name' : 'santa',
        'phoneNumber' : ''
    }, true);
});

casper.then(function() {
    if(this.currentHTTPStatus==200){
        this.echo("Register 1st Form submitted successfully!")
    }
});

casper.then(screenshots.capture);

casper.then(function() {
        this.echo("Register 1st Form submitted successfully!")

});
casper.then(function () {
    casper.fill('form', {
        'phone' : '666999777',
        'cart' : 'shopify'
    }, true);
});

casper.then(function() {
    if(this.currentHTTPStatus==200){
        this.echo("Register 2nd Form submitted successfully!")
    }
});

casper.then(deleteTestUser(function () {
    this.echo("Row deleted from db successfully!");
}));
casper.run();
