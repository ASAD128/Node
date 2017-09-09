// This is used by run-scripts.js. DO NOT USE THIS IN TESTS!

var cheerio = require('cheerio');
var glob = require('glob');
var async = require('async');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var path = require('path');

var sendgrid = nodemailer.createTransport(
	'smtps://TrustedCompany:TCrock2016@smtp.sendgrid.net'
);

function processReport (xml_data, screenshots_dir, to_email, final_callback) {
	var $ = cheerio.load(xml_data,{
		xmlMode: true
	});
	
	var failures = $('failure');
	
	var failhash = {};
	
	if (failures.length === 0) {
		console.log('ALL OK');
	}
	else {
		failures.each(function(_,x){
			var testcase = $(x).parent();
			var testsuite = testcase.parent();
			var p = path.basename(testsuite.attr('package'));
			
			if (failhash[p] == undefined) {
				failhash[p] = {
					failures: []
				};
			}
			
			failhash[p].failures.push({
				testsuite: testsuite.attr('name'),
				testcase: testcase.attr('name')
			});
		});
		
		async.eachOfSeries(failhash,function(testcases,p,cb){
			var search = screenshots_dir + '/' + p + '*';
			glob(search,(er, files)=>{
				failhash[p].screenshots = files;
				cb();
			});
		},function(){
			// console.error(failhash);
			sendHtmlMail(to_email, failhash, function(error, info){
				if(error){
					console.log(error);
				}
				else {
					console.log('Message sent: ' + info.response);
				}
				final_callback();
			});
		});
	}
}

function cidFromPath (txt) {
	var h = crypto.createHash('sha1');
	h.update(txt);
	return h.digest('hex') + '@trustedcompany.com';
}

function getAllScreenshots (failhash) {
	var screenshots = [];
	
	for (var test_module in failhash) {
		var t = failhash[test_module];
		screenshots = screenshots.concat(t.screenshots);
	}
	
	return screenshots;
}

function makeAttachments (screenshots) {
	return screenshots.map(x => {
		return {
			filename: path.basename(x),
			path: x,
			cid: cidFromPath(x)
		}
	});
}

function makeHTML (failhash) {
	var html = `
		<html>
			<h1>Web Test Failure</h1>
			
			The following tests failed:
			
			${testSuiteTemplate(failhash)}
		</html>
	`;
	
	return html.replace(/\s+/g,' ');
}

function testSuiteTemplate (failhash) {
	var html = '';
	for (var test_module in failhash) {
		var t = failhash[test_module];
		html += `
			<hr>
			<div class="testsuite" style="font-size:12pt">
				<h2 style="font-size:13pt">Test script: ${test_module}.js</h2>
				
				Failures:
				
				${testCaseTemplate(t)}
				
				<br>
				
				
				${screenshotTemplate(t)}
			</div>
		`;
	}
	return html;
}

function testCaseTemplate (t) {
	return t.failures.map(x => {
		return `
			<div class="testcase" style="margin-left:2em">
				<span style="color:red">FAIL:</span>
					<b>${x.testsuite}</b> -> ${x.testcase}
			</div>
		`;
	}).join(' ');		
}

function screenshotTemplate (t) {
	if (t.screenshots && t.screenshots.length > 0) {
		return `
			Screenshots:
			
			<div class="screenshot" style="margin-left:2em">
				${screenshotList(t)}
			</div>
		`;
	}
	else {
		return '';
	}
}

function screenshotList (t) {
	return t.screenshots.map(x => {
		return `
			<img
				src="cid:${cidFromPath(x)}"
				style="width:150px;height:150px;display:inline-block"
			>
		`;
	}).join(' ');
}

function sendHtmlMail (to_email, failhash,callback) {
	var attachments = makeAttachments(getAllScreenshots(failhash));
	var mailOptions = {
		from: '"Test Runner" <asad.hussain@trustedcompany.com>',
		to: to_email,
		subject: 'Web Test Failure',
		html: makeHTML(failhash),
		attachments: attachments
	};
	
	sendgrid.sendMail(mailOptions, callback);
}

module.exports = {
	processReport: processReport
}
