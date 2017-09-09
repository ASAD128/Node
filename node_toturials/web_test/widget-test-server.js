#! /usr/bin/env node

var http = require('http');
var url = require('url');
var knex = require('knex');
var config = require('./config.json');

var db = knex({
	client: config.db.client,
	connection: {
		host     : config.db.connection.host,
		user     : config.db.connection.user,
		password : config.db.connection.password,
		database : config.db.connection.database
	},
	pool: {
		min: 0,
		max: 2
	}
});

http.createServer(function (req,res) {
	req.parsedUrl = url.parse(req.url);
	req.path = req.parsedUrl.pathname.split('/').slice(1);

	var page = req.path[0];
	
	// console.log('Request:' + page);
	
	switch (page) {
		case 'widget' : widgetPage(req,res); break;
		case 'db'     : dbQuery(req,res); break;
		default       : error404(res);
	}
})
.listen(56565,function(){
	console.log('Widget server started..');
});

function error404 (res) {
	res.writeHead(404,{"Content-Type": "text/plain"});
	res.write('Not Found');
	res.end();
}

function dbQuery (req,res) {
	if (req.method == 'POST') {
		var body = [];
		req.on('data', chunk => {
			body.push(chunk);
		}).on('end', () => {
			body = Buffer.concat(body).toString('utf8');
			res.writeHead(200,{"Content-Type": "application/json; charset=utf-8"});
			try {
				var jsonQuery = JSON.parse(body);
				
				// console.log(jsonQuery);
				
				var queryBuild = db;
				
				jsonQuery.forEach(q => {
					for (var method in q) {
						if (q[method] instanceof Array) {
							queryBuild = queryBuild[method].apply(queryBuild,q[method]);
						}
						else {
							queryBuild = queryBuild[method].call(queryBuild,q[method]);
						}
					}
				});
				
				queryBuild.then( result => {
					res.end(JSON.stringify(result));
				});
			}
			catch (err) {
				res.end(JSON.stringify({
					error: err
				}));
			}
		});
	}
	else {
		res.end();
	}
}

function widgetPage (req,res) {
	var widget_id = parseInt(req.path[1],10);
	
	var t = [undefined, 'standard','horizontal','vertical','floating'];

	if (!widget_id)	{
		error404(res);
		return;
	}
	
	db.select('id','hash','type')
		.from('tc_widget_settings')
		.where('id',widget_id).then(result => {
		
		var w = result[0];

		if (result.length) {
			res.end(`
			<html>
			<body>
				<h1>Widget test page</h1>
				
				<div>
					Widget ID: <span id="widget_id">${w.id}</span>
				</div>
				<div>
					Widget Type: <span id="widget_type>">${t[w.type]}</span>
				</div>
				
				<br>
				
				<div id="TRUSTEDCOMPANY_widget_${w.id}"><script async
				src="https://d3643s33l1rfut.cloudfront.net/js/widget?w=${w.hash}"
				></script></div>
			</body>	
			</html>
			`.replace(/\s+/g,' '));
		}	
	});
}