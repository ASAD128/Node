// Simple implementation of Fisher–Yates shuffle

function shuffle (arr) {
	var ret = arr.slice();
	var j;
	var tmp;
	for (var i=arr.length-1;i>0;i--) {
		j = Math.floor(Math.random() * arr.length);
		tmp = ret[i];
		ret[i] = ret[j];
		ret[j] = tmp;
	}
	return ret;
}

module.exports = shuffle;