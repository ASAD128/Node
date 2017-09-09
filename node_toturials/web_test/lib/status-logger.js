// This is used by run-scripts.js. DO NOT USE THIS IN TESTS!

var stripAnsi = require('strip-ansi');

var spinner = (function(){
	var s = '◐◓◑◒';
	var i = 0;
	
	return function () {
		i = (i+1)%s.length;
		return s[i] + ' ';
	}
})();

function print_status (txt) {
	if (process.stdout.isTTY) {
		process.stdout.write('\033[2K\033[7m');
		process.stdout.write('\r' + spinner() + txt + '\033[0m');
	}
}

function str_pad (txt,len) {
	var l = txt.length;
	
	if (l > len) {
		return txt.substr(0,len-2) + '..';
	}
	else {
		return txt + ' '.repeat(len-l);
	}
}

var StatusLogger = (function(){
	var q = [];
	var id = 0;
	
	function constructor () {
		this.id = id++;
		q.push({id:this.id,buffer:''});
	}
	
	constructor.render = function () {
		var width = Math.floor(process.stdout.columns/q.length);
		print_status(q.map(x => str_pad(x.buffer,width-2)).join('|'));
	}
	
	constructor.prototype.retire = function () {
		q = q.filter(x => x.id!=this.id);
	}
	
	constructor.prototype.log = function (txt) {
		for (var i=0; i<q.length; i++) {
			if (q[i].id == this.id) {
				q[i].buffer = stripAnsi(txt);
			}
		}
	}
	
	return constructor;
})();

module.exports = StatusLogger;
